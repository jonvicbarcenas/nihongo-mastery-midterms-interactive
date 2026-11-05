const files = [
  'FL033 - Hiragana Writing #s 1-3.pdf',
  'FL033 - Hiragana Writing #s 4-6.pdf',
  'FL033 - Hiragana Writing #s 7-10.pdf',
];

export const WRITING_WORKSHEETS = [
  ['あいうえお', ['a', 'i', 'u', 'e', 'o']],
  ['かきくけこ', ['ka', 'ki', 'ku', 'ke', 'ko']],
  ['さしすせそ', ['sa', 'shi', 'su', 'se', 'so']],
  ['たちつてと', ['ta', 'chi', 'tsu', 'te', 'to']],
  ['なにぬねの', ['na', 'ni', 'nu', 'ne', 'no']],
  ['はひふへほ', ['ha', 'hi', 'fu', 'he', 'ho']],
  ['まみむめも', ['ma', 'mi', 'mu', 'me', 'mo']],
  ['やゆよ', ['ya', 'yu', 'yo']],
  ['らりるれろ', ['ra', 'ri', 'ru', 're', 'ro']],
  ['わをん', ['wa', 'wo / o', 'n']],
].map(([characters, readings], index) => ({
  id: String(index + 1), number: index + 1, characters: [...characters], readings,
  file: files[index < 3 ? 0 : index < 6 ? 1 : 2], page: index < 3 ? index + 1 : index < 6 ? index - 2 : index - 5,
}));

export const BASIC_KANA = WRITING_WORKSHEETS.flatMap(sheet => sheet.characters.map((kana, index) => ({
  kana, romaji: sheet.readings[index], worksheetId: sheet.id, source: sheet.file, page: sheet.page,
})));

export const KATAKANA_PREFINAL_WORKSHEETS = [
  { id: 'katakana-a', number: 1, name: 'A-row', characters: ['ア', 'イ', 'ウ', 'エ', 'オ'], readings: ['a', 'i', 'u', 'e', 'o'], title: 'A-row (a, i, u, e, o)' },
  { id: 'katakana-ka', number: 2, name: 'Ka-row', characters: ['カ', 'キ', 'ク', 'ケ', 'コ'], readings: ['ka', 'ki', 'ku', 'ke', 'ko'], title: 'Ka-row (ka, ki, ku, ke, ko)' },
  { id: 'katakana-sa', number: 3, name: 'Sa-row', characters: ['サ', 'シ', 'ス', 'セ', 'ソ'], readings: ['sa', 'shi', 'su', 'se', 'so'], title: 'Sa-row (sa, shi, su, se, so)' },
];

export const KATAKANA_PREFINAL_KANA = KATAKANA_PREFINAL_WORKSHEETS.flatMap(sheet => sheet.characters.map((kana, index) => ({
  kana,
  romaji: sheet.readings[index],
  worksheetId: sheet.id,
  source: 'Pre-final exam coverage: Katakana a-so',
  page: sheet.number,
})));
