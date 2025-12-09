'use client';

import { useState } from 'react';
import { CourseListView } from './CourseListView';
import { CourseDetailView } from './CourseDetailView';
import { GolfCourse, Region } from '../types';
import type { VWorldGolfCourse } from '@/lib/vworld';

interface HomeClientProps {
  coursesByRegion: Record<Region, VWorldGolfCourse[]>;
  initialRegion: Region;
}

/**
 * 클라이언트 컴포넌트: 골프장 선택 상태 관리
 * 서버 컴포넌트에서 가져온 모든 지역 데이터를 사용
 */
export function HomeClient({ coursesByRegion, initialRegion }: HomeClientProps) {
  const [selectedCourse, setSelectedCourse] = useState<GolfCourse | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {!selectedCourse ? (
        <CourseListView 
          onSelectCourse={setSelectedCourse}
          coursesByRegion={coursesByRegion}
          initialRegion={initialRegion}
        />
      ) : (
        <CourseDetailView 
          course={selectedCourse} 
          onBack={() => setSelectedCourse(null)} 
        />
      )}
    </div>
  );
}

