export interface GolfCourse {
  id: string;
  name: string;
  location: string;
  region: string;
  currentWeather: WeatherData;
  hourlyForecast: HourlyWeather[];
  weeklyForecast: DailyWeather[];
}

export interface WeatherData {
  temperature: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  windDirection: string;
}

export interface HourlyWeather {
  time: string;
  temperature: number;
  condition: WeatherCondition;
  precipitationChance: number;
}

export interface DailyWeather {
  date: string;
  dayOfWeek: string;
  highTemp: number;
  lowTemp: number;
  condition: WeatherCondition;
  precipitationChance: number;
}

export type WeatherCondition =
  | "sunny"
  | "partly-cloudy"
  | "cloudy"
  | "rainy"
  | "stormy"
  | "snowy";

export type Region =
  | "seoulGyeonggi"
  | "gangwon"
  | "chungbuk"
  | "chungnam"
  | "gyeongbuk"
  | "gyeongnam"
  | "jeonbuk"
  | "jeonnam"
  | "jeju";

