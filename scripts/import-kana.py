"""Import the exact KanjiVG paths used by the tracing view (CC BY-SA 3.0)."""
import concurrent.futures
import json
from pathlib import Path
import urllib.request
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
headers = {'User-Agent': 'FL033-lesson-review'}


def fetch(url):
    request = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read().decode('utf-8')


revision = json.loads(fetch('https://api.github.com/repos/KanjiVG/kanjivg/commits/master'))['sha']
characters = sorted(set('あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゃゅょっ'))


def load_character(character):
    filename = f'{ord(character):05x}.svg'
    source = fetch(f'https://raw.githubusercontent.com/KanjiVG/kanjivg/{revision}/kanji/{filename}')
    svg = ET.fromstring(source)
    paths = [node.attrib['d'] for node in svg.iter('{http://www.w3.org/2000/svg}path')]
    if not paths:
        raise ValueError(f'Missing strokes: {character}')
    return character, paths


with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    paths = dict(pool.map(load_character, characters))
result = {
    'copyright': 'Copyright Ulrich Apel and KanjiVG contributors',
    'source': 'https://kanjivg.tagaini.net/',
    'repository': 'https://github.com/KanjiVG/kanjivg',
    'revision': revision,
    'license': 'CC BY-SA 3.0',
    'changes': 'SVG path data extracted from the original 109x109 files. Display transforms are applied by the app.',
    'paths': paths,
}
target = root / 'src' / 'data' / 'kanaStrokes.json'
target.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
license_dir = root / 'licenses'
license_dir.mkdir(exist_ok=True)
(license_dir / 'KanjiVG-COPYING.txt').write_text(fetch(
    f'https://raw.githubusercontent.com/KanjiVG/kanjivg/{revision}/COPYING'), encoding='utf-8')
print(f'Imported {len(paths)} kana from KanjiVG revision {revision}.')
