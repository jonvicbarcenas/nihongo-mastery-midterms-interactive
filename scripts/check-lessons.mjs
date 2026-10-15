import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { LESSONS_METADATA } from '../src/data/lessonsData.js';
import { QUIZ_QUESTIONS } from '../src/data/quizQuestions.js';
import { DIACRITIC_ROWS, DIGRAPH_ROWS } from '../src/data/lessonSupplements.js';
import { NUMBER_EXERCISES, readJapaneseNumber, matchesNumberReading } from '../src/utils/numbers.js';
import { matchesGuidedStroke } from '../src/utils/strokes.js';
import { shuffleQuestion, displayOption } from '../src/utils/practice.js';
import { readStored, writeStored } from '../src/utils/storage.js';
import { WRITING_WORKSHEETS, BASIC_KANA } from '../src/data/writingWorksheets.js';

const sourceFiles = [...new Set([...LESSONS_METADATA.map(lesson => lesson.source.file), ...WRITING_WORKSHEETS.map(sheet => sheet.file)])].sort();
const actualFiles = readdirSync(new URL('..', import.meta.url)).filter(file => file.endsWith('.pdf')).sort();
assert.equal(sourceFiles.length, 9);
if (actualFiles.length > 0 || process.argv.includes('--require-pdfs')) {
  assert.deepEqual(sourceFiles, actualFiles, 'Every local PDF must be mapped to a lesson or worksheet');
}
assert.equal(WRITING_WORKSHEETS.length, 10);
assert.equal(BASIC_KANA.length, 46);
assert.equal(new Set(BASIC_KANA.map(item => item.kana)).size, 46);
const kanaPaths = JSON.parse(readFileSync(new URL('../src/data/kanaStrokes.json', import.meta.url), 'utf8')).paths;
for (const item of BASIC_KANA) assert.ok(kanaPaths[item.kana]?.length, `Missing writing model for ${item.kana}`);
assert.deepEqual(WRITING_WORKSHEETS.map(sheet => sheet.characters.length), [5, 5, 5, 5, 5, 5, 5, 3, 5, 3]);

assert.equal(LESSONS_METADATA.length, 6);
assert.equal(LESSONS_METADATA.find(lesson => lesson.id === 'lesson-2').vocabulary.length, 48);
assert.equal(LESSONS_METADATA.find(lesson => lesson.id === 'lesson-4').vocabulary.length, 28);
assert.equal(DIACRITIC_ROWS.flatMap(row => [...row[2]]).length, 25);
assert.equal(DIGRAPH_ROWS.length * 3, 33);
assert.equal(new Set(QUIZ_QUESTIONS.map(question => question.id)).size, QUIZ_QUESTIONS.length);
for (const lesson of LESSONS_METADATA) {
  assert.ok(lesson.source.file.endsWith('.pdf'));
  assert.equal(new Set(lesson.vocabulary.map(word => word.jp)).size, lesson.vocabularyCount);
  assert.ok(QUIZ_QUESTIONS.filter(question => question.lessonId === lesson.id).length >= 3);
}
for (const question of QUIZ_QUESTIONS) {
  assert.equal(question.options.length, 4, question.id);
  assert.equal(new Set(question.options).size, 4, question.id);
  assert.ok(question.options[question.correctIndex], question.id);
  const shuffled = shuffleQuestion(question);
  assert.equal(shuffled.options[shuffled.correctIndex], question.options[question.correctIndex]);
}

