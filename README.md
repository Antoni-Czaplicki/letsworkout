## Lets Workout

Small demo app for collecting workout applications. It features a polished form UI, inline validation, holiday-aware
date picking, and a simple submission flow. Built with Next.js App Router and deployed to Cloudflare Workers via
OpenNext.

### Features

- Personal info form: first name, last name, email (inline validation), age slider
- Photo upload with drag-and-drop support
- Calendar date picker with Sunday and PL national holiday restrictions
- Holiday info banner for observances on the selected date
- Time-slot selection based on chosen date
- Submission success screen

### Tech stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS v4, Radix UI primitives (via shadcn/ui)
- OpenNext for Cloudflare Workers deployment
- API Ninjas Holidays API (PL) for holiday data

## Getting started

Prerequisites:

- Node 18+ and pnpm (or npm)

1) Install dependencies

```bash
pnpm install
```

Or with npm:

```bash
npm install
```

2) Configure environment variables

- Create a `.env.local` file and add your API Ninjas key:

```bash
NINJA_API_KEY=your_api_key_here
```

3) Run the dev server

```bash
pnpm dev
```

Or with npm:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.