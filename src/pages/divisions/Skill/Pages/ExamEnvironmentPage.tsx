// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lmsSupabaseClient } from '../../../lib/ssupabase';

/* ============================================================
   Mock Data Fallback (If Supabase is empty)
============================================================ */
const MOCK_MCQ_DATA = {
  title: "Java Fundamentals Assessment",
  duration: 45, // minutes
  questions: [
    { id: 1, text: "Which of these is not a feature of Java?", options: ["Object Oriented", "Portable", "Dynamic", "Use of Pointers"], correct: "Use of Pointers" },
    { id: 2, text: "What is the return type of the hashCode() method in the Object class?", options: ["Object", "int", "long", "void"], correct: "int" },
    { id: 3, text: "Which package contains the Random class?", options: ["java.util", "java.lang", "java.awt", "java.io"], correct: "java.util" },
    { id: 4, text: "An interface with no fields or methods is known as a ______.", options: ["Runnable Interface", "Marker Interface", "Abstract Interface", "CharSequence Interface"], correct: "Marker Interface" },
    // Add more mock questions as needed...
  ]
};

const ExamEnvironmentPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  // 🔹 STATE: Exam Data
  const [questions, setQuestions] = useState([]);
  const [examTitle, setExamTitle] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 STATE: User Progress
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { 1: "Option A", 2: "Option B" }
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(0);

  // 🛡️ SECURITY STATE (Freezing Logic)
  const [isFrozen, setIsFrozen] = useState(false);
  const [freezeTime, setFreezeTime] = useState(0);
  const [violationCount, setViolationCount] = useState(0);

  // 1. FETCH EXAM DATA
  useEffect(() => {
    const fetchExam = async () => {
      // In a real app, you would fetch from Supabase 'mcq_exams' table here
      // For now, we simulate a fetch delay and use Mock Data
      setTimeout(() => {
        setQuestions(MOCK_MCQ_DATA.questions);
        setExamTitle(MOCK_MCQ_DATA.title);
        setTimeLeft(MOCK_MCQ_DATA.duration * 60);
        setLoading(false);
      }, 1000);
    };
    fetchExam();
  }, [examId]);

  // 2. STRICT MODE LISTENERS (Freeze Logic)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) triggerFreeze("Tab Switched");
    };
    const handleBlur = () => {
      triggerFreeze("Window Focus Lost");
    };
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && (e.key === 'c' || e.key === 'v')) || e.key === 'F12') {
        e.preventDefault();
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // 3. FREEZE TIMER
  useEffect(() => {
    let timer;
    if (isFrozen && freezeTime > 0) {
      timer = setInterval(() => setFreezeTime((p) => p - 1), 1000);
    } else if (freezeTime === 0 && isFrozen) {
      setIsFrozen(false);
    }
    return () => clearInterval(timer);
  }, [isFrozen, freezeTime]);

  // 4. EXAM TIMER
  useEffect(() => {
    if (timeLeft > 0 && !loading && !isFrozen) {
      const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !loading) {
      handleSubmit(true); // Auto-submit
    }
  }, [timeLeft, loading, isFrozen]);

  const triggerFreeze = () => {
    if (!isFrozen) {
      setViolationCount((v) => v + 1);
      setFreezeTime(10); // 10s penalty
      setIsFrozen(true);
    }
  };

  const handleAnswer = (option) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQIndex].id]: option }));
  };

  const toggleReview = () => {
    const currentId = questions[currentQIndex].id;
    const newSet = new Set(markedForReview);
    if (newSet.has(currentId)) newSet.delete(currentId);
    else newSet.add(currentId);
    setMarkedForReview(newSet);
  };

  const handleSubmit = (auto = false) => {
    if (auto || window.confirm("Are you sure you want to submit?")) {
      console.log("Answers Submitted:", answers);
      alert("Exam Submitted Successfully!");
      navigate('/divisions/skill/exams');
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-gray-50 font-bold text-gray-600">Loading Exam...</div>;

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50 text-gray-800 font-sans select-none overflow-hidden relative">
      
      {/* 🔴 FROZEN OVERLAY */}
      {isFrozen && (
        <div className="fixed inset-0 z-[9999] bg-red-600 flex flex-col items-center justify-center text-white text-center p-4 animate-in fade-in duration-200">
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20 shadow-2xl max-w-lg w-full">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-4xl font-black mb-2 uppercase tracking-wider">Locked</h1>
            <h2 className="text-xl font-bold mb-6 text-red-100">Focus Violation Detected</h2>
            <div className="text-8xl font-mono font-bold mb-6 tabular-nums">{freezeTime}</div>
            <div className="bg-black/20 rounded-lg p-3 text-sm font-mono text-red-200">Total Violations: {violationCount}</div>
          </div>
        </div>
      )}

      {/* 🔹 HEADER */}
      <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm z-10">
        <div>
          <h1 className="text-lg font-bold text-gray-900">{examTitle}</h1>
          <p className="text-xs text-gray-500">Question {currentQIndex + 1} of {questions.length}</p>
        </div>
        <div className="flex items-center gap-6">
          <div className={`font-mono text-xl font-bold px-4 py-1 rounded ${timeLeft < 300 ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
            {formatTime(timeLeft)}
          </div>
          <button 
            onClick={() => handleSubmit(false)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition shadow-md"
          >
            Submit Exam
          </button>
        </div>
      </header>

      {/* 🔹 MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT: Question Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-6">
              <h2 className="text-xl font-medium text-gray-800 leading-relaxed mb-8">
                <span className="font-bold text-blue-600 mr-2">{currentQIndex + 1}.</span>
                {questions[currentQIndex].text}
              </h2>

              <div className="space-y-3">
                {questions[currentQIndex].options.map((opt, i) => (
                  <label 
                    key={i}
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      answers[questions[currentQIndex].id] === opt 
                      ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' 
                      : 'border-gray-100 hover:bg-gray-50 hover:border-gray-200'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                       answers[questions[currentQIndex].id] === opt ? 'border-blue-600' : 'border-gray-300'
                    }`}>
                      {answers[questions[currentQIndex].id] === opt && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                    </div>
                    <input 
                      type="radio" 
                      name={`q-${questions[currentQIndex].id}`} 
                      className="hidden"
                      checked={answers[questions[currentQIndex].id] === opt}
                      onChange={() => handleAnswer(opt)}
                    />
                    <span className="text-gray-700 font-medium">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button 
                onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQIndex === 0}
                className="px-6 py-2.5 rounded-lg font-semibold text-gray-600 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>
              
              <div className="flex gap-3">
                <button 
                  onClick={toggleReview}
                  className={`px-6 py-2.5 rounded-lg font-semibold border transition ${
                    markedForReview.has(questions[currentQIndex].id)
                    ? 'bg-amber-100 text-amber-700 border-amber-200'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {markedForReview.has(questions[currentQIndex].id) ? 'Marked for Review' : 'Mark for Review'}
                </button>
                <button 
                  onClick={() => setCurrentQIndex(prev => Math.min(questions.length - 1, prev + 1))}
                  disabled={currentQIndex === questions.length - 1}
                  className="px-8 py-2.5 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200 disabled:opacity-50 disabled:shadow-none transition"
                >
                  Next Question
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* RIGHT: Question Palette (Sidebar) */}
        <aside className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">Question Palette</h3>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-3 h-3 rounded-full bg-green-500"></span> Answered
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-3 h-3 rounded-full bg-amber-400"></span> Review
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-3 h-3 rounded-full bg-gray-200"></span> Unseen
              </div>
            </div>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="grid grid-cols-4 gap-3">
              {questions.map((q, idx) => {
                const isAnswered = answers[q.id];
                const isReview = markedForReview.has(q.id);
                const isCurrent = currentQIndex === idx;

                let btnClass = "bg-gray-100 text-gray-600 hover:bg-gray-200";
                if (isReview) btnClass = "bg-amber-100 text-amber-700 border-2 border-amber-400";
                else if (isAnswered) btnClass = "bg-green-100 text-green-700 border-2 border-green-500";
                
                if (isCurrent) btnClass += " ring-2 ring-blue-500 ring-offset-2";

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${btnClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <button 
                onClick={() => navigate('/divisions/skill/exams')}
                className="w-full py-3 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50 transition"
            >
                Quit Exam
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ExamEnvironmentPage;