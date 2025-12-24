'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { Search } from 'lucide-react';
import { GolfCourse, Region } from '../../types';
import { RegionFilter } from '../course/RegionFilter';
import { CourseListSkeleton } from '../common/Loading';
import { GolfCourseList } from '../course/GolfCourseList';
import type { VWorldGolfCourse } from '@/lib/vworld';
import { filterGolfCoursesByName } from '@/lib/vworld';

interface CourseListViewProps {
  onSelectCourse: (course: GolfCourse) => void;
  coursesByRegion: Record<Region, VWorldGolfCourse[]>; // 모든 지역의 데이터 (빌드 시점에 가져온 캐싱된 데이터)
  initialRegion: Region; // 초기 지역
}

export function CourseListView({ 
  onSelectCourse, 
  coursesByRegion,
  initialRegion = 'all'
}: CourseListViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region>(initialRegion);

  // 검색어 디바운스
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 선택된 지역의 데이터 가져오기 (모든 데이터가 이미 메모리에 있음 - API 호출 없음)
  const regionCourses = coursesByRegion[selectedRegion] || [];
  
  // 검색어로 필터링 (클라이언트 측 필터링만 수행)
  const filteredCourses = filterGolfCoursesByName(regionCourses, debouncedSearch);
  
  // Promise로 변환 (GolfCourseList 컴포넌트가 Promise를 기대하므로)
  // useMemo를 사용하여 filteredCourses가 변경될 때만 새 Promise 생성
  const coursesPromise = useMemo(
    () => Promise.resolve(filteredCourses),
    [filteredCourses]
  );

  return (
    <div className="max-w-md mx-auto min-h-screen pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-6 rounded-b-3xl shadow-lg">
        <h1 className="text-center mb-6">골프장 날씨</h1>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="골프장 이름 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
      </div>

      {/* Region Filter */}
      <div className="px-4 mt-4">
        <RegionFilter
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />
      </div>

      {/* Course List with Suspense */}
      <div className="px-4 mt-4 space-y-3">
        <Suspense fallback={<CourseListSkeleton count={5} />}>
          <GolfCourseList
            coursesPromise={coursesPromise}
            region={selectedRegion}
            onSelectCourse={onSelectCourse}
          />
        </Suspense>
      </div>
    </div>
  );
}
