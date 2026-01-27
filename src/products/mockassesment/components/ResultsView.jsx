import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Award, TrendingUp, Target, AlertCircle, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

export default function ResultsView({ result, assessment, onStartNew, userAnswers: propUserAnswers }) {
  if (!result || !result.score) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-lg border border-gray-200 shadow-sm">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Result Data Unavailable</h2>
        <p className="text-gray-600 mb-6">There was an issue loading your assessment results.</p>
        <Button onClick={onStartNew}>Return to Dashboard</Button>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 75) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getPerformanceMessage = (score) => {
    if (score >= 90) return "Outstanding! You've mastered these concepts.";
    if (score >= 75) return "Excellent work! You have a strong understanding.";
    if (score >= 60) return "Good effort! Keep practicing to improve.";
    return "Keep learning! Review the fundamentals and try again.";
  };

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <Card className={`bg-white border-2 ${getScoreBgColor(result.score.percentage)}`}>
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-900 p-4 rounded-full">
              <Award className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete!</h2>
          <p className="text-lg text-gray-600 mb-6">{getPerformanceMessage(result.score.percentage)}</p>
          
          <div className="flex justify-center items-baseline gap-2 mb-4">
            <span className={`text-6xl font-bold ${getScoreColor(result.score.percentage)}`}>
              {result.score.percentage}
            </span>
            <span className="text-2xl text-gray-600">%</span>
          </div>

          <div className="flex justify-center gap-6 text-sm text-gray-600">
            <div>
              <span className="font-semibold text-gray-900">{result.score.correct}</span> Correct
            </div>
            <div>
              <span className="font-semibold text-gray-900">{result.score.total - result.score.correct}</span> Incorrect
            </div>
            <div>
              <span className="font-semibold text-gray-900">{result.score.total}</span> Total
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Topic-wise Scores */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Target className="w-5 h-5" />
            Topic-wise Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(result.topicScores).map(([topic, topicResult]) => {
              const percentage = topicResult.percentage;
              return (
                <div key={topic}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{topic}</span>
                    <span className={`font-semibold ${getScoreColor(percentage)}`}>
                      {percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        percentage >= 75 ? 'bg-green-500' : percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {topicResult.correct} out of {topicResult.total} questions correct
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Strengths */}
      {result.strengths.length > 0 && (
        <Card className="bg-white border-green-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2 text-green-700">
              <CheckCircle2 className="w-5 h-5" />
              Your Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {result.strengths.map((strength, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {strength}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Great job! Continue to build on these strong areas and apply them in practical scenarios.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Weak Areas */}
      {result.weaknesses.length > 0 && (
        <Card className="bg-white border-red-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              Areas to Improve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {result.weaknesses.map((weakness, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                >
                  {weakness}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Focus on reviewing these topics. Practice more questions and study the concepts thoroughly.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Feedback and Suggestions */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2 text-gray-900">
            <Lightbulb className="w-5 h-5" />
            Feedback & Improvement Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.feedback.map((feedbackItem, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-200 rounded-lg">
                <Lightbulb className="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{feedbackItem}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Question Review */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Question Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {assessment.questions.map((question, index) => {
              const userAnswer = propUserAnswers?.[index] ?? result.userAnswers?.[index];
              let isCorrect = false;
              
              if (userAnswer !== undefined && userAnswer !== null && userAnswer !== '') {
                if (question.type === 'multiple-choice' || question.type === 'scenario-based') {
                  isCorrect = parseInt(userAnswer) === question.correctAnswer;
                } else if (question.type === 'problem-solving') {
                  const userNum = parseFloat(userAnswer);
                  const correctNum = parseFloat(question.correctAnswer);
                  if (!isNaN(userNum) && !isNaN(correctNum)) {
                    const tolerance = question.tolerance || 0.01;
                    isCorrect = Math.abs(userNum - correctNum) <= tolerance;
                  }
                }
              }

              return (
                <div
                  key={index}
                  className={`p-4 border rounded-lg ${
                    isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-2">
                        Q{index + 1}: {question.question}
                      </p>
                      
                      {question.options && (
                        <div className="space-y-1 mb-2">
                          {question.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`text-sm p-2 rounded ${
                                optIndex === question.correctAnswer
                                  ? 'bg-green-100 text-green-800 font-semibold'
                                  : optIndex === userAnswer && !isCorrect
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-50 text-gray-700'
                              }`}
                            >
                              {option}
                              {optIndex === question.correctAnswer && ' (Correct)'}
                              {optIndex === userAnswer && !isCorrect && ' (Your Answer)'}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {!question.options && (
                        <div className="space-y-1 mb-2">
                          <p className="text-sm">
                            <span className="font-semibold">Correct Answer:</span>{' '}
                            <span className="text-green-700">{question.correctAnswer}</span>
                          </p>
                          {userAnswer !== undefined && (
                            <p className="text-sm">
                              <span className="font-semibold">Your Answer:</span>{' '}
                              <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                                {userAnswer || 'Not answered'}
                              </span>
                            </p>
                          )}
                        </div>
                      )}

                      {question.explanation && (
                        <div className="mt-2 p-2 bg-gray-200 rounded text-sm text-gray-700">
                          <span className="font-semibold">Explanation: </span>
                          {question.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={onStartNew}
          className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
        >
          Take Another Assessment
        </Button>
        <Button
          onClick={() => window.print()}
          variant="outline"
          className="flex-1"
        >
          Print Results
        </Button>
      </div>
    </div>
  );
}
