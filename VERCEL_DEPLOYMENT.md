# 🚀 Vercel Deployment Guide - VSG Talent

Complete stap-voor-stap handleiding voor het deployen van de VSG Talent platform naar Vercel.

---

## 📋 Voorbereiding

### ✅ Pre-Deployment Checklist

Voordat je gaat deployen, zorg dat:

- [ ] WordPress backend is live en toegankelijk (niet `localhost`)
- [ ] WordPress plugin `VSG Talent Business Info` is geïnstalleerd en geactiveerd
- [ ] REST API endpoint werkt: `https://jouw-domain.nl/wp-json/levy/v1/business-info`
- [ ] Alle icons zijn geüpload naar `next/public/` (zie `ICONS_EN_LOGO_INSTRUCTIES.md`)
- [ ] GitHub repository is up-to-date
- [ ] Domain `vsgtalent.nl` is gereed (optioneel voor nu)

---

## 🔧 Stap 1: Vercel Account Setup

### 1.1 Maak Vercel Account

1. Ga naar: https://vercel.com/signup
2. Klik op **"Continue with GitHub"**
3. Autoriseer Vercel om toegang te krijgen tot je repositories
4. Selecteer **"Hobby"** (gratis) plan

### 1.2 Installeer Vercel CLI (Optioneel)

```bash
npm install -g vercel

# Login
vercel login
```

---

## 🚀 Stap 2: Project Deployen

### Methode 1: Via Vercel Dashboard (Aanbevolen)

#### 2.1 Importeer Repository

1. Ga naar: https://vercel.com/new
2. Klik op **"Import Git Repository"**
3. Zoek naar: `levy-racing-pulse`
4. Klik op **"Import"**

#### 2.2 Project Configuratie

**Configure Project:**
```
Project Name: vsg-talent
Framework Preset: Next.js
Root Directory: next/
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

#### 2.3 Environment Variables Toevoegen

Klik op **"Environment Variables"**

Voeg toe:
```
Name: NEXT_PUBLIC_WP_API_URL
Value: https://jouw-wordpress-backend.nl/wp-json
Environment: Production, Preview, Development (alle 3 aanvinken)
```

**Belangrijk**: Vervang `jouw-wordpress-backend.nl` met je echte WordPress URL!

#### 2.4 Deploy!

1. Klik op **"Deploy"**
2. Wacht 2-3 minuten terwijl Vercel build
3. ✅ Deployment succesvol!

---

### Methode 2: Via Vercel CLI

```bash
# Ga naar next folder
cd next/

# Deploy
vercel

# Volg de prompts:
# - Set up and deploy? Yes
# - Which scope? [Jouw account]
# - Link to existing project? No
# - Project name? vsg-talent
# - Directory? ./
# - Override settings? No

# Voeg environment variable toe
vercel env add NEXT_PUBLIC_WP_API_URL production
# Plak je WordPress URL

# Deploy naar productie
vercel --prod
```

---

## 🌐 Stap 3: Custom Domain Configureren

### 3.1 Domain Toevoegen in Vercel

1. Ga naar je project dashboard
2. Klik op **"Settings"** tab
3. Klik op **"Domains"**
4. Voeg toe: `vsgtalent.nl`
5. Klik **"Add"**

### 3.2 DNS Configuratie

Vercel geeft je DNS records. Voeg toe bij je domain provider:

#### Voor Root Domain (vsgtalent.nl):
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

#### Voor WWW Subdomain:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### SSL Certificate

Vercel configureert automatisch gratis SSL via Let's Encrypt. Dit duurt 5-10 minuten na DNS propagatie.

---

## ⚙️ Stap 4: WordPress Backend Setup

### 4.1 WordPress LIVE Zetten

Als je WordPress lokaal draait, moet het live:

**Opties:**
1. **Shared Hosting** (Hostinger, SiteGround)
2. **VPS** (DigitalOcean, Linode)
3. **Managed WordPress** (WP Engine, Kinsta)
4. **Budget** (TransIP, Versio)

### 4.2 CORS Configuratie

Voeg toe aan WordPress `wp-config.php`:

```php
// Allow CORS from Vercel domain
header('Access-Control-Allow-Origin: https://vsgtalent.nl');
header('Access-Control-Allow-Origin: https://www.vsgtalent.nl');
header('Access-Control-Allow-Origin: https://vsg-talent.vercel.app');
```

**OF** installeer plugin: **"WP CORS"**

### 4.3 Permalink Flush

1. Ga naar WordPress admin
2. **Settings** → **Permalinks**
3. Klik **"Save Changes"**

---

## 🔐 Stap 5: Security & Performance

### 5.1 Environment Variables Checken

Ga naar Vercel project → **Settings** → **Environment Variables**

Zorg dat `NEXT_PUBLIC_WP_API_URL` correct is voor:
- ✅ Production
- ✅ Preview
- ✅ Development

### 5.2 Analytics Toevoegen (Optioneel)

**Vercel Analytics:**
```bash
cd next/
npm install @vercel/analytics

# Voeg toe aan layout.tsx
import { Analytics } from '@vercel/analytics/react';
```

**Google Analytics:**
Voeg toe in `next/src/app/layout.tsx`:
```typescript
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

### 5.3 Speed Insights

Vercel Speed Insights is automatisch enabled voor Hobby plan!

---

## 🧪 Stap 6: Testing

### 6.1 Test Deployment URL

Vercel geeft je een URL: `https://vsg-talent.vercel.app`

**Test checklist:**
- [ ] Homepage laadt correct
- [ ] VSG Talent branding zichtbaar
- [ ] Footer toont VSG Dakwerken contactgegevens
- [ ] `/nieuws` werkt en toont WordPress posts
- [ ] `/agenda` werkt en toont events
- [ ] `/over-levy` pagina werkt
- [ ] Social media links werken
- [ ] Icons zichtbaar in browser tab
- [ ] OG image werkt (test via Facebook Debugger)

