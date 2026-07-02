import React, { useEffect } from 'react';
import { useLoader } from '../context/LoaderContext';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Features from '../components/Features';
import InfCarousel from '../components/InfCarousel';
import Reviews from '../components/Reviews';

function About() {
  const { useFakeLoader } = useLoader();
  const { t } = useTranslation();
  useEffect(() => {
    useFakeLoader();
  }, [useFakeLoader]);

  const team = [
    {
      img: 'https://brew-blis.myshopify.com/cdn/shop/files/team01.png?v=1737460608&width=3000',
      name: 'Emily Johnson',
      position: 'Founder/CEO',
    },
    {
      img: 'https://brew-blis.myshopify.com/cdn/shop/files/team02.png?v=1737460608&width=3000',
      name: 'Michael Brown',
      position: 'Customer Service Manager',
    },
    {
      img: 'https://brew-blis.myshopify.com/cdn/shop/files/team03.png?v=1737460609&width=3000',
      name: 'Sarah Davis',
      position: 'Marketing Specialist',
    },
    {
      img: 'https://brew-blis.myshopify.com/cdn/shop/files/team04.png?v=1737460609&width=3000',
      name: 'Sophia Martinez',
      position: 'Art Curator',
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
        <p>{t('AboutUs')}</p>
        <div className="icon">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611"
            alt=""
          />
        </div>
      </div>

      <div className="about">
        <div className="about-intro">
          <div className="our-story">
            <div className="icon">
              <img
                src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564"
                alt=""
              />
            </div>
            <p>{t('OurStory')}</p>
            <div className="icon">
              <img
                src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611"
                alt=""
              />
            </div>
          </div>
          <h2>{t('AboutIntro')}</h2>
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/about-hero.png?v=1737455564"
            alt="Brew Bliss"
          />
        </div>

        <Features />

        <div className="about-team">
          <div className="about-team-header">
            <img
              src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564"
              alt=""
            />
            <h2>{t('MeetOurTeam')}</h2>
            <img
              src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611"
              alt=""
            />
          </div>
          <p className="about-team-sub">{t('TeamSub')}</p>
          <div className="about-team-grid">
            {team.map((member, i) => (
              <div
                className="about-team-card"
                key={i}
              >
                <div className="about-team-image">
                  <img
                    src={member.img}
                    alt={member.name}
                  />
                </div>
                <div className="about-team-info">
                  <h3>{member.name}</h3>
                  <p>{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <InfCarousel />

        <Reviews />
      </div>
    </>
  );
}

export default About;
