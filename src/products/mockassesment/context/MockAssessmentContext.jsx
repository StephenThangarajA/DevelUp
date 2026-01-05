import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { mockAssessment } from '../../../lib/api';

const MockAssessmentContext = createContext(null);

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-2.5-flash" }) : null;

export const MockAssessmentProvider = ({ children }) => {
  const [assessments, setAssessments] = useState([]);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [results, setResults] = useState(null);
  const [performanceData, setPerformanceData] = useState({
    totalAssessments: 0,
    averageScore: 0,
    skillScores: {},
    recentAssessments: []
  });

  // Load data from DB on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await mockAssessment.list();
        setAssessments(data);
        
        // Calculate performance data from fetched assessments
        const completed = data.filter(a => a.status === 'completed' && a.result);
        if (completed.length > 0) {
          const totalAssessments = completed.length;
          const averageScore = completed.reduce((acc, a) => acc + a.result.score.percentage, 0) / totalAssessments;
          
          const skillScores = {};
          completed.forEach(a => {
            Object.entries(a.result.topicScores).forEach(([topic, topicResult]) => {
              const topicKey = mapTopicToCategory(topic);
              if (!skillScores[topicKey]) {
                skillScores[topicKey] = { total: 0, correct: 0, attempts: 0 };
              }
              skillScores[topicKey].total += topicResult.total;
              skillScores[topicKey].correct += topicResult.correct;
              skillScores[topicKey].attempts += 1;
            });
          });

          const recentAssessments = completed.slice(0, 10).map(a => ({
            id: a.id,
            jobRole: a.jobRole,
            topic: a.topic,
            score: a.result.score.percentage,
            submittedAt: a.result.submittedAt
          }));

          setPerformanceData({
            totalAssessments,
            averageScore,
            skillScores,
            recentAssessments
          });
        }
      } catch (err) {
        console.error('Error loading assessments:', err);
      }
    };
    loadData();
  }, []);

  const createAssessment = async (jobRole, topic, difficulty = 'medium') => {
    let questions = [];
    try {
      questions = await generateQuestions(jobRole, topic, difficulty, assessments.flatMap(a => a.questions));
    } catch (err) {
      console.error('Error in createAssessment generateQuestions:', err);
    }

    if (!questions || !questions.length) {
      const topics = topic ? [topic] : getTopicsForRole(jobRole);
      const count = ({ easy: 10, medium: 25, hard: 50 }[difficulty] || 25);
      questions = getFallbackQuestions(count, topics, difficulty, jobRole);
      console.warn('Using fallback questions. Count:', questions.length);
    }

    const duration = calculateDuration(questions.length, difficulty);
    
    try {
      const newAssessment = await mockAssessment.create({
        jobRole,
        topic,
        difficulty,
        questions,
        duration
      });

      setAssessments(prev => [newAssessment, ...prev]);
      setCurrentAssessment(newAssessment);
      setUserAnswers({});
      setTimeRemaining(newAssessment.duration * 60); // Convert to seconds
      return newAssessment;
    } catch (err) {
      console.error('Error creating assessment in DB:', err);
      throw err;
    }
  };

  const submitAssessment = async (answers = null) => {
    if (!currentAssessment) return;

    const finalAnswers = answers || userAnswers;
    const score = calculateScore(currentAssessment.questions, finalAnswers);
    const topicScores = calculateTopicScores(currentAssessment.questions, finalAnswers);
    const strengths = identifyStrengths(topicScores);
    const weaknesses = identifyWeaknesses(topicScores);
    const feedback = generateFeedback(score, strengths, weaknesses);

    const resultData = {
      score,
      topicScores,
      strengths,
      weaknesses,
      feedback,
      userAnswers: { ...finalAnswers }
    };

    try {
      const result = await mockAssessment.submit(currentAssessment.id, resultData);

      // Update assessment status locally
      setAssessments(prev => prev.map(a =>
        a.id === currentAssessment.id ? { ...a, status: 'completed', result } : a
      ));

      // Update performance data
      updatePerformanceData(result, currentAssessment);

      setResults(result);
      setCurrentAssessment(null);
      setUserAnswers({});
      setTimeRemaining(null);

      return result;
    } catch (err) {
      console.error('Error submitting assessment result to DB:', err);
      throw err;
    }
  };

  const updatePerformanceData = (result, assessment) => {
    setPerformanceData(prev => {
      const totalAssessments = prev.totalAssessments + 1;
      const averageScore = ((prev.averageScore * prev.totalAssessments) + result.score.percentage) / totalAssessments;

      // Update topic scores (bucketed to main categories)
      const skillScores = { ...prev.skillScores };
      Object.entries(result.topicScores).forEach(([topic, topicResult]) => {
        const topicKey = mapTopicToCategory(topic);
        if (!skillScores[topicKey]) {
          skillScores[topicKey] = { total: 0, correct: 0, attempts: 0 };
        }
        skillScores[topicKey].total += topicResult.total;
        skillScores[topicKey].correct += topicResult.correct;
        skillScores[topicKey].attempts += 1;
      });

      // Update recent assessments
      const recentAssessments = [
        {
          id: assessment.id,
          jobRole: assessment.jobRole,
          topic: assessment.topic,
          score: result.score.percentage,
          submittedAt: result.submittedAt
        },
        ...prev.recentAssessments.slice(0, 9) // Keep last 10
      ];

      return {
        totalAssessments,
        averageScore,
        skillScores,
        recentAssessments
      };
    });
  };

  const calculateScore = (questions, answers) => {
    let correct = 0;
    let total = questions.length;

    questions.forEach((q, index) => {
      if (q.type === 'multiple-choice' || q.type === 'scenario-based') {
        if (answers[index] === q.correctAnswer) {
          correct++;
        }
      } else if (q.type === 'problem-solving') {
        // For problem-solving, check if answer is close enough (within tolerance)
        const userAnswer = parseFloat(answers[index]);
        const correctAnswer = parseFloat(q.correctAnswer);
        if (!isNaN(userAnswer) && !isNaN(correctAnswer)) {
          const tolerance = q.tolerance || 0.01;
          if (Math.abs(userAnswer - correctAnswer) <= tolerance) {
            correct++;
          }
        }
      }
    });

    return {
      correct,
      total,
      percentage: Math.round((correct / total) * 100)
    };
  };

  const calculateTopicScores = (questions, answers) => {
    const topicScores = {};

    questions.forEach((q, index) => {
      const topicKey = mapTopicToCategory(q.topic || '');
      if (!topicScores[topicKey]) {
        topicScores[topicKey] = { correct: 0, total: 0 };
      }
      topicScores[topicKey].total++;

      let isCorrect = false;
      if (q.type === 'multiple-choice' || q.type === 'scenario-based') {
        isCorrect = answers[index] === q.correctAnswer;
      } else if (q.type === 'problem-solving') {
        const userAnswer = parseFloat(answers[index]);
        const correctAnswer = parseFloat(q.correctAnswer);
        if (!isNaN(userAnswer) && !isNaN(correctAnswer)) {
          const tolerance = q.tolerance || 0.01;
          isCorrect = Math.abs(userAnswer - correctAnswer) <= tolerance;
        }
      }

      if (isCorrect) {
        topicScores[topicKey].correct++;
      }
    });

    // Calculate percentages
    Object.keys(topicScores).forEach(topic => {
      topicScores[topic].percentage = Math.round(
        (topicScores[topic].correct / topicScores[topic].total) * 100
      );
    });

    return topicScores;
  };

  const mapTopicToCategory = (topic = '') => {
    const t = topic.toLowerCase();
    if (t.includes('ui') || t.includes('ux') || t.includes('design')) return 'UI/UX';
    if (t.includes('frontend') || t.includes('react') || t.includes('javascript') || t.includes('css') || t.includes('html') || t.includes('web')) return 'Frontend Development';
    if (t.includes('backend') || t.includes('api') || t.includes('server') || t.includes('database') || t.includes('sql')) return 'Backend Development';
    if (t.includes('full stack')) return 'Full Stack Development';
    if (t.includes('devops') || t.includes('ci/cd') || t.includes('docker') || t.includes('kubernetes') || t.includes('cloud')) return 'DevOps / Cloud';
    if (t.includes('algorithm') || t.includes('data structure') || t.includes('system design')) return 'Algorithms & Data Structures';
    if (t.includes('machine learning') || t.includes('ml') || t.includes('ai') || t.includes('statistics') || t.includes('data')) return 'Data & ML';
    if (t.includes('security')) return 'Security';
    return 'General';
  };

  const identifyStrengths = (topicScores) => {
    return Object.entries(topicScores)
      .filter(([_, score]) => score.percentage >= 75)
      .map(([topic, _]) => topic);
  };

  const identifyWeaknesses = (topicScores) => {
    return Object.entries(topicScores)
      .filter(([_, score]) => score.percentage < 60)
      .map(([topic, _]) => topic);
  };

  const generateFeedback = (score, strengths, weaknesses) => {
    const feedback = [];

    if (score.percentage >= 90) {
      feedback.push("Excellent performance! You demonstrate strong understanding of the concepts.");
    } else if (score.percentage >= 75) {
      feedback.push("Good work! You have a solid grasp of most concepts.");
    } else if (score.percentage >= 60) {
      feedback.push("You're on the right track. Focus on reviewing the areas where you struggled.");
    } else {
      feedback.push("Consider reviewing the fundamentals and practicing more on the challenging topics.");
    }

    if (strengths.length > 0) {
      feedback.push(`Your strong areas: ${strengths.join(', ')}. Keep building on these strengths.`);
    }

    if (weaknesses.length > 0) {
      feedback.push(`Areas to improve: ${weaknesses.join(', ')}. Focus on understanding these concepts better.`);
    }

    return feedback;
  };

  return (
    <MockAssessmentContext.Provider
      value={{
        assessments,
        currentAssessment,
        userAnswers,
        setUserAnswers,
        timeRemaining,
        setTimeRemaining,
        results,
        performanceData,
        createAssessment,
        submitAssessment,
        setCurrentAssessment,
        setResults
      }}
    >
      {children}
    </MockAssessmentContext.Provider>
  );
};

