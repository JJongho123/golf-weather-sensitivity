// 기상청 단기예보 API 유틸리티
// 공공데이터포털: https://www.data.go.kr/data/15084084/openapi.do

import { WeatherCondition, HourlyWeather, DailyWeather, WeatherData } from '@/app/types';

/**
 * 위경도를 기상청 격자 좌표로 변환
 * 기상청은 5km×5km 격자 좌표계를 사용합니다
 */
export function convertLatLonToGrid(lat: number, lon: number): { nx: number; ny: number } {
  const RE = 6371.00877; // 지구 반경(km)
  const GRID = 5.0; // 격자 간격(km)
  const SLAT1 = 30.0; // 투영 위도1(degree)
  const SLAT2 = 60.0; // 투영 위도2(degree)
  const OLON = 126.0; // 기준점 경도(degree)
  const OLAT = 38.0; // 기준점 위도(degree)
  const XO = 43; // 기준점 X좌표(GRID)
  const YO = 136; // 기준점 Y좌표(GRID)

  const DEGRAD = Math.PI / 180.0;
  const RADDEG = 180.0 / Math.PI;

  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  let ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);
  let theta = lon * DEGRAD - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;

  const nx = Math.floor(ra * Math.sin(theta) + XO + 0.5);
  const ny = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

  return { nx, ny };
}

/**
 * 현재 날짜와 시간을 API 형식으로 변환
 * 단기예보 API는 하루 8회 발표 (02:10, 05:10, 08:10, 11:10, 14:10, 17:10, 20:10, 23:10)
 */
export function getBaseDateTime(): { base_date: string; base_time: string } {
  const now = new Date();

  // 단기예보 발표 시각 (24시간 형식, 정렬된 상태)
  const forecastTimes = ['0210', '0510', '0810', '1110', '1410', '1710', '2010', '2310'];

  // 현재 시각을 HHMM 형식으로 변환
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 100 + currentMinute;

  // 가장 최근 발표 시각 찾기
  let baseTime = forecastTimes[forecastTimes.length - 1]; // 기본값: 전날 23:10
  let useYesterday = true;

  for (const time of forecastTimes) {
    const timeNum = parseInt(time);
    if (currentTime >= timeNum) {
      baseTime = time;
      useYesterday = false;
    } else {
      break;
    }
  }

  // 발표일자: YYYYMMDD 형식
  const targetDate = useYesterday ? new Date(now.getTime() - 24 * 60 * 60 * 1000) : now;
  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');
  const baseDate = `${year}${month}${day}`;

  return { base_date: baseDate, base_time: baseTime };
}

// 기상청 API 응답 타입 정의
interface WeatherApiItem {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

interface UltraSrtNcstItem {
  baseDate: string;
  baseTime: string;
  category: string;
  nx: number;
  ny: number;
  obsrValue: string;
}

interface WeatherApiResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: WeatherApiItem[];
      };
    };
  };
}

interface UltraSrtNcstResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: UltraSrtNcstItem[];
      };
    };
  };
}

/**
 * SKY와 PTY 코드를 WeatherCondition으로 변환
 */
function getWeatherCondition(sky: string, pty: string): WeatherCondition {
  // 강수형태 우선 확인
  const ptyCode = parseInt(pty);
  if (ptyCode === 1 || ptyCode === 4) return 'rainy';  // 비 또는 소나기
  if (ptyCode === 2) return 'rainy';  // 비/눈
  if (ptyCode === 3) return 'snowy';  // 눈
  
  // 하늘상태 확인
  const skyCode = parseInt(sky);
  if (skyCode === 1) return 'sunny';      // 맑음
  if (skyCode === 3) return 'partly-cloudy'; // 구름많음
  if (skyCode === 4) return 'cloudy';     // 흐림
  
  return 'sunny'; // 기본값
}

/**
 * 풍향 각도를 방향 문자열로 변환
 */
function getWindDirection(deg: number): string {
  const directions = ['북', '북동', '동', '동남', '남', '남서', '서', '북서'];
  const index = Math.round(deg / 45) % 8;
  return directions[index] || '북';
}

/**
 * 초단기실황 데이터를 현재 날씨로 파싱
 */
export function parseCurrentWeather(data: UltraSrtNcstResponse): WeatherData {
  const items = data.response.body.items.item;
  
  // 각 category를 객체로 변환
  const weather: Record<string, string> = {};
  items.forEach(item => {
    weather[item.category] = item.obsrValue;
  });
  
  const temperature = parseFloat(weather.T1H || '0');
  const humidity = parseInt(weather.REH || '0');
  const windSpeed = parseFloat(weather.WSD || '0');
  const windDirection = getWindDirection(parseInt(weather.VEC || '0'));
  
  // 초단기실황에는 SKY 정보가 없으므로 PTY만 확인
  const pty = parseInt(weather.PTY || '0');
  let condition: WeatherCondition = 'sunny';
  if (pty === 1 || pty === 4) condition = 'rainy';
  else if (pty === 2) condition = 'rainy';
  else if (pty === 3) condition = 'snowy';
  
  return {
    temperature,
    condition,
    humidity,
    windSpeed,
    windDirection,
  };
}

