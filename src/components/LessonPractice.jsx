import React, { useState } from 'react';
import { NUMBER_EXERCISES, readJapaneseNumber, matchesNumberReading } from '../utils/numbers';
import { shuffle, shuffleQuestion } from '../utils/practice';
import { SENTENCE_EXERCISES } from '../data/lessonSupplements';

export default function LessonPractice({ lessonId, showRomaji, onAddMistake }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [selected, setSelected] = useState([]);
  const exercises = lessonId === 'lesson-3' ? NUMBER_EXERCISES : SENTENCE_EXERCISES[lessonId];
  const exercise = exercises?.[index];
  const [bank, setBank] = useState(() => shuffle((exercise?.tokens || []).map((text, id) => ({ text, id }))));
  const [result, setResult] = useState(null);
  if (!exercise) return null;

  const isNumbers = lessonId === 'lesson-3';
  const reading = isNumbers ? readJapaneseNumber(exercise.value) : null;
  const question = isNumbers
    ? exercise.direction === 'reading' ? `Write the reading for ${reading.formatted}.` : `Write the digits for ${reading.kana}.`
    : exercise.prompt;
  const expected = isNumbers
    ? exercise.direction === 'reading' ? `${reading.kana} (${reading.romaji})` : reading.formatted
    : exercise.tokens.join(' ');

  function checkAnswer(event) {
    event.preventDefault();
    if (result !== null) return;
    const correct = isNumbers
      ? exercise.direction === 'reading' ? matchesNumberReading(answer, exercise.value)
        : /^\d+$/.test(answer.replace(/,/g, '').trim()) && BigInt(answer.replace(/,/g, '').trim()) === BigInt(exercise.value)
      : selected.map(token => token.text).join(' ') === expected;
    setResult(correct);
    if (!correct && onAddMistake) {
      // Save an equivalent MCQ so the same skill can be retested in the notebook.
      const options = isNumbers ? [expected, ...NUMBER_EXERCISES.filter(item => item.value !== exercise.value).slice(0, 3).map(item => {
        const other = readJapaneseNumber(item.value);
        return exercise.direction === 'reading' ? `${other.kana} (${other.romaji})` : other.formatted;
      })] : [expected, ...[
        [...exercise.tokens].reverse(),
        [exercise.tokens[1], exercise.tokens[0], ...exercise.tokens.slice(2)],
        [...exercise.tokens.slice(1), exercise.tokens[0]],
      ].map(tokens => tokens.join(' '))];
      onAddMistake(shuffleQuestion({ id: `practice-${lessonId}-${index}`, lessonId, question,
        options, correctIndex: 0,
        explanation: `${exercise.explanation || 'Read the four-digit groups and apply the irregular hundreds/thousands.'} Source: page ${exercise.page}.`,
        audioPhrase: isNumbers ? reading.kana : exercise.tokens.join('') }));
    }
  }

  function next() {
    const nextIndex = (index + 1) % exercises.length;
    setIndex(nextIndex);
    setAnswer('');
    setSelected([]);
    setResult(null);
    setBank(shuffle((exercises[nextIndex].tokens || []).map((text, id) => ({ text, id }))));
  }

  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 space-y-4" aria-label="Lesson activity">
      <div className="flex flex-wrap justify-between gap-2">
        <h2 className="font-extrabold text-lg">{isNumbers ? 'Number worksheet practice' : 'Build the sentence'}</h2>
        <span className="text-xs text-slate-500">Activity {index + 1} / {exercises.length} · PDF page {exercise.page}</span>
      </div>
      <p className="text-sm text-slate-600">{isNumbers
        ? 'Practice both directions from the slides. Enter hiragana or romaji for a reading; enter digits for a number.'
        : 'Tap the tiles in order. Tap an answer tile to return it to the choices.'}</p>
      <p className="font-bold">{question}</p>
      {isNumbers && exercise.direction === 'digits' && showRomaji && <p className="text-sm text-slate-500">{reading.romaji}</p>}
      <form onSubmit={checkAnswer} className="space-y-4">
        {isNumbers ? (
          <div>
            <label htmlFor="number-answer" className="text-sm font-semibold block mb-2">Your answer</label>
            <input id="number-answer" value={answer} disabled={result !== null}
              onChange={event => setAnswer(event.target.value)} autoComplete="off"
              inputMode={exercise.direction === 'digits' ? 'numeric' : 'text'}
              className="w-full rounded-xl border border-slate-300 p-3" />
          </div>
        ) : (
          <>
            <div className="min-h-16 border-2 border-dashed border-slate-300 rounded-xl p-2 flex flex-wrap gap-2" aria-label="Your sentence">
              {selected.length === 0 && <span className="text-sm text-slate-400 p-2">Your sentence goes here</span>}
              {selected.map(token => <button type="button" key={token.id} disabled={result !== null}
                aria-label={`Remove ${token.text}`} onClick={() => setSelected(selected.filter(item => item.id !== token.id))}
                className="px-3 py-2 bg-torii-100 text-torii-700 rounded-lg font-jp">{token.text}</button>)}
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Sentence tiles">
              {bank.map(token => <button type="button" key={token.id}
                disabled={result !== null || selected.some(item => item.id === token.id)}
                onClick={() => setSelected([...selected, token])}
                className="px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 font-jp disabled:opacity-30">{token.text}</button>)}
            </div>
          </>
        )}
        {result === null ? <button type="submit" disabled={isNumbers ? !answer.trim() : selected.length !== bank.length}
          className="px-4 py-3 rounded-xl bg-torii-600 text-white font-bold disabled:opacity-40">Check activity</button>
          : <button type="button" onClick={next} className="px-4 py-3 rounded-xl bg-slate-900 text-white font-bold">Next activity</button>}
      </form>
      {result !== null && <div role="status" className={`p-4 rounded-xl text-sm ${result ? 'bg-green-50 text-green-900' : 'bg-rose-50 text-rose-900'}`}>
        <p className="font-bold">{result ? 'Correct!' : 'Keep practicing — saved to Mistake Review.'}</p>
        <p className="font-jp mt-2">{isNumbers && !showRomaji && exercise.direction === 'reading' ? reading.kana : expected}</p>
        {!isNumbers && showRomaji && <p className="mt-1">{exercise.romaji}</p>}
        <p className="mt-2">{exercise.explanation || 'Read each group from thousands to ones, then add its unit (万 / 億). Remember 300, 600, 800, 3,000 and 8,000 have special readings.'}</p>
      </div>}
    </section>
  );
}
