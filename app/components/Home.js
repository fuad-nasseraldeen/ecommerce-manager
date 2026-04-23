import Nav from './Nav'
import { useState } from 'react'
import Logo from './Logo'

export default function Home({ children }) {
  const [showNav, setShowNav] = useState(false)

  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='flex items-center border-b border-slate-200 bg-white px-4 py-3 md:hidden'>
        <button onClick={() => setShowNav(true)}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
            <path
              fillRule='evenodd'
              d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        <div className='mr-6 flex grow justify-center'>
          <Logo />
        </div>
      </div>
      <div className='flex'>
        <Nav show={showNav} onClose={() => setShowNav(false)} />
        <main className='flex-1 p-3 sm:p-4 lg:p-6'>{children}</main>
      </div>
    </div>
  )
}
