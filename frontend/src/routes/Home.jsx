import React, { useEffect } from 'react'
import Primarybtn from '../components/Primarybtn'
import Secondarybtn from '../components/Secondarybtn'
import { useLoader } from '../context/LoaderContext';

function Home() {

  const { useFakeLoader } = useLoader();
  useEffect(() => { useFakeLoader(); }, [useFakeLoader]);

  return (
    <>
    <div className="hero">
      <div className='hero-text'>
        <div className="arrivals">
          <div className="icon">
            <img src="//brew-blis.myshopify.com/cdn/shop/files/vector1.png?v=1736771826" alt=""/>
          </div>
          <p>New Arrival</p>
          <div className="icon">
            <img src="//brew-blis.myshopify.com/cdn/shop/files/vector2.png?v=1736775115" alt=""/>
          </div>
        </div>
        
        <h1 className='hero-header'>Discover Flavors, <br /> One Bottle at a Time!</h1>

        <p className='hero-p'>Explore the rich and diverse world of beer, savoring unique flavors crafted to perfection, one  <br />bottle at a time!</p>

        <div className="btns-container">
          <Primarybtn>Shop Sale</Primarybtn>
          <Secondarybtn>Our Collections</Secondarybtn>
        </div>
        
      </div>

      <div className='img-container'>
        <img src="//brew-blis.myshopify.com/cdn/shop/files/hero.png?v=1736771607" alt="Hero Banner Image 500x500"/>
      </div>
    </div>
    </>
  )
}

export default Home