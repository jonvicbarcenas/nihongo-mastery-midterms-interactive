// Interactive Study Guides and Cheat Sheets Data from Professor Delantar's Slides

export const BASIC_NUMBERS_GUIDE = [
  { num: 1, kanji: '一', kana: 'いち', romaji: 'ichi' },
  { num: 2, kanji: '二', kana: 'に', romaji: 'ni' },
  { num: 3, kanji: '三', kana: 'さん', romaji: 'san' },
  { num: 4, kanji: '四', kana: 'よん', romaji: 'yon', alternateKana: 'し', alternateRomaji: 'shi' },
  { num: 5, kanji: '五', kana: 'ご', romaji: 'go' },
  { num: 6, kanji: '六', kana: 'ろく', romaji: 'roku' },
  { num: 7, kanji: '七', kana: 'なな', romaji: 'nana', alternateKana: 'しち', alternateRomaji: 'shichi' },
  { num: 8, kanji: '八', kana: 'はち', romaji: 'hachi' },
  { num: 9, kanji: '九', kana: 'きゅう', romaji: 'kyuu', alternateKana: 'く', alternateRomaji: 'ku' },
  { num: 10, kanji: '十', kana: 'じゅう', romaji: 'juu' },
];

export const TENS_NUMBERS_GUIDE = [
  { num: 10, kanji: '十', kana: 'じゅう', romaji: 'juu' },
  { num: 20, kanji: '二十', kana: 'にじゅう', romaji: 'nijuu' },
  { num: 30, kanji: '三十', kana: 'さんじゅう', romaji: 'sanjuu' },
  { num: 40, kanji: '四十', kana: 'よんじゅう', romaji: 'yonjuu' },
  { num: 50, kanji: '五十', kana: 'ごじゅう', romaji: 'gojuu' },
  { num: 60, kanji: '六十', kana: 'ろくじゅう', romaji: 'rokujuu' },
  { num: 70, kanji: '七十', kana: 'ななじゅう', romaji: 'nanajuu' },
  { num: 80, kanji: '八十', kana: 'はちじゅう', romaji: 'hachijuu' },
  { num: 90, kanji: '九十', kana: 'きゅうじゅう', romaji: 'kyuujuu' },
];

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

