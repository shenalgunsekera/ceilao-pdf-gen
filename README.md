# Ceilao

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project)

Ceilao is a web app to merge images into PDFs and enhance existing PDFs with new images and topics.

## Features
- Batch merge images into a single PDF
- Enhance existing PDFs by appending images under a topic
- Drag-and-drop uploads, progress bars, previews
- Built with Next.js 14, React 18, Tailwind CSS v3, pdf-lib, tus.js

## Bonus Features
- PDF metadata fields (title, author)
- Dark-mode toggle
- Email notification after PDF ready (via free SendGrid tier)

## Accessibility & Error Handling
- All buttons have aria labels and keyboard focus
- File type and size checks with user feedback on errors
- Progress bars and cancel buttons for uploads

## Performance & Deployment
- Chunked, resumable uploads (tus.js or fetch streams)
- CDN for static assets (Vercel edge network)
- Lazy-load components, code-split routes, Next/Image optimization
- SWC compiler, TypeScript paths, light polyfills

## Getting Started

### Install dependencies
```
npm install
```

### Run locally
```
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

### Deploy on Vercel
1. Link your GitHub repo to Vercel
2. Ensure `vercel.json` sets Node 20 runtime
3. Push to `main` branch and Vercel will auto-deploy

## Testing
- Unit: `npm run test`
- E2E: `npm run cypress:open`

## Project Structure

- `/pages/index.tsx` – UI with tabs, upload forms, logo placeholder
- `/pages/api/merge.ts` – handles image uploads, merges to PDF using pdf-lib
- `/pages/api/enhance.ts` – reads uploaded PDF, injects topic as new page header, appends images, returns new PDF
- `/components/FileUploader.tsx` – reusable drag-and-drop uploader + previews
- `/lib/pdfUtils.ts` – helpers for merge(), addTopicAndImages()

---

© Ceilao
