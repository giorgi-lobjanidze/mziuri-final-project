import React, { useEffect, useState } from 'react';
import { useLoader } from '../context/LoaderContext';
import * as api from '../api/api.js';
import { useTranslation } from 'react-i18next';

function Contact() {
  const { t } = useTranslation();
  const { useFakeLoader } = useLoader();
  useEffect(() => {
    useFakeLoader();
  }, []);

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const globalStores = [
    {
      city: 'Paris, France',
      address: '45 Rue De Rivoli, 75001 Paris',
      phone: '+33 1 42 65 00 55',
      img: 'https://brew-blis.myshopify.com/cdn/shop/files/locations01.png?v=1737466799&width=2000',
    },
    {
      city: 'New York City, USA',
      address: '123 Fifth Avenue, New York, NY 10011',
      phone: '+1 (212) 555-0190',
      img: 'https://brew-blis.myshopify.com/cdn/shop/files/locations02.png?v=1737466799&width=2000',
    },
    {
      city: 'Madrid, Spain',
      address: 'Calle De Serrano, 112, 28006 Madrid',
      phone: '+34 91 555 1234',
      img: 'https://brew-blis.myshopify.com/cdn/shop/files/locations03.png?v=1737466799&width=2000',
    },
    {
      city: 'Madrid, Spain',
      address: 'Calle De Serrano, 112, 28006 Madrid',
      phone: '+34 91 555 1234',
      img: 'https://brew-blis.myshopify.com/cdn/shop/files/locations03.png?v=1737466799&width=2000',
    },
  ];

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone)) errs.phone = 'Invalid phone number';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 10)
      errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      const { data } = await api.contact(form);
      console.log('message sent:', form);
      setErrors({});
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Contact error:', err);
    }
  };

  return (
    <>
      <div className="shop-banner">
        <div className="icon">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564"
            alt=""
          />
        </div>
        <p>{t('Contact')}</p>
        <div className="icon">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611"
            alt=""
          />
        </div>
      </div>

      <div className="contact">
        {/* top cards */}
        <div className="contact-cards">
          <div className="contact-card">
            <div className="contact-card-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M16.2509 15.5304L15.8338 14.8339C15.0836 13.5971 14.0484 12.1776 12.6904 12.1776C12.4389 12.1776 12.1897 12.2282 11.9431 12.3307L11.2142 12.6432C11.1477 12.6708 11.083 12.7022 11.0145 12.7355C10.828 12.8262 10.6165 12.929 10.3989 12.929C9.86217 12.929 9.2403 12.2305 8.64811 10.9623C8.06692 9.71762 8.10399 9.06508 8.23741 8.73673C8.38462 8.37447 8.72695 8.21959 9.09471 8.08041C9.14585 8.06101 9.19204 8.04342 9.23696 8.02493L9.97501 7.71418C11.8978 6.9101 11.1825 4.10014 10.948 3.17889L10.7491 2.3868C10.579 1.734 10.1282 0 8.63277 0C8.35594 0 8.06061 0.064496 7.75527 0.191774C7.55492 0.271334 4.79792 1.39672 3.79909 3.37382C2.60532 5.72716 2.82605 8.88296 4.45451 12.7515C6.07079 16.625 8.16669 18.9942 10.684 19.7933C11.1158 19.9305 11.6038 19.9999 12.1346 19.9999H12.1349C13.8721 19.9999 15.587 19.2608 15.7262 19.1994C16.3251 18.9457 16.7123 18.5601 16.8768 18.0532C17.1557 17.1937 16.6878 16.2519 16.2509 15.5304ZM15.5897 17.6356C15.5514 17.7534 15.4185 17.8609 15.1948 17.9551C15.1911 17.9567 15.1866 17.9586 15.1828 17.9603C15.1673 17.9672 13.615 18.647 12.1345 18.6469C11.7428 18.6469 11.3926 18.5988 11.0935 18.5037C8.97266 17.8305 7.1592 15.72 5.70231 12.2286C4.23459 8.7416 4.00006 5.96837 5.0062 3.98495C5.78746 2.43858 8.23335 1.45761 8.25734 1.44823C8.26221 1.44625 8.26699 1.44435 8.27177 1.44237C8.41105 1.38391 8.53589 1.35306 8.63277 1.35306C8.9309 1.35306 9.20223 1.81545 9.43803 2.72173L9.63602 3.51048C10.0632 5.18828 9.99819 6.23772 9.45129 6.46647L8.71675 6.77587C8.68753 6.78796 8.65334 6.80068 8.61563 6.81502C8.20989 6.96864 7.36558 7.28814 6.98375 8.22735C6.63727 9.0796 6.7807 10.1615 7.42178 11.535C8.28521 13.3835 9.25897 14.2821 10.3987 14.2821C10.9277 14.2821 11.3523 14.0757 11.6059 13.9525C11.6526 13.9298 11.6944 13.909 11.7393 13.8904L12.4693 13.5774C12.5446 13.546 12.6169 13.5307 12.6903 13.5307C13.0417 13.5307 13.6717 13.8786 14.6749 15.5325L15.0918 16.2285C15.6055 17.0767 15.6461 17.4618 15.5897 17.6356Z"
                  fill="#EAEAEC"
                ></path>
              </svg>
            </div>
            <h3>{t('CustomerService')}</h3>
            <p>+31 42 65 00 55</p>
            <p style={{ color: '#666' }}>{t('CallUsFromTo')}</p>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clipPath="url(#clip0_12004_1578)">
                  <path
                    d="M17.3694 0.760803H3.0759C1.50258 0.760803 0.222656 2.04076 0.222656 3.61405V13.261C0.222656 14.8342 1.50258 16.1142 3.0759 16.1142H4.19555L4.21746 18.6331C4.21941 18.8652 4.35273 19.0762 4.56156 19.1777C4.64645 19.2189 4.73781 19.2392 4.82875 19.2392C4.96152 19.2392 5.09332 19.196 5.20238 19.1118L9.08617 16.1142H17.3694C18.9427 16.1142 20.2227 14.8342 20.2227 13.261V3.61405C20.2227 2.04076 18.9427 0.760803 17.3694 0.760803ZM18.9998 13.261C18.9998 14.16 18.2684 14.8914 17.3694 14.8914H8.8777C8.74254 14.8914 8.61117 14.9362 8.50414 15.0188L5.42949 17.3919L5.41301 15.4975C5.41012 15.1619 5.13723 14.8914 4.80164 14.8914H3.0759C2.17687 14.8914 1.44547 14.16 1.44547 13.261V3.61405C1.44547 2.71502 2.17687 1.98362 3.0759 1.98362H17.3695C18.2685 1.98362 18.9999 2.71502 18.9999 3.61405L18.9998 13.261Z"
                    fill="#EAEAEC"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_12004_1578">
                    <rect
                      width="20"
                      height="20"
                      fill="white"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h3>{t('LiveChat')}</h3>
            <p>
              <span className="live-dot"></span> {t('LiveChatAvailable')}
            </p>
            <p style={{ color: '#666' }}>{t('Daily')}</p>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M18.2422 2.96875H1.75781C0.786602 2.96875 0 3.76023 0 4.72656V15.2734C0 16.2455 0.792383 17.0312 1.75781 17.0312H18.2422C19.2053 17.0312 20 16.2488 20 15.2734V4.72656C20 3.76195 19.2165 2.96875 18.2422 2.96875ZM17.996 4.14062C17.6369 4.49785 11.4564 10.6458 11.243 10.8581C10.9109 11.1901 10.4695 11.3729 10 11.3729C9.53047 11.3729 9.08906 11.1901 8.75594 10.857C8.61242 10.7142 2.50012 4.63414 2.00398 4.14062H17.996ZM1.17188 15.0349V4.96582L6.23586 10.0031L1.17188 15.0349ZM2.00473 15.8594L7.06672 10.8296L7.9284 11.6867C8.48176 12.2401 9.21746 12.5448 10 12.5448C10.7825 12.5448 11.5182 12.2401 12.0705 11.6878L12.9333 10.8296L17.9953 15.8594H2.00473ZM18.8281 15.0349L13.7641 10.0031L18.8281 4.96582V15.0349Z"
                  fill="#EAEAEC"
                ></path>
              </svg>
            </div>
            <h3>{t('WriteToUs')}</h3>
            <p>Uiparadox99@Gmail.Com</p>
            <p style={{ color: '#666' }}>{t('AnyTime')}</p>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10 0C7.09223 0 4.72656 2.36566 4.72656 5.27344C4.72656 8.18121 7.09223 10.5469 10 10.5469C12.9078 10.5469 15.2734 8.18121 15.2734 5.27344C15.2734 2.36566 12.9078 0 10 0ZM10 9.375C7.7384 9.375 5.89844 7.53504 5.89844 5.27344C5.89844 3.01184 7.7384 1.17188 10 1.17188C12.2616 1.17188 14.1016 3.01184 14.1016 5.27344C14.1016 7.53504 12.2616 9.375 10 9.375Z"
                  fill="#EAEAEC"
                ></path>
                <path
                  d="M16.5612 13.992C15.1174 12.5261 13.2035 11.7188 11.1719 11.7188H8.82812C6.79656 11.7188 4.88258 12.5261 3.43883 13.992C2.00215 15.4507 1.21094 17.3763 1.21094 19.4141C1.21094 19.7377 1.47328 20 1.79688 20H18.2031C18.5267 20 18.7891 19.7377 18.7891 19.4141C18.7891 17.3763 17.9979 15.4507 16.5612 13.992ZM2.40859 18.8281C2.70215 15.5045 5.46918 12.8906 8.82812 12.8906H11.1719C14.5308 12.8906 17.2979 15.5045 17.5914 18.8281H2.40859Z"
                  fill="#EAEAEC"
                ></path>
              </svg>
            </div>
            <h3>{t('FollowUs')}</h3>
            <div className="contact-socials">
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                  />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1.5"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* get in touch */}
        <div className="contact-body">
          <div className="contact-form-section">
            <h2>
              <img
                src="//brew-blis.myshopify.com/cdn/shop/files/vector1.png?v=1736771826"
                alt=""
              />
              {t('GetInTouch')}
              <img
                src="//brew-blis.myshopify.com/cdn/shop/files/vector2.png?v=1736775115"
                alt=""
              />
            </h2>
            <p className="contact-hours">{t('OpenHours')}</p>

            {success && <p className="contact-success">{t('MessageSuccessfull')}!</p>}

            <form
              onSubmit={handleSubmit}
              className="contact-form"
              noValidate
            >
              <div className="contact-field">
                <div className={`contact-input-wrapper ${errors.name ? 'error' : ''}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_22210_1147)">
                      <path
                        d="M10 0.5C7.09223 0.5 4.72656 2.86566 4.72656 5.77344C4.72656 8.68121 7.09223 11.0469 10 11.0469C12.9078 11.0469 15.2734 8.68121 15.2734 5.77344C15.2734 2.86566 12.9078 0.5 10 0.5ZM10 9.875C7.7384 9.875 5.89844 8.03504 5.89844 5.77344C5.89844 3.51184 7.7384 1.67188 10 1.67188C12.2616 1.67188 14.1016 3.51184 14.1016 5.77344C14.1016 8.03504 12.2616 9.875 10 9.875Z"
                        fill="#45474F"
                      ></path>
                      <path
                        d="M16.5612 14.492C15.1174 13.0261 13.2035 12.2188 11.1719 12.2188H8.82812C6.79656 12.2188 4.88258 13.0261 3.43883 14.492C2.00215 15.9507 1.21094 17.8763 1.21094 19.9141C1.21094 20.2377 1.47328 20.5 1.79688 20.5H18.2031C18.5267 20.5 18.7891 20.2377 18.7891 19.9141C18.7891 17.8763 17.9979 15.9507 16.5612 14.492ZM2.40859 19.3281C2.70215 16.0045 5.46918 13.3906 8.82812 13.3906H11.1719C14.5308 13.3906 17.2979 16.0045 17.5914 19.3281H2.40859Z"
                        fill="#45474F"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_22210_1147">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(0 0.5)"
                        ></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && <p className="contact-error">{errors.name}</p>}
              </div>

              <div className="contact-field">
                <div className={`contact-input-wrapper ${errors.email ? 'error' : ''}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <path
                      d="M18.2422 3.46875H1.75781C0.786602 3.46875 0 4.26023 0 5.22656V15.7734C0 16.7455 0.792383 17.5312 1.75781 17.5312H18.2422C19.2053 17.5312 20 16.7488 20 15.7734V5.22656C20 4.26195 19.2165 3.46875 18.2422 3.46875ZM17.996 4.64062C17.6369 4.99785 11.4564 11.1458 11.243 11.3581C10.9109 11.6901 10.4695 11.8729 10 11.8729C9.53047 11.8729 9.08906 11.6901 8.75594 11.357C8.61242 11.2142 2.50012 5.13414 2.00398 4.64062H17.996ZM1.17188 15.5349V5.46582L6.23586 10.5031L1.17188 15.5349ZM2.00473 16.3594L7.06672 11.3296L7.9284 12.1867C8.48176 12.7401 9.21746 13.0448 10 13.0448C10.7825 13.0448 11.5182 12.7401 12.0705 12.1878L12.9333 11.3296L17.9953 16.3594H2.00473ZM18.8281 15.5349L13.7641 10.5031L18.8281 5.46582V15.5349Z"
                      fill="#45474F"
                    ></path>
                  </svg>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <p className="contact-error">{errors.email}</p>}
              </div>

              <div className="contact-field">
                <div className={`contact-input-wrapper ${errors.phone ? 'error' : ''}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_22210_1150)">
                      <path
                        d="M16.2489 16.0304L15.8318 15.3339C15.0817 14.0971 14.0464 12.6776 12.6885 12.6776C12.4369 12.6776 12.1878 12.7282 11.9411 12.8307L11.2123 13.1432C11.1457 13.1708 11.081 13.2022 11.0126 13.2355C10.826 13.3262 10.6145 13.429 10.3969 13.429C9.86021 13.429 9.23834 12.7305 8.64615 11.4623C8.06497 10.2176 8.10204 9.56508 8.23545 9.23673C8.38267 8.87447 8.72499 8.71959 9.09276 8.58041C9.1439 8.56101 9.19009 8.54342 9.23501 8.52493L9.97306 8.21418C11.8959 7.4101 11.1805 4.60014 10.946 3.67889L10.7471 2.8868C10.5771 2.234 10.1262 0.5 8.63082 0.5C8.35398 0.5 8.05865 0.564496 7.75331 0.691774C7.55297 0.771334 4.79597 1.89672 3.79713 3.87382C2.60337 6.22716 2.8241 9.38296 4.45256 13.2515C6.06884 17.125 8.16473 19.4942 10.6821 20.2933C11.1139 20.4305 11.6019 20.4999 12.1326 20.4999H12.1329C13.8702 20.4999 15.585 19.7608 15.7242 19.6994C16.3232 19.4457 16.7103 19.0601 16.8749 18.5532C17.1538 17.6937 16.6859 16.7519 16.2489 16.0304ZM15.5877 18.1356C15.5495 18.2534 15.4165 18.3609 15.1928 18.4551C15.1891 18.4567 15.1846 18.4586 15.1808 18.4603C15.1653 18.4672 13.6131 19.147 12.1326 19.1469C11.7409 19.1469 11.3906 19.0988 11.0915 19.0037C8.97071 18.3305 7.15724 16.22 5.70035 12.7286C4.23264 9.2416 3.99811 6.46837 5.00425 4.48495C5.78551 2.93858 8.23139 1.95761 8.25539 1.94823C8.26026 1.94625 8.26504 1.94435 8.26982 1.94237C8.4091 1.88391 8.53394 1.85306 8.63082 1.85306C8.92894 1.85306 9.20028 2.31545 9.43607 3.22173L9.63407 4.01048C10.0613 5.68828 9.99624 6.73772 9.44933 6.96647L8.7148 7.27587C8.68557 7.28796 8.65139 7.30068 8.61368 7.31502C8.20794 7.46864 7.36363 7.78814 6.9818 8.72735C6.63532 9.5796 6.77874 10.6615 7.41983 12.035C8.28326 13.8835 9.25702 14.7821 10.3967 14.7821C10.9257 14.7821 11.3503 14.5757 11.604 14.4525C11.6507 14.4298 11.6924 14.409 11.7374 14.3904L12.4673 14.0774C12.5426 14.046 12.615 14.0307 12.6884 14.0307C13.0397 14.0307 13.6697 14.3786 14.673 16.0325L15.0898 16.7285C15.6035 17.5767 15.6441 17.9618 15.5877 18.1356Z"
                        fill="#45474F"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_22210_1150">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(0 0.5)"
                        ></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                {errors.phone && <p className="contact-error">{errors.phone}</p>}
              </div>

              <div className="contact-field">
                <div
                  className={`contact-input-wrapper textarea-wrapper ${
                    errors.message ? 'error' : ''
                  }`}
                >
                  <textarea
                    name="message"
                    placeholder="Write your message..."
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                  />
                </div>
                {errors.message && <p className="contact-error">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="primary-btn"
              >
                {t('SendMessage')}
              </button>
            </form>
          </div>

          <div className="contact-map">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.945509544357!2d-122.0612759!3d37.3911209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7227e1ef8ff%3A0x1cbb80d811f16025!2zQmV2ZXJseSBTdCwgTW91bnRhaW4gVmlldywgQ0EgOTQwNDMsIOGDkOGDm-GDlOGDoOGDmOGDmeGDmOGDoSDhg6jhg5Thg5Thg6Dhg5fhg5Thg5Hhg6Phg5rhg5gg4YOo4YOi4YOQ4YOi4YOU4YOR4YOY!5e0!3m2!1ska!2sge!4v1780758509750!5m2!1ska!2sge"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>

        {/* stores around the world */}
        <div className="contact-stores">
          <div className="contact-stores-header">
            <h2>
              <img
                src="//brew-blis.myshopify.com/cdn/shop/files/vector1.png?v=1736771826"
                alt=""
              />
              {t('StoresAroundTheWorld')}
              <img
                src="//brew-blis.myshopify.com/cdn/shop/files/vector2.png?v=1736775115"
                alt=""
              />
            </h2>
            <p>{t('ExploreCuratedSelection')}</p>
          </div>

          <div className="contact-stores-grid">
            {globalStores.map((store, i) => (
              <div
                key={i}
                className="contact-store-card"
              >
                <div className="contact-store-img">
                  <img
                    src={store.img}
                    alt={store.city}
                  />
                </div>
                <h4>{store.city}</h4>
                <p>{store.address}</p>
                <div className="contact-store-phone">
                  <div className="contact-store-phone-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M16.2509 15.5304L15.8338 14.8339C15.0836 13.5971 14.0484 12.1776 12.6904 12.1776C12.4389 12.1776 12.1897 12.2282 11.9431 12.3307L11.2142 12.6432C11.1477 12.6708 11.083 12.7022 11.0145 12.7355C10.828 12.8262 10.6165 12.929 10.3989 12.929C9.86217 12.929 9.2403 12.2305 8.64811 10.9623C8.06692 9.71762 8.10399 9.06508 8.23741 8.73673C8.38462 8.37447 8.72695 8.21959 9.09471 8.08041C9.14585 8.06101 9.19204 8.04342 9.23696 8.02493L9.97501 7.71418C11.8978 6.9101 11.1825 4.10014 10.948 3.17889L10.7491 2.3868C10.579 1.734 10.1282 0 8.63277 0C8.35594 0 8.06061 0.064496 7.75527 0.191774C7.55492 0.271334 4.79792 1.39672 3.79909 3.37382C2.60532 5.72716 2.82605 8.88296 4.45451 12.7515C6.07079 16.625 8.16669 18.9942 10.684 19.7933C11.1158 19.9305 11.6038 19.9999 12.1346 19.9999H12.1349C13.8721 19.9999 15.587 19.2608 15.7262 19.1994C16.3251 18.9457 16.7123 18.5601 16.8768 18.0532C17.1557 17.1937 16.6878 16.2519 16.2509 15.5304ZM15.5897 17.6356C15.5514 17.7534 15.4185 17.8609 15.1948 17.9551C15.1911 17.9567 15.1866 17.9586 15.1828 17.9603C15.1673 17.9672 13.615 18.647 12.1345 18.6469C11.7428 18.6469 11.3926 18.5988 11.0935 18.5037C8.97266 17.8305 7.1592 15.72 5.70231 12.2286C4.23459 8.7416 4.00006 5.96837 5.0062 3.98495C5.78746 2.43858 8.23335 1.45761 8.25734 1.44823C8.26221 1.44625 8.26699 1.44435 8.27177 1.44237C8.41105 1.38391 8.53589 1.35306 8.63277 1.35306C8.9309 1.35306 9.20223 1.81545 9.43803 2.72173L9.63602 3.51048C10.0632 5.18828 9.99819 6.23772 9.45129 6.46647L8.71675 6.77587C8.68753 6.78796 8.65334 6.80068 8.61563 6.81502C8.20989 6.96864 7.36558 7.28814 6.98375 8.22735C6.63727 9.0796 6.7807 10.1615 7.42178 11.535C8.28521 13.3835 9.25897 14.2821 10.3987 14.2821C10.9277 14.2821 11.3523 14.0757 11.6059 13.9525C11.6526 13.9298 11.6944 13.909 11.7393 13.8904L12.4693 13.5774C12.5446 13.546 12.6169 13.5307 12.6903 13.5307C13.0417 13.5307 13.6717 13.8786 14.6749 15.5325L15.0918 16.2285C15.6055 17.0767 15.6461 17.4618 15.5897 17.6356Z"
                        fill="black"
                      ></path>
                    </svg>
                  </div>
                  <span>{store.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
