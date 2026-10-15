import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DrawingCanvas from './components/DrawingCanvas';
import QuizView from './components/QuizView';
import StudyGuidesView from './components/StudyGuidesView';
import MistakeNotebookView from './components/MistakeNotebookView';
import LessonsView from './components/LessonsView';
import KanaFlashcardsView from './components/KanaFlashcardsView';
import { readStored, writeStored } from './utils/storage';
import { speech } from './utils/speech';
import { soundFx } from './utils/sound';

export default function App() {
  const [activeTab, setActiveTab] = useState('lessons');
  const [quizLessonId, setQuizLessonId] = useState('all');
  const [writingSheetId, setWritingSheetId] = useState('all');

  // Persisted settings
  const [showRomaji, setShowRomaji] = useState(() => {
    return readStored('nihongo_romaji', true, value => typeof value === 'boolean');
  });

  const [audioEnabled, setAudioEnabled] = useState(() => {
    return readStored('nihongo_audio', true, value => typeof value === 'boolean');
  });

  const [mistakes, setMistakes] = useState(() => {
    return readStored('nihongo_mistakes', [], value => Array.isArray(value) && value.every(question =>
      question && typeof question.id === 'string' && typeof question.question === 'string'
      && typeof question.explanation === 'string' && Array.isArray(question.options)
      && question.options.every(option => typeof option === 'string')
      && Number.isInteger(question.correctIndex) && question.correctIndex >= 0 && question.correctIndex < question.options.length));
  });

  // Sync settings with audio managers & localStorage
  useEffect(() => {
    writeStored('nihongo_romaji', showRomaji);
  }, [showRomaji]);

  useEffect(() => {
    writeStored('nihongo_audio', audioEnabled);
    speech.setEnabled(audioEnabled);
    soundFx.setEnabled(audioEnabled);
  }, [audioEnabled]);

  useEffect(() => {
    writeStored('nihongo_mistakes', mistakes);
  }, [mistakes]);

  useEffect(() => {
    speech.stop();
    window.scrollTo({ top: 0 });
  }, [activeTab]);

  // Handle adding mistake
  const handleAddMistake = (question) => {
    setMistakes((prev) => {
      if (prev.some(m => m.id === question.id)) return prev;
      return [...prev, question];
    });
  };

  // Handle removing mistake
  const handleRemoveMistake = (id) => {
    setMistakes(prev => prev.filter(m => m.id !== id));
  };

  // Clear all mistakes
  const handleClearAllMistakes = () => {
    setMistakes([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">

      {/* Sticky Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showRomaji={showRomaji}
        setShowRomaji={setShowRomaji}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
        mistakesCount={mistakes.length}
      />

      {/* Main Dynamic View */}
      <main id="main-content" className="flex-1 min-w-0 pb-10">
        {activeTab === 'lessons' && (
          <LessonsView showRomaji={showRomaji} audioEnabled={audioEnabled} onAddMistake={handleAddMistake}
            onStartWriting={sheetId => { setWritingSheetId(sheetId); setActiveTab('drawing'); }}
            onStartQuiz={lessonId => { setQuizLessonId(lessonId); setActiveTab('quizzes'); }} />
        )}
        {activeTab === 'drawing' && (
          <DrawingCanvas
            initialWorksheetId={writingSheetId}
            showRomaji={showRomaji}
            audioEnabled={audioEnabled}
          />
        )}

        {activeTab === 'flashcards' && (
          <KanaFlashcardsView showRomaji={showRomaji} audioEnabled={audioEnabled} />
        )}

        {activeTab === 'quizzes' && (
          <QuizView
            initialLessonId={quizLessonId}
            showRomaji={showRomaji}
            audioEnabled={audioEnabled}
            onAddMistake={handleAddMistake}
          />
        )}

        {activeTab === 'study' && (
          <StudyGuidesView
            showRomaji={showRomaji}
            audioEnabled={audioEnabled}
          />
        )}

        {activeTab === 'mistakes' && (
          <MistakeNotebookView
            mistakes={mistakes}
            onRemoveMistake={handleRemoveMistake}
            onClearAllMistakes={handleClearAllMistakes}
            showRomaji={showRomaji}
            audioEnabled={audioEnabled}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-semibold text-slate-600">
            FL033 Japanese Interactive Learning App • Based on Lecture Slides by Prof. Jinky R. Delantar, MBA, CPA
          </p>
          <p className="mt-1">
            Covers Hiragana Writing #1–10, Lesson 1.2 Diacritics, Lesson 1.3 Digraphs/Sokuon/N, Lesson 2 Greetings, Lesson 3 Numbers, Lesson 4 Sentence Patterns & Lesson 6 Particles.
          </p>
        </div>
      </footer>

    </div>
  );
}
