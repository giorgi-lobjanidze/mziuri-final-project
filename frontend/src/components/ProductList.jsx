import React from 'react'
import Product from './Product'
import data from '../data/data.json'

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
  const products = rawProducts.map(mapProduct)

  return (
    <div className='product-list'>
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList