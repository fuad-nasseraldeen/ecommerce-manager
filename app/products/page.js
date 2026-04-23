'use client'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import ProductList from '@/components/ProductList'
import Spinner from '../components/Spinner'
import Alert from '@/components/Alert'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axios.get('/api/products')
      setProducts(response.data)
      setError(null)
    } catch (error) {
      console.error('Error fetching data:', error)
      const fallbackError = error?.response?.data?.message || 'Failed loading products. Please try again.'
      setError(fallbackError)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) {
    return <Spinner />
  }

  return (
    <Layout>
      {error && <Alert alertMessage={error} alertType='error' />}
      <div className='mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <h1 className='m-0'>Products</h1>
        <div className='flex gap-2'>
          <button className='btn-default' onClick={fetchData}>
            Refresh
          </button>
          <Link className='btn-primary' href={'/products/new'}>
            Add new product
          </Link>
        </div>
      </div>
      {products.length === 0 ? <p>No products found.</p> : <ProductList products={products} />}
    </Layout>
  )
}
