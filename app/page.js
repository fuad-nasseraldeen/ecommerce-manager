// ./app/page.js
'use client'

import Layout from './components/Layout'
import { useSession } from 'next-auth/react'

export default function Page() {
  const { data: session } = useSession()
  return (
    <Layout>
      <div className='flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between'>
        <h2 className='text-xl font-semibold text-slate-900'>
          Hello, <span className='text-primary'>{session?.user?.name}</span>
        </h2>
        <div className='flex max-w-full items-center gap-2 rounded-lg bg-slate-100 p-1 text-slate-800'>
          {session?.user?.image && <img src={session.user.image} alt='' className='h-8 w-8 rounded-full' />}
          <span className='truncate px-2 text-sm font-medium'>{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  )
}
