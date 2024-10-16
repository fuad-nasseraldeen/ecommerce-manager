import './styles/globals.css'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../utils/authOptions.ts'
import CustomSessionProvider from './components/SessionProviders'

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang='en'>
      <body>
        <CustomSessionProvider session={session}>{children}</CustomSessionProvider>
      </body>
    </html>
  )
}
