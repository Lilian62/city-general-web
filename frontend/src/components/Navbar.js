import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 60px',
    backgroundColor: '#06152D', // ALWAYS VISIBLE - Changed from transparent
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    transition: 'all 0.3s ease',
    boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.3)' : '0 2px 20px rgba(0, 0, 0, 0.15)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
  };

  const logoStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.25rem',
    fontWeight: '700',
    marginLeft: 0,
    letterSpacing: '-0.5px',
    transition: 'all 0.3s ease'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginLeft: '40px',
    fontSize: '0.95rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    opacity: 0.85,
    padding: '8px 0',
    position: 'relative'
  };

  // Hover effect for links - add underline animation
  const linkHoverStyle = {
    ...linkStyle,
    opacity: 1,
  };

  const dropdownContainerStyle = {
    position: 'relative',
    display: 'inline-block'
  };

  const dropdownMenuStyle = {
    display: isDropdownOpen ? 'block' : 'none',
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    minWidth: '220px',
    boxShadow: '0 12px 40px rgba(0, 21, 45, 0.2)',
    zIndex: 1,
    top: '100%',
    left: 0,
    borderRadius: '12px',
    padding: '8px 0',
    marginTop: '12px',
    animation: 'dropdownFade 0.3s ease forwards'
  };

  const dropdownItemStyle = {
    color: '#06152D',
    padding: '12px 24px',
    textDecoration: 'none',
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s',
    borderLeft: '3px solid transparent',
    cursor: 'pointer'
  };

  const categories = ["Low voltage", "Instruments and Meters", "Solar Panels", "Generators", "Our Field work"];

  return (
    <>
      <nav style={navStyle}>
        <Link to="/" style={logoStyle}>
          City General <span style={{ color: '#4da6ff' }}>Electric LTD</span>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a 
            href="#home" 
            style={linkStyle}
            onMouseEnter={(e) => { e.target.style.opacity = '1'; }}
            onMouseLeave={(e) => { e.target.style.opacity = '0.85'; }}
          >
            Home
          </a>

          {/* --- DROPDOWN SECTION --- */}
          <div 
            style={dropdownContainerStyle}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span 
              style={linkStyle}
              onMouseEnter={(e) => { e.target.style.opacity = '1'; }}
              onMouseLeave={(e) => { e.target.style.opacity = '0.85'; }}
            >
              Products ▾
            </span>
            <div style={dropdownMenuStyle}>
              {categories.map((cat) => (
                <a 
                  key={cat} 
                  href={`#${cat.replace(/\s+/g, '-').toLowerCase()}`}
                  style={dropdownItemStyle}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#F0F7FF';
                    e.target.style.borderLeftColor = '#0057D9';
                    e.target.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderLeftColor = 'transparent';
                    e.target.style.transform = 'translateX(0)';
                  }}
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>

          <a 
            href="#about-us" 
            style={linkStyle}
            onMouseEnter={(e) => { e.target.style.opacity = '1'; }}
            onMouseLeave={(e) => { e.target.style.opacity = '0.85'; }}
          >
            Contact
          </a>
        </div>
      </nav>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes dropdownFade {
            from {
              opacity: 0;
              transform: translateY(-10px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          /* Optional: Add a subtle glow effect on scroll */
          .navbar-scrolled {
            box-shadow: 0 4px 30px rgba(0, 21, 45, 0.3) !important;
          }
        `}
      </style>
    </>
  );
};

export default Navbar;