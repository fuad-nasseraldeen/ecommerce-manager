import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Spinner from '@/components/Spinner'
import { ReactSortable } from 'react-sortablejs'
import UploadImages from '../components/UploadImages'
import Alert from '@/components/Alert'
const initialErrors = {
  uploadingErrors: '',
  fillMandatoryErrors: {
    price: '',
    title: '',
  },
}

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || '')
  const [description, setDescription] = useState(existingDescription || '')
  const [errors, setErrors] = useState(initialErrors)
  const [price, setPrice] = useState(existingPrice || '')
  const [images, setImages] = useState(existingImages || [])
  const [category, setCategory] = useState(assignedCategory || '')
  const [productProperties, setProductProperties] = useState(assignedProperties || {})
  const [categories, setCategories] = useState([])
  const [goToProducts, setGoToProducts] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const router = useRouter()
  useEffect(() => {
    axios.get('/api/categories').then((result) => {
      setCategories(result.data)
    })
  }, [])
  useEffect(() => {
    if (goToProducts) {
      router.push('/products')
    }
  }, [goToProducts, router])

  useEffect(() => {
    if (errors?.fillMandatoryErrors?.price || errors?.fillMandatoryErrors?.title) {
      const timer = setTimeout(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          fillMandatoryErrors: { price: '', title: '' },
        }))
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [errors])

  async function saveProduct(ev) {
    ev.preventDefault()
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    }

    if (isUploading) {
      setErrors((prevErrors) => ({ ...prevErrors, uploadingErrors: 'Please wait until your image is uploaded!' }))
      return
    }
    if (title === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fillMandatoryErrors: { ...prevErrors.fillMandatoryErrors, title: 'Please fill Product Name field.' },
      }))
      return
    }
    if (price === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fillMandatoryErrors: { ...prevErrors.fillMandatoryErrors, price: 'Please fill Product Price field.' },
      }))
      return
    }
    try {
      if (_id) {
        await axios.put('/api/products', { ...data, _id })
        setGoToProducts(true)
      } else {
        await axios.post('/api/products', data)
        setGoToProducts(true)
      }
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }

  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev }
      newProductProps[propName] = value
      return newProductProps
    })
  }
  const propertiesToFill = []
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category)
    propertiesToFill.push(...catInfo.properties)
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(({ _id }) => _id === catInfo?.parent?._id)
      propertiesToFill.push(...parentCat.properties)
      catInfo = parentCat
    }
  }

  return (
    <div>
      <Alert alertMessage={'Please Wait until image is uplouded'} alertType={errors?.uploadingErrors} />
      <Alert alertMessage={'You must add a product name'} alertType={errors?.fillMandatoryErrors?.title} />
      <Alert alertMessage={'You must add a product price'} alertType={errors?.fillMandatoryErrors?.price} />
      <label>Product name</label>
      <input
        type='text'
        placeholder='product name'
        className={`${errors?.fillMandatoryErrors?.title ? 'mb-0 border-red-600' : ''}`}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      {errors?.fillMandatoryErrors?.title && (
        <>
          <label className='text-red-600 text-sm ml-2'>You must add a product name</label>
          <br />
        </>
      )}
      <label>Category</label>
      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value=''>Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((p) => (
          <div key={p.name} className=''>
            <label>{p.name?.[0]?.toUpperCase() + p.name?.substring(1)}</label>
            <div>
              <select value={productProperties[p.name]} onChange={(ev) => setProductProp(p.name, ev.target.value)}>
                {p.values.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      <label>Photos</label>
      <UploadImages images={images} setImages={setImages} isUploading={isUploading} setIsUploading={setIsUploading} />

      <label>Price</label>
      <input
        className={`${errors?.fillMandatoryErrors?.price ? 'mb-0 border-red-600' : ''}`}
        type='number'
        placeholder='price'
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      {errors?.fillMandatoryErrors?.price && (
        <>
          <label className='text-red-600 text-sm ml-2'>You must add a product price</label>
          <br />
        </>
      )}
      <label>Description</label>
      <textarea placeholder='Description' value={description} onChange={(ev) => setDescription(ev.target.value)} />

      <button
        onClick={saveProduct}
        type='submit'
        className='my-2 bg-primary text-white py-2 px-4 rounded-lg hover:scale-105'
      >
        Save
      </button>
    </div>
  )
}
