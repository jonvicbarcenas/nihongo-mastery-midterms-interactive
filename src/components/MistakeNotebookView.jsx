import React, { useState } from 'react';
import { BookmarkCheck, RotateCcw, ArrowRight, Trash2, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/sound';
import confetti from 'canvas-confetti';
import { displayOption } from '../utils/practice';

export default function MistakeNotebookView({ mistakes, onRemoveMistake, onClearAllMistakes, showRomaji, audioEnabled }) {
  const [activeMistakeIndex, setActiveMistakeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isRetesting, setIsRetesting] = useState(false);

  const currentMistake = mistakes[activeMistakeIndex];

  const handleSelectOption = (idx) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    soundFx.click();
  };

  const handleSubmit = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOption === currentMistake.correctIndex;
    if (isCorrect) {
      soundFx.correct();
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 }, disableForReducedMotion: true });
    } else {
      soundFx.incorrect();
    }
  };

  const handleNext = (mastered) => {
    if (mastered && currentMistake) {
      onRemoveMistake(currentMistake.id);
    }
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    const nextIndex = mastered ? activeMistakeIndex : activeMistakeIndex + 1;
    const remainingCount = mistakes.length - (mastered ? 1 : 0);
    if (nextIndex >= remainingCount) {
      setActiveMistakeIndex(0);
      setIsRetesting(false);
    } else {
      setActiveMistakeIndex(nextIndex);
    }
  };

  if (mistakes.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-matcha-100 rounded-3xl flex items-center justify-center mx-auto text-matcha-600 mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Your Mistake Notebook is Clean!</h2>
        <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
          You haven't made any mistakes yet, or you've successfully mastered all of them. Keep testing your knowledge in the quizzes!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-rose-100 text-rose-700">
              {mistakes.length} Items to Review
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
            <span>Mistake Notebook & Targeted Review</span>
            <BookmarkCheck className="w-6 h-6 text-rose-600" />
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Retake questions you previously missed until you reach 100% mastery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isRetesting ? (
            <button
              onClick={() => {
                setIsRetesting(true);
                setActiveMistakeIndex(0);
                setSelectedOption(null);
                setIsAnswerSubmitted(false);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-torii-600 hover:bg-torii-700 text-white font-bold text-xs shadow-md transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Practice Missed Questions</span>
            </button>
          ) : (
            <button
              onClick={() => setIsRetesting(false)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              <span>Back to List</span>
            </button>
          )}

          <button
            onClick={onClearAllMistakes}
            className="p-2 rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition-colors"
            title="Clear all mistakes"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ACTIVE RETEST MODE */}
      {isRetesting && currentMistake ? (
        <div className="mt-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-3">
            <span>Question {activeMistakeIndex + 1} of {mistakes.length}</span>
            <span className="text-rose-600 font-bold uppercase">{currentMistake.lessonId}</span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
            <div
              className="bg-rose-500 h-full transition-all duration-300"
              style={{ width: `${((activeMistakeIndex + 1) / mistakes.length) * 100}%` }}
            ></div>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 leading-snug">
            {currentMistake.question}
          </h2>

          <div className="space-y-3 mb-6">
            {currentMistake.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentMistake.correctIndex;

              let style = 'border-slate-200 bg-white hover:border-slate-300 text-slate-700';
              if (isAnswerSubmitted) {
                if (isCorrect) {
                  style = 'border-matcha-500 bg-matcha-50 text-matcha-900 font-bold';
                } else if (isSelected) {
                  style = 'border-rose-500 bg-rose-50 text-rose-900 font-bold';
                } else {
                  style = 'opacity-50 border-slate-100 bg-slate-50 text-slate-400';
                }
              } else if (isSelected) {
                style = 'border-torii-600 bg-torii-50 text-torii-900 font-bold ring-2 ring-torii-200';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${style}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm min-w-0">{displayOption(opt, showRomaji)}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {isAnswerSubmitted && (
            <div role="status" className="p-4 rounded-2xl mb-6 bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium leading-relaxed">
              <strong className="text-slate-900 block mb-1">{selectedOption === currentMistake.correctIndex ? 'Correct! Ready to remove from review.' : 'Try this one again later.'}</strong>
              {currentMistake.explanation}
            </div>
          )}

          <div className="flex justify-end gap-3">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="px-6 py-3 rounded-2xl bg-torii-600 hover:bg-torii-700 text-white font-bold text-sm shadow-md transition-all disabled:opacity-40"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={() => handleNext(selectedOption === currentMistake.correctIndex)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all"
              >
                <span>{selectedOption === currentMistake.correctIndex ? 'Mastered! Remove & Next' : 'Keep & Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (

        /* MISTAKE CARDS BROWSE LIST */
        <div className="mt-6 space-y-4">
          {mistakes.map((q, idx) => (
            <div key={q.id || idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-100">
                    {q.lessonId}
                  </span>
                  <button
                    onClick={() => onRemoveMistake(q.id)}
                    className="text-slate-400 hover:text-rose-600 transition-colors"
                    title="Remove from notebook"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{q.question}</h3>
                <div className="p-3 bg-matcha-50/70 border border-matcha-200 rounded-xl text-xs text-matcha-950 font-medium">
                  <span className="font-bold text-matcha-700">Correct Answer:</span> {displayOption(q.options[q.correctIndex], showRomaji)}
                </div>
                <p className="text-xs text-slate-500 mt-2 font-medium">
                  {q.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
