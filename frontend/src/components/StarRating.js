import React, { useState } from 'react';

const StarRating = ({ productId }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span 
          key={star} 
          className={star <= rating ? "star filled" : "star"} 
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
      <p className="rating-text">{rating > 0 ? `You rated this ${rating} stars` : "Tap to rate"}</p>
    </div>
  );
};

export default StarRating;