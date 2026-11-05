// Comprehensive Lessons and Vocabulary extracted from FL033 Lecture PDFs
// Professor: Jinky R. Delantar, MBA, CPA

import { EXTRA_VOCABULARY, EXTRA_RULES, LESSON_SOURCES } from './lessonSupplements.js';

const LESSONS_BASE = [
  {
    id: 'lesson-1-2',
    number: '1.2',
    title: 'Hiragana Diacritics',
    japaneseTitle: 'ひらがな 濁音・半濁音',
    badge: 'Dakuten & Handakuten',
    color: 'from-amber-500 to-orange-500',
    description: 'Learn the two diacritical marks (ten-ten and maru) that transform unvoiced sounds into voiced and plosive sounds.',
    vocabularyCount: 12,
    rules: [
      'Dakuten (゛) or ten-ten: Two diagonal strokes at the top-right that voice K→G, S→Z, T→D, and H→B.',
      'Handakuten (゜) or maru: A tiny circle at the top-right that changes H→P.',
      'ぢ (dji/ji) and づ (dzu/zu) are rare and mostly used in compound words like はなぢ (hanaji - nosebleed) and つづく (tsuzuku - to continue). じ and ず are normally used.'
    ],
    vocabulary: [
      { jp: 'しんぶん', romaji: 'shinbun', en: 'newspaper', tip: 'shi + n + bu + n' },
      { jp: 'えんぴつ', romaji: 'enpitsu', en: 'pencil', tip: 'e + n + pi + tsu' },
      { jp: 'えいご', romaji: 'eigo', en: 'English language', tip: 'e + i + go' },
      { jp: 'かいだん', romaji: 'kaidan', en: 'staircase / stairs', tip: 'ka + i + da + n' },
      { jp: 'ぎんこう', romaji: 'ginkou', en: 'bank', tip: 'gi + n + ko + u' },
      { jp: 'ごぜん', romaji: 'gozen', en: 'A.M. / Morning', tip: 'go + ze + n' },
      { jp: 'かぞく', romaji: 'kazoku', en: 'family', tip: 'ka + zo + ku' },
      { jp: 'みず', romaji: 'mizu', en: 'water', tip: 'mi + zu' },
      { jp: 'ときどき', romaji: 'tokidoki', en: 'sometimes', tip: 'to + ki + do + ki' },
      { jp: 'ともだち', romaji: 'tomodachi', en: 'friend', tip: 'to + mo + da + chi' },
      { jp: 'こども', romaji: 'kodomo', en: 'child', tip: 'ko + do + mo' },
      { jp: 'べんごし', romaji: 'bengoshi', en: 'lawyer', tip: 'be + n + go + shi' }
    ]
  },
  {
    id: 'lesson-1-3',
    number: '1.3 - 1.5',
    title: 'Digraphs, Sokuon & ん',
    japaneseTitle: '拗音・促音・「ん」',
    badge: 'Yōon, Chiisai Tsu, N rules',
    color: 'from-emerald-500 to-teal-500',
    description: 'Master contracted sounds (Yōon), geminate double consonants with small tsu, and the 3 phonetic nuances of ん.',
    vocabularyCount: 20,
    rules: [
      'Digraphs (Yōon): Combine -i column kana with small ゃ (ya), ゅ (yu), ょ (yo). The second kana is written small.',
      'Long Consonants (Sokuon): Small tsu (っ / chiisai tsu) creates a double consonant with a momentary pause/glottal stop.',
      'ん (N) rule 1: Pronounced [m] when preceding m, p, or b (e.g. しんぶん -> shimbun, えんぴつ -> empitsu).',
      'ん (N) rule 2: Pronounced [ng] when preceding k, g, or w (e.g. ぎんこう -> gingkou, まんが -> mangga).'
    ],
    vocabulary: [
      { jp: 'びょういん', romaji: 'byouin', en: 'hospital', tip: 'Digraph びょ (byo)' },
      { jp: 'じしょ', romaji: 'jisho', en: 'dictionary', tip: 'Digraph しょ (sho)' },
      { jp: 'かいしゃ', romaji: 'kaisha', en: 'company', tip: 'Digraph しゃ (sha)' },
      { jp: 'ひゃく', romaji: 'hyaku', en: 'hundred (100)', tip: 'Digraph ひゃ (hya)' },
      { jp: 'きょう', romaji: 'kyou', en: 'today', tip: 'Digraph きょ (kyo)' },
      { jp: 'おちゃ', romaji: 'ocha', en: 'green tea', tip: 'Digraph ちゃ (cha)' },
      { jp: 'しゅくだい', romaji: 'shukudai', en: 'homework', tip: 'Digraph しゅ (shu)' },
      { jp: 'りょう', romaji: 'ryou', en: 'dormitory', tip: 'Digraph りょ (ryo)' },
      { jp: 'てちょう', romaji: 'techou', en: 'pocket notebook', tip: 'Digraph ちょ (cho)' },
      { jp: 'ぎゅうにゅう', romaji: 'gyuunyuu', en: 'milk', tip: 'Digraphs ぎゅ (gyu) & にゅ (nyu)' },
      { jp: 'かっぷ', romaji: 'kappu', en: 'cup', tip: 'Double consonant pp' },
      { jp: 'にっき', romaji: 'nikki', en: 'diary', tip: 'Double consonant kk' },
      { jp: 'きっぷ', romaji: 'kippu', en: 'ticket', tip: 'Double consonant pp' },
      { jp: 'ゆっくり', romaji: 'yukkuri', en: 'slowly', tip: 'Double consonant kk' },
      { jp: 'がっこう', romaji: 'gakkou', en: 'school', tip: 'Double consonant kk' },
      { jp: 'ざっし', romaji: 'zasshi', en: 'magazine', tip: 'Double consonant ss' },
      { jp: 'ちょっと', romaji: 'chotto', en: 'a little bit', tip: 'Double consonant tt + ちょ (cho)' },
      { jp: 'きっさてん', romaji: 'kissaten', en: 'coffee shop', tip: 'Double consonant ss' },
      { jp: 'きって', romaji: 'kitte', en: 'postage stamps', tip: 'Double consonant tt' },
      { jp: 'あさって', romaji: 'asatte', en: 'day after tomorrow', tip: 'Double consonant tt' }
    ]
  },
  {
    id: 'lesson-2',
    number: '2',
    title: 'Basic Greetings & Expressions',
    japaneseTitle: 'あいさつと表現',
    badge: 'Greetings & Etiquette',
    color: 'from-rose-500 to-pink-500',
    description: 'Essential daily Japanese conversational phrases, etiquette, and call-and-response expressions.',
    vocabularyCount: 16,
    rules: [
      'Greetings change by time of day: Ohayou gozaimasu (morning), Konnichiwa (day), Konbanwa (evening).',
      'Pairs: Ittekimasu (I am leaving) ↔ Itterasshai (Please go / take care).',
      'Pairs: Tadaima (I am home) ↔ Okaerinasai (Welcome home).',
      'Meal etiquette: Itadakimasu (before eating) ↔ Gochisousama deshita (after eating).'
    ],
    vocabulary: [
      { jp: 'おはようございます', romaji: 'Ohayou gozaimasu', en: 'Good morning (polite)' },
      { jp: 'こんにちは', romaji: 'Konnichiwa', en: 'Good afternoon / Hello' },
      { jp: 'こんばんは', romaji: 'Konbanwa', en: 'Good evening' },
      { jp: 'どうもありがとうございます', romaji: 'Doumo arigatou gozaimasu', en: 'Thank you very much' },
      { jp: 'どういたしまして', romaji: 'Dou itashimashite', en: 'You are welcome' },
      { jp: 'すみません', romaji: 'Sumimasen', en: 'Excuse me / I am sorry' },
      { jp: 'いただきます', romaji: 'Itadakimasu', en: 'Before eating (I humbly receive)' },
      { jp: 'ごちそうさまでした', romaji: 'Gochisousama deshita', en: 'After eating (Thank you for the feast)' },
      { jp: 'はじめまして', romaji: 'Hajimemashite', en: 'How do you do? / Nice to meet you' },
      { jp: 'どうぞよろしくおねがいします', romaji: 'Douzo yoroshiku onegaishimasu', en: 'Please treat me favorably' },
      { jp: 'いってきます', romaji: 'Ittekimasu', en: 'I am leaving (said when leaving home/office)' },
      { jp: 'いってらっしゃい', romaji: 'Itterasshai', en: 'Please go and return safely' },
      { jp: 'ただいま', romaji: 'Tadaima', en: 'I am back / I have returned' },
      { jp: 'おかえりなさい', romaji: 'Okaerinasai', en: 'Welcome back home' },
      { jp: 'おげんきですか', romaji: 'Ogenki desu ka', en: 'How are you?' },
      { jp: 'がんばってください', romaji: 'Ganbatte kudasai', en: 'Please do your best / Hang in there' }
    ]
  },
  {
    id: 'lesson-3',
    number: '3',
    title: 'Numbers & Counting System',
    japaneseTitle: '数字 (すうじ)',
    badge: 'Numbers & Four-Digit Grouping',
    color: 'from-blue-500 to-indigo-500',
    description: 'Learn regular numbers, irregular euphonic sound shifts (sanbyaku, roppyaku, sanzen, hassen), and Japanese 4-digit grouping (Man, Oku).',
    vocabularyCount: 22,
    rules: [
      'Irregular Hundreds: 300 = sanbyaku (NOT sanhyaku), 600 = roppyaku, 800 = happyaku.',
      'Irregular Thousands: 3,000 = sanzen (NOT sansen), 8,000 = hassen (NOT hachisen).',
      'Japanese 4-digit grouping: While Western numbers group by 1,000s, Japanese groups by 10,000s (万 man). 50,000 is 5万 (go-man).'
    ],
    vocabulary: [
      { jp: 'ぜろ / れい', romaji: 'zero / rei', en: '0' },
      { jp: 'いち', romaji: 'ichi', en: '1' },
      { jp: 'に', romaji: 'ni', en: '2' },
      { jp: 'さん', romaji: 'san', en: '3' },
      { jp: 'よん / し', romaji: 'yon / shi', en: '4' },
      { jp: 'ご', romaji: 'go', en: '5' },
      { jp: 'ろく', romaji: 'roku', en: '6' },
      { jp: 'なな / しち', romaji: 'nana / shichi', en: '7' },
      { jp: 'はち', romaji: 'hachi', en: '8' },
      { jp: 'きゅう / く', romaji: 'kyuu / ku', en: '9' },
      { jp: 'じゅう', romaji: 'juu', en: '10' },
      { jp: 'ひゃく', romaji: 'hyaku', en: '100' },
      { jp: 'さんびゃく', romaji: 'sanbyaku', en: '300 (irregular!)' },
      { jp: 'ろっぴゃく', romaji: 'roppyaku', en: '600 (irregular!)' },
      { jp: 'はっぴゃく', romaji: 'happyaku', en: '800 (irregular!)' },
      { jp: 'せん', romaji: 'sen', en: '1,000' },
      { jp: 'さんぜん', romaji: 'sanzen', en: '3,000 (irregular!)' },
      { jp: 'はっせん', romaji: 'hassen', en: '8,000 (irregular!)' },
      { jp: 'いちまん', romaji: 'ichiman', en: '10,000 (1万)' },
      { jp: 'じゅうまん', romaji: 'juuman', en: '100,000 (10万)' },
      { jp: 'ひゃくまん', romaji: 'hyakuman', en: '1,000,000 (100万)' },
      { jp: 'いちおく', romaji: 'ichioku', en: '100,000,000 (1億)' }
    ]
  },
  {
    id: 'lesson-4',
    number: '4',
    title: 'Basic Sentence Patterns & Occupations',
    japaneseTitle: '基本文型と職業',
    badge: 'Desu / Ja Arimasen / Occupations',
    color: 'from-violet-500 to-purple-500',
    description: 'Master the fundamental sentence structure: [Topic] wa [Statement] desu, along with negative and past conjugations and job vocabulary.',
    vocabularyCount: 16,
    rules: [
      'Topic Marker は (wa): Written as ha (は) but pronounced "wa". Identifies what the sentence is about.',
      'Copula です (desu): Present affirmative ("is/am/are").',
      'じゃありません (ja arimasen): Present negative ("is not / am not / are not").',
      'でした (deshita): Past affirmative ("was / were").',
      'じゃありませんでした (ja arimasen deshita): Past negative ("was not / were not").'
    ],
    vocabulary: [
      { jp: 'わたし', romaji: 'watashi', en: 'I / Me' },
      { jp: 'あなた', romaji: 'anata', en: 'You' },
      { jp: 'かれ', romaji: 'kare', en: 'He / Him' },
      { jp: 'かのじょ', romaji: 'kanojo', en: 'She / Her' },
      { jp: 'あのひと', romaji: 'ano hito', en: 'That person' },
      { jp: 'がくせい', romaji: 'gakusei', en: 'student' },
      { jp: 'きょうし', romaji: 'kyoushi', en: 'teacher / instructor (occupation)' },
      { jp: 'せんせい', romaji: 'sensei', en: 'teacher (respectful address)' },
      { jp: 'ぎんこういん', romaji: 'ginkouin', en: 'bank employee' },
      { jp: 'エンジニア', romaji: 'enjinia', en: 'engineer' },
      { jp: 'いしゃ', romaji: 'isha', en: 'medical doctor' },
      { jp: 'はいしゃ', romaji: 'haisha', en: 'dentist' },
      { jp: 'べんごし', romaji: 'bengoshi', en: 'lawyer' },
      { jp: 'かいしゃいん', romaji: 'kaishain', en: 'company employee' },
      { jp: 'しゃいん', romaji: 'shain', en: 'employee (with company name)' },
      { jp: 'ともだち', romaji: 'tomodachi', en: 'friend' }
    ]
  },
  {
    id: 'lesson-6',
    number: '6',
    title: 'Particles & Question Interrogatives',
    japaneseTitle: '助詞 (も・の・か) と疑問詞',
    badge: 'Particles & Questions',
    color: 'from-pink-500 to-rose-600',
    description: 'Learn particle mo (also/too), no (possession/of), ka (question marker/alternative), and key Wh-question interrogatives.',
    vocabularyCount: 14,
    rules: [
      'Particle も (mo): Replaces は (wa) to mean "too" or "also" (e.g. Tanaka-san mo Nihonjin desu).',
      'Particle の (no): Connects two nouns indicating possession ("apostrophe s" or "of") or telephone dash (e.g. watashi no namae).',
      'Particle か (ka): Placed at the end of a sentence to turn it into a question. Also used for alternative questions: A desu ka, B desu ka.',
      'Interrogatives + か = Indefinite words: nani (what) → nanika (something); itsu (when) → itsuka (someday); doko (where) → dokoka (somewhere); dare (who) → dareka (someone).'
    ],
    vocabulary: [
      { jp: 'なに / なん', romaji: 'nani / nan', en: 'What?' },
      { jp: 'いつ', romaji: 'itsu', en: 'When?' },
      { jp: 'どこ', romaji: 'doko', en: 'Where?' },
      { jp: 'だれ', romaji: 'dare', en: 'Who?' },
      { jp: 'なにか', romaji: 'nanika', en: 'something' },
      { jp: 'いつか', romaji: 'itsuka', en: 'someday / sometime' },
      { jp: 'どこか', romaji: 'dokoka', en: 'somewhere' },
      { jp: 'だれか', romaji: 'dareka', en: 'someone' },
      { jp: 'しんぶん', romaji: 'shinbun', en: 'newspaper' },
      { jp: 'ざっし', romaji: 'zasshi', en: 'magazine' },
      { jp: 'ほん', romaji: 'hon', en: 'book' },
      { jp: 'じしょ', romaji: 'jisho', en: 'dictionary' },
      { jp: 'めいし', romaji: 'meishi', en: 'business card' },
      { jp: 'かさ', romaji: 'kasa', en: 'umbrella' }
    ]
  },
  {
    id: 'lesson-7',
    number: '7',
    title: 'Ko-So-A-Do Demonstratives',
    japaneseTitle: 'こそあど言葉（指示詞）',
    badge: '7.1 Things & 7.2 Specific Items/People',
    color: 'from-amber-600 to-orange-600',
    description: 'Master the demonstrative systems: Kore/Sore/Are/Dore for things, and Kono/Sono/Ano/Dono for modifying specific things and people with adjectives and ownership, plus particle ga with dono.',
    vocabularyCount: 52,
    rules: [
      'Ko-So-A-Do System: Ko~ = near speaker ("this"); So~ = near listener or shared territory ("that"); A~ = far from both speaker and listener ("that over there"); Do~ = interrogative to ask questions ("which").',
      'Lesson 7.1 Demonstratives for Things: Kore, Sore, and Are act as the sentence topic marked with は (wa): 「これ / それ / あれ は [Noun] です。」',
      '7.1 Questions: Replace the statement with なん (nan) to ask what something is (〜はなんですか) or いくら (ikura) to ask the price (〜はいくらですか). Use 「どれですか」 (Dore desu ka) to ask which one among three or more items.',
      'Lesson 7.2 Demonstratives for Specific Things and People: Kono, Sono, and Ano precede a noun: 「この / その / あの [Noun] は [Statement] です。」 The statement can be an adjective describing the noun (e.g. あたらしいです) or express ownership (e.g. わたし の です / なかむらさん の です).',
      '7.2 Interrogative with Particle が (ga): Dono modifies a noun to ask which one, and Dono + Noun is ALWAYS marked using particle が (ga) instead of は (wa): 「どの スマホ が あたらしい ですか。」 / 「どの くるま が たかい ですか。」',
      'Comparing Kore vs Kono: Kore stands alone as the topic pronoun (これはスマホです - This is a smartphone). Kono directly modifies the following noun (このスマホはあたらしいです - This smartphone is new).'
    ],
    vocabulary: [
      // 7.1 & 7.2 Demonstratives & Interrogatives
      { jp: 'これ', romaji: 'kore', en: 'this (thing near speaker)', tip: 'Pronoun: used as topic followed by は' },
      { jp: 'それ', romaji: 'sore', en: 'that (thing near listener)', tip: 'Pronoun: near listener or shared territory' },
      { jp: 'あれ', romaji: 'are', en: 'that over there (far from both)', tip: 'Pronoun: far from both speaker and listener' },
      { jp: 'どれ', romaji: 'dore', en: 'which one (among 3 or more)', tip: 'Interrogative pronoun: どれ です か' },
      { jp: 'この', romaji: 'kono', en: 'this [noun]', tip: 'Precedes a noun: この + Noun は...' },
      { jp: 'その', romaji: 'sono', en: 'that [noun]', tip: 'Precedes a noun: その + Noun は...' },
      { jp: 'あの', romaji: 'ano', en: 'that [noun] over there', tip: 'Precedes a noun: あの + Noun は...' },
      { jp: 'どの', romaji: 'dono', en: 'which [noun]', tip: 'Precedes a noun: takes particle が in questions (どの + Noun が...)' },
      { jp: 'なん', romaji: 'nan', en: 'what', tip: 'Replaces statement to ask what: なん です か' },
      { jp: 'いくら', romaji: 'ikura', en: 'how much (price)', tip: 'Replaces statement to ask price: いくら です か' },

      // Stationery & Classroom Objects (Page 4)
      { jp: 'ほん', romaji: 'hon', en: 'book', tip: 'Noun: book' },
      { jp: 'じしょ', romaji: 'jisho', en: 'dictionary', tip: 'Noun: dictionary (digraph しょ)' },
      { jp: 'ノート', romaji: 'nooto', en: 'notebook', tip: 'Katakana loanword with chouon (ー)' },
      { jp: 'えんぴつ', romaji: 'enpitsu', en: 'pencil', tip: 'Noun: pencil (handakuten ぴ)' },
      { jp: 'シャープペンシル', romaji: 'shaapupenshiru', en: 'mechanical pencil', tip: 'Katakana: mechanical pencil (sharp pencil)' },
      { jp: 'ボールペン', romaji: 'boorupen', en: 'ballpen', tip: 'Katakana: ballpoint pen' },

      // Bags & Identification Cards (Page 5)
      { jp: 'かばん', romaji: 'kaban', en: 'bag; briefcase', tip: 'Noun: bag or briefcase' },
      { jp: 'カード', romaji: 'kaado', en: 'card', tip: 'Katakana loanword' },
      { jp: 'めいし', romaji: 'meishi', en: 'business card', tip: 'Noun: name card / business card' },
      { jp: 'ざいりゅう カード', romaji: 'zairyuu kaado', en: 'residence card', tip: 'Noun: residence card for foreign residents in Japan' },
      { jp: 'テレホン カード', romaji: 'terehon kaado', en: 'telephone card', tip: 'Katakana: prepaid phone card' },
      { jp: 'めんきょしょう', romaji: 'menkyoshou', en: 'driver’s license', tip: 'Noun: driver’s license (digraphs きょ & しょ)' },

      // Publications & Furniture (Page 6)
      { jp: 'しゃしん', romaji: 'shashin', en: 'picture; photograph', tip: 'Noun: photograph (digraph しゃ)' },
      { jp: 'しんぶん', romaji: 'shinbun', en: 'newspaper', tip: 'Noun: newspaper' },
      { jp: 'ざっし', romaji: 'zasshi', en: 'magazine', tip: 'Noun: magazine (sokuon っ)' },
      { jp: 'てちょう', romaji: 'techou', en: 'pocket notebook', tip: 'Noun: personal pocket organizer / diary' },
      { jp: 'つくえ', romaji: 'tsukue', en: 'desk', tip: 'Noun: desk' },
      { jp: 'テーブル', romaji: 'teeburu', en: 'table', tip: 'Katakana: dining or meeting table' },

      // Household & Everyday Items (Page 7)
      { jp: 'いす', romaji: 'isu', en: 'chair', tip: 'Noun: chair' },
      { jp: 'コンピューター', romaji: 'konpyuutaa', en: 'computer', tip: 'Katakana: desktop/general computer' },
      { jp: 'とけい', romaji: 'tokei', en: 'clock, watch', tip: 'Noun: clock or wristwatch' },
      { jp: 'かぎ', romaji: 'kagi', en: 'key', tip: 'Noun: key (dakuten ぎ)' },
      { jp: 'かさ', romaji: 'kasa', en: 'umbrella', tip: 'Noun: umbrella' },

      // Tech & Vehicles (Pages 25-26)
      { jp: 'テレビ', romaji: 'terebi', en: 'television', tip: 'Katakana: television' },
      { jp: 'ラジオ', romaji: 'rajio', en: 'radio', tip: 'Katakana: radio' },
      { jp: 'カメラ', romaji: 'kamera', en: 'camera', tip: 'Katakana: camera' },
      { jp: 'パソコン', romaji: 'pasokon', en: 'laptop; personal computer', tip: 'Katakana: personal computer / laptop' },
      { jp: 'でんわ', romaji: 'denwa', en: 'telephone', tip: 'Noun: telephone' },
      { jp: 'けいたいでんわ', romaji: 'keitai denwa', en: 'cellphone; mobile phone', tip: 'Noun: cellular mobile phone' },
      { jp: 'スマホ', romaji: 'sumaho', en: 'smart phone', tip: 'Katakana: smartphone' },
      { jp: 'くるま', romaji: 'kuruma', en: 'car', tip: 'Noun: automobile / car' },

      // Adjectives (Pages 27-28)
      { jp: 'おおきい', romaji: 'ookii', en: 'big; large', tip: 'I-adjective: big / large' },
      { jp: 'ちいさい', romaji: 'chiisai', en: 'small; little', tip: 'I-adjective: small / little' },
      { jp: 'あたらしい', romaji: 'atarashii', en: 'new', tip: 'I-adjective: new' },
      { jp: 'ふるい', romaji: 'furui', en: 'old (things/places)', tip: 'I-adjective: old (used for inanimate objects, not people)' },
      { jp: 'たかい', romaji: 'takai', en: 'expensive; high', tip: 'I-adjective: expensive (also means high/tall)' },
      { jp: 'やすい', romaji: 'yasui', en: 'cheap; inexpensive', tip: 'I-adjective: inexpensive / cheap' },
      { jp: 'しろい', romaji: 'shiroi', en: 'white', tip: 'I-adjective / color: white' },
      { jp: 'くろい', romaji: 'kuroi', en: 'black', tip: 'I-adjective / color: black' },
      { jp: 'きいろい', romaji: 'kiiroi', en: 'yellow', tip: 'I-adjective / color: yellow' },
      { jp: 'あおい', romaji: 'aoi', en: 'blue', tip: 'I-adjective / color: blue' },
      { jp: 'あかい', romaji: 'akai', en: 'red', tip: 'I-adjective / color: red' }
    ]
  }
];

export const LESSONS_METADATA = LESSONS_BASE.map(lesson => {
  const vocabulary = [...lesson.vocabulary, ...(EXTRA_VOCABULARY[lesson.id] || [])];
  return { ...lesson, vocabulary, vocabularyCount: vocabulary.length,
    rules: [...lesson.rules, ...(EXTRA_RULES[lesson.id] || [])], source: LESSON_SOURCES[lesson.id] };
});
