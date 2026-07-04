import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Product from './Product';
import Primarybtn from './Primarybtn';

const NextArrow = ({ onClick }) => (
  <button
    className="featured-arrow featured-arrow--next"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="featured-arrow featured-arrow--prev"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  </button>
);

const FeaturedProducts = ({ products }) => {
  const { t } = useTranslation();

  const sliderSettings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    speed: 400,
    infinite: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="featured-products">
      <div className="featured-products-header">
        <div className="icon">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564"
            alt=""
          />
        </div>
        <h2>{t('FeaturedProducts')}</h2>
        <div className="icon">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611"
            alt=""
          />
        </div>
      </div>
      <p className="featured-products-sub">{t('FeaturedProductsSub')}</p>

      <div className="featured-slider-wrapper">
        <Slider {...sliderSettings}>
          {products.map((product) => (
            <div
              className="featured-products-slide"
              key={product.id}
            >
              <Product
                product={product}
                className="product-home-card"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="featured-products-btn">
        <Link to="/shop">
          <Primarybtn>{t('ShowAll')}</Primarybtn>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
