import { NextResponse } from 'next/server'
import mime from 'mime-types'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { mongooseConnect } from 'base/lib/mongoose'
import { isAdminRequest } from '@/api/auth/[...nextauth]/route'

const bucketName = process.env.AWS_BUCKET_NAME

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
})

export async function POST(req) {
  await mongooseConnect()
  // await isAdminRequest(req, res)

  const formData = await req.formData()
  const file = formData.get('file')

  console.log('form data', formData, file)

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer())
  const ext = file.name.split('.').pop()
  const newFilename = `${Date.now()}.${ext}`

  try {
    const putObjectCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: newFilename,
      Body: fileBuffer,
      ContentType: mime.lookup(file.name),
    })

    await s3.send(putObjectCommand)

    const link = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${newFilename}`
    return NextResponse.json({ link: [link] })
  } catch (error) {
    console.error('Error uploading file to S3:', error)
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
  }
}

export async function DELETE(req, res) {
  try {
    await mongooseConnect()
    const { searchParams } = new URL(req.url)
    const url = searchParams.get('id')
    if (!url) {
      return new Response(JSON.stringify({ message: 'Image ID is required' }), { status: 400 })
    }

    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: url.split('/').pop(),
    })
    await s3.send(deleteObjectCommand)

    return new Response(JSON.stringify({ message: 'Image deleted successfully' }), { status: 200 })
  } catch (error) {
    console.error('Error deleting image:', error)
    return new Response(JSON.stringify({ message: 'Error deleting image' }), { status: 500 })
  }
}
