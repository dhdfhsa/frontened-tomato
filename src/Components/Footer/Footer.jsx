import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="footer"  id='footer'>
      <div className="footer-inner">
        <div className="footer-brand">
          <img className="footer-logo" src={assets.logo} alt="Logo" />
          <p className="footer-tagline">Fresh flavors, fast delivery, warm service.</p>
        </div>

        <div className="footer-socials">
          <a className="social-pill" href="https://facebook.com" aria-label="Facebook">
            <img src={assets.facebook_icon} alt="" />
          </a>
          <a className="social-pill" href="https://twitter.com" aria-label="Twitter">
            <img src={assets.twitter_icon} alt="" />
          </a>
          <a className="social-pill" href="https://linkedin.com" aria-label="LinkedIn">
            <img src={assets.linkedin_icon} alt="" />
          </a>
        </div>

        <div className="footer-contact">
          <a className="contact-pill" href="mailto:hello@foodie.com">
            Email: hello@foodie.com
          </a>
          <a className="contact-pill" href="tel:+8801700000000">
            Call: +880 1700 000 000
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Foodie. All rights reserved.</span>
      </div>
    </footer>
  )
}

export default Footer
