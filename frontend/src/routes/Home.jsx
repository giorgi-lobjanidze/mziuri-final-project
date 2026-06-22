import React, { useEffect } from 'react';
import Primarybtn from '../components/Primarybtn';
import Secondarybtn from '../components/Secondarybtn';
import { useLoader } from '../context/LoaderContext';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();
  const { useFakeLoader } = useLoader();
  useEffect(() => {
    useFakeLoader();
  }, [useFakeLoader]);

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
            <Primarybtn>{t('ShopSale')}</Primarybtn>
            <Secondarybtn>{t('OurCollections')}</Secondarybtn>
          </div>
        </div>

        <div className="img-container">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/hero.png?v=1736771607"
            alt="Hero Banner Image 500x500"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
