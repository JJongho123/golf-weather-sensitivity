import { Sun, Cloud, CloudRain, CloudSnow, CloudDrizzle, Cloudy } from 'lucide-react';
import { WeatherCondition } from '../../types';

interface WeatherIconProps {
  condition: WeatherCondition;
  size?: number;
}

export function WeatherIcon({ condition, size = 24 }: WeatherIconProps) {
  const iconProps = {
    size,
    strokeWidth: 2,
  };

  switch (condition) {
    case 'sunny':
      return <Sun {...iconProps} className="text-yellow-500" />;
    case 'partly-cloudy':
      return <Cloudy {...iconProps} className="text-blue-400" />;
    case 'cloudy':
      return <Cloud {...iconProps} className="text-gray-400" />;
    case 'rainy':
      return <CloudRain {...iconProps} className="text-blue-600" />;
    case 'stormy':
      return <CloudDrizzle {...iconProps} className="text-indigo-600" />;
    case 'snowy':
      return <CloudSnow {...iconProps} className="text-blue-300" />;
    default:
      return <Sun {...iconProps} className="text-yellow-500" />;
  }
}

