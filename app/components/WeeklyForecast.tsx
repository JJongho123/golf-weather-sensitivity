import { DailyWeather } from '../types';
import { WeatherIcon } from './WeatherIcon';

interface WeeklyForecastProps {
  forecast: DailyWeather[];
}

const getWeatherLabel = (condition: string) => {
  const labels: Record<string, string> = {
    'sunny': '맑음',
    'partly-cloudy': '구름조금',
    'cloudy': '흐림',
    'rainy': '비',
    'stormy': '폭우',
    'snowy': '눈',
  };
  return labels[condition] || condition;
};

export function WeeklyForecast({ forecast }: WeeklyForecastProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      {forecast.map((day, index) => (
        <div 
          key={index}
          className={`flex items-center justify-between px-4 py-4 ${
            index !== forecast.length - 1 ? 'border-b border-gray-100' : ''
          }`}
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 text-center">
              <div className="text-sm text-gray-600">{day.date}</div>
              <div className="text-gray-900">{day.dayOfWeek}</div>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <WeatherIcon condition={day.condition} size={28} />
              <span className="text-sm text-gray-600">{getWeatherLabel(day.condition)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-xs text-blue-600 w-10 text-right">
              {day.precipitationChance}%
            </div>
            <div className="flex gap-2 w-20 justify-end">
              <span className="text-red-500">{day.highTemp}°</span>
              <span className="text-gray-400">/</span>
              <span className="text-blue-500">{day.lowTemp}°</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

