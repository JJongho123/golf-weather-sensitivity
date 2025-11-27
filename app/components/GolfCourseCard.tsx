import { MapPin } from 'lucide-react';
import { GolfCourse } from '../types';
// import { WeatherIcon } from './WeatherIcon';

interface GolfCourseCardProps {
  course: GolfCourse;
  onClick: () => void;
}

export function GolfCourseCard({ course, onClick }: GolfCourseCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-4 text-left border border-gray-100 active:scale-98"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-gray-900 mb-1">{course.name}</h3>
          <div className="flex items-center gap-1 text-gray-500 mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{course.location}</span>
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

