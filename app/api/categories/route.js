import { Category } from 'base/models/Category'
import { mongooseConnect } from 'base/lib/mongoose'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/api/auth/[...nextauth]/route'

export async function GET(req, res) {
  await mongooseConnect()
  // await isAdminRequest()
  const categories = await Category.find().populate('parent')
  return new Response(JSON.stringify(categories), { status: 200 })
}

export async function POST(req) {
  await mongooseConnect()
  // await isAdminRequest()

  try {
    const { name, parentCategory, properties } = await req.json()
    const categoryDoc = await Category.create({
      name,
      parent: parentCategory || undefined,
      properties,
    })
    return new Response(JSON.stringify(categoryDoc), { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return new Response(JSON.stringify({ message: 'Error creating category' }), { status: 500 })
  }
}

export async function PUT(req, res) {
  try {
    await mongooseConnect()
    // await isAdminRequest()

    const { name, parentCategory, properties, _id } = await req.json()
    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        parent: parentCategory || undefined,
        properties,
      },
    )
    return new Response(JSON.stringify(categoryDoc), { status: 201 })
  } catch (error) {
    console.error('Error updating Category:', error)
    return new Response(JSON.stringify({ message: 'Error updating Category' }), { status: 500 })
  }
}

export async function DELETE(req, res) {
  try {
    await mongooseConnect()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    await Category.deleteOne({ id })
    return new Response(null, { status: 204 }) // Using native Response for 204 status
  } catch (error) {
    console.error('Error deleting category', error)
    return new Response(JSON.stringify({ message: 'Error deleting category' }), { status: 500 })
  }
}
