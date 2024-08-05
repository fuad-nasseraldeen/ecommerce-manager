'use client'

import Layout from '@/components/Layout'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductForm from '@/products/ProductForm'

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null)
  const params = useParams()
  const { id } = params // Destructure id from params
  useEffect(() => {
    if (!id) {
      return
    }
    axios.get('/api/products?id=' + id).then((response) => {
      setProductInfo(response.data)
    })
  }, [id])
  return (
    <Layout>
      <h1>Edit product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  )
}
