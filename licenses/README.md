# Kana stroke data

`src/data/kanaStrokes.json` contains path data from [KanjiVG](https://kanjivg.tagaini.net/), copyright Ulrich Apel and KanjiVG contributors, under [Creative Commons Attribution-ShareAlike 3.0](https://creativecommons.org/licenses/by-sa/3.0/).

The imported revision is `70a0b7ae0c18ceb5cb358274b029cce0234a43bc`. Individual sources are `kanji/<five-digit Unicode hex>.svg` in the [upstream repository](https://github.com/KanjiVG/kanjivg/tree/70a0b7ae0c18ceb5cb358274b029cce0234a43bc/kanji).

Changes: the original 109 × 109 SVG paths were extracted into JSON. `hiraganaStrokes.js` scales and positions those paths and composes two-character digraph models. These adapted stroke models are also provided under CC BY-SA 3.0. Attribution appears in the tracing view. The complete upstream license is in `KanjiVG-COPYING.txt`.

To regenerate the JSON and license from upstream, run `python scripts/import-kana.py`. This requires network access; the app itself uses the bundled data.
