import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Local placeholder (no external dependencies)
  const getPlaceholder = () => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f8f9fa'/%3E%3Ctext x='50%25' y='45%25' font-family='Arial' font-size='48' fill='%23adb5bd' text-anchor='middle'%3E📦%3C/text%3E%3Ctext x='50%25' y='60%25' font-family='Arial' font-size='14' fill='%23999' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E`;
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads/')) {
      const filename = imagePath.replace('/uploads/', '');
      return `/images/products/${filename}`;
    }
    if (!imagePath.startsWith('/')) {
      return `/images/products/${imagePath}`;
    }
    return imagePath;
  };

  const descriptionSnippet = product.description 
    ? product.description.slice(0, 80) + "..." 
    : "No description provided.";

  const imageUrl = getImageUrl(product.imageUrl);

  return (
    <div 
      className="product-card"
      style={{ 
        border: '1px solid #E5E7EB', 
        borderRadius: '16px', 
        overflow: 'hidden',
        textAlign: 'center',
        boxShadow: isHovered 
          ? '0 20px 60px rgba(0, 21, 45, 0.15)' 
          : '0 2px 8px rgba(0, 21, 45, 0.06)',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        height: '100%',
        position: 'relative',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div style={{ 
        height: '260px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        overflow: 'hidden', 
        backgroundColor: '#F8FAFC',
        borderBottom: '1px solid #E5E7EB',
        position: 'relative'
      }}>
        {imageUrl && !imageError ? (
          <>
            {!imageLoaded && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s ease-in-out infinite'
              }} />
            )}
            
            <img 
              src={imageUrl} 
              alt={product.name} 
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain',
                padding: '16px',
                transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                opacity: imageLoaded ? 1 : 0
              }} 
            />
          </>
        ) : (
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            background: '#f8f9fa',
            color: '#adb5bd'
          }}>
            <span style={{ fontSize: '3rem' }}></span>
            <span style={{ fontSize: '0.8rem', marginTop: '8px', color: '#999' }}>No Image</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div style={{ 
        padding: '24px 24px 28px', 
        display: 'flex', 
        flexDirection: 'column', 
        flexGrow: 1
      }}>
        <h3 style={{ 
          fontSize: '1.2rem', 
          fontWeight: '700',
          margin: '0 0 12px 0', 
          lineHeight: '1.3',
          minHeight: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'color 0.3s ease',
          color: isHovered ? '#0066cc' : '#06152D'
        }}>
          {product.name}
        </h3>
        
        <p style={{ 
          fontSize: '0.9rem', 
          color: '#6B7280', 
          lineHeight: '1.6',
          margin: '0 0 24px 0',
          flex: 1
        }}>
          {descriptionSnippet}
        </p>

        <button
          onClick={() => navigate(`/product/${product.slug || product._id}`)}
          style={{
            padding: '12px 20px',
            backgroundColor: isHovered ? '#0057D9' : 'transparent',
            color: isHovered ? 'white' : '#0057D9',
            border: '2px solid #0057D9',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            boxShadow: isHovered ? '0 8px 24px rgba(0, 87, 217, 0.3)' : 'none'
          }}
        >
          See More →
        </button>
      </div>

      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          
          .product-card {
            animation: fadeInUp 0.6s ease forwards;
            opacity: 0;
          }
          
          .product-card:nth-child(1) { animation-delay: 0.05s; }
          .product-card:nth-child(2) { animation-delay: 0.1s; }
          .product-card:nth-child(3) { animation-delay: 0.15s; }
          .product-card:nth-child(4) { animation-delay: 0.2s; }
          .product-card:nth-child(5) { animation-delay: 0.25s; }
          .product-card:nth-child(6) { animation-delay: 0.3s; }
          .product-card:nth-child(7) { animation-delay: 0.35s; }
          .product-card:nth-child(8) { animation-delay: 0.4s; }
          
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
        `}
      </style>
    </div>
  );
};

export default ProductCard;