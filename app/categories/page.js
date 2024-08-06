'use client'
import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { withSwal } from 'react-sweetalert2'
import Spinner from '../components/Spinner'

const initialErrors = {
  name: '',
}

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null)
  const [errors, setErrors] = useState(initialErrors)
  const [name, setName] = useState('')
  const [parentCategory, setParentCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch categories effect
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories')
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        // setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  // Error handling effect
  useEffect(() => {
    if (errors?.name) {
      const timer = setTimeout(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: '',
        }))
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [errors])

  async function saveCategory(ev) {
    ev.preventDefault()

    if (name === '') {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'You must add a category name!' }))
      return
    }
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(','),
      })),
    }
    try {
      if (editedCategory) {
        data._id = editedCategory._id
        await axios.put('/api/categories', data)
        setEditedCategory(null)
      } else {
        await axios.post('/api/categories', data)
      }
      setName('')
      setParentCategory('')
      setProperties([])
      // Refetch categories to update the list
      const response = await axios.get('/api/categories')
      setCategories(response.data)
    } catch (error) {
      console.error('Error saving category:', error)
    }
  }

  function editCategory(category) {
    setEditedCategory(category)
    setName(category.name)
    setParentCategory(category.parent?._id)
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(','),
      })),
    )
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: 'Are you sure?',
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes, Delete!',
        confirmButtonColor: '#d55',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const { _id } = category
            await axios.delete('/api/categories?_id=' + _id)
            // Refetch categories to update the list
            const response = await axios.get('/api/categories')
            setCategories(response.data)
          } catch (error) {
            console.error('Error deleting category:', error)
          }
        }
      })
  }

  function addProperty() {
    setProperties((prev) => [...prev, { name: '', values: '' }])
  }

  function handlePropertyNameChange(index, newName) {
    setProperties((prev) => {
      const properties = [...prev]
      properties[index].name = newName
      return properties
    })
  }

  function handlePropertyValuesChange(index, newValues) {
    setProperties((prev) => {
      const properties = [...prev]
      properties[index].values = newValues
      return properties
    })
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => prev.filter((_, pIndex) => pIndex !== indexToRemove))
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>{editedCategory ? `Edit category ${editedCategory.name}` : 'Create new category'}</label>
      <form onSubmit={saveCategory}>
        <div className='flex gap-1'>
          <div>
            <input
              className={`${errors?.name ? 'mb-0 border-red-600' : ''}`}
              type='text'
              placeholder='Category name'
              onChange={(ev) => setName(ev.target.value)}
              value={name}
            />
            {errors?.name && (
              <>
                <label className='text-red-600 text-sm ml-2'>You must add a category name</label>
                <br />
              </>
            )}
          </div>
          <select onChange={(ev) => setParentCategory(ev.target.value)} value={parentCategory}>
            <option value=''>No parent category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category?._id} value={category?._id}>
                  {category?.name}
                </option>
              ))}
          </select>
        </div>
        <div className='mb-2'>
          <label className='block'>Properties</label>
          <button onClick={addProperty} type='button' className='btn-default text-sm mb-2'>
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div key={index} className='flex gap-1 mb-2'>
                <input
                  type='text'
                  value={property.name}
                  className='mb-0'
                  onChange={(ev) => handlePropertyNameChange(index, ev.target.value)}
                  placeholder='property name (example: color)'
                />
                <input
                  type='text'
                  className='mb-0'
                  onChange={(ev) => handlePropertyValuesChange(index, ev.target.value)}
                  value={property.values}
                  placeholder='values, comma separated'
                />
                <button onClick={() => removeProperty(index)} type='button' className='btn-red'>
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className='flex gap-1'>
          {editedCategory && (
            <button
              type='button'
              onClick={() => {
                setEditedCategory(null)
                setName('')
                setParentCategory('')
                setProperties([])
              }}
              className='btn-default'
            >
              Cancel
            </button>
          )}
          <button type='submit' className='btn-primary py-1'>
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className='basic mt-4'>
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <button onClick={() => editCategory(category)} className='btn-default mr-1'>
                      Edit
                    </button>
                    <button onClick={() => deleteCategory(category)} className='btn-red'>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <p>No categories found.</p>
            )}
          </tbody>
        </table>
      )}
    </Layout>
  )
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />)
