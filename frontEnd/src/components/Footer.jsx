import React from 'react';
import './Footer.css'; // Make sure you create this CSS file for styling
import Logo from './assets/logo.png';
import { useLocation } from 'react-router-dom';


const Footer = () => {
  const location = useLocation()
  const hiddenState = location.state?.hideState;
  return (
    <footer className="footer" style={{display: hiddenState ? 'none' : 'flex'}}>
      <div className="footer-column">
        <div className="footer-logo">
          <img src={Logo} alt="NEXUS Logo" />
        </div>
        <p>Innovator in the field of NFTs.</p>
      </div>
      <div className="footer-column">
        <h4>MARKETPLACE</h4>
        <ul>
          <li>All NFTs</li>
          <li>Virtual World</li>
          <li>Art</li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>STATISTIC</h4>
        <ul>
          <li>Rankings</li>
          <li>Activity</li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>RESOURCES</h4>
        <ul>
          <li>Help Center</li>
          <li>Newsletter</li>
          <li>System Tokens</li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>COMPANY</h4>
        <ul>
          <li>Home</li>
          <li>Marketplace</li>
          <li>Top Creator</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
