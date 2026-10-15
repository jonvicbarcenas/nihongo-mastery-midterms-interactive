# FL033 lesson and mobile review

Reviewed 15 October 2026. All nine PDFs in the project folder were extracted page by page and visually inspected using rendered contact sheets: **166 pages** in total, comprising six lecture PDFs and three writing PDFs.

## Lesson coverage

| PDF | Pages | Main lesson material | Coverage after the changes |
| --- | ---: | --- | --- |
| `2026-09-24 - Lesson 1.2 Hiragana Diacritics.pdf` | 29 | Dakuten, handakuten, five modified rows, special ぢ/づ spellings, reading practice | All 25 modified kana in an interactive chart and tracing; 15 vocabulary cards including はなぢ, つづく and すずき; rules and lesson quiz. |
| `2026-10-06 - Lesson 1.3 Hiragana Digraphs.pdf` | 43 | Lessons 1.3–1.5: 33 digraphs, ten digraph words, ten sokuon words, nasal pronunciation examples | All 33 digraphs in a formation chart and tracing; っ and ん practice; 27 vocabulary cards including the seven nasal examples on pages 42–43; reading rules and quiz. |
| `FL033 - 02 (1) - Lesson 2 Greetings and Expressions.pdf` | 14 | Time-of-day greetings, thanks, replies, apologies, meals, introductions, farewells, homecoming, reunions, welcoming, congratulations, requests | All 48 listed expressions have study/recall cards, including previously missing polite/casual replies, workplace farewells, welcomes, congratulations and requests. Context questions test their use. Optional polite forms are explained in the rules. |
| `FL033 - 03 (1) - Lesson 3 Numbers.pdf` | 29 | 0–19, tens, irregular hundreds/thousands, worked examples, two worksheets, four-digit grouping | 40 vocabulary cards plus complete hundreds/thousands reference tables. All 20 worksheet items on pages 23–24 and all four large-number examples on pages 26–29 are interactive activities. A validated integer converter shows groups, kana and optional romaji, through 兆. |
| `FL033 - Lesson 4 (Book).pdf` | 17 | Pronouns, people, occupations, は, です and four tense/polarity patterns, formal negative | All 28 vocabulary entries, explanatory rules, conjugation table, four sentence-building activities and lesson questions covering plural pronouns, occupations, formal negative and past negative. |
| `2026-09-29 - Lesson 6 Simple Sentences Particles.pdf` | 24 | も, の, possession/affiliation, possessive pronouns, telephone numbers, か, alternatives, interrogatives and indefinite forms | 25 vocabulary/phrase cards, rules and particle guide; six sentence-building activities; questions on questions, possession, indefinite forms and telephone-number の. The telephone rule is assigned to Lesson 6, its actual source. |
| `FL033 - Hiragana Writing #s 1-3.pdf` | 3 | Worksheets 1–3: vowels, K-row and S-row | All 15 characters have demo, guided tracing and freehand comparison. Open any worksheet from Lessons or select it in the tracing view. |
| `FL033 - Hiragana Writing #s 4-6.pdf` | 3 | Worksheets 4–6: T-row, N-row and H-row | All 15 characters, including ち, つ and ふ, use the same three-stage practice with source page references. |
| `FL033 - Hiragana Writing #s 7-10.pdf` | 4 | Worksheets 7–10: M-row, Y-row, R-row and わ・を・ん | All 16 characters complete the 46 basic kana; worksheets retain the original grouping and Next character advances within the selection. |

There is no Lesson 5 PDF in the supplied folder; the app does not invent that lesson. The combined digraph file explicitly contains Lessons 1.3, 1.4 and 1.5.

## Problems found and fixed