export const KOSOADO_GUIDE = {
  title: 'Ko-So-A-Do Demonstratives & Sentence Patterns',
  subtitle: 'FL033 Lesson 7 · Professor Jinky R. Delantar, MBA, CPA',
  distanceSystem: [
    { prefix: 'Ko~ (こ〜)', role: 'Near Speaker', desc: 'Thing, person, or place is close to the speaker (This / Here)', example: 'これ (kore) / この (kono)', color: 'rose' },
    { prefix: 'So~ (そ〜)', role: 'Near Listener', desc: 'Near listener, or slightly distant when sharing the same territory (That / There)', example: 'それ (sore) / その (sono)', color: 'blue' },
    { prefix: 'A~ (あ〜)', role: 'Far from Both', desc: 'Distant from both the speaker and listener (That over there / Over there)', example: 'あれ (are) / あの (ano)', color: 'emerald' },
    { prefix: 'Do~ (ど〜)', role: 'Interrogative', desc: 'Used to ask questions (Which / Where)', example: 'どれ (dore) / どの (dono)', color: 'purple' }
  ],
  koreVsKono: {
    title: 'Kore (これ) vs Kono (この) Distinction',
    kore: {
      type: 'Demonstrative Pronoun',
      structure: 'これ + は + [Noun] + です。',
      explanation: 'Stands completely on its own as the topic of the sentence. Followed directly by particle は (wa).',
      exampleJp: 'これ は スマホ です。',
      exampleRomaji: 'Kore wa sumaho desu.',
      exampleEn: 'This is a smart phone.'
    },
    kono: {
      type: 'Adnominal Demonstrative',
      structure: 'この + [Noun] + は + [Statement] + です。',
      explanation: 'Must be immediately followed by a noun. Modifies that specific item/person.',
      exampleJp: 'この スマホ は あたらしい です。',
      exampleRomaji: 'Kono sumaho wa atarashii desu.',
      exampleEn: 'This smart phone is new.'
    }
  },
  lesson71: {
    title: 'Lesson 7.1 Demonstratives for Things (これ・それ・あれ・どれ)',
    formula: 'Topic wa statement desu → [これ / それ / あれ] は [Noun] です。',
    rules: [
      'Kore, Sore, and Are act as the sentence topic marked with particle は (wa).',
      'The statement of the sentence is the noun being referred to.',
      'Nan (なん = what) replaces the statement when asking what the item is: 〜は なん です か。',
      'Ikura (いくら = how much) replaces the statement when asking for price: 〜は いくら です か。',
      'Dore (どれ = which) asks which one among three or more items: どれ です か。'
    ],
    sampleSentences: [
      { jp: 'これ は えんぴつ です。', romaji: 'Kore wa enpitsu desu.', en: 'This is a pencil.' },
      { jp: 'これ は ボールペン です。', romaji: 'Kore wa boorupen desu.', en: 'This is a ballpen.' },
      { jp: 'それ は ほん です。', romaji: 'Sore wa hon desu.', en: 'That is a book.' },
      { jp: 'それ は じしょ です。', romaji: 'Sore wa jisho desu.', en: 'That is a dictionary.' },
      { jp: 'あれ は しゃしん です。', romaji: 'Are wa shashin desu.', en: 'That is a picture over there.' },
      { jp: 'あれ は つくえ です。', romaji: 'Are wa tsukue desu.', en: 'That is a desk over there.' },
      { jp: 'これ は なん です か。', romaji: 'Kore wa nan desu ka.', en: 'What is this? (lit. This is what?)' },
      { jp: 'あれ は なん です か。', romaji: 'Are wa nan desu ka.', en: 'What is that over there?' },
      { jp: 'これ は いくら です か。', romaji: 'Kore wa ikura desu ka.', en: 'How much is this? (lit. This is how much?)' },
      { jp: 'どれ です か。', romaji: 'Dore desu ka.', en: 'Which one? / Which is it?' }
    ]
  },
  lesson72: {
    title: 'Lesson 7.2 Demonstratives for Specific Things & People (この・その・あの・どの)',
    formula: '[この / その / あの] + [Noun] は [Adjective / Ownership] です。',
    gaRule: 'CRITICAL EXAM RULE: In questions, 「どの + Noun」 is ALWAYS marked using particle が (ga) instead of は (wa): どの [Noun] が [Adjective] です か。',
    rules: [
      'Kono, Sono, and Ano precede a noun (thing or person).',
      'The statement may be an Adjective that describes the specific item (e.g. あたらしい, たかい, おおきい).',
      'The statement may express Ownership using [Person] の です (e.g. わたし の です, なかむらさん の です).',
      'Interrogative pattern: どの + Noun + が + Adjective + ですか。'
    ],
    sampleSentences: [
      { jp: 'この スマホ は あたらしい です。', romaji: 'Kono sumaho wa atarashii desu.', en: 'This smart phone is new.' },
      { jp: 'この カメラ は やすい です。', romaji: 'Kono kamera wa yasui desu.', en: 'This camera is inexpensive.' },
      { jp: 'その ラジオ は ふるい です。', romaji: 'Sono rajio wa furui desu.', en: 'That radio is old.' },
      { jp: 'その パソコン は ちいさい です。', romaji: 'Sono pasokon wa chiisai desu.', en: 'That laptop is small.' },
      { jp: 'あの くるま は たかい です。', romaji: 'Ano kuruma wa takai desu.', en: 'That car over there is expensive.' },
      { jp: 'あの くるま は わたし の です。', romaji: 'Ano kuruma wa watashi no desu.', en: 'That car over there is mine.' },
      { jp: 'あの テレビ は おおきい です。', romaji: 'Ano terebi wa ookii desu.', en: 'That television over there is big.' },
      { jp: 'あの テレビ は なかむら さん の です。', romaji: 'Ano terebi wa Nakamura san no desu.', en: 'That television over there is Mr. Nakamura’s.' },
      { jp: 'どの スマホ が あたらしい です か。', romaji: 'Dono sumaho ga atarashii desu ka.', en: 'Which smart phone is new? (Notice particle が!)' },
      { jp: 'どの くるま が たかい です か。', romaji: 'Dono kuruma ga takai desu ka.', en: 'Which car is expensive? (Notice particle が!)' }
    ]
  },
  vocabularyGroups: [
    {
      title: 'Stationery & School Items (Slide 4)',
      items: [
        { jp: 'ほん', romaji: 'hon', en: 'book' },
        { jp: 'じしょ', romaji: 'jisho', en: 'dictionary' },
        { jp: 'ノート', romaji: 'nooto', en: 'notebook' },
        { jp: 'えんぴつ', romaji: 'enpitsu', en: 'pencil' },
        { jp: 'シャープペンシル', romaji: 'shaapupenshiru', en: 'mechanical pencil' },
        { jp: 'ボールペン', romaji: 'boorupen', en: 'ballpen' }
      ]
    },
    {
      title: 'Bags & Identification Cards (Slide 5)',
      items: [
        { jp: 'かばん', romaji: 'kaban', en: 'bag; briefcase' },
        { jp: 'カード', romaji: 'kaado', en: 'card' },
        { jp: 'めいし', romaji: 'meishi', en: 'business card' },
        { jp: 'ざいりゅう カード', romaji: 'zairyuu kaado', en: 'residence card' },
        { jp: 'テレホン カード', romaji: 'terehon kaado', en: 'telephone card' },
        { jp: 'めんきょしょう', romaji: 'menkyoshou', en: 'driver’s license' }
      ]
    },
    {
      title: 'Publications & Furniture (Slide 6-7)',
      items: [
        { jp: 'しゃしん', romaji: 'shashin', en: 'picture / photograph' },
        { jp: 'しんぶん', romaji: 'shinbun', en: 'newspaper' },
        { jp: 'ざっし', romaji: 'zasshi', en: 'magazine' },
        { jp: 'てちょう', romaji: 'techou', en: 'pocket notebook' },
        { jp: 'つくえ', romaji: 'tsukue', en: 'desk' },
        { jp: 'テーブル', romaji: 'teeburu', en: 'table' },
        { jp: 'いす', romaji: 'isu', en: 'chair' },
        { jp: 'かぎ', romaji: 'kagi', en: 'key' },
        { jp: 'かさ', romaji: 'kasa', en: 'umbrella' },
        { jp: 'とけい', romaji: 'tokei', en: 'clock, watch' }
      ]
    },
    {
      title: 'Electronics & Transport (Slide 25-26)',
      items: [
        { jp: 'テレビ', romaji: 'terebi', en: 'television' },
        { jp: 'ラジオ', romaji: 'rajio', en: 'radio' },
        { jp: 'カメラ', romaji: 'kamera', en: 'camera' },
        { jp: 'パソコン', romaji: 'pasokon', en: 'laptop; personal computer' },
        { jp: 'コンピューター', romaji: 'konpyuutaa', en: 'computer' },
        { jp: 'でんわ', romaji: 'denwa', en: 'telephone' },
        { jp: 'けいたいでんわ', romaji: 'keitai denwa', en: 'cellphone; mobile phone' },
        { jp: 'スマホ', romaji: 'sumaho', en: 'smart phone' },
        { jp: 'くるま', romaji: 'kuruma', en: 'car' }
      ]
    },
    {
      title: 'Opposing Adjectives & Colors (Slide 27-28)',
      items: [
        { jp: 'おおきい ↔ ちいさい', romaji: 'ookii ↔ chiisai', en: 'big / large ↔ small / little' },
        { jp: 'あたらしい ↔ ふるい', romaji: 'atarashii ↔ furui', en: 'new ↔ old (things/places)' },
        { jp: 'たかい ↔ やすい', romaji: 'takai ↔ yasui', en: 'expensive ↔ cheap / inexpensive' },
        { jp: 'しろい / くろい', romaji: 'shiroi / kuroi', en: 'white / black' },
        { jp: 'あかい / あおい / きいろい', romaji: 'akai / aoi / kiiroi', en: 'red / blue / yellow' }
      ]
    }
  ]
};

