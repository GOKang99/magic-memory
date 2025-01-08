import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  //useState를 사용하여 카드 상태를 관리
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0); //턴 수를 저장
  const [choiceOne, setChoiceOne] = useState(null); //첫 번째 선택한 카드
  const [disabled, setDisabled] = useState(false);
  const [choiceTwo, setChoiceTwo] = useState(null); //두 번째 선택한 카드
  //새 게임 시작

  const shuffledCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  };
  // console.log(cards); //카드 섞기 확인
  function handleChoice(card) {
    //카드 선택 이미 첫번째 선택 했으면 두번째에 저장.
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }
  //카드 선택 후 처리(두 카드가 같은지 확인), [카드]
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
        //카드가 같으면 카드를 유지
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  useEffect(() => shuffledCards(), []);
  //선택한 카드들 리셋
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turns + 1); //턴 수 증가
    setDisabled(false);
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      alert(`턴 수 :${turns}  모든 카드를 맞췄습니다!`);
    }
  }, [cards]);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffledCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            handleChoice={handleChoice}
            key={card.id}
            card={card}
            disabled={disabled}
          />
        ))}
      </div>
      <p>턴수:{turns}</p>
    </div>
  );
}

export default App;
