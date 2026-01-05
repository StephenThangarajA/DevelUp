import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../components/ui/accordion';
import { ChevronLeft, ChevronRight, CheckCircle, Download, BookOpen } from 'lucide-react';
import { CircularProgressBar } from '@/components/ui/circular-progressbar';
import { aptitudeMentor } from '../../lib/api';
import aptitudeBook from './book/Quantitative Aptitude for Competitive Examinations by R.S. Aggarwal.pdf';

const TOPICS_STRUCTURE = {
  'logicalreasoning': [
    'Analogies',
    'BloodRelations',
    'CauseEffect',
    'CodingDecoding',
    'DirectionSense',
    'Puzzles',
    'SeatingArrangement',
    'SeriesCompletion',
    'StatementsConclusions',
    'Syllogisms',
  ],
  'quantitativeaptitude': [
    'Algebra',
    'Average',
    'DataInterpretation',
    'GeometryMensuration',
    'HCFLCM',
    'NumberSystem',
    'Percentage',
    'PermutationsCombinations',
    'Probability',
    'ProfitLoss',
    'RatioProportion',
    'SimpleCompoundInterest',
    'Simplification',
    'SpeedDistance',
    'TimeWork',
  ],
  'verbalability': [
    'ErrorDetection',
    'FillintheBlanks',
    'IdiomsPhrases',
    'OneWordSubstitutions',
    'ParaJumbles',
    'ReadingComprehension',
    'SentenceCorrection',
    'SynonymsAntonyms',
  ],
};

export default function LearnSection() {
  const navigate = useNavigate();
  const [learnedSubtopics, setLearnedSubtopics] = useState({});

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const progress = await aptitudeMentor.progress.get();
        if (progress && progress.learnedSubtopics) {
          setLearnedSubtopics(progress.learnedSubtopics);
        }
      } catch (err) {
        console.error('Error loading learned subtopics:', err);
      }
    };
    loadProgress();
  }, []);

  const calculateProgress = (mainTopic) => {
    const totalSubtopics = TOPICS_STRUCTURE[mainTopic].length;
    if (totalSubtopics === 0) return 0;
    const learned = learnedSubtopics[mainTopic] ? learnedSubtopics[mainTopic].length : 0;
    return (learned / totalSubtopics) * 100;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Book Download Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gray-900 text-white p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-blue-300">
              <BookOpen className="w-3 h-3" />
              <span>Premium Resource</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Master Aptitude with <br />R.S. Aggarwal
            </h2>
            <p className="text-gray-400 max-w-md text-lg">
              Download the legendary comprehensive guide for competitive examinations.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 rounded-full font-bold px-8 shadow-xl transform transition hover:scale-105 mt-4"
            >
              <a href={aptitudeBook} download="Quantitative Aptitude - R.S. Aggarwal.pdf" className="flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </a>
            </Button>
          </div>
          <div className="hidden lg:block">
            <div className="w-48 h-64 bg-white/5 rounded-2xl border-2 border-white/10 rotate-3 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="text-center space-y-2">
                <BookOpen className="w-12 h-12 mx-auto text-blue-400 opacity-50" />
                <p className="text-[10px] font-bold uppercase tracking-tighter text-gray-500">Aptitude Book</p>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Topics Section */}
      <div className="space-y-6">
        <div className="flex items-end justify-between px-2">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Learn Topics</h2>
            <p className="text-gray-500 font-medium">Select a category to explore subtopics</p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Total Progress</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-900 transition-all duration-1000"
                  style={{ width: `${(Object.keys(TOPICS_STRUCTURE).reduce((acc, cat) => acc + calculateProgress(cat), 0) / 3).toFixed(0)}%` }}
                ></div>
              </div>
              <span className="text-sm font-black text-gray-900">
                {(Object.keys(TOPICS_STRUCTURE).reduce((acc, cat) => acc + calculateProgress(cat), 0) / 3).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <Accordion type="single" collapsible className="space-y-4 border-none">
            {Object.keys(TOPICS_STRUCTURE).map((mainTopic) => (
              <AccordionItem
                key={mainTopic}
                value={mainTopic}
                className="border-2 border-gray-100 rounded-[2rem] bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <AccordionTrigger
                  className="text-xl font-bold p-6 hover:no-underline hover:bg-gray-50/50"
                  suffix={
                    <div className="flex items-center space-x-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Completed</p>
                        <p className="text-sm font-black text-gray-900">
                          {learnedSubtopics[mainTopic]?.length || 0} / {TOPICS_STRUCTURE[mainTopic].length}
                        </p>
                      </div>
                      <CircularProgressBar
                        progress={calculateProgress(mainTopic)}
                        size={48}
                        strokeWidth={4}
                        className="text-gray-900"
                      />
                    </div>
                  }
                >
                  <span>{mainTopic.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</span>
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {TOPICS_STRUCTURE[mainTopic].map((subtopic) => {
                      const isLearned = learnedSubtopics[mainTopic]?.includes(subtopic);
                      return (
                        <Button
                          key={subtopic}
                          variant="outline"
                          onClick={() => navigate(`/aptitudementor/learn/${mainTopic}/${subtopic}`)}
                          className={`
                            h-auto py-4 px-5 justify-between rounded-2xl border-2 transition-all duration-300 group
                            ${isLearned
                              ? 'bg-green-100 border-green-200 hover:bg-green-100 hover:border-green-300'
                              : 'bg-white border-gray-100 hover:border-gray-900 hover:shadow-lg'}
                          `}
                        >
                          <div className="flex flex-col items-start text-left">
                            <span className={`text-sm font-bold ${isLearned ? 'text-green-500' : 'text-gray-900'}`}>
                              {subtopic.replace(/([A-Z])/g, ' $1')}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium group-hover:text-gray-600">
                              {isLearned ? 'Completed' : 'Click to Learn'}
                            </span>
                          </div>
                          {isLearned ? (
                            <div className="bg-green-500 rounded-full p-1 shadow-sm">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transform group-hover:translate-x-1 transition-all" />
                          )}
                        </Button>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
