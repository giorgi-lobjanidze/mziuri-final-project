import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext';
import * as api from '../api/api.js';
import { useTranslation } from 'react-i18next';

function ForgotPasword() {
  const { useFakeLoader } = useLoader();
  useEffect(() => {
    useFakeLoader();
  }, []);
  const { t } = useTranslation();

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
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);

    try {
      await api.forgotPassword(form);
      setSuccess(true);
      setServerError('');
      setForm({ email: '' });
    } catch (err) {
      setServerError(err.message);
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
        <p>{t('ForgotPassword')}</p>
        <div className="icon">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611"
            alt=""
          />
        </div>
      </div>

      <div className="auth-page">
        <div className="auth-card">
          <h1>{t('ResetYourPassword')}</h1>
          <p className="resetp">{t('ResetPasswordEmail')}</p>

          {serverError && <p className="auth-server-error">{serverError}</p>}
          {success && <p className="auth-success">Email sent!</p>}

          <form
            onSubmit={handleSubmit}
            noValidate
          >
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

            <button
              type="submit"
              className="auth-btn-primary"
            >
              {t('Submit')}
            </button>
            <Link to="/login">
              <button
                type="button"
                className="auth-btn-secondary"
              >
                {t('Cancel')}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPasword;
