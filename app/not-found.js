import Link from 'next/link'

export default function Custom404() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-slate-100 p-4'>
      <div className='text-center'>
        <h1 className='text-9xl font-bold text-primary'>404</h1>
        <h2 className='text-4xl font-semibold mt-4'>Page Not Found</h2>
        <p className='text-lg mt-2 text-gray-600'>Sorry, the page you are looking for does not exist.</p>
        <Link href='/' className='btn-primary mt-6 inline-block px-6 py-3'>
          Go Back Home
        </Link>
      </div>
    </div>
  )
}
