import React, { useEffect, useState } from 'react';
import { useLoader } from '../context/LoaderContext';
import FilterSection from '../components/FilterSection';
import SortBy from '../components/SortBy';
import ProductList from '../components/ProductList';
import Collections from '../components/Collections';
import { useTranslation } from 'react-i18next';

function Shop() {
  const { t } = useTranslation();
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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [productCount, setProductCount] = useState(0);

  const resetAllFilters = () => {
    setFilters({ category: [], availability: [], priceFrom: '', priceTo: '' });
  };

  return (
    <>
      <div className="shop-banner">
        <div className="icon">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564"
            alt=""
          />
        </div>
        <p>{t('Products')}</p>
        <div className="icon">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611"
            alt=""
          />
        </div>
      </div>
      <div className="shop">
        <Collections />

        <div className="mobile-search">
          <input
            type="text"
            placeholder="Search Here"
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9.74062 0C15.1116 0 19.4812 4.36964 19.4812 9.74063C19.4812 12.1734 18.5847 14.4008 17.1047 16.1097L23.7941 22.7997C24.0687 23.0743 24.0686 23.5195 23.794 23.7941C23.5194 24.0687 23.0743 24.0686 22.7997 23.7941L16.1104 17.1041C14.4014 18.5845 12.1738 19.4813 9.74062 19.4813C4.36964 19.4813 0 15.1116 0 9.74063C0 4.36964 4.36964 0 9.74062 0ZM9.74062 18.075C14.3362 18.075 18.075 14.3362 18.075 9.74063C18.075 5.14505 14.3362 1.40625 9.74062 1.40625C5.14505 1.40625 1.40625 5.14505 1.40625 9.74063C1.40625 14.3362 5.14505 18.075 9.74062 18.075Z"
                fill="black"
              />
            </svg>
          </button>
        </div>

        <div
          className="mobile-filter-bar"
          onClick={() => setIsMobileFilterOpen(true)}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            {t('FilterAndSort')}
          </span>
          <span className="mobile-filter-count">
            {productCount} {t('Products')}
          </span>
        </div>

        <div className="shop-controls">
          <SortBy
            sortBy={sortBy}
            setSortBy={setSortBy}
            view={view}
            setView={setView}
            productCount={productCount}
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
            onFilteredCountChange={setProductCount}
          />
        </div>
      </div>

      <div className={`mobile-filter-overlay ${isMobileFilterOpen ? 'open' : ''}`}>
        <div className="mobile-filter-overlay-header">
          <span>{t('FilterAndSort')}</span>
          <button
            className="mobile-filter-close"
            onClick={() => setIsMobileFilterOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="mobile-filter-overlay-body">
          <p className="mobile-filter-overlay-count">
            {productCount} {t('Products')}
          </p>
          <FilterSection
            filters={filters}
            setFilters={setFilters}
            mobileAccordion
          />
          <div className="mobile-filter-sort">
            <SortBy
              sortBy={sortBy}
              setSortBy={setSortBy}
              compact
            />
          </div>
        </div>
        <div className="mobile-filter-overlay-footer">
          <span onClick={resetAllFilters}>{t('RemoveAll')}</span>
          <button onClick={() => setIsMobileFilterOpen(false)}>{t('Apply')}</button>
        </div>
      </div>
    </>
  );
}

export default Shop;
