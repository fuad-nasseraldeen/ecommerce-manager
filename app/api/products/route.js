// app/api/products/route.js

import { Product } from '../../../models/Product'
import { mongooseConnect } from '../../../lib/mongoose'
// import { isAdminRequest } from '../auth/[...nextauth]/route'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export async function GET(req) {
  await mongooseConnect()
  // await isAdminRequest()

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (id) {
    const product = await Product.findOne({ _id: id })
    return new Response(JSON.stringify(product), { status: 200 })
  } else {
    const products = await Product.find()
    return new Response(JSON.stringify(products), { status: 200 })
  }
}

export async function POST(req) {
  await mongooseConnect()
  // await isAdminRequest()

  const { title, description, price, images, category, properties } = await req.json()
  try {
    console.log(`Received POST request at /api/products`)
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      category,
      properties,
    })
    return new Response(JSON.stringify(productDoc), { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return new Response(JSON.stringify({ message: 'Error creating product' }), { status: 500 })
  }
}

export async function PUT(req, res) {
  try {
    await mongooseConnect()
    // await isAdminRequest()

    const { _id, title, description, price, images, category, properties } = await req.json()
    if (!_id) {
      return new Response(JSON.stringify({ message: 'Product ID is required' }), { status: 400 })
    }
    const response = await Product.updateOne({ _id }, { title, description, price, images, category, properties })
    return new Response(JSON.stringify(response), { status: 201 })
  } catch (error) {
    console.error('Error updating product:', error)
    return new Response(JSON.stringify({ message: 'Error updating product' }), { status: 500 })
  }
}

export async function DELETE(req, res) {
  try {
    await mongooseConnect()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return new Response(JSON.stringify({ message: 'Product ID is required' }), { status: 400 })
    }
    await Product.findByIdAndDelete(id)
    return new Response(null, { status: 204 }) // Using native Response for 204 status
  } catch (error) {
    console.error('Error deleting product:', error)
    return new Response(JSON.stringify({ message: 'Error deleting product' }), { status: 500 })
  }
}
