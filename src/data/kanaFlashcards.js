import { BASIC_KANA, WRITING_WORKSHEETS } from './writingWorksheets.js';
import { DIACRITIC_ROWS, DIGRAPH_ROWS } from './lessonSupplements.js';

export const KANA_FLASHCARDS = [
  ...BASIC_KANA.map(item => ({
    id: item.kana, kana: item.kana, reading: item.romaji, category: 'basic',
    worksheetId: item.worksheetId, lesson: `Hiragana Writing #${item.worksheetId}`,
    tip: item.kana === 'を' ? 'Written wo; usually pronounced o when used as a particle.'
      : item.kana === 'ん' ? 'The standalone n sound. Its pronunciation changes with the following sound.'
        : 'A basic hiragana character.',
  })),
  ...DIACRITIC_ROWS.flatMap(row => [...row[2]].map((kana, index) => ({
    id: kana, kana, reading: row[3][index], category: 'diacritics', lesson: 'Lesson 1.2 · Diacritics',
    tip: `${row[1][index]} + ${row[0] === 'H → P' ? 'handakuten (゜)' : 'dakuten (゛)'} = ${kana}`,
  }))),
  ...DIGRAPH_ROWS.flatMap(row => ['ゃ', 'ゅ', 'ょ'].map((small, index) => ({
    id: row[0] + small, kana: row[0] + small, reading: row[2][index], category: 'digraphs',
    lesson: 'Lesson 1.3 · Digraphs', tip: `${row[0]} + small ${small} = ${row[0]}${small}. Read them as one combined sound.`,
  }))),
  { id: 'っ', kana: 'っ', reading: 'small tsu', category: 'sokuon', lesson: 'Lesson 1.4 · Sokuon', audioExample: 'がっこう',
    tip: 'A brief pause that doubles the following consonant, as in がっこう (gakkou). It is not a full tsu syllable.' },
];

const idsFor = category => KANA_FLASHCARDS.filter(card => card.category === category).map(card => card.id);

export const KANA_FLASHCARD_DECKS = [
  { id: 'all', label: 'All hiragana', group: 'Complete decks', cardIds: KANA_FLASHCARDS.map(card => card.id) },
  { id: 'basic', label: 'Basic hiragana', group: 'Complete decks', cardIds: idsFor('basic') },
  { id: 'lesson-1-2', label: 'Lesson 1.2 · Diacritics', group: 'Kana lessons', cardIds: idsFor('diacritics') },
  { id: 'lesson-1-3', label: 'Lesson 1.3 · Digraphs', group: 'Kana lessons', cardIds: idsFor('digraphs') },
  { id: 'lesson-1-4', label: 'Lesson 1.4 · Small っ', group: 'Kana lessons', cardIds: ['っ'] },
  { id: 'lesson-1-5', label: 'Lesson 1.5 · ん', group: 'Kana lessons', cardIds: ['ん'] },
  ...WRITING_WORKSHEETS.map(sheet => ({
    id: `writing-${sheet.id}`, label: `Writing #${sheet.number} · ${sheet.characters.join('')}`,
    group: 'Writing worksheets', cardIds: sheet.characters,
  })),
];
