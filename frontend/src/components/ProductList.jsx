import React, { useState, useEffect } from 'react'
import Product from './Product'
import { getProducts } from '../api/api'

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
    tags: p.tags ?? [],
    createdAt: p.created_at ?? '',
  }
}

// const rawProducts = data.products

function ProductList({ filters, sortBy, view }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [rawProducts, setRawProducts] = useState([])

  useEffect(() => {
    getProducts().then(products => setRawProducts(products ?? []))
  }, [])

  let products = rawProducts.map(mapProduct)

  // filter
  if (filters.category.length > 0) {
    products = products.filter(p =>
      filters.category.some(cat => p.tags.includes(cat))
    )
  }

  if (filters.availability.length > 0) {
    products = products.filter(p => {
      if (filters.availability.includes('instock') && p.inStock) return true
      if (filters.availability.includes('outofstock') && !p.inStock) return true
      return false
    })
  }

  if (filters.priceFrom !== '') {
    products = products.filter(p => p.price >= parseFloat(filters.priceFrom))
  }

  if (filters.priceTo !== '') {
    products = products.filter(p => p.price <= parseFloat(filters.priceTo))
  }

  // sort
  products = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetically-az': return a.name.localeCompare(b.name)
      case 'alphabetically-za': return b.name.localeCompare(a.name)
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'created-ascending': return new Date(a.createdAt) - new Date(b.createdAt)
      case 'created-descending': return new Date(b.createdAt) - new Date(a.createdAt)
      default: return 0
    }
  })

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
      <div className={`product-list ${view}`}>
        {products.length === 0
          ? <p className='no-products'>No products match your filters.</p>
          : paginated.map(product => (
              <Product key={product.id} product={product} />
            ))
        }
      </div>

      {totalPages > 1 && (
        <div className='pagination'>
          <button className='pagination-btn' onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1}>«</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button key={page} className={`pagination-btn ${currentPage === page ? 'active' : ''}`} onClick={() => handlePage(page)}>
              {page}
            </button>
          ))}
          <button className='pagination-btn' onClick={() => handlePage(currentPage + 1)} disabled={currentPage === totalPages}>»</button>
        </div>
      )}
    </div>
  )
}

export default ProductList