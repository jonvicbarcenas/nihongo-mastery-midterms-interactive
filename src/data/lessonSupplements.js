// Page numbers refer to the six PDFs supplied in the project root.
export const LESSON_SOURCES = {
  'lesson-1-2': { file: '2026-09-24 - Lesson 1.2 Hiragana Diacritics.pdf', pages: '2–29' },
  'lesson-1-3': { file: '2026-10-06 - Lesson 1.3 Hiragana Digraphs.pdf', pages: '2–43 (Lessons 1.3, 1.4 and 1.5)' },
  'lesson-2': { file: 'FL033 - 02 (1) - Lesson 2 Greetings and Expressions.pdf', pages: '2–14' },
  'lesson-3': { file: 'FL033 - 03 (1) - Lesson 3 Numbers.pdf', pages: '2–29' },
  'lesson-4': { file: 'FL033 - Lesson 4 (Book).pdf', pages: '2–17' },
  'lesson-6': { file: '2026-09-29 - Lesson 6 Simple Sentences Particles.pdf', pages: '2–24' },
};

const vocab = (rows) => rows.map(([jp, romaji, en, page, tip]) => ({ jp, romaji, en, page, tip }));

export const EXTRA_VOCABULARY = {
  'lesson-1-2': vocab([
    ['はなぢ', 'hanaji', 'nosebleed', 6, 'はな + ち → はなぢ; a special use of ぢ.'],
    ['つづく', 'tsuzuku', 'to continue / to be continued', 7, 'An example using the less common づ.'],
    ['すずき', 'Suzuki', 'Suzuki (family name / automobile brand)', 8],
  ]),
  'lesson-1-3': vocab([
    ['さんまい', 'sanmai', 'three sheets', 42, 'Pronunciation aid in the slides: sammai.'],
    ['せんぱい', 'senpai', 'senior', 42, 'Pronunciation aid: sempai. The spelling remains senpai.'],
    ['しんぶん', 'shinbun', 'newspaper', 42, 'Pronunciation aid: shimbun.'],
    ['てんぷら', 'tenpura', 'tempura / fried batter shrimp', 42, 'Pronunciation aid: tempura.'],
    ['ぎんこう', 'ginkou', 'bank', 43, 'Pronunciation aid in the slides: gingkou.'],
    ['はんがく', 'hangaku', 'half price', 43, 'Pronunciation aid in the slides: hanggaku.'],
    ['でんわ', 'denwa', 'telephone', 43, 'Pronunciation aid in the slides: dengwa.'],
  ]),
  'lesson-2': vocab([
    ['はい', 'Hai', 'Yes (polite)', 4],
    ['ええ', 'Ee', 'Yes (casual)', 4],
    ['いいえ', 'Iie', 'No / Not at all', 4],
    ['ごめんなさい', 'Gomen nasai', 'I am sorry', 5],
    ['かんぱい', 'Kanpai', 'Cheers', 6],
    ['おいしいです', 'Oishii desu', 'It is delicious', 6],
    ['どうぞたべてください', 'Douzo tabete kudasai', 'Here, please eat it', 6],
    ['じゃあ、また', 'Jaa, mata', 'Then, see you', 8],
    ['おやすみなさい', 'Oyasumi nasai', 'Good night', 8],
    ['おさきにしつれいします', 'Osaki ni shitsurei shimasu', 'Excuse me for leaving ahead of you', 8],
    ['おつかれさまでした', 'Otsukaresama deshita', 'Thank you for your hard work', 8],
    ['さようなら', 'Sayounara', 'Goodbye', 8],
    ['おひさしぶり', 'Ohisashiburi', 'Long time no see', 10],
    ['げんきです', 'Genki desu', 'I am fine', 10],
    ['おかげさまで', 'Okagesama de', 'Thankfully', 10],
    ['どうぞはいってください', 'Douzo haitte kudasai', 'Please come in', 11],
    ['いらっしゃいませ', 'Irasshaimase', 'Welcome to my shop / restaurant', 11],
    ['にほんへようこそ', 'Nihon e youkoso', 'Welcome to Japan', 11],
    ['セブへようこそ', 'Cebu e youkoso', 'Welcome to Cebu', 11],
    ['よくできました', 'Yoku dekimashita', 'Good job', 12],
    ['おめでとうございます', 'Omedetou gozaimasu', 'Congratulations', 12],
    ['おたんじょうびおめでとう', 'Otanjoubi omedetou', 'Happy birthday', 12],
    ['ごけっこんおめでとうございます', 'Gokekkon omedetou gozaimasu', 'Congratulations on your wedding', 12],
    ['おねがいします', 'Onegaishimasu', 'Please (to make a request)', 13],
    ['どうぞ', 'Douzo', 'Please / Go ahead (when offering something)', 13],
    ['もちろんです', 'Mochiron desu', 'Of course', 13],
    ['まだです', 'Mada desu', 'Not yet', 13],
    ['だいじょうぶですか', 'Daijoubu desu ka', 'Are you alright?', 13],
    ['きをつけてください', 'Ki o tsukete kudasai', 'Please be careful / Please take care', 14],
    ['たすけてください', 'Tasukete kudasai', 'Please help me', 14],
    ['ちょっとまってください', 'Chotto matte kudasai', 'Please wait a little', 14],
    ['ゆっくりはなしてください', 'Yukkuri hanashite kudasai', 'Please speak slowly', 14],
  ]),
  'lesson-3': vocab([
    ['じゅういち', 'juuichi', '11', 3], ['じゅうに', 'juuni', '12', 3],
    ['じゅうさん', 'juusan', '13', 3], ['じゅうよん', 'juuyon', '14', 3],
    ['じゅうご', 'juugo', '15', 3], ['じゅうろく', 'juuroku', '16', 3],
    ['じゅうなな', 'juunana', '17', 3], ['じゅうはち', 'juuhachi', '18', 3],
    ['じゅうきゅう', 'juukyuu', '19', 3], ['にじゅう', 'nijuu', '20', 4],
    ['さんじゅう', 'sanjuu', '30', 4], ['よんじゅう', 'yonjuu', '40', 4],
    ['ごじゅう', 'gojuu', '50', 4], ['ろくじゅう', 'rokujuu', '60', 4],
    ['ななじゅう', 'nanajuu', '70', 4], ['はちじゅう', 'hachijuu', '80', 4],
    ['きゅうじゅう', 'kyuujuu', '90', 4],
    ['いっちょう', 'icchou', '1,000,000,000,000 (1兆)', 25, '兆 (chou) is the next four-digit unit after 億 (oku).'],
  ]),
  'lesson-4': vocab([
    ['わたしたち', 'watashitachi', 'we', 2], ['あなたたち', 'anatatachi', 'you (plural)', 2],
    ['あのかた', 'ano kata', 'that person (polite)', 3],
    ['かぞく', 'kazoku', 'family', 4], ['こども', 'kodomo', 'child', 4],
    ['おとこのひと', 'otoko no hito', 'man', 5], ['おんなのひと', 'onna no hito', 'woman', 5],
    ['おとこのこ', 'otoko no ko', 'boy', 5], ['おんなのこ', 'onna no ko', 'girl', 5],
    ['りゅうがくせい', 'ryuugakusei', 'foreign student', 6],
    ['けんきゅうしゃ', 'kenkyuusha', 'researcher / scholar', 6],
    ['とこや', 'tokoya', 'barber', 7],
  ]),
  'lesson-6': vocab([
    ['わたしの', 'watashi no', 'my', 11], ['わたしのもの', 'watashi no mono', 'mine', 11],
    ['あなたの', 'anata no', 'your', 11], ['あなたのもの', 'anata no mono', 'yours', 11],
    ['かれの', 'kare no', 'his', 11], ['かのじょの', 'kanojo no', 'her', 11],
    ['わたしたちの', 'watashitachi no', 'our', 11],
    ['なんですか', 'Nan desu ka', 'What is it?', 23, 'なに becomes なん before ですか.'],
    ['いつですか', 'Itsu desu ka', 'When is it?', 23],
    ['どこですか', 'Doko desu ka', 'Where is it?', 23],
    ['だれですか', 'Dare desu ka', 'Who is it?', 23],
  ]),
};

