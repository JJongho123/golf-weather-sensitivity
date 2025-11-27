'use client';

import { useState } from 'react';
import { use } from 'react';
import { GolfCourse, Region } from '../types';
import type { VWorldGolfCourse } from '@/lib/vworld';
import { GolfCourseCard } from './GolfCourseCard';
import { parseForecastData } from '@/lib/weather-api';

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
  const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * 골프장 클릭 시 날씨 API 호출 및 상세 페이지로 이동
   */
  const handleCourseClick = async (course: VWorldGolfCourse) => {
    setLoadingCourseId(course.id);
    setError(null);

    try {
      // 좌표 정보 추출 (VWorld는 [lng, lat] 형식)
      const [lng, lat] = course.coordinates;

      // 날씨 API 호출
      const response = await fetch(
        `/api/weather?lat=${lat}&lon=${lng}`
      );
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || '날씨 정보를 불러오는데 실패했습니다.');
      }

      // 날씨 데이터 파싱
      const weatherData = parseForecastData(
        result.data.forecast,
        result.data.ultraSrtNcst
      );

      // GolfCourse 객체 생성
      const golfCourse: GolfCourse = {
        id: course.id,
        name: course.name,
        location: `좌표: ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        region,
        currentWeather: weatherData.currentWeather,
        hourlyForecast: weatherData.hourlyForecast,
        weeklyForecast: weatherData.weeklyForecast,
      };

      // 상세 페이지로 이동
      onSelectCourse(golfCourse);
    } catch (err) {
      console.error('날씨 정보 로드 실패:', err);
      setError(err instanceof Error ? err.message : '날씨 정보를 불러오는데 실패했습니다.');
      setLoadingCourseId(null);
    }
  };

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
      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}
      {courses.map((course) => (
        <GolfCourseCard
          key={course.id}
          course={{
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
          }}
          coordinates={course.coordinates}
          onClick={() => handleCourseClick(course)}
          disabled={loadingCourseId === course.id}
        />
      ))}
    </>
  );
}
