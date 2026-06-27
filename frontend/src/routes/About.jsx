import React, { useEffect, useRef, useState } from 'react';
import { useLoader } from '../context/LoaderContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function About() {
  const { useFakeLoader } = useLoader();
  useEffect(() => {
    useFakeLoader();
  }, [useFakeLoader]);

  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  const isPausedRef = useRef(false);

  const team = [
    { img: 'https://brew-blis.myshopify.com/cdn/shop/files/team01.png?v=1737460608&width=3000', name: 'Emily Johnson', position: 'Founder/CEO' },
    { img: 'https://brew-blis.myshopify.com/cdn/shop/files/team02.png?v=1737460608&width=3000', name: 'Michael Brown', position: 'Customer Service Manager' },
    { img: 'https://brew-blis.myshopify.com/cdn/shop/files/team03.png?v=1737460609&width=3000', name: 'Sarah Davis', position: 'Marketing Specialist' },
    { img: 'https://brew-blis.myshopify.com/cdn/shop/files/team04.png?v=1737460609&width=3000', name: 'Sophia Martinez', position: 'Art Curator' },
  ];

  const infCarousel = [
    { img: '//brew-blis.myshopify.com/cdn/shop/files/brand04.png?v=1737181955' },
    { img: '//brew-blis.myshopify.com/cdn/shop/files/brand05.png?v=1737181955' },
    { img: '//brew-blis.myshopify.com/cdn/shop/files/brand01.png?v=1737181955' },
    { img: '//brew-blis.myshopify.com/cdn/shop/files/brand02.png?v=1737181955' },
    { img: '//brew-blis.myshopify.com/cdn/shop/files/brand03.png?v=1737181955' },
  ];

  const items = [...infCarousel, ...infCarousel, ...infCarousel];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const step = () => {
      if (isPausedRef.current) return;

      const itemWidth = carousel.scrollWidth / items.length;
      const totalOriginalWidth = itemWidth * infCarousel.length;

      positionRef.current += itemWidth;
      if (positionRef.current >= totalOriginalWidth * 2) {
        positionRef.current = totalOriginalWidth;
      }

      carousel.style.transition = 'transform 0.5s ease';
      carousel.style.transform = `translateX(-${positionRef.current}px)`;
    };

    animationRef.current = setInterval(step, 2000);

    return () => clearInterval(animationRef.current);
  }, []);

  const handleMouseEnter = () => { isPausedRef.current = true; };
  const handleMouseLeave = () => { isPausedRef.current = false; };

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

  
  return (
    <>
      <div className="shop-banner">
        <div className="icon"><img src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564" alt="" /></div>
        <p>About Us</p>
        <div className="icon"><img src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611" alt="" /></div>
      </div>

      <div className="about">
        <div className="about-intro">
          <div className="our-story">
            <div className="icon"><img src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564" alt="" /></div>
            <p>Our Story</p>
            <div className="icon"><img src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611" alt="" /></div>
          </div>
          <h2>welcome to <span>brew bliss,</span> your ultimate destination for fresh flavors <br /> and delightful sips. we're passionate about delivering premium <br /> food and beverages to satisfy every craving, anytime, anywhere!</h2>
          <img src='//brew-blis.myshopify.com/cdn/shop/files/about-hero.png?v=1737455564' alt='Brew Bliss' />
        </div>

        <div className="about-features">
          <div className="about-feature-card">
            <div className="about-feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
              >
                <g clip-path="url(#clip0_12320_8)">
                  <path
                    d="M12.2246 26H12.2241C11.8099 26 11.4743 26.3358 11.4743 26.75C11.4743 27.1641 11.8104 27.5 12.2246 27.5C12.6388 27.5 12.9746 27.1641 12.9746 26.75C12.9746 26.3358 12.6388 26 12.2246 26Z"
                    fill="black"
                  ></path>
                  <path
                    d="M31.1253 26H31.1247C30.7105 26 30.375 26.3358 30.375 26.75C30.375 27.1641 30.7111 27.5 31.1253 27.5C31.5395 27.5 31.8753 27.1641 31.8753 26.75C31.8753 26.3358 31.5395 26 31.1253 26Z"
                    fill="black"
                  ></path>
                  <path
                    d="M37.1247 17H36.8285L34.4392 11.4533C34.3207 11.1782 34.0499 11 33.7504 11H28.1251V9.5C28.1251 9.08585 27.7893 8.75 27.3751 8.75H6.22482C5.83475 8.75 5.50978 9.04895 5.47745 9.43775L5.23003 12.4063H2.84961C2.43538 12.4063 2.09961 12.7422 2.09961 13.1563C2.09961 13.5705 2.43538 13.9063 2.84961 13.9063H5.105L4.9253 16.0626H3.9746C3.56038 16.0626 3.2246 16.3984 3.2246 16.8126C3.2246 17.2267 3.56038 17.5626 3.9746 17.5626H4.80035L4.62065 19.7187H1.72461C1.31038 19.7187 0.974609 20.0546 0.974609 20.4687C0.974609 20.8829 1.31038 21.2187 1.72461 21.2187H4.49563L3.97738 27.4377C3.95998 27.6467 4.03085 27.8534 4.17283 28.0079C4.31488 28.1622 4.51498 28.25 4.72475 28.25H7.9814C8.60052 29.9961 10.2687 31.25 12.2244 31.25C14.18 31.25 15.8482 29.9961 16.4673 28.25H26.8821C27.5012 29.9961 29.1695 31.25 31.1251 31.25C33.0807 31.25 34.7489 29.9961 35.368 28.25H38.6247C39.0389 28.25 39.3747 27.9142 39.3747 27.5V19.2501C39.3746 17.9673 38.4073 17 37.1247 17ZM31.5007 12.5H33.2569L35.1953 17H31.5007V12.5ZM6.90627 19.7187H6.12582L6.30552 17.5626H12.1563C12.5705 17.5626 12.9063 17.2267 12.9063 16.8126C12.9063 16.3984 12.5705 16.0626 12.1563 16.0626H6.43055L6.61025 13.9063H8.78127C9.19549 13.9063 9.53127 13.5705 9.53127 13.1563C9.53127 12.7422 9.19549 12.4063 8.78127 12.4063H6.7352L6.9149 10.25H26.6251V23.375H15.1977C14.4043 22.6751 13.363 22.25 12.2244 22.25C11.0857 22.25 10.0444 22.6751 9.25099 23.375H5.82118L6.00087 21.2187H6.90627C7.3205 21.2187 7.65627 20.8829 7.65627 20.4687C7.65627 20.0546 7.3205 19.7187 6.90627 19.7187ZM5.53993 26.75L5.69615 24.875H8.1338C7.871 25.4461 7.72437 26.0812 7.72437 26.75H5.53993ZM12.2244 29.75C10.5702 29.75 9.22437 28.4042 9.22437 26.75C9.22437 25.0958 10.5702 23.75 12.2244 23.75C13.8786 23.75 15.2244 25.0958 15.2244 26.75C15.2244 28.4042 13.8786 29.75 12.2244 29.75ZM16.7244 26.75C16.7244 26.0812 16.5777 25.4461 16.3149 24.875H27.0345C26.7717 25.4461 26.6251 26.0812 26.6251 26.75H16.7244ZM31.125 29.75C29.4708 29.75 28.125 28.4042 28.125 26.75C28.125 25.0958 29.4708 23.75 31.125 23.75C32.7792 23.75 34.125 25.0958 34.125 26.75C34.125 28.4042 32.7792 29.75 31.125 29.75ZM37.8746 26.75H35.625C35.625 26.0812 35.4784 25.4461 35.2156 24.875H37.8747V26.75H37.8746ZM37.8746 23.375H34.0984C33.3049 22.6751 32.2636 22.25 31.125 22.25C29.9864 22.25 28.9451 22.6751 28.1516 23.375H28.1251V12.5H30.0006V17.75C30.0006 18.1641 30.3364 18.5 30.7506 18.5H37.1246C37.5872 18.5 37.8746 18.7874 37.8746 19.25V23.375Z"
                    fill="black"
                  ></path>
                  <path
                    d="M15.6846 13.1562C15.6846 12.7421 15.3488 12.4062 14.9346 12.4062H12.1563C11.742 12.4062 11.4063 12.7421 11.4063 13.1562C11.4063 13.5704 11.742 13.9062 12.1563 13.9062H14.9346C15.3488 13.9062 15.6846 13.5704 15.6846 13.1562Z"
                    fill="black"
                  ></path>
                  <path
                    d="M11.4063 10.25C11.4063 9.83581 11.0705 9.5 10.6563 9.5H8.78127C8.36704 9.5 8.03127 9.83581 8.03127 10.25C8.03127 10.6642 8.36704 11 8.78127 11H10.6563C11.0705 11 11.4063 10.6642 11.4063 10.25Z"
                    fill="black"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_12320_8">
                    <rect
                      width="40"
                      height="40"
                      fill="white"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h4>Free Shipping</h4>
            <p>Free Shipping On Every Item, Delivered To Your Door, Elevate Your Space With...</p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
              >
                <g clip-path="url(#clip0_12320_997)">
                  <path
                    d="M36.6663 10H31.8974C32.6348 9.02 33.0725 7.80242 33.0725 6.48438C33.0725 3.25352 30.444 0.625 27.2131 0.625C25.267 0.625 23.8319 1.32227 22.6968 2.8193C21.7472 4.0718 21.0528 5.82055 20.1819 8.03008C19.3109 5.82047 18.6166 4.0718 17.667 2.8193C16.5319 1.32227 15.0968 0.625 13.1506 0.625C9.91978 0.625 7.29126 3.25352 7.29126 6.48438C7.29126 7.80242 7.72899 9.02 8.46634 10H3.69751C1.75899 10 0.181885 11.5771 0.181885 13.5156V15.8594C0.181885 17.3871 1.16165 18.6897 2.52563 19.1734V37.1094C2.52563 39.0479 4.10274 40.625 6.04126 40.625H34.3225C36.261 40.625 37.8381 39.0479 37.8381 37.1094V19.1734C39.2021 18.6897 40.1819 17.3871 40.1819 15.8594V13.5156C40.1819 11.5771 38.6048 10 36.6663 10ZM22.333 8.96406C24.1282 4.40953 24.8107 2.96875 27.2131 2.96875C29.1517 2.96875 30.7288 4.54586 30.7288 6.48438C30.7288 8.42289 29.1517 10 27.2131 10H21.9231C22.0666 9.63945 22.2036 9.29234 22.333 8.96406ZM13.1506 2.96875C15.5531 2.96875 16.2356 4.40953 18.0308 8.96406C18.1602 9.29234 18.2971 9.63945 18.4407 10H13.1506C11.2121 10 9.63501 8.42289 9.63501 6.48438C9.63501 4.54586 11.2121 2.96875 13.1506 2.96875ZM15.4944 38.2812H6.04126C5.39509 38.2812 4.86938 37.7555 4.86938 37.1094V19.375H15.4944V38.2812ZM15.4944 17.0312H3.69751C3.05134 17.0312 2.52563 16.5055 2.52563 15.8594V13.5156C2.52563 12.8695 3.05134 12.3438 3.69751 12.3438H15.4944V17.0312ZM22.5256 38.2812H17.8381V12.3438C18.0837 12.3438 21.1788 12.3438 22.5256 12.3438V38.2812ZM35.4944 37.1094C35.4944 37.7555 34.9687 38.2812 34.3225 38.2812H24.8694V19.375H35.4944V37.1094ZM37.8381 15.8594C37.8381 16.5055 37.3124 17.0312 36.6663 17.0312H24.8694V12.3438H36.6663C37.3124 12.3438 37.8381 12.8695 37.8381 13.5156V15.8594Z"
                    fill="black"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_12320_997">
                    <rect
                      width="40"
                      height="40"
                      fill="white"
                      transform="translate(0.181885 0.625)"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h4>Gift Package</h4>
            <p>Gifts That Leave A Lasting Impression, Beautifully Wrapped In Style For Every...</p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
              >
                <g clip-path="url(#clip0_12320_220)">
                  <path
                    d="M20.182 40C18.1926 40 16.3222 39.2252 14.9155 37.8185C13.9515 36.8545 12.6697 36.3236 11.3062 36.3236C7.19945 36.3236 3.85835 32.9824 3.85835 28.8756C3.85835 27.5123 3.32742 26.2305 2.36335 25.2665C-0.540552 22.3625 -0.540552 17.6375 2.36335 14.7335C3.32742 13.7695 3.85835 12.4877 3.85835 11.1244C3.85835 7.01758 7.19953 3.67641 11.3062 3.67641C12.6697 3.67641 13.9514 3.14547 14.9155 2.18148C16.3222 0.774766 18.1926 0 20.182 0C22.1713 0 24.0417 0.774766 25.4484 2.18148C26.4124 3.14547 27.6942 3.67641 29.0577 3.67641C33.1645 3.67641 36.5055 7.01758 36.5055 11.1244C36.5055 12.4877 37.0365 13.7695 38.0005 14.7335C40.9045 17.6375 40.9045 22.3625 38.0005 25.2665C37.0365 26.2305 36.5055 27.5123 36.5055 28.8756C36.5055 32.9824 33.1644 36.3236 29.0577 36.3236C27.6942 36.3236 26.4125 36.8545 25.4484 37.8185C24.0417 39.2252 22.1713 40 20.182 40ZM20.182 2.34617C18.8749 2.34617 17.5678 2.84367 16.5727 3.83867C15.1661 5.24539 13.2957 6.02008 11.3062 6.02008C8.49179 6.02008 6.2021 8.30984 6.2021 11.1243C6.2021 13.1137 5.42734 14.984 4.02062 16.3907C2.03054 18.3809 2.03054 21.6191 4.02062 23.6091C5.42734 25.0159 6.20203 26.8862 6.20203 28.8755C6.20203 31.69 8.49171 33.9798 11.3062 33.9798C13.2956 33.9798 15.166 34.7545 16.5727 36.1612C18.5628 38.1513 21.8009 38.1513 23.7911 36.1612C25.1977 34.7545 27.0681 33.9798 29.0576 33.9798C31.872 33.9798 34.1617 31.69 34.1617 28.8755C34.1617 26.8862 34.9365 25.0159 36.3432 23.6091C38.3333 21.619 38.3333 18.3808 36.3432 16.3907C34.9365 14.984 34.1618 13.1137 34.1618 11.1243C34.1618 8.30984 31.8721 6.02008 29.0577 6.02008C27.0682 6.02008 25.1978 5.24539 23.7912 3.83867C22.7961 2.84367 21.489 2.34617 20.182 2.34617Z"
                    fill="black"
                  ></path>
                  <path
                    d="M20.1819 31.7969C13.677 31.7969 8.38501 26.5048 8.38501 20C8.38501 13.4952 13.677 8.20312 20.1819 8.20312C26.6867 8.20312 31.9788 13.4952 31.9788 20C31.9788 26.5048 26.6867 31.7969 20.1819 31.7969ZM20.1819 10.5469C14.9694 10.5469 10.7288 14.7875 10.7288 20C10.7288 25.2125 14.9694 29.4531 20.1819 29.4531C25.3944 29.4531 29.635 25.2125 29.635 20C29.635 14.7875 25.3944 10.5469 20.1819 10.5469Z"
                    fill="black"
                  ></path>
                  <path
                    d="M18.5247 25.1788L13.9672 20.6213L15.6244 18.964L18.5247 21.8643L24.7394 15.6494L26.3967 17.3067L18.5247 25.1788Z"
                    fill="black"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_12320_220">
                    <rect
                      width="40"
                      height="40"
                      fill="white"
                      transform="translate(0.181885)"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h4>One Year Warranty</h4>
            <p>Shop With Confidence, Our One-Year Warranty Backs Every Jewelry Piece, Crafte...</p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
              >
                <g clip-path="url(#clip0_12320_867)">
                  <path
                    d="M39.2 20.0003C39.2 30.5871 30.5868 39.2003 20 39.2003C9.41325 39.2003 0.800049 30.5871 0.800049 20.0003C0.800049 19.3371 1.33685 18.8003 2.00005 18.8003C2.66325 18.8003 3.20005 19.3371 3.20005 20.0003C3.20005 29.2639 10.7364 36.8003 20 36.8003C29.2636 36.8003 36.8 29.2639 36.8 20.0003C36.8 10.7367 29.2636 3.20029 20 3.20029C15.5348 3.20029 11.3896 4.93589 8.27125 8.00029H12.8C13.4632 8.00029 14 8.53709 14 9.20029C14 9.86349 13.4632 10.4003 12.8 10.4003H5.60005C4.93685 10.4003 4.40005 9.86349 4.40005 9.20029V2.00029C4.40005 1.33709 4.93685 0.800293 5.60005 0.800293C6.26325 0.800293 6.80005 1.33709 6.80005 2.00029V6.09389C10.3404 2.71469 14.9924 0.800293 20 0.800293C30.5868 0.800293 39.2 9.41349 39.2 20.0003ZM30.8 15.2003V26.0003C30.8 26.5007 30.4896 26.9483 30.022 27.1243L20.422 30.7243C20.286 30.7747 20.1428 30.8003 20 30.8003C19.8572 30.8003 19.714 30.7747 19.578 30.7243L9.97805 27.1243C9.51045 26.9483 9.20005 26.5007 9.20005 26.0003V15.2003C9.20005 14.6999 9.51045 14.2523 9.97805 14.0763L19.578 10.4763C19.85 10.3755 20.15 10.3755 20.4216 10.4763L30.0216 14.0763C30.4896 14.2523 30.8 14.6999 30.8 15.2003ZM13.8172 15.2003L20 17.5183L26.1828 15.2003L20 12.8823L13.8172 15.2003ZM11.6 25.1683L18.8 27.8683V19.6323L11.6 16.9323V25.1683ZM28.4 25.1683V16.9323L21.2 19.6323V27.8683L28.4 25.1683Z"
                    fill="black"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_12320_867">
                    <rect
                      width="40"
                      height="40"
                      fill="white"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h4>Easy Returns</h4>
            <p>Stress-Free Returns For Peace Of Mind, Ensuring Your Satisfaction With Every...</p>
          </div>
        </div>

        <div className="about-team">
          <div className="about-team-header">
            <img src='//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564' alt='' />
            <h2>Meet Our Team Members</h2>
            <img src='//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611' alt='' />
          </div>
          <p className="about-team-sub">See Why Everyone's Raving About Our Products And Service – Real Stories From Happy Customers!</p>
          <div className="about-team-grid">
            {team.map((member, i) => (
              <div className="about-team-card" key={i}>
                <div className="about-team-image">
                  <img src={member.img} alt={member.name} />
                </div>
                <div className="about-team-info">
                  <h3>{member.name}</h3>
                  <p>{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-carousel-wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="about-carousel" ref={carouselRef}>
            {items.map((item, i) => (
              <div className="about-carousel-item" key={i}>
                <img src={item.img} alt="" />
              </div>
            ))}
          </div>
        </div>

        <div className="about-reviews">
          <div className="about-reviews-header">
            <img src='//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564' alt='' />
            <h2>Raving Reviews</h2>
            <img src='//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611' alt='' />
          </div>
          <p className="about-reviews-sub">See Why Everyone's Raving About Our Products And Service – Real Stories From Happy Customers!</p>

          <Slider
            slidesToShow={3}
            slidesToScroll={1}
            dots={true}
            arrows={false}
            speed={500}
            infinite={false}
          >
            {reviews.map((review, i) => (
              <div className="about-review-card-wrapper" key={i}>
                <div className="about-review-card">
                  <div className="about-review-top">
                    <img src={review.img} alt={review.name} />
                    <span className="about-review-quote">
                      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="32" viewBox="0 0 38 32" fill="none">
                        <path d="M25.8837 0L33.2016 32H37.6667V0H25.8837ZM0.581421 0L8.02328 32H12.3644V0H0.581421Z" fill="#CCCCCC"/>
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
      </div>
    </>
  );
}

export default About;