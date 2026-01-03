import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { useMockAssessment } from '../context/MockAssessmentContext';

const JOB_ROLES = [
  'Software Engineer',
  'Data Scientist',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'UI/UX Designer',
  'Product Manager'
];

const TOPICS = [
  'Aptitude',
  'Algorithms',
  'Data Structures',
  'System Design',
  'Programming',
  'Statistics',
  'Machine Learning',
  'JavaScript',
  'React',
  'Python',
  'Databases',
  'APIs',
  'Security'
];

const DIFFICULTY_LEVELS = [
  { value: 'easy', label: 'Easy (10 questions, 15 mins)', description: 'Basic concepts and fundamentals' },
  { value: 'medium', label: 'Medium (25 questions, 30 mins)', description: 'Moderate complexity questions' },
  { value: 'hard', label: 'Hard (50 questions, 1 hour)', description: 'Advanced and challenging questions' }
];

export default function AssessmentSelection({ onStart }) {
  const { createAssessment } = useMockAssessment();
  const [jobRole, setJobRole] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [customTopic, setCustomTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStart = async () => {
    const selectedTopic = topic === 'custom' ? customTopic : topic;
    const assessmentTopic = selectedTopic || jobRole;
    
    if (!jobRole && !selectedTopic && !customTopic) {
      alert('Please select a job role or enter a topic');
      return;
    }

    setIsGenerating(true);
    try {
      const assessment = await createAssessment(jobRole || 'General', assessmentTopic, difficulty);
      if (!assessment || !assessment.questions || assessment.questions.length === 0) {
        alert('Unable to generate questions right now. Please try again.');
        return;
      }
      onStart(assessment);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Create New Assessment</CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Choose a job role or specific topic you want to be assessed on
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Job Role Selection */}
        <div>
          <Label className="text-gray-700 mb-2 block">Job Role (Optional)</Label>
          <select
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Select a job role</option>
            {JOB_ROLES.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Or specify a custom topic below
          </p>
        </div>

        {/* Topic Selection */}
        <div>
          <Label className="text-gray-700 mb-2 block">Topic</Label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Select a topic</option>
            {TOPICS.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
            <option value="custom">Custom Topic</option>
          </select>
        </div>

        {/* Custom Topic Input */}
        {topic === 'custom' && (
          <div>
            <Label className="text-gray-700 mb-2 block">Enter Custom Topic</Label>
            <Input
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="e.g., React Hooks, GraphQL, etc."
              className="w-full"
            />
          </div>
        )}

        {/* Difficulty Level */}
        <div>
          <Label className="text-gray-700 mb-2 block">Difficulty Level</Label>
          <div className="space-y-2">
            {DIFFICULTY_LEVELS.map(level => (
              <label
                key={level.value}
                className={`flex items-start p-3 border rounded-lg cursor-pointer transition ${
                  difficulty === level.value
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="difficulty"
                  value={level.value}
                  checked={difficulty === level.value}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="mt-1 mr-3"
                />
                <div>
                  <p className="font-medium text-gray-900">{level.label}</p>
                  <p className="text-sm text-gray-600">{level.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <Button
          onClick={handleStart}
          disabled={isGenerating}
          className={`w-full text-white ${isGenerating ? 'bg-gray-700' : 'bg-gray-900 hover:bg-gray-800'}`}
        >
          {isGenerating ? 'Generating Assessment…' : 'Start Assessment'}
        </Button>

        {isGenerating && (
          <p className="text-sm text-gray-600 text-center">Generating questions, please wait…</p>
        )}
      </CardContent>
    </Card>
  );
}
