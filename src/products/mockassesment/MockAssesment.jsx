import React, { useState } from 'react';
import { MockAssessmentProvider, useMockAssessment } from './context/MockAssessmentContext';
import Dashboard from './components/Dashboard';
import AssessmentSelection from './components/AssessmentSelection';
import AssessmentTaking from './components/AssessmentTaking';
import ResultsView from './components/ResultsView';

function MockAssessmentContent() {
  const { submitAssessment, setResults } = useMockAssessment();
  const [view, setView] = useState('dashboard'); // 'dashboard', 'select', 'taking', 'results'
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [submittedAnswers, setSubmittedAnswers] = useState(null);

  const handleStartAssessment = () => {
    setView('select');
  };

  const handleAssessmentCreated = (assessment) => {
    setCurrentAssessment(assessment);
    setView('taking');
  };

  const handleAssessmentSubmit = async (answers) => {
    setSubmittedAnswers(answers);
    try {
      const result = await submitAssessment(answers);
      setAssessmentResult(result);
      setView('results');
    } catch (error) {
      console.error("Failed to submit assessment:", error);
      // Optionally handle error view
    }
  };

  const handleStartNew = () => {
    setView('dashboard');
    setCurrentAssessment(null);
    setAssessmentResult(null);
    setSubmittedAnswers(null);
    setResults(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gray-900 text-white py-5 pl-5">
        <h1 className="text-2xl font-bold">Mock Assessment</h1>
      </div>
      <div className="md:h-screen flex flex-col md:flex-row bg-gray-900">
        {/* Main Content */}
        <div className="min-h-screen md:w-full w-full h-full overflow-y-scroll bg-zinc-50 pb-8 px-4 pt-6">
          <div className="mx-3">
            {view === 'dashboard' && (
              <Dashboard onStartAssessment={handleStartAssessment} />
            )}
            {view === 'select' && (
              <AssessmentSelection onStart={handleAssessmentCreated} />
            )}
            {view === 'taking' && currentAssessment && (
              <AssessmentTaking 
                assessment={currentAssessment} 
                onSubmit={handleAssessmentSubmit}
              />
            )}
            {view === 'results' && assessmentResult && currentAssessment && (
              <ResultsView 
                result={assessmentResult}
                assessment={currentAssessment}
                onStartNew={handleStartNew}
                userAnswers={submittedAnswers}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MockAssesment() {
  return (
    <MockAssessmentProvider>
      <MockAssessmentContent />
    </MockAssessmentProvider>
  );
}
