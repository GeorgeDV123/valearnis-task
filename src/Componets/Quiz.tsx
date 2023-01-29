import { useEffect, useState } from "react";
import { auth } from "./Firebase";

export function Quiz() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(1);

  // API request for trivia questions
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [incorrect, setIncorrect] = useState([]);

  function handleErrors(response: any) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  const fetchUserData = () => {
    fetch(
      "https://the-trivia-api.com/api/questions?categories=food_and_drink&limit=5&difficulty=medium"
    )
      .then(handleErrors)
      .catch((error) =>
        window.prompt(error.message, "Cannot get trivia questions :(")
      )
      .then(async (response) => {
        return await response.json();
      })
      .then((data) => {
        const text = data.map((obj: { question: string }) => obj.question);
        const correct = data.map(
          (obj: { correctAnswer: string }) => obj.correctAnswer
        );
        const incorrect = data.map(
          (obj: { incorrectAnswers: string }) => obj.incorrectAnswers
        );

        setQuestions(text);
        setAnswer(correct);
        setIncorrect(incorrect);
      });
  };

  //use await here I think

  useEffect(() => {
    fetchUserData();
  }, []);

  const questions1 = [
    {
      text: questions[0],
      options: [
        { id: 0, text: incorrect[0], isCorrect: false },
        { id: 1, text: incorrect[0], isCorrect: false },
        { id: 2, text: incorrect[0], isCorrect: false },
        { id: 3, text: answer[0], isCorrect: true },
      ],
    },
    {
      text: questions[1],
      options: [
        { id: 0, text: incorrect[1], isCorrect: false },
        { id: 3, text: answer[1], isCorrect: true },
        { id: 2, text: incorrect[1], isCorrect: false },
        { id: 1, text: incorrect[1], isCorrect: false },
      ],
    },
    {
      text: questions[2],
      options: [
        { id: 3, text: answer[2], isCorrect: true },
        { id: 1, text: incorrect[2], isCorrect: false },
        { id: 2, text: incorrect[2], isCorrect: false },
        { id: 0, text: incorrect[2], isCorrect: false },
      ],
    },
    {
      text: questions[3],
      options: [
        { id: 0, text: incorrect[3], isCorrect: false },
        { id: 1, text: incorrect[3], isCorrect: false },
        { id: 2, text: incorrect[3], isCorrect: false },
        { id: 3, text: answer[3], isCorrect: true },
      ],
    },
    {
      text: questions[4],
      options: [
        { id: 0, text: incorrect[4], isCorrect: false },
        { id: 1, text: incorrect[4], isCorrect: false },
        { id: 3, text: answer[4], isCorrect: true },
        { id: 2, text: incorrect[4], isCorrect: false },
      ],
    },
  ];

  /* A possible answer was clicked */
  const optionClicked = (isCorrect: boolean) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }
    if (index + 1 < questions1.length) {
      setIndex(index + 1);
    } else {
      setShowResults(true);
    }
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setIndex(0);
    setShowResults(false);
  };

  const btn = document.getElementById("btn1");
  if (index > 0) {
    if (btn) {
      btn.style.display = "block";
    }
  }
  if (index < 1) {
    if (btn) {
      btn.style.display = "none";
    }
  }

  return (
    <div className="App">
      <h1>USA Quiz 🇺🇸</h1>
      <h2>Score: {score}</h2>

      {showResults ? (
        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {questions1.length} correct - (
            {(score / questions1.length) * 100}%)
          </h2>
          <button onClick={() => restartGame()}>Restart game</button>
        </div>
      ) : (
        <div className="question-card">
          <h2>
            Question: {index + 1} out of {questions1.length}
          </h2>
          <h3 className="question-text">{questions1[index].text}</h3>
          <ul>
            {questions1[index].options.map((option) => {
              return (
                <li
                  key={option.id}
                  onClick={() => optionClicked(option.isCorrect)}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <button id="btn1" onClick={() => setIndex(index - 1)}>
        back
      </button>
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    </div>
  );
}
