import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ChevronLeft, BookOpen, Lightbulb, CheckCircle2 } from 'lucide-react';
import { LEARN_CONTENT } from './learncontent';
import { aptitudeMentor } from '../../lib/api';

export default function LearnPage() {
  const { mainTopic, subTopic } = useParams();
  const navigate = useNavigate();

  const content = LEARN_CONTENT[mainTopic]?.[subTopic];

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <div className="bg-gray-100 p-8 rounded-full mb-6">
          <BookOpen className="w-16 h-16 text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Content Coming Soon!</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          We are currently working on the learning material for <span className="font-semibold text-gray-900">{subTopic.replace(/([A-Z])/g, ' $1')}</span>. Stay tuned!
        </p>
        <Button onClick={() => navigate(-1)} size="lg" className="rounded-full px-8">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  const title = content.topic || content.title;
  const introduction = content.description || content.introduction;

  // Determine content type and items
  const isVerbal = !!content.words;
  const isIdiom = !!content.idioms;
  const sections = content.formulas || content.concepts || content.rules || content.words || content.idioms || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navigation Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate(-1)} className="hover:bg-gray-100 rounded-full">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Category</span>
              <span className="text-sm font-medium text-gray-900">{mainTopic.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Header Section */}
        <header className="space-y-6 text-center">
          <div className="inline-block px-4 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-full uppercase tracking-widest mb-2">
            Study Guide
          </div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight sm:text-6xl">
            {title}
          </h1>
          <div className="w-24 h-2 bg-gray-900 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {introduction}
          </p>
        </header>

        {/* Content Sections */}
        <div className="grid gap-12 pt-8">
          {sections.map((section, index) => (
            <div key={index} className="group">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {isVerbal ? section.word : (isIdiom ? section.idiom : section.name)}
                  </h3>
                  <div className="h-1 w-12 bg-gray-200 group-hover:w-full group-hover:bg-gray-900 transition-all duration-500 rounded-full"></div>
                </div>
              </div>

              <Card className="overflow-hidden border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    {/* Left Column: Rule/Meaning & Explanation */}
                    <div className="p-8 space-y-8 border-r border-gray-100">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Lightbulb className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase tracking-widest">
                            {isVerbal ? 'Synonym & Antonym' : (isIdiom ? 'Meaning' : 'Formula / Rule')}
                          </span>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200 group-hover:border-gray-900 transition-colors duration-300">
                          {isVerbal ? (
                            <div className="space-y-2">
                              <p className="text-xl font-mono text-gray-900 font-bold">
                                <span className="text-green-600">Syn:</span> {section.synonym}
                              </p>
                              <p className="text-xl font-mono text-gray-900 font-bold">
                                <span className="text-red-600">Ant:</span> {section.antonym}
                              </p>
                            </div>
                          ) : (
                            <p className="text-xl font-mono text-gray-900 font-bold break-words">
                              {section.rule || section.formula || section.meaning}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <BookOpen className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase tracking-widest">Deep Dive</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {section.explanation}
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Example */}
                    <div className="p-8 bg-gray-900 text-white">
                      <div className="flex items-center space-x-2 text-gray-400 mb-6">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-green-400">Practical Example</span>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <p className="text-sm font-bold text-gray-400 uppercase mb-2">
                            {isVerbal || isIdiom ? 'Usage Sentence' : 'Question'}
                          </p>
                          <p className="text-lg font-medium leading-snug">
                            {isVerbal || isIdiom ? (section.example?.sentence || section.example?.usage) : section.example?.question}
                          </p>
                        </div>

                        {!(isVerbal || isIdiom) && section.example?.solution && (
                          <div className="pt-6 border-t border-gray-800">
                            <p className="text-sm font-bold text-green-400 uppercase mb-2">Solution</p>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                              <p className="text-lg font-mono text-white leading-relaxed">
                                {section.example.solution}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12 pb-24">
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto rounded-full px-8 py-6 border-2 font-bold"
          >
            Back to Topics
          </Button>
          <Button
            size="lg"
            onClick={async () => {
              try {
                const progress = await aptitudeMentor.progress.get();
                const learned = progress.learnedSubtopics || {};
                if (!learned[mainTopic]) learned[mainTopic] = [];
                if (!learned[mainTopic].includes(subTopic)) {
                  learned[mainTopic].push(subTopic);
                  await aptitudeMentor.progress.save({ 
                    learnedSubtopics: learned,
                    activeTab: 'learn'
                  });
                } else {
                  await aptitudeMentor.progress.save({ activeTab: 'learn' });
                }
              } catch (err) {
                console.error('Error saving learned progress to DB:', err);
              }
              navigate('/aptitudementor');
            }}
            className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white px-12 py-6 text-lg font-bold rounded-full shadow-2xl transform transition hover:scale-105"
          >
            Mark as Learned
            <CheckCircle2 className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
