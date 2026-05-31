import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoader } from '../context/LoaderContext'

function Login() {
  const { useFakeLoader } = useLoader()
  useEffect(() => { useFakeLoader() }, [])
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const errs = {}
    if (!form.email) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email address'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    return errs
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) return setErrors(errs)

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) return setServerError(data.message || 'Login failed')
      localStorage.setItem('token', data.token)
      navigate('/')
    } catch (err) {
      setServerError('Something went wrong. Please try again.')
    }
  }

  return (
    <>
      <div className="shop-banner">
        <div className="icon">
          <img src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564" alt=""/>
        </div>
        <p>Login</p>
        <div className="icon">
          <img src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611" alt=""/>
        </div>
      </div>

      <div className='auth-page'>
        <div className='auth-card'>
          <h1>Login</h1>

          {serverError && <p className='auth-server-error'>{serverError}</p>}

          <form onSubmit={handleSubmit} noValidate>
            <div className='auth-field'>
              <label>Email Address <span>*</span></label>
              <input
                type='email'
                name='email'
                placeholder='Email Address'
                value={form.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <p className='auth-error'>{errors.email}</p>}
            </div>

            <div className='auth-field'>
              <label>Password <span>*</span></label>
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={form.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <p className='auth-error'>{errors.password}</p>}
            </div>

            <p className='auth-forgot'>Forgot Your Password ?</p>

            <button type='submit' className='auth-btn-primary'>Login</button>
            <Link to='/register'>
              <button type='button' className='auth-btn-secondary'>Create New Account</button>
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login