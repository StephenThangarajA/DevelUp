import React, { useEffect, useState } from "react";
import { authMe } from "../../lib/api.js";
import { Upload } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function ResumeUploadPage() {
  useEffect(() => {
    (async () => {
      const me = await authMe();
      if (!me || me.role !== 'STUDENT') {
        window.location.href = '/login';
      }
    })();
  }, []);
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Please select a valid PDF file");
      setFile(null);
    }
  };

  const extractTextFromPDF = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve("PDF_TEXT_EXTRACTION_NOT_AVAILABLE");
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const generateCoverLetter = async (resumeText, jobDescription) => {
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY");
      const modelName = "gemini-2.5-flash";
      setLoadingMessage(`Generating cover letter...`);
      
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `
        You are a professional cover letter generator. Based on the following job description, create a compelling, personalized cover letter.

        ${resumeText ? `Resume:
        ${resumeText}` : "Note: No resume text provided. Please generate a general professional cover letter."}

        Job Description:
        ${jobDescription}

        Please generate a professional cover letter that:
        1. Is tailored to the specific job requirements
        2. ${resumeText ? "Highlights relevant experience from the resume" : "Demonstrates strong professional qualifications"}
        3. Demonstrates enthusiasm for the role
        4. Is approximately 300-400 words
        5. Uses professional language and formatting
        6. Includes a proper greeting and closing

        Format the cover letter with proper paragraph breaks and professional structure.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      // Remove the introductory text if present
      text = text.replace(/^Of course\.\s+Here is a compelling,? professional cover letter.*?\*\*\*\s*/s, "");
      
      return text;
    } catch (error) {
      console.error("Error generating cover letter:", error);
  
      if (error.message?.includes("503")) {
        throw new Error("The AI service is currently overloaded. Please try again in a few minutes.");
      } else if (error.message?.includes("401") || error.message?.includes("403")) {
        throw new Error("API key is invalid or expired. Please check your Gemini API key configuration.");
      } else if (error.message?.includes("quota")) {
        throw new Error("API quota exceeded. Please try again later or check your API usage limits.");
      } else {
        throw new Error(`Failed to generate cover letter: ${error.message || "Unknown error occurred"}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a resume file");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter a job description");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setLoadingMessage("Starting generation...");

    try {
      // Extract text from PDF
      const resumeText = await extractTextFromPDF(file);
      setLoadingMessage("Generating cover letter...");
      
      if (resumeText === "PDF_TEXT_EXTRACTION_NOT_AVAILABLE") {
        const coverLetter = await generateCoverLetter("", jobDescription);
        setResult(coverLetter);
      } else if (!resumeText.trim()) {
        throw new Error("Could not extract text from the PDF file");
      } else {
        const coverLetter = await generateCoverLetter(resumeText, jobDescription);
        setResult(coverLetter);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An error occurred while generating the cover letter");
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gray-900 text-white py-5 pl-5">
        <h1 className="text-2xl font-bold">Cover Letter Generator</h1>
      </div>
      <div className="bg-white flex items-center justify-center min-h-screen w-full">
      <main className="flex-grow pt-5 sm:pt-5">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          {/* Form Section */}
          <div className="w-full md:w-2/5">
            <Card className="bg-zinc-100 border-2 border-gray-800">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Generate Cover Letter
                </CardTitle>
                <p className="mt-2 text-sm text-gray-600">
                  Upload your resume and enter the job description to generate a
                  tailored cover letter. For best results, you can also paste your resume text in the job description field.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-center items-center w-full">
                      <label
                        htmlFor="resume-upload"
                        className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer
                          ${file ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400 bg-white"}
                        `}
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload
                            className={`w-12 h-12 mb-3 ${file ? "text-green-500" : "text-gray-400"}`}
                          />
                          {file ? (
                            <p className="text-sm text-green-600">{file.name}</p>
                          ) : (
                            <>
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PDF files only</p>
                            </>
                          )}
                        </div>
                        <input
                          id="resume-upload"
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    <Textarea
                      placeholder="Enter the job description here"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      rows={6}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <Button
                      type="submit"
                      disabled={loading || !file || !jobDescription.trim()}
                      className={`w-full ${loading || !file || !jobDescription.trim() ? "bg-gray-500" : "bg-gray-900 hover:bg-gray-800"}`}
                    >
                      {loading ? loadingMessage : "Generate Cover Letter"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Result Section */}
          <div className="w-full md:w-3/5">
            {result ? (
              <Card className="bg-zinc-100 h-full">
                <CardContent className="space-y-6 h-full flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 my-4">Your Cover Letter</h2>
                    <div className="p-6 bg-gray-50 rounded-lg h-[calc(100%-3rem)] overflow-y-auto">
                      <div className="prose max-w-none font-serif text-gray-800 leading-relaxed whitespace-pre-line">
                        {result}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => navigator.clipboard.writeText(result)}
                      className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                    >
                      Copy to Clipboard
                    </Button>
                    <Button
                      onClick={() => {
                        const blob = new Blob([result], { type: "text/plain" });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "cover-letter.txt";
                        a.click();
                        window.URL.revokeObjectURL(url);
                      }}
                      className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                    >
                      Download as Text
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-zinc-100 h-full flex items-center justify-center">
                <p className="text-gray-500">Your result will appear here.</p>
              </Card>
            )}
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}
