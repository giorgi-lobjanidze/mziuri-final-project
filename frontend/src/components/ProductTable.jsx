import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useTranslation } from 'react-i18next';

function ProductTable() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { getPrice, formatPrice, formatNumber } = useCurrency();
  const { t } = useTranslation();

  return (
    <div className="product-table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>{t('Product')}</th>
            <th>{t('Quantity')}</th>
            <th>{t('Subtotal')}:</th>
            <th>{t('Remove')}</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, i) => (
            <tr key={i}>
              <td className="product-table-info">
                <Link to={`/shop/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                </Link>
                <div>
                  <h4>{item.name}</h4>
                  <p>Bottle Size: {item.variant.option1}</p>
                  <p>Beer Variety: {item.variant.option2}</p>
                  <p className="product-table-price">{formatPrice(item.price)} </p>
                  {item.oldPrice && (
                    <p className="product-table-old-price">{formatPrice(item.oldPrice)}</p>
                  )}
                </div>
              </td>
              <td>
                <div className="product-table-qty">
                  <button
                    onClick={() => updateQuantity(item.id, item.variant.title, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span>{String(item.quantity).padStart(2, '0')}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.variant.title, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="product-table-subtotal">
                {formatNumber(getPrice(item.price) * item.quantity)}
              </td>
              <td>
                <button
                  className="product-table-remove"
                  onClick={() => removeFromCart(item.id, item.variant.title)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="product-table-actions">
        <Link to="/shop">
          <button className="primary-btn">{t('ContinueShopping')}</button>
        </Link>
        <button
          className="primary-btn"
          onClick={clearCart}
        >
          {t('DeleteAll')}
        </button>
      </div>
    </div>
  );
}

export default ProductTable;
