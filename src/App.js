import { useEffect, useState } from 'react';
import { data } from './services/data.js';

function App() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setQuestions(data);
    };
    fetchData();
  }, []);

  const handleStartGame = () => {
    setStart(true);
  };

  console.log(questions[0]);
  return (
    <div>
      {!start && <button onClick={handleStartGame}>Start the Game</button>}
      {start && (
        <div>
          <h1>{questions[index].question}</h1>
          {questions[index].options.map((option, index) => (
            <section key={index}>
              <label>{option}</label>
              <input type="radio" name="question" value={option} />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
