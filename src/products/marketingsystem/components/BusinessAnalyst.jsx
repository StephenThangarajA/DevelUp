import { useState, useRef, useEffect } from 'react'
import { useMarketing } from '../contexts/MarketingContext'
import { GoogleGenerativeAI } from '@google/generative-ai'
import * as XLSX from 'xlsx'
import {
  FileText,
  Upload,
  MessageSquare,
  X,
  Loader2,
  AlertCircle,
  FileSpreadsheet,
  Send,
  Zap,
  TrendingUp,
  Brain,
  History,
  ChevronRight
} from 'lucide-react'

const BusinessAnalyst = () => {
  const { brandFoundation, addAnalysis, businessAnalyses } = useMarketing()
  const [files, setFiles] = useState([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [chatHistory, setChatHistory] = useState([])
  const [userQuestion, setUserQuestion] = useState('')
  const [isAsking, setIsAsking] = useState(false)
  const [error, setError] = useState(null)
  const [showHistory, setShowHistory] = useState(false)

  const fileInputRef = useRef(null)
  const chatEndRef = useRef(null)

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

  const loadPreviousAnalysis = (analysis) => {
    setAnalysisResult(analysis.result)
    setChatHistory([{
      role: 'assistant',
      content: `I've reloaded your analysis for: ${analysis.fileName}. You can continue asking questions about it!`
    }])
    setShowHistory(false)
  }

  // Load PDF.js from CDN
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
    script.async = true
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
    }
    document.head.appendChild(script)
  }, [])

  const extractPdfText = async (data) => {
    if (!window.pdfjsLib) throw new Error('PDF library not loaded')
    const loadingTask = window.pdfjsLib.getDocument({ data })
    const pdf = await loadingTask.promise
    let fullText = ''
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map(item => item.str).join(' ')
      fullText += pageText + '\n'
    }
    return fullText
  }

  const handleFileUpload = async (e) => {
    const uploadedFiles = Array.from(e.target.files)
    const newFiles = []

    for (const file of uploadedFiles) {
      const fileData = {
        name: file.name,
        type: file.type,
        size: (file.size / 1024).toFixed(2) + ' KB',
        content: ''
      }

      try {
        if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv')) {
          const data = await file.arrayBuffer()
          const workbook = XLSX.read(data)
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
          fileData.content = XLSX.utils.sheet_to_txt(firstSheet)
        } else if (file.type === 'application/pdf') {
          const data = await file.arrayBuffer()
          fileData.content = await extractPdfText(data)
        } else if (file.type === 'text/plain') {
          fileData.content = await file.text()
        }
        newFiles.push(fileData)
      } catch (err) {
        console.error('Error reading file:', err)
        setError(`Failed to read ${file.name}: ${err.message}`)
      }
    }

    setFiles(prev => [...prev, ...newFiles])
  }

  const handleAnalyze = async () => {
    if (files.length === 0) return alert('Please upload at least one file to analyze.')

    setIsAnalyzing(true)
    setError(null)

    try {
      // Use Gemini 2.5 Flash as requested
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

      const combinedContent = files.map(f => `File: ${f.name}\nContent:\n${f.content}`).join('\n\n')

      const brandContext = `
        Brand Information:
        - Company: ${brandFoundation.companyName || 'Unknown'}
        - Website: ${brandFoundation.website || 'Not provided'}
        - Mission: ${brandFoundation.mission || 'Not provided'}
        - Vision: ${brandFoundation.vision || 'Not provided'}
        - Target Audience: ${brandFoundation.targetAudience || 'Not provided'}
        - Voice: ${brandFoundation.voice || 'Not provided'}
        - Values: ${(brandFoundation.values || []).join(', ') || 'Not provided'}
        - Social Media: ${Object.entries(brandFoundation.socialLinks || {})
          .filter(([_, val]) => val)
          .map(([key, val]) => `${key}: ${val}`)
          .join(', ') || 'Not provided'}
      `

      const prompt = `
        You are a senior business analyst and strategist for the following company:
        ${brandContext}

        I am providing you with data from several files (Excel/CSV/Text).
        
        Data Provided:
        ${combinedContent}
        
        TASK: Provide a PURELY NUMERICAL AND STATISTICAL Strategic Analysis.
        
        STRICT RULES:
        1. NO introductory text, NO pleasantries, and NO meta-commentary.
        2. START IMMEDIATELY with the first data point.
        3. DO NOT use markdown headers (###) or horizontal rules (---).
        4. Use **bold text** for ALL numerical values, percentages, currencies, section titles, and high-impact insights.
        5. MINIMIZE descriptive text; MAXIMIZE data extraction and statistical comparison.
        6. If the uploaded data is thin, use your knowledge of the company (${brandFoundation.companyName}) and its market to provide contextually relevant statistical benchmarks.
        
        FOCUS ON:
        1. **Core Numerical Data**: Summary of key totals, averages, and primary figures.
        2. **Statistical Performance**: Percentage changes, growth rates, and frequency trends.
        3. **Quantifiable Strengths & Weaknesses**: Performance gaps identified through numbers.
        4. **Data-Driven Recommendations**: High-impact actions based on numerical patterns.
        
        Keep it concise, punchy, and strictly evidence-based.
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      setAnalysisResult(text)

      // Persist analysis to context for dashboard tracking
      addAnalysis({
        fileName: files.map(f => f.name).join(', '),
        result: text
      })

      // Initialize chat history with the analysis
      setChatHistory([{
        role: 'assistant',
        content: "Numerical analysis complete. I have extracted the key statistics and trends. You can now ask me specific questions about the data!"
      }])
    } catch (err) {
      console.error('Analysis error:', err)
      setError('Failed to analyze data. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleAskQuestion = async (e) => {
    e.preventDefault()
    if (!userQuestion.trim() || isAsking) return

    const question = userQuestion
    setUserQuestion('')
    setChatHistory(prev => [...prev, { role: 'user', content: question }])
    setIsAsking(true)

    try {
      // Use Gemini 2.5 Flash as requested
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

      const combinedContent = files.length > 0
        ? files.map(f => `File: ${f.name}\nContent:\n${f.content}`).join('\n\n')
        : 'No files uploaded.'

      const brandContext = `
        Brand Information:
        - Company: ${brandFoundation.companyName || 'Unknown'}
        - Website: ${brandFoundation.website || 'Not provided'}
        - Mission: ${brandFoundation.mission || 'Not provided'}
        - Vision: ${brandFoundation.vision || 'Not provided'}
        - Target Audience: ${brandFoundation.targetAudience || 'Not provided'}
        - Social Media: ${Object.entries(brandFoundation.socialLinks || {})
          .filter(([_, val]) => val)
          .map(([key, val]) => `${key}: ${val}`)
          .join(', ') || 'Not provided'}
      `

      const prompt = `
        Context: You are an expert business analyst for the following company:
        ${brandContext}

        Uploaded Data Context:
        ${combinedContent}
        
        Previous Strategic Analysis (if any):
        ${analysisResult || 'No analysis performed yet.'}
        
        User Question: ${question}
        
        INSTRUCTIONS:
        1. If files are uploaded and contain relevant information, prioritize that data and focus on numerical/statistical evidence.
        2. If NO files are uploaded, or the data is not sufficient, use the Brand Information provided above.
        3. If more context is needed, use your internal knowledge about the company (${brandFoundation.companyName}) and its industry to provide a professional, expert strategic answer.
        4. ALWAYS use **bold text** for all numbers, percentages, key findings, and important business terms.
        5. Keep the tone professional, analytical, and highly helpful.
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      if (!text) throw new Error('Empty response from AI')

      setChatHistory(prev => [...prev, { role: 'assistant', content: text }])
    } catch (err) {
      console.error('Question error:', err)
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I encountered an error while processing your request. Please ensure your Brand Foundation is filled out and try again."
      }])
    } finally {
      setIsAsking(false)
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const renderFormattedText = (text) => {
    if (!text) return null

    // Split by lines first
    return text.split('\n').map((line, i) => {
      const trimmedLine = line.trim()

      // Filter out unwanted markdown symbols
      if (trimmedLine === '' || trimmedLine === '---' || trimmedLine.startsWith('###')) {
        if (trimmedLine === '') return <br key={i} />
        return null // Skip horizontal rules and headers
      }

      // Handle bold text **bold**
      const parts = line.split(/(\*\*.*?\*\*)/g)
      return (
        <p key={i} style={{ marginBottom: '0.5rem' }}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} style={{ color: '#0f172a' }}>{part.slice(2, -2)}</strong>
            }
            return part
          })}
        </p>
      )
    }).filter(item => item !== null)
  }

  return (
    <div className="ms-page">
      <header className="ms-page-header">
        <div className="ms-flex-between">
          <div>
            <h1>AI Business Analyst</h1>
            <p>Upload your business data to get strategic insights and recommendations.</p>
          </div>
          <button
            className={`ms-btn-outline ${showHistory ? 'active' : ''}`}
            onClick={() => setShowHistory(!showHistory)}
          >
            <History size={18} />
            <span>Analysis History</span>
          </button>
        </div>
      </header>

      {showHistory && (
        <div className="ms-card" style={{ marginBottom: '2rem', animation: 'fadeIn 0.3s ease' }}>
          <div className="ms-card-header ms-flex-between">
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <History size={20} className="ms-icon-purple" />
              Previous Analyses
            </h3>
            <button className="ms-btn-icon" onClick={() => setShowHistory(false)}>
              <X size={20} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
            {businessAnalyses.length === 0 ? (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#64748b', padding: '2rem' }}>
                No saved analyses yet. Complete your first analysis to see it here!
              </p>
            ) : (
              [...businessAnalyses].reverse().map((analysis) => (
                <div
                  key={analysis.id}
                  className="ms-list-item"
                  onClick={() => loadPreviousAnalysis(analysis)}
                  style={{
                    cursor: 'pointer',
                    padding: '1rem',
                    borderRadius: '12px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '0.5rem'
                  }}
                >
                  <div className="ms-flex-between" style={{ width: '100%' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#a855f7', textTransform: 'uppercase' }}>
                      {new Date(analysis.date).toLocaleDateString()}
                    </span>
                    <ChevronRight size={16} style={{ color: '#cbd5e1' }} />
                  </div>
                  <strong style={{ fontSize: '0.9rem', color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                    {analysis.fileName}
                  </strong>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="ms-grid" style={{ gridTemplateColumns: '1fr 350px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Analysis Result */}
          <div className="ms-card" style={{ flex: 1, minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
            <div className="ms-card-header ms-flex-between">
              <div className="ms-flex-center">
                <Brain className="ms-icon-purple" size={24} />
                <h2 style={{ margin: 0 }}>Strategic Analysis</h2>
              </div>
              {analysisResult && (
                <button className="ms-btn-outline ms-btn-sm" onClick={() => setAnalysisResult(null)}>
                  Clear Analysis
                </button>
              )}
            </div>

            <div style={{ flex: 1, marginTop: '1.5rem', position: 'relative' }}>
              {!analysisResult && !isAnalyzing ? (
                <div className="ms-empty-state" style={{ height: '100%' }}>
                  <TrendingUp size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                  <p>Upload files and click "Analyze Business" to generate insights.</p>
                </div>
              ) : isAnalyzing ? (
                <div className="ms-flex-center" style={{ height: '100%', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                  <Loader2 className="ms-spin ms-icon-purple" size={48} />
                  <p style={{ color: '#64748b', fontWeight: '500' }}>Analyzing your data.</p>
                </div>
              ) : (
                <div className="ms-analysis-content" style={{
                  backgroundColor: '#f8fafc',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  lineHeight: '1.6',
                  fontSize: '0.95rem',
                  color: '#334155',
                  overflowY: 'auto',
                  maxHeight: '600px'
                }}>
                  {renderFormattedText(analysisResult)}
                </div>
              )}
            </div>
          </div>

          {/* Q&A Section */}
          <div className="ms-card" style={{ display: 'flex', flexDirection: 'column', height: '500px' }}>
            <div className="ms-card-header">
              <div className="ms-flex-center">
                <MessageSquare className="ms-icon-blue" size={24} />
                <h2 style={{ margin: 0 }}>Ask the Analyst</h2>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {chatHistory.length === 0 ? (
                <div className="ms-empty-state" style={{ height: '100%', padding: '2rem' }}>
                  <p>Ask a question about your business or uploaded data.</p>
                </div>
              ) : (
                chatHistory.map((msg, i) => (
                  <div key={i} style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    backgroundColor: msg.role === 'user' ? '#dc2626' : '#f1f5f9',
                    color: msg.role === 'user' ? 'white' : '#1e293b',
                    fontSize: '0.9rem',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}>
                    {renderFormattedText(msg.content)}
                  </div>
                ))
              )}
              {isAsking && (
                <div style={{ alignSelf: 'flex-start', padding: '0.75rem 1rem', backgroundColor: '#f1f5f9', borderRadius: '12px' }}>
                  <Loader2 className="ms-spin" size={16} />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleAskQuestion} className="ms-flex-center" style={{ marginTop: '1rem', gap: '0.5rem' }}>
              <input
                type="text"
                className="ms-input"
                placeholder="How can I increase my profit margins?"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                disabled={isAsking}
                style={{ flex: 1 }}
              />
              <button
                type="submit"
                className="ms-btn-primary"
                disabled={isAsking || !userQuestion.trim()}
                style={{ padding: '0.75rem' }}
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar: File Upload & List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="ms-card">
            <h3>
              <Upload size={20} className="ms-icon-red" />
              Upload Data
            </h3>
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed #e2e8f0',
                borderRadius: '12px',
                padding: '2rem 1rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: '#f8fafc'
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                handleFileUpload({ target: { files: e.dataTransfer.files } })
              }}
            >
              <FileSpreadsheet size={32} style={{ color: '#dc2626', marginBottom: '0.5rem', opacity: 0.6 }} />
              <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#475569', margin: 0 }}>
                Drop Excel or PDF here
              </p>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                or click to browse
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                accept=".xlsx,.xls,.csv,.pdf,.txt"
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className="ms-card" style={{ flex: 1 }}>
            <h3>
              <FileText size={20} className="ms-icon-blue" />
              Source Files ({files.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
              {files.map((file, index) => (
                <div key={index} className="ms-flex-between" style={{
                  padding: '0.75rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div className="ms-flex-center" style={{ gap: '0.75rem', overflow: 'hidden' }}>
                    {file.name.endsWith('.pdf') ? (
                      <FileText size={18} className="ms-icon-red" />
                    ) : (
                      <FileSpreadsheet size={18} className="ms-icon-green" />
                    )}
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#1e293b',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {file.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{file.size}</div>
                    </div>
                  </div>
                  <button onClick={() => removeFile(index)} className="ms-btn-icon" style={{ padding: '0.25rem' }}>
                    <X size={14} />
                  </button>
                </div>
              ))}
              {files.length === 0 && (
                <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem', padding: '1rem 0' }}>
                  No files uploaded yet.
                </p>
              )}
            </div>

            {files.length > 0 && (
              <button
                className="ms-btn-primary"
                style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="ms-spin" size={18} />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    <span>Analyze Business</span>
                  </>
                )}
              </button>
            )}
          </div>

          {error && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#fee2e2',
              borderRadius: '12px',
              border: '1px solid #fecaca',
              display: 'flex',
              gap: '0.75rem',
              color: '#991b1b',
              fontSize: '0.875rem'
            }}>
              <AlertCircle size={18} />
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BusinessAnalyst
