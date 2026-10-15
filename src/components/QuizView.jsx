import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { LESSONS_METADATA } from '../data/lessonsData';
import { speech } from '../utils/speech';
import { soundFx } from '../utils/sound';
import confetti from 'canvas-confetti';
import { shuffle, shuffleQuestion, displayOption } from '../utils/practice';
import { CheckCircle2, XCircle, Volume2, ArrowRight, RotateCcw, Award, AlertCircle } from 'lucide-react';

function questionsForLesson(lessonId) {
  const pool = lessonId === 'all'
    ? shuffle(LESSONS_METADATA.flatMap(lesson =>
      shuffle(QUIZ_QUESTIONS.filter(q => q.lessonId === lesson.id)).slice(0, 3)))
    : QUIZ_QUESTIONS.filter(q => q.lessonId === lessonId);
  return pool.map(shuffleQuestion);
}

export default function QuizView({ showRomaji, audioEnabled, onAddMistake, initialLessonId = 'all' }) {
  const [selectedLessonId, setSelectedLessonId] = useState(initialLessonId);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState(() => questionsForLesson(initialLessonId));

  const restartQuiz = (lessonId) => {
    setSelectedLessonId(lessonId);
    setFilteredQuestions(questionsForLesson(lessonId));
    setActiveQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
  };

  const currentQ = filteredQuestions[activeQuestionIndex];

  const handleSelectOption = (index) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
    soundFx.click();
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOption === currentQ.correctIndex;
    if (isCorrect) {
      soundFx.correct();
      setScore(prev => prev + 1);
    } else {
      soundFx.incorrect();
      // Record to Mistake Notebook
      if (onAddMistake) {
        onAddMistake(currentQ);
      }
    }
  };

  const handleNextQuestion = () => {
    if (activeQuestionIndex + 1 < filteredQuestions.length) {
      setActiveQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Completed!
      setIsQuizCompleted(true);
      soundFx.fanfare();
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 }, disableForReducedMotion: true });
    }
  };

  const playQuestionAudio = (phrase) => {
    if (audioEnabled && phrase) {
      speech.speak(phrase);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Quiz Header & Lesson Selector */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
          <span>Interactive Quiz & Mock Exam</span>
          <CheckCircle2 className="w-6 h-6 text-torii-600" />
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Test your mastery of vocabulary, particles, numbers, and grammar rules from Professor Delantar's lessons.
        </p>

        {/* Lesson Selector Pills */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 text-xs font-bold">
          <button
            onClick={() => restartQuiz('all')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
              selectedLessonId === 'all'
                ? 'bg-gradient-to-r from-torii-600 to-rose-600 text-white shadow-md shadow-rose-200'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Mixed practice (18 questions)
          </button>

          {LESSONS_METADATA.map((lesson) => {
            const isSelected = selectedLessonId === lesson.id;
            return (
              <button
                key={lesson.id}
                onClick={() => restartQuiz(lesson.id)}
                className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Lesson {lesson.number} ({lesson.title})
              </button>
            );
          })}
        </div>
      </div>

      {/* QUIZ COMPLETION SCREEN */}
      {isQuizCompleted ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md text-center max-w-xl mx-auto animate-fade-in">
          <div className="w-16 h-16 bg-amber-100 rounded-3xl flex items-center justify-center mx-auto text-amber-600 mb-4 shadow-inner">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Quiz Complete!</h2>
          <p className="text-slate-500 text-sm mt-1">Here is how you performed on this session:</p>

          <div className="my-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 flex justify-around items-center">
            <div>
              <div className="text-3xl font-black text-torii-600">{score} / {filteredQuestions.length}</div>
              <div className="text-xs font-bold text-slate-400 uppercase mt-0.5">Correct Answers</div>
            </div>
            <div className="w-[1px] h-10 bg-slate-200"></div>
            <div>
              <div className="text-3xl font-black text-slate-900">
                {Math.round((score / filteredQuestions.length) * 100)}%
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase mt-0.5">Accuracy Rate</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => restartQuiz(selectedLessonId)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-torii-600 hover:bg-torii-700 text-white font-bold text-sm shadow-md transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>
          </div>
        </div>
      ) : currentQ ? (

        /* ACTIVE QUESTION CARD */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">

          {/* Progress Bar & Counter */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-3">
            <span>Question {activeQuestionIndex + 1} of {filteredQuestions.length}</span>
            <span className="text-torii-600 font-extrabold">Score: {score}</span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
            <div
              className="bg-gradient-to-r from-torii-500 to-rose-500 h-full transition-all duration-300"
              style={{ width: `${((activeQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {currentQ.question}
                </h2>
                {currentQ.japaneseQuestion && (
                  <p className="font-jp text-sm text-slate-500 mt-1 font-medium">
                    {currentQ.japaneseQuestion}
                  </p>
                )}
              </div>
              {currentQ.audioPhrase && (
                <button
                  disabled={!audioEnabled}
                  onClick={() => playQuestionAudio(currentQ.audioPhrase)}
                  className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
                  title="Hear Japanese pronunciation"
                >
                  <Volume2 className="w-5 h-5 text-torii-600" />
                </button>
              )}
            </div>
          </div>

          {/* 4 Multiple Choice Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let style = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  style = 'border-matcha-500 bg-matcha-50 text-matcha-900 font-bold ring-1 ring-matcha-500';
                } else if (isSelected) {
                  style = 'border-rose-500 bg-rose-50 text-rose-900 font-bold ring-1 ring-rose-500';
                } else {
                  style = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                style = 'border-torii-600 bg-torii-50 text-torii-900 font-bold ring-2 ring-torii-200';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-150 ${style}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm sm:text-base min-w-0">{displayOption(option, showRomaji)}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-matcha-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner (Shows after answer submission) */}
          {isAnswerSubmitted && (
            <div role="status" className={`p-4 rounded-2xl mb-6 border animate-fade-in ${
              selectedOption === currentQ.correctIndex
                ? 'bg-matcha-50 border-matcha-200 text-matcha-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}>
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-1">
                {selectedOption === currentQ.correctIndex ? (
                  <span className="text-matcha-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Correct Answer!
                  </span>
                ) : (
                  <span className="text-rose-700 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> Missed (Saved to Mistake Notebook)
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm mt-0.5 leading-relaxed font-medium">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action Button: Check Answer or Next Question */}
          <div className="flex justify-end">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-6 py-3 rounded-2xl bg-torii-600 hover:bg-torii-700 text-white font-bold text-sm shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all"
              >
                <span>{activeQuestionIndex + 1 < filteredQuestions.length ? 'Next Question' : 'View Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      ) : null}

    </div>
  );
}
