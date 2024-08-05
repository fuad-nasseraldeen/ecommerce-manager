// ./app/components/Layout.js
'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import Nav from './Nav'
import { useState } from 'react'
import Logo from './Logo'
import Home from './Home'
export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false)
  const { data: session } = useSession()
  if (!session) {
    return (
      <div className='bg-bgGray w-screen h-screen flex items-center'>
        <div className='text-center w-full'>
          <button onClick={() => signIn('google')} className='bg-white p-2 px-4 rounded-lg'>
            Login with Google
          </button>
        </div>
      </div>
    )
  }

  return <Home children={children} />
}
