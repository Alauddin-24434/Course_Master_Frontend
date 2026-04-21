"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Sparkles, CheckCircle2, XCircle, ArrowRight, RefreshCw } from "lucide-react";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

const QuizGeneratorModal = ({ lessonId, isOpen, onClose }: { lessonId: string; isOpen: boolean; onClose: () => void }) => {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAppSelector((state) => state.cmAuth);

  const generateQuiz = async () => {
    setIsLoading(true);
    setQuiz([]);
    setCurrentQuestion(0);
    setScore(0);
    setIsFinished(false);
    setSelectedAnswer(null);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ai/generate-quiz/${lessonId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuiz(response.data.data);
    } catch (error) {
      console.error("Quiz Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      generateQuiz();
    }
  }, [isOpen, lessonId]);

  const handleAnswer = (option: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    if (option === quiz[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-slate-900 rounded-3xl overflow-hidden p-0 border-none shadow-2xl">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl font-black">
              <Sparkles className="animate-pulse" /> AI Quiz Generator
            </DialogTitle>
          </DialogHeader>
          <p className="text-amber-100 text-sm mt-1">Test your knowledge for this lesson!</p>
        </div>

        <div className="p-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
                <Sparkles className="absolute inset-0 m-auto text-amber-600 animate-bounce" size={24} />
              </div>
              <p className="text-slate-500 font-medium animate-pulse">AI is crafting your quiz...</p>
            </div>
          ) : isFinished ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl font-black text-amber-600">{Math.round((score / quiz.length) * 100)}%</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Quiz Completed!</h3>
                <p className="text-slate-500">You scored {score} out of {quiz.length}</p>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={generateQuiz}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-bold hover:bg-slate-200 transition-all"
                >
                  <RefreshCw size={18} /> Retry
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-500/30"
                >
                  Done
                </button>
              </div>
            </div>
          ) : quiz.length > 0 ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-400">
                <span>Question {currentQuestion + 1} of {quiz.length}</span>
                <span className="text-amber-600">Score: {score}</span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight">
                {quiz[currentQuestion].question}
              </h3>

              <div className="grid gap-3">
                {quiz[currentQuestion].options.map((option, idx) => {
                  const isCorrect = option === quiz[currentQuestion].answer;
                  const isSelected = selectedAnswer === option;
                  const showResult = selectedAnswer !== null;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option)}
                      disabled={showResult}
                      className={`w-full p-4 rounded-2xl text-left font-medium transition-all border-2 ${
                        showResult
                          ? isCorrect
                            ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                            : isSelected
                            ? "bg-red-50 border-red-500 text-red-700"
                            : "bg-slate-50 border-slate-100 text-slate-400 opacity-50"
                          : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-amber-500 hover:bg-amber-50/50 text-slate-700 dark:text-slate-200 shadow-sm"
                      } flex items-center justify-between`}
                    >
                      {option}
                      {showResult && isCorrect && <CheckCircle2 size={20} className="text-emerald-500" />}
                      {showResult && isSelected && !isCorrect && <XCircle size={20} className="text-red-500" />}
                    </button>
                  );
                })}
              </div>

              {selectedAnswer && (
                <button
                  onClick={nextQuestion}
                  className="w-full py-4 bg-slate-900 dark:bg-amber-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-xl"
                >
                  {currentQuestion < quiz.length - 1 ? "Next Question" : "View Result"} <ArrowRight size={18} />
                </button>
              )}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500">
              Something went wrong. Please try again.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizGeneratorModal;
