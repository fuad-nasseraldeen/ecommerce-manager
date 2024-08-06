import Link from 'next/link'
import Carousel from './Carousel'

export default function ProductList({ products }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {products?.map((product, index) => (
        <div key={index} className='bg-white shadow-md rounded-lg overflow-hidden'>
          <div className='p-4'>
            <h2 className='text-2xl font-semibold mb-2'>{product.title}</h2>
            {product?.images && (
              <div className='relative w-full h-80'>
                <Carousel images={product.images} id={index} />
              </div>
            )}
          </div>
          <div className='p-4 bg-primary text-white rounded-lg scale-95 shiny-gradient'>
            <div className='flex flex-col justify-between items-center '>
              <p className='text-lg h-40 overflow-overlay'>{product.description}</p>
              <br />
            </div>
            <p className='bg-purple-200 text-xl font-bold text-center text-black'>${product.price}</p>
          </div>
          <div className='p-4 flex justify-between'>
            <Link className='btn-default hover:scale-105 flex items-center' href={'/products/edit/' + product._id}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 mr-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                />
              </svg>
              Edit
            </Link>
            <Link className='btn-red hover:scale-105 flex items-center' href={'/products/delete/' + product._id}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4 mr-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                />
              </svg>
              Delete
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
