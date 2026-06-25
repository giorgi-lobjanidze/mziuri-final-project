import React, { useState, useEffect } from 'react';
import Product from './Product';
import { getProducts } from '../api/api';
import { useCurrency } from '../context/CurrencyContext';

const PRODUCTS_PER_PAGE = 6;

function getLowestPrice(variants, getPrice) {
  const available = variants.filter((v) => v.available);
  if (available.length === 0) return variants[0];
  return available.reduce(
    (min, v) => (getPrice(v.price) < getPrice(min.price) ? v : min),
    available[0]
  );
}

function mapProduct(p, getPrice) {
  const variant = getLowestPrice(p.variants, getPrice);
  const price = variant.price;
  const oldPrice = variant.compare_at_price ?? null;
  const priceNum = getPrice(price);
  const oldPriceNum = oldPrice ? getPrice(oldPrice) : null;
  const discount =
    oldPriceNum && oldPriceNum > priceNum ? Math.round((1 - priceNum / oldPriceNum) * 100) : null;
  const inStock = p.variants.some((v) => v.available);

  return {
    id: p.id,
    name: p.title,
    volume: variant.option1 ?? null,
    price,
    oldPrice: oldPriceNum && oldPriceNum > priceNum ? oldPrice : null,
    discount,
    rating: 5,
    reviews: 1,
    image: p.images[0]?.src ?? '',
    inStock,
    tags: p.tags ?? [],
    createdAt: p.created_at ?? '',
  };
}

function ProductList({ filters, sortBy, view }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rawProducts, setRawProducts] = useState([]);
  const { getPrice } = useCurrency();

  useEffect(() => {
    getProducts().then((products) => setRawProducts(products ?? []));
  }, []);

  let products = rawProducts.map((p) => mapProduct(p, getPrice));

  // filter
  if (filters.category.length > 0) {
    products = products.filter((p) => filters.category.some((cat) => p.tags.includes(cat)));
  }

  if (filters.availability.length > 0) {
    products = products.filter((p) => {
      if (filters.availability.includes('instock') && p.inStock) return true;
      if (filters.availability.includes('outofstock') && !p.inStock) return true;
      return false;
    });
  }

  if (filters.priceFrom !== '') {
    products = products.filter((p) => getPrice(p.price) >= parseFloat(filters.priceFrom));
  }

  if (filters.priceTo !== '') {
    products = products.filter((p) => getPrice(p.price) <= parseFloat(filters.priceTo));
  }

  // sort
  products = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetically-az':
        return a.name.localeCompare(b.name);
      case 'alphabetically-za':
        return b.name.localeCompare(a.name);
      case 'price-low':
        return getPrice(a.price) - getPrice(b.price);
      case 'price-high':
        return getPrice(b.price) - getPrice(a.price);
      case 'created-ascending':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'created-descending':
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginated = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="product-list-wrapper">
      <div className={`product-list ${view}`}>
        {products.length === 0 ? (
          <p className="no-products">No products match your filters.</p>
        ) : (
          paginated.map((product) => (
            <Product
              key={product.id}
              product={product}
            />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={() => handlePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
