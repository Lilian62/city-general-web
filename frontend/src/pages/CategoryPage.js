import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search state added
  const [hero, setHero] = useState({
    welcomeText: "Welcome to City General Appliances. DEALERS IN: General Electricals Sales and Services, Solar Systems Sales and Services, Generators Sales and Services",
    heroImageUrl: "",
    heroVideoUrl: ""
  });

  // Updated to use dynamic URL logic for production compatibility
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
      <section id="home" style={{ height: '75vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', backgroundColor: '#2c3e50', scrollMarginTop: '80px' }}>
        {hero.heroVideoUrl && (
          <video key={hero.heroVideoUrl} autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
            <source src={`${API_BASE_URL}${hero.heroVideoUrl}`} type="video/mp4" />
          </video>
        )}
        {!hero.heroVideoUrl && hero.heroImageUrl && (
          <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0, backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${API_BASE_URL}${hero.heroImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        )}
        
        <div style={{ zIndex: 1, padding: '20px', maxWidth: '1000px' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: 'bold', textShadow: '2px 2px 15px rgba(0,0,0,0.7)', margin: '0 0 20px 0', lineHeight: '1.1' }}>
            {mainTitle}.
          </h1>
          {subText && (
            <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', fontWeight: '400', textShadow: '1px 1px 10px rgba(0,0,0,0.8)', margin: '0 auto', padding: '12px 30px', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '50px', display: 'inline-block', lineHeight: '1.4', maxWidth: '90%', letterSpacing: '0.3px' }}>
              {subText.trim()}
            </p>
          )}
        </div>
      </section>

      {/* --- DASHBOARD-STYLE SEARCH BAR --- */}
      <div style={{ 
        position: 'sticky', 
        top: '80px', 
        zIndex: 10, 
        backgroundColor: '#ffffff', 
        padding: '20px', 
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
          <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Search products by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '12px 15px 12px 45px', 
              borderRadius: '30px', 
              border: '1px solid #ddd', 
              fontSize: '1rem',
              outline: 'none',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }} 
          />
        </div>
      </div>

      {/* --- PRODUCTS MAIN --- */}
      <main style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        {categories.map(cat => {
          // Combined filtering logic: Matches Category AND Search Term
          const filtered = products.filter(p => 
            p.category === cat && 
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          
          const categoryId = cat.replace(/\s+/g, '-').toLowerCase();

          // Only show the category section if it has products matching the search
          if (filtered.length === 0 && searchTerm !== "") return null;

          return (
            <div key={cat} id={categoryId} style={{ marginBottom: '80px', scrollMarginTop: '150px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '35px' }}>
                <h2 style={{ fontSize: '2rem', color: '#2c3e50', margin: 0, paddingRight: '20px', fontWeight: 'bold' }}>{cat}</h2>
                <div style={{ flex: 1, height: '3px', background: '#3498db', borderRadius: '2px' }}></div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '35px' }}>
                {filtered.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              {filtered.length === 0 && searchTerm === "" && (
                <div style={{ padding: '40px', textAlign: 'center', background: '#f9f9f9', borderRadius: '15px', color: '#888' }}>
                  <p style={{ margin: 0, fontStyle: 'italic' }}>More products coming soon to {cat}.</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Show message if absolutely nothing matches the search */}
        {searchTerm !== "" && !products.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())) && (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>No products found matching "{searchTerm}"</p>
          </div>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CategoryPage;