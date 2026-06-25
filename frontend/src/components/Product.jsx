import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

function Product({ product }) {
  const { id, name, volume, price, oldPrice, discount, rating, reviews, image, inStock } = product;
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const { addToCart } = useCart();
  const { formatPrice, getPrice } = useCurrency();

  const handleAddToCart = () => {
    const variant = {
      title: volume ?? 'default',
      price,
      compare_at_price: oldPrice ?? null,
      available: inStock,
    };
    addToCart(product, variant, 1);
  };

  return (
    <div className="product-card">
      {discount && <span className="product-badge">-{discount}%</span>}

      <div className="product-card-image-wrapper">
        <Link to={`/shop/${id}`}>
          <div className="product-img">
            <img
              src={image}
              alt={name}
            />
          </div>
        </Link>
        <button
          className={`product-wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={() => toggleWishlist(product)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path d="M10 17.5C10 17.5 1.25 12.5 1.25 6.875C1.25 5.549 1.78 4.277 2.72 3.34C3.658 2.402 4.93 1.875 6.25 1.875C7.917 1.875 9.375 2.708 10 4.167C10.625 2.708 12.083 1.875 13.75 1.875C15.07 1.875 16.342 2.402 17.28 3.34C18.22 4.277 18.75 5.549 18.75 6.875C18.75 12.5 10 17.5 10 17.5Z" />
          </svg>
        </button>
      </div>

      <div className="product-info">
        <h3>{name}</h3>
        <p className="product-volume">{volume}</p>
        <div className="product-rating">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              style={{ color: i < rating ? '#FEA90C' : '#ddd' }}
            >
              ★
            </span>
          ))}
          <span className="review-count">({reviews} Review)</span>
        </div>
        <div className="product-price">
          <span className="price-current">{formatPrice(price)}</span>
          {oldPrice && <span className="price-old">{formatPrice(oldPrice)}</span>}
        </div>
        <button
          className="add-to-cart"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
