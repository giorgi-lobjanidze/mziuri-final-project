import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext';

function NotFound() {
  const { useFakeLoader } = useLoader();
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
        <p>404</p>
        <div className="icon">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611"
            alt=""
          />
        </div>
      </div>

      <div className="not-found">
        <div className="not-found-content">
          <div className="not-found-number">
            <img
              src="//brew-blis.myshopify.com/cdn/shop/files/404.png?v=1737455564"
              alt="can"
            />
          </div>
          <h2>Sorry, We Can't Find That Page!</h2>
          <p>
            It Seems This Page Has Moved Or Doesn't Exist. Head Back To Our Homepage, Or Reach Out
            If You Need Help!
          </p>
          <Link
            to="/"
            className="not-found-btn"
          >
            Back To Homepage
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;
