// src/app/api/auth/[...nextauth].js
import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../../lib/mongodb'

const adminEmails = ['fuad.nasseraldeen@gmail.com']

const authOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
}

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
