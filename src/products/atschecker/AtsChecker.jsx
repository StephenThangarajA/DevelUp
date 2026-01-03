import React, { useEffect, useState, useRef } from "react";
import { authMe } from "../../lib/api.js";
import { Upload, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function ATSCheck() {
    useEffect(() => {
        (async () => {
            const me = await authMe();
            if (!me || me.role !== 'STUDENT') {
                window.location.href = '/login';
            }
        })();
    }, []);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);
    const refInp = useRef(null);

    const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result.split(",")[1];
                resolve(base64);
            };
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        });
    };

    const safeParseJson = (text) => {
        try {
            return JSON.parse(text);
        } catch (_) {
            try {
                const match = text.match(/\{[\s\S]*\}/);
                if (match) {
                    return JSON.parse(match[0]);
                }
            } catch (_) {
                // ignore
            }
        }
        return null;
    };

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const highlightKeywords = (text, keywords, isStrength = false) => {
        if (!text || !Array.isArray(keywords) || keywords.length === 0) return text;
        const filtered = Array.from(new Set(keywords.filter(Boolean))).filter(k => k.trim().length > 1);
        if (filtered.length === 0) return text;
        const pattern = new RegExp(`\\b(${filtered.map(escapeRegex).join("|")})\\b`, "gi");
        const parts = text.split(pattern);
        return parts.map((part, idx) => {
            if (pattern.test(part)) {
                return (
                    <span key={idx} className={isStrength ? "bg-green-100 text-green-800 font-semibold px-1 rounded" : "bg-yellow-100 text-yellow-800 font-semibold px-1 rounded"}>
                        {part}
                    </span>
                );
            }
            return <span key={idx}>{part}</span>;
        });
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setError("Please select a resume file");
            return;
        }
        if (refInp.current.value === "") {
            setError("Enter the Job Description");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) {
                throw new Error("Missing VITE_GEMINI_API_KEY. Add it to your .env file and restart.");
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const base64Data = await readFileAsBase64(file);
            const jobDescription = refInp.current.value;
            const jdKeywords = Array.from(
                new Set(
                    jobDescription
                        .toLowerCase()
                        .replace(/[^a-z0-9+.#\-\s]/g, " ")
                        .split(/\s+/)
                        .filter(w => w && w.length > 3 && !["with", "this", "that", "have", "from", "your", "will", "able", "such", "those", "these", "their", "there", "here", "than", "then", "into", "over", "under", "between", "within", "using", "used", "uses", "including", "include", "must", "should", "could", "would", "about", "other", "more", "most", "least", "good", "great", "well", "team", "work", "role", "task", "duty", "responsibility"].includes(w))
                )
            ).slice(0, 200);

            const systemPrompt = [
                "You are an ATS (Applicant Tracking System) resume analyst.",
                "Analyze the provided resume PDF against the job description.",
                "Return STRICT JSON only with this schema:",
                '{"score": number (0-100), "RelevantScore": number (0-100), "strengths": string[], "improvements": string[], "missingKeywords": string[]}',
                "Constraints:",
                "- score reflects ATS compatibility (formatting, keywords, sections)",
                "- RelevantScore reflects alignment with job description requirements",
                "- strengths: 4-8 concise bullets; if possible, prefix each with a short aspect followed by a colon, then detail (e.g., 'Leadership: ...')",
                "- improvements: 4-8 specific, actionable bullets; if possible, prefix with an aspect then detail",
                "- missingKeywords: important terms from the job description not present in the resume (lowercase, deduped)",
                "- Do not include any prose, code fences, or explanations. JSON only."
            ].join("\n");

            const response = await model.generateContent([
                { text: systemPrompt },
                { text: `Job Description:\n${jobDescription}` },
                {
                    inlineData: {
                        data: base64Data,
                        mimeType: file.type || "application/pdf",
                    },
                },
            ]);

            const text = response.response.text();
            const json = safeParseJson(text);
            if (!json || typeof json.score !== "number" || typeof json.RelevantScore !== "number") {
                throw new Error("Unexpected response. Please try again.");
            }
            setResult({
                ...json,
                strengths: Array.isArray(json.strengths) ? json.strengths : [],
                improvements: Array.isArray(json.improvements) ? json.improvements : [],
                missingKeywords: Array.isArray(json.missingKeywords) ? json.missingKeywords : [],
                keywords: jdKeywords,
            });
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to analyze resume. Please try again.");
            setResult(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-gray-900 text-white py-5 pl-5">
                <h1 className="text-2xl font-bold">ATS Resume Checker</h1>
            </div>
            <div className="bg-white flex items-center justify-center min-h-screen w-full">
                <main className="flex-grow pt-5 sm:pt-5">
                    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto py-12 px-2 lg:px-4 space-y-8 lg:space-y-0 lg:space-x-6">
                        <div className="lg:w-2/5">
                            <Card className="bg-zinc-100 border-2 border-gray-800 backdrop-blur-sm">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl font-bold text-gray-900">
                                        ATS Resume Check
                                    </CardTitle>
                                    <p className="mt-2 text-sm text-gray-700">
                                        Upload your resume to check its ATS compatibility score
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex justify-center items-center w-full">
                                                <label
                                                    htmlFor="resume-upload"
                                                    className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer ${file
                                                        ? "border-green-500 bg-green-50"
                                                        : "border-gray-300 hover:border-gray-400 bg-white"
                                                        }`}
                                                >
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <Upload
                                                            className={`w-12 h-12 mb-3 ${file ? "text-green-500" : "text-gray-400"
                                                                }`}
                                                        />
                                                        {file ? (
                                                            <p className="text-sm text-green-600">
                                                                {file.name}
                                                            </p>
                                                        ) : (
                                                            <>
                                                                <p className="mb-2 text-sm text-gray-500">
                                                                    <span className="font-semibold">
                                                                        Click to upload
                                                                    </span>{" "}
                                                                    or drag and drop
                                                                </p>
                                                                <p className="text-xs text-gray-500">
                                                                    PDF files only
                                                                </p>
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
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                                    Job Description
                                                </label>
                                                <textarea
                                                    name="des"
                                                    rows="4"
                                                    ref={refInp}
                                                    placeholder="Enter the Job Description"
                                                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400 transition-colors duration-300"
                                                />
                                            </div>
                                            {error && <p className="text-sm text-red-600">{error}</p>}

                                            <button
                                                type="submit"
                                                disabled={loading || !file}
                                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading || !file
                                                    ? "bg-gray-500 cursor-not-allowed"
                                                    : "bg-gray-900 hover:bg-gray-800 focus:outline-none"
                                                    }`}
                                            >
                                                {loading ? "Analyzing..." : "Check Resume"}
                                            </button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {result && (
                            <div className="lg:w-3/5 bg-zinc-100 rounded-lg shadow-lg p-8 border border-gray-200 relative">
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-col">
                                        <p className="text-gray-900 text-2xl font-bold">
                                            ATS Score
                                        </p>
                                        <p className={`text-3xl font-bold ${result.score >= 75 ? "text-green-600" :
                                                result.score >= 50 ? "text-yellow-600" :
                                                    "text-red-600"
                                            }`}>
                                            {result.score}%
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-900 text-2xl font-bold">
                                            Relevant Score
                                        </p>
                                        <p className={`text-3xl font-bold ${result.RelevantScore > 75 ? "text-green-600" :
                                                result.RelevantScore > 50 ? "text-yellow-600" :
                                                    "text-red-600"
                                            }`}>
                                            {result.RelevantScore}%
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-6 mt-4">
                                    {result.strengths && result.strengths.length > 0 && (
                                        <div>
                                            <p className="text-base text-black font-semibold mb-2 flex items-center">
                                                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                                                Resume Strengths
                                            </p>
                                            <ul className="space-y-2">
                                                {result.strengths.map((item, index) => {
                                                    const [maybeAspect, ...rest] = item.split(":");
                                                    const aspect = rest.length > 0 ? maybeAspect : null;
                                                    const detail = rest.length > 0 ? rest.join(":").trim() : item;
                                                    return (
                                                        <li key={index} className="flex items-start gap-2">
                                                            <span className="mt-1 h-3 w-3 flex-shrink-0 rounded-full bg-green-500"></span>
                                                            <span className="text-sm text-gray-800">
                                                                {aspect ? (
                                                                    <strong className="text-gray-900">{aspect.trim()}:</strong>
                                                                ) : null} {highlightKeywords(detail, result.keywords, true)}
                                                            </span>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                    {result.improvements && result.improvements.length > 0 && (
                                        <div>
                                            <p className="text-base font-semibold text-black mb-2 flex items-center">
                                                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                                                Areas of Improvement
                                            </p>
                                            <ul className="space-y-2">
                                                {result.improvements.map((item, index) => {
                                                    const [maybeAspect, ...rest] = item.split(":");
                                                    const aspect = rest.length > 0 ? maybeAspect : null;
                                                    const detail = rest.length > 0 ? rest.join(":").trim() : item;
                                                    return (
                                                        <li key={index} className="flex items-start gap-2">
                                                            <span className="mt-1 h-3 w-3 flex-shrink-0 rounded-full bg-yellow-500"></span>
                                                            <span className="text-sm text-gray-800">
                                                                {aspect ? (
                                                                    <strong className="text-gray-900">{aspect.trim()}:</strong>
                                                                ) : null} {highlightKeywords(detail, result.keywords, false)}
                                                            </span>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                    {result.missingKeywords && result.missingKeywords.length > 0 && (
                                        <div>
                                            <p className="text-base font-semibold text-black mb-2 flex items-center">
                                                <XCircle className="w-4 h-4 mr-2 text-red-700" />
                                                Missing Keywords
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {result.missingKeywords.map((kw, index) => (
                                                    <span key={index} className="inline-flex items-center rounded-md bg-gray-900 px-3 py-1 text-xs font-medium text-white border border-gray-200">
                                                        {kw}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
