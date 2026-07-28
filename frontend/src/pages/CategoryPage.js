import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hero, setHero] = useState({
    welcomeText: "Welcome to City General Appliances. DEALERS IN: General Electricals Sales and Services, Solar Systems Sales and Services, Generators Sales and Services",
    heroImageUrl: "",
    heroVideoUrl: ""
  });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const categories = ["Low voltage", "Instruments and Meters", "Solar Panels", "Generators", "Our Field work"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, heroRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/products`),
          axios.get(`${API_BASE_URL}/api/products/settings`)
        ]);
        
        setProducts(prodRes.data);
        if (heroRes.data) setHero(heroRes.data);
      } catch (err) {
        console.error("Error fetching site data:", err);
      }
    };
    fetchData();
  }, [API_BASE_URL]);

  const textParts = hero.welcomeText.split('.');
  const mainTitle = textParts[0];
  const subText = textParts.slice(1).join('.');

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', scrollBehavior: 'smooth' }}>
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section id="home" style={{ 
        height: '100vh', 
        width: '100%',
        position: 'relative', 
        overflow: 'hidden', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#0a1a2e',
        scrollMarginTop: '80px'
      }}>
        
        {/* BACKGROUND IMAGE/VIDEO - FULL COVER */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}>
          {hero.heroVideoUrl ? (
            <video 
              key={hero.heroVideoUrl} 
              autoPlay 
              loop 
              muted 
              playsInline 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            >
              <source src={`${API_BASE_URL}${hero.heroVideoUrl}`} type="video/mp4" />
            </video>
          ) : hero.heroImageUrl ? (
            <div style={{ 
              width: '100%', 
              height: '100%', 
              backgroundImage: `url(${API_BASE_URL}${hero.heroImageUrl})`, 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }} />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #0a1a2e 0%, #1a3a5c 30%, #2c5a7a 60%, #1a3a5c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10rem',
              opacity: 0.15,
              color: 'white'
            }}>
              
            </div>
          )}
        </div>

        {/* GRADIENT OVERLAY */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)'
        }} />

        {/* CONTENT - ANIMATED */}
        <div style={{ 
          position: 'relative',
          zIndex: 2,
          maxWidth: '1000px',
          width: '90%',
          padding: '40px 60px',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{
            animation: 'fadeInUp 1s ease-out forwards',
            opacity: 0
          }}>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4.8rem)', 
              fontWeight: '800', 
              margin: '0 0 20px 0', 
              lineHeight: '1.15',
              textShadow: '0 4px 30px rgba(0,0,0,0.4)',
              letterSpacing: '-1px',
              background: 'linear-gradient(135deg, #ffffff 0%, #e0f0ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {mainTitle}
            </h1>
            
            {subText && (
              <p style={{ 
                fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', 
                fontWeight: '400', 
                margin: '0 0 45px 0', 
                lineHeight: '1.7',
                textShadow: '0 2px 15px rgba(0,0,0,0.3)',
                maxWidth: '750px',
                marginLeft: 'auto',
                marginRight: 'auto',
                color: 'rgba(255,255,255,0.95)',
                animation: 'fadeInUp 1s ease-out 0.3s forwards',
                opacity: 0
              }}>
                {subText.trim()}
              </p>
            )}
            
            {/* CTA BUTTONS */}
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              justifyContent: 'center', 
              flexWrap: 'wrap',
              marginTop: '10px'
            }}>
              <button 
                onClick={() => document.getElementById('low-voltage')?.scrollIntoView({ behavior: 'smooth' })} 
                style={{
                  padding: '18px 45px',
                  background: 'linear-gradient(135deg, #0066cc 0%, #0088ff 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 32px rgba(0, 102, 204, 0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
                onMouseEnter={(e) => { 
                  e.target.style.transform = 'translateY(-4px) scale(1.05)'; 
                  e.target.style.boxShadow = '0 12px 48px rgba(0, 102, 204, 0.6)';
                }}
                onMouseLeave={(e) => { 
                  e.target.style.transform = 'translateY(0) scale(1)'; 
                  e.target.style.boxShadow = '0 8px 32px rgba(0, 102, 204, 0.4)';
                }}
              >
                Explore Products
              </button>
              
              <button 
                style={{
                  padding: '18px 45px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.6)',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  backdropFilter: 'blur(10px)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
                onMouseEnter={(e) => { 
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; 
                  e.target.style.transform = 'translateY(-4px) scale(1.05)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 1)';
                }}
                onMouseLeave={(e) => { 
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; 
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- DASHBOARD-STYLE SEARCH BAR --- */}
      <div style={{ 
        backgroundColor: '#FFFFFF', 
        padding: '32px 40px', 
        borderBottom: '1px solid #E5E7EB',
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'Inter, Poppins, sans-serif'
      }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
          <span style={{ 
            position: 'absolute', 
            left: '16px', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            color: '#9CA3AF', 
            fontSize: '1.1rem'
          }}></span>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '14px 16px 14px 48px', 
              borderRadius: '8px', 
              border: '1px solid #E5E7EB', 
              fontSize: '0.95rem',
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#0057D9';
              e.target.style.boxShadow = '0 0 0 4px rgba(0, 87, 217, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#E5E7EB';
              e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
            }}
          />
        </div>
      </div>

      {/* --- PRODUCTS SECTION TITLE --- */}
      <section style={{
        padding: '100px 40px 60px',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Inter, Poppins, sans-serif'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.75rem',
            fontWeight: '700',
            color: '#06152D',
            margin: '0 0 48px 0',
            lineHeight: '1.2',
            animation: 'fadeInUp 0.8s ease forwards',
            opacity: 0
          }}>
            High Quality Electrical Solutions
          </h2>
        </div>
      </section>

      {/* --- PRODUCTS MAIN --- */}
      <main style={{ padding: '0 40px 100px', backgroundColor: '#FFFFFF', maxWidth: '100%', fontFamily: 'Inter, Poppins, sans-serif' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {categories.map((cat, index) => {
          const filtered = products.filter(p => 
            p.category === cat && 
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          
          const categoryId = cat.replace(/\s+/g, '-').toLowerCase();

          if (filtered.length === 0 && searchTerm !== "") return null;

          return (
            <div key={cat} id={categoryId} style={{ marginBottom: '120px', scrollMarginTop: '150px' }}>
              <h3 className="category-title" style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#06152D',
                margin: '0 0 40px 0',
                paddingBottom: '16px',
                borderBottom: '3px solid #0057D9',
                display: 'inline-block',
                position: 'relative'
              }}>
                {cat}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}>
                {filtered.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              {filtered.length === 0 && searchTerm === "" && (
                <div style={{ 
                  padding: '60px 40px', 
                  textAlign: 'center', 
                  background: '#F8FAFC', 
                  borderRadius: '12px', 
                  border: '1px solid #E5E7EB',
                  color: '#9CA3AF' 
                }}>
                  <p style={{ margin: 0, fontSize: '1rem', fontStyle: 'italic' }}>More products coming soon to {cat}.</p>
                </div>
              )}
            </div>
          );
        })}

        {searchTerm !== "" && !products.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())) && (
          <div style={{ textAlign: 'center', padding: '80px 40px' }}>
            <p style={{ fontSize: '1.1rem', color: '#6B7280', margin: 0 }}>No products found matching "<strong>{searchTerm}</strong>"</p>
          </div>
        )}
        </div>
      </main>

      {/* --- WHY CHOOSE US SECTION --- */}
      <section style={{
        backgroundColor: '#F8FAFC',
        padding: '100px 40px',
        borderBottom: '1px solid #E5E7EB',
        fontFamily: 'Inter, Poppins, sans-serif'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '2.75rem',
              fontWeight: '700',
              color: '#06152D',
              margin: '0 0 16px 0',
              lineHeight: '1.2',
              animation: 'fadeInUp 0.8s ease forwards',
              opacity: 0
            }}>
              Built on Trust. Driven by Quality.
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '48px'
          }}>
            {[
              {
                icon: '✓',
                title: 'Genuine Products',
                desc: 'Authentic electrical components and solutions from trusted manufacturers worldwide.'
              },
              {
                icon: '✓',
                title: 'Fast Delivery',
                desc: 'Efficient logistics ensuring your supplies arrive on time, every time.'
              },
              {
                icon: '✓',
                title: 'Expert Support',
                desc: 'Experienced technicians ready to assist with specifications, installation, and troubleshooting.'
              },
              {
                icon: '✓',
                title: 'Warranty Support',
                desc: 'Comprehensive warranty coverage and dedicated after-sales service for peace of mind.'
              }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="feature-card"
                style={{
                  textAlign: 'center',
                  padding: '32px 24px',
                  borderRadius: '12px',
                  background: 'white',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  animation: 'fadeInUp 0.8s ease forwards',
                  opacity: 0,
                  animationDelay: `${idx * 0.1}s`
                }}
              >
                <div className="feature-icon" style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 24px',
                  background: 'linear-gradient(135deg, #0057D9 0%, #1E90FF 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: '700',
                  transition: 'transform 0.4s ease'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#06152D',
                  margin: '0 0 12px 0'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6B7280',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .category-title {
            position: relative;
            display: inline-block;
          }

          .category-title::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 3px;
            background: linear-gradient(90deg, #0057D9, #0088ff);
            transition: width 0.5s ease;
          }

          .category-title:hover::after {
            width: 100%;
          }

          .feature-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          }

          .feature-card:hover .feature-icon {
            transform: scale(1.1) rotate(5deg);
          }

          .feature-icon {
            transition: transform 0.4s ease;
          }
        `}
      </style>
    </div>
  );
};

export default CategoryPage;