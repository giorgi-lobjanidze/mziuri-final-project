import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext';
import * as api from '../api/api.js';

function ResetPassword() {
  const { useFakeLoader } = useLoader();
  useEffect(() => {
    useFakeLoader();
  }, []);

  const { token } = useParams();

  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
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
        await api.resetPassword({ password: form.password }, token);
        setSuccess(true);
        setServerError('');
        setForm({ password: '', confirmPassword: '' });
    } catch (err) {
        setServerError(err.message);
    }
  };

  return (
    <>
      <div className="shop-banner">
        <div className="icon">
          <img src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564" alt="" />
        </div>
        <p>Reset Password</p>
        <div className="icon">
          <img src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611" alt="" />
        </div>
      </div>

      <div className="auth-page">
        <div className="auth-card">
          <h1>Reset Password</h1>

          {serverError && <p className="auth-server-error">{serverError}</p>}
          {success && <p className="auth-success">Password successfully changed!</p>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label>New Password <span>*</span></label>
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <p className="auth-error">{errors.password}</p>}
            </div>

            <div className="auth-field">
              <label>Confirm New Password <span>*</span></label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <p className="auth-error">{errors.confirmPassword}</p>}
            </div>

            <button type="submit" className="auth-btn-primary">Reset Password</button>
            <Link to="/login">
              <button type="button" className="auth-btn-secondary">Back to Login</button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;