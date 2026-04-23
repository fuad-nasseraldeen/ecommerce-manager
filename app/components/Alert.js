export default function Alert({ alertType, alertMessage }) {
  if (!alertMessage) {
    return null
  }

  return (
    alertType && (
      <div className='rounded-xl bg-rose-600 px-3 py-2 text-center lg:px-4'>
        <div
          className='flex items-center rounded-md bg-rose-700 p-2 leading-none text-rose-100 lg:inline-flex lg:rounded-full'
          role='alert'
        >
          <span className='mr-3 flex rounded-full bg-rose-500 px-2 py-1 text-xs font-bold uppercase'>Error</span>
          <span className='mr-2 flex-auto text-left font-semibold'>{alertMessage}</span>
        </div>
      </div>
    )
  )
}
