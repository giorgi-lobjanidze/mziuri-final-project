import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlist } from '../context/WishlistContext';

function Header({ isSearchOpen, setIsSearchOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const [showTopBar, setShowTopBar] = useState(true);
  const { t, i18n } = useTranslation();
  const { currency, setCurrency, CURRENCIES } = useCurrency();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist?.length ?? 0;

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowTopBar(currentScrollY <= 0);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [language, setLanguage] = useState({
    flag: '//brew-blis.myshopify.com/cdn/shop/t/6/assets/flag_en.png?v=14076981825125011091761984923',
    lang: 'English',
  });

  const handleSelectEnglish = () => {
    setLanguage({
      flag: '//brew-blis.myshopify.com/cdn/shop/t/6/assets/flag_en.png?v=14076981825125011091761984923',
      lang: 'English',
    });
    setIsOpen(false);
    i18n.changeLanguage('en');
  };

  const handleSelectFrançais = () => {
    setLanguage({
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Georgia.svg',
      lang: 'ქართული',
    });
    setIsOpen(false);
    i18n.changeLanguage('ka');
  };

  const handleSelectUSD = () => {
    setCurrency(CURRENCIES.USD);
    setIsCurrencyOpen(false);
  };

  const handleSelectGEL = () => {
    setCurrency(CURRENCIES.GEL);
    setIsCurrencyOpen(false);
  };

  return (
    <>
      <div className={`top-bar ${showTopBar ? '' : 'hidden'}`}>
        <a href="tel:">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M16.249 15.5304L15.8319 14.8339C15.0817 13.5971 14.0465 12.1776 12.6885 12.1776C12.437 12.1776 12.1878 12.2282 11.9412 12.3307L11.2123 12.6432C11.1458 12.6708 11.0811 12.7022 11.0126 12.7355C10.8261 12.8262 10.6146 12.929 10.397 12.929C9.86027 12.929 9.23841 12.2305 8.64621 10.9623C8.06503 9.71762 8.1021 9.06508 8.23551 8.73673C8.38273 8.37447 8.72505 8.21959 9.09282 8.08041C9.14396 8.06101 9.19015 8.04342 9.23507 8.02493L9.97312 7.71418C11.8959 6.9101 11.1806 4.10014 10.9461 3.17889L10.7472 2.3868C10.5771 1.734 10.1263 0 8.63088 0C8.35404 0 8.05871 0.064496 7.75337 0.191774C7.55303 0.271334 4.79603 1.39672 3.79719 3.37382C2.60343 5.72716 2.82416 8.88296 4.45262 12.7515C6.0689 16.625 8.16479 18.9942 10.6821 19.7933C11.1139 19.9305 11.6019 19.9999 12.1327 19.9999H12.133C13.8702 19.9999 15.5851 19.2608 15.7243 19.1994C16.3232 18.9457 16.7104 18.5601 16.8749 18.0532C17.1538 17.1937 16.6859 16.2519 16.249 15.5304ZM15.5878 17.6356C15.5495 17.7534 15.4166 17.8609 15.1929 17.9551C15.1892 17.9567 15.1847 17.9586 15.1809 17.9603C15.1654 17.9672 13.6131 18.647 12.1326 18.6469C11.7409 18.6469 11.3907 18.5988 11.0916 18.5037C8.97077 17.8305 7.1573 15.72 5.70041 12.2286C4.2327 8.7416 3.99817 5.96837 5.00431 3.98495C5.78557 2.43858 8.23146 1.45761 8.25545 1.44823C8.26032 1.44625 8.2651 1.44435 8.26988 1.44237C8.40916 1.38391 8.534 1.35306 8.63088 1.35306C8.92901 1.35306 9.20034 1.81545 9.43613 2.72173L9.63413 3.51048C10.0613 5.18828 9.9963 6.23772 9.44939 6.46647L8.71486 6.77587C8.68563 6.78796 8.65145 6.80068 8.61374 6.81502C8.208 6.96864 7.36369 7.28814 6.98186 8.22735C6.63538 9.0796 6.77881 10.1615 7.41989 11.535C8.28332 13.3835 9.25708 14.2821 10.3968 14.2821C10.9258 14.2821 11.3504 14.0757 11.604 13.9525C11.6507 13.9298 11.6925 13.909 11.7374 13.8904L12.4674 13.5774C12.5427 13.546 12.615 13.5307 12.6884 13.5307C13.0398 13.5307 13.6698 13.8786 14.673 15.5325L15.0899 16.2285C15.6036 17.0767 15.6442 17.4618 15.5878 17.6356Z"
              fill="white"
            />
          </svg>
          (323) 576-1942
        </a>
        <p className="freeship">{t('FreeShip')}</p>
        <div className="btn-container">
          <button
            className="language-btn"
            onClick={() => {
              setIsOpen(!isOpen);
              setIsCurrencyOpen(false);
            }}
          >
            <img
              width="16px"
              height="12px"
              src={language.flag}
              alt={language.lang}
            />
            {language.lang}
          </button>{' '}
          |
          <button
            className="currency-btn"
            onClick={() => {
              setIsCurrencyOpen(!isCurrencyOpen);
              setIsOpen(false);
            }}
          >
            {currency.label} ({currency.display})
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="languages-dropdown">
          <div
            className="select-english"
            onClick={handleSelectEnglish}
          >
            <img
              width="16px"
              height="12px"
              src="//brew-blis.myshopify.com/cdn/shop/t/6/assets/flag_en.png?v=14076981825125011091761984923"
              alt="English"
            />{' '}
            English
          </div>
          <br />
          <br />
          <div
            className="select-france"
            onClick={handleSelectFrançais}
          >
            <img
              width="16px"
              height="12px"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Georgia.svg"
              alt="Français"
            />{' '}
            ქართული
          </div>
        </div>
      )}

      {isCurrencyOpen && (
        <div className="languages-dropdown currency-dropdown">
          <div
            className="select-currency"
            onClick={handleSelectUSD}
          >
            United States (USD $)
          </div>
          <div
            className="select-currency"
            onClick={handleSelectGEL}
          >
            Georgia (GEL ₾)
          </div>
        </div>
      )}

      <div className={`navbar ${showTopBar ? '' : 'sticky'}`}>
        <button
          className="burger-btn"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="logo">
          <img
            onClick={() => navigate('/')}
            src="//brew-blis.myshopify.com/cdn/shop/files/Logo_200x@2x.png?v=1736775810"
            alt="Brew Blis"
            height="113"
            width="200"
            style={{ maxWidth: '200px', width: 'auto', height: 'auto' }}
          />{' '}
        </div>
        <div className="navitems">
          <Link
            to="/"
            style={{ textTransform: 'uppercase' }}
          >
            {t('Home')}
          </Link>

          <div className="products-dropdown-wrapper">
            <span
              className="item-dropdown"
              style={{ textTransform: 'uppercase' }}
            >
              {t('Product')}{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 640 640"
              >
                <path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z" />
              </svg>
            </span>
            <div className="products-dropdown-menu">
              <div className="whisky">
                <Link
                  to="/shop"
                  style={{ color: '#FEA90C' }}
                >
                  {t('Whisky')}
                </Link>
                <Link
                  to="/shop/8022781788295"
                  className="transformx"
                >
                  Amber Crisp Ale
                </Link>
                <Link
                  to="/shop/8022781919367"
                  className="transformx"
                >
                  Amber Gold Lager
                </Link>
                <Link
                  to="/shop/8022782083207"
                  className="transformx"
                >
                  Citrus Smooth IPA
                </Link>
                <Link
                  to="/shop/8022783656071"
                  className="transformx"
                >
                  Crisp Golden IPA
                </Link>
                <Link
                  to="/shop/8022782541959"
                  className="transformx"
                >
                  Dark Chocolate Stout
                </Link>
                <Link
                  to="/shop/8022783557767"
                  className="transformx"
                >
                  Stouth Rich Dark
                </Link>
              </div>
              <div className="beer">
                <Link
                  to="/shop"
                  style={{ color: '#FEA90C' }}
                >
                  {t('Beer')}
                </Link>
                <Link
                  to="/shop/8022790045831"
                  className="transformx"
                >
                  Velvet Dark Stout
                </Link>
                <Link
                  to="/shop/8022783885447"
                  className="transformx"
                >
                  Summer Glow Lager
                </Link>
                <Link
                  to="/shop/8022783557767"
                  className="transformx"
                >
                  Stouth Rich Dark
                </Link>
                <Link
                  to="/shop/8022749053063"
                  className="transformx"
                >
                  Red Grapes Tasty Beer
                </Link>
                <Link
                  to="/shop/8022788800647"
                  className="transformx"
                >
                  Ocean Breeze IPA
                </Link>
                <Link
                  to="/shop/8022783885447"
                  className="transformx"
                >
                  Summer Glow Lager
                </Link>
              </div>
            </div>
          </div>

          <div className="products-dropdown-wrapper">
            <span
              className="item-dropdown"
              style={{ textTransform: 'uppercase' }}
            >
              {t('Shop')}{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 640 640"
              >
                <path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z" />
              </svg>
            </span>
            <div className="products-dropdown-menu shop-dropdown-menu">
              <Link
                to="/shop"
                style={{ color: '#FEA90C' }}
              >
                {t('Shop')}
              </Link>
              <Link
                to="/cart"
                className="transformx"
              >
                {t('Cart')}
              </Link>
              <Link
                to="/wishlist"
                className="transformx"
              >
                {t('Wishlist')}
              </Link>
              <Link
                to="/checkout"
                className="transformx"
              >
                {t('Checkout')}
              </Link>
              <Link
                to="/shop"
                className="transformx"
              >
                {t('ProductList')}
              </Link>
              <Link
                to="/shop/:id"
                className="transformx"
              >
                {t('ProductDetails')}
              </Link>
            </div>
          </div>

          <div className="products-dropdown-wrapper">
            <span
              className="item-dropdown"
              style={{ textTransform: 'uppercase' }}
            >
              {t('Blog')}{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 640 640"
              >
                <path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z" />
              </svg>
            </span>
            <div className="products-dropdown-menu shop-dropdown-menu">
              <Link
                to="/blog"
                className="transformx"
              >
                {t('BlogList')}
              </Link>
              <Link
                to="/blog"
                className="transformx"
              >
                {t('BlogDetails')}
              </Link>
            </div>
          </div>

          <div className="pages-dropdown-wrapper">
            <span
              className="item-dropdown"
              style={{ textTransform: 'uppercase' }}
            >
              {t('Pages')}{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 640 640"
              >
                <path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z" />
              </svg>
            </span>
            <div className="pages-dropdown-menu">
              <Link to="/about">{t('AboutUs')}</Link>
              <Link to="/contact">{t('ContactUs')}</Link>
              <Link to="/profile">{t('Account')}</Link>
              <Link to="*">404</Link>
            </div>
          </div>
        </div>

        <div className="navicons">
          <svg
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clipPath="url(#clip0_11518_1140)">
              <path
                d="M9.74062 0C15.1116 0 19.4812 4.36964 19.4812 9.74063C19.4812 12.1734 18.5847 14.4008 17.1047 16.1097L23.7941 22.7997C24.0687 23.0743 24.0686 23.5195 23.794 23.7941C23.5194 24.0687 23.0743 24.0686 22.7997 23.7941L16.1104 17.1041C14.4014 18.5845 12.1738 19.4813 9.74062 19.4813C4.36964 19.4813 0 15.1116 0 9.74063C0 4.36964 4.36964 0 9.74062 0ZM9.74062 18.075C14.3362 18.075 18.075 14.3362 18.075 9.74063C18.075 5.14505 14.3362 1.40625 9.74062 1.40625C5.14505 1.40625 1.40625 5.14505 1.40625 9.74063C1.40625 14.3362 5.14505 18.075 9.74062 18.075Z"
                fill="#19102D"
              />
            </g>
            <defs>
              <clipPath id="clip0_11518_1140">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                />
              </clipPath>
            </defs>
          </svg>
          <Link to="/profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 0C8.51067 0 5.67188 2.8388 5.67188 6.32812C5.67188 9.81745 8.51067 12.6562 12 12.6562C15.4893 12.6562 18.3281 9.81745 18.3281 6.32812C18.3281 2.8388 15.4893 0 12 0ZM12 11.25C9.28608 11.25 7.07812 9.04205 7.07812 6.32812C7.07812 3.6142 9.28608 1.40625 12 1.40625C14.7139 1.40625 16.9219 3.6142 16.9219 6.32812C16.9219 9.04205 14.7139 11.25 12 11.25Z"
                fill="#1E1F20"
              />
              <path
                d="M19.8734 16.7904C18.1409 15.0313 15.8442 14.0625 13.4062 14.0625H10.5938C8.15588 14.0625 5.85909 15.0313 4.12659 16.7904C2.40258 18.5409 1.45312 20.8515 1.45312 23.2969C1.45312 23.6852 1.76794 24 2.15625 24H21.8438C22.2321 24 22.5469 23.6852 22.5469 23.2969C22.5469 20.8515 21.5974 18.5409 19.8734 16.7904ZM2.89031 22.5938C3.24258 18.6053 6.56302 15.4688 10.5938 15.4688H13.4062C17.437 15.4688 20.7574 18.6053 21.1097 22.5938H2.89031Z"
                fill="#1E1F20"
              />
            </svg>
          </Link>

          <div className="cart-icon-wrapper">
            <Link to="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clipPath="url(#clip0_11694_2100)">
                  <path
                    d="M22.3627 21.4751C21.7765 17.3732 20.3465 7.36164 20.3465 7.36164C20.2969 7.01482 19.9999 6.75721 19.6495 6.75721H16.5833V4.44501C16.3576 -1.48394 7.85843 -1.47944 7.6349 4.44501V6.75721H4.56874C4.21839 6.75721 3.92141 7.01482 3.87185 7.36164C3.87185 7.36164 2.44178 17.3732 1.85556 21.4751C1.76475 22.1104 1.95388 22.7527 2.37434 23.2373C2.79481 23.722 3.40389 23.9999 4.04545 23.9999H20.1729C20.8144 23.9999 21.4234 23.722 21.8439 23.2373C22.2644 22.7527 22.4535 22.1104 22.3627 21.4751ZM15.1754 4.44501V6.75721H9.0429V4.44501C9.19754 0.381835 15.0221 0.384885 15.1754 4.44501ZM20.7804 22.3147C20.6275 22.4909 20.406 22.592 20.1729 22.592H4.04545C3.8122 22.592 3.59077 22.4909 3.43787 22.3147C3.28506 22.1386 3.21635 21.9051 3.24934 21.6742C3.74898 18.1785 4.86145 10.3904 5.17932 8.16517H7.63494V9.7233C7.66958 10.6564 9.00859 10.6557 9.0429 9.7233V8.16517H15.1754V9.7233C15.21 10.6564 16.549 10.6557 16.5833 9.7233V8.16517H19.039C19.3568 10.3904 20.4694 18.1785 20.9689 21.6742C21.0019 21.9051 20.9332 22.1386 20.7804 22.3147Z"
                    fill="#1E1F20"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_11694_2100">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0.109131)"
                    />
                  </clipPath>
                </defs>
              </svg>
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
          </div>
        </div>
      </div>
      <div className="header-spacer" />
      <div className={`search-overlay ${isSearchOpen ? 'open' : ''}`}>
        <span
          className="search-close"
          onClick={() => setIsSearchOpen(false)}
        >
          ✕
        </span>
        <h2>WHAT ARE YOU LOOKING FOR?</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for products ..."
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
                  fill="white"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-header">
          <span
            className="mobile-close"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Close ✕
          </span>
        </div>

        <div className="mobile-search">
          <input
            type="text"
            placeholder="Search"
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
                  fill="#ffffff"
                />
              </g>
            </svg>
          </button>
        </div>

        <Link
          to="/profile"
          className="mobile-login"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 0C8.51067 0 5.67188 2.8388 5.67188 6.32812C5.67188 9.81745 8.51067 12.6562 12 12.6562C15.4893 12.6562 18.3281 9.81745 18.3281 6.32812C18.3281 2.8388 15.4893 0 12 0ZM12 11.25C9.28608 11.25 7.07812 9.04205 7.07812 6.32812C7.07812 3.6142 9.28608 1.40625 12 1.40625C14.7139 1.40625 16.9219 3.6142 16.9219 6.32812C16.9219 9.04205 14.7139 11.25 12 11.25Z"
              fill="#1E1F20"
            />
            <path
              d="M19.8734 16.7904C18.1409 15.0313 15.8442 14.0625 13.4062 14.0625H10.5938C8.15588 14.0625 5.85909 15.0313 4.12659 16.7904C2.40258 18.5409 1.45312 20.8515 1.45312 23.2969C1.45312 23.6852 1.76794 24 2.15625 24H21.8438C22.2321 24 22.5469 23.6852 22.5469 23.2969C22.5469 20.8515 21.5974 18.5409 19.8734 16.7904ZM2.89031 22.5938C3.24258 18.6053 6.56302 15.4688 10.5938 15.4688H13.4062C17.437 15.4688 20.7574 18.6053 21.1097 22.5938H2.89031Z"
              fill="#1E1F20"
            />
          </svg>
          Login / Register
        </Link>

        <div className="mobile-nav-links">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('Home')}
          </Link>
          <Link
            to="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('Shop')} <span className="mobile-new-badge">New</span>
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('Pages')}
          </Link>
          <Link
            to="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('Blog')}
          </Link>
          <Link
            to="/wishlist"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('Wishlist')} ( {wishlistCount} )
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('ContactUs')}
          </Link>
        </div>

        <div className="mobile-bottom">
          <div className="mobile-lang-currency">
            <span
              onClick={() => {
                setIsOpen(!isOpen);
                setIsCurrencyOpen(false);
              }}
            >
              {language.lang} ▾
            </span>
            <span
              onClick={() => {
                setIsCurrencyOpen(!isCurrencyOpen);
                setIsOpen(false);
              }}
            >
              {currency.display} ▾
            </span>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

export default Header;
