import React, { useEffect, useRef } from 'react';

function InfCarousel() {
  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  const isPausedRef = useRef(false);

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

    animationRef.current = setInterval(step, 2500);

    return () => clearInterval(animationRef.current);
  }, []);

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };
  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

  return (
    <div
      className="about-carousel-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="about-carousel"
        ref={carouselRef}
      >
        {items.map((item, i) => (
          <div
            className="about-carousel-item"
            key={i}
          >
            <img
              src={item.img}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfCarousel;
