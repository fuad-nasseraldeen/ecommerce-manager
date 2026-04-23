// app/api/products/route.js

import { Product } from '../../../models/Product'
import { Category } from '../../../models/Category'
import { mongooseConnect } from '../../../lib/mongoose'
// import { isAdminRequest } from '../auth/[...nextauth]/route'

export const dynamic = 'force-dynamic'

const REMOTE_PRODUCTS_URL = 'https://dummyjson.com/products'
const IMPORT_LOCK_ID = 'products-dummy-seed-lock'
const IMPORT_LOCK_STALE_MS = 60_000
const IMPORT_WAIT_TIMEOUT_MS = 20_000
const IMPORT_POLL_INTERVAL_MS = 250

function normalizeRemoteProduct(item) {
  const categoryName = extractCategoryName(item)
  const externalProductId = item?._id || item?.id ? String(item?._id || item?.id) : null
  const title = item?.title || item?.name || 'Untitled product'
  const description = item?.description || ''
  const price = Number(item?.price) || 0

  const images = Array.isArray(item?.images)
    ? item.images.filter((image) => typeof image === 'string' && image.trim())
    : typeof item?.image === 'string' && item.image.trim()
      ? [item.image]
      : []

  return {
    externalProductId,
    title,
    description,
    price,
    images,
    categoryName,
    properties: {
      imported: true,
      externalProductId: item?._id || item?.id || null,
    },
  }
}

function extractCategoryName(item) {
  if (typeof item?.category === 'string' && item.category.trim()) {
    return item.category.trim()
  }

  if (typeof item?.category?.name === 'string' && item.category.name.trim()) {
    return item.category.name.trim()
  }

  return null
}

async function importProductsIfEmpty() {
  const existingProductsCount = await Product.countDocuments()
  if (existingProductsCount > 0) {
    return Product.find()
  }

  const lockAcquired = await tryAcquireImportLock()
  if (!lockAcquired) {
    return waitForSeederAndReadProducts()
  }

  try {
    // Check again after lock acquisition (another process may have completed import meanwhile).
    const existsNow = await Product.exists({})
    if (existsNow) {
      return Product.find()
    }
    return performImportProducts()
  } finally {
    await releaseImportLock()
  }
}

async function performImportProducts() {
  const remoteResponse = await fetch(REMOTE_PRODUCTS_URL, { cache: 'no-store' })
  if (!remoteResponse.ok) {
    throw new Error(`Remote import failed with status ${remoteResponse.status}`)
  }

  const remotePayload = await remoteResponse.json()
  const rawProducts = Array.isArray(remotePayload)
    ? remotePayload
    : Array.isArray(remotePayload?.products)
      ? remotePayload.products
      : Array.isArray(remotePayload?.data)
        ? remotePayload.data
        : []

  if (!rawProducts.length) {
    return []
  }

  const normalizedProducts = rawProducts.map(normalizeRemoteProduct)
  const categoryMap = await ensureImportedCategories(normalizedProducts)
  const operations = normalizedProducts.map((product) => {
    const categoryId = product.categoryName ? categoryMap.get(product.categoryName) : undefined
    const { categoryName, ...productWithoutCategoryName } = product
    const productDoc = {
      ...productWithoutCategoryName,
      category: categoryId || undefined,
    }
    const hasExternalId = Boolean(product.externalProductId)
    return {
      updateOne: {
        filter: hasExternalId
          ? { externalProductId: product.externalProductId }
          : {
              title: product.title,
              description: product.description,
              price: product.price,
            },
        update: { $setOnInsert: productDoc },
        upsert: true,
      },
    }
  })

  try {
    await Product.bulkWrite(operations, { ordered: false })
  } catch (error) {
    // Duplicate key can happen if lock became stale and was force-acquired.
    if (error?.code !== 11000) {
      throw error
    }
  }

  return Product.find()
}

async function ensureImportedCategories(products) {
  const categoryNames = [...new Set(products.map((product) => product.categoryName).filter(Boolean))]
  if (!categoryNames.length) {
    return new Map()
  }

  const existingCategories = await Category.find({ name: { $in: categoryNames } })
  const categoryMap = new Map(existingCategories.map((category) => [category.name, category._id]))

  const missingNames = categoryNames.filter((name) => !categoryMap.has(name))
  if (missingNames.length) {
    try {
      await Category.insertMany(missingNames.map((name) => ({ name })), { ordered: false })
    } catch (error) {
      if (error?.code !== 11000) {
        throw error
      }
    }
  }

  const allCategories = await Category.find({ name: { $in: categoryNames } })
  return new Map(allCategories.map((category) => [category.name, category._id]))
}

async function tryAcquireImportLock() {
  const locks = Product.db.collection('app_locks')
  const now = new Date()

  try {
    await locks.insertOne({ _id: IMPORT_LOCK_ID, createdAt: now })
    return true
  } catch (error) {
    if (error?.code !== 11000) {
      throw error
    }
  }

  // Take over stale lock to avoid deadlock if previous process crashed.
  const staleBefore = new Date(Date.now() - IMPORT_LOCK_STALE_MS)
  const takeoverResult = await locks.findOneAndUpdate(
    { _id: IMPORT_LOCK_ID, createdAt: { $lt: staleBefore } },
    { $set: { createdAt: now } },
    { returnDocument: 'before' },
  )

  return Boolean(takeoverResult?.value)
}

async function releaseImportLock() {
  const locks = Product.db.collection('app_locks')
  await locks.deleteOne({ _id: IMPORT_LOCK_ID })
}

async function waitForSeederAndReadProducts() {
  const locks = Product.db.collection('app_locks')
  const start = Date.now()

  while (Date.now() - start < IMPORT_WAIT_TIMEOUT_MS) {
    const productsExist = await Product.exists({})
    if (productsExist) {
      return Product.find()
    }

    const activeLock = await locks.findOne({ _id: IMPORT_LOCK_ID }, { projection: { _id: 1 } })
    if (!activeLock) {
      break
    }

    await new Promise((resolve) => setTimeout(resolve, IMPORT_POLL_INTERVAL_MS))
  }

  const products = await Product.find()
  if (products.length > 0) {
    return products
  }

  // If seeding failed or timed out, try once again in current request.
  if (await tryAcquireImportLock()) {
    try {
      const existsNow = await Product.exists({})
      if (existsNow) {
        return Product.find()
      }
      return performImportProducts()
    } finally {
      await releaseImportLock()
    }
  }

  return Product.find()
}

export async function GET(req) {
  try {
    await mongooseConnect()
  } catch (error) {
    console.error('MongoDB connection error:', error)
    return new Response(
      JSON.stringify({
        message: 'MongoDB connection failed. Verify Atlas IP whitelist / network access and MONGODB_URI.',
      }),
      { status: 500 },
    )
  }
  // await isAdminRequest()

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (id) {
    const product = await Product.findOne({ _id: id })
    return new Response(JSON.stringify(product), { status: 200 })
  } else {
    try {
      const products = await importProductsIfEmpty()
      return new Response(JSON.stringify(products), { status: 200 })
    } catch (error) {
      console.error('Error loading products:', error)
      return new Response(JSON.stringify({ message: 'Error loading products' }), { status: 500 })
    }
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
