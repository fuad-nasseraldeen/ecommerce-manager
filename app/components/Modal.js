import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Spinner from '@/components/Spinner'
import { ReactSortable } from 'react-sortablejs'

export default function Modal({ deleteIndex, setDeleteIndex, showDeleteModal, setShowDeleteModal, handleDelete }) {
  return (
    <>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
          <div className='bg-white p-4 rounded shadow-2xl'>
            <p>Are you sure you want to delete this image?</p>
            <div className='mt-4'>
              <button onClick={() => handleDelete(deleteIndex)} className='btn-primary mr-2'>
                Yes
              </button>
              <button onClick={() => setShowDeleteModal(false)} className='btn-default '>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
