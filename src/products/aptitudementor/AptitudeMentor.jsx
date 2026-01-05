import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import PracticeSection from './PracticeSection';
import LearnSection from './LearnSection';
import QuestionPage from './QuestionPage';
import LearnPage from './LearnPage';
import { aptitudeMentor } from '../../lib/api';

export default function AptitudeMentor() {
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState('practice');

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const progress = await aptitudeMentor.progress.get();
        if (progress && progress.activeTab) {
          setActiveTab(progress.activeTab);
        }
      } catch (err) {
        console.error('Error loading aptitude progress:', err);
      }
    };
    loadProgress();
  }, []);

  const handleTabChange = async (tab) => {
    setActiveTab(tab);
    try {
      await aptitudeMentor.progress.save({ activeTab: tab });
    } catch (err) {
      console.error('Error saving active tab:', err);
    }
  };

  const showNavbar = !location.pathname.includes('/practice/') && !location.pathname.includes('/learn/');

  return (
    <div className="flex flex-col min-h-screen">
      {showNavbar && (
        <div className="bg-gray-900 text-white py-5 px-5">
          <h1 className="text-2xl font-bold">Aptitude Mentor</h1>
        </div>
      )}
      <div className="flex-1 p-0 bg-gray-50">
        {showNavbar ? (
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex space-x-2 mb-8 bg-white p-1.5 rounded-2xl border-2 border-gray-100 w-fit shadow-sm">
              <Button
                variant={activeTab === 'practice' ? 'default' : 'ghost'}
                className={`px-10 py-6 rounded-xl font-bold transition-all duration-300 ${activeTab === 'practice' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                onClick={() => handleTabChange('practice')}
              >
                Practice
              </Button>
              <Button
                variant={activeTab === 'learn' ? 'default' : 'ghost'}
                className={`px-10 py-6 rounded-xl font-bold transition-all duration-300 ${activeTab === 'learn' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                onClick={() => handleTabChange('learn')}
              >
                Learn
              </Button>
            </div>

            <Routes>
              <Route path="/" element={activeTab === 'practice' ? <PracticeSection /> : <LearnSection />} />
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route path="/practice/:mainTopic/:subTopic" element={<QuestionPage />} />
            <Route path="/learn/:mainTopic/:subTopic" element={<LearnPage />} />
          </Routes>
        )}
      </div>
    </div>
  );
}
