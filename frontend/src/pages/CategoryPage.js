import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [hero, setHero] = useState({
    welcomeText: "Welcome to City General Appliances. DEALERS IN: General Electricals Sales and Services, Solar Systems Sales and Services, Generators Sales and Services",
    heroImageUrl: "",
    heroVideoUrl: ""
  });

  const categories = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, heroRes] = await Promise.all([
          axios.get('http://localhost:5000/api/products'),
          axios.get('http://localhost:5000/api/products/settings')
        ]);
        
        setProducts(prodRes.data);
        if (heroRes.data) setHero(heroRes.data);
      } catch (err) {
        console.error("Error fetching site data:", err);
      }
    };
    fetchData();
  }, []);

  // --- LOGIC TO SPLIT THE WELCOME TEXT ---
  // Splits at the first period to separate the brand name from the services list.
  const textParts = hero.welcomeText.split('.');
  const mainTitle = textParts[0];
  const subText = textParts.slice(1).join('.');

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', scrollBehavior: 'smooth' }}>
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section id="home" style={{ height: '75vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', backgroundColor: '#2c3e50', scrollMarginTop: '80px' }}>
        {hero.heroVideoUrl && (
          <video key={hero.heroVideoUrl} autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
            <source src={`http://localhost:5000${hero.heroVideoUrl}`} type="video/mp4" />
          </video>
        )}
        {!hero.heroVideoUrl && hero.heroImageUrl && (
          <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0, backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(http://localhost:5000${hero.heroImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        )}
        
        <div style={{ zIndex: 1, padding: '20px', maxWidth: '1000px' }}>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 8vw, 3.5rem)', 
            fontWeight: 'bold', 
            textShadow: '2px 2px 15px rgba(0,0,0,0.7)', 
            margin: '0 0 20px 0',
            lineHeight: '1.1'
          }}>
            {mainTitle}.
          </h1>
          
          {subText && (
            <p style={{ 
              fontSize: 'clamp(1rem, 4vw, 1.25rem)', 
              fontWeight: '400', 
              textShadow: '1px 1px 10px rgba(0,0,0,0.8)', 
              margin: '0 auto',
              padding: '12px 30px',
              backgroundColor: 'rgba(0,0,0,0.4)', 
              borderRadius: '50px',
              display: 'inline-block',
              lineHeight: '1.4',
              maxWidth: '90%',
              letterSpacing: '0.3px'
            }}>
              {subText.trim()}
            </p>
          )}
        </div>
      </section>

      {/* --- PRODUCTS MAIN --- */}
      <main style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        {categories.map(cat => {
          const filtered = products.filter(p => p.category === cat);
          const categoryId = cat.replace(/\s+/g, '-').toLowerCase();

          return (
            <div key={cat} id={categoryId} style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '35px' }}>
                <h2 style={{ fontSize: '2rem', color: '#2c3e50', margin: 0, paddingRight: '20px', fontWeight: 'bold' }}>{cat}</h2>
                <div style={{ flex: 1, height: '3px', background: '#3498db', borderRadius: '2px' }}></div>
              </div>

              {filtered.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '35px' }}>
                  {filtered.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div style={{ padding: '40px', textAlign: 'center', background: '#f9f9f9', borderRadius: '15px', color: '#888' }}>
                  <p style={{ margin: 0, fontStyle: 'italic' }}>More products coming soon to {cat}.</p>
                </div>
              )}
            </div>
          );
        })}
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CategoryPage;