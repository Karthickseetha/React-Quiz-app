import React, { useEffect } from 'react';

const QuestionCard = ({ questionNumber, totalQuestions, question, handleAnswer, isTiming, moveToNextQuestion }) => {
  const handleButtonClick = (option) => {
    if (isTiming) {
      handleAnswer(option);
    }
  };

  useEffect(() => {
    if (isTiming) {
      const timer = setTimeout(() => {
        moveToNextQuestion();
      }, 10000); // 10 seconds timer

      return () => clearTimeout(timer);
    }
  }, [isTiming, moveToNextQuestion]);

  return (
    <div className="container   grid items-center justify-center  bg-white p-4 rounded shadow">
      <p className="text-sm mb-2">
        Question {questionNumber + 1} of {totalQuestions}
      </p>
      <h2 className="text-lg font-semibold mb-4" dangerouslySetInnerHTML={{ __html: question.question }} />
      
      <div>
        {question.options.map((option, index) => (
          <div className='grid '>
          <button
            key={index}
            className={` bg-gray-500 text-white  px-4 py-2 mr-2 mb-2
            hover:bg-gray-700  ${!isTiming && 'opacity-50'}`}
            onClick={() => handleButtonClick(option)}
            disabled={!isTiming}
          >
            {option}
          </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
