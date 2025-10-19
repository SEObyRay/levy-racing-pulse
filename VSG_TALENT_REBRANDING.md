# 🔄 VSG Talent Platform - Rebranding Overzicht

## 📋 Strategische Positionering

**Van**: Persoonlijke website Levy Opbergen  
**Naar**: VSG Talent Platform - Multi-talent sportsponsoring platform

### Nieuwe Branding:
- **Domeinnaam**: `vsgtalent.nl`
- **Slogan**: "Altijd 100%, in weer en wind"
- **Organisatie**: VSG Dakwerken B.V.
- **Doel**: Platform voor ondersteuning van meerdere Nederlandse sporttalenten

---

## ✅ Voltooide Wijzigingen

### 1. **Site URL & Metadata**
- ✅ SITE_URL aangepast naar `https://vsgtalent.nl`
- ✅ Root layout metadata:
  - Title: "VSG Talent - Altijd 100%, in weer en wind"
  - Template: "%s | VSG Talent"
  - Description focus op multi-talent platform
  - Keywords uitgebreid met VSG Dakwerken, sportsponsoring
  - Publisher: VSG Dakwerken

### 2. **Business Information**
- ✅ Default business info aangepast met VSG Dakwerken data:
  - **Adres**: Söderblomstraat 181, 2131 GE Hoofddorp
  - **Coördinaten**: 52.30338852113304, 4.671270639907734
  - **Telefoon**: +31 6 51664731
  - **Email**: info@vsgdakwerken.nl
  - **Contactpersonen**:
    - Stephan van Opbergen (Mede-eigenaar, Verkoop/Administratie)
    - Mustafa Guner (Mede-eigenaar, Projectleider)
  - **Social Media**:
    - Instagram: @vsgdakwerken.nl
    - LinkedIn: VSG Dakwerken company page

### 3. **Structured Data (Schema.org)**
- ✅ WebSite Schema:
  - Name: "VSG Talent"
  - AlternateName: ["VSG Talent Platform", "VSG Dakwerken Talent"]
  - Description aangepast voor multi-talent platform
  
- ✅ Organization Schema:
  - Type: SportsOrganization
  - Automatisch gevuld met VSG Dakwerken bedrijfsgegevens
  - Geo-coördinaten Hoofddorp
  - Contactpunten voor beide mede-eigenaren

### 4. **Metadata per Pagina**
- ✅ Nieuws pagina: "VSG Talent sporters" in plaats van alleen Levy
- ✅ Agenda pagina: "onze talenten" in plaats van specifiek Levy
- ✅ OpenGraph tags: vsgtalent.nl URLs
- ✅ Canonical URLs: via buildCanonical helper

### 5. **PWA & Manifest**
- ✅ App naam: "VSG Talent - Altijd 100%, in weer en wind"
- ✅ Short name: "VSG Talent"
- ✅ Description aangepast

### 6. **SEO Files**
- ✅ robots.txt: Sitemap URL naar vsgtalent.nl
- ✅ Sitemap.xml: Wordt dynamisch gegenereerd met nieuwe base URL

---

## 🔄 Nog Te Doen

### 1. **Header Component** 
Huidige logo/branding moet aangepast worden:
```tsx
// Voeg VSG Talent logo en navigatie toe
// Optioneel: dropdown voor "Onze Talenten" met Levy Opbergen als eerste
```

### 2. **Footer Component**
Update footer met:
- VSG Dakwerken bedrijfsgegevens
- Link naar vsgdakwerken.nl
- Copyright: VSG Dakwerken B.V.
- Slogan: "Altijd 100%, in weer en wind"

### 3. **Homepage Herstructurering**
Transformeer naar platform homepage:

#### Voorgestelde Secties:
1. **Hero Section**
   - VSG Talent branding
   - Slogan: "Altijd 100%, in weer en wind"
   - CTA: "Ontdek onze talenten" + "Word partner"

2. **Talenten Showcase** (nieuw!)
   ```tsx
   // Grid met talent cards
   - Levy Opbergen (Karting)
   - [Toekomstig talent 2]
   - [Toekomstig talent 3]
   - "+ Word gesteund" call-to-action
   ```

3. **Over VSG Talent** (nieuw!)
   - Missie en visie
   - Link naar VSG Dakwerken
   - Waarom we talenten steunen

4. **Laatste Nieuws**
   - Aggregatie van alle talenten
   - Filter per talent

5. **Partner Worden**
   - Benefits voor sponsors
   - Contact CTA

### 4. **Nieuwe Pagina's (Optioneel)**

#### `/talenten` (Talent Overview)
Overzicht van alle gesteunde sporters:
- Grid layout met talent profiles
- Sport categorie
- Achievements
- Link naar individuele talent pages

#### `/talent/levy-opbergen`
Dedicated talent page per sporter:
- Biografie
- Stats & achievements
- News feed (gefilterd)
- Agenda (gefilterd)
- Sponsor packages specifiek voor talent

#### `/over-vsg-talent`
Platform informatie:
- Missie & visie
- Waarom sportsponsoring?
- Team VSG Dakwerken
- Contact informatie

#### `/word-partner`
Sponsoring informatie:
- Partnership packages
- Benefits
- Success stories
- Contact formulier

---

## 🎨 Design Overwegingen

