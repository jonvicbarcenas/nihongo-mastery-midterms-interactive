// Interactive Study Guides and Cheat Sheets Data from Professor Delantar's Slides

export const IRREGULAR_NUMBERS_GUIDE = {
  title: 'Irregular Numbers Cheat Sheet',
  subtitle: 'Euphonic sound shifts you must memorize for exams',
  hundreds: [
    { num: 100, kanji: '百', kana: 'ひゃく', romaji: 'hyaku', regular: true },
    { num: 200, kanji: '二百', kana: 'にひゃく', romaji: 'nihyaku', regular: true },
    { num: 300, kanji: '三百', kana: 'さんびゃく', romaji: 'sanbyaku', regular: false, alert: 'Voiced: hyaku -> byaku' },
    { num: 400, kanji: '四百', kana: 'よんひゃく', romaji: 'yonhyaku', regular: true },
    { num: 500, kanji: '五百', kana: 'ごひゃく', romaji: 'gohyaku', regular: true },
    { num: 600, kanji: '六百', kana: 'ろっぴゃく', romaji: 'roppyaku', regular: false, alert: 'Double consonant + Handakuten: roku + hyaku -> roppyaku' },
    { num: 700, kanji: '七百', kana: 'ななひゃく', romaji: 'nanahyaku', regular: true },
    { num: 800, kanji: '八百', kana: 'はっぴゃく', romaji: 'happyaku', regular: false, alert: 'Double consonant + Handakuten: hachi + hyaku -> happyaku' },
    { num: 900, kanji: '九百', kana: 'きゅうひゃく', romaji: 'kyuuhyaku', regular: true }
  ],
  thousands: [
    { num: 1000, kanji: '千', kana: 'せん', romaji: 'sen', regular: true },
    { num: 2000, kanji: '二千', kana: 'にせん', romaji: 'nisen', regular: true },
    { num: 3000, kanji: '三千', kana: 'さんぜん', romaji: 'sanzen', regular: false, alert: 'Voiced: sen -> zen' },
    { num: 4000, kanji: '四千', kana: 'よんせん', romaji: 'yonsen', regular: true },
    { num: 5000, kanji: '五千', kana: 'ごせん', romaji: 'gosen', regular: true },
    { num: 6000, kanji: '六千', kana: 'ろくせん', romaji: 'rokusen', regular: true },
    { num: 7000, kanji: '七千', kana: 'ななせん', romaji: 'nanasen', regular: true },
    { num: 8000, kanji: '八千', kana: 'はっせん', romaji: 'hassen', regular: false, alert: 'Double consonant: hachi + sen -> hassen' },
    { num: 9000, kanji: '九千', kana: 'きゅうせん', romaji: 'kyuusen', regular: true }
  ]
};

export const PARTICLES_GUIDE = [
  {
    particle: 'は',
    romaji: 'wa',
    name: 'Topic Marker Particle',
    rule: 'Written as "ha" (は) but pronounced "wa". Indicates what the speaker is talking about.',
    formula: '[ Topic ] は [ Information / Statement ] です。',
    exampleJp: 'わたしは がくせいです。',
    exampleRomaji: 'Watashi wa gakusei desu.',
    exampleEn: 'I am a student.'
  },
  {
    particle: 'も',
    romaji: 'mo',
    name: 'Inclusive Particle ("Also / Too")',
    rule: 'Replaces particle は (wa) when the statement applies to this topic as well.',
    formula: '[ Topic ] も [ Statement ] です。',
    exampleJp: 'たなかさんも にほんじんです。',
    exampleRomaji: 'Tanaka-san mo Nihonjin desu.',
    exampleEn: 'Mr. Tanaka is also Japanese.'
  },
  {
    particle: 'の',
    romaji: 'no',
    name: 'Possessive / Linking Particle',
    rule: 'Connects two nouns (Noun 1 modifies Noun 2). Equivalent to "apostrophe s" or "of". Also represents the dash in telephone numbers.',
    formula: '[ Owner / Modifier ] の [ Object / Item ]',
    exampleJp: 'わたし の なまえ / がっこう の でんわ',
    exampleRomaji: 'watashi no namae / gakkou no denwa',
    exampleEn: 'My name / School\'s telephone'
  },
  {
    particle: 'か',
    romaji: 'ka',
    name: 'Question / Alternative Particle',
    rule: 'Placed at the very end of a sentence to make it a question (equivalent to "?"). When placed between two sentences, asks an alternative question.',
    formula: 'Sentence ですか。 / [A] ですか、[B] ですか。',
    exampleJp: 'ほん ですか、じしょ ですか。',
    exampleRomaji: 'Hon desu ka, jisho desu ka.',
    exampleEn: 'Is it a book, or a dictionary?'
  }
];

export const CONJUGATION_CHART = [
  { tense: 'Present Affirmative', japanese: '〜です', romaji: '~desu', english: 'is / am / are', example: 'がくせいです (I am a student)' },
  { tense: 'Present Negative', japanese: '〜じゃありません', romaji: '~ja arimasen', english: 'is not / am not / are not', example: 'がくせいじゃありません (I am not a student)' },
  { tense: 'Past Affirmative', japanese: '〜でした', romaji: '~deshita', english: 'was / were', example: 'がくせいでした (I was a student)' },
  { tense: 'Past Negative', japanese: '〜じゃありませんでした', romaji: '~ja arimasen deshita', english: 'was not / were not', example: 'がくせいじゃありませんでした (I was not a student)' }
];

export const N_PRONUNCIATION_RULES = [
  {
    condition: 'Before m, p, or b',
    sound: 'Pronounced as [m]',
    reason: 'The lips naturally close in anticipation of the following bilabial consonant.',
    examples: [
      { jp: 'しんぶん', romaji: 'shinbun', pronunciation: 'shimbun', en: 'newspaper' },
      { jp: 'えんぴつ', romaji: 'enpitsu', pronunciation: 'empitsu', en: 'pencil' },
      { jp: 'せんぱい', romaji: 'senpai', pronunciation: 'sempai', en: 'senior' },
      { jp: 'さんまい', romaji: 'sanmai', pronunciation: 'sammai', en: 'three sheets' },
      { jp: 'てんぷら', romaji: 'tenpura', pronunciation: 'tempura', en: 'fried batter shrimp' }
    ]
  },
  {
    condition: 'Before k, g, or w',
    sound: 'Pronounced as [ng]',
    reason: 'The back of the tongue touches the soft palate anticipating velar consonants.',
    examples: [
      { jp: 'ぎんこう', romaji: 'ginkou', pronunciation: 'gingkou', en: 'bank' },
      { jp: 'はんがく', romaji: 'hangaku', pronunciation: 'hanggaku', en: 'half price' },
      { jp: 'でんわ', romaji: 'denwa', pronunciation: 'dengwa', en: 'telephone' }
    ]
  },
  {
    condition: 'The third sound named on page 41',
    sound: 'The slides also list [n]',
    reason: 'These are simplified classroom pronunciation aids. Keep the spelling ん; listen to words in context. The slides give no detailed rule for the third sound.',
    examples: [
      { jp: 'かいだん', romaji: 'kaidan', pronunciation: 'kaidan', en: 'stairs' },
      { jp: 'ほん', romaji: 'hon', pronunciation: 'hon', en: 'book' }
    ]
  }
];
