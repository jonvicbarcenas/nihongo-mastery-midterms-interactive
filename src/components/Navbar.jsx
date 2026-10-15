import React from 'react';
import { PenTool, CheckCircle2, BookOpen, BookmarkCheck, Volume2, VolumeX, Eye, EyeOff, Library, Layers } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, showRomaji, setShowRomaji,
  audioEnabled, setAudioEnabled, mistakesCount }) {
  const tabs = [
    { id: 'lessons', label: 'Lessons', icon: Library },
    { id: 'flashcards', label: 'Hiragana Flashcards', short: 'Cards', icon: Layers },
    { id: 'drawing', label: 'Kana Tracing', short: 'Tracing', icon: PenTool },
    { id: 'quizzes', label: 'Lesson Quizzes', short: 'Quizzes', icon: CheckCircle2 },
    { id: 'study', label: 'Study Guides', short: 'Guides', icon: BookOpen },
    { id: 'mistakes', label: 'Mistake Review', short: 'Review', icon: BookmarkCheck },
  ];
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between gap-2 py-2 sm:py-3">
          <button onClick={() => setActiveTab('lessons')} aria-label="NihongoMastery lessons" className="flex items-center gap-2 text-left min-w-0">
            <span className="w-9 h-9 shrink-0 rounded-xl bg-torii-600 text-white font-jp font-black text-xl flex items-center justify-center">日</span>
            <span className="min-w-0">
              <span className="block font-extrabold text-slate-900 text-sm sm:text-lg">NihongoMastery</span>
              <span className="block text-[10px] sm:text-xs text-slate-500">FL033 · Learn Japanese</span>
            </span>
          </button>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button onClick={() => setShowRomaji(!showRomaji)} aria-pressed={showRomaji}
              aria-label={showRomaji ? 'Hide Romaji hints' : 'Show Romaji hints'} title={showRomaji ? 'Hide Romaji hints' : 'Show Romaji hints'}
              className={`flex items-center justify-center gap-2 px-3 rounded-xl border ${showRomaji ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
              {showRomaji ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="hidden sm:inline text-xs font-bold">Romaji: {showRomaji ? 'ON' : 'OFF'}</span>
            </button>
            <button onClick={() => setAudioEnabled(!audioEnabled)} aria-pressed={audioEnabled}
              aria-label={audioEnabled ? 'Mute sound' : 'Enable sound'} title={audioEnabled ? 'Mute sound' : 'Enable sound'}
              className={`p-3 rounded-xl border ${audioEnabled ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <nav className="grid grid-cols-6 gap-1 border-t border-slate-100 py-1" aria-label="Main navigation">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return <button key={tab.id} onClick={() => setActiveTab(tab.id)} aria-current={activeTab === tab.id ? 'page' : undefined}
              aria-label={tab.label} className={`flex flex-col md:flex-row justify-center items-center gap-1 md:gap-2 py-2 px-1 rounded-xl text-[10px] sm:text-xs font-bold ${activeTab === tab.id ? 'bg-torii-50 text-torii-700' : 'text-slate-600 hover:bg-slate-50'}`}>
              <span className="relative"><Icon className="w-4 h-4" />
                {tab.id === 'mistakes' && mistakesCount > 0 && <span className="absolute -top-2 -right-3 rounded-full bg-rose-600 text-white text-[9px] px-1">{mistakesCount}</span>}
              </span>
              <span className="md:hidden">{tab.short || tab.label}</span>
              <span className="hidden md:inline">{tab.label}</span>
            </button>;
          })}
        </nav>
      </div>
    </header>
  );
}
