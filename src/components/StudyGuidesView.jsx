import React, { useState } from 'react';
import {
  IRREGULAR_NUMBERS_GUIDE,
  PARTICLES_GUIDE,
  CONJUGATION_CHART,
  N_PRONUNCIATION_RULES
} from '../data/studyGuidesData';
import { speech } from '../utils/speech';
import { readJapaneseNumber } from '../utils/numbers';
import { Volume2, Calculator, BookOpen } from 'lucide-react';

export default function StudyGuidesView({ showRomaji, audioEnabled }) {
  const [activeGuideTab, setActiveGuideTab] = useState('numbers');
  const [calcInput, setCalcInput] = useState('54200');

  const playAudio = (text) => {
    if (audioEnabled) {
      speech.speak(text);
    }
  };

  const parsed = readJapaneseNumber(calcInput);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
          <span>Lecture Study Guides & Cheat Sheets</span>
          <BookOpen className="w-6 h-6 text-torii-600" />
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Professor Delantar's rules, irregular phonetic tables, and interactive grammar reference sheets.
        </p>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 text-xs font-bold">
          <button
            onClick={() => setActiveGuideTab('numbers')}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              activeGuideTab === 'numbers'
                ? 'bg-torii-600 text-white shadow-md shadow-rose-200'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            🔢 Numbers & 4-Digit Splitter
          </button>
          <button
            onClick={() => setActiveGuideTab('particles')}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              activeGuideTab === 'particles'
                ? 'bg-torii-600 text-white shadow-md shadow-rose-200'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            🧩 Particles (は・も・の・か)
          </button>
          <button
            onClick={() => setActiveGuideTab('conjugation')}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              activeGuideTab === 'conjugation'
                ? 'bg-torii-600 text-white shadow-md shadow-rose-200'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            ⏳ Desu Conjugations
          </button>
          <button
            onClick={() => setActiveGuideTab('n_rules')}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              activeGuideTab === 'n_rules'
                ? 'bg-torii-600 text-white shadow-md shadow-rose-200'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            🗣️ Character 「ん」 Phonetics
          </button>
        </div>
      </div>

      {/* TAB 1: NUMBERS & 4-DIGIT GROUPING CALCULATOR */}
      {activeGuideTab === 'numbers' && (
        <div className="space-y-6">

          {/* Interactive 4-Digit Chunking Calculator */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-4 h-4" />
              <span>Interactive 4-Digit Grouping Tool (Step 1 & 2 from Slide 26)</span>
            </div>
            <h3 className="text-xl font-bold">Western (1,000s) vs Japanese (10,000s 万) Converter</h3>
            <p className="text-xs text-indigo-200 mt-1 max-w-2xl">
              "Large numbers of 5 digits and up are grouped by four digits in Japanese." Enter any number below:
            </p>

            <label htmlFor="grouping-number" className="block text-sm font-bold mt-4">Number to read</label>
            <div className="mt-2 flex flex-col lg:flex-row items-start gap-4">
              <input
                id="grouping-number"
                type="text"
                inputMode="numeric"
                maxLength={16}
                aria-invalid={Boolean(parsed.error)}
                aria-describedby="grouping-result"
                value={calcInput}
                onChange={(e) => setCalcInput(e.target.value)}
                placeholder="Enter a number (e.g. 54200)"
                className="w-full sm:w-64 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-mono text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <div className="flex flex-wrap items-center gap-2">
                {['51181', '428820', '7295030', '1275343006'].map(preset => (
                  <button
                    key={preset}
                    onClick={() => setCalcInput(preset)}
                    className="px-2.5 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-indigo-200 transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual 4-Digit Breakdown */}
            <div id="grouping-result" className="mt-6 space-y-4" aria-live="polite">
              {parsed.error ? <p className="text-sm text-rose-200">{parsed.error}</p> : <>
                <p className="text-sm text-indigo-100">{parsed.formatted} → split from the right into groups of four.</p>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center gap-3 text-center">
                  {parsed.groups.map(group => <div key={group.power} className="bg-indigo-500/20 border border-indigo-400/40 px-4 py-2 rounded-xl">
                    <div className="text-2xl font-black text-indigo-200">{group.value} {group.label === 'units' ? '' : group.label}</div>
                    <div className="text-xs text-indigo-200">{group.label === 'units' ? 'units' : `${group.romaji.split(' ').at(-1)} · 10^${group.power}`}</div>
                  </div>)}
                </div>
                <p className="font-jp text-lg">{parsed.kana}</p>
                {showRomaji && <p className="text-sm text-indigo-200">{parsed.romaji}</p>}
                <button onClick={() => playAudio(parsed.kana)} disabled={!audioEnabled} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 text-sm disabled:opacity-40"><Volume2 className="w-4 h-4" />Hear this number</button>
              </>}
            </div>
          </div>

          {/* Irregular Numbers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Hundreds Table */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
              <h3 className="font-extrabold text-slate-900 text-lg mb-1 flex flex-wrap gap-2 items-center justify-between">
                <span>Hundreds (百 - ひゃく)</span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">3 Irregulars</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">Notice 300, 600, and 800 sound shifts!</p>

              <div className="space-y-2">
                {IRREGULAR_NUMBERS_GUIDE.hundreds.map((item) => (
                  <div
                    key={item.num}
                    className={`p-3 rounded-xl border flex items-center gap-2 justify-between transition-colors ${
                      !item.regular
                        ? 'bg-amber-50/80 border-amber-300 font-bold'
                        : 'bg-slate-50 border-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="grid grid-cols-[3rem_1fr] items-center gap-x-1 gap-y-1 min-w-0">
                      <span className="font-mono text-sm font-bold text-slate-500">{item.num}</span>
                      <span className="font-jp text-base font-bold text-slate-900">{item.kana}</span>
                      {showRomaji && <span className="text-xs text-slate-500 col-start-2">({item.romaji})</span>}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-1 shrink-0">
                      {!item.regular && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-800 font-bold">
                          Irregular
                        </span>
                      )}
                      <button
                        aria-label={`Hear ${item.num}`}
                        disabled={!audioEnabled}
                        onClick={() => playAudio(item.kana)}
                        className="p-1 text-slate-400 hover:text-torii-600 transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Thousands Table */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
              <h3 className="font-extrabold text-slate-900 text-lg mb-1 flex flex-wrap gap-2 items-center justify-between">
                <span>Thousands (千 - せん)</span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">2 Irregulars</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">Notice 3,000 and 8,000 sound shifts!</p>

              <div className="space-y-2">
                {IRREGULAR_NUMBERS_GUIDE.thousands.map((item) => (
                  <div
                    key={item.num}
                    className={`p-3 rounded-xl border flex items-center gap-2 justify-between transition-colors ${
                      !item.regular
                        ? 'bg-amber-50/80 border-amber-300 font-bold'
                        : 'bg-slate-50 border-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="grid grid-cols-[3rem_1fr] items-center gap-x-1 gap-y-1 min-w-0">
                      <span className="font-mono text-sm font-bold text-slate-500">{item.num}</span>
                      <span className="font-jp text-base font-bold text-slate-900">{item.kana}</span>
                      {showRomaji && <span className="text-xs text-slate-500 col-start-2">({item.romaji})</span>}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-1 shrink-0">
                      {!item.regular && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-800 font-bold">
                          Irregular
                        </span>
                      )}
                      <button
                        aria-label={`Hear ${item.num}`}
                        disabled={!audioEnabled}
                        onClick={() => playAudio(item.kana)}
                        className="p-1 text-slate-400 hover:text-torii-600 transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: PARTICLES GUIDE */}
      {activeGuideTab === 'particles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PARTICLES_GUIDE.map((p, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-10 h-10 rounded-2xl bg-torii-100 text-torii-700 font-jp font-black text-xl flex items-center justify-center">
                      {p.particle}
                    </span>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">{p.name}</h3>
                      <span className="text-xs text-slate-400 font-bold">Pronounced: {p.romaji}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {p.rule}
                </p>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Formula</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5 font-mono">{p.formula}</div>
                </div>
              </div>

              <div className="p-3.5 bg-torii-50/60 border border-torii-100 rounded-2xl flex items-center justify-between">
                <div className="min-w-0">
                  <div className="font-jp text-sm font-bold text-torii-950">{p.exampleJp}</div>
                  {showRomaji && <div className="text-xs text-torii-700">{p.exampleRomaji}</div>}
                  <div className="text-xs text-slate-600 mt-0.5">{p.exampleEn}</div>
                </div>
                <button
                  aria-label={`Hear ${p.particle} example`}
                  disabled={!audioEnabled}
                  onClick={() => playAudio(p.exampleJp)}
                  className="p-3 shrink-0 rounded-xl bg-white text-torii-600 shadow-xs hover:bg-torii-100 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: CONJUGATION MATRIX */}
      {activeGuideTab === 'conjugation' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <h3 className="text-xl font-extrabold text-slate-900 mb-2">Desu Conjugation Chart (Lesson 4)</h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            The Japanese polite copula です (desu) conjugates for tense (present vs past) and polarity (affirmative vs negative).
          </p>

          <p className="text-xs text-slate-500 mb-2 sm:hidden">Swipe the table sideways to see the examples.</p>
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Desu conjugation table">
            <table className="w-full min-w-[640px] text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Tense & Polarity</th>
                  <th className="py-3 px-4">Japanese Form</th>
                  {showRomaji && <th className="py-3 px-4">Romaji</th>}
                  <th className="py-3 px-4">English Equivalent</th>
                  <th className="py-3 px-4">Sample Sentence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {CONJUGATION_CHART.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900">{c.tense}</td>
                    <td className="py-4 px-4 font-jp font-black text-torii-600 text-base">{c.japanese}</td>
                    {showRomaji && <td className="py-4 px-4 text-slate-500 font-mono text-xs">{c.romaji}</td>}
                    <td className="py-4 px-4 text-slate-700">{c.english}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-jp text-slate-800">{c.example}</span>
                        <button
                          aria-label={`Hear ${c.tense} example`}
                          disabled={!audioEnabled}
                          onClick={() => playAudio(c.example.split(' ')[0])}
                          className="text-slate-400 hover:text-torii-600"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: CHARACTER ん PHONETIC RULES */}
      {activeGuideTab === 'n_rules' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Character ん (N) Pronunciation Rules (Lesson 1.5)</h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              "The character ん is the only stand-alone consonant in Hiragana. Its sound morphs into [m], [ng], or [n] depending on the following consonants."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {N_PRONUNCIATION_RULES.map((rule, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-torii-600 mb-1">{rule.condition}</div>
                    <div className="text-lg font-black text-slate-900 mb-2">{rule.sound}</div>
                    <p className="text-xs text-slate-600 mb-4">{rule.reason}</p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-200">
                    {rule.examples.map((ex, eIdx) => (
                      <div key={eIdx} className="flex items-center justify-between text-xs bg-white p-2 rounded-xl border border-slate-100">
                        <div>
                          <span className="font-jp font-bold text-slate-900">{ex.jp}</span>
                          <span className="text-slate-400 ml-1.5 font-mono">[{ex.pronunciation}]</span>
                        </div>
                        <button
                          aria-label={`Hear ${ex.jp}`}
                          disabled={!audioEnabled}
                          onClick={() => playAudio(ex.jp)}
                          className="text-slate-400 hover:text-torii-600"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
