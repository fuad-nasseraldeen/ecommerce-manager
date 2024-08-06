// src/app/api/auth/[...nextauth].js
import NextAuth, { getServerSession } from 'next-auth'
import { authOptions } from '../../../../utils/authOptions'

const adminEmails = ['fuad.nasseraldeen@gmail.com']

const handler = async (req, res) => {
  console.log('API Route Hit')
  return NextAuth(req, res, authOptions)
}

export { handler as GET, handler as POST }

// export async function isAdminRequest() {
//   const session = await getServerSession(authOptions)
//   if (!adminEmails.includes(session?.user?.email)) {
//     throw new Error('not an admin')
//   }
// }
