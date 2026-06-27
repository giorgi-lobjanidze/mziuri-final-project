import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

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
      image: 'https://brew-blis.myshopify.com/cdn/shop/files/cat04.png?v=1737092466&width=1780',
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

    

function Collections() {
  const navigate = useNavigate();

  return (
    <div className="collections">
          {collections.map((col) => (
            <Link
              to='/shop'
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
            </Link>
          ))}
        </div>
  )
}

export default Collections