import { NextRequest, NextResponse } from 'next/server';
import { fetchGolfCoursesFromVWorld, filterGolfCoursesByName } from '@/lib/vworld';

// ISR: 24시간마다 재검증
export const revalidate = 86400;

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
