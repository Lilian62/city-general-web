import React from 'react';

const Footer = () => {
  return (
    <footer id="about-us" style={{ 
      scrollMarginTop: '80px',
      fontFamily: 'Inter, Poppins, sans-serif'
    }}>

      {/* TRUSTED BRANDS SECTION */}
      <section style={{
        backgroundColor: '#F8FAFC',
        padding: '80px 40px',
        borderBottom: '1px solid #E5E7EB'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#6B7280',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            textAlign: 'center',
            marginBottom: '48px',
            margin: '0 0 48px 0'
          }}>
            Trusted by Leading Global Brands
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '32px 48px'
          }}>
            {/* CHINT - Blue #25BFFF */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 24px',
              opacity: 0.7,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              minWidth: '100px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 191, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.7';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            }}
            >
              <span style={{
                fontSize: '1.3rem',
                fontWeight: '800',
                color: '#25BFFF',
                letterSpacing: '1px'
              }}>
                CHINT
              </span>
            </div>

            {/* Schneider Electric - Green #009e4d */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 24px',
              opacity: 0.7,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              minWidth: '140px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 158, 77, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.7';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            }}
            >
              <span style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: '#009e4d',
                letterSpacing: '0.5px'
              }}>
                Schneider Electric
              </span>
            </div>

            {/* GIC - Blue Ribbon #0033FF */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 24px',
              opacity: 0.7,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              minWidth: '100px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 51, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.7';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            }}
            >
              <span style={{
                fontSize: '1.3rem',
                fontWeight: '800',
                color: '#0033FF',
                letterSpacing: '1px'
              }}>
                GIC
              </span>
            </div>

            {/* DSE - Blue Zodiac #112845 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 24px',
              opacity: 0.7,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              minWidth: '100px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(17, 40, 69, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.7';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            }}
            >
              <span style={{
                fontSize: '1.3rem',
                fontWeight: '800',
                color: '#112845',
                letterSpacing: '1px'
              }}>
                DSE
              </span>
            </div>

            {/* Smart Gen - Energy Tech Blue */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 24px',
              opacity: 0.7,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              minWidth: '100px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 180, 216, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.7';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            }}
            >
              <span style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                color: '#00B4D8',
                letterSpacing: '1px'
              }}>
                Smart Gen
              </span>
            </div>

            {/* ABB - Red #FF0000 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 24px',
              opacity: 0.7,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              minWidth: '100px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.7';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            }}
            >
              <span style={{
                fontSize: '1.3rem',
                fontWeight: '800',
                color: '#FF0000',
                letterSpacing: '1px'
              }}>
                ABB
              </span>
            </div>

            {/* GOODWE - Dark Blue #003366 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 24px',
              opacity: 0.7,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              minWidth: '100px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 51, 102, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.7';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            }}
            >
              <span style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                color: '#003366',
                letterSpacing: '1px'
              }}>
                GOODWE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN FOOTER */}
      <footer style={{ 
        backgroundColor: '#06152D', 
        color: 'white', 
        padding: '80px 40px 40px',
        fontFamily: 'Inter, Poppins, sans-serif'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          {/* FOOTER CONTENT GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '60px',
            marginBottom: '80px'
          }}>
            
            {/* COMPANY INFO */}
            <div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                marginBottom: '16px',
                margin: '0 0 16px 0'
              }}>
                City General <span style={{ color: '#1E90FF' }}>Electric LTD</span>
              </h3>
              <p style={{
                fontSize: '0.95rem',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.7)',
                margin: '0',
                marginBottom: '24px'
              }}>
                Dealers In: General Electricals, Sales And Services, Solar Systems Sales & Services, Generators Sales And Services.Your trusted partner for high-quality electrical appliances, industrial components, solar systems, and generators. Dedicated to safety and excellence in every power solution.
              </p>
              <p style={{
                fontSize: '0.85rem',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.5)',
                margin: '0'
              }}>
                Athi House, Ground Floor<br />
                Charles Rubia Road<br />
                P.o. Box 32998-00600
              </p>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h4 style={{
                fontSize: '0.9rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: '#1E90FF',
                marginBottom: '20px',
                margin: '0 0 20px 0'
              }}>
                Products
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {["Low voltage", "Instruments & Meters", "Solar Panels", "Generators"].map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '12px' }}>
                    <a href="#" style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.2s',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#1E90FF'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT INFO */}
            <div>
              <h4 style={{
                fontSize: '0.9rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: '#1E90FF',
                marginBottom: '20px',
                margin: '0 0 20px 0'
              }}>
                Contact Us
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <p style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    margin: '0 0 6px 0',
                    fontWeight: '600'
                  }}>
                    Call/WhatsApp
                  </p>
                  <p style={{
                    fontSize: '0.95rem',
                    color: 'white',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    0723 866 088
                  </p>
                  <p style={{
                    fontSize: '0.95rem',
                    color: 'white',
                    margin: '4px 0 0 0',
                    fontWeight: '500'
                  }}>
                    0733 866 088
                  </p>
                  <p style={{
                    fontSize: '0.95rem',
                    color: 'white',
                    margin: '4px 0 0 0',
                    fontWeight: '500'
                  }}>
                    0742 183 432
                  </p>
                </div>
                
                <div>
                  <p style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    margin: '0 0 6px 0',
                    fontWeight: '600'
                  }}>
                    Email
                  </p>
                  <a href="mailto:citygeltd@gmail.com" style={{
                    fontSize: '0.95rem',
                    color: '#1E90FF',
                    textDecoration: 'none',
                    fontWeight: '500',
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    citygeltd@gmail.com
                  </a>
                  <a href="mailto:gmmugera@gmail.com" style={{
                    fontSize: '0.95rem',
                    color: '#1E90FF',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}>
                    gmmugera@gmail.com
                  </a>
                </div>

                <div>
                  <p style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    margin: '0 0 6px 0',
                    fontWeight: '600'
                  }}>
                    Location
                  </p>
                  <p style={{
                    fontSize: '0.95rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    Athi House, Ground Floor<br />
                    Charles Rubia Road<br />
                    Nairobi, Kenya
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            <p style={{
              fontSize: '0.85rem',
              color: 'rgba(255, 255, 255, 0.6)',
              margin: 0
            }}>
              © {new Date().getFullYear()} City General Electric LTD. All Rights Reserved.
            </p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a href="#" style={{
                color: 'rgba(255, 255, 255, 0.6)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#1E90FF'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
              >
                
              </a>
              <a href="#" style={{
                color: 'rgba(255, 255, 255, 0.6)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#1E90FF'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
              >
                
              </a>
            </div>
          </div>
        </div>
      </footer>
    </footer>
  );
};

export default Footer;