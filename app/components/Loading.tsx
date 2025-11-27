import { Loader2 } from 'lucide-react';

interface LoadingProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function Loading({ text = '로딩 중...', size = 'md' }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <Loader2 className={`${sizeMap[size]} animate-spin text-green-600`} />
      {text && <p className="text-gray-500 text-sm">{text}</p>}
    </div>
  );
}

// 골프장 목록 스켈레톤 UI
export function CourseListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-1/2 mt-2 animate-pulse" />
        </div>
      ))}
    </div>
  );
}
