import React, { useState, useEffect } from 'react';
import { Volume2, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { LESSONS_METADATA } from '../data/lessonsData';
import { DIACRITIC_ROWS, DIGRAPH_ROWS } from '../data/lessonSupplements';
import { readStored, writeStored } from '../utils/storage';
import { speech } from '../utils/speech';
import LessonPractice from './LessonPractice';
import { WRITING_WORKSHEETS } from '../data/writingWorksheets';

function KanaChart({ lessonId, showRomaji, audioEnabled }) {
  const [selection, setSelection] = useState(null);
  const diacritics = lessonId === 'lesson-1-2';
  const rows = diacritics ? DIACRITIC_ROWS : DIGRAPH_ROWS;
  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6">
      <h2 className="text-lg font-extrabold">{diacritics ? 'All 25 diacritic kana' : 'All 33 digraphs'}</h2>
      <p className="text-sm text-slate-500 mt-1 mb-4">Tap a character to see how it is formed{audioEnabled ? ' and hear it' : ''}.</p>
      <div className="space-y-3">
        {rows.map(row => <div key={row[0]} className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <span className="text-xs font-bold text-slate-500 sm:w-16 shrink-0">{diacritics ? row[0] : `${row[0]} +`}</span>
          <div className={`grid gap-2 flex-1 ${diacritics ? 'grid-cols-5' : 'grid-cols-3'}`}>
            {(diacritics ? [...row[2]] : ['ゃ', 'ゅ', 'ょ']).map((char, i) => {
              const kana = diacritics ? char : row[0] + char;
              const reading = diacritics ? row[3][i] : row[2][i];
              return <button key={kana} aria-pressed={selection?.kana === kana}
                onClick={() => {
                  setSelection({ kana, reading, formula: diacritics
                    ? `${row[1][i]} + ${row[0] === 'H → P' ? '゜ (maru)' : '゛ (ten-ten)'} = ${kana}`
                    : `${row[0]} + small ${char} = ${kana}` });
                  if (audioEnabled) speech.speak(kana);
                }} className={`rounded-xl py-2 px-1 border ${selection?.kana === kana ? 'bg-torii-50 border-torii-500 text-torii-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block font-jp text-xl">{kana}</span>
                {showRomaji && <span className="block text-[11px] mt-1">{reading}</span>}
              </button>;
            })}
          </div>
        </div>)}
      </div>
      <p role="status" className="mt-4 bg-indigo-50 text-indigo-900 p-3 rounded-xl text-sm min-h-12">
        {selection ? <>{selection.formula}{showRomaji && ` · ${selection.reading}`}</>
          : diacritics ? 'ぢ and づ have special spellings; じ and ず are the usual choices for ji and zu.'
            : 'Compare full-sized きや (kiya) with small ゃ in きゃ (kya). A digraph is one combined sound.'}
      </p>
    </section>
  );
}

export default function LessonsView({ showRomaji, audioEnabled, onStartQuiz, onStartWriting, onAddMistake }) {
  const [lessonId, setLessonId] = useState(LESSONS_METADATA[0].id);
  const [cardIndex, setCardIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [remembered, setRemembered] = useState(() => readStored('nihongo_cards', [],
    value => Array.isArray(value) && value.every(item => typeof item === 'string')));
  const lesson = LESSONS_METADATA.find(item => item.id === lessonId);
  const card = lesson.vocabulary[cardIndex];
  const cardId = `${lessonId}:${card.jp}`;
  const count = lesson.vocabulary.filter(item => remembered.includes(`${lessonId}:${item.jp}`)).length;
  useEffect(() => writeStored('nihongo_cards', remembered), [remembered]);

  function moveCard(offset) {
    setCardIndex((cardIndex + offset + lesson.vocabulary.length) % lesson.vocabulary.length);
    setRevealed(false);
  }

  function rateCard(known) {
    setRemembered(previous => known ? [...new Set([...previous, cardId])] : previous.filter(id => id !== cardId));
    moveCard(1);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-torii-600 mb-2">Learn · Recall · Practice</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Your FL033 lessons</h1>
        <p className="text-sm text-slate-500 mt-2">Study the lecture rules, recall the words, then apply them in activities and quizzes.</p>
      </div>
      <section className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6">
        <h2 className="text-lg font-extrabold">Start with hiragana writing</h2>
        <p className="text-sm text-slate-500 mt-2">All 46 basic characters from the three writing PDFs, organized into the same ten worksheets. Watch, trace, then write from memory.</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
          {WRITING_WORKSHEETS.map(sheet => <button key={sheet.id} onClick={() => onStartWriting(sheet.id)}
            aria-label={`Open Writing ${sheet.number}`}
            className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-left">
            <span className="block text-xs font-bold text-indigo-700">Writing #{sheet.number}</span>
            <span className="block font-jp mt-1 text-sm whitespace-nowrap">{sheet.characters.join('')}</span>
          </button>)}
        </div>
        <p className="text-xs text-slate-500 mt-3">Sources: FL033 · Hiragana Writing #s 1–3 (3 pages), #s 4–6 (3 pages), and #s 7–10 (4 pages).</p>
      </section>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" aria-label="Choose a lesson">
        {LESSONS_METADATA.map(item => <button key={item.id} aria-pressed={item.id === lessonId}
          onClick={() => { setLessonId(item.id); setCardIndex(0); setRevealed(false); }}
          className={`p-3 text-left rounded-2xl border ${item.id === lessonId ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200'}`}>
          <span className="block text-xs font-bold">Lesson {item.number}</span>
          <span className="block text-xs sm:text-sm mt-1">{item.title}</span>
        </button>)}
      </div>
      <section className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-start">
          <div>
            <p className="text-xs font-bold text-torii-600">Lesson {lesson.number}</p>
            <h2 className="text-xl font-extrabold mt-1">{lesson.title}</h2>
            <p className="font-jp text-sm text-slate-500 mt-1" lang="ja">{lesson.japaneseTitle}</p>
          </div>
          <button onClick={() => onStartQuiz(lessonId)} className="shrink-0 px-4 py-3 rounded-xl bg-torii-600 text-white text-sm font-bold">Practice this lesson</button>
        </div>
        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600 list-disc pl-5">
          {lesson.rules.map(rule => <li key={rule}>{rule}</li>)}
        </ul>
        <p className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-500"><BookOpen className="w-4 h-4 inline mr-1" />
          Source: {lesson.source.file} · pages {lesson.source.pages}.
          {['lesson-2', 'lesson-3', 'lesson-4', 'lesson-6'].includes(lessonId) && ' Kana readings supplement the romaji in the slides.'}
        </p>
      </section>
      {['lesson-1-2', 'lesson-1-3'].includes(lessonId) && <KanaChart key={`chart-${lessonId}`} lessonId={lessonId} showRomaji={showRomaji} audioEnabled={audioEnabled} />}
      <section className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 space-y-4" aria-label="Vocabulary flashcards">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div>
            <h2 className="text-lg font-extrabold">Recall the vocabulary</h2>
            <p className="text-xs text-slate-500 mt-1">{count} / {lesson.vocabulary.length} self-marked remembered · saved on this device</p>
          </div>
          <button onClick={() => { setReverse(!reverse); setRevealed(false); }} className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-200">{reverse ? 'English → Japanese' : 'Japanese → Meaning'}</button>
        </div>
        <div className="h-2 rounded-full bg-slate-100 overflow-hidden" role="progressbar" aria-label="Remembered vocabulary" aria-valuenow={count} aria-valuemin={0} aria-valuemax={lesson.vocabulary.length}>
          <div className="bg-matcha-600 h-full" style={{ width: `${count / lesson.vocabulary.length * 100}%` }} />
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-8 text-center min-h-56 flex flex-col items-center justify-center" aria-live="polite">
          <p className="text-xs text-slate-500 mb-4">Card {cardIndex + 1} / {lesson.vocabulary.length}{remembered.includes(cardId) ? ' · Remembered' : ''}</p>
          <p className={`${reverse ? 'text-xl' : 'font-jp text-2xl sm:text-3xl'} font-bold w-full`} lang={reverse ? 'en' : 'ja'}>{reverse ? card.en : card.jp}</p>
          {revealed && <div className="mt-4 space-y-2">
            <p className={reverse ? 'font-jp text-2xl' : 'text-lg'}>{reverse ? card.jp : card.en}</p>
            {showRomaji && <p className="text-sm font-semibold text-torii-700">{card.romaji}</p>}
            {card.tip && <p className="text-xs text-slate-500">{card.tip}</p>}
          </div>}
          {(!reverse || revealed) && <button onClick={() => audioEnabled && speech.speak(card.jp)} disabled={!audioEnabled}
            aria-label="Hear flashcard" className="mt-3 p-3 rounded-xl bg-white border border-slate-200 disabled:opacity-40"><Volume2 className="w-5 h-5 text-torii-600" /></button>}
        </div>
        {!revealed ? <button onClick={() => setRevealed(true)} className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl">Reveal answer</button>
          : <div className="grid grid-cols-2 gap-3">
            <button onClick={() => rateCard(false)} className="py-3 px-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-sm">Study again</button>
            <button onClick={() => rateCard(true)} className="py-3 px-2 rounded-xl bg-matcha-600 text-white font-bold text-sm">I remembered</button>
          </div>}
        <div className="flex justify-between">
          <button onClick={() => moveCard(-1)} className="px-3 py-2 flex items-center gap-2 text-sm"><ArrowLeft className="w-4 h-4" />Previous</button>
          <button onClick={() => moveCard(1)} className="px-3 py-2 flex items-center gap-2 text-sm">Next<ArrowRight className="w-4 h-4" /></button>
        </div>
        <details className="border-t border-slate-200 pt-3">
          <summary className="cursor-pointer font-bold text-sm py-2">Browse all {lesson.vocabulary.length} words and expressions</summary>
          <div className="grid sm:grid-cols-2 gap-2 mt-3">
            {lesson.vocabulary.map(item => <div key={item.jp} className="p-3 rounded-xl bg-slate-50 flex gap-2 justify-between items-start">
              <div className="min-w-0"><p className="font-jp font-bold" lang="ja">{item.jp}</p>
                {showRomaji && <p className="text-xs text-torii-700 mt-1">{item.romaji}</p>}
                <p className="text-xs text-slate-600 mt-1">{item.en}</p>
                {item.tip && <p className="text-xs text-slate-500 mt-1">{item.tip}</p>}
              </div>
              <button onClick={() => audioEnabled && speech.speak(item.jp)} disabled={!audioEnabled} aria-label={`Hear ${item.jp}`}
                className="shrink-0 p-3 rounded-xl text-torii-600 disabled:opacity-40"><Volume2 className="w-4 h-4" /></button>
            </div>)}
          </div>
        </details>
      </section>
      <LessonPractice key={`activity-${lessonId}`} lessonId={lessonId} showRomaji={showRomaji} onAddMistake={onAddMistake} />
    </div>
  );
}
