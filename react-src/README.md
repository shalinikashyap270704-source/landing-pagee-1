# TRUST-VISION — React source

Real React + TypeScript + Vite + Tailwind + React Three Fiber implementation
of the hero, the "What is Trust-Vision" section, and the fully interactive
6-layer protection panel with a shared, cursor-responsive 3D Trust Core.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## What's implemented

- `TrustCore3D.tsx` — the central 3D object: an icosahedron core, six nested
  protection rings (Data / Model / Inference / Provenance / Evidence / Human
  Review), instanced orbiting nodes per ring, and an ambient particle field.
  It rotates toward the cursor with damped lerp (never snaps), and highlights
  whichever ring is "active."
- `Hero.tsx` — headline, CTAs, verification status row, Trust Core as a
  full-bleed background.
- `WhatIsSection.tsx` — the DATA → MODEL → INFERENCE → PROVENANCE → EVIDENCE →
  TRUSTED DECISION pipeline and the 4-cell value grid.
- `LayersSection.tsx` — the six clickable layers; selecting one re-routes the
  same Trust Core instance (`activeLayer` prop) and swaps the evidence panel.

## Why the rest isn't wired up here

The original brief asks for the black-box→glass-box scroll reveal, the
draggable trust lens, the air-gapped perimeter, the model-agnostic orbit, the
threat reveal, the evidence chain, the animated trust score and the final
convergence — a full production build of all of that is a multi-day frontend
project, not a single file. `App.tsx` has a comment block showing exactly
where each one plugs in, following the same component + `TrustCore3D` pattern
used above, so you (or Claude, asked to continue this file-by-file) can build
them out one at a time without re-architecting anything.

If you want something you can open in a browser **right now** without
running a build step, the published artifact link supplied alongside this
code implements the full spec — hero through footer — using vanilla
Three.js instead of React Three Fiber (a hosted static page has no bundler,
so R3F/JSX can't execute there; it's exactly the same visual/interaction
design, just without the React component layer).
