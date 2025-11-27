import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn 함수는 여러 className을 병합하는 유틸리티 함수입니다.
 * clsx로 조건부 클래스를 처리하고, tailwind-merge로 중복 Tailwind 클래스를 최적화합니다.
 * 
 * @example
 * cn('px-4 py-2', isActive && 'bg-blue-500', 'hover:bg-blue-600')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

