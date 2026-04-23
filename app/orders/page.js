'use client'
import Layout from '@/components/Layout'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('/api/orders')
      setOrders(response.data)
      setError('')
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Failed loading orders.')
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
      <div className='mb-4 flex items-center justify-between gap-2'>
        <h1 className='m-0'>Orders</h1>
        <button className='btn-default' onClick={fetchData}>
          Refresh
        </button>
      </div>
      {error && <p className='mb-2 text-rose-700'>{error}</p>}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className='overflow-x-auto rounded-xl'>
          <table className='basic'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Paid</th>
                <th>Recipient</th>
                <th>Products</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td className={order.paid ? 'font-semibold text-emerald-700' : 'font-semibold text-rose-700'}>
                    {order.paid ? 'YES' : 'NO'}
                  </td>
                  <td>
                    {order.name} {order.email}
                    <br />
                    {order.city} {order.postalCode} {order.country}
                    <br />
                    {order.streetAddress}
                  </td>
                  <td>
                    {order.line_items.map((item, index) => (
                      <div key={`${order._id}-${index}`}>
                        {item.price_data?.product_data.name} x{item.quantity}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  )
}
