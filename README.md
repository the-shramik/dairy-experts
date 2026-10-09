# The Dairy Experts (India) Pvt. Ltd. website

React 19 + Vite + Tailwind CSS v4 + Framer Motion + React Router.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Where things live

| What | Where |
| --- | --- |
| All text content, phones, services, spares, team, gallery | `src/data/site.js` |
| Brand colours & fonts | `src/index.css` (`@theme`) |
| Pages | `src/pages/` (Home, About, Services, Spare Parts, Projects, Team, Contact) |
| Spare part photos | `public/images/spares/` (add a file, then add a row to `spareParts` in `site.js`) |
| Images, logo, brochure PDF | `public/images/`, `public/the-dairy-experts-brochure.pdf` |

## Pending from client (search `TODO(client)`)

- Team member names & designations (`team` in `site.js`)
- Vision statement (About page)
- Working hours
- Which equipment makes they service (the "makes" marquee on Home)
- Real project names / locations / capacities for the Projects gallery

## Backend (later)

The contact form currently opens WhatsApp with the enquiry prefilled (plus a mailto fallback).
When a Node/Express API is added, replace `submit` in `src/pages/Contact.jsx` with a `POST /api/enquiry`.

## Deploy

Static hosting (Vercel / Netlify / any server). SPA rewrites are included: `vercel.json` and `public/_redirects`.

## Illustrations & credits

- Equipment illustrations (`src/components/illustrations/Equipment.jsx`), machine blueprints (`MachineDiagram.jsx`) and planner graphics are hand-built SVG.
- India map outlines: [@svg-maps/india](https://github.com/VictorCazanave/svg-maps), based on [MapSVG](https://mapsvg.com), licensed CC BY 4.0 (`src/data/indiaMap.js`).
- Plant Planner sizes are indicative only (see `PlantPlanner.jsx` for the rules used).

## Videos

- Hero background: set `heroVideo` in `src/data/site.js` and put the file in `public/videos/`. Use an 8-15 s muted loop, 1920x1080, H.264 MP4 under ~4 MB (optionally a WebM too). The photo shows first and the video fades in; phones, data-saver and reduced-motion users get the photo only.
- Projects "Our work in action": add items to `videos` (YouTube id or self-hosted file + poster). The section is hidden while the list is empty.
