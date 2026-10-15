import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { BASIC_NUMBERS_GUIDE, TENS_NUMBERS_GUIDE } from '../data/studyGuidesData';
import { speech } from '../utils/speech';

function NumberReadingChart({ title, numbers, note, showRomaji, audioEnabled }) {
  const [hiddenNumbers, setHiddenNumbers] = useState([]);
  const anyHidden = hiddenNumbers.length > 0;

  function toggleReading(num) {
    setHiddenNumbers(previous => previous.includes(num)
      ? previous.filter(value => value !== num) : [...previous, num]);
  }

  return (
    <section aria-label={title} className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-extrabold text-slate-900">{title}</h2>
        <button type="button" onClick={() => setHiddenNumbers(anyHidden ? [] : numbers.map(item => item.num))}
          className="px-3 py-2 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-bold">
          {anyHidden ? 'Show all readings' : 'Hide all readings'}
        </button>
      </div>
      <p className="text-sm text-slate-500 mt-2">Read each number, listen, then hide the readings and tap a card to check your memory.</p>
      <ol className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
        {numbers.map(item => {
          const visible = !hiddenNumbers.includes(item.num);
          return <li key={item.num} className="rounded-2xl border border-indigo-100 bg-indigo-50/60 flex flex-col">
            <button type="button" onClick={() => toggleReading(item.num)} aria-expanded={visible}
              aria-label={`${visible ? 'Hide' : 'Reveal'} reading for ${item.num}`}
              className="w-full p-3 text-left flex-1 rounded-2xl">
              <span className="flex items-center justify-between gap-2">
                <span className="text-xl font-extrabold text-indigo-900">{item.num}</span>
                <span lang="ja" className="font-jp text-xl text-indigo-400">{item.kanji}</span>
              </span>
              {visible ? <>
                <span lang="ja" className="block font-jp font-bold text-slate-900 mt-2">{item.kana}</span>
                {showRomaji && <span className="block text-xs text-indigo-700 mt-1">{item.romaji}</span>}
                {item.alternateKana && <span className="block text-xs text-slate-600 mt-2">
                  Also: <span lang="ja" className="font-jp">{item.alternateKana}</span>{showRomaji && ` (${item.alternateRomaji})`}
                </span>}
              </> : <span className="block text-xs text-indigo-700 mt-2 py-2">Tap to reveal</span>}
            </button>
            <button type="button" disabled={!audioEnabled} aria-label={`Hear number ${item.num}`}
              onClick={() => audioEnabled && speech.speak(item.kana)}
              className="m-2 mt-0 flex items-center justify-center gap-2 rounded-xl bg-white text-indigo-700 border border-indigo-100 text-xs font-bold disabled:opacity-40">
              <Volume2 className="w-4 h-4" />Listen
            </button>
          </li>;
        })}
      </ol>
      <p className="text-xs text-slate-500 mt-3">{note}</p>
    </section>
  );
}

export default function BasicNumbersChart({ showRomaji, audioEnabled }) {
  return (
    <div className="space-y-6">
      <NumberReadingChart title="Numbers 1–10" numbers={BASIC_NUMBERS_GUIDE}
        showRomaji={showRomaji} audioEnabled={audioEnabled}
        note="4, 7 and 9 have alternate readings. Use よん, なな and きゅう for general counting; other readings depend on context." />
      <NumberReadingChart title="Tens 10–90" numbers={TENS_NUMBERS_GUIDE}
        showRomaji={showRomaji} audioEnabled={audioEnabled}
        note={<>For 20–90, put the digit before <span lang="ja" className="font-jp">じゅう</span>{showRomaji && ' (juu)'}. Add ones after the ten: 21 = <span lang="ja" className="font-jp">にじゅういち</span>{showRomaji && ' (nijuu ichi)'}.</>} />
    </div>
  );
}
