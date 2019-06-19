import { useState, useEffect, useCallback } from 'react'

const useForm = (cb, validate) => {
  const [values, setValues] = useState({})
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!error && isSubmitting) {
      cb()
    }

    return () => {
      setIsSubmitting(false)
    }
  }, [error, isSubmitting])

  const handleSubmit = useCallback(e => {
    e.preventDefault()

    setError(validate(values))
    setIsSubmitting(true)
  })

  const handleChange = useCallback((e, setter) => {
    if (e.target) {
      e.persist()
      setValues(values => ({ ...values, [e.target.name]: e.target.value }))
    } else {
      setValues(values => ({ ...values, ...setter(e) }))
    }
  })

  return {
    handleChange,
    handleSubmit,
    values,
    error,
  }
}

export default useForm
