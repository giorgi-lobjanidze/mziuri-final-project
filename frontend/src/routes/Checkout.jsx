import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useUserData } from '../context/UserContext';
import { useTranslation } from 'react-i18next';

function Checkout() {
  const { useFakeLoader } = useLoader();
  useEffect(() => {
    useFakeLoader();
  }, []);
  const { t } = useTranslation();

  const { cartItems, subtotal } = useCart();
  const { formatNumber, currency } = useCurrency();
  const { loggedIn, userData, logout, authChecked } = useUserData();
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [emailMenuOpen, setEmailMenuOpen] = useState(false);
  const [form, setForm] = useState({
    email: '',
    country: 'United States',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
  });

  useEffect(() => {
    if (loggedIn && userData?.email) {
      setForm((prev) => ({ ...prev, email: userData.email }));
    }
  }, [loggedIn, userData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignOut = async () => {
    await logout();
    setEmailMenuOpen(false);
  };

  if (!authChecked) return null;

  return (
    <div className="checkout-page">
      <div className="checkout-left">
        {loggedIn ? (
          <div className="checkout-account-row">
            <div className="checkout-account-info">
              <div className="checkout-avatar">{userData?.email?.[0]?.toUpperCase() ?? 'U'}</div>
              <span>{userData?.email}</span>
            </div>
            <div className="checkout-account-menu-wrapper">
              <button
                className="checkout-dots-btn"
                onClick={() => setEmailMenuOpen(!emailMenuOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle
                    cx="5"
                    cy="12"
                    r="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="2"
                  />
                  <circle
                    cx="19"
                    cy="12"
                    r="2"
                  />
                </svg>
              </button>
              {emailMenuOpen && (
                <div className="checkout-account-menu">
                  <button onClick={handleSignOut}>Sign Out</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="checkout-contact">
            <div className="checkout-contact-header">
              <h3>{t('Contact')}</h3>
              <Link to="/login">{t('SignIn')}</Link>
            </div>
            <input
              type="text"
              name="email"
              placeholder="Email or mobile phone number"
              value={form.email}
              onChange={handleChange}
            />
            <label className="checkout-checkbox">
              <input type="checkbox" />
              {t('EmailMeWithNewsAndOffers')}
            </label>
          </div>
        )}

        <div className="checkout-delivery">
          <h3>{t('Delivery')}</h3>

          <div className="checkout-field-floating">
            <label>Country/Region</label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
            >
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
              <option>Georgia</option>
            </select>
          </div>
          <div className="checkout-row-2">
            <input
              type="text"
              name="firstName"
              placeholder="First name (optional)"
              value={form.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="apartment"
            placeholder="Apartment, suite, etc. (optional)"
            value={form.apartment}
            onChange={handleChange}
          />

          <div className="checkout-row-3">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
            />
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
            >
              <option value="">State</option>
              <option>Alabama</option>
              <option>California</option>
              <option>New York</option>
            </select>
            <input
              type="text"
              name="zip"
              placeholder="ZIP code"
              value={form.zip}
              onChange={handleChange}
            />
          </div>

          <h3>{t('ShippingMethod')}</h3>
          <div className="checkout-shipping-note">{t('EnterShippingAddressToViewMethods')}</div>
        </div>

        <div className="checkout-payment">
          <h3>{t('Payment')}</h3>
          <p className="checkout-payment-note">{t('AllTransactionsAreSecureAndEncrypted')}</p>

          <div className="checkout-payment-box">
            <div
              className={`checkout-payment-option ${paymentMethod === 'card' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('card')}
            >
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
              />
              <span>{t('CreditCard')}</span>
              <span className="checkout-card-badge">B</span>
            </div>

            {paymentMethod === 'card' && (
              <div className="checkout-card-fields">
                <input
                  type="text"
                  placeholder="Card number"
                />
                <div className="checkout-row-2">
                  <input
                    type="text"
                    placeholder="Expiration date (MM / YY)"
                  />
                  <input
                    type="text"
                    placeholder="Security code"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Name on card"
                />
                <label className="checkout-checkbox">
                  <input
                    className="billing-checkbox"
                    type="checkbox"
                    checked={sameAsBilling}
                    onChange={(e) => setSameAsBilling(e.target.checked)}
                  />
                  {t('UseShippingAddressAsBillingAddress')}
                </label>

                {!sameAsBilling && (
                  <div className="checkout-billing-address">
                    <h4>{t('BillingAddress')}</h4>
                    <div className="checkout-field-floating">
                      <label>Country/Region</label>
                      <select name="billingCountry">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Georgia</option>
                      </select>
                    </div>
                    <div className="checkout-row-2">
                      <input
                        type="text"
                        placeholder="First name (optional)"
                      />
                      <input
                        type="text"
                        placeholder="Last name"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Address"
                    />
                    <input
                      type="text"
                      placeholder="Apartment, suite, etc. (optional)"
                    />
                    <div className="checkout-row-3">
                      <input
                        type="text"
                        placeholder="City"
                      />
                      <select>
                        <option value="">State</option>
                        <option>Alabama</option>
                        <option>California</option>
                        <option>New York</option>
                      </select>
                      <input
                        type="text"
                        placeholder="ZIP code"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div
              className={`checkout-payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('cod')}
            >
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
              />
              <span>{t('CashOnDelivery')}</span>
            </div>
          </div>
        </div>

        <button
          className="checkout-pay-btn"
          disabled={cartItems.length === 0}
        >
          {t('PayNow')}
        </button>

        <Link
          to="/"
          className="checkout-privacy"
        >
          Privacy policy
        </Link>
      </div>

      <div className="checkout-right">
        <div className="checkout-summary-items">
          {cartItems.map((item, i) => (
            <div
              key={i}
              className="checkout-summary-item"
            >
              <div className="checkout-summary-img">
                <img
                  src={item.image}
                  alt={item.name}
                />
                <span className="checkout-summary-qty">{item.quantity}</span>
              </div>
              <div className="checkout-summary-info">
                <h4>{item.name}</h4>
                <p>
                  {item.variant?.option1} / {item.variant?.option2}
                </p>
              </div>
              <span className="checkout-summary-price">
                {formatNumber(item.price?.[currency.code] ?? item.price?.usd ?? item.price ?? 0)}
              </span>
            </div>
          ))}
        </div>

        <div className="checkout-divider" />

        <div className="checkout-summary-row">
          <span>{t('Subtotal')}</span>
          <span>{formatNumber(subtotal)}</span>
        </div>
        <div className="checkout-summary-row">
          <span>{t('Shipping')}</span>
          <span className="checkout-shipping-pending">{t('EnterShippingAddress')}</span>
        </div>

        <div className="checkout-divider" />

        <div className="checkout-summary-row total">
          <span>{t('Total')}</span>
          <span>
            <small>{currency.display.split(' ')[0]}</small> {formatNumber(subtotal)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
