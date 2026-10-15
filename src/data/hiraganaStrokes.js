// Adapted from KanjiVG, copyright Ulrich Apel and contributors, CC BY-SA 3.0.
// https://kanjivg.tagaini.net/ · See kanaStrokes.json and licenses/KanjiVG-COPYING.txt.
// Changes: extraction, scaling and composition into the lesson's digraphs.
import kanaData from './kanaStrokes.json';
import { DIACRITIC_ROWS, DIGRAPH_ROWS } from './lessonSupplements';
import { LESSONS_METADATA } from './lessonsData';
import { BASIC_KANA } from './writingWorksheets';

function strokesFor(kana) {
  const parts = [...kana];
  let index = 0;
  return parts.flatMap((part, partIndex) => {
    const scale = parts.length === 1 ? 180 / 109 : partIndex === 0 ? 1.12 : 0.72;
    const x = parts.length === 1 ? 10 : partIndex === 0 ? 0 : 115;
    const y = parts.length === 1 ? 10 : partIndex === 0 ? 8 : 78;
    return kanaData.paths[part].map((path, strokeIndex) => {
      const start = path.match(/[Mm]\s*([\d.-]+)[,\s]+([\d.-]+)/);
      return { id: ++index, path, scale, x, y, transform: `translate(${x} ${y}) scale(${scale})`,
        points: [{ x: Number(start[1]) * scale + x, y: Number(start[2]) * scale + y }],
        hint: `${part}: stroke ${strokeIndex + 1}. Start at the numbered dot and follow the highlighted path.` };
    });
  });
}

function makeItem(kana, romaji, category, lesson, subgroup, meaning) {
  const vocabulary = LESSONS_METADATA.find(item => item.id === (category === 'diacritics' ? 'lesson-1-2' : 'lesson-1-3')).vocabulary;
  const example = vocabulary.find(word => word.jp.includes(kana));
  return { id: kana, kana, romaji, category, lesson, subgroup, meaning, strokes: strokesFor(kana),
    example: example ? `${example.jp} (${example.romaji} - ${example.en})` : `${kana} (${romaji})` };
}

export const HIRAGANA_LESSON_ITEMS = [
  ...BASIC_KANA.map(item => ({
    ...makeItem(item.kana, item.romaji, 'basic', `Writing #${item.worksheetId}${item.kana === 'ん' ? ' · Lesson 1.5' : ''}`,
      'Basic hiragana', `Practice ${item.kana} from Hiragana Writing #${item.worksheetId}.`),
    ...item, example: `${item.kana} (${item.romaji})`,
  })),
  ...DIACRITIC_ROWS.flatMap(row => [...row[2]].map((kana, index) => makeItem(
    kana, row[3][index], 'diacritics', 'Lesson 1.2', row[0],
    `${row[1][index]} + ${row[0] === 'H → P' ? 'Handakuten (゜)' : 'Dakuten (゛)'} = ${kana}`))),
  ...DIGRAPH_ROWS.flatMap(row => ['ゃ', 'ゅ', 'ょ'].map((small, index) => makeItem(
    row[0] + small, row[2][index], 'digraphs', 'Lesson 1.3', 'Contracted sounds (Yōon)',
    `${row[0]} + small ${small} = ${row[0]}${small}`))),
  makeItem('っ', 'small tsu', 'special', 'Lesson 1.4', 'Long consonants (Sokuon)',
    'Small っ marks a pause before the following consonant: がっこう (gakkou).'),
];