- **No study path:** `LESSONS_METADATA` held vocabulary but was not rendered. Added the Lessons landing view with rules, PDF references, complete vocabulary browsing, reversible flashcards, reveal-before-rating and saved self-reported recall progress.
- **Incomplete content:** restored the missing greetings, people/occupations, number basics, special spellings and pronunciation examples. Totals are now **183 flashcards, 52 quiz questions, 24 number activities and 10 sentence activities**.
- **Incorrect reading hint:** the dictionary word じしょ contains しょ, not じょ. The engineer vocabulary now uses エンジニア; the slide's romaji is retained.
- **Incomplete and unreliable tracing:** the original 21-item set omitted basic worksheet kana, ten diacritics and most digraphs. One item was labelled びょう but contained no う strokes. Replaced sketches with sourced stroke models for all **105** characters/combinations: 46 basic kana, 25 diacritics, 33 digraphs and small っ. The digraph is correctly labelled びょ; びょういん remains its vocabulary example. All ten writing worksheets are directly accessible from Lessons and selectable in tracing.
- **Misleading assessment:** freehand work previously received 95% for the expected stroke count, regardless of shape. Replaced that claim with an explicit model comparison and stroke-count information. Guided tracing checks start, end, direction, path coverage and approximate length, with visible retry feedback.
- **Input and animation problems:** unified drawing around pointer events/capture for touch, pen and mouse; cancel interrupted strokes, stop old animation timers, use consistent drawing/model coordinates, and respect reduced motion for animation/confetti.
- **Quiz quality:** shuffled answer options while preserving the answer key; mixed practice samples three questions from each of the six source lessons. Lesson practice links open the corresponding quiz. Quiz and activity mistakes both enter the notebook.
- **Quiz switching race:** reset the selected lesson, question pool, answer and score together in the click handler. Switching lessons no longer leaves the previous question briefly active while a deferred effect runs.
- **Skipped review items:** removing a mastered item used to advance the array index too, skipping the next item. The retest now keeps the shifted next item at the current index.
- **False progress:** removed the hardcoded “3 Days” streak. Flashcard progress is explicitly self-marked and persisted on the device.
- **Fragile persistence:** malformed or unavailable local storage no longer crashes the app. The original preference and notebook storage keys are retained.
- **Mobile overflow:** the original 375px viewport had 487px of page content. Reworked the header/navigation, wrapping controls, fixed-size drawing area, number-table rows and converter presets. Long tab labels retain their width inside local scrollers, and kana grid rows retain enough height for their readings. The conjugation table scrolls inside its own labelled region.
- **Accessibility:** provided visible keyboard focus, 44px control heights, labelled icon controls/inputs, status feedback, touch-friendly activities and reduced-motion support. Replaced a missing favicon reference.

## Verification

- `npm run check` passes content integrity checks, mapping every PDF found in the project root, all ten writing worksheet groups / 46 basic kana and their stroke data, 44 independently transcribed reference number readings, all 24 number worksheet/example mappings, invalid input and large integer handling, special 兆 readings, correct-answer preservation after shuffling, guided-stroke direction/geometry and storage failure recovery.
- `npm run build` passes.
- Chromium browser automation passed **90 layout checks**: all six lessons with vocabulary expanded, all three drawing stages, quiz, all four study guides and mistake review at **320, 375, 390, 768, 1024 and 1440px**. No page-level horizontal overflow was found. The conjugation table intentionally has local horizontal scrolling.
- **51 learning-flow checks** passed: reveal/rating/persistence, reverse recall, complete greeting availability, every number activity in both worksheet directions, all ten sentence builders, contextual quiz navigation, incorrect-answer feedback, activity/quiz notebook entry, removal without skipping, and converter validation.
- **11 drawing checks** passed using Chromium touch emulation and mouse input: rejection of reversed direction, acceptance of the model path, completing all five strokes of が, undo, freehand model reveal, absence of synthetic accuracy scores, cancelled-touch recovery, mouse drawing and the corrected digraph label.
- Completed every lesson quiz and the balanced mixed session in the browser, checking answer shuffling, score/results and retry reset.
- Current browser console: no application errors or warnings. Mobile lesson and tracing screenshots were visually inspected.
- The built production app also passed six focused digraph-heading layout checks and a lesson-to-quiz flow with romaji hidden.
- Final content-boundary checks inspected all 105 kana cards and all four guide tabs at the same six widths; their text fits each control. This includes the narrower tracing sidebar at tablet and desktop widths.
- The ten writing worksheet links and their destination screens passed another **60 layout/navigation checks** across those six widths. All **46** basic kana models were opened in the worksheet order, including wraparound with Next character; a complete three-stroke あ was traced successfully using touch emulation.

Browser scripts and screenshots from this review are under `output/playwright/`; they are local QA artifacts. The repeatable content checks are in `scripts/check-lessons.mjs`.

## Source fidelity and practical limits

The app follows the supplied classroom material's scope and examples. Kana transcriptions and handwriting models supplement slides that mostly use romaji; they are identified as such. The ん explanations retain the slides' simplified m/ng/n teaching aids and no longer invent a detailed rule for the third sound. The number activity accepts both `sen` and the slide 26 variant `issen` in its worked example.

Pronunciation uses the browser's Japanese speech synthesis; available voices and voice quality depend on the device. No speech-recognition or pronunciation grading is claimed. Freehand recall is self-assessed against the model. Mobile checks use browser viewport and touch emulation; physical iOS/Android hardware was not available in this review. These are practice sessions, rather than a grading or certification system.

Stroke paths are adapted from [KanjiVG](https://kanjivg.tagaini.net/) by Ulrich Apel and contributors, under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), at revision `70a0b7ae0c18ceb5cb358274b029cce0234a43bc`. The app displays attribution and the complete license is saved in `licenses/KanjiVG-COPYING.txt`; see `licenses/README.md` for regeneration and adaptation details. Supplemental large-number pronunciation was cross-checked against the [Japanese Stage-Step workbook](https://safiria.net/nihongo/Japanese%20Stage-Step%20Course%20Workbook%201.pdf) and [Sapporo Board of Education's large-number material](https://www.city.sapporo.jp/kyoiku/shido/documents/1_4_3_7.pdf).
