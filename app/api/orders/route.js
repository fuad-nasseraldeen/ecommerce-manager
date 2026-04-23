import { mongooseConnect } from 'base/lib/mongoose'
import { Order } from 'base/models/Order'

export const dynamic = 'force-dynamic'

export async function GET(req, res) {
  await mongooseConnect()
  // await isAdminRequest()
  const orders = await Order.find().sort({ createdAt: -1 })
  return new Response(JSON.stringify(orders), { status: 200 })
}