// Fallback question generation for API failures
const generateQuestion = (index, questionTopic, questionType, difficulty, jobRole) => {
  return {
    id: `fallback-${Date.now()}-${index}`,
    question: `Sample ${difficulty} difficulty ${questionType} question about ${questionTopic} for a ${jobRole} role`,
    options: [
      `Option 1 for ${questionTopic}`,
      `Option 2 for ${questionTopic}`,
      `Option 3 for ${questionTopic}`,
      `Option 4 for ${questionTopic}`
    ],
    correctAnswer: Math.floor(Math.random() * 4),
    topic: questionTopic,
    difficulty: difficulty,
    type: 'multiple-choice'
  };
}

// Question generation function
const generateQuestions = async (jobRole, topic, difficulty, existingQuestions = []) => {
  const questionCounts = { 'easy': 10, 'medium': 25, 'hard': 50 };
  const count = questionCounts[difficulty] || 25;
  const topics = topic ? [topic] : getTopicsForRole(jobRole);
  const selectedTopic = topics[Math.floor(Math.random() * topics.length)];

  // If no API key/model, immediately use fallback
  if (!model) {
    return getFallbackQuestions(count, topics, difficulty, jobRole);
  }

  const prompt = `Generate ${count} unique ${difficulty} difficulty multiple-choice questions about ${selectedTopic} for a ${jobRole} role. Each question should have 4 options and 1 correct answer. Ensure no questions are repeated from the following list (if provided): ${JSON.stringify(existingQuestions.map(q => q.question))}. The output should be a JSON array of objects, each with 'question', 'options' (an array of strings), 'correctAnswer' (the index of the correct option), 'topic', 'difficulty', and 'type' (always 'multiple-choice').`;

  try {
    console.log("Gemini API Prompt:", prompt);
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    console.log("Gemini API Raw Response:", responseText);

    let newQuestions = [];
    try {
      newQuestions = JSON.parse(responseText.replace(/```json|```/g, '').trim());
      console.log("Gemini API Parsed Questions (before filter):", newQuestions);
    } catch (jsonError) {
      console.error("Error parsing Gemini API response JSON:", jsonError);
      console.log("Problematic responseText:", responseText);
      return []; // Return empty array if JSON parsing fails
    }

    // Filter out any questions that might still be duplicates or malformed
    const uniqueQuestions = newQuestions.filter(q =>
      !existingQuestions.some(eq => eq.question === q.question) &&
      q.question && q.options && q.options.length === 4 && typeof q.correctAnswer === 'number'
    ).map((q, index) => ({
      id: `gemini-${Date.now()}-${index}`,
      ...q,
      type: 'multiple-choice' // Ensure type is consistent
    }));
    console.log("Gemini API Unique Questions (after filter):", uniqueQuestions);

    if (uniqueQuestions.length === 0) {
      // If nothing usable came back, fall back
      return getFallbackQuestions(count, topics, difficulty, jobRole);
    }

    return uniqueQuestions;
  } catch (error) {
    console.error("Error generating questions with Gemini API:", error);
    return getFallbackQuestions(count, topics, difficulty, jobRole);
  }
};

