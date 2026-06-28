import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

function CartSummary() {
  const { t } = useTranslation();
  const { subtotal, totalSavings, cartItems } = useCart();
  const navigate = useNavigate();
  const [country, setCountry] = useState('United States');
  const [state, setState] = useState('Alabama');
  const [zip, setZip] = useState('');
  const [coupon, setCoupon] = useState('');
  const [agreed, setAgreed] = useState(false);

  const freeShippingThreshold = 500;
  const remaining = freeShippingThreshold - subtotal;

  return (
    <div className="cart-summary">
      <div className="cart-summary-freeship">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M17.0178 10.3086C17.7428 10.6002 18.1928 11.4586 18.0261 12.2169L17.6844 13.7669C17.0928 16.4336 15.0011 18.3336 11.9844 18.3336H8.01775C5.00108 18.3336 2.90942 16.4336 2.31775 13.7669L1.97608 12.2169C1.80942 11.4586 2.25941 10.6002 2.98441 10.3086L4.16776 9.83355L8.75943 7.99189C9.55943 7.67523 10.4427 7.67523 11.2427 7.99189L15.8344 9.83355L17.0178 10.3086Z"
            stroke="#FEA90C"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 18.3335V8.3335"
            stroke="#FEA90C"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.8346 6.6665V9.83316L11.243 7.9915C10.443 7.67483 9.55964 7.67483 8.75964 7.9915L4.16797 9.83316V6.6665C4.16797 5.2915 5.29297 4.1665 6.66797 4.1665H13.3346C14.7096 4.1665 15.8346 5.2915 15.8346 6.6665Z"
            stroke="#FEA90C"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.0846 4.1665H7.91797V2.49984C7.91797 2.0415 8.29297 1.6665 8.7513 1.6665H11.2513C11.7096 1.6665 12.0846 2.0415 12.0846 2.49984V4.1665Z"
            stroke="#FEA90C"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>
          {remaining > 0 ? (
            <>
              {t('Spend')} <strong>${remaining.toFixed(2)}</strong> {t('MoreAndGet')}{' '}
              <span>{t('FreeShipping')}!</span>
            </>
          ) : (
            <span>{t('UnlockedShipping')}</span>
          )}
        </p>
      </div>

      <div className="cart-summary-divider" />

      {/* subtotal */}
      <div className="cart-summary-row">
        <span>{t('Subtotal')}</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="cart-summary-divider" />

      {/* shipping estimate */}
      <div className="cart-summary-section">
        <h4>{t('EstimateShippingRates')}</h4>
        <label>{t('Country')}</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option>Australia</option>
          <option>Austria</option>
          <option>Belgium</option>
          <option>Canada</option>
          <option>Czechia</option>
          <option>Denmark</option>
          <option>Finland</option>
          <option>France</option>
          <option>Germany</option>
          <option>Hong Kong SAR</option>
          <option>Ireland</option>
          <option>Israel</option>
          <option>Italy</option>
          <option>Japan</option>
          <option>Malaysia</option>
          <option>Netherlands</option>
          <option>New Zealand</option>
          <option>Norway</option>
          <option>Pakistan</option>
          <option>Poland</option>
          <option>Portugal</option>
          <option>Singapore</option>
          <option>South Korea</option>
          <option>Spain</option>
          <option>Sweden</option>
          <option>Switzerland</option>
          <option>United Arab Emirates</option>
          <option>United Kingdom</option>
          <option>United States</option>
        </select>

        <label>{t('State')}</label>
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          {states.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <label>{t('PostalCode')}</label>
        <input
          type="text"
          placeholder="Zip/Postal Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />

        <button className="cart-summary-calc-btn">{t('CalcShipping')}</button>
      </div>

      <div className="cart-summary-divider" />

      <div className="cart-summary-section">
        <h4>{t('Coupon')}</h4>
        <p className="cart-summary-coupon-note">{t('CouponCode')}.</p>
        <input
          type="text"
          placeholder="Coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
      </div>

      <div className="cart-summary-divider" />

      {totalSavings > 0 ? (
        <div className="cart-summary-row">
          <span>{t('YouSave')}</span>
          <span>${totalSavings.toFixed(2)}</span>
        </div>
      ) : (
        <div className="cart-summary-row">
          <span>{t('YouSave')}</span>
          <span>$4.00</span>
        </div>
      )}

      <div className="cart-summary-divider" />

      {/* order total */}
      <div className="cart-summary-row total">
        <span>{t('OrderTotals')}</span>
        <span className="cart-summary-total">${subtotal.toFixed(2)}</span>
      </div>

      <div className="cart-summary-divider" />

      <p className="cart-summary-tax-note">{t('TaxesShipping')}</p>

      <label className="cart-summary-agree">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        {t('IAgree')} <span>{t('TermsConditions')}</span>
      </label>

      <button
        className="cart-summary-checkout"
        disabled={!agreed || cartItems.length === 0}
        onClick={() => navigate('/checkout')}
      >
        {t('CheckOut')}
      </button>
    </div>
  );
}

export default CartSummary;
