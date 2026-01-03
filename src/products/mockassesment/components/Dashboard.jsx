import React from 'react';
import { useMockAssessment } from '../context/MockAssessmentContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { TrendingUp, Clock, Target, Award, BookOpen, Calendar, Star } from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

export default function Dashboard({ onStartAssessment }) {
  const { performanceData, assessments } = useMockAssessment();

  const bestScore = assessments.reduce((maxScore, assessment) => {
    if (assessment.status === 'completed' && assessment.result && assessment.result.score.percentage > maxScore) {
      return assessment.result.score.percentage;
    }
    return maxScore;
  }, 0);

  const getScoreColor = (score) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 75) return 'bg-green-50';
    if (score >= 60) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  // Data for Skill-wise Performance Bar Chart
  const skillChartData = {
    labels: Object.keys(performanceData.skillScores),
    datasets: [
      {
        label: 'Average Score',
        data: Object.values(performanceData.skillScores).map(skill =>
          parseFloat(((skill.correct / skill.total) * 100).toFixed(2))
        ),
        backgroundColor: Object.values(performanceData.skillScores).map(skill => {
          const percentage = parseFloat(((skill.correct / skill.total) * 100).toFixed(2));
          if (percentage >= 75) return 'rgba(34, 197, 94, 0.6)'; // Green
          if (percentage >= 60) return 'rgba(234, 179, 8, 0.6)'; // Yellow
          return 'rgba(239, 68, 68, 0.6)'; // Red
        }),
        borderColor: Object.values(performanceData.skillScores).map(skill => {
          const percentage = parseFloat(((skill.correct / skill.total) * 100).toFixed(2));
          if (percentage >= 75) return 'rgba(34, 197, 94, 1)';
          if (percentage >= 60) return 'rgba(234, 179, 8, 1)';
          return 'rgba(239, 68, 68, 1)';
        }),
        borderWidth: 1,
      },
    ],
  };

  const skillChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Skill-wise Performance' },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: 'Score (%)' },
      },
    },
  };

  // Data for Recent Assessments Line Chart
  const recentAssessmentsChartData = {
    labels: performanceData.recentAssessments.slice().reverse().map(a => new Date(a.submittedAt).toLocaleDateString()),
    datasets: [
      {
        label: 'Score',
        data: performanceData.recentAssessments
          .slice()
          .reverse()
          .map(a => parseFloat((a.score || 0).toFixed(2))),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const recentAssessmentsChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Recent Assessment Scores' },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: 'Score (%)' },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Assessments</p>
                <p className="text-3xl font-bold text-gray-900">{performanceData.totalAssessments}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Score</p>
                <p className={`text-3xl font-bold ${getScoreColor(performanceData.averageScore)}`}>
                  {parseFloat((performanceData.averageScore || 0).toFixed(2))}%
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-gray-900">
                  {assessments.filter(a => a.status === 'completed').length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Best Score</p>
                <p className={`text-3xl font-bold ${getScoreColor(bestScore)}`}>
                  {bestScore || 0}%
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Start New Assessment */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Start New Assessment</CardTitle>
          <p className="text-sm text-gray-600 mt-1">Test your skills with role-based or topic-based assessments</p>
        </CardHeader>
        <CardContent>
          <Button
            onClick={onStartAssessment}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            Create New Assessment
          </Button>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-4">
        {performanceData.recentAssessments.length > 0 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Recent Assessments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Line data={recentAssessmentsChartData} options={recentAssessmentsChartOptions} />
            </CardContent>
          </Card>
        )}

        {Object.keys(performanceData.skillScores).length > 0 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Target className="w-5 h-5" />
                Skill-wise Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Bar data={skillChartData} options={skillChartOptions} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
