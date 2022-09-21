import { useEffect, useState } from "react";
import "./App.css";
import LeaderList from "./components/LeaderList";
import "./styles/regis.scss";
import { defaultQuestions } from "./mockData/questions";
import { getItem, setItem } from "./utility/storage";
import useTimer from "./hooks/useTimer";

const questionLimit = 5;

function App() {
  const { timer, start, stop } = useTimer();

  const [board, setBoard] = useState([]);

  const [totalQuestions, setTotalQuestions] = useState(
    getRandomQuestions(questionLimit)
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [regis, setRegis] = useState(true);
  const [name, setName] = useState("");

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < 5) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);

      const player = { score, name, timer };

      stop();

      setBoard((board) => {
        const newBoard = [...board, player];
        setItem("board", newBoard);
        return newBoard;
      });
    }
  };

  const refresh = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTotalQuestions(getRandomQuestions(questionLimit));
  };

  const onClickAddName = () => {
    setRegis(false);
    start();
  };

  useEffect(() => {
    const board = getItem("board");

    if (board) setBoard(board);
  }, []);

  return (
    <div className="app">
      {regis && (
        <div>
          <div className="registration">
            <input
              className="input__regis"
              type="text"
              placeholder="Введите свое имя"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <button onClick={() => onClickAddName()} className="button__regis">
            Начать тест
          </button>
        </div>
      )}

      {!regis && showScore && (
        <div className="section__score">
          <div>
          </div>{" "}
          <button className="refresh__btn" onClick={refresh}>
            Пройти тест занаво
          </button>
          <LeaderList board={board} />
        </div>
      )}

      {!regis && !showScore && (
        <div className="quizz">
          <div className="questions__section">
            <div className="question__count">
              <span>Вопрос {currentQuestion + 1}</span> / {5}
            </div>
            <div className="questions__text">
              {totalQuestions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer__section">
            {totalQuestions[currentQuestion].answerOptions.map((item) => (
              <button onClick={() => handleAnswerOptionClick(item.isCorrect)}>
                {item.asnwerText}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

const getRandomQuestions = (count) => {
  const copyQuestions = [...defaultQuestions];

  const questions = [];

  for (let number = 0; number < count; number++) {
    const randomNumber = random(0, count - number);
    const question = copyQuestions.splice(randomNumber, 1);
    questions.push(...question);
  }

  console.log(questions);

  return questions;
};

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
