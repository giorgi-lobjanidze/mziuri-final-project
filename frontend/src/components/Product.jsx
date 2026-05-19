import React from 'react'
import { Link } from 'react-router-dom'

function Product({ product }) {
  const { id, name, volume, price, oldPrice, discount, rating, reviews, image, inStock } = product

  return (
    <div className='product-card'>
      {discount && <span className='product-badge'>-{discount}%</span>}
      <Link to={`/shop/${id}`}>
        <div className='product-img'>
          <img src={image} alt={name} />
        </div>
      </Link>
      <div className='product-info'>
        <h3>{name}</h3>
        <p className='product-volume'>{volume}</p>
        <div className='product-rating'>
          {'★'.repeat(rating)} ({reviews} Review)
        </div>
        <div className='product-price'>
          <span className='price-current'>${price}.00</span>
          {oldPrice && <span className='price-old'>${oldPrice}.00</span>}
        </div>
        <button className='add-to-cart'>Add To Cart</button>
      </div>
    </div>
  )
}

export default Product