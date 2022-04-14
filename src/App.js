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
  const [timer, setTimer] = useState(30);
  const [answerIndex, setAnswerIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setQuestions(data);
    };
    fetchData();
  }, []);
  // const countDown = () => {
  //   console.log(timer);
  //   while (timer > 0) {
  //     const timer = setTimeout(() => {
  //       setTimer(timer - 1);
  //     }, 1000);
  //   }
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // };
  const handleStartGame = () => {
    setStart(true);
    // setAnswerIndex(+questions[index].solutionIndex);
  };
  const handleSubmitAnswer = () => {
    setDisabled(true);
    if (+questions[index].solutionIndex === +answer) {
      //turn the selected answer green
      setCorrect(true);
    } else {
      //turn the correct answer red;
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
    if (index <= 3) {
      setIndex(index + 1);
      setAnswerIndex(questions[index + 1].solutionIndex);
      setCorrect(false);
      setIncorrect(false);
    }
  };
  return (
    <div>
      {!start && <button onClick={handleStartGame}>Start the Game</button>}
      {start && (
        <div>
          <h1>{timer}</h1>
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
          {/* {correct && <h1>Correct!!!</h1>}
          {incorrect && <h1>Incorrect..</h1>} */}
          {correct && index < 2 && <button onClick={handleNext}>Next</button>}
          {incorrect && index < 2 && <button onClick={handleNext}>Next</button>}
        </div>
      )}
    </div>
  );
}

export default App;
