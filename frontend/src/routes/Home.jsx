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
import { Link } from 'react-router-dom';

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
  const discount = oldPriceNum && oldPriceNum > priceNum ? Math.round((1 - priceNum / oldPriceNum) * 100) : null;
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
  <button className="featured-arrow featured-arrow--next" onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button className="featured-arrow featured-arrow--prev" onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  </button>
);

function Home() {
  const { t } = useTranslation();
  const { useFakeLoader } = useLoader();
  const { getPrice } = useCurrency();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    useFakeLoader();
  }, [useFakeLoader]);

  useEffect(() => {
    getProducts().then((raw) => setProducts((raw ?? []).map((p) => mapProduct(p, getPrice))));
  }, []);

  const sliderSettings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    speed: 400,
    infinite: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <div className="hero">
        <div className="hero-text">
          <div className="arrivals">
            <div className="icon">
              <img src="//brew-blis.myshopify.com/cdn/shop/files/vector1.png?v=1736771826" alt="" />
            </div>
            <p>{t('NewArrival')}</p>
            <div className="icon">
              <img src="//brew-blis.myshopify.com/cdn/shop/files/vector2.png?v=1736775115" alt="" />
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
            <Primarybtn>{t('ShopSale')}</Primarybtn>
            <Secondarybtn>{t('OurCollections')}</Secondarybtn>
          </div>
        </div>
        <div className="img-container">
          <img src="//brew-blis.myshopify.com/cdn/shop/files/hero.png?v=1736771607" alt="Hero Banner Image 500x500" />
        </div>
      </div>

      <div className="shop">
        <Collections />
      </div>

      <div className="featured-products">
        <div className="featured-products-header">
          <div className="icon">
            <img src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564" alt="" />
          </div>
          <h2>Featured Products</h2>
          <div className="icon">
            <img src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611" alt="" />
          </div>
        </div>
        <p className="featured-products-sub">Describe What Your Customers Will Receive When Subscribing To Your Newsletter. What Your Customers</p>

        <div className="featured-slider-wrapper">
          <Slider {...sliderSettings}>
            {products.map((product) => (
              <div className="featured-products-slide" key={product.id}>
                <Product product={product} className="product-home-card" />
              </div>
            ))}
          </Slider>
        </div>

        <div className="featured-products-btn">
          <Link to={'/shop'}><Primarybtn>Show All</Primarybtn></Link>
        </div>
      </div>
    </>
  );
}

export default Home;