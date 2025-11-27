'use client';

import { use } from 'react';
import { GolfCourse, Region } from '../types';
import type { VWorldGolfCourse } from '@/lib/vworld';

interface GolfCourseListProps {
  coursesPromise: Promise<VWorldGolfCourse[]>;
  region: Region;
  onSelectCourse: (course: GolfCourse) => void;
}

export function GolfCourseList({
  coursesPromise,
  region,
  onSelectCourse,
}: GolfCourseListProps) {
  const courses = use(coursesPromise);

  if (courses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        검색 결과가 없습니다
      </div>
    );
  }

  return (
    <>
      <div className="text-gray-600 mb-3">총 {courses.length}개 골프장</div>
      {courses.map((course) => (
        <div
          key={course.id}
          onClick={() =>
            onSelectCourse({
              id: course.id,
              name: course.name,
              location: '',
              region,
              currentWeather: {
                temperature: 0,
                condition: 'sunny',
                humidity: 0,
                windSpeed: 0,
                windDirection: '',
              },
              hourlyForecast: [],
              weeklyForecast: [],
            })
          }
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
        >
          <h3 className="font-semibold text-gray-900">{course.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            좌표: {course.coordinates[1].toFixed(4)},{' '}
            {course.coordinates[0].toFixed(4)}
          </p>
        </div>
      ))}
    </>
  );
}
