import React from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Reviews() {
  const { t } = useTranslation();
  const reviews = [
    {
      img: 'https://brew-blis.myshopify.com/cdn/shop/files/testimonials01.png?v=1737369243&width=3000',
      text: 'Exceptional wines and great service! Every bottle exceeded my expectations.',
      name: 'Olivia Wilson',
    },
    {
      img: 'https://brew-blis.myshopify.com/cdn/shop/files/testimonials02.png?v=1737369243&width=3000',
      text: 'An unforgettable experience. The wine selection is top-notch, and the delivery was prompt.',
      name: 'Jason K. Manato',
    },
    {
      img: 'https://brew-blis.myshopify.com/cdn/shop/files/testimonials01.png?v=1737369243&width=3000',
      text: 'I’m a repeat customer – always impressed by the quality and care in every order!',
      name: 'Marlowe Cruz',
    },
    {
      img: 'https://brew-blis.myshopify.com/cdn/shop/files/testimonials02.png?v=1737369243&width=3000',
      text: 'I’ve seen incredible results since using Tangine supplements. I’ve gained muscle, and my energy levels are through the roof. Highly recommend to anyone serious about fitness.',
      name: 'Evangeline',
    },
    {
      img: 'https://brew-blis.myshopify.com/cdn/shop/files/testimonials01.png?v=1737369243&width=3000',
      text: 'I’ve seen incredible results since using Tangine supplements. I’ve gained muscle, and my energy levels are through the roof. Highly recommend to anyone serious about fitness.',
      name: 'Penelope',
    },
    {
      img: 'https://brew-blis.myshopify.com/cdn/shop/files/testimonials02.png?v=1737369243&width=3000',
      text: 'I’ve seen incredible results since using Tangine supplements. I’ve gained muscle, and my energy levels are through the roof. Highly recommend to anyone serious about fitness.',
      name: 'Marlowe Cruz',
    },
    {
      img: 'https://brew-blis.myshopify.com/cdn/shop/files/testimonials01.png?v=1737369243&width=3000',
      text: 'Exceptional wines and great service! Every bottle exceeded my expectations.',
      name: 'Olivia Wilson',
    },
    {
      img: 'https://brew-blis.myshopify.com/cdn/shop/files/testimonials02.png?v=1737369243&width=3000',
      text: 'An unforgettable experience. The wine selection is top-notch, and the delivery was prompt.',
      name: 'Jason K. Manato',
    },
  ];

  const reviewSliderSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    speed: 500,
    infinite: false,
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
    <div className="about-reviews">
      <div className="about-reviews-header">
        <img
          src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564"
          alt=""
        />
        <h2>{t('RavingReviews')}</h2>
        <img
          src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611"
          alt=""
        />
      </div>
      <p className="about-reviews-sub">{t('TeamSub')}</p>

      <Slider {...reviewSliderSettings}>
        {reviews.map((review, i) => (
          <div
            className="about-review-card-wrapper"
            key={i}
          >
            <div className="about-review-card">
              <div className="about-review-top">
                <img
                  src={review.img}
                  alt={review.name}
                />
                <span className="about-review-quote">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="32"
                    viewBox="0 0 38 32"
                    fill="none"
                  >
                    <path
                      d="M25.8837 0L33.2016 32H37.6667V0H25.8837ZM0.581421 0L8.02328 32H12.3644V0H0.581421Z"
                      fill="#CCCCCC"
                    />
                  </svg>
                </span>
              </div>
              <p className="about-review-text">{review.text}</p>
              <div className="about-review-stars">★★★★★</div>
              <p className="about-review-name">{review.name}</p>
              <p className="about-review-role">Customer</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Reviews;
