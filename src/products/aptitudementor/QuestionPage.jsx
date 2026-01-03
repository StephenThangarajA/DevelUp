import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Dialog } from '../../components/ui/dialog';
import { CircularProgressBar } from '@/components/ui/circular-progressbar';

const QuestionPage = () => {
  const { mainTopic, subTopic } = useParams();
  console.log('Received mainTopic:', mainTopic, 'subTopic:', subTopic);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use import.meta.glob for dynamic imports in Vite
        const modules = import.meta.glob('./practicequestions/**/*.js');
        const path = `./practicequestions/${mainTopic}/${subTopic}.js`;

        if (modules[path]) {
          const module = await modules[path]();
          setQuestions(module.default);
          setCurrentQuestionIndex(0);
          setSelectedAnswer(null);
          setShowFeedback(false);
        } else {
          console.error(`Module not found: ${path}`);
          setError('Questions for this topic are not available yet.');
          setQuestions([]);
        }
      } catch (err) {
        console.error(`Error loading questions:`, err);
        setError('Failed to load questions. Please try again.');
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    if (mainTopic && subTopic) {
      loadQuestions();
    }
  }, [mainTopic, subTopic]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setShowFeedback(false);
  };

  const handleSubmitAnswer = () => {
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Optionally navigate back to practice section or show completion message
      // Mark subtopic as completed in localStorage
      const savedCompleted = JSON.parse(localStorage.getItem('completedSubtopics')) || {};
      if (!savedCompleted[mainTopic]) savedCompleted[mainTopic] = [];
      if (!savedCompleted[mainTopic].includes(subTopic)) {
        savedCompleted[mainTopic].push(subTopic);
        localStorage.setItem('completedSubtopics', JSON.stringify(savedCompleted));
      }
      setShowCompletionDialog(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!currentQuestion) {
    return <p>No questions available for this topic.</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-5 px-6 shadow-lg">
        <h1 className="text-2xl font-bold">Aptitude Mentor <span className="text-gray-400 font-normal">/ Practice</span></h1>
      </div>

      <div className="flex-1 p-0 sm:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between px-4 sm:px-0">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                {subTopic.replace(/([A-Z])/g, ' $1')}
              </h2>
              <p className="text-gray-500 font-medium">Question {currentQuestionIndex + 1} of {questions.length}</p>
            </div>
            <CircularProgressBar
              progress={((currentQuestionIndex + 1) / questions.length) * 100}
              size={64}
              strokeWidth={6}
              className="text-gray-900"
            />
          </div>

          <Card className="overflow-hidden border-2 border-gray-100 shadow-xl rounded-[2rem]">
            <CardContent className="p-0">
              <div className="p-8 sm:p-12 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <span className="text-xs font-bold uppercase tracking-widest">Question</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 leading-tight">
                    {currentQuestion.question}
                  </p>
                </div>

                <div className="grid gap-3">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      variant="outline"
                      className={`
                        h-auto py-6 px-8 justify-start text-left text-lg rounded-2xl border-2 transition-all duration-200
                        ${selectedAnswer === index
                          ? 'bg-gray-900 text-white border-gray-900 shadow-lg scale-[1.02]'
                          : 'bg-white border-gray-100 hover:border-gray-900 hover:bg-gray-50'}
                      `}
                    >
                      <span className={`
                        w-8 h-8 rounded-lg flex items-center justify-center mr-4 text-sm font-bold
                        ${selectedAnswer === index ? 'bg-white/20' : 'bg-gray-100'}
                      `}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </Button>
                  ))}
                </div>

                <div className="pt-8 border-t border-gray-100 flex justify-between items-center">
                  <Button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    variant="ghost"
                    className="rounded-full px-6"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                  </Button>

                  {!showFeedback ? (
                    <Button
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      className="bg-gray-900 hover:bg-black text-white px-10 py-6 rounded-full font-bold shadow-xl"
                    >
                      Check Answer
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextQuestion}
                      className="bg-gray-900 hover:bg-black text-white px-10 py-6 rounded-full font-bold shadow-xl"
                    >
                      {currentQuestionIndex === questions.length - 1 ? "Complete Practice" : "Next Question"}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>

                {showFeedback && (selectedAnswer !== null) && (
                  <div className={`
                    mt-8 p-8 rounded-3xl animate-in slide-in-from-top duration-500
                    ${currentQuestion.options[selectedAnswer] === currentQuestion.correctAnswer
                      ? 'bg-green-50 border-2 border-green-100'
                      : 'bg-red-50 border-2 border-red-100'}
                  `}>
                    <div className="flex items-center space-x-3 mb-4">
                      {currentQuestion.options[selectedAnswer] === currentQuestion.correctAnswer ? (
                        <>
                          <div className="bg-green-500 rounded-full p-1"><CheckCircle2 className="w-5 h-5 text-white" /></div>
                          <p className="text-green-900 text-xl font-black uppercase tracking-tight">Correct Answer!</p>
                        </>
                      ) : (
                        <>
                          <div className="bg-red-500 rounded-full p-1 font-bold text-white w-7 h-7 flex items-center justify-center">!</div>
                          <p className="text-red-900 text-xl font-black uppercase tracking-tight">Incorrect</p>
                        </>
                      )}
                    </div>

                    {currentQuestion.options[selectedAnswer] !== currentQuestion.correctAnswer && (
                      <p className="text-red-800 font-bold mb-4">
                        The correct answer was: <span className="underline">{currentQuestion.correctAnswer}</span>
                      </p>
                    )}

                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Explanation</p>
                      <p className="text-gray-700 leading-relaxed font-medium">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog
        isOpen={showCompletionDialog}
        onClose={() => setShowCompletionDialog(false)}
        title="Practice Completed"
        description="You have finished all questions in this subtopic!"
      >
        <Button
          onClick={() => {
            setShowCompletionDialog(false);
            setCurrentQuestionIndex(0);
            setSelectedAnswer(null);
            setShowFeedback(false);
          }}
        >
          Practice Again
        </Button>
        <Button
          onClick={() => {
            setShowCompletionDialog(false);
            navigate('/aptitudementor');
          }}
        >
          Home
        </Button>
      </Dialog>
    </div>
  );
};

export default QuestionPage;
