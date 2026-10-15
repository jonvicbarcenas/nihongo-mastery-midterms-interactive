// Comprehensive Quiz Bank for FL033 Japanese Lessons
// Every question is rooted directly in Professor Jinky R. Delantar's lecture materials

import { ADDITIONAL_QUESTIONS } from './additionalQuestions.js';

export const QUIZ_QUESTIONS = [...ADDITIONAL_QUESTIONS,
  // ==========================================
  // LESSON 1.2: HIRAGANA DIACRITICS
  // ==========================================
  {
    id: 'q-1-2-1',
    lessonId: 'lesson-1-2',
    question: 'What are the two tiny diagonal strokes placed at the top-right corner of Hiragana called?',
    japaneseQuestion: 'ひらがなの右上の二つの斜め線を何と呼びますか？',
    options: ['Handakuten (maru)', 'Dakuten (ten-ten)', 'Sokuon (chiisai tsu)', 'Chouon (bou)'],
    correctIndex: 1,
    explanation: 'Dakuten (ten-ten) markers are two tiny diagonal strokes placed at the top right corner of characters to make them voiced (K→G, S→Z, T→D, H→B).',
    audioPhrase: 'だくてん'
  },
  {
    id: 'q-1-2-2',
    lessonId: 'lesson-1-2',
    question: 'When a Handakuten (maru ゜) is added to the "H" column characters (ha, hi, fu, he, ho), what sound do they produce?',
    japaneseQuestion: '「は行」に半濁音（丸）が付くとどの音になりますか？',
    options: ['B-sound (ba, bi, bu, be, bo)', 'P-sound (pa, pi, pu, pe, po)', 'M-sound (ma, mi, mu, me, mo)', 'G-sound (ga, gi, gu, ge, go)'],
    correctIndex: 1,
    explanation: 'Handakuten (maru) turns the "H" column into the "P" column: ぱ (pa), ぴ (pi), ぷ (pu), ぺ (pe), ぽ (po). Dakuten produces the "B" column.',
    audioPhrase: 'ぱぴぷぺぽ'
  },
  {
    id: 'q-1-2-3',
    lessonId: 'lesson-1-2',
    question: 'How do you correctly read the word 「しんぶん」 in English?',
    japaneseQuestion: '「しんぶん」の英語の意味は何ですか？',
    options: ['Pencil', 'Newspaper', 'Dictionary', 'Magazine'],
    correctIndex: 1,
    explanation: 'しんぶん (shinbun) means "newspaper". Notice the diacritic ぶ (bu).',
    audioPhrase: 'しんぶん'
  },
  {
    id: 'q-1-2-4',
    lessonId: 'lesson-1-2',
    question: 'Which of the following characters is typically used in modern Japanese to write the sound "ji"?',
    japaneseQuestion: '現代の日本語で「じ」を表すのに最も一般的に使われるのはどれですか？',
    options: ['ぢ (dji)', 'じ (ji)', 'ぎ (gi)', 'ざ (za)'],
    correctIndex: 1,
    explanation: 'As noted in the lecture slides, ぢ (dji) is almost never used except in special compound words like はなぢ (hanaji - nosebleed). じ is the standard character for "ji".',
    audioPhrase: 'じ'
  },
  {
    id: 'q-1-2-5',
    lessonId: 'lesson-1-2',
    question: 'What is the Japanese word for "stairs / staircase" containing diacritics?',
    japaneseQuestion: '「階段」をひらがなで正しく書いたものはどれですか？',
    options: ['かいだん (kaidan)', 'ぎんこう (ginkou)', 'えんぴつ (enpitsu)', 'べんごし (bengoshi)'],
    correctIndex: 0,
    explanation: 'かいだん (kaidan) means stairs/staircase. It uses だ (da), formed from た + dakuten.',
    audioPhrase: 'かいだん'
  },
  {
    id: 'q-1-2-6',
    lessonId: 'lesson-1-2',
    question: 'Which word contains the Handakuten (maru)?',
    japaneseQuestion: '半濁点（丸）が含まれている単語はどれですか？',
    options: ['えいご (eigo)', 'えんぴつ (enpitsu)', 'かぞく (kazoku)', 'ともだち (tomodachi)'],
    correctIndex: 1,
    explanation: 'えんぴつ (enpitsu - pencil) contains ぴ (pi), which has the handakuten (maru ゜).',
    audioPhrase: 'えんぴつ'
  },

  // ==========================================
  // LESSON 1.3 - 1.5: DIGRAPHS, SOKUON & ん
  // ==========================================
  {
    id: 'q-1-3-1',
    lessonId: 'lesson-1-3',
    question: 'In Hiragana Digraphs (Yōon), how is the second character (ya, yu, yo) written?',
    japaneseQuestion: '拗音（ようおん）において、二文字目の「ゃ・ゅ・ょ」はどのように書きますか？',
    options: ['Larger than the first character', 'A little bit smaller than normal', 'With a Dakuten mark', 'Directly underneath'],
    correctIndex: 1,
    explanation: 'In digraphs, the second character (ya, yu, yo) is written smaller (e.g. き + ゃ = きゃ kya).',
    audioPhrase: 'きゃ'
  },
  {
    id: 'q-1-3-2',
    lessonId: 'lesson-1-3',
    question: 'What is the correct Hiragana spelling for "hospital"?',
    japaneseQuestion: '「病院」を正しく表記したものはどれですか？',
    options: ['びよういん (biyouin)', 'びょういん (byouin)', 'びょいん (byoin)', 'びゅういん (byuuin)'],
    correctIndex: 1,
    explanation: 'びょういん (byouin) means hospital. (びよういん biyouin means beauty salon!). The digraph びょ is followed by prolonged う.',
    audioPhrase: 'びょういん'
  },
  {
    id: 'q-1-3-3',
    lessonId: 'lesson-1-3',
    question: 'What is the function of the small tsu (っ / chiisai tsu) in words like 「がっこう」 and 「かっぷ」?',
    japaneseQuestion: '「がっこう」や「かっぷ」の小さい「っ」の役割は何ですか？',
    options: ['Lengthens the vowel sound', 'Creates a double consonant (pause/glottal stop)', 'Changes the pitch to high', 'Marks a question'],
    correctIndex: 1,
    explanation: 'Small tsu (促音 sokuon) functions as a long/double consonant, creating a momentary breath catch before the next consonant (e.g., ga-kkou, ka-ppu).',
    audioPhrase: 'がっこう'
  },
  {
    id: 'q-1-3-4',
    lessonId: 'lesson-1-3',
    question: 'According to Professor Delantar\'s slides, how is the character 「ん」 pronounced when followed by m, p, or b (e.g. in 「しんぶん」 or 「えんぴつ」)?',
    japaneseQuestion: '「しんぶん」や「えんぴつ」のように、「ん」の後に m, p, b が続く時の発音はどうなりますか？',
    options: ['Pronounced as [ng]', 'Pronounced as [m]', 'Pronounced as [w]', 'It is silent'],
    correctIndex: 1,
    explanation: 'The character ん is pronounced as [m] when preceding m, p, or b because your lips close to form the next sound (e.g. "shimbun", "empitsu").',
    audioPhrase: 'しんぶん'
  },
  {
    id: 'q-1-3-5',
    lessonId: 'lesson-1-3',
    question: 'How is 「ん」 pronounced when it precedes k, g, or w (e.g. in 「ぎんこう」 or 「まんが」)?',
    japaneseQuestion: '「ぎんこう」や「まんが」のように、k, g, w の前での「ん」の発音はどうなりますか？',
    options: ['Pronounced as [m]', 'Pronounced as [ng]', 'Pronounced as [s]', 'Pronounced as [r]'],
    correctIndex: 1,
    explanation: 'Character ん is pronounced as [ng] before consonants k, g, or w (e.g. gingkou, mangga).',
    audioPhrase: 'ぎんこう'
  },
  {
    id: 'q-1-3-6',
    lessonId: 'lesson-1-3',
    question: 'What is the meaning of the double-consonant word 「きって」?',
    japaneseQuestion: '「きって」の意味は何ですか？',
    options: ['Ticket', 'Postage stamps', 'Coffee shop', 'Magazine'],
    correctIndex: 1,
    explanation: 'きって (kitte) means postage stamps. (きっぷ kippu means ticket).',
    audioPhrase: 'きって'
  },

  // ==========================================
  // LESSON 2: GREETINGS & COMMON EXPRESSIONS
  // ==========================================
  {
    id: 'q-2-1',
    lessonId: 'lesson-2',
    question: 'When someone says 「いってきます」 (Ittekimasu) upon leaving home, what should you reply?',
    japaneseQuestion: '誰かが「いってきます」と言って出かける時、何と返答しますか？',
    options: ['おかえりなさい (Okaerinasai)', 'いってらっしゃい (Itterasshai)', 'いただきます (Itadakimasu)', 'どういたしまして (Dou itashimashite)'],
    correctIndex: 1,
    explanation: 'いってらっしゃい (Itterasshai - "Please go and come back safely") is the standard response to いってきます (Ittekimasu).',
    audioPhrase: 'いってらっしゃい'
  },
  {
    id: 'q-2-2',
    lessonId: 'lesson-2',
    question: 'What phrase do you say after finishing a delicious meal?',
    japaneseQuestion: '食事を食べ終わった後に言う挨拶は何ですか？',
    options: ['いただきます (Itadakimasu)', 'ごちそうさまでした (Gochisousama deshita)', 'はじめまして (Hajimemashite)', 'じゃあ、また (Jaa, mata)'],
    correctIndex: 1,
    explanation: 'ごちそうさまでした (Gochisousama deshita) is said after a meal. いただきます is said before beginning to eat.',
    audioPhrase: 'ごちそうさまでした'
  },
  {
    id: 'q-2-3',
    lessonId: 'lesson-2',
    question: 'What is the response when someone returns home saying 「ただいま」 (Tadaima)?',
    japaneseQuestion: '「ただいま」に対する正しい返答はどれですか？',
    options: ['おかえりなさい (Okaerinasai)', 'いってらっしゃい (Itterasshai)', 'おやすみなさい (Oyasumi nasai)', 'ごめんなさい (Gomen nasai)'],
    correctIndex: 0,
    explanation: 'おかえりなさい (Okaerinasai) means "Welcome home", the natural paired response to ただいま (Tadaima - "I am back").',
    audioPhrase: 'おかえりなさい'
  },
  {
    id: 'q-2-4',
    lessonId: 'lesson-2',
    question: 'When introducing yourself for the very first time, which greeting begins the introduction?',
    japaneseQuestion: '初めて自己紹介をする時、最初に言う挨拶はどれですか？',
    options: ['こんにちは (Konnichiwa)', 'はじめまして (Hajimemashite)', 'おひさしぶり (Ohisashiburi)', 'がんばってください (Ganbatte kudasai)'],
    correctIndex: 1,
    explanation: 'はじめまして (Hajimemashite) literally means "This is the first time" and translates to "How do you do? / Nice to meet you".',
    audioPhrase: 'はじめまして'
  },
  {
    id: 'q-2-5',
    lessonId: 'lesson-2',
    question: 'What polite expression is used when encouraging someone to do their best on an exam or task?',
    japaneseQuestion: '試験や仕事で「ベストを尽くしてね」と励ます時の表現は？',
    options: ['よくできました (Yoku dekimashita)', 'がんばってください (Ganbatte kudasai)', 'きをつけてください (Kiotsukete kudasai)', 'どうぞ (Douzo)'],
    correctIndex: 1,
    explanation: 'がんばってください (Ganbatte kudasai) means "Please do your best / Good luck!".',
    audioPhrase: 'がんばってください'
  },

  // ==========================================
  // LESSON 3: NUMBERS
  // ==========================================
  {
    id: 'q-3-1',
    lessonId: 'lesson-3',
    question: 'What is the correct Japanese reading for the number 300?',
    japaneseQuestion: '数字の「300」の正しい読み方はどれですか？',
    options: ['さんひゃく (sanhyaku)', 'さんびゃく (sanbyaku)', 'さんぴゃく (sanpyaku)', 'さんぜん (sanzen)'],
    correctIndex: 1,
    explanation: '300 undergoes a euphonic shift: さんびゃく (sanbyaku). "sanhyaku" is grammatically incorrect.',
    audioPhrase: 'さんびゃく'
  },
  {
    id: 'q-3-2',
    lessonId: 'lesson-3',
    question: 'Which of the following numbers undergoes a double-consonant Handakuten change to 「ろっぴゃく」?',
    japaneseQuestion: '「ろっぴゃく」と読む数字はどれですか？',
    options: ['60', '600', '6,000', '60,000'],
    correctIndex: 1,
    explanation: '600 is read as ろっぴゃく (roppyaku). (800 is はっぴゃく happyaku).',
    audioPhrase: 'ろっぴゃく'
  },
  {
    id: 'q-3-3',
    lessonId: 'lesson-3',
    question: 'What is the irregular reading for 3,000?',
    japaneseQuestion: '数字の「3,000」の正しい読み方はどれですか？',
    options: ['さんせん (sansen)', 'さんぜん (sanzen)', 'さんびゃく (sanbyaku)', 'みっせん (misen)'],
    correctIndex: 1,
    explanation: '3,000 is voiced to さんぜん (sanzen). 8,000 is はっせん (hassen).',
    audioPhrase: 'さんぜん'
  },
  {
    id: 'q-3-4',
    lessonId: 'lesson-3',
    question: 'In Japanese, large numbers are grouped into units of how many digits?',
    japaneseQuestion: '日本語の大きな数字（万、億など）は何桁ごとに区切られますか？',
    options: ['Three digits (like in English: thousands, millions)', 'Four digits (万 man, 億 oku)', 'Five digits', 'Two digits'],
    correctIndex: 1,
    explanation: 'Japanese numbers group by four digits: 万 (man = 10^4), 億 (oku = 10^8), 兆 (chou = 10^12).',
    audioPhrase: 'いちまん'
  },
  {
    id: 'q-3-5',
    lessonId: 'lesson-6',
    question: 'How is the dash in telephone numbers (e.g. 272-1416) pronounced in Japanese?',
    japaneseQuestion: '電話番号のハイフン「-」は日本語で何と発音しますか？',
    options: ['は (wa)', 'の (no)', 'か (ka)', 'も (mo)'],
    correctIndex: 1,
    explanation: 'As taught in Lesson 6, page 13, particle の (no) is inserted between telephone numbers to represent the dash.',
    audioPhrase: 'の'
  },
  {
    id: 'q-3-6',
    lessonId: 'lesson-3',
    question: 'How do you read the number 835 in Japanese?',
    japaneseQuestion: '数字の「835」を日本語で正しく読むとどれですか？',
    options: ['はちひゃく さんじゅう ご', 'はっぴゃく さんじゅう ご', 'はちびゃく ごじゅう さん', 'はっせん さんじゅう ご'],
    correctIndex: 1,
    explanation: '800 (happyaku) + 30 (sanjuu) + 5 (go) = はっぴゃく さんじゅう ご (happyaku sanjuu go).',
    audioPhrase: 'はっぴゃくさんじゅうご'
  },

  // ==========================================
  // LESSON 4: BASIC SENTENCE PATTERNS
  // ==========================================
  {
    id: 'q-4-1',
    lessonId: 'lesson-4',
    question: 'In the sentence pattern 「[Topic] wa [Statement] desu」, what particle marks the topic?',
    japaneseQuestion: '基本文型「〜は〜です」において、主題（トピック）を表す助詞は何ですか？',
    options: ['か (ka)', 'の (no)', 'は (wa)', 'も (mo)'],
    correctIndex: 2,
    explanation: 'Particle は is the topic marker. Even though it is written as "ha" (は), it is pronounced "wa" when used as a particle.',
    audioPhrase: 'わたしはがくせいです'
  },
  {
    id: 'q-4-2',
    lessonId: 'lesson-4',
    question: 'What is the present negative form of 「です」 (desu)?',
    japaneseQuestion: '「です」の現在否定形は何ですか？',
    options: ['でした (deshita)', 'じゃありません (ja arimasen)', 'じゃありませんでした (ja arimasen deshita)', 'ではありませんでした (dewa arimasen deshita)'],
    correctIndex: 1,
    explanation: 'じゃありません (ja arimasen) is the present negative form of です (meaning "is not / am not / are not").',
    audioPhrase: 'じゃありません'
  },
  {
    id: 'q-4-3',
    lessonId: 'lesson-4',
    question: 'Translate: "Maria is not a student."',
    japaneseQuestion: '「マリアさんは学生ではありません」の正しい文はどれですか？',
    options: ['Maria chan wa gakusei desu.', 'Maria chan wa gakusei ja arimasen.', 'Maria chan wa gakusei deshita.', 'Maria chan wa gakusei ja arimasen deshita.'],
    correctIndex: 1,
    explanation: 'Maria chan wa gakusei ja arimasen. (マリアちゃんは がくせい じゃありません).',
    audioPhrase: 'マリアちゃんはがくせいじゃありません'
  },
  {
    id: 'q-4-4',
    lessonId: 'lesson-4',
    question: 'What is the difference between 「きょうし」 (kyoushi) and 「せんせい」 (sensei)?',
    japaneseQuestion: '「きょうし」と「せんせい」の使い分けとして正しいものはどれですか？',
    options: ['They are completely identical', 'Kyoushi is used when referring to one\'s own occupation; Sensei is a respectful title used to address or refer to others', 'Sensei is only for medical doctors', 'Kyoushi is only for elementary school'],
    correctIndex: 1,
    explanation: 'As explained in Professor Delantar\'s slides, きょうし (kyoushi) is the occupation term used for oneself, while せんせい (sensei) is an honorific address used for other teachers, doctors, and masters.',
    audioPhrase: 'せんせい'
  },
  {
    id: 'q-4-5',
    lessonId: 'lesson-4',
    question: 'What is the past affirmative form of 「です」 (meaning "was / were")?',
    japaneseQuestion: '「です」の過去肯定形（〜でした）はどれですか？',
    options: ['でした (deshita)', 'じゃありません (ja arimasen)', 'です (desu)', 'でしたか (deshita ka)'],
    correctIndex: 0,
    explanation: 'でした (deshita) is the past affirmative form of です.',
    audioPhrase: 'でした'
  },

  // ==========================================
  // LESSON 6: PARTICLES & INTERROGATIVES
  // ==========================================
  {
    id: 'q-6-1',
    lessonId: 'lesson-6',
    question: 'Which particle replaces 「は」 (wa) to mean "too" or "also"?',
    japaneseQuestion: '「〜も（英語の too/also）」を表し、助詞「は」を置き換える助詞はどれですか？',
    options: ['の (no)', 'も (mo)', 'か (ka)', 'と (to)'],
    correctIndex: 1,
    explanation: 'Particle も (mo) replaces は to mean "too" or "also" (e.g. Tanaka-san mo Nihonjin desu - Mr. Tanaka is also Japanese).',
    audioPhrase: 'も'
  },
  {
    id: 'q-6-2',
    lessonId: 'lesson-6',
    question: 'How do you say "My name" in Japanese using the possessive particle?',
    japaneseQuestion: '「私の名前」を正しく表現したものはどれですか？',
    options: ['わたし は なまえ', 'わたし の なまえ', 'わたし も なまえ', 'わたし か なまえ'],
    correctIndex: 1,
    explanation: 'Particle の (no) indicates possession: わたし の なまえ (watashi no namae - my name).',
    audioPhrase: 'わたしのなまえ'
  },
  {
    id: 'q-6-3',
    lessonId: 'lesson-6',
    question: 'How do you formulate an alternative question: "Is it a newspaper, or a magazine?"',
    japaneseQuestion: '「新聞ですか、雑誌ですか」という二者択一の質問の正しい文はどれですか？',
    options: ['Shinbun wa zasshi desu ka.', 'Shinbun desu ka, zasshi desu ka.', 'Shinbun no zasshi desu ka.', 'Shinbun mo zasshi mo desu.'],
    correctIndex: 1,
    explanation: 'Alternative questions repeat the sentences with か: Shinbun desu ka, zasshi desu ka. (新聞ですか、雑誌ですか).',
    audioPhrase: 'しんぶんですかざっしですか'
  },
  {
    id: 'q-6-4',
    lessonId: 'lesson-6',
    question: 'What happens when you add particle 「か」 to the interrogative 「だれ」 (dare = who)?',
    japaneseQuestion: '疑問詞「だれ」に「か」を付けるとどんな意味になりますか？',
    options: ['Whoever', 'Someone (だれか dareka)', 'No one', 'Everyone'],
    correctIndex: 1,
    explanation: 'Interrogative + か creates an indefinite pronoun: だれ (who) + か = だれか (someone); なに (what) + か = なにか (something); いつ (when) + か = いつか (someday).',
    audioPhrase: 'だれか'
  },
  {
    id: 'q-6-5',
    lessonId: 'lesson-6',
    question: 'Which interrogative means "Where"?',
    japaneseQuestion: '「どこ」の意味は何ですか？',
    options: ['What (なに/なん)', 'When (いつ)', 'Where (どこ)', 'Who (だれ)'],
    correctIndex: 2,
    explanation: 'どこ (doko) means "Where". (どこですか doko desu ka = Where is it?).',
    audioPhrase: 'どこですか'
  }
];
