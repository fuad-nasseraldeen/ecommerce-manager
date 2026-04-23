// ./app/components/Layout.js
'use client'
import { useSession, signIn } from 'next-auth/react'
import Home from './Home'
export default function Layout({ children }) {
  const { data: session } = useSession()
  if (!session) {
    return (
      <div className='flex h-screen w-screen items-center justify-center bg-slate-50 p-4'>
        <div className='w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl'>
          <h1 className='mt-0 text-2xl'>Ecommerce Manager</h1>
          <p className='mb-6 text-sm text-slate-600'>Sign in to manage products, categories, and orders.</p>
          <button
            onClick={() => signIn('google')}
            className='btn-primary w-full py-3 text-base'
          >
            Login with Google
          </button>
        </div>
      </div>
    )
  }

  return <Home children={children} />
}
