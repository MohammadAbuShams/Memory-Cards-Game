import React from 'react';


function Card({ id, card, handleCardClick, flipped }) {
  return (
    <div
      className={`card ${flipped ? 'flipped' : ''}`}
      onClick={() => handleCardClick(id)}
    >
      <div className="front" />
      <div className="back">
        <img src={card.img} alt={card.name} />
      </div>
    </div>
  );
}

export default Card;
