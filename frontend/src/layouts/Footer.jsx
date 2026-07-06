import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  return (
    <>
      <div className="footer-images">
        <img
          src="//brew-blis.myshopify.com/cdn/shop/files/instagram01.png?v=1737376523"
          alt=""
        />
        <img
          src="//brew-blis.myshopify.com/cdn/shop/files/instagram02.png?v=1737377635"
          alt=""
        />
        <img
          src="//brew-blis.myshopify.com/cdn/shop/files/instagram03.png?v=1737377654"
          alt=""
        />
        <img
          src="//brew-blis.myshopify.com/cdn/shop/files/instagram04.png?v=1737377654"
          alt=""
        />
        <img
          src="//brew-blis.myshopify.com/cdn/shop/files/instagram05.png?v=1737377654"
          alt=""
        />
        <img
          src="//brew-blis.myshopify.com/cdn/shop/files/instagram07.png?v=1737377654"
          alt=""
        />
        <img
          src="//brew-blis.myshopify.com/cdn/shop/files/instagram08.png?v=1737377654"
          alt=""
        />
        <img
          src="//brew-blis.myshopify.com/cdn/shop/files/instagram06.png?v=1737377654"
          alt=""
        />
      </div>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <img
              src="//brew-blis.myshopify.com/cdn/shop/files/Logo_210x210@2x.png?v=1736775810"
              alt="Brew Bliss"
              className="footer-logo"
            />
            <p>
              {t('PassionateAboutBeerFirst')} <br /> {t('PassionateAboutBeerSecond')}
            </p>
            <ul className="footer-contact">
              <li>
                <span>{t('Address')}</span> 218 Fifth Avenue, Heaven Tower
              </li>
              <li>
                <span>{t('Phone')}</span> (323) 576-1942
              </li>
              <li>
                <span>{t('Email')}</span> Exampleinfo@Gmail.Com
              </li>
            </ul>
          </div>

          <div className={`footer-links ${openSection === 'company' ? 'open' : ''}`}>
            <h4 onClick={() => toggleSection('company')}>
              {t('OurCompany')}
              <svg
                className="footer-accordion-arrow"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </h4>
            <ul>
              <li>
                <Link to="/">{t('Home')}</Link>
              </li>
              <li>
                <Link to="/about">{t('AboutUs')}</Link>
              </li>
              <li>
                <Link to="/contact">{t('OurStores')}</Link>
              </li>
              <li>
                <Link to="/contact">{t('ContactUs')}</Link>
              </li>
              <li>
                <Link to="/">{t('SizeGuide')}</Link>
              </li>
              <li>
                <Link to="/profile">{t('MyAccount')}</Link>
              </li>
            </ul>
          </div>

          <div className={`footer-links ${openSection === 'service' ? 'open' : ''}`}>
            <h4 onClick={() => toggleSection('service')}>
              {t('CustomerService')}
              <svg
                className="footer-accordion-arrow"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </h4>
            <ul>
              <li>
                <Link to="/">{t('PrivacyPolicy')}</Link>
              </li>
              <li>
                <Link to="/">{t('ThemeFAQs')}</Link>
              </li>
              <li>
                <Link to="/">{t('RefundPolicy')}</Link>
              </li>
              <li>
                <Link to="/">{t('AdvancedSearch')}</Link>
              </li>
              <li>
                <Link to="/contact">{t('StoreLocations')}</Link>
              </li>
              <li>
                <Link to="/">{t('TermsAndConditions')}</Link>
              </li>
            </ul>
          </div>

          <div className={`footer-newsletter ${openSection === 'newsletter' ? 'open' : ''}`}>
            <h4 onClick={() => toggleSection('newsletter')}>
              {t('SignUpToNewsletter')}
              <svg
                className="footer-accordion-arrow"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </h4>
            <div className="footer-newsletter-body">
              <p>{t('SignUpForExclusiveUpdates')}</p>
              <div className="newsletter-form">
                <div className="newsletter-input-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_13786_2931)">
                      <path
                        d="M22.5571 3.5625H2.77588C1.61043 3.5625 0.666504 4.51228 0.666504 5.67188V18.3281C0.666504 19.4946 1.61736 20.4375 2.77588 20.4375H22.5571C23.7128 20.4375 24.6665 19.4986 24.6665 18.3281V5.67188C24.6665 4.51434 23.7263 3.5625 22.5571 3.5625ZM22.2617 4.96875C21.8308 5.39742 14.4141 12.775 14.1581 13.0297C13.7596 13.4281 13.2299 13.6475 12.6665 13.6475C12.1031 13.6475 11.5734 13.4281 11.1736 13.0284C11.0014 12.8571 3.66664 5.56097 3.07129 4.96875H22.2617ZM2.07275 18.0419V5.95898L8.14954 12.0037L2.07275 18.0419ZM3.07218 19.0312L9.14657 12.9955L10.1806 14.0241C10.8446 14.6881 11.7275 15.0538 12.6665 15.0538C13.6056 15.0538 14.4884 14.6881 15.1511 14.0254L16.1864 12.9955L22.2608 19.0312H3.07218ZM23.2603 18.0419L17.1835 12.0037L23.2603 5.95898V18.0419Z"
                        fill="#1F1F1F"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_13786_2931">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(0.666504)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <input
                    type="email"
                    placeholder="Your email address..."
                  />
                </div>
                <button>Subscribe</button>
              </div>

              <h4 className="footer-followus-label">{t('FollowUs')}</h4>
              <div className="footer-socials">
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                    />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line
                      x1="17.5"
                      x2="17.51"
                      y1="6.5"
                      y2="6.5"
                    />
                  </svg>
                </a>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            Copyright © <a href="#">Brew Bliss Store.</a> All Rights Reserved. Powered By{' '}
            <a href="#">UIPARADOX.</a>
          </p>
          <div className="footer-payments">
            <img
              loading="lazy"
              width="48px"
              height="32px"
              className="img_tr_svg"
              src="//brew-blis.myshopify.com/cdn/shopifycloud/storefront/assets/payment_icons/amazon-ec9fb491.svg"
              data-src="//brew-blis.myshopify.com/cdn/shopifycloud/storefront/assets/payment_icons/amazon-ec9fb491.svg"
              alt="amazon payments"
            />
            <img
              loading="lazy"
              width="48px"
              height="32px"
              className="img_tr_svg"
              src="//brew-blis.myshopify.com/cdn/shopifycloud/storefront/assets/payment_icons/apple_pay-1721ebad.svg"
              data-src="//brew-blis.myshopify.com/cdn/shopifycloud/storefront/assets/payment_icons/apple_pay-1721ebad.svg"
              alt="apple pay"
            />
            <img
              loading="lazy"
              width="48px"
              height="32px"
              className="img_tr_svg"
              src="//brew-blis.myshopify.com/cdn/shopifycloud/storefront/assets/payment_icons/master-f5a74105.svg"
              data-src="//brew-blis.myshopify.com/cdn/shopifycloud/storefront/assets/payment_icons/master-f5a74105.svg"
              alt="master"
            />
            <img
              loading="lazy"
              width="48px"
              height="32px"
              className="img_tr_svg"
              src="//brew-blis.myshopify.com/cdn/shopifycloud/storefront/assets/payment_icons/paypal-a7c68b85.svg"
              data-src="//brew-blis.myshopify.com/cdn/shopifycloud/storefront/assets/payment_icons/paypal-a7c68b85.svg"
              alt="paypal"
            />
            <img
              loading="lazy"
              width="48px"
              height="32px"
              className="img_tr_svg"
              src="//brew-blis.myshopify.com/cdn/shopifycloud/storefront/assets/payment_icons/visa-b614b878.svg"
              data-src="//brew-blis.myshopify.com/cdn/shopifycloud/storefront/assets/payment_icons/visa-b614b878.svg"
              alt="visa"
            />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
