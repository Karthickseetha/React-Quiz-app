import React, { useState, useEffect } from 'react';
import { QuestionCard,ScoreCard,Timer} from './components';
import quizTopics from './constants/index';
const App = () => {
  // Manages fetched questions from API
  const [questions, setQuestions] = useState([]);
  // Tracks the index of the current question being displayed
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // For keep and track the user's score
  const [score, setScore] = useState(0);
  // Controls whether to display the final score
  const [showScore, setShowScore] = useState(false);
  // Stores the selected quiz topic
  const [selectedTopic, setSelectedTopic] = useState('');
  // Tracks whether the quiz has started
  const [quizStarted, setQuizStarted] = useState(false);
  // Manages the timer for each question
  const [isTiming, setIsTiming] = useState(false);


  // Fetch questions from API based on selected topic and when the quiz starts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (selectedTopic && quizStarted) {
          const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${selectedTopic}&type=multiple`);
          const data = await response.json();
          
          const formattedQuestions = data.results.map((question) => ({
            question: question.question,
            correct_answer: question.correct_answer,
            options: [...question.incorrect_answers, question.correct_answer],
          }));
          setQuestions(formattedQuestions);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [selectedTopic, quizStarted]);


  // For handle user's answer and updates the score.
  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
    moveToNextQuestion();
  };
//for Moves the next question
//  and display the final score if no questions are there
  const moveToNextQuestion = () => {
    setIsTiming(false);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setIsTiming(true);
    } else {
      setShowScore(true);
    }
  };
//  update the selected topic
  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  //  Start the quiz and initiates timer
  const handleStartQuiz = () => {
    setQuizStarted(true);
    setIsTiming(true);
  };


//Resets the quiz state to its initial values 
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setQuizStarted(false);
    setIsTiming(false);
    setSelectedTopic('');
  };

  return (
    <main className=" flex justify-center items-center
    min-h-screen  bg-slate-500 
   ">
    
    <div className="container mx-auto p-4 text-center">

      {!quizStarted && (
        <>
        <h1 className='text-black font-bold
    items-center justify-center  text-4xl mb-5 
    '>Quiz App</h1>
        <div className='grid items-center justify-center '>
         <h1 className="text-3xl font-bold mb-4">Select a Quiz Topic</h1>
          <select className="mb-4 p-2 bg-gray-600 hover:cursor-pointer" onChange={handleTopicChange}>
            <option value="" className='text-black hover:cursor-pointer' selected disabled>Select a topic</option>
            <option value="9" className='text-black hover:cursor-pointer'>General Knowledge</option>
            <option value="18" className='text-black hover:cursor-pointer'>Science: Computers</option>
            <option value="23" className='text-black hover:cursor-pointer'>History</option>

            
          </select>
          {selectedTopic && (
            <button className="bg-gray-700 text-white px-4 py-2 
            hover:border  rounded mr-2 mb-4 hover:border-white" onClick={handleStartQuiz}>
              Start Quiz
            </button>

          )}
          </div>
        </>
      )}
      {quizStarted && questions.length > 0 && !showScore && (
        <>
          <QuestionCard
            question={questions[currentQuestion]}
            handleAnswer={handleAnswer}
            questionNumber={currentQuestion}
            totalQuestions={questions.length}
            isTiming={isTiming}
            moveToNextQuestion={moveToNextQuestion}
          />
          <Timer key={currentQuestion} time={10} onTimeout={moveToNextQuestion} isTiming={isTiming} />
        </>
      )}
      {showScore && (
        <>
          <ScoreCard score={score} />
          <button className="bg-gray-700 text-white px-4 py-2 rounded mt-4 hover:border hover:border-white" onClick={restartQuiz}>
            Restart Quiz
          </button>
        </>
        
      )}
      
    </div>
    
    </main>
  );
  
}
 
export default App;
