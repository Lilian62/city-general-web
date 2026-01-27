import React from 'react';

const Footer = () => {
  return (
    <footer id="about-us" style={{ 
      backgroundColor: '#2c3e50', 
      color: 'white', 
      padding: '60px 20px', 
      textAlign: 'center',
      scrollMarginTop: '80px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2>City General Electric LTD</h2>
        <p style={{ maxWidth: '700px', margin: '20px auto', lineHeight: '1.6', opacity: 0.9 }}>
          Your trusted partner for high-quality electrical appliances, industrial components, 
          solar systems, and generators. Dedicated to safety and excellence in every power solution.
        </p>

        {/* --- NEW CONTACT DETAILS SECTION --- */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '40px', 
          marginTop: '40px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '40px'
        }}>
          
          {/* Location */}
          <div style={{ flex: '1 1 200px' }}>
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '10px' }}></span>
            <h4 style={{ margin: '0 0 10px 0', color: '#3498db' }}>Location</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
              Nairobi, Kenya<br />
              Athi house,Ground floor Charles Rubia Road
            </p>
          </div>

          {/* Contact */}
          <div style={{ flex: '1 1 200px' }}>
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '10px' }}></span>
            <h4 style={{ margin: '0 0 10px 0', color: '#3498db' }}>Call/WhatsApp</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
              +254 723 866 088/ +254 733 866 088
            </p>
          </div>

          {/* Email */}
          <div style={{ flex: '1 1 200px' }}>
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '10px' }}></span>
            <h4 style={{ margin: '0 0 10px 0', color: '#3498db' }}>Email Us</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
              <a href="mailto:citygeltd@gmail.com " style={{ color: 'white', textDecoration: 'none' }}>
                citygeltd@gmail.com 
              </a>
            </p>
          </div>

        </div>

        <p style={{ marginTop: '50px', fontSize: '0.8rem', opacity: 0.5 }}>
          © {new Date().getFullYear()} City General Electric LTD. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;