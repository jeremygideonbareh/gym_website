'use client'

import React, { useState, useEffect, useRef } from 'react'

interface PageContent {
  heading: string
  description: string | React.ReactNode
}

interface PageData {
  leftBgImage: string | null
  rightBgImage: string | null
  leftContent: PageContent | null
  rightContent: PageContent | null
}

const pages: PageData[] = [
  {
    leftBgImage:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=90&fit=crop',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      heading: 'Expert Coaching',
      description:
        'World-class trainers with over a decade of experience transforming bodies and minds. Every session is evidence-based, results-driven.',
    },
  },
  {
    leftBgImage: null,
    rightBgImage:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=90&fit=crop',
    leftContent: {
      heading: 'Personalised Programmes',
      description:
        'No cookie-cutter plans. Your fitness journey is unique — we build strength, hypertrophy, and nutrition protocols tailored to your body and goals.',
    },
    rightContent: null,
  },
  {
    leftBgImage:
      'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=900&q=90&fit=crop',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      heading: 'Premium Equipment',
      description:
        'Train in a world-class facility with top-tier machines, free weights, and dedicated functional training zones designed for serious results.',
    },
  },
  {
    leftBgImage: null,
    rightBgImage:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=90&fit=crop',
    leftContent: {
      heading: 'Nutrition Guidance',
      description:
        'Fuel your transformation with personalised meal plans, macro coaching, and lifestyle strategies that keep you on track — inside and outside the gym.',
    },
    rightContent: null,
  },
  {
    leftBgImage:
      'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=900&q=90&fit=crop',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      heading: 'Ready to Transform?',
      description: <>Join FitForge Pro today — your best self starts now.</>,
    },
  },
]

interface ScrollAdventureProps {
  onEscapeUp?: () => void
  onEscapeDown?: () => void
  locked?: boolean
  initialPage?: number
}

export default function ScrollAdventure({ onEscapeUp, onEscapeDown, locked, initialPage }: ScrollAdventureProps) {
  const [currentPage, setCurrentPage] = useState(initialPage ?? 1)
  const numOfPages = pages.length
  const animTime = 1000
  const scrolling = useRef(false)
  const onEscapeUpRef = useRef(onEscapeUp)
  const onEscapeDownRef = useRef(onEscapeDown)
  onEscapeUpRef.current = onEscapeUp
  onEscapeDownRef.current = onEscapeDown

  useEffect(() => {
    if (!locked) return

    const navigateUp = () => {
      setCurrentPage((p) => {
        if (p <= 1) {
          onEscapeUpRef.current?.()
          return p
        }
        return p - 1
      })
    }

    const navigateDown = () => {
      setCurrentPage((p) => {
        if (p >= numOfPages) {
          onEscapeDownRef.current?.()
          return p
        }
        return p + 1
      })
    }

    const handleWheel = (e: WheelEvent) => {
      if (scrolling.current) return
      scrolling.current = true
      e.deltaY > 0 ? navigateDown() : navigateUp()
      setTimeout(() => (scrolling.current = false), animTime)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (scrolling.current) return
      if (e.key === 'ArrowUp') {
        scrolling.current = true
        navigateUp()
        setTimeout(() => (scrolling.current = false), animTime)
      } else if (e.key === 'ArrowDown') {
        scrolling.current = true
        navigateDown()
        setTimeout(() => (scrolling.current = false), animTime)
      }
    }

    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const handleTouchEnd = (e: TouchEvent) => {
      if (scrolling.current) return
      const deltaY = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(deltaY) < 40) return
      scrolling.current = true
      deltaY > 0 ? navigateDown() : navigateUp()
      setTimeout(() => (scrolling.current = false), animTime)
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [numOfPages, locked])

  return (
    <div className="relative overflow-hidden h-screen bg-black">
      {pages.map((page, i) => {
        const idx = i + 1
        const isActive = currentPage === idx
        const downOff = 'translateY(100%)'
        const upOff = 'translateY(-100%)'
        const leftTrans = isActive ? 'translateY(0)' : downOff
        const rightTrans = isActive ? 'translateY(0)' : upOff

        return (
          <div key={idx} className="absolute inset-0">
            {/* Left Half */}
            <div
              className="absolute top-0 left-0 w-1/2 h-full transition-transform duration-[1000ms]"
              style={{ transform: leftTrans }}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: page.leftBgImage
                    ? `url(${page.leftBgImage})`
                    : undefined,
                }}
              >
                <div className="w-full h-full bg-black/50 flex flex-col items-center justify-center text-white p-8">
                  {page.leftContent && (
                    <>
                      <h2 className="text-xl md:text-3xl lg:text-5xl font-barlow font-bold uppercase mb-4 md:mb-6 text-center px-2">
                        {page.leftContent.heading}
                      </h2>
                      {typeof page.leftContent.description === 'string' ? (
                        <p className="text-xs md:text-base lg:text-xl font-inter text-center max-w-[160px] md:max-w-md px-1">
                          {page.leftContent.description}
                        </p>
                      ) : (
                        <div className="text-xs md:text-base lg:text-xl font-inter text-center max-w-[160px] md:max-w-md px-1">
                          {page.leftContent.description}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Half */}
            <div
              className="absolute top-0 left-1/2 w-1/2 h-full transition-transform duration-[1000ms]"
              style={{ transform: rightTrans }}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: page.rightBgImage
                    ? `url(${page.rightBgImage})`
                    : undefined,
                }}
              >
                <div className="w-full h-full bg-black/50 flex flex-col items-center justify-center text-white p-8">
                  {page.rightContent && (
                    <>
                      <h2 className="text-xl md:text-3xl lg:text-5xl font-barlow font-bold uppercase mb-4 md:mb-6 text-center px-2">
                        {page.rightContent.heading}
                      </h2>
                      {typeof page.rightContent.description === 'string' ? (
                        <p className="text-xs md:text-base lg:text-xl font-inter text-center max-w-[160px] md:max-w-md px-1">
                          {page.rightContent.description}
                        </p>
                      ) : (
                        <div className="text-xs md:text-base lg:text-xl font-inter text-center max-w-[160px] md:max-w-md px-1">
                          {page.rightContent.description}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Skip up / down buttons */}
            <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 md:gap-3">
              <button
                onClick={onEscapeUp}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur flex items-center justify-center text-white/70 hover:text-white transition-all"
                title="Skip up"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button
                onClick={onEscapeDown}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur flex items-center justify-center text-white/70 hover:text-white transition-all"
                title="Skip down"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Page indicator dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3 md:gap-4">
              {pages.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentPage(dotIdx + 1)}
                  className={`w-4 h-4 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    currentPage === dotIdx + 1
                      ? 'bg-primary scale-125'
                      : 'bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            {/* Scroll hint */}
            {isActive && (
              <div className="absolute bottom-8 right-8 z-10 animate-bounce">
                <svg
                  className="w-6 h-6 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
