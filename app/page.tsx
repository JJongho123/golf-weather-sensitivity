'use client'

import { useEffect } from 'react'
import { useState } from 'react'
import { CourseListView } from './components/CourseListView'
import { CourseDetailView } from './components/CourseDetailView'
import { GolfCourse } from './types'

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState<GolfCourse | null>(null)

  useEffect(() => {
    // Capacitor가 브라우저에서 실행 중인지 확인
    if (typeof window !== 'undefined') {
      import('@capacitor/core').then(({ Capacitor }) => {
        if (Capacitor.isNativePlatform()) {
          console.log('네이티브 앱에서 실행 중')
          // 네이티브 기능 초기화
          initializeNativeFeatures()
        } else {
          console.log('웹 브라우저에서 실행 중')
        }
      }).catch(err => {
        console.log('Capacitor 로드 실패:', err)
      })
    }
  }, [])

  const initializeNativeFeatures = async () => {
    try {
      // StatusBar 설정
      const { StatusBar, Style } = await import('@capacitor/status-bar')
      await StatusBar.setStyle({ style: Style.Light })
      await StatusBar.setBackgroundColor({ color: '#16a34a' })
      
      // Keyboard 설정
      const { Keyboard } = await import('@capacitor/keyboard')
      Keyboard.setAccessoryBarVisible({ isVisible: true })
    } catch (error) {
      console.log('네이티브 기능 초기화 실패:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {!selectedCourse ? (
        <CourseListView onSelectCourse={setSelectedCourse} />
      ) : (
        <CourseDetailView 
          course={selectedCourse} 
          onBack={() => setSelectedCourse(null)} 
        />
      )}
    </div>
  )
}
