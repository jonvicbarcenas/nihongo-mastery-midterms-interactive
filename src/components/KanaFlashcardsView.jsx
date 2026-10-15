import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, RotateCcw, Shuffle, Volume2 } from 'lucide-react';
import { KANA_FLASHCARDS, KANA_FLASHCARD_DECKS } from '../data/kanaFlashcards';
import { shuffleKanaDeck } from '../utils/kanaFlashcards';
import { speech } from '../utils/speech';

const cardsById = new Map(KANA_FLASHCARDS.map(card => [card.id, card]));
const deckGroups = [...new Set(KANA_FLASHCARD_DECKS.map(deck => deck.group))];

function FlashcardRound({ deck, audioEnabled, showRomaji }) {
  const [order, setOrder] = useState(() => shuffleKanaDeck(deck.cardIds));
  const [position, setPosition] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [ratings, setRatings] = useState({});
  const [isReview, setIsReview] = useState(false);
  const complete = position === order.length;
  const card = cardsById.get(order[position]);
  const remembered = order.filter(id => ratings[id] === 'remembered').length;
  const remaining = order.filter(id => ratings[id] !== 'remembered');

  function startRound(ids, review = false) {
    speech.stop();
    setOrder(shuffleKanaDeck(ids, card?.id || order.at(-1)));
    setPosition(0);
    setRevealed(false);
    setRatings({});
    setIsReview(review);
  }

  function move(offset) {
    speech.stop();
    setPosition(previous => Math.max(0, Math.min(order.length, previous + offset)));
    setRevealed(false);
  }

  function rate(value) {
    if (!revealed || !card) return;
    setRatings(previous => ({ ...previous, [card.id]: value }));
    move(1);
  }

  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 space-y-5" aria-label="Shuffled hiragana practice">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-extrabold text-lg">{isReview ? 'Review round' : deck.label}</h2>
          <p className="text-xs text-slate-500 mt-1">{complete ? 'Round complete' : `Card ${position + 1} of ${order.length}`} · {remembered} self-marked remembered</p>
        </div>
        <button type="button" onClick={() => startRound(deck.cardIds)}
          className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-bold">
          <Shuffle className="w-4 h-4 shrink-0" />Shuffle full deck
        </button>
      </div>
      <div role="progressbar" aria-label="Flashcard round progress" aria-valuenow={position} aria-valuemin={0} aria-valuemax={order.length}
        className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-600" style={{ width: `${position / order.length * 100}%` }} />
      </div>

      {complete ? (
        <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-5 sm:p-8 space-y-4" role="status">
          <h3 className="text-xl font-extrabold text-indigo-950">Round complete</h3>
          <p className="text-sm text-slate-700">You marked {remembered} of {order.length} cards remembered.</p>
          {remaining.length > 0 ? <>
            <p className="text-sm text-slate-600">Practice the cards you marked “Study again” or skipped in another shuffled round.</p>
            <button type="button" onClick={() => startRound(remaining, true)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm">
              <RotateCcw className="w-4 h-4 shrink-0" />Practice remaining ({remaining.length})
            </button>
          </> : <p className="text-sm text-indigo-800">You remembered every card in this round. Shuffle the full deck to practice again.</p>}
        </div>
      ) : (
        <>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-8 min-h-72 text-center flex flex-col items-center justify-center" aria-label="Current flashcard" aria-live="polite" aria-atomic="true">
            <p className="text-xs font-bold text-slate-500">{revealed ? 'Check your reading' : 'Read this aloud before revealing the answer'}</p>
            <p lang="ja" className="font-jp text-[6rem] sm:text-[8rem] leading-tight text-slate-900 my-4">{card.kana}</p>
            {revealed && <div className="space-y-3 w-full">
              <p className="text-2xl font-extrabold text-indigo-700" aria-label="Character reading">{card.reading}</p>
              <p className="text-xs font-bold text-slate-500">{card.lesson}</p>
              <p className="text-sm text-slate-600">{card.tip}</p>
              {!showRomaji && <p className="text-xs text-slate-500">The revealed answer includes the reading; Romaji hints stay hidden on the front.</p>}
              <button type="button" onClick={() => audioEnabled && speech.speak(card.audioExample || card.kana)} disabled={!audioEnabled}
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-indigo-700 text-sm font-bold disabled:opacity-40">
                <Volume2 className="w-4 h-4 shrink-0" />{card.audioExample ? 'Hear example' : 'Hear pronunciation'}
              </button>
            </div>}
          </div>
          <button type="button" onClick={() => { speech.stop(); setRevealed(!revealed); }} aria-expanded={revealed}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm">
            {revealed ? 'Hide answer' : 'Reveal answer'}
          </button>
          {revealed && <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => rate('again')}
              className="flex items-center justify-center gap-2 px-2 py-3 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 font-bold text-sm">
              <RotateCcw className="w-4 h-4 shrink-0" /><span>Study again</span>
            </button>
            <button type="button" onClick={() => rate('remembered')}
              className="flex items-center justify-center gap-2 px-2 py-3 rounded-xl bg-matcha-600 text-white font-bold text-sm">
              <Check className="w-4 h-4 shrink-0" /><span>I remembered</span>
            </button>
          </div>}
        </>
      )}

      <div role="group" aria-label="Flashcard navigation" className="grid grid-cols-2 gap-3">
        <button type="button" onClick={() => move(-1)} disabled={position === 0}
          className="flex items-center justify-center gap-2 px-2 py-2 rounded-xl border border-slate-200 text-sm font-bold disabled:opacity-40">
          <ArrowLeft className="w-4 h-4 shrink-0" /><span>Previous card</span>
        </button>
        <button type="button" onClick={() => move(1)} disabled={complete}
          className="flex items-center justify-center gap-2 px-2 py-2 rounded-xl border border-slate-200 text-sm font-bold disabled:opacity-40">
          <span>Next card</span><ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </div>
      <p className="text-xs text-slate-500">The shuffled deck contains each character once. Rate it after revealing, or use Next card to skip it. Switching decks starts a fresh round.</p>
    </section>
  );
}

export default function KanaFlashcardsView({ audioEnabled, showRomaji }) {
  const [deckId, setDeckId] = useState('all');
  const deck = KANA_FLASHCARD_DECKS.find(item => item.id === deckId);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-torii-600 mb-2">Read · Reveal · Recall</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Hiragana Flashcards</h1>
        <p className="text-sm text-slate-500 mt-2">Choose all characters or focus on a lesson. Recall the reading before revealing it, then revisit the cards that need practice.</p>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-4">
        <label htmlFor="kana-flashcard-deck" className="block text-sm font-bold mb-2">Flashcard deck</label>
        <select id="kana-flashcard-deck" value={deckId} onChange={event => { speech.stop(); setDeckId(event.target.value); }}
          className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm">
          {deckGroups.map(group => <optgroup key={group} label={group}>
            {KANA_FLASHCARD_DECKS.filter(item => item.group === group).map(item => <option key={item.id} value={item.id}>
              {item.label} ({item.cardIds.length} {item.cardIds.length === 1 ? 'card' : 'cards'})
            </option>)}
          </optgroup>)}
        </select>
      </div>
      <FlashcardRound key={deck.id} deck={deck} audioEnabled={audioEnabled} showRomaji={showRomaji} />
    </div>
  );
}
