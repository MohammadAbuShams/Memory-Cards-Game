import React from 'react';

function Confetti() {
  const confettiCount = 100;
  const confettiPieces = [];

  for (let i = 0; i < confettiCount; i++) {
    const style = {
      left: `${Math.random() * 100}vw`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${1.5 + Math.random()}s`,
    };

    confettiPieces.push(<div key={i} className="confetti" style={style} />);
  }

  return <>{confettiPieces}</>;
}

export default Confetti;
