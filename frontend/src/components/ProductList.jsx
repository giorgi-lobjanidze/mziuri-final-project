import React, { useState } from 'react'
import Product from './Product'
import data from '../data/data.json'

const PRODUCTS_PER_PAGE = 6

function getLowestPrice(variants) {
  const available = variants.filter(v => v.available)
  if (available.length === 0) return variants[0]
  return available.reduce((min, v) => parseFloat(v.price) < parseFloat(min.price) ? v : min, available[0])
}

function mapProduct(p) {
  const variant = getLowestPrice(p.variants)
  const price = parseFloat(variant.price)
  const oldPrice = variant.compare_at_price ? parseFloat(variant.compare_at_price) : null
  const discount = oldPrice && oldPrice > price ? Math.round((1 - price / oldPrice) * 100) : null
  const inStock = p.variants.some(v => v.available)

  return {
    id: p.id,
    name: p.title,
    volume: variant.option1 ?? null,
    price,
    oldPrice: oldPrice && oldPrice > price ? oldPrice : null,
    discount,
    rating: 5,
    reviews: 1,
    image: p.images[0]?.src ?? '',
    inStock,
  }
}

const rawProducts = data.products

function ProductList({ filters, sortBy }) {
  const [currentPage, setCurrentPage] = useState(1)

  const products = rawProducts.map(mapProduct)
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)

  const paginated = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  const handlePage = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='product-list-wrapper'>
      <div className='product-list'>
        {paginated.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      <div className='pagination'>
        <button className='pagination-btn' onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1}>
          «
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
            onClick={() => handlePage(page)}
          >
            {page}
          </button>
        ))}

        <button className='pagination-btn' onClick={() => handlePage(currentPage + 1)} disabled={currentPage === totalPages}>
          »
        </button>
      </div>
    </div>
  )
}

export default ProductList