import React, { useState, useEffect } from "react";
import Card from "./Card";
import Confetti from "./Confetti";

// Images
import mbappeImage from "./images/mbappe.png";
import valverdeImage from "./images/valverde.png";
import griezmannImage from "./images/griezmann.png";
import neuerImage from "./images/neuer.png";
import navasImage from "./images/navas.png";
import stegenImage from "./images/stegen.png";
import cristianoImage from "./images/cristiano.png";
import malenImage from "./images/malen.png";
import wernerImage from "./images/werner.png";
import messiImage from "./images/messi.png";

const initialCards = [
  { name: "mbappe", img: mbappeImage },
  { name: "valverde", img: valverdeImage },
  { name: "griezmann", img: griezmannImage },
  { name: "neuer", img: neuerImage },
  { name: "navas", img: navasImage },
  { name: "stegen", img: stegenImage },
  { name: "cristiano", img: cristianoImage },
  { name: "malen", img: malenImage },
  { name: "werner", img: wernerImage },
  { name: "messi", img: messiImage },
];

function shuffleCards(cards) {
  return cards.concat(cards).sort(() => 0.5 - Math.random());
}

function GameBoard() {
  const [cards, setCards] = useState(shuffleCards(initialCards));
  const [openCards, setOpenCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [misses, setMisses] = useState(0);
  const [remainingMoves, setRemainingMoves] = useState(25);
  const [score, setScore] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isWinning, setIsWinning] = useState(false);
  const [bestRecord, setBestRecord] = useState("");

  useEffect(() => {
    if (openCards.length === 2) {
      const [first, second] = openCards;
      setMoves(moves + 1);
      setRemainingMoves(remainingMoves - 1);
      if (cards[first].name === cards[second].name) {
        setMatchedCards((prev) => [...prev, first, second]);
        setScore(score + 1);

        if (matchedCards.length + 2 === initialCards.length * 2) {
          handleWin(moves + 1);
        }
      } else {
        setMisses(misses + 1);
      }
      setTimeout(() => setOpenCards([]), 1000);
    }
  }, [openCards]);

  useEffect(() => {
    if (
      remainingMoves <= 0 &&
      matchedCards.length !== initialCards.length * 2
    ) {
      showModal(`You lose! Try again! 😢`);
    }
  }, [remainingMoves, matchedCards.length]);

  const handleCardClick = (index) => {
    if (
      openCards.includes(index) ||
      matchedCards.includes(index) ||
      openCards.length === 2 ||
      remainingMoves <= 0
    ) {
      return;
    }
    setOpenCards((prev) => [...prev, index]);
  };

  const resetGame = () => {
    setMatchedCards([]);
    setOpenCards([]);
    setCards(shuffleCards(initialCards));
    setMoves(0);
    setMisses(0);
    setScore(0);
    setRemainingMoves(25);
    setModalVisible(false);
    setIsWinning(false);
  };

  const showModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const handleWin = (currentMoves) => {
    if (bestRecord === "" || currentMoves < bestRecord) {
      setBestRecord(currentMoves);
      showModal(
        `Congratulations! You won in ${currentMoves} moves! 🎉 This is your new best record!`
      );
    } else {
      showModal(
        `Congratulations! You won in ${currentMoves} moves! 🎉 Your best record is ${bestRecord}.`
      );
    }
    setIsWinning(true);
  };

  return (
    <div>
      {isWinning && <Confetti />}
      <div>
        <div className="scoreboard">
          <div className="stats">
            <p>Score: 🏆 {score}</p>
            <p>Moves: 🔄 {moves}</p>
            <p>Misses: ❌ {misses}</p>
            <p>Remaining Moves: ⏳ {remainingMoves}</p>
            <p>Best Record: 🥇 {bestRecord !== "" ? bestRecord : ""}</p>
          </div>
          <div className="actions">
            <button onClick={resetGame}>Restart</button>
          </div>
        </div>

        <div className="grid-container">
          {cards.map((card, index) => (
            <Card
              key={index}
              id={index}
              card={card}
              handleCardClick={handleCardClick}
              flipped={
                openCards.includes(index) || matchedCards.includes(index)
              }
            />
          ))}
        </div>
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>
              &times;
            </span>
            <p id="modal-text">{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameBoard;
