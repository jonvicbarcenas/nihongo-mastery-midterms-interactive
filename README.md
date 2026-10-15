# Nihongo Mastery

An interactive Japanese study app built with React and Vite, based on the FL033 lesson materials.

## Learning activities

- Ten hiragana writing worksheets covering all 46 basic characters.
- Stroke demonstrations, guided tracing and freehand model comparison for 105 kana and combinations.
- Shuffled hiragana flashcards for all 105 characters, individual kana lessons or writing worksheets, with hidden readings and a review round for missed or skipped cards.
- Six lecture modules with 183 flashcards and 52 quiz questions.
- Number worksheets, sentence-building activities and a four-digit number converter.
- A persistent mistake notebook, optional romaji and browser Japanese speech synthesis.
- Responsive layouts and pointer input for touch, pen and mouse.

Vocabulary progress and the mistake notebook are saved in the current browser. Hiragana flashcard rounds start fresh when switching decks or reopening the section. Japanese audio depends on the voices installed on the device.

## Run locally

Use Node.js 22 or later.

```sh
npm ci
npm run dev
```

```sh
npm run check
npm run build
npm run preview
```

The original classroom PDFs are local source materials and are not included in this public repository or the deployed website. Lesson content and worksheet mappings are bundled in the app. To check your local copies against all nine source mappings, place them in the project root and run `npm run check:pdfs`.

## Deploy on Render

For an existing Docker web service, deploy the latest commit from `main`. Use `./Dockerfile`, leave **Docker Command** empty so Render uses the image's `CMD`, and set **Health Check Path** to `/health`. Caddy listens on Render's `PORT` environment variable (normally `10000`); Render handles public HTTPS.

The image removes Caddy's inherited low-port file capability. This avoids `exec /usr/bin/caddy: operation not permitted` in restricted container runtimes, because this app does not bind privileged ports. GitHub Actions builds the production container and checks startup with all capabilities dropped, the health endpoint, SPA routes and JavaScript delivery.

See [Render's Docker guide](https://render.com/docs/docker) and [port binding requirements](https://render.com/docs/web-services#port-binding).

## Deploy on Railway

Connect this repository to a Railway service and deploy its default branch. Railway detects the Dockerfile: Node builds the app, and Caddy serves `dist` using Railway's `PORT`. No application secrets or database are required. Health checks use `/health`.

Generate a public domain under the service's Networking settings. Pushes to the connected branch trigger redeployment.

The same container can run locally:

```sh
docker build -t nihongo-mastery .
docker run --rm -p 3000:3000 -e PORT=3000 nihongo-mastery
```

See [Railway's React deployment guide](https://docs.railway.com/guides/react) and [configuration reference](https://docs.railway.com/config-as-code/reference).

## Sources and attribution

The lessons credit Prof. Jinky R. Delantar. The [lesson review](docs/lesson-review.md) maps the content to the source PDFs and records validation and limitations.

Stroke models are adapted from [KanjiVG](https://kanjivg.tagaini.net/), copyright Ulrich Apel and contributors, under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). See [license details](licenses/README.md) and [the complete license](licenses/KanjiVG-COPYING.txt). The adapted models retain that license. The remaining application source has no additional license grant specified.