const getFallbackQuestions = (count, topics, difficulty, jobRole) => {
  const fallbackQuestions = [];
  for (let i = 0; i < count; i++) {
    const questionTopic = topics[Math.floor(Math.random() * topics.length)];
    const questionType = getQuestionType(i, count);
    fallbackQuestions.push(generateQuestion(i, questionTopic, questionType, difficulty, jobRole));
  }
  return fallbackQuestions;
};

const getTopicsForRole = (jobRole) => {
  const roleTopics = {
    'Software Engineer': ['Algorithms', 'Data Structures', 'System Design', 'Programming'],
    'Data Scientist': ['Statistics', 'Machine Learning', 'Data Analysis', 'Python'],
    'Frontend Developer': ['JavaScript', 'React', 'CSS', 'Web Development'],
    'Backend Developer': ['APIs', 'Databases', 'Server Architecture', 'Security'],
    'Full Stack Developer': ['Frontend', 'Backend', 'Database', 'Deployment'],
    'DevOps Engineer': ['CI/CD', 'Cloud', 'Containerization', 'Monitoring'],
    'UI/UX Designer': ['Design Principles', 'User Research', 'Prototyping', 'Accessibility'],
    'Product Manager': ['Product Strategy', 'User Stories', 'Agile', 'Analytics']
  };

  return roleTopics[jobRole] || ['General Knowledge', 'Problem Solving', 'Technical Skills'];
};

const getQuestionType = (index, total) => {
  // Mix of question types: 40% multiple-choice, 30% scenario-based, 30% problem-solving
  const ratio = index / total;
  if (ratio < 0.4) return 'multiple-choice';
  if (ratio < 0.7) return 'scenario-based';
  return 'problem-solving';
};



const calculateDuration = (questionCount, difficulty) => {
  // easy - 10 questions, 15mins; medium - 25 questions, 30 mins; hard - 50 questions, 1hour;
  if (difficulty === 'easy') return 15;
  if (difficulty === 'medium') return 30;
  if (difficulty === 'hard') return 60;

  // Default fallback if difficulty doesn't match
  return Math.ceil(questionCount * 1.5);
};

export const useMockAssessment = () => {
  const context = useContext(MockAssessmentContext);
  if (!context) {
    throw new Error('useMockAssessment must be used within MockAssessmentProvider');
  }
  return context;
};
