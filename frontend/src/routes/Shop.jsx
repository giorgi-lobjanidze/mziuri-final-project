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
    <div className='shop'>
      <div className='shop-controls'>
        <SortBy sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      <div className='shop-body'>
        <FilterSection filters={filters} setFilters={setFilters} />
        <ProductList filters={filters} sortBy={sortBy} />
      </div>
    </div>
  )
}

export default Shop