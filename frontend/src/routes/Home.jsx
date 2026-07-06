import React, { useEffect, useState } from 'react';
import Primarybtn from '../components/Primarybtn';
import Secondarybtn from '../components/Secondarybtn';
import { useLoader } from '../context/LoaderContext';
import { useTranslation } from 'react-i18next';
import Collections from '../components/Collections';
import Product from '../components/Product';
import { getProducts } from '../api/api';
import { useCurrency } from '../context/CurrencyContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useNavigate } from 'react-router-dom';
import Features from '../components/Features';
import InfCarousel from '../components/InfCarousel';
import Reviews from '../components/Reviews';
import FeaturedProducts from '../components/FeaturedProducts';

const getLowestPrice = (variants, getPrice) => {
  const available = variants.filter((v) => v.available);
  if (available.length === 0) return variants[0];
  return available.reduce(
    (min, v) => (getPrice(v.price) < getPrice(min.price) ? v : min),
    available[0]
  );
};

const mapProduct = (p, getPrice) => {
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
};

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

function Home() {
  const { t } = useTranslation();
  const { useFakeLoader } = useLoader();
  const { getPrice } = useCurrency();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    useFakeLoader();
  }, [useFakeLoader]);

  useEffect(() => {
    getProducts().then((raw) => setProducts((raw ?? []).map((p) => mapProduct(p, getPrice))));
  }, []);

  const newArrivalsSliderSettings = {
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    speed: 400,
    infinite: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  return (
    <>
      <div className="hero">
        <div className="hero-text">
          <div className="arrivals">
            <div className="icon">
              <img
                src="//brew-blis.myshopify.com/cdn/shop/files/vector1.png?v=1736771826"
                alt=""
              />
            </div>
            <p>{t('NewArrival')}</p>
            <div className="icon">
              <img
                src="//brew-blis.myshopify.com/cdn/shop/files/vector2.png?v=1736775115"
                alt=""
              />
            </div>
          </div>
          <h1 className="hero-header">
            {t('DiscoverFlavorsFirst')} <br /> {t('DiscoverFlavorsSecond')}
          </h1>
          <p className="hero-p">
            {t('ExploreRichDiverseWorldFirst')} <br />
            {t('ExploreRichDiverseWorldSecond')}
          </p>
          <div className="btns-container">
            <Primarybtn onClick={() => navigate('shop')}>{t('ShopSale')}</Primarybtn>
            <Secondarybtn onClick={() => navigate('shop')}>{t('OurCollections')}</Secondarybtn>
          </div>
        </div>
        <div className="img-container">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/hero.png?v=1736771607"
            alt="Hero Banner Image 500x500"
          />
        </div>
      </div>

      <div className="shop">
        <Collections />
      </div>

      <FeaturedProducts products={products} />

      <div className="promo-cards">
        <div
          className="promo-card"
          style={{
            backgroundImage:
              "url('//brew-blis.myshopify.com/cdn/shop/files/Collection01.png?v=1737119432')",
          }}
        >
          <div className="promo-card-content">
            <div className="promo-card-tag">
              <img
                src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564"
                alt=""
              />
              <span>{t('NewRelease')}</span>
              <img
                src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611"
                alt=""
              />
            </div>
            <h3>{t('PromoCard1')}</h3>
            <Link to="/shop">
              <button className="promo-btn">{t('ShopNow')}</button>
            </Link>
          </div>
        </div>

        <div
          className="promo-card"
          style={{
            backgroundImage:
              "url('//brew-blis.myshopify.com/cdn/shop/files/Collection02.png?v=1737119610')",
          }}
        >
          <div className="promo-card-content">
            <div className="promo-card-tag">
              <img
                src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564"
                alt=""
              />
              <span>{t('HolidayCollections')}</span>
              <img
                src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611"
                alt=""
              />
            </div>
            <h3>{t('PromoCard2')}</h3>
            <Link to="/shop">
              <button className="promo-btn">{t('ShopNow')}</button>
            </Link>
          </div>
        </div>

        <div
          className="promo-card"
          style={{
            backgroundImage:
              "url('//brew-blis.myshopify.com/cdn/shop/files/Collection03.png?v=1737119679')",
          }}
        >
          <div className="promo-card-content">
            <div className="promo-card-tag">
              <img
                src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564"
                alt=""
              />
              <span>{t('LimitedTimeOffer')}</span>
              <img
                src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611"
                alt=""
              />
            </div>
            <h3>{t('PromoCard3')}</h3>
            <Link to="/shop">
              <button className="promo-btn">{t('ShopSale')}</button>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="new-arrivals"
        style={{
          backgroundImage:
            "url('//brew-blis.myshopify.com/cdn/shop/files/New_Arrivals.png?v=1737123247')",
        }}
      >
        <div className="new-arrivals-bottles">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/right-hand_img_product_43443b50-5d1a-46b5-91e5-7943cb7cfbd4.png?v=1737122100"
            alt="Tasty Beer bottles"
          />
        </div>

        <div className="new-arrivals-content">
          <div className="new-arrivals-header">
            <div className="icon">
              <img
                src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564"
                alt=""
              />
            </div>
            <h2>{t('NewArrivals')}</h2>
            <div className="icon">
              <img
                src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611"
                alt=""
              />
            </div>
          </div>
          <p className="new-arrivals-sub">{t('NewArrivalsSub')}</p>

          <div className="new-arrivals-slider-wrapper">
            <Slider {...newArrivalsSliderSettings}>
              {products.map((product) => (
                <div
                  className="new-arrivals-slide"
                  key={product.id}
                >
                  <Product product={product} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className="features-home">
        <Features />
        <InfCarousel />
      </div>

      <div className="limited-banner">
        <p>{t('LimitedTimeOnly')}</p>
        <h1>
          {t('PourBeerFirst')} <br /> {t('PourBeerSecond')}
        </h1>
        <Primarybtn onClick={() => navigate('shop')}>{t('ShopSale')}</Primarybtn>
      </div>

      <div className="reviews-home">
        <Reviews />
      </div>
    </>
  );
}

export default Home;
