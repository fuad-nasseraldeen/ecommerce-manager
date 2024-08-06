import { BounceLoader } from 'react-spinners'

export default function Spinner() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <BounceLoader color={'#5542F6'} speedMultiplier={2} size={'50px'} />
    </div>
  )
}
