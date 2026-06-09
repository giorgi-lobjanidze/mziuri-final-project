import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext';
import * as api from '../api/api.js';

function ForgotPasword() {
  const { useFakeLoader } = useLoader();
  useEffect(() => {
    useFakeLoader();
  }, []);

  const [form, setForm] = useState({ email: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) return setErrors(errs)

    try {
        await api.forgotPassword(form);
        setSuccess(true);
        setServerError('');
        setForm({ email: '' });
    } catch (err) {
        setServerError(err.message);
    }
  }

  return (
    <>
      <div className="shop-banner">
        <div className="icon">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564"
            alt=""
          />
        </div>
        <p>Forgot Password</p>
        <div className="icon">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611"
            alt=""
          />
        </div>
      </div>

      <div className="auth-page">
        <div className="auth-card">
          <h1>Reset Your Password</h1>
          <p className="resetp">We will send you an email to reset your password.</p>

          {serverError && <p className="auth-server-error">{serverError}</p>}
          {success && <p className="auth-success">Email sent!</p>}

          <form
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="auth-field">
              <label>
                Email <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <p className="auth-error">{errors.email}</p>}
            </div>

            <button
              type="submit"
              className="auth-btn-primary"
            >
              Submit
            </button>
            <Link to="/login">
              <button
                type="button"
                className="auth-btn-secondary"
              >
                Cancel
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPasword;
