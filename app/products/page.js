'use client'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductList from '@/components/ProductList'
export default function Products() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    axios.get('/api/products').then((response) => {
      setProducts(response.data)
    })
  }, [])
  return (
    <Layout>
      <Link className='btn-primary mb-4' href={'/products/new'}>
        Add new product
      </Link>
      <h1>ProductName</h1>
      <ProductList products={products} />
    </Layout>
  )
}
