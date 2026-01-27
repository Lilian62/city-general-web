import React from 'react'; // Removed useState since it's no longer used for expansion
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Snippet logic
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
        height: '100%' 
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* Image Container */}
      <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px', overflow: 'hidden' }}>
        <img 
          src={`http://localhost:5000${product.imageUrl}`} 
          alt={`${product.name} - City General Electric`} 
          loading="lazy"
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%', 
            borderRadius: '8px', 
            objectFit: 'contain',
            transition: 'transform 0.5s ease'
          }} 
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
      
      {/* Navigation Trigger (Replaces old expansion logic) */}
      <div 
        // This checks if a slug exists; if not, it uses the ID as a backup
onClick={() => navigate(`/product/${product.slug || product._id}`)}
        style={{ 
          cursor: 'pointer',
          padding: '12px',
          borderRadius: '8px',
          backgroundColor: '#fafafa',
          transition: 'all 0.3s ease',
          flexGrow: 1, 
          border: '1px solid transparent'
        }}
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
          color: '#3498db', 
          display: 'block', 
          marginTop: '8px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          View Details →
        </span>
      </div>
    </div>
  );
};

export default ProductCard;