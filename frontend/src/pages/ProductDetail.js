import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchProduct = async () => {
    try {
      // Try fetching by slug first, then try ID if that fails
      const res = await axios.get(`${API_BASE_URL}/api/products/slug/${slug}`);
      setProduct(res.data);
    } catch (err) {
      // Fallback: Try fetching by ID for older products
      try {
        const fallbackRes = await axios.get(`${API_BASE_URL}/api/products/${slug}`);
        setProduct(fallbackRes.data);
      } catch (fallbackErr) {
        console.error("Product not found by slug or ID");
      }
    } finally {
      setLoading(false);
    }
  };
  fetchProduct();
}, [slug]);

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading Product...</div>;
  if (!product) return <div style={{ textAlign: 'center', padding: '100px' }}>Product not found. <button onClick={() => navigate('/')}>Go Back</button></div>;

  return (
    <div style={{ backgroundColor: '#fdfdfd', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '1100px', margin: '60px auto', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
        
        {/* Left: Professional Image View */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src={`${API_BASE_URL}${product.imageUrl}`} 
            alt={product.name} 
            style={{ width: '100%', maxHeight: '450px', objectFit: 'contain' }} 
          />
        </div>

        {/* Right: Detailed Information */}
        <div style={{ padding: '10px' }}>
          <p style={{ color: '#3498db', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>{product.category}</p>
          <h1 style={{ fontSize: '2.4rem', color: '#2c3e50', margin: '0 0 15px 0', lineHeight: '1.2' }}>{product.name}</h1>
          <div style={{ width: '60px', height: '4px', background: '#3498db', marginBottom: '25px' }}></div>
          
          <h4 style={{ color: '#7f8c8d', marginBottom: '10px' }}>Technical Specifications:</h4>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#444', marginBottom: '35px', whiteSpace: 'pre-wrap' }}>
            {product.description}
          </p>

          <a 
            href={`https://wa.me/254796988033?text=I%20am%20interested%20in%20the%20${encodeURIComponent(product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              backgroundColor: '#25D366', 
              color: 'white', 
              padding: '16px 32px', 
              borderRadius: '8px', 
              textDecoration: 'none', 
              display: 'inline-block',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
            }}
          >
            Order via whatsapp
          </a>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetail;