import React, { useEffect, useState } from 'react';
import { useLoader } from '../context/LoaderContext';
import FilterSection from '../components/FilterSection';
import SortBy from '../components/SortBy';
import ProductList from '../components/ProductList';

function Shop() {
  const { useFakeLoader } = useLoader();
  useEffect(() => useFakeLoader(), []);

  const [sortBy, setSortBy] = useState('alphabetically-az');
  const [view, setView] = useState('grid-2');
  const [filters, setFilters] = useState({
    category: [],
    availability: [],
    priceFrom: '',
    priceTo: '',
  });

  const collections = [
    {
      id: 1,
      name: 'Lager Beers',
      count: null,
      image: 'https://brew-blis.myshopify.com/cdn/shop/files/cat01.png?v=1737092466&width=3000',
    },
    {
      id: 2,
      name: 'IPA Beers',
      count: 12,
      image: 'https://brew-blis.myshopify.com/cdn/shop/files/cat02.png?v=1737092466&width=3000',
    },
    {
      id: 3,
      name: 'Stout Beers',
      count: 12,
      image: 'https://brew-blis.myshopify.com/cdn/shop/files/cat03.png?v=1737092466&width=3000',
    },
    {
      id: 4,
      name: 'Amber Ale',
      count: 12,
      image: 'https://brew-blis.myshopify.com/cdn/shop/files/cat03.png?v=1737092466&width=3000',
    },
    {
      id: 5,
      name: 'Dark Beers',
      count: 12,
      image: 'https://brew-blis.myshopify.com/cdn/shop/files/cat05.png?v=1737092466&width=3000',
    },
    {
      id: 6,
      name: 'Classic Ales',
      count: 12,
      image: 'https://brew-blis.myshopify.com/cdn/shop/files/cat06.png?v=1737092466&width=2000',
    },
  ];

  return (
    <>
      <div className="shop-banner">
        <div className="icon">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564"
            alt=""
          />
        </div>
        <p>Products</p>
        <div className="icon">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611"
            alt=""
          />
        </div>
      </div>
      <div className="shop">
        <div className="collections">
          {collections.map((col) => (
            <div
              className="collections__item"
              key={col.id}
            >
              <div className="collections__img-wrap">
                <img
                  src={col.image}
                  alt={col.name}
                />
              </div>
              <div className="collections__label">
                <span className="collections__name">{col.name}</span>
                {col.count && <span className="collections__count">{col.count}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="shop-controls">
          <SortBy
            sortBy={sortBy}
            setSortBy={setSortBy}
            view={view}
            setView={setView}
          />
        </div>
        <div className="shop-body">
          <FilterSection
            filters={filters}
            setFilters={setFilters}
          />
          <ProductList
            filters={filters}
            sortBy={sortBy}
            view={view}
          />
        </div>
      </div>
    </>
  );
}

export default Shop;
