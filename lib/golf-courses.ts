import { fetchGolfCoursesFromVWorld, VWorldGolfCourse } from './vworld';

export interface GolfCourseListResponse {
  success: boolean;
  data: VWorldGolfCourse[];
  count: number;
  lastUpdated: string;
  error?: string;
}

// 서버 컴포넌트에서 ISR 방식으로 골프장 목록 조회
// 24시간(86400초)마다 재검증
export async function getGolfCourses(): Promise<GolfCourseListResponse> {
  try {
    const golfCourses = await fetchGolfCoursesFromVWorld();

    return {
      success: true,
      data: golfCourses,
      count: golfCourses.length,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('골프장 목록 조회 실패:', error);

    return {
      success: false,
      data: [],
      count: 0,
      lastUpdated: new Date().toISOString(),
      error: error instanceof Error ? error.message : '골프장 목록을 불러오는데 실패했습니다.',
    };
  }
}

// 이름으로 골프장 검색
export function searchGolfCourses(
  courses: VWorldGolfCourse[],
  query: string
): VWorldGolfCourse[] {
  if (!query) {
    return courses;
  }
  const lowerQuery = query.toLowerCase();
  return courses.filter((course) => course.name.toLowerCase().includes(lowerQuery));
}