export const EXTRA_RULES = {
  'lesson-2': [
    'はい (hai) is polite yes; ええ (ee) is casual yes; いいえ (iie) means no or not at all.',
    'The slides put optional polite wording in parentheses: おはよう → おはようございます; ごめん → ごめんなさい; おやすみ → おやすみなさい.',
    'Use いらっしゃいませ to welcome a customer; おめでとうございます for congratulations; ゆっくりはなしてください to ask someone to speak slowly.',
  ],
  'lesson-3': [
    'Build tens with digit + じゅう, then add the ones: 23 = にじゅう さん. For 11–19, use じゅう + digit.',
    'Read each four-digit group separately, then add 万 (10⁴), 億 (10⁸), or 兆 (10¹²). Zero groups are omitted.',
  ],
  'lesson-4': [
    'ではありません (dewa arimasen) is the formal present negative; じゃありません is used in daily conversation (page 14).',
    'きょうし names the teaching occupation; せんせい is a respectful form of address. Loanwords such as エンジニア use katakana.',
  ],
  'lesson-6': [
    'Add か to the end of a statement without changing its word order. Follow the slides’ formal examples with 。',
    'なに becomes なん before ですか: なんですか (What is it?). Compare なにか (something), which keeps に.',
    'の links nouns beyond literal ownership too: にほん の たべもの (Japanese food). Add もの for mine/yours: わたし の もの.',
  ],
};

