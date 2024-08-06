import { useState } from 'react'
import Image from 'next/image'

export default function Carousel({ images, id }) {
  const [currentIndex, setCurrentIndex] = useState(0)

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
          layout='fill'
          objectFit='contain'
          className='rounded-lg'
        />
      </div>
      <button
        type='button'
        className='absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
        onClick={handlePrev}
      >
        <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/30 group-hover:bg-primary/50 focus:ring-4 focus:ring-white group-focus:outline-none'>
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
        className='absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
        onClick={handleNext}
      >
        <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/30 group-hover:bg-primary/50 focus:ring-4 focus:ring-white group-focus:outline-none'>
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
