'use client'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductList from '@/components/ProductList'
import Spinner from '../components/Spinner'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState([true])
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate loading delay

        const response = await axios.get('api/products')
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false) // Set loading to false after data is fetched or if there's an error
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <Layout>
      <Link className='btn-primary mb-4' href={'/products/new'}>
        Add new product
      </Link>
      <h1>ProductName</h1>
      {products.length === 0 ? <p>No products found.</p> : <ProductList products={products} />}
    </Layout>
  )
}
