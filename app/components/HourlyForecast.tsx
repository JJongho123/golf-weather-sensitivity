import { HourlyWeather } from '../types';
import { WeatherIcon } from './WeatherIcon';

interface HourlyForecastProps {
  forecast: HourlyWeather[];
}

export function HourlyForecast({ forecast }: HourlyForecastProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 overflow-hidden">
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {forecast.map((hour, index) => (
          <div 
            key={index}
            className="flex flex-col items-center min-w-[70px] gap-2 py-2"
          >
            <div className="text-sm text-gray-600">{hour.time}</div>
            <WeatherIcon condition={hour.condition} size={32} />
            <div className="text-gray-900">{hour.temperature}°</div>
            <div className="text-xs text-blue-600">{hour.precipitationChance}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

