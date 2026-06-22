import React, { useEffect } from 'react';
import { useLoader } from '../context/LoaderContext';
import { useWishlist } from '../context/WishlistContext';
import Product from '../components/Product';
import { useTranslation } from 'react-i18next';

function Wishlist() {
  const { useFakeLoader } = useLoader();
  const { wishlist } = useWishlist();
  const { t } = useTranslation();

  useEffect(() => {
    useFakeLoader();
  }, [useFakeLoader]);

  return (
    <>
      <div className="shop-banner">
        <div className="icon">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564"
            alt=""
          />
        </div>
        <p>{t('Wishlist')}</p>
        <div className="icon">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611"
            alt=""
          />
        </div>
      </div>

      <div className="wishlist">
        <h2>{t('YourFavouriteProduct')}</h2>
        <p>Commodo sociosqu venenatis cras dolor sagittis integer luctus maecenas.</p>

        {wishlist.length === 0 ? (
          <div className="zero-wishlist">
            <svg
              width="119"
              height="119"
              viewBox="0 0 119 119"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.0346 89.8707C13.6486 78.2693 3 61.7359 3 40.4386C3 23.1205 16.9553 9.10938 34.1613 9.10938C44.3615 9.10938 53.3849 14.0413 59.0455 21.6635C64.706 14.0413 73.7854 9.10938 83.9297 9.10938C90.3749 9.10938 96.3717 11.0707 101.36 14.4895"
                stroke="#D7DBE0"
                stroke-width="6"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M113.633 31.0229C114.586 33.9934 115.091 37.188 115.091 40.4946C115.091 79.7265 78.7732 102.873 62.52 108.478C60.6144 109.15 57.4759 109.15 55.5704 108.478C51.9274 107.245 47.3318 105.115 42.3438 102.145"
                stroke="#D7DBE0"
                stroke-width="6"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M115.091 3L3 115.091"
                stroke="#D7DBE0"
                stroke-width="6"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <p>{t('WishlistIsEmpty')}.</p>
          </div>
        ) : (
          <div className="products-grid">
            {wishlist.map((product) => (
              <Product
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Wishlist;