/**
 * 단기예보 데이터를 시간별/일별 날씨로 파싱
 */
export function parseForecastData(
  forecastData: WeatherApiResponse,
  currentData: UltraSrtNcstResponse
): {
  currentWeather: WeatherData;
  hourlyForecast: HourlyWeather[];
  weeklyForecast: DailyWeather[];
} {
  const items = forecastData.response.body.items.item;
  
  // 현재 날씨 파싱
  const currentWeather = parseCurrentWeather(currentData);
  
  // 시간별로 그룹화
  const hourlyMap = new Map<string, Record<string, string>>();
  console.log('items', items);

  items.forEach((item) => {
    const key = `${item.fcstDate}_${item.fcstTime}`;
    if (!hourlyMap.has(key)) {
      hourlyMap.set(key, {});
    }
    hourlyMap.get(key)![item.category] = item.fcstValue;
  });

  // 현재 시각 기준으로 24시간 데이터만 추출
  const now = new Date();

  // 시간별 데이터 변환
  const hourly: HourlyWeather[] = Array.from(hourlyMap.entries())
    .map(([key, data]) => {
      const [date, time] = key.split('_');
      const hourNum = parseInt(time.substring(0, 2));

      // 날짜와 시간을 timestamp로 변환
      const itemDate = new Date(
        parseInt(date.substring(0, 4)),
        parseInt(date.substring(4, 6)) - 1,
        parseInt(date.substring(6, 8)),
        hourNum
      );

      return {
        time: `${String(hourNum).padStart(2, '0')}시`,
        date: date,
        hourNum: hourNum,
        timestamp: itemDate.getTime(),
        temperature: parseFloat(data.TMP || '0'),
        condition: getWeatherCondition(
          data.SKY || '1',
          data.PTY || '0'
        ),
        precipitationChance: parseInt(data.POP || '0'),
      };
    })
    .filter(item => item.timestamp >= now.getTime()) // 현재 시각 이후만
    .sort((a, b) => a.timestamp - b.timestamp) // 시간순 정렬
    .slice(0, 24) // 최대 24시간
    .map(({ hourNum, date, timestamp, ...rest }) => rest); // 불필요한 필드 제거

  // 일별 데이터 변환 (최고/최저 기온 추출)
  const dailyMap = new Map<string, {
    highTemp: number;
    lowTemp: number;
    conditions: { sky: string; pty: string }[];
    pop: number[];
  }>();

  items.forEach((item) => {
    const date = item.fcstDate;
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        highTemp: -999,
        lowTemp: 999,
        conditions: [],
        pop: [],
      });
    }

    const dayData = dailyMap.get(date)!;

    if (item.category === 'TMX') {
      dayData.highTemp = Math.max(dayData.highTemp, parseFloat(item.fcstValue));
    }
    if (item.category === 'TMN') {
      dayData.lowTemp = Math.min(dayData.lowTemp, parseFloat(item.fcstValue));
    }
    if (item.category === 'SKY' || item.category === 'PTY') {
      if (item.category === 'SKY') {
        const existing = dayData.conditions.find(c => c.sky);
        if (existing) {
          existing.sky = item.fcstValue;
        } else {
          dayData.conditions.push({ sky: item.fcstValue, pty: '0' });
        }
      }
      if (item.category === 'PTY') {
        const existing = dayData.conditions.find(c => c.pty);
        if (existing) {
          existing.pty = item.fcstValue;
        } else {
          dayData.conditions.push({ sky: '1', pty: item.fcstValue });
        }
      }
    }
    if (item.category === 'POP') {
      dayData.pop.push(parseInt(item.fcstValue));
    }
  });

  const weekly: DailyWeather[] = Array.from(dailyMap.entries())
    .map(([date, data]) => {
      const dateObj = new Date(
        parseInt(date.substring(0, 4)),
        parseInt(date.substring(4, 6)) - 1,
        parseInt(date.substring(6, 8))
      );
      
      const condition = getWeatherCondition(
        data.conditions[0]?.sky || '1',
        data.conditions[0]?.pty || '0'
      );
      
      return {
        date: `${date.substring(4, 6)}/${date.substring(6, 8)}`,
        dayOfWeek: ['일', '월', '화', '수', '목', '금', '토'][dateObj.getDay()],
        highTemp: data.highTemp === -999 ? 0 : data.highTemp,
        lowTemp: data.lowTemp === 999 ? 0 : data.lowTemp,
        condition,
        precipitationChance: data.pop.length > 0 ? Math.max(...data.pop, 0) : 0,
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 7); // 최대 7일

  return {
    currentWeather,
    hourlyForecast: hourly,
    weeklyForecast: weekly,
  };
}

