import { useState } from 'react'
import Image from 'next/image'

export default function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images?.length) {
    return <div className='flex h-full items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-500'>No image</div>
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className='relative w-full h-full'>
      <div className='relative w-full h-full'>
        <Image
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Product image ${currentIndex}`}
          fill
          sizes='(max-width: 768px) 100vw, 33vw'
          className='rounded-lg object-contain'
          unoptimized
          priority={currentIndex === 0}
        />
      </div>
      <button
        type='button'
        className='group absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-2 focus:outline-none md:px-4'
        onClick={handlePrev}
      >
        <span className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/30 group-hover:bg-primary/50 group-focus:outline-none focus:ring-4 focus:ring-white'>
          <svg
            className='w-4 h-4 text-white'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 6 10'
          >
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 1 1 5l4 4' />
          </svg>
          <span className='sr-only'>Previous</span>
        </span>
      </button>
      <button
        type='button'
        className='group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-2 focus:outline-none md:px-4'
        onClick={handleNext}
      >
        <span className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/30 group-hover:bg-primary/50 group-focus:outline-none focus:ring-4 focus:ring-white'>
          <svg
            className='w-4 h-4 text-white'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 6 10'
          >
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 9 4-4-4-4' />
          </svg>
          <span className='sr-only'>Next</span>
        </span>
      </button>
    </div>
  )
}
