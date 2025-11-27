import { NextRequest, NextResponse } from 'next/server';
import { convertLatLonToGrid, getBaseDateTime } from '@/lib/weather-api';

/**
 * 날씨 API 라우트
 * 서버 사이드에서 기상청 API를 호출하여 날씨 데이터를 가져옵니다
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lat = parseFloat(searchParams.get('lat') || '0');
    const lon = parseFloat(searchParams.get('lon') || '0');

    if (!lat || !lon) {
      return NextResponse.json(
        { success: false, error: '위도와 경도가 필요합니다.' },
        { status: 400 }
      );
    }

    const serviceKey = process.env.WEATHER_API_KEY;
    
    if (!serviceKey) {
      return NextResponse.json(
        { success: false, error: '날씨 API 키가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    // 위경도를 격자 좌표로 변환
    const { nx, ny } = convertLatLonToGrid(lat, lon);
    
    // 발표일자와 발표시각 가져오기
    const { base_date, base_time } = getBaseDateTime();

    const baseUrl = process.env.WEATHER_API_URL;

    
    // 초단기실황과 단기예보를 동시에 호출
    const [ultraSrtNcstUrl, forecastUrl] = [
      `${baseUrl}/getUltraSrtNcst`,
      `${baseUrl}/getVilageFcst`,
    ].map(url => {
      const params = new URLSearchParams({
        serviceKey: serviceKey,
        pageNo: '1',
        numOfRows: '1000',
        dataType: 'JSON',
        base_date: base_date,
        base_time: base_time,
        nx: String(nx),
        ny: String(ny),
      });
      return `${url}?${params.toString()}`;
    });

    console.log(ultraSrtNcstUrl)
    console.log(forecastUrl)


    // 두 API를 병렬로 호출
    const [ultraSrtResponse, forecastResponse] = await Promise.all([
      fetch(ultraSrtNcstUrl),
      fetch(forecastUrl),
    ]);

    if (!ultraSrtResponse.ok || !forecastResponse.ok) {
      throw new Error('기상청 API 호출 실패');
    }

    const [ultraSrtData, forecastData] = await Promise.all([
      ultraSrtResponse.json(),
      forecastResponse.json(),
    ]);

    // 응답 코드 확인
    if (
      ultraSrtData.response?.header?.resultCode !== '00'
        ||  forecastData.response?.header?.resultCode !== '00'
    ) {
      throw new Error(
        `API 오류: ${ultraSrtData.response?.header?.resultMsg || forecastData.response?.header?.resultMsg}`
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ultraSrtNcst: ultraSrtData,
        forecast: forecastData,
      },
    });
  } catch (error) {
    console.error('날씨 API 호출 실패:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '날씨 정보를 불러오는데 실패했습니다.',
      },
      { status: 500 }
    );
  }
}

