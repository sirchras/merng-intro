import { useState } from 'react'

function useForm (callback, initialState = {}) {
  const [form, setForm] = useState(initialState)

  const onChange = (evt) => {
    const { name, value } = evt.target
    setForm({ ...form, [name]: value })
  }

  const onSubmit = (evt) => {
    evt.preventDefault()
    callback()
  }

  return { onChange, onSubmit, form }
}

export default useForm
