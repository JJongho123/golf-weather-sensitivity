import { MapPin, Loader2 } from 'lucide-react';
import { GolfCourse } from '../../types';
// import { WeatherIcon } from './WeatherIcon';

interface GolfCourseCardProps {
  course: GolfCourse;
  onClick: () => void;
  // 좌표 정보 (선택적)
  coordinates?: [number, number]; // [lng, lat]
  disabled?: boolean;
}

export function GolfCourseCard({ course, onClick, coordinates, disabled }: GolfCourseCardProps) {
  // location이 없고 coordinates가 있으면 좌표를 표시
  const locationText = course.location || 
    (coordinates ? 
      `좌표: ${coordinates[1].toFixed(4)}, ${coordinates[0].toFixed(4)}` : 
      '위치 정보 없음');

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-4 text-left border border-gray-100 active:scale-98 ${
        disabled ? 'opacity-60 cursor-wait' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-gray-900 font-semibold">{course.name}</h3>
            {disabled && <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />}
          </div>
          <div className="flex items-center gap-1 text-gray-500 mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{locationText}</span>
          </div>
          
          {/* <div className="flex items-center gap-4 text-sm text-gray-600">
            <div>
              습도 <span className="text-gray-900">{course.currentWeather.humidity}%</span>
            </div>
            <div>
              풍속 <span className="text-gray-900">{course.currentWeather.windSpeed}m/s</span>
            </div>
            <div>
              <span className="text-gray-900">{course.currentWeather.windDirection}</span>
            </div>
          </div> */}
        </div>
        
        {/* <div className="flex flex-col items-center ml-4">
          <WeatherIcon condition={course.currentWeather.condition} size={40} />
          <div className="text-gray-900 mt-2">{course.currentWeather.temperature}°</div>
        </div> */}
      </div>
    </button>
  );
}

