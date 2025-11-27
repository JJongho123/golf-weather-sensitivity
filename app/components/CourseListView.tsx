'use client';

import { useState, useEffect, Suspense } from 'react';
import { Search } from 'lucide-react';
import { GolfCourse, Region } from '../types';
import { RegionFilter } from './RegionFilter';
import { CourseListSkeleton } from './Loading';
import { GolfCourseList } from './GolfCourseList';
import type { VWorldGolfCourse } from '@/lib/vworld';

interface CourseListViewProps {
  onSelectCourse: (course: GolfCourse) => void;
}

// API 호출 함수
async function fetchCourses(
  region: string,
  search: string
): Promise<VWorldGolfCourse[]> {
  const params = new URLSearchParams({ region });
  if (search.trim()) {
    params.append('search', search.trim());
  }

  const response = await fetch(`/api/golf-courses?${params.toString()}`);
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || '골프장 목록을 불러오는데 실패했습니다.');
  }

  return result.data;
}

export function CourseListView({ onSelectCourse }: CourseListViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region>('all');
  const [coursesPromise, setCoursesPromise] =
    useState<Promise<VWorldGolfCourse[]> | null>(null);

  // 검색어 디바운스
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 지역/검색어 변경 시 새 Promise 생성 (클라이언트에서만)
  useEffect(() => {
    setCoursesPromise(fetchCourses(selectedRegion, debouncedSearch));
  }, [selectedRegion, debouncedSearch]);

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
        {coursesPromise ? (
          <Suspense fallback={<CourseListSkeleton count={5} />}>
            <GolfCourseList
              coursesPromise={coursesPromise}
              region={selectedRegion}
              onSelectCourse={onSelectCourse}
            />
          </Suspense>
        ) : (
          <CourseListSkeleton count={5} />
        )}
      </div>
    </div>
  );
}
