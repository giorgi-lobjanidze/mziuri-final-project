import React, { useEffect, useState } from 'react'
import { useLoader } from '../context/LoaderContext'
import FilterSection from '../components/FilterSection'
import SortBy from '../components/SortBy'
import ProductList from '../components/ProductList'

function Shop() {
  const { useFakeLoader } = useLoader()
  useEffect(() => useFakeLoader(), [])

  const [sortBy, setSortBy] = useState('alphabetically-az')
  const [filters, setFilters] = useState({
    category: [],
    availability: [],
    priceFrom: '',
    priceTo: ''
  })

  return (
    <>
      <div className="shop-banner">
        <div className="icon">
          <img src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564" alt=""/>
        </div>
        <p>Products</p>
        <div className="icon">
          <img src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611" alt=""/>
        </div>
      </div>
      <div className='shop'>
        <div className='shop-controls'>
          <SortBy sortBy={sortBy} setSortBy={setSortBy} />
        </div>
        <div className='shop-body'>
          <FilterSection filters={filters} setFilters={setFilters} />
          <ProductList filters={filters} sortBy={sortBy} />
        </div>
      </div>
    </>
  )
}

export default Shop