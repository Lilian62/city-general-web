import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // DYNAMIC URL LOGIC: Switches between localhost and live server
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const descriptionSnippet = product.description 
    ? product.description.slice(0, 80) + "..." 
    : "No description provided.";

  return (
    <div 
      className="product-card"
      style={{ 
        border: '1px solid #f0f0f0', 
        borderRadius: '12px', 
        padding: '20px', 
        textAlign: 'center',
        boxShadow: '0 6px 12px rgba(0,0,0,0.05)',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        height: '100%',
        position: 'relative'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* Image Container using Dynamic URL */}
      <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px', overflow: 'hidden' }}>
        <img 
          src={`${API_BASE_URL}${product.imageUrl}`} 
          alt={`${product.name} - City General Electric`} 
          loading="lazy"
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%', 
            borderRadius: '8px', 
            objectFit: 'contain'
          }} 
          // Fallback image if the path is broken
          onError={(e) => { e.target.src = 'https://via.placeholder.com/220?text=Image+Not+Found'; }}
        />
      </div>

      <h3 style={{ 
        fontSize: '1.15rem', 
        margin: '10px 0', 
        color: '#2c3e50', 
        minHeight: '3.4rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        lineHeight: '1.3'
      }}>
        {product.name}
      </h3>
      
      <div 
        onClick={() => navigate(`/product/${product.slug || product._id}`)}
        style={{ 
          cursor: 'pointer',
          padding: '12px',
          borderRadius: '8px',
          backgroundColor: '#fafafa',
          transition: 'all 0.3s ease',
          flexGrow: 1, 
          border: '1px solid transparent',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#003366'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
      >
        <p style={{ 
          fontSize: '0.9rem', 
          color: '#5a6c7d', 
          lineHeight: '1.6',
          margin: '0',
          textAlign: 'left',
          wordBreak: 'break-word'
        }}>
          {descriptionSnippet}
        </p>
        
        <span style={{ 
          fontSize: '0.75rem', 
          color: '#003366', 
          display: 'block', 
          marginTop: '8px',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}>
          View Details →
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
