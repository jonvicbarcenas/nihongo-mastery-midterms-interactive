import { BASIC_KANA, WRITING_WORKSHEETS } from './writingWorksheets.js';
import { DIACRITIC_ROWS, DIGRAPH_ROWS } from './lessonSupplements.js';

export const KATAKANA_FLASHCARDS = [
  { id: 'ア', kana: 'ア', reading: 'a', category: 'katakana', lesson: 'Pre-Final · Katakana A-row', tip: 'Katakana "a". 2 strokes. Top horizontal with diagonal down-left hook, then sweeping stroke.' },
  { id: 'イ', kana: 'イ', reading: 'i', category: 'katakana', lesson: 'Pre-Final · Katakana A-row', tip: 'Katakana "i". 2 strokes. Left diagonal slash, then straight vertical line (from radical 人).' },
  { id: 'ウ', kana: 'ウ', reading: 'u', category: 'katakana', lesson: 'Pre-Final · Katakana A-row', tip: 'Katakana "u". 3 strokes. Top dot, left drop, then horizontal with sweeping curve (roof shape).' },
  { id: 'エ', kana: 'エ', reading: 'e', category: 'katakana', lesson: 'Pre-Final · Katakana A-row', tip: 'Katakana "e". 3 strokes. Top horizontal bar, vertical stem, bottom wide horizontal bar (like capital I).' },
  { id: 'オ', kana: 'オ', reading: 'o', category: 'katakana', lesson: 'Pre-Final · Katakana A-row', tip: 'Katakana "o". 3 strokes. Horizontal bar, vertical hook down-left, and diagonal slash.' },
  { id: 'カ', kana: 'カ', reading: 'ka', category: 'katakana', lesson: 'Pre-Final · Katakana Ka-row', tip: 'Katakana "ka". 2 strokes. Exactly like hiragana か without the right drop stroke.' },
  { id: 'キ', kana: 'キ', reading: 'ki', category: 'katakana', lesson: 'Pre-Final · Katakana Ka-row', tip: 'Katakana "ki". 3 strokes. Two horizontal parallel bars crossed by a diagonal line.' },
  { id: 'ク', kana: 'ク', reading: 'ku', category: 'katakana', lesson: 'Pre-Final · Katakana Ka-row', tip: 'Katakana "ku". 2 strokes. Short diagonal slash down-left, then corner stroke sweeping down-left.' },
  { id: 'ケ', kana: 'ケ', reading: 'ke', category: 'katakana', lesson: 'Pre-Final · Katakana Ka-row', tip: 'Katakana "ke". 3 strokes. Top left slash, horizontal bar, and long curving stroke downwards.' },
  { id: 'コ', kana: 'コ', reading: 'ko', category: 'katakana', lesson: 'Pre-Final · Katakana Ka-row', tip: 'Katakana "ko". 2 strokes. Top horizontal turning down (corner), then bottom closing bar.' },
  { id: 'サ', kana: 'サ', reading: 'sa', category: 'katakana', lesson: 'Pre-Final · Katakana Sa-row', tip: 'Katakana "sa". 3 strokes. Top horizontal bar crossed by two downward strokes.' },
  { id: 'シ', kana: 'シ', reading: 'shi', category: 'katakana', lesson: 'Pre-Final · Katakana Sa-row', tip: 'Katakana "shi". 3 strokes. Two small diagonal dots, then an upward sweeping stroke from bottom-left.' },
  { id: 'ス', kana: 'ス', reading: 'su', category: 'katakana', lesson: 'Pre-Final · Katakana Sa-row', tip: 'Katakana "su". 2 strokes. Horizontal with acute diagonal bend, crossed by a sweeping right stroke.' },
  { id: 'セ', kana: 'セ', reading: 'se', category: 'katakana', lesson: 'Pre-Final · Katakana Sa-row', tip: 'Katakana "se". 2 strokes. Horizontal bar turning down with hook, crossed by an angled stroke.' },
  { id: 'ソ', kana: 'ソ', reading: 'so', category: 'katakana', lesson: 'Pre-Final · Katakana Sa-row', tip: 'Katakana "so". 2 strokes. Top-left dot, then downward sweeping stroke starting from the top-right.' },
];

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
  ...KATAKANA_FLASHCARDS,
];

const idsFor = category => KANA_FLASHCARDS.filter(card => card.category === category).map(card => card.id);

export const KANA_FLASHCARD_DECKS = [
  { id: 'all', label: 'All Hiragana & Katakana (120)', group: 'Complete decks', cardIds: KANA_FLASHCARDS.map(card => card.id) },
  { id: 'all-hiragana', label: 'All Hiragana (105)', group: 'Complete decks', cardIds: KANA_FLASHCARDS.filter(c => c.category !== 'katakana').map(card => card.id) },
  { id: 'katakana-prefinal', label: 'Pre-Final · All Katakana (ア〜ソ)', group: 'Pre-Final Katakana', cardIds: KATAKANA_FLASHCARDS.map(c => c.id) },
  { id: 'katakana-a', label: 'Katakana A-row (ア・イ・ウ・エ・オ)', group: 'Pre-Final Katakana', cardIds: ['ア', 'イ', 'ウ', 'エ', 'オ'] },
  { id: 'katakana-ka', label: 'Katakana Ka-row (カ・キ・ク・ケ・コ)', group: 'Pre-Final Katakana', cardIds: ['カ', 'キ', 'ク', 'ケ', 'コ'] },
  { id: 'katakana-sa', label: 'Katakana Sa-row (サ・シ・ス・セ・ソ)', group: 'Pre-Final Katakana', cardIds: ['サ', 'シ', 'ス', 'セ', 'ソ'] },
  { id: 'basic', label: 'Basic hiragana', group: 'Hiragana decks', cardIds: idsFor('basic') },
  { id: 'lesson-1-2', label: 'Lesson 1.2 · Diacritics', group: 'Kana lessons', cardIds: idsFor('diacritics') },
  { id: 'lesson-1-3', label: 'Lesson 1.3 · Digraphs', group: 'Kana lessons', cardIds: idsFor('digraphs') },
  { id: 'lesson-1-4', label: 'Lesson 1.4 · Small っ', group: 'Kana lessons', cardIds: ['っ'] },
  { id: 'lesson-1-5', label: 'Lesson 1.5 · ん', group: 'Kana lessons', cardIds: ['ん'] },
  ...WRITING_WORKSHEETS.map(sheet => ({
    id: `writing-${sheet.id}`, label: `Writing #${sheet.number} · ${sheet.characters.join('')}`,
    group: 'Writing worksheets', cardIds: sheet.characters,
  })),
];
