import Nav from './Nav'
import { useState } from 'react'
import Logo from './Logo'

export default function Home({ children }) {
  const [showNav, setShowNav] = useState(false)

  return (
    <div className='bg-blue-50 min-h-screen '>
      <div className='block md:hidden flex items-center p-4'>
        <button onClick={() => setShowNav(true)}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
            <path
              fillRule='evenodd'
              d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        <div className='flex grow justify-center mr-6'>
          <Logo />
        </div>
      </div>
      <div className='flex'>
        <Nav show={showNav} />
        <div className='flex-grow p-4'>{children}</div>
      </div>
    </div>
  )
}
