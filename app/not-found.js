import Link from 'next/link'

export default function Custom404() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100'>
      <div className='text-center'>
        <h1 className='text-9xl font-bold text-indigo-600'>404</h1>
        <h2 className='text-4xl font-semibold mt-4'>Page Not Found</h2>
        <p className='text-lg mt-2 text-gray-600'>Sorry, the page you are looking for does not exist.</p>
        <Link href='/' legacyBehavior>
          <a className='mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700'>
            Go Back Home
          </a>
        </Link>
      </div>
    </div>
  )
}
