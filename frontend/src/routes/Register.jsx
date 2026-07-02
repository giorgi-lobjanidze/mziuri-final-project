import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext';
import { useTranslation } from 'react-i18next';

function Register() {
  const { useFakeLoader } = useLoader();
  useEffect(() => {
    useFakeLoader();
  }, []);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.firstName) errs.firstName = 'First name is required';
    if (!form.lastName) errs.lastName = 'Last name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!form.confirm) errs.confirm = 'Please confirm your password';
    else if (form.confirm !== form.password) errs.confirm = 'Passwords do not match';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);

    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) return setServerError(data.message || 'Registration failed');
      navigate('/login');
    } catch (err) {
      console.error('Fetch error:', err);
      setServerError('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <div className="shop-banner">
        <div className="icon">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564"
            alt=""
          />
        </div>
        <p>{t('Register')}</p>
        <div className="icon">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611"
            alt=""
          />
        </div>
      </div>

      <div className="auth-page">
        <div className="auth-card">
          <h1>{t('CreateAccount')}</h1>

          {serverError && <p className="auth-server-error">{serverError}</p>}

          <form
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="auth-field">
              <label>
                {t('FirstName')} <span>*</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder={t('FirstName')}
                value={form.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <p className="auth-error">{errors.firstName}</p>}
            </div>

            <div className="auth-field">
              <label>
                {t('LastName')} <span>*</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder={t('LastName')}
                value={form.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <p className="auth-error">{errors.lastName}</p>}
            </div>

            <div className="auth-field">
              <label>
                {t('EmailAddress')} <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder={t('EmailAddress')}
                value={form.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <p className="auth-error">{errors.email}</p>}
            </div>

            <div className="auth-field">
              <label>
                {t('Password')} <span>*</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder={t('Password')}
                value={form.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <p className="auth-error">{errors.password}</p>}
            </div>

            <div className="auth-field">
              <label>
                {t('ConfirmPassword')} <span>*</span>
              </label>
              <input
                type="password"
                name="confirm"
                placeholder={t('ConfirmPassword')}
                value={form.confirm}
                onChange={handleChange}
                className={errors.confirm ? 'error' : ''}
              />
              {errors.confirm && <p className="auth-error">{errors.confirm}</p>}
            </div>

            <button
              type="submit"
              className="auth-btn-primary"
            >
              {t('CreateAccount')}
            </button>
            <Link to="/login">
              <button
                type="button"
                className="auth-btn-secondary"
              >
                {t('AlreadyHaveAnAccount')}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
