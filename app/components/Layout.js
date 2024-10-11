// ./app/components/Layout.js
'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import Home from './Home'
export default function Layout({ children }) {
  const { data: session } = useSession()
  if (!session) {
    return (
      <div className='bg-blue-50 w-screen h-screen flex items-center'>
        <div className='text-center w-full'>
          <button
            onClick={() => signIn('google')}
            className='bg-bgGray p-2 px-4 rounded-lg border border-purple-100 border-spacing-0 text-xl hover:scale-95'
          >
            Login with Google
          </button>
        </div>
      </div>
    )
  }

  return <Home children={children} />
}