export const KATAKANA_PREFINAL_GUIDE = {
  title: 'Katakana Pre-Final Exam Reference',
  subtitle: 'Coverage: a, i, u, e, o · ka, ki, ku, ke, ko · sa, shi, su, se, so (15 Characters)',
  rows: [
    {
      row: 'A-row (ア・イ・ウ・エ・オ)',
      chars: [
        { kana: 'ア', romaji: 'a', strokes: 2, tip: 'Two strokes. Top horizontal with hook, then diagonal sweep.' },
        { kana: 'イ', romaji: 'i', strokes: 2, tip: 'Two strokes. Left slanted drop, then vertical line (person radical 人).' },
        { kana: 'ウ', romaji: 'u', strokes: 3, tip: 'Three strokes. Top dot, left corner, and right roof curve.' },
        { kana: 'エ', romaji: 'e', strokes: 3, tip: 'Three strokes. Shaped like capital Roman numeral "I" or girder 工.' },
        { kana: 'オ', romaji: 'o', strokes: 3, tip: 'Three strokes. Top bar, vertical with left hook, then diagonal drop.' }
      ]
    },
    {
      row: 'Ka-row (カ・キ・ク・ケ・コ)',
      chars: [
        { kana: 'カ', romaji: 'ka', strokes: 2, tip: 'Two strokes. Exactly like hiragana か without the right dot.' },
        { kana: 'キ', romaji: 'ki', strokes: 3, tip: 'Three strokes. Two horizontal bars crossed by a diagonal slash.' },
        { kana: 'ク', romaji: 'ku', strokes: 2, tip: 'Two strokes. Slanted stroke, then corner stroke sweeping down.' },
        { kana: 'ケ', romaji: 'ke', strokes: 3, tip: 'Three strokes. Slash, horizontal bar, and long curving line.' },
        { kana: 'コ', romaji: 'ko', strokes: 2, tip: 'Two strokes. Top corner, then horizontal bottom base.' }
      ]
    },
    {
      row: 'Sa-row (サ・シ・ス・セ・ソ)',
      chars: [
        { kana: 'サ', romaji: 'sa', strokes: 3, tip: 'Three strokes. Horizontal line crossed by two vertical slashes.' },
        { kana: 'シ', romaji: 'shi', strokes: 3, tip: 'Three strokes. Two dots, then an upward sweep from bottom-left.' },
        { kana: 'ス', romaji: 'su', strokes: 2, tip: 'Two strokes. Right-angle hook with diagonal crossing leg. As in スマホ.' },
        { kana: 'セ', romaji: 'se', strokes: 2, tip: 'Two strokes. Horizontal bar with hook, crossed by an angled line.' },
        { kana: 'ソ', romaji: 'so', strokes: 2, tip: 'Two strokes. Small dot, then downward stroke from top-right.' }
      ]
    }
  ],
  lessonLoanwords: [
    { kana: 'ノート', romaji: 'nooto', en: 'notebook' },
    { kana: 'シャープペンシル', romaji: 'shaapupenshiru', en: 'mechanical pencil' },
    { kana: 'ボールペン', romaji: 'boorupen', en: 'ballpen' },
    { kana: 'カード', romaji: 'kaado', en: 'card' },
    { kana: 'テレホン カード', romaji: 'terehon kaado', en: 'telephone card' },
    { kana: 'テーブル', romaji: 'teeburu', en: 'table' },
    { kana: 'コンピューター', romaji: 'konpyuutaa', en: 'computer' },
    { kana: 'テレビ', romaji: 'terebi', en: 'television' },
    { kana: 'ラジオ', romaji: 'rajio', en: 'radio' },
    { kana: 'カメラ', romaji: 'kamera', en: 'camera' },
    { kana: 'パソコン', romaji: 'pasokon', en: 'laptop / personal computer' },
    { kana: 'スマホ', romaji: 'sumaho', en: 'smart phone' },
    { kana: 'エンジニア', romaji: 'enjinia', en: 'engineer (Lesson 4)' }
  ],
  examTips: [
    'Distinguish シ (shi) vs ツ (tsu): For シ (shi), the two dots are nearly vertical and the final stroke sweeps UPWARDS from bottom-left to top-right. For ツ (tsu), the dots are slanted side-by-side and the last stroke sweeps DOWNWARDS from top-right.',
    'Distinguish ソ (so) vs ン (n): For ソ (so), the dot is diagonal and the main stroke sweeps DOWNWARDS from top-right. For ン (n), the stroke sweeps UPWARDS from bottom-left.',
    'Long Vowel Mark (ー): Known as Chōonpu (長音符). Indicates a doubled vowel length in katakana loanwords (e.g. ノート nooto, カード kaado, テーブル teeburu).'
  ]
};

