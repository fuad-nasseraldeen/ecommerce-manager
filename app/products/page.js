'use client'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductList from '@/components/ProductList'
import Spinner from '../components/Spinner'
import Alert from '@/components/Alert'

export default function Products() {
  const [products, setProducts] = useState([])
  const [productStatus, setProductStatus] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axios.get('api/products')
      setProducts(response.data)
      setProductStatus(response.status)
      setError(null) // Clear any previous error
    } catch (error) {
      console.error('Error fetching data:', error)
      setProductStatus(500) // Explicitly set status to 500 on error
      setError('Please Wait until products is uploaded')
    } finally {
      setLoading(false) // Set loading to false after data is fetched or if there's an error
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (productStatus === 500) {
      const retryFetch = setTimeout(fetchData, 5000) // Retry fetch after 5 seconds
      return () => clearTimeout(retryFetch)
    }
  }, [productStatus])

  if (loading) {
    return <Spinner />
  }

  return (
    <Layout>
      {error && <Alert alertMessage={error} alertType='error' />}
      <Link className='btn-primary mb-4' href={'/products/new'}>
        Add new product
      </Link>
      <h1>Products</h1>
      {products.length === 0 ? <p>No products found.</p> : <ProductList products={products} />}
    </Layout>
  )
}
