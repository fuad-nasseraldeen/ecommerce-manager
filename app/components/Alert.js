export default function Alert({ alertType, alertMessage }) {
  if (!alertMessage) {
    return null
  }

  return (
    alertType && (
      <div className='bg-red-700 text-center py-3 lg:px-4 rounded-2xl'>
        <div
          className='p-2 bg-red-800 items-center text-red-100 rounded-md leading-none lg:rounded-full flex lg:inline-flex'
          role='alert'
        >
          <span className='flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3'>Error</span>
          <span className='font-semibold mr-2 text-left flex-auto'>{alertMessage}</span>
        </div>
      </div>
    )
  )
}
