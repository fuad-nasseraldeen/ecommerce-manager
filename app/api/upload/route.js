import { NextResponse } from 'next/server'
import mime from 'mime-types'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
// import { isAdminRequest } from '@/api/auth/[...nextauth]/route'

export const dynamic = 'force-dynamic'

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.S3_ACCESS_KEY
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})

function validateAwsEnv() {
  const missing = []
  if (!bucketName) missing.push('AWS_BUCKET_NAME')
  if (!region) missing.push('AWS_REGION')
  if (!accessKeyId) missing.push('S3_ACCESS_KEY')
  if (!secretAccessKey) missing.push('S3_SECRET_ACCESS_KEY')
  return missing
}

export async function POST(req) {
  // await isAdminRequest(req, res)
  const missingEnv = validateAwsEnv()
  if (missingEnv.length > 0) {
    return NextResponse.json({ error: `Missing AWS env vars: ${missingEnv.join(', ')}` }, { status: 500 })
  }

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

    const link = `https://${bucketName}.s3.${region}.amazonaws.com/${newFilename}`
    return NextResponse.json({ link: [link] })
  } catch (error) {
    console.error('Error uploading file to S3:', error)
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
  }
}

export async function DELETE(req, res) {
  try {
    const missingEnv = validateAwsEnv()
    if (missingEnv.length > 0) {
      return new Response(JSON.stringify({ error: `Missing AWS env vars: ${missingEnv.join(', ')}` }), { status: 500 })
    }

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
