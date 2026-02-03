import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 50px',
    backgroundColor: '#2c3e50',
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginLeft: '25px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer'
  };

  const dropdownContainerStyle = {
    position: 'relative',
    display: 'inline-block'
  };

  const dropdownMenuStyle = {
    display: isDropdownOpen ? 'block' : 'none',
    position: 'absolute',
    backgroundColor: '#ffffff',
    minWidth: '180px',
    boxShadow: '0px 8px 16px rgba(0,0,0,0.1)',
    zIndex: 1,
    top: '100%',
    left: '25px',
    borderRadius: '4px',
    padding: '10px 0'
  };

  const dropdownItemStyle = {
    color: '#333',
    padding: '10px 20px',
    textDecoration: 'none',
    display: 'block',
    fontSize: '0.9rem',
    transition: 'background 0.2s'
  };

  const categories = ["Low voltage", "Instruments and Meters", "Solar Panels", "Generators", "Our Field work"];

  return (
    <nav style={navStyle}>
      <Link to="/" style={{ ...linkStyle, fontSize: '1.5rem', fontWeight: 'bold', marginLeft: 0 }}>
        City General <span style={{ color: '#3498db' }}>Electric LTD</span>
      </Link>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <a href="#home" style={linkStyle}>Home</a>

        {/* --- DROPDOWN SECTION --- */}
        <div 
          style={dropdownContainerStyle}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <span style={linkStyle}>Products ▾</span>
          <div style={dropdownMenuStyle}>
            {categories.map((cat) => (
              <a 
                key={cat} 
                href={`#${cat.replace(/\s+/g, '-').toLowerCase()}`}
                style={dropdownItemStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f1f1'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                {cat}
              </a>
            ))}
          </div>
        </div>

        <a href="#about-us" style={linkStyle}>About Us</a>
      </div>
    </nav>
  );
};

export default Navbar;