import React, { useState, useEffect } from 'react';
import { useLoader } from '../context/LoaderContext';
import { useUserData } from '../context/UserContext';

function Addresses() {
  const { useFakeLoader } = useLoader();
  useEffect(() => {
    useFakeLoader();
  }, []);

  const { userData, login } = useUserData();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    zip: '',
    phone: '',
    isDefault: false,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    setErrors({ ...errors, [name]: '' });
    setSuccess(false);
  };

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';
    if (!form.address1.trim()) errs.address1 = 'Address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.country.trim()) errs.country = 'Country is required';
    if (!form.zip.trim()) errs.zip = 'Zip code is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);

    try {
      const tokenRes = await fetch('/api/users/get-token', { credentials: 'include' });
      const tokenData = await tokenRes.json();

      const res = await fetch('/api/users/add-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: tokenData.data,
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return setErrors({ form: data.err || 'Something went wrong' });

      login(data.data);
      setSuccess(true);
      setForm({
        firstName: '',
        lastName: '',
        company: '',
        address1: '',
        address2: '',
        city: '',
        country: '',
        zip: '',
        phone: '',
        isDefault: false,
      });
    } catch (err) {
      setErrors({ form: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <>
      <div className="addresses-page">
        <h1 className="addresses-title">Addresses</h1>

        <div className="addresses-body">
          <div className="addresses-form-section">
            <h3>Add A New Address</h3>

            {success && <p className="addresses-success">✅ Address added successfully!</p>}
            {errors.form && <p className="addresses-server-error">{errors.form}</p>}

            <form
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="addresses-field">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <p className="addresses-error">{errors.firstName}</p>}
              </div>

              <div className="addresses-field">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <p className="addresses-error">{errors.lastName}</p>}
              </div>

              <div className="addresses-field">
                <label>Address1</label>
                <input
                  type="text"
                  name="address1"
                  value={form.address1}
                  onChange={handleChange}
                  className={errors.address1 ? 'error' : ''}
                />
                {errors.address1 && <p className="addresses-error">{errors.address1}</p>}
              </div>

              <div className="addresses-field">
                <label>Address2</label>
                <input
                  type="text"
                  name="address2"
                  value={form.address2}
                  onChange={handleChange}
                />
              </div>

              <div className="addresses-field">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <p className="addresses-error">{errors.city}</p>}
              </div>

              <div className="addresses-field">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className={errors.country ? 'error' : ''}
                />
                {errors.country && <p className="addresses-error">{errors.country}</p>}
              </div>

              <div className="addresses-field">
                <label>Postal/Zip Code</label>
                <input
                  type="text"
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  className={errors.zip ? 'error' : ''}
                />
                {errors.zip && <p className="addresses-error">{errors.zip}</p>}
              </div>

              <div className="addresses-field">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <label className="addresses-checkbox">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={form.isDefault}
                  onChange={handleChange}
                />
                Set As Default Address
              </label>

              <button
                type="submit"
                className="addresses-submit"
              >
                Add Address
              </button>
            </form>
          </div>

          {userData?.addresses?.length > 0 && (
            <div className="addresses-list">
              <h3>Saved Addresses</h3>
              {userData.addresses.map((addr) => (
                <div
                  key={addr._id}
                  className="addresses-card"
                >
                  {addr.isDefault && <span className="addresses-default-badge">Default</span>}
                  <p>
                    {addr.firstName} {addr.lastName}
                  </p>
                  <p>
                    {addr.address1} {addr.address2}
                  </p>
                  <p>
                    {addr.city}, {addr.country} {addr.zip}
                  </p>
                  <p>{addr.phone}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Addresses;
