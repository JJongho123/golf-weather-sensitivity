import { CapacitorInitializer } from './components/platform/CapacitorInitializer'
import { getGolfCourses } from '@/lib/golf-courses'
import { HomeClient } from './components/views/HomeClient'
import { Region } from './types'

/**
 * 서버 컴포넌트: 빌드 시점에 모든 지역의 골프장 데이터를 가져와서 캐싱 (ISR)
 * 24시간마다 재검증됨
 * 
 * 모든 지역의 데이터를 빌드 시점에 미리 가져와서 런타임 API 호출을 완전히 제거
 */
export default async function Home() {
  // 모든 지역 목록
  const regions: Region[] = [
    'all',
    'seoulGyeonggi',
    'gangwon',
    'chungbuk',
    'chungnam',
    'gyeongbuk',
    'gyeongnam',
    'jeonbuk',
    'jeonnam',
    'jeju',
  ];

  console.log(`[ISR 빌드 시작] 총 ${regions.length}개 지역 데이터 로드 시작`);
  
  // 빌드 시점에 모든 지역의 데이터를 병렬로 가져오기 (ISR 캐싱)
  const coursesDataByRegion = await Promise.all(
    regions.map(async (region) => {
      console.log(`[ISR] 지역 데이터 로드 시작: ${region}`);
      const data = await getGolfCourses(region);
      console.log(`[ISR] 지역 데이터 로드 완료: ${region} (${data.data.length}개)`);
      return { region, courses: data.data };
    })
  );

  // 지역별 데이터를 객체로 변환 (Map은 직렬화되지 않으므로 객체 사용)
  const coursesByRegion: Record<Region, typeof coursesDataByRegion[0]['courses']> = {} as Record<Region, typeof coursesDataByRegion[0]['courses']>;
  coursesDataByRegion.forEach(({ region, courses }) => {
    coursesByRegion[region] = courses;
  });

  const totalCourses = coursesDataByRegion.reduce((sum, { courses }) => sum + courses.length, 0);
  console.log(`[ISR 빌드 완료] 총 ${regions.length}개 지역, 전체 골프장 수: ${totalCourses}개`);
  
  return (
    <>
      <CapacitorInitializer />
      <HomeClient 
        coursesByRegion={coursesByRegion}
        initialRegion="all"
      />
    </>
  )
}
