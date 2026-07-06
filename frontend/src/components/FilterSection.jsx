import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function FilterSection({ setFilters, mobileAccordion = false }) {
  const { t } = useTranslation();
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [openGroup, setOpenGroup] = useState(null);

  const categories = [
    { key: 'beer', label: t('Beer') },
    { key: 'whisky', label: t('Whisky') },
    { key: 'wheatBeer', label: t('WheatBeer') },
    { key: 'nonAlcoholicBeer', label: t('NonAlcoholicBeer') },
    { key: 'ipa', label: t('IPA') },
  ];

  const toggleCategory = (cat) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.includes(cat)
        ? prev.category.filter((c) => c !== cat)
        : [...prev.category, cat],
    }));
  };

  const toggleAvailability = (b) => {
    setFilters((prev) => ({
      ...prev,
      availability: prev.availability.includes(b)
        ? prev.availability.filter((a) => a !== b)
        : [...prev.availability, b],
    }));
  };

  const toggleGroup = (group) => {
    if (!mobileAccordion) return;
    setOpenGroup(openGroup === group ? null : group);
  };

  return (
    <div className={`filter-section ${mobileAccordion ? 'mobile-accordion' : ''}`}>
      {!mobileAccordion && (
        <>
          <div className="filter-search">
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
                <g clipPath="url(#clip0_11518_1140)">
                  <path
                    d="M9.74062 0C15.1116 0 19.4812 4.36964 19.4812 9.74063C19.4812 12.1734 18.5847 14.4008 17.1047 16.1097L23.7941 22.7997C24.0687 23.0743 24.0686 23.5195 23.794 23.7941C23.5194 24.0687 23.0743 24.0686 22.7997 23.7941L16.1104 17.1041C14.4014 18.5845 12.1738 19.4813 9.74062 19.4813C4.36964 19.4813 0 15.1116 0 9.74063C0 4.36964 4.36964 0 9.74062 0ZM9.74062 18.075C14.3362 18.075 18.075 14.3362 18.075 9.74063C18.075 5.14505 14.3362 1.40625 9.74062 1.40625C5.14505 1.40625 1.40625 5.14505 1.40625 9.74063C1.40625 14.3362 5.14505 18.075 9.74062 18.075Z"
                    fill="black"
                  />
                </g>
              </svg>
            </button>
          </div>

          <div className="filter-group">
            <h4>{t('ProductCategories')}</h4>
            {categories.map((i) => (
              <div
                key={i.key}
                className="filter-item"
                onClick={() => toggleCategory(i.key)}
              >
                <span>{i.label}</span>
                <span>(12)</span>
              </div>
            ))}
          </div>
        </>
      )}

      <div
        className={`filter-group ${mobileAccordion ? 'accordion-item' : ''} ${openGroup === 'availability' ? 'open' : ''}`}
      >
        <div
          className="filter-group-header"
          onClick={() => toggleGroup('availability')}
        >
          <h4>{t('Availability')}</h4>
          {mobileAccordion ? (
            <svg
              className="accordion-arrow"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          ) : (
            <span
              onClick={(e) => {
                e.stopPropagation();
                setFilters((prev) => ({ ...prev, availability: [] }));
              }}
            >
              {t('Reset')}
            </span>
          )}
        </div>
        <div className="accordion-content">
          <label>
            <input
              type="checkbox"
              onChange={() => toggleAvailability('instock')}
            />{' '}
            {t('InStock')}
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleAvailability('outofstock')}
            />{' '}
            {t('OutOfStock')}
          </label>
        </div>
      </div>

      <div
        className={`filter-group ${mobileAccordion ? 'accordion-item' : ''} ${openGroup === 'price' ? 'open' : ''}`}
      >
        <div
          className="filter-group-header"
          onClick={() => toggleGroup('price')}
        >
          <h4>{t('Price')}</h4>
          {mobileAccordion ? (
            <svg
              className="accordion-arrow"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          ) : (
            <span
              onClick={(e) => {
                e.stopPropagation();
                setFilters((prev) => ({ ...prev, priceFrom: '', priceTo: '' }));
              }}
            >
              {t('Reset')}
            </span>
          )}
        </div>
        <div className="accordion-content">
          <p>
            {t('HighestPrice')} <span className="price-highlight">$200.00</span>
          </p>
          <div className="price-inputs">
            <input
              type="number"
              placeholder="From"
              value={priceFrom}
              onChange={(e) => {
                setPriceFrom(e.target.value);
                setFilters((prev) => ({ ...prev, priceFrom: e.target.value }));
              }}
            />
            <input
              type="number"
              placeholder="To"
              value={priceTo}
              onChange={(e) => {
                setPriceTo(e.target.value);
                setFilters((prev) => ({ ...prev, priceTo: e.target.value }));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterSection;
