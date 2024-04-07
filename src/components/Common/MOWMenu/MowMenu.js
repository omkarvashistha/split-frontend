import React, { useState } from 'react';
import './MowMenu.css'; // Import CSS file for styling

const MowMenu = () => { 
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ["Home", "Friends", "Activity", "Account"];

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`mobile-navbar-container ${isOpen ? 'open' : ''}`}>
      <button className="mobile-navbar-button" onClick={toggleNavbar}>
        <div className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      {isOpen && (
        <div className='mobile-navbar-items' style={{ animation: isOpen ? 'slideFromButton 0.5s forwards' : 'slideBackToButton 0.5s forwards' }}>
          <ul className=''>
            {navItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MowMenu;