// Independent readings transcribed from the Lesson 3 examples and worksheets.
const readings = [
  [0, 'zero'], [17, 'juu nana'], [23, 'nijuu san'], [48, 'yonjuu hachi'],
  [300, 'sanbyaku'], [600, 'roppyaku'], [800, 'happyaku'], [3000, 'sanzen'], [8000, 'hassen'],
  [164, 'hyaku rokujuu yon'], [349, 'sanbyaku yonjuu kyuu'], [518, 'gohyaku juu hachi'],
  [651, 'roppyaku gojuu ichi'], [727, 'nanahyaku nijuu nana'], [835, 'happyaku sanjuu go'],
  [1052, 'sen gojuu ni'], [2731, 'nisen nanahyaku sanjuu ichi'],
  [3215, 'sanzen nihyaku juu go'], [5176, 'gosen hyaku nanajuu roku'], [8523, 'hassen gohyaku nijuu san'],
  [3375, 'sanzen sanbyaku nanajuu go'], [4652, 'yonsen roppyaku gojuu ni'], [8133, 'hassen hyaku sanjuu san'],
  [6284, 'rokusen nihyaku hachijuu yon'], [1427, 'sen yonhyaku nijuu nana'], [5841, 'gosen happyaku yonjuu ichi'],
  [9768, 'kyuusen nanahyaku rokujuu hachi'], [2519, 'nisen gohyaku juu kyuu'], [7310, 'nanasen sanbyaku juu'], [5023, 'gosen nijuu san'],
  [1535, 'sen gohyaku sanjuu go'], [6209, 'rokusen nihyaku kyuu'], [4923, 'yonsen kyuuhyaku nijuu san'],
  [3356, 'sanzen sanbyaku gojuu roku'], [2064, 'nisen rokujuu yon'], [8828, 'hassen happyaku nijuu hachi'],
  [7302, 'nanasen sanbyaku ni'], [9354, 'kyuusen sanbyaku gojuu yon'], [5457, 'gosen yonhyaku gojuu nana'], [4601, 'yonsen roppyaku ichi'],
  [51181, 'go man sen hyaku hachijuu ichi'], [428820, 'yonjuu ni man hassen happyaku nijuu'],
  [7295030, 'nanahyaku nijuu kyuu man gosen sanjuu'], [1275343006, 'juu ni oku nanasen gohyaku sanjuu yon man sanzen roku'],
];
const compact = text => text.replace(/\s/g, '');
for (const [number, expected] of readings) {
  assert.equal(compact(readJapaneseNumber(number).romaji), compact(expected), String(number));
}
assert.equal(NUMBER_EXERCISES.length, 24);
assert.ok(matchesNumberReading('go man issen hyaku hachijuu ichi', 51181));
assert.ok(matchesNumberReading('さんぜんさんびゃくななじゅうご', 3375));
assert.ok(!matchesNumberReading('sansen sanhyaku nanajuu go', 3375));
assert.equal(readJapaneseNumber('1000000000000').kana, 'いっちょう');
assert.equal(readJapaneseNumber('8000000000000').kana, 'はっちょう');
assert.equal(readJapaneseNumber('10000000000000').kana, 'じゅっちょう');
assert.equal(readJapaneseNumber('9999999999999999').formatted, '9,999,999,999,999,999');
for (const input of ['', '-1', '1.5', '1e6', 'abc', '10000000000000000']) {
  assert.ok(readJapaneseNumber(input).error, input);
}
const target = Array.from({ length: 40 }, (_, i) => ({ x: 20 + i * 3, y: 30 + i }));
assert.ok(matchesGuidedStroke(target, target));
assert.ok(!matchesGuidedStroke([...target].reverse(), target));
assert.ok(!matchesGuidedStroke(target.map(p => ({ x: p.x + 80, y: p.y })), target));
assert.ok(!matchesGuidedStroke([target[0], { x: 195, y: 195 }, target.at(-1)], target));
assert.equal(displayOption('さんびゃく (sanbyaku)', false), 'さんびゃく');
assert.equal(displayOption('Three digits (like in English)', false), 'Three digits (like in English)');
global.localStorage = { getItem: () => '{broken', setItem: () => { throw new Error('unavailable'); } };
assert.equal(readStored('key', true), true);
assert.doesNotThrow(() => writeStored('key', true));
console.log(`Lesson checks passed: ${sourceFiles.length} PDFs mapped, 10 writing worksheets / 46 basic kana, ${LESSONS_METADATA.reduce((n, l) => n + l.vocabularyCount, 0)} flashcards, ${QUIZ_QUESTIONS.length} questions, ${readings.length} reference number readings, storage and stroke validation.`);
