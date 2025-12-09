import { NextRequest, NextResponse } from 'next/server';
import { fetchGolfCoursesFromVWorld, filterGolfCoursesByName } from '@/lib/vworld';

// ISR 설정: 24시간(86400초)마다 재검증
// 빌드 시점에 데이터를 가져와서 캐싱하고, 24시간 후 자동으로 재검증
export const revalidate = 86400; // 24시간

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const region = searchParams.get('region') || 'all';
    const search = searchParams.get('search') || '';

    // 지역별 골프장 조회
    let golfCourses = await fetchGolfCoursesFromVWorld(region);

    // 골프장명 검색 필터링
    if (search) {
      golfCourses = filterGolfCoursesByName(golfCourses, search);
    }

    // console.log(golfCourses);

    return NextResponse.json({
      success: true,
      data: golfCourses,
      count: golfCourses.length,
      region,
      search,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('골프장 목록 조회 실패:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '골프장 목록을 불러오는데 실패했습니다.',
      },
      { status: 500 }
    );
  }
}
