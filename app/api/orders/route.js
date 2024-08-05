import { mongooseConnect } from 'base/lib/mongoose'
import { Order } from 'base/models/Order'

export async function GET(req, res) {
  await mongooseConnect()
  // await isAdminRequest()
  const orders = await Order.find().sort({ createdAt: -1 })
  return new Response(JSON.stringify(orders), { status: 200 })
}
