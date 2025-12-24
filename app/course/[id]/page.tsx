'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Droplets, Wind, Navigation, Loader2 } from 'lucide-react';
import { GolfCourse } from '@/app/types';
import { WeatherIcon } from '@/app/components/common/WeatherIcon';
import { HourlyForecast } from '@/app/components/weather/HourlyForecast';
import { WeeklyForecast } from '@/app/components/weather/WeeklyForecast';
import { parseForecastData } from '@/lib/weather-api';

const getWeatherLabel = (condition: string) => {
  const labels: Record<string, string> = {
    'sunny': '맑음',
    'partly-cloudy': '구름 조금',
    'cloudy': '흐림',
    'rainy': '비',
    'stormy': '폭우',
    'snowy': '눈',
  };
  return labels[condition] || condition;
};

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [course, setCourse] = useState<GolfCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // URL에서 골프장 정보 추출
  const courseId = params.id as string;
  const courseName = searchParams.get('name') || '';
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  useEffect(() => {
    const fetchWeather = async () => {
      if (!lat || !lng) {
        setError('좌표 정보가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/weather?lat=${lat}&lon=${lng}`);
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || '날씨 정보를 불러오는데 실패했습니다.');
        }

        const weatherData = parseForecastData(
          result.data.forecast,
          result.data.ultraSrtNcst
        );

        setCourse({
          id: courseId,
          name: decodeURIComponent(courseName),
          location: `좌표: ${parseFloat(lat).toFixed(4)}, ${parseFloat(lng).toFixed(4)}`,
          region: '',
          currentWeather: weatherData.currentWeather,
          hourlyForecast: weatherData.hourlyForecast,
          weeklyForecast: weatherData.weeklyForecast,
        });
      } catch (err) {
        console.error('날씨 정보 로드 실패:', err);
        setError(err instanceof Error ? err.message : '날씨 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [courseId, courseName, lat, lng]);

  const handleBack = () => {
    router.back();
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-emerald-300/60">날씨 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !course) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 px-4 py-12">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-emerald-300/80 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>목록으로</span>
        </button>
        <div className="text-center py-12">
          <p className="text-red-400 mb-4">{error || '골프장 정보를 찾을 수 없습니다.'}</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-amber-400 text-emerald-950 rounded-xl font-medium hover:bg-amber-300 transition-colors"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 pb-8">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        <div className="relative px-5 pt-12 pb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-emerald-300/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>목록으로</span>
          </button>

          <h2 className="text-2xl font-bold text-white mb-1">{course.name}</h2>
          <p className="text-emerald-300/60 text-sm mb-6">{course.location}</p>

          {/* Current Weather Card */}
          <div
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/10 to-transparent rounded-full blur-2xl" />

            <div className="relative flex items-start justify-between mb-6">
              <div>
                <div className="text-6xl font-light text-white mb-2">
                  {course.currentWeather.temperature}
                  <span className="text-3xl text-amber-400">°</span>
                </div>
                <div className="text-emerald-300/80 font-medium">
                  {getWeatherLabel(course.currentWeather.condition)}
                </div>
              </div>
              <WeatherIcon condition={course.currentWeather.condition} size={72} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-400/20 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xs text-emerald-300/60">습도</div>
                  <div className="text-white font-semibold">{course.currentWeather.humidity}%</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/20 flex items-center justify-center">
                  <Wind className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-emerald-300/60">풍속</div>
                  <div className="text-white font-semibold">{course.currentWeather.windSpeed}m/s</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs text-emerald-300/60">풍향</div>
                  <div className="text-white font-semibold">{course.currentWeather.windDirection}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="px-4 mt-6">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <div className="w-1 h-4 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full" />
          시간별 날씨
        </h3>
        <HourlyForecast forecast={course.hourlyForecast} />
      </div>

      {/* Weekly Forecast */}
      <div className="px-4 mt-6">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <div className="w-1 h-4 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full" />
          주간 날씨
        </h3>
        <WeeklyForecast forecast={course.weeklyForecast} />
      </div>
    </div>
  );
}
