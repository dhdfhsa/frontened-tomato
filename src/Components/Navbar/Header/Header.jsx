import React from 'react'
import './Header.css'
import { assets } from '../../../assets/assets'

const Header = () => {
  return (
    <section className='hero'>
      <div className="hero-content">
        <div className="hero-pill">
          <span className="hero-dot" />
          100% AUTHENTIC HOME COOKING
        </div>
        <h1>
          Savor the <br />
          <span className="hero-accent">True Taste</span> <br />
          of Home.
        </h1>
        <p>
          Skip the generic restaurant food. Discover passionate local chefs cooking
          authentic, hygienic, and soulful meals right in your neighborhood.
        </p>
        <div className="hero-actions">
          <button className="primary">Explore Meals</button>
          <button className="ghost">
            <span className="play">▶</span>
            Watch Video
          </button>
        </div>
      </div>
      <div className="hero-visual">
        <div className="float-card rating-card">
          <div className="rating-icon">★</div>
          <div>
            <div className="rating-score">4.9/5</div>
            <div className="rating-label">Average Rating</div>
          </div>
        </div>
        <div className="float-card chef-card">
          <div className="chef-icon">●</div>
          <div>
            <div className="chef-score">500+ Local</div>
            <div className="chef-label">Verified Chefs</div>
          </div>
        </div>
        <div className="bowl-wrap">
          <img src={assets.header_img} alt="Signature bowl" />
        </div>
        <div className="float-card delivery-card">
          <div className="delivery-icon">🔥</div>
          <div>
            <div className="delivery-score">Hot & Fresh</div>
            <div className="delivery-label">Straight to You</div>
          </div>
        </div>
      </div>
    </section>
  ) 
}

export default Header
