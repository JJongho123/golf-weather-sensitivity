import { Region } from '../types';

interface RegionFilterProps {
  selectedRegion: Region;
  onSelectRegion: (region: Region) => void;
}

// 지역별 BOX 좌표 (경도, 위도 순서: BOX(minx, miny, maxx, maxy))
export const regionBoxCoordinates: Record<Region, string> = {
  all: 'BOX(124.5,33.0,132.0,38.6)', // 한국 전체
  seoulGyeonggi: 'BOX(126.5,37.2,127.8,38.2)', // 서울/경기
  chungbuk: 'BOX(127.3,36.0,128.5,37.2)', // 충북 (수원 제외, 경기도와 경계 조정)
  chungnam: 'BOX(126.0,36.0,127.3,37.0)', // 충남
  gyeongbuk: 'BOX(128.0,35.5,130.0,37.5)', // 경북
  gyeongnam: 'BOX(127.5,34.8,129.5,36.0)', // 경남
  jeonbuk: 'BOX(126.5,35.0,127.8,36.5)', // 전북
  jeonnam: 'BOX(126.0,34.0,128.0,35.5)', // 전남
  jeju: 'BOX(126.0,33.0,127.0,34.0)', // 제주도
  gangwon: 'BOX(127.0,37.0,129.5,38.6)', // 강원
};


const regions: { value: Region; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'seoulGyeonggi', label: '서울/경기' },
  { value: 'chungbuk', label: '충북' },
  { value: 'chungnam', label: '충남' },
  { value: 'gyeongbuk', label: '경북' },
  { value: 'gyeongnam', label: '경남' },
  { value: 'jeonbuk', label: '전북' },
  { value: 'jeonnam', label: '전남' },
  { value: 'jeju', label: '제주도' },
  { value: 'gangwon', label: '강원' },
];

export function RegionFilter({ selectedRegion, onSelectRegion }: RegionFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {regions.map(region => (
        <button
          key={region.value}
          onClick={() => onSelectRegion(region.value)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
            selectedRegion === region.value
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-green-400'
          }`}
        >
          {region.label}
        </button>
      ))}
    </div>
  );
}

