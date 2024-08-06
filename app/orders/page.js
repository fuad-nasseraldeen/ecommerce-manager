'use client'
import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders data
        const response = await axios.get('/api/orders')
        setOrders(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false) // Set loading to false after data is fetched or if there's an error
      }
    }

    fetchData()
  }, []) // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return (
      <div className='flex justify-center items-center h-96'>
        <Spinner />
      </div>
    )
  }
  return (
    <Layout>
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
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
            {orders.length > 0 &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td className={order.paid ? 'text-green-600' : 'text-red-600'}>{order.paid ? 'YES' : 'NO'}</td>
                  <td>
                    {order.name} {order.email}
                    <br />
                    {order.city} {order.postalCode} {order.country}
                    <br />
                    {order.streetAddress}
                  </td>
                  <td>
                    {order.line_items.map((l) => (
                      <>
                        {l.price_data?.product_data.name} x{l.quantity}
                        <br />
                      </>
                    ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  )
}
