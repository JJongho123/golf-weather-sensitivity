// VWorld 골프장 API 타입 정의

export interface VWorldGolfCourse {
  id: string;
  name: string;
  coordinates: [number, number]; // [lng, lat]
}

export interface VWorldApiResponse {
  response: {
    status: string;
    record: {
      total: string;
      current: string;
    };
    page: {
      total: string;
      current: string;
      size: string;
    };
    result: {
      featureCollection: {
        type: string;
        features: VWorldFeature[];
      };
    };
  };
}

export interface VWorldFeature {
  type: string;
  id: string;
  properties: {
    golf_name: string;
  };
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

// 지역별 BOX 좌표
export const REGION_BOX: Record<string, string> = {
  all: 'BOX(124.5,33.0,132.0,38.6)', // 한국 전체
  seoulGyeonggi: 'BOX(126.5,37.2,127.8,38.2)',
  gangwon: 'BOX(127.0,37.0,129.5,38.6)',
  chungbuk: 'BOX(127.3,36.0,128.5,37.2)',
  chungnam: 'BOX(126.0,36.0,127.3,37.0)',
  gyeongbuk: 'BOX(128.0,35.5,130.0,37.5)',
  gyeongnam: 'BOX(127.5,34.8,129.5,36.0)',
  jeonbuk: 'BOX(126.5,35.0,127.8,36.5)',
  jeonnam: 'BOX(126.0,34.0,128.0,35.5)',
  jeju: 'BOX(126.0,33.0,127.0,34.0)',
};

// VWorld API에서 골프장 목록 조회 (지역별)
export async function fetchGolfCoursesFromVWorld(
  region: string = 'all'
): Promise<VWorldGolfCourse[]> {
  const apiUrl = process.env.VWORLD_GOLF_API_URL;
  const apiKey = process.env.VWORLD_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error('VWorld API 환경변수가 설정되지 않았습니다.');
  }

  const geomFilter = REGION_BOX[region] || REGION_BOX.all;

  const params = new URLSearchParams({
    service: 'data',
    version: '2.0',
    request: 'GetFeature',
    data: 'LT_P_SGISGOLF',
    key: apiKey,
    geomFilter,
    size: '1000',
  });

  const response = await fetch(`${apiUrl}?${params.toString()}`, {
    next: { revalidate: 86400 }, // 24시간 (86400초)
  });

  if (!response.ok) {
    throw new Error(`VWorld API 호출 실패: ${response.status}`);
  }

  const data: VWorldApiResponse = await response.json();

  if (data.response.status !== 'OK') {
    throw new Error('VWorld API 응답 오류');
  }

  const features = data.response.result?.featureCollection?.features || [];

  return features.map((feature) => ({
    id: feature.id,
    name: feature.properties.golf_name,
    coordinates: feature.geometry.coordinates,
  }));
}

// 골프장명으로 검색 (클라이언트 측 필터링)
export function filterGolfCoursesByName(
  courses: VWorldGolfCourse[],
  query: string
): VWorldGolfCourse[] {
  if (!query.trim()) {
    return courses;
  }
  const lowerQuery = query.toLowerCase();
  return courses.filter((course) =>
    course.name.toLowerCase().includes(lowerQuery)
  );
}
