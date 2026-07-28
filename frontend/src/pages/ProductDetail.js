import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Local placeholder (no external dependencies)
const getPlaceholder = () => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f8f9fa'/%3E%3Ctext x='50%25' y='45%25' font-family='Arial' font-size='64' fill='%23adb5bd' text-anchor='middle'%3E%3C/text%3E%3Ctext x='50%25' y='58%25' font-family='Arial' font-size='18' fill='%23999' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E`;
};

// Function to get the correct image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // If it starts with /uploads/, change to /images/products/
  if (imagePath.startsWith('/uploads/')) {
    const filename = imagePath.replace('/uploads/', '');
    return `/images/products/${filename}`;
  }
  
  // If it's just a filename, use /images/products/
  if (!imagePath.startsWith('/')) {
    return `/images/products/${imagePath}`;
  }
  
  return imagePath;
};

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        setImageError(false);
        
        // Try fetching by slug first
        const res = await axios.get(`${API_BASE_URL}/api/products/slug/${slug}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching by slug:", err);
        
        // Fallback: Try fetching by ID for older products
        try {
          const fallbackRes = await axios.get(`${API_BASE_URL}/api/products/${slug}`);
          setProduct(fallbackRes.data);
        } catch (fallbackErr) {
          console.error("Product not found by slug or ID");
          setError("Product not found. Please check the URL or go back to browse products.");
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div style={{ backgroundColor: '#fdfdfd', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <div style={{
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ marginTop: '20px', color: '#666' }}>Loading Product...</p>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div style={{ backgroundColor: '#fdfdfd', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ 
          textAlign: 'center', 
          padding: '100px 20px',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
          <h2 style={{ color: '#2c3e50', marginBottom: '10px' }}>Product Not Found</h2>
          <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>
            {error || "The product you're looking for doesn't exist or has been removed."}
          </p>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '12px 30px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#2980b9';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#3498db';
              e.target.style.transform = 'scale(1)';
            }}
          >
            ← Back to Home
          </button>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Get the image URL
  const imageUrl = getImageUrl(product.imageUrl);

  // Render product details
  return (
    <div style={{ backgroundColor: '#fdfdfd', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '1100px', margin: '60px auto', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
        
        {/* Left: Professional Image View */}
        <div style={{ 
          background: '#fff', 
          padding: '20px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '300px'
        }}>
          {imageUrl && !imageError ? (
            <img 
              src={imageUrl} 
              alt={product.name} 
              onError={() => {
                setImageError(true);
              }}
              style={{ 
                width: '100%', 
                maxHeight: '450px', 
                objectFit: 'contain' 
              }} 
            />
          ) : (
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '300px',
              background: '#f8f9fa',
              color: '#adb5bd'
            }}>
              <span style={{ fontSize: '4rem' }}></span>
              <span style={{ fontSize: '1rem', marginTop: '12px', color: '#999' }}>No Image Available</span>
            </div>
          )}
        </div>

        {/* Right: Detailed Information */}
        <div style={{ padding: '10px' }}>
          <p style={{ 
            color: '#3498db', 
            fontWeight: 'bold', 
            textTransform: 'uppercase', 
            marginBottom: '10px' 
          }}>
            {product.category || 'Uncategorized'}
          </p>
          <h1 style={{ 
            fontSize: '2.4rem', 
            color: '#2c3e50', 
            margin: '0 0 15px 0', 
            lineHeight: '1.2' 
          }}>
            {product.name}
          </h1>
          <div style={{ 
            width: '60px', 
            height: '4px', 
            background: '#3498db', 
            marginBottom: '25px' 
          }}></div>
          
          <h4 style={{ color: '#7f8c8d', marginBottom: '10px' }}>Technical Specifications:</h4>
          <p style={{ 
            fontSize: '1.1rem', 
            lineHeight: '1.7', 
            color: '#444', 
            marginBottom: '35px', 
            whiteSpace: 'pre-wrap' 
          }}>
            {product.description || 'No description available.'}
          </p>

          <a 
            href={`https://wa.me/254723866088?text=I%20am%20interested%20in%20the%20${encodeURIComponent(product.name)}`}
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
              boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.3)';
            }}
          >
            Order via WhatsApp
          </a>
        </div>
      </div>
      
      {/* Spin animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetail;