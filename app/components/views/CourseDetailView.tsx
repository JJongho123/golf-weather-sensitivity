import { ArrowLeft, Droplets, Wind, Navigation } from 'lucide-react';
import { GolfCourse } from '../../types';
import { WeatherIcon } from '../common/WeatherIcon';
import { HourlyForecast } from '../weather/HourlyForecast';
import { WeeklyForecast } from '../weather/WeeklyForecast';

interface CourseDetailViewProps {
  course: GolfCourse;
  onBack: () => void;
}

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

export function CourseDetailView({ course, onBack }: CourseDetailViewProps) {
  return (
    <div className="max-w-md mx-auto min-h-screen pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 text-white px-4 py-6 rounded-b-3xl shadow-lg">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>목록으로</span>
        </button>
        
        <h2 className="mb-1">{course.name}</h2>
        <p className="text-green-100 mb-6">{course.location}</p>

        {/* Current Weather Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-5xl mb-2">{course.currentWeather.temperature}°</div>
              <div className="text-green-100">
                {getWeatherLabel(course.currentWeather.condition)}
              </div>
            </div>
            <WeatherIcon condition={course.currentWeather.condition} size={56} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-200" />
              <div>
                <div className="text-sm text-green-100">습도</div>
                <div>{course.currentWeather.humidity}%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-green-200" />
              <div>
                <div className="text-sm text-green-100">풍속</div>
                <div>{course.currentWeather.windSpeed}m/s</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-yellow-200" />
              <div>
                <div className="text-sm text-green-100">풍향</div>
                <div>{course.currentWeather.windDirection}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="px-4 mt-6">
        <h3 className="text-gray-900 mb-3">시간별 날씨</h3>
        <HourlyForecast forecast={course.hourlyForecast} />
      </div>

      {/* Weekly Forecast */}
      <div className="px-4 mt-6">
        <h3 className="text-gray-900 mb-3">주간 날씨</h3>
        <WeeklyForecast forecast={course.weeklyForecast} />
      </div>
    </div>
  );
}

