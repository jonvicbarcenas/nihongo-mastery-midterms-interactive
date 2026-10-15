const digits = [null, ['いち', 'ichi'], ['に', 'ni'], ['さん', 'san'], ['よん', 'yon'],
  ['ご', 'go'], ['ろく', 'roku'], ['なな', 'nana'], ['はち', 'hachi'], ['きゅう', 'kyuu']];
const hundreds = { 1: ['ひゃく', 'hyaku'], 3: ['さんびゃく', 'sanbyaku'],
  6: ['ろっぴゃく', 'roppyaku'], 8: ['はっぴゃく', 'happyaku'] };
const thousands = { 1: ['せん', 'sen'], 3: ['さんぜん', 'sanzen'], 8: ['はっせん', 'hassen'] };
const units = [
  { label: 'units', kana: '', romaji: '', power: 0 },
  { label: '万', kana: 'まん', romaji: 'man', power: 4 },
  { label: '億', kana: 'おく', romaji: 'oku', power: 8 },
  { label: '兆', kana: 'ちょう', romaji: 'chou', power: 12 },
];

function readChunk(value) {
  const parts = [];
  const th = Math.floor(value / 1000);
  const hu = Math.floor(value / 100) % 10;
  const te = Math.floor(value / 10) % 10;
  const one = value % 10;
  if (th) parts.push(thousands[th] || [digits[th][0] + 'せん', digits[th][1] + 'sen']);
  if (hu) parts.push(hundreds[hu] || [digits[hu][0] + 'ひゃく', digits[hu][1] + 'hyaku']);
  if (te) parts.push(te === 1 ? ['じゅう', 'juu'] : [digits[te][0] + 'じゅう', digits[te][1] + 'juu']);
  if (one) parts.push(digits[one]);
  return { kana: parts.map(p => p[0]).join(''), romaji: parts.map(p => p[1]).join(' ') };
}

export function readJapaneseNumber(input) {
  const text = String(input).trim();
  if (!/^\d{1,16}$/.test(text)) {
    return { error: 'Enter a whole number from 0 to 9,999,999,999,999,999 (up to 16 digits).' };
  }
  let value = BigInt(text);
  const formatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (value === 0n) return { groups: [{ ...units[0], value: 0 }], kana: 'ぜろ', romaji: 'zero', formatted };
  const groups = [];
  for (const unit of units) {
    const chunk = Number(value % 10000n);
    if (chunk) {
      const reading = readChunk(chunk);
      // Before 兆, final ichi/hachi/juu contract: icchou, hacchou, jucchou.
      const kana = unit.label === '兆'
        ? reading.kana.replace(/いち$/, 'いっ').replace(/はち$/, 'はっ').replace(/じゅう$/, 'じゅっ') : reading.kana;
      const romaji = unit.label === '兆'
        ? reading.romaji.replace(/ichi$/, 'ic').replace(/hachi$/, 'hac').replace(/juu$/, 'juc') : reading.romaji;
      groups.unshift({ ...unit, value: chunk,
        kana: kana + unit.kana,
        romaji: romaji + (unit.romaji ? (unit.label === '兆' && /(?:ic|hac|juc)$/.test(romaji) ? '' : ' ') + unit.romaji : '') });
    }
    value /= 10000n;
  }
  return { groups, kana: groups.map(g => g.kana).join(''),
    romaji: groups.map(g => g.romaji).join(' '), formatted };
}

// Both directions from Lesson 3, pages 23-24, plus the worked large-number examples.
export const NUMBER_EXERCISES = [
  ...[3375, 4652, 8133, 6284, 1427, 5841, 9768, 2519, 7310, 5023]
    .map(value => ({ value, direction: 'reading', page: 23 })),
  ...[1535, 6209, 4923, 3356, 2064, 8828, 7302, 9354, 5457, 4601]
    .map(value => ({ value, direction: 'digits', page: 24 })),
  ...[51181, 428820, 7295030, 1275343006]
    .map((value, index) => ({ value, direction: 'reading', page: 26 + index })),
];

export function matchesNumberReading(answer, value) {
  const normalize = text => text.normalize('NFKC').toLowerCase()
    .replace(/ō/g, 'ou').replace(/ū/g, 'uu').replace(/[\s-]/g, '');
  const expected = readJapaneseNumber(value);
  const actual = normalize(answer);
  return actual === normalize(expected.kana) || actual === normalize(expected.romaji)
    || actual === normalize(expected.romaji.replace(/\bsen\b/g, 'issen'));
}