export const DIACRITIC_ROWS = [
  ['K → G', 'かきくけこ', 'がぎぐげご', ['ga', 'gi', 'gu', 'ge', 'go']],
  ['S → Z', 'さしすせそ', 'ざじずぜぞ', ['za', 'ji', 'zu', 'ze', 'zo']],
  ['T → D', 'たちつてと', 'だぢづでど', ['da', 'ji / dji', 'zu / dzu', 'de', 'do']],
  ['H → B', 'はひふへほ', 'ばびぶべぼ', ['ba', 'bi', 'bu', 'be', 'bo']],
  ['H → P', 'はひふへほ', 'ぱぴぷぺぽ', ['pa', 'pi', 'pu', 'pe', 'po']],
];

export const DIGRAPH_ROWS = [
  ['き', 'k', ['kya', 'kyu', 'kyo']], ['ぎ', 'g', ['gya', 'gyu', 'gyo']],
  ['し', 'sh', ['sha', 'shu', 'sho']], ['じ', 'j', ['ja', 'ju', 'jo']],
  ['ち', 'ch', ['cha', 'chu', 'cho']], ['に', 'n', ['nya', 'nyu', 'nyo']],
  ['ひ', 'h', ['hya', 'hyu', 'hyo']], ['び', 'b', ['bya', 'byu', 'byo']],
  ['ぴ', 'p', ['pya', 'pyu', 'pyo']], ['み', 'm', ['mya', 'myu', 'myo']],
  ['り', 'r', ['rya', 'ryu', 'ryo']],
];

export const SENTENCE_EXERCISES = {
  'lesson-4': [
    { prompt: 'I am Yuki.', tokens: ['わたし', 'は', 'ユキ', 'です'], romaji: 'Watashi wa Yuki desu.', page: 11, explanation: 'Topic + は + statement + です makes a polite affirmative sentence.' },
    { prompt: 'Maria is not a student.', tokens: ['マリアちゃん', 'は', 'がくせい', 'じゃありません'], romaji: 'Maria chan wa gakusei ja arimasen.', page: 15, explanation: 'Use じゃありません for the present negative.' },
    { prompt: 'Ms. Hana was a bank employee.', tokens: ['ハナさん', 'は', 'ぎんこういん', 'でした'], romaji: 'Hana san wa ginkouin deshita.', page: 16, explanation: 'でした expresses the past affirmative: was/were.' },
    { prompt: 'Ms. Hana was not a bank employee.', tokens: ['ハナさん', 'は', 'ぎんこういん', 'じゃありませんでした'], romaji: 'Hana san wa ginkouin ja arimasen deshita.', page: 17, explanation: 'じゃありませんでした expresses the past negative.' },
  ],
  'lesson-6': [
    { prompt: 'Mr. Suzuki is an engineer. Say: Mr. Inoue is also an engineer.', tokens: ['イノウエさん', 'も', 'エンジニア', 'です'], romaji: 'Inoue san mo enjinia desu.', page: 5, explanation: 'も replaces は because the statement applies to Mr. Inoue too.' },
    { prompt: 'My name', tokens: ['わたし', 'の', 'なまえ'], romaji: 'watashi no namae', page: 12, explanation: 'Place the owner before の and the item after it.' },
    { prompt: 'Her umbrella', tokens: ['かのじょ', 'の', 'かさ'], romaji: 'kanojo no kasa', page: 12, explanation: 'かのじょ + の means her.' },
    { prompt: 'Is she a student?', tokens: ['かのじょ', 'は', 'がくせい', 'です', 'か'], romaji: 'Kanojo wa gakusei desu ka.', page: 16, explanation: 'Keep the statement’s word order and add か at the end.' },
    { prompt: 'Is it a book, or a dictionary?', tokens: ['ほん', 'ですか', 'じしょ', 'ですか'], romaji: 'Hon desu ka, jisho desu ka.', page: 20, explanation: 'Alternative questions use A ですか、B ですか。' },
    { prompt: 'What is it?', tokens: ['なん', 'です', 'か'], romaji: 'Nan desu ka.', page: 23, explanation: 'なに changes to なん before ですか.' },
  ],
};