### 6.2 WordPress API Test

Open in browser:
```
https://jouw-wordpress-backend.nl/wp-json/levy/v1/business-info
```

Je zou VSG Dakwerken JSON data moeten zien.

### 6.3 SEO Check

**Tools:**
- Google PageSpeed Insights: https://pagespeed.web.dev/
- Rich Results Test: https://search.google.com/test/rich-results
- Schema Validator: https://validator.schema.org/

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 🔄 Stap 7: Continuous Deployment

### Auto-Deploy on Git Push

Vercel is nu gekoppeld aan je GitHub repository!

**Workflow:**
1. Maak wijzigingen lokaal
2. Commit & push naar `main` branch
3. Vercel detecteert push automatisch
4. Nieuwe deployment wordt gestart
5. Na 2-3 minuten live!

**Preview Deployments:**
- Elke push naar een feature branch krijgt een preview URL
- Test nieuwe features voor ze live gaan
- Voorbeeld: `https://vsg-talent-git-feature-naam.vercel.app`

---

## 📊 Stap 8: Monitoring & Maintenance

### 8.1 Vercel Dashboard

Monitor je site via: https://vercel.com/dashboard

**Metrics:**
- Build times
- Deployment status
- Analytics
- Speed insights
- Error logs

### 8.2 Error Tracking

**Vercel Functions Logs:**
1. Ga naar project dashboard
2. Klik op **"Logs"** tab
3. Filter op errors

**Aanbevolen: Sentry**
```bash
npm install @sentry/nextjs

# Configureer Sentry voor error tracking
```

### 8.3 Uptime Monitoring

**Gratis tools:**
- UptimeRobot: https://uptimerobot.com/
- Pingdom: https://www.pingdom.com/
- StatusCake: https://www.statuscake.com/

---

## 🆘 Troubleshooting

### ❌ Build Fails

**Error: "Module not found"**
```bash
# Lokaal testen
cd next/
npm install
npm run build

# Als lokaal werkt, maar Vercel niet:
# Check Node version in vercel.json
```

**Error: "Environment variable not set"**
1. Ga naar Vercel project settings
2. Environment Variables
3. Voeg `NEXT_PUBLIC_WP_API_URL` toe
4. Redeploy

### ❌ WordPress Data Laadt Niet

**Checklist:**
1. WordPress backend is online? (niet localhost)
2. REST API werkt? Test: `/wp-json/levy/v1/business-info`
3. CORS correct geconfigureerd?
4. Environment variable correct in Vercel?

**Debug:**
```bash
# Check in Vercel Functions log
# Kijk naar 404 of CORS errors
```

### ❌ 404 on Custom Domain

**DNS Propagation:**
- Duurt 4-48 uur
- Check via: https://dnschecker.org/

**Vercel SSL:**
- Wacht 10-15 minuten na DNS propagatie
- Vercel configureert automatisch SSL

### ❌ Images Not Loading

**Next.js Image Domains:**

In `next.config.ts`, voeg WordPress domain toe:
```typescript
images: {
  remotePatterns: [
    { protocol: "https", hostname: "jouw-wordpress.nl" },
  ],
}
```

Commit, push, en Vercel redeploys automatisch.

---

## 📈 Post-Deployment

### 1. Google Search Console

1. Ga naar: https://search.google.com/search-console
2. Add property: `https://vsgtalent.nl`
3. Verify via DNS or HTML upload
4. Submit sitemap: `https://vsgtalent.nl/sitemap.xml`

### 2. Google Analytics

1. Maak property aan voor vsgtalent.nl
2. Voeg tracking code toe in `layout.tsx`
3. Deploy

### 3. Social Media

Update social media met nieuwe URL:
- Instagram bio
- LinkedIn company page
- Facebook page

### 4. Email Signatures

Update VSG Dakwerken email signatures:
- **Stephan**: Voeg vsgtalent.nl toe
- **Mustafa**: Voeg vsgtalent.nl toe

---

## ✅ Final Checklist

Post-deployment checklist:

### Technical:
- [ ] Site bereikbaar via vsgtalent.nl
- [ ] SSL certificate actief (🔒 in browser)
- [ ] All pages werken (nieuws, agenda, etc.)
- [ ] WordPress data synchroniseert
- [ ] Images laden correct
- [ ] Forms werken (contact)
- [ ] Mobile responsive

### SEO:
- [ ] Sitemap ingediend bij Google
- [ ] Google Analytics actief
- [ ] Rich results getest en OK
- [ ] PageSpeed score 90+
- [ ] OG images werken (test social sharing)

### Content:
- [ ] VSG branding overal zichtbaar
- [ ] Contact details correct
- [ ] Social media links werken
- [ ] Copyright info correct

### Business:
- [ ] Partners geïnformeerd over nieuwe URL
- [ ] Social media updated
- [ ] Email signatures updated
- [ ] Marketing materiaal updated

---

## 🎉 Klaar!

Je VSG Talent platform is nu live op Vercel!

**URLs:**
- **Production**: https://vsgtalent.nl
- **Vercel Preview**: https://vsg-talent.vercel.app
- **Admin**: https://vercel.com/dashboard

**Support:**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Issues: Voor vragen/bugs

---

## 📞 Quick Commands

```bash
# Local development
cd next/
npm run dev

# Build test
npm run build

# Deploy preview
vercel

# Deploy production
vercel --prod

# Check logs
vercel logs [deployment-url]

# Environment variables
vercel env ls
vercel env add [NAME]
vercel env rm [NAME]
```

**Succes met je deployment! 🚀**
