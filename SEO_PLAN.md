# SEO-optimalisatie Plan voor Vercel Deployment

## Huidige Situatie
- **Stack**: Vite + React (CSR) → HTML bevat alleen `<div id="root"></div>`
- **Probleem**: Google crawlers zien geen content in de bron, slechte LCP, geen social previews
- **Doel**: Server-side rendering (SSR) of Static Site Generation (SSG) voor SEO-vriendelijke output

## Aanbevolen Aanpak: Migratie naar Next.js

### Waarom Next.js?
1. **Native SSR/SSG**: Elke pagina kan server-rendered of statisch gegenereerd worden
2. **Vercel-optimized**: Next.js is gebouwd door Vercel, perfecte integratie
3. **SEO-first**: Metadata API, automatic sitemap, robots.txt support
4. **Incremental Static Regeneration (ISR)**: WordPress content updates zonder volledige rebuild
5. **Image optimization**: Automatische lazy loading en responsive images
6. **API Routes**: WordPress proxy endpoints voor veilige authenticatie

### Migratiestappen

#### Fase 1: Next.js Setup (1-2 uur)
- [ ] Installeer Next.js 14+ met App Router
- [ ] Migreer Tailwind config en globals.css
- [ ] Setup `@/` alias in tsconfig
- [ ] Kopieer components naar `app/components/`

#### Fase 2: Routing & Pages (2-3 uur)
- [ ] Converteer routes naar Next.js App Router structuur:
  - `app/page.tsx` (home)
  - `app/nieuws/page.tsx` (overzicht)
  - `app/nieuws/[year]/[slug]/page.tsx` (detail)
  - `app/agenda/page.tsx`
  - `app/agenda/[year]/[slug]/page.tsx`
  - `app/over-levy/page.tsx`
  - `app/sponsors/page.tsx`
  - `app/contact/page.tsx`
  - `app/media/page.tsx`
  - `app/club-van-100/page.tsx`

#### Fase 3: WordPress Integratie (2 uur)
- [ ] Verplaats `wordpress-client.ts` naar `lib/`
- [ ] Maak API routes voor WordPress proxy:
  - `app/api/wp/posts/route.ts`
  - `app/api/wp/events/route.ts`
- [ ] Gebruik `fetch` met `revalidate` voor ISR
- [ ] Environment variables in Vercel dashboard

#### Fase 4: SEO Metadata (1 uur)
- [ ] Implementeer `generateMetadata()` per pagina
- [ ] Dynamische Open Graph images
- [ ] JSON-LD structured data (Person, Event, Organization)
- [ ] Sitemap.xml generatie
- [ ] robots.txt configuratie

#### Fase 5: Performance (1 uur)
- [ ] Next.js Image component voor alle afbeeldingen
- [ ] Font optimization (next/font)
- [ ] Lazy loading voor components
- [ ] Vercel Analytics setup

#### Fase 6: Deployment (30 min)
- [ ] Push naar GitHub
- [ ] Connect Vercel project
- [ ] Configure environment variables
- [ ] Deploy en test

## Alternatief: Vite SSG Plugin (sneller maar minder krachtig)

### Waarom vite-plugin-ssg?
- Snellere migratie (geen framework-switch)
- Statische HTML voor alle routes
- Blijf Vite gebruiken

### Nadelen vs Next.js
- Geen ISR (volledige rebuild nodig bij WordPress updates)
- Handmatige sitemap/robots.txt
- Geen API routes (WordPress credentials in frontend)
- Minder Vercel-optimalisaties

### Setup (indien gekozen)
```bash
npm install -D vite-plugin-ssg vite-plugin-pages
```

## Aanbeveling: **Next.js**

### Voordelen voor dit project:
1. **WordPress updates**: ISR zorgt dat nieuwe posts/events binnen 60s live zijn zonder rebuild
2. **SEO**: Perfecte crawlbaarheid, metadata per pagina, structured data
3. **Performance**: Edge rendering, automatic code splitting, image optimization
4. **Vercel**: Zero-config deployment, preview URLs, analytics
5. **Toekomst**: Makkelijk uitbreiden met auth, API routes, middleware

### Geschatte tijdsinvestering:
- **Migratie**: 6-8 uur
- **Testing & QA**: 2 uur
- **Deployment**: 1 uur
- **Totaal**: ~1 werkdag

### ROI:
- Google indexeert alle content binnen 24-48 uur
- LCP < 2.5s (vs huidige 4-6s)
- Social shares tonen correcte previews
- WordPress updates live zonder manual deploy

## Volgende Stap
Laat weten of je wilt dat ik:
1. **Next.js migratie start** (aanbevolen)
2. **Vite SSG implementeer** (sneller maar beperkter)
3. **Beide opties verder uitwerk** met code samples
