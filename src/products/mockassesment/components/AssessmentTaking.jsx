import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useMockAssessment } from '../context/MockAssessmentContext';
import { Clock, AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';

export default function AssessmentTaking({ assessment, onSubmit }) {
  const { userAnswers, setUserAnswers, timeRemaining, setTimeRemaining } = useMockAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const currentQuestion = assessment?.questions?.[currentQuestionIndex];

  if (!assessment || !assessment.questions || assessment.questions.length === 0) {
    return <div className="p-4 text-center text-gray-500">No questions available for this assessment.</div>;
  }

  // Timer effect
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleAutoSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, userAnswers]);

  const handleAutoSubmit = () => {
    onSubmit(userAnswers);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (value) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const answeredCount = Object.keys(userAnswers).length;
    const totalQuestions = assessment.questions.length;

    if (answeredCount < totalQuestions) {
      if (window.confirm(`You have answered ${answeredCount} out of ${totalQuestions} questions. Submit anyway?`)) {
        onSubmit(userAnswers);
      }
    } else {
      setShowConfirm(true);
    }
  };

  const confirmSubmit = () => {
    onSubmit(userAnswers);
    setShowConfirm(false);
  };

  const getQuestionTypeIcon = (type) => {
    switch (type) {
      case 'scenario-based':
        return <AlertCircle className="w-5 h-5 text-gray-900" />;
      case 'problem-solving':
        return <HelpCircle className="w-5 h-5 text-purple-600" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    }
  };

  const getQuestionTypeLabel = (type) => {
    switch (type) {
      case 'scenario-based':
        return 'Scenario-Based';
      case 'problem-solving':
        return 'Problem-Solving';
      default:
        return 'Multiple Choice';
    }
  };

  const answeredQuestions = Object.keys(userAnswers).length;
  const progress = (answeredQuestions / assessment.questions.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header with Timer and Progress */}
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{assessment.jobRole || assessment.topic}</h2>
              <p className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {assessment.questions.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${timeRemaining < 300 ? 'bg-red-100 text-red-700' : 'bg-gray-800 text-white'
                }`}>
                <Clock className="w-5 h-5" />
                <span className="font-mono font-semibold">{formatTime(timeRemaining)}</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gray-900 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            {answeredQuestions} of {assessment.questions.length} questions answered
          </p>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            {getQuestionTypeIcon(currentQuestion.type)}
            <span className="text-sm font-medium text-gray-600">
              {getQuestionTypeLabel(currentQuestion.type)}
            </span>
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
              {currentQuestion.difficulty}
            </span>
            <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-white">
              {currentQuestion.topic}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {currentQuestion.question}
          </h3>

          {/* Answer Options */}
          {currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'scenario-based' ? (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${userAnswers[currentQuestionIndex] === index
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={index}
                    checked={userAnswers[currentQuestionIndex] === index}
                    onChange={() => handleAnswerChange(index)}
                    className="mr-3"
                  />
                  <span className="text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          ) : (
            <div>
              <Input
                type="text"
                value={userAnswers[currentQuestionIndex] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="Enter your answer"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-2">
                Enter a numerical or text answer
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          variant="outline"
        >
          Previous
        </Button>

        <div className="flex gap-2">
          {currentQuestionIndex === assessment.questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              Submit Assessment
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              Next Question
            </Button>
          )}
        </div>
      </div>

      {/* Question Navigation */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Question Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {assessment.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`h-10 w-10 rounded-lg text-sm font-medium transition ${index === currentQuestionIndex
                    ? 'bg-gray-900 text-white'
                    : userAnswers[index] !== undefined
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="bg-white max-w-md w-full mx-4">
            <CardHeader>
              <CardTitle>Confirm Submission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Are you sure you want to submit your assessment? You won't be able to make changes after submission.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowConfirm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmSubmit}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                >
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
