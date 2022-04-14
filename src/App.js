import { useEffect, useState } from 'react';
import { data } from './services/data.js';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [timer, setTimer] = useState(5);
  const [answerIndex, setAnswerIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [hideTimer, setHideTimer] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setQuestions(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (start && !hideTimer) {
      timer > 0 &&
        setTimeout(() => {
          setTimer(timer - 1);
        }, 1000);
    }
    if (!hideTimer && timer === 0) {
      setDisabled(true);
      setAnswer(null);
      setIncorrect(true);
    }
  }, [hideTimer, start, timer]);

  const handleStartGame = () => {
    setStart(true);
  };
  const handleSubmitAnswer = () => {
    setDisabled(true);
    //hide timer when answer is submitted
    setHideTimer(true);
    if (+questions[index].solutionIndex === +answer) {
      setCorrect(true);
      setScore(score + 1);
    } else {
      setIncorrect(true);
    }
  };
  const handleClasses = (index) => {
    if ((correct && +index !== +answerIndex) || (incorrect && +index !== +answerIndex)) {
      return 'gray';
    }
    if (correct && +index === +answerIndex) {
      return 'green';
    }
    if (incorrect && +index === +answerIndex) {
      return 'red';
    }
  };
  const handleNext = async () => {
    setDisabled(false);
    setTimer(5);
    setHideTimer(false);
    if (index <= 3) {
      setIndex(index + 1);
      setAnswerIndex(questions[index + 1].solutionIndex);
      setCorrect(false);
      setIncorrect(false);
    }
  };
  const handleTryAgain = () => {
    setScore(0);
    setIndex(0);
    setAnswerIndex(0);
    setCorrect(null);
    setIncorrect(null);
    setDisabled(false);
    setHideTimer(false);
    setTimer(5);
  };
  return (
    <div>
      {!start && <button onClick={handleStartGame}>Start the Game</button>}
      {start && (
        <div>
          <h1 className={hideTimer ? 'hidden' : ''}>{timer}</h1>
          <h1>{questions[index].question}</h1>
          {questions[index].options.map((option, index) => (
            <section key={index}>
              <label className={handleClasses(index)}>{option}</label>
              <input
                type="radio"
                name="question"
                value={index}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </section>
          ))}
          <button disabled={disabled} onClick={handleSubmitAnswer}>
            Submit Answer!
          </button>
          {correct && index < 2 && <button onClick={handleNext}>Next</button>}
          {incorrect && index < 2 && <button onClick={handleNext}>Next</button>}
          {(correct || incorrect) && index === 2 && (
            <button onClick={() => handleTryAgain()}>Try again?</button>
          )}
          {(correct || incorrect) && (
            <h1>
              Score: {score} / {index + 1}
            </h1>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
