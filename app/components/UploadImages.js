import { useState } from 'react'
import axios from 'axios'
import Spinner from '@/components/Spinner'
import { ReactSortable } from 'react-sortablejs'
import Modal from '@/components/Modal'
const UploadImages = ({ images, setImages, isUploading, setIsUploading }) => {
  const [deleteIndex, setDeleteIndex] = useState(0)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [errors, setErrors] = useState({
    uploadingErrors: '',
    fillMandatoryErrors: '',
  })

  const uploadImages = async (ev) => {
    const files = ev.target?.files
    if (files?.length > 0) {
      setIsUploading(true)
      const data = new FormData()
      for (const file of files) {
        data.append('file', file)
      }
      try {
        const res = await axios.post('/api/upload', data)
        const newImages = [...images, ...res.data.link]
        setImages(newImages)
        setErrors((prevErrors) => ({ ...prevErrors, uploadingErrors: '' }))
      } catch (error) {
        setErrors((prevErrors) => ({ ...prevErrors, uploadingErrors: 'Failed to upload images' }))
      } finally {
        setIsUploading(false)
      }
    }
  }

  const updateImagesOrder = (newImages) => {
    setImages(newImages)
  }

  const onDeleteImage = (index) => {
    setDeleteIndex(index)
    setShowDeleteModal(true)
  }

  const handleDelete = async (file, index) => {
    if (deleteIndex !== null) {
      try {
        const res = await axios.delete('/api/upload?id=' + file)
        console.log(res)
        if (res.statusText) {
          console.log('Image deleted successfully')
          const newImages = images.filter((_, i) => i !== index)
          setImages(newImages)
        }
      } catch (error) {
        console.error('Error deleting image:', error)
      } finally {
        setShowDeleteModal(false)
        setDeleteIndex(null)
      }
    }
  }

  const renderFile = (files) => {
    const isMP4 = (url) => url.split('.').pop().toLowerCase() === 'mp4'

    return files?.length ? (
      files.map((file, index) => (
        <div key={index} className='relative h-32 bg-white p-2 shadow-sm rounded-sm border border-gray-200'>
          <button
            className='absolute z-20 top-1 right-1 m-2 text-red-600 hover:text-red-800'
            onClick={() => onDeleteImage(file, index)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='white'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='black'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
              />
            </svg>
          </button>
          {isMP4(file) ? (
            <video controls autoPlay className='h-32 rounded-sm'>
              <source src={file} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={file} alt='' className='rounded-lg' />
          )}
        </div>
      ))
    ) : (
      <span className='m-auto'>No Photos in this Product</span>
    )
  }

  return (
    <>
      <div className='mb-2 flex flex-wrap gap-1 justify-between'>
        <ReactSortable list={images} className='flex flex-wrap gap-1' setList={updateImagesOrder}>
          {renderFile(images)}
        </ReactSortable>

        <label className='shadow-lg w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-xl bg-white border border-primary hover:scale-105'>
          {isUploading ? (
            <div className='h-24 flex items-center'>
              <Spinner />
            </div>
          ) : (
            <>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
                />
              </svg>
              <div>Add image</div>
            </>
          )}
          <input type='file' onChange={uploadImages} className='hidden' />
        </label>
      </div>
      {errors.uploadingErrors && <p className='text-red-600'>{errors.uploadingErrors}</p>}
      <Modal
        handleDelete={handleDelete}
        deleteIndex={deleteIndex}
        setDeleteIndex={setDeleteIndex}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
    </>
  )
}

export default UploadImages
