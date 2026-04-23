import { BounceLoader } from 'react-spinners'

export default function Spinner({ fullScreen = true }) {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'h-screen' : 'h-24'}`}>
      <BounceLoader color={'#0f766e'} speedMultiplier={1.6} size={'50px'} />
    </div>
  )
}
