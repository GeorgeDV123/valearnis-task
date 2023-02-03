import { useEffect, useState } from "react";
import { auth } from "./Firebase";

export function Quiz() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  // API request for trivia questions
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [incorrect1, setIncorrect1] = useState([]);
  const [incorrect2, setIncorrect2] = useState([]);
  const [incorrect3, setIncorrect3] = useState([]);
  const [incorrect4, setIncorrect4] = useState([]);
  const [incorrect5, setIncorrect5] = useState([]);

  function handleErrors(response: any) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  const fetchQuestions = () => {
    fetch(
      "https://the-trivia-api.com/api/questions?limit=6&difficulty=medium&tags=mythology"
    )
      .then(handleErrors)
      .catch((error) =>
        window.prompt(error.message, "Cannot get trivia questions :(")
      )
      .then((response) => {
        return response.json();
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
        setIncorrect1(incorrect[0]);
        setIncorrect2(incorrect[1]);
        setIncorrect3(incorrect[2]);
        setIncorrect4(incorrect[3]);
        setIncorrect5(incorrect[4]);
      });
    return;
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Array of random questions
  const questions1 = [
    {
      text: questions[0],
      options: [
        { id: 0, text: incorrect1[0], isCorrect: false },
        { id: 1, text: incorrect1[1], isCorrect: false },
        { id: 2, text: incorrect1[2], isCorrect: false },
        { id: 3, text: answer[0], isCorrect: true },
      ],
    },
    {
      text: questions[1],
      options: [
        { id: 0, text: incorrect2[0], isCorrect: false },
        { id: 3, text: answer[1], isCorrect: true },
        { id: 2, text: incorrect2[1], isCorrect: false },
        { id: 1, text: incorrect2[2], isCorrect: false },
      ],
    },
    {
      text: questions[2],
      options: [
        { id: 3, text: answer[2], isCorrect: true },
        { id: 1, text: incorrect3[0], isCorrect: false },
        { id: 2, text: incorrect3[1], isCorrect: false },
        { id: 0, text: incorrect3[2], isCorrect: false },
      ],
    },
    {
      text: questions[3],
      options: [
        { id: 0, text: incorrect4[0], isCorrect: false },
        { id: 1, text: incorrect4[1], isCorrect: false },
        { id: 2, text: incorrect4[2], isCorrect: false },
        { id: 3, text: answer[3], isCorrect: true },
      ],
    },
    {
      text: questions[4],
      options: [
        { id: 0, text: incorrect5[0], isCorrect: false },
        { id: 1, text: incorrect5[1], isCorrect: false },
        { id: 3, text: answer[4], isCorrect: true },
        { id: 2, text: incorrect5[2], isCorrect: false },
      ],
    },
  ];

  // User clicks on option
  const optionClicked = (isCorrect: boolean) => {
    // If correct, +1 score
    if (isCorrect) {
      setScore(score + 1);
    }
    if (index + 1 < questions1.length) {
      setIndex(index + 1);
    } else {
      setShowResults(true);
    }
  };

  // Reset the game
  const restartGame = () => {
    setScore(0);
    setIndex(0);
    setShowResults(false);
  };

  // Return to previous question
  const goBack = () => {
    if (score <= 0) {
      setScore(0);
      setIndex(index - 1);
      return;
    }
    setIndex(index - 1);
    setScore(score - 1);
  };

  // Depending on the score, show / hide the button
  const btn = document.getElementById("back-btn");
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
  if (index > 4) {
    if (btn) {
      btn.style.display = "none";
    }
  }

  return (
    <>
      {/* Final Results */}
      <section className="quiz-main">
        <div className="quiz-area">
          {showResults ? (
            <div className="results">
              <h2 style={{ marginTop: "2rem" }}>Final Results</h2>
              <h2>
                {score} out of {questions1.length} correct - (
                {(score / questions1.length) * 100}%)
              </h2>
              <span className="finish-btns">
                <button className="restart" onClick={() => restartGame()}>
                  Restart game
                </button>
                <button className="sign-out" onClick={() => auth.signOut()}>
                  Sign Out
                </button>
              </span>
            </div>
          ) : (
            <div className="questions">
              {/* Quiz Questions */}
              <h2>Mythology Quiz</h2>
              <h2 style={{ marginBottom: "2rem" }}>Score: {score}</h2>
              <h3>
                Question: {index + 1} out of {questions1.length}
              </h3>
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
              <button id="back-btn" onClick={goBack}>
                ← Back
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
