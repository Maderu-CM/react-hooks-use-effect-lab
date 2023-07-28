import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prevTime) => prevTime - 1);
      } else {
        // Time is up, reset the timer and trigger onAnswered with false
        setTimeRemaining(10);
        onAnswered(false);
      }
    }, 1000);

    // Clean up the timer when the component unmounts or when the effect runs again
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    // Reset the timer and call onAnswered with the result of the answer
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
