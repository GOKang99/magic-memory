import React from "react";
import "./SingleCard.css";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
      console.log(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card" />
        <img
          onClick={handleClick}
          className="back"
          src="/img/cover.png"
          alt="card"
        />
      </div>
    </div>
  );
};

export default SingleCard;