### Color Palette
- **Primary**: Behouden oranje (#FF6B00) - VSG Dakwerken branding
- **Accent**: Mogelijk blauw toevoegen voor VSG corporate
- **Background**: Dark theme behouden

### Typography
- Behouden: Poppins (headlines) + Inter (body)
- Consistent met professionele corporate look

### Components
- **Talent Card**: Nieuwe component voor talent profiles
- **Partnership CTA**: Call-to-action blocks voor sponsors
- **Multi-sport Icons**: Icons voor verschillende sporten

---

## 📊 WordPress Aanpassingen

### Custom Post Types (Aanbeveling)
```php
// Voeg toe aan functions.php of plugin
register_post_type('talent', [
    'labels' => ['name' => 'Talenten'],
    'public' => true,
    'has_archive' => true,
    'supports' => ['title', 'editor', 'thumbnail'],
    'menu_icon' => 'dashicons-awards',
]);

// ACF Fields voor Talent:
- Naam
- Sport (taxonomy)
- Geboortedatum
- Prestaties (repeater)
- Social media links
- Status (actief/archief)
```

### Taxonomies
```php
register_taxonomy('sport', 'talent', [
    'labels' => ['name' => 'Sporten'],
    'hierarchical' => true,
]);

// Sports: Karting, Voetbal, Tennis, etc.
```

### Menu Structure
```
WordPress Admin:
├── Talenten (custom post type)
├── Nieuws (per talent filtering)
├── Agenda (per talent filtering)
├── Bedrijfsinformatie (ACF Options)
└── VSG Settings (nieuwe options page)
    ├── Platform teksten
    ├── Partnership packages
    └── Homepage settings
```

---

## 🚀 Next.js Frontend Implementatie

### Nieuwe API Endpoints
```typescript
// next/src/lib/wordpress-data.ts

export async function getTalents() {
  // Fetch all talents from WP
}

export async function getTalentBySlug(slug: string) {
  // Fetch single talent
}

export async function getNewsByTalent(talentId: number) {
  // Filter news by talent
}
```

### Route Structure
```
/                          → VSG Talent homepage
/talenten                  → All talents overview
/talent/levy-opbergen      → Levy's profile
/talent/[slug]             → Dynamic talent pages
/nieuws                    → All news (multi-talent)
/nieuws/[year]/[slug]      → News detail
/agenda                    → All events (multi-talent)
/agenda/[year]/[slug]      → Event detail
/over-vsg-talent           → About platform
/word-partner              → Sponsorship info
/contact                   → Contact
```

---

## 📈 SEO Impact

### Voordelen van Rebranding:
1. **Bredere targeting**: Niet beperkt tot één persoon
2. **Schaalbaarheid**: Makkelijk nieuwe talenten toevoegen
3. **Corporate backing**: VSG Dakwerken geloofwaardigheid
4. **Multi-sport keywords**: Breder zoekverkeer
5. **Partnership focus**: B2B SEO mogelijkheden

### Nieuwe Keywords:
- VSG Talent
- VSG Dakwerken sportsponsoring
- Nederlandse sporttalenten
- Karting sponsoring Nederland
- Sport partnership Nederland
- Altijd 100% in weer en wind (branded keyword)

### Schema.org Updates:
- SportsOrganization (platform level)
- Person schema per talent
- SponsorshipEvent voor partnerships
- ItemList voor talent overview

---

## ✅ Checklist voor Go-Live

### Pre-Launch:
- [ ] Domain registreren: vsgtalent.nl
- [ ] DNS configureren naar hosting
- [ ] SSL certificaat activeren
- [ ] WordPress configureren met nieuwe URL
- [ ] ACF Options invullen met VSG data
- [ ] Icons/logo's uploaden (VSG Talent branding)
- [ ] OG image maken met VSG Talent branding

### Post-Launch:
- [ ] Google Search Console verificatie
- [ ] Google Analytics property aanmaken
- [ ] 301 redirects van levyopbergen.nl (indien nodig)
- [ ] Social media accounts updaten
- [ ] Email signatures updaten
- [ ] Marketing materiaal updaten

---

## 💡 Content Strategie

### Launch Content:
1. **Welkom post**: VSG Talent platform announcement
2. **Meet Levy**: Featured talent introductie
3. **VSG Dakwerken story**: Waarom we talenten steunen
4. **Partnership opportunities**: Sponsor benefits

### Ongoing Content:
- Maandelijkse talent updates
- Race verslagen (per talent)
- Behind-the-scenes content
- Sponsor spotlights
- Success stories

---

## 🎯 Success Metrics

### KPIs om te volgen:
- **Traffic**: Organisch verkeer naar platform
- **Engagement**: Time on site, pages per session
- **Conversions**: Partnership inquiries
- **Social**: Follows, shares, engagement
- **SEO**: Rankings voor VSG Talent keywords
- **Brand awareness**: Direct traffic groei

---

## 📞 Support & Documentatie

### Gerelateerde Documentatie:
- `WORDPRESS_BUSINESS_INFO_SETUP.md` - WordPress configuratie
- `SEO_OPTIMALISATIES.md` - SEO details
- `.env.example` - Environment variabelen

### Contact:
- **Technical**: development team
- **Content**: marketing team
- **Business**: Stephan van Opbergen / Mustafa Guner

---

## 🎉 Conclusie

De rebranding naar **VSG Talent Platform** positioneert de website als een professioneel, schaalbaar platform voor sporttalent-ondersteuning. Met VSG Dakwerken als backing organisation en de krachtige slogan **"Altijd 100%, in weer en wind"**, creëer je een herkenbaar merk dat groei mogelijk maakt.

**Levy Opbergen** blijft het eerste en featured talent, maar de platform-structuur maakt het makkelijk om in de toekomst meer talenten toe te voegen en het partnership-programma uit te breiden.

**Next Steps**: Implementeer de homepage herstructurering en nieuwe talent pages volgens bovenstaande specificaties.
