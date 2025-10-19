# 🎨 Icons en Logo Instructies - VSG Talent

Dit document beschrijft welke icons en logo's je nodig hebt voor de VSG Talent website en waar je ze moet plaatsen.

---

## 📦 Benodigde Bestanden

### 1. **Favicon & Web App Icons**

Deze icons verschijnen in browser tabs, bookmarks en als je de site als app op je telefoon opslaat.

#### Specificaties:

| Bestand | Afmetingen | Formaat | Locatie |
|---------|-----------|---------|---------|
| `favicon.ico` | 32x32px | ICO | `next/public/` |
| `icon-192.png` | 192x192px | PNG | `next/public/` |
| `icon-512.png` | 512x512px | PNG | `next/public/` |
| `apple-touch-icon.png` | 180x180px | PNG | `next/public/` |

#### Design Aanbevelingen:
- **Kleur**: Oranje (#FF6B00) op transparante of zwarte achtergrond
- **Inhoud**: "VSG" letters of VSG Dakwerken logo
- **Stijl**: Bold, modern, goed leesbaar op klein formaat
- **Vorm**: Vierkant met afgeronde hoeken (voor moderne look)

#### Online Tools voor Iconen:
- **Favicon Generator**: https://realfavicongenerator.net/
- **Canva**: https://www.canva.com/ (gratis account)
- **Figma**: https://www.figma.com/ (gratis account)

---

### 2. **Open Graph Image**

Dit is de preview afbeelding die verschijnt als je de website deelt op social media (Facebook, LinkedIn, WhatsApp, etc.)

#### Specificaties:

| Bestand | Afmetingen | Formaat | Locatie |
|---------|-----------|---------|---------|
| `og-image.jpg` | 1200x630px | JPG | `next/public/` |

#### Design Aanbevelingen:
- **Template Layout**:
  ```
  ┌─────────────────────────────────────┐
  │  VSG TALENT                         │
  │  Altijd 100%, in weer en wind       │
  │                                     │
  │  [Foto Levy Opbergen met kart]     │
  │                                     │
  │  www.vsgtalent.nl                   │
  │  Powered by VSG Dakwerken           │
  └─────────────────────────────────────┘
  ```

- **Kleuren**: 
  - Achtergrond: Donker (zwart/donkergrijs)
  - Accent: Oranje (#FF6B00)
  - Tekst: Wit
  
- **Afbeeldingen**: 
  - Gebruik een actie foto van Levy in zijn kart
  - Zorg dat de foto dynamisch en professioneel is
  - Eventueel VSG Dakwerken logo in de hoek

---

### 3. **Logo Bestanden** (Optioneel maar Aanbevolen)

Voor nog professionelere uitstraling kun je dedicated logo bestanden toevoegen.

#### Specificaties:

| Bestand | Gebruik | Formaat | Locatie |
|---------|---------|---------|---------|
| `vsg-talent-logo.svg` | Header/Footer | SVG | `next/public/` |
| `vsg-talent-logo-white.svg` | Dark backgrounds | SVG | `next/public/` |
| `vsg-dakwerken-logo.svg` | Partner logo | SVG | `next/public/` |

#### Design Aanbevelingen:
- **VSG Talent Logo**:
  - Combineert "VSG" met een sport element (vlag, beweging, trofee)
  - Modern, dynamisch design
  - Goed schaalbaar (van klein naar groot)
  
- **Kleur Varianten**:
  - Primary: Oranje op transparant
  - Dark: Oranje + wit op donker
  - Light: Oranje + grijs op wit

---

## 🎨 Design Guidelines

### VSG Talent Brand Identity

#### Kleuren:
```css
Primary: #FF6B00 (VSG Oranje)
Secondary: #000000 (Zwart)
Accent: #FFFFFF (Wit)
Background: #0A0A0A (Donker zwart)
```

#### Typography:
- **Headlines**: Poppins (Bold, 600, 700, 800)
- **Body**: Inter (Regular, Medium, Semibold)

#### Style:
- **Mood**: Dynamisch, professioneel, sportief
- **Shapes**: Afgeronde hoeken (8-12px radius)
- **Effects**: Gradient overlays, subtle shadows

---

## 🛠️ Stap-voor-Stap Instructies

### Optie 1: Canva (Aanbevolen voor Beginners)

1. **Ga naar** https://www.canva.com
2. **Maak account** aan (gratis)
3. **Zoek template**: "Logo", "Social Media Header" of "Favicon"
4. **Pas aan**:
   - Verander tekst naar "VSG Talent"
   - Gebruik oranje kleur (#FF6B00)
   - Voeg slogan toe: "Altijd 100%, in weer en wind"
5. **Download** in juiste formaat (PNG voor icons, JPG voor OG image)
6. **Resize** indien nodig via https://www.iloveimg.com/resize-image

### Optie 2: Professionele Designer

Als je een designer hebt of wilt inhuren:

**Design Brief:**
```
Project: VSG Talent Platform Branding
Deliverables:
- Favicon set (16x16, 32x32, 192x192, 512x512)
- Open Graph image (1200x630)
- Logo files (SVG, PNG) in kleur + wit variants

Brand Guidelines:
- Primary Color: #FF6B00 (Orange)
- Style: Modern, sporty, professional
- Keywords: Performance, 100%, weather-proof, talent
- Slogan: "Altijd 100%, in weer en wind"
- Target: B2B partnerships + sports fans
```

### Optie 3: AI Image Generator

**DALL-E / Midjourney Prompt:**
```
Modern minimalist logo for VSG Talent, sports talent platform, 
orange (#FF6B00) and black color scheme, bold typography, 
abstract athlete silhouette, professional business style, 
vector graphics, white background, 4K quality
```

---

## 📸 Foto's voor Website

### Benodigde Foto's:

#### 1. **Hero Image** (Hero Section achtergrond)
- **Huidige**: `/hero-racing.jpg`
- **Vervanging nodig?**: Optioneel vervangen met VSG branded foto
- **Inhoud**: Levy Opbergen in actie tijdens race
- **Spec**: 1920x1080px minimum, JPG, hoge kwaliteit

#### 2. **Talent Profile Foto's**
Voor toekomstige talenten:
- **Formaat**: 600x600px (vierkant)
- **Stijl**: Professioneel, sportief, consistent
- **Locatie**: `next/public/talents/`

#### 3. **Partner Logo's**
Voor sponsor showcase:
- **Formaat**: SVG (best) of PNG (transparant)
- **Afmeting**: Max 200px breedte
- **Locatie**: `next/public/sponsors/`

---

## ✅ Checklist

Vink af wat je hebt gemaakt en geüpload:

### Must Have (Verplicht):
- [ ] `favicon.ico` (32x32)
- [ ] `icon-192.png` (192x192)
- [ ] `icon-512.png` (512x512)
- [ ] `apple-touch-icon.png` (180x180)
- [ ] `og-image.jpg` (1200x630)

### Nice to Have (Aanbevolen):
- [ ] `vsg-talent-logo.svg`
- [ ] `vsg-talent-logo-white.svg`
- [ ] `vsg-dakwerken-logo.svg`
- [ ] Nieuwe `hero-racing.jpg` met VSG branding

### Testing:
- [ ] Favicon test in browser (meerdere browsers)
- [ ] OG image test via https://www.opengraph.xyz/
- [ ] Mobile icon test (voeg toe aan homescreen)
- [ ] Logo's testen in header/footer (groot en klein formaat)

---

## 🔧 Hoe te Uploaden

### Methode 1: Direct in `next/public/` folder
1. Open VS Code
2. Navigeer naar `next/public/` folder
3. Sleep de bestanden erin
4. Commit & push naar Git

### Methode 2: Via Terminal
```bash
# Ga naar project directory
cd /Users/raygritter/Coding/Levy\ Opbergen/levy-racing-pulse/next/public

# Kopieer je icons
cp ~/Downloads/icon-192.png .
cp ~/Downloads/icon-512.png .
cp ~/Downloads/apple-touch-icon.png .
cp ~/Downloads/og-image.jpg .
```

---

## 🎯 Waar Worden Ze Gebruikt?

### In de Code:

**Favicon** wordt automatisch geladen door Next.js als je `favicon.ico` in `next/public/` plaatst.

**PWA Icons** worden gebruikt in `next/src/app/manifest.ts`:
```typescript
icons: [
  {
    src: "/icon-192.png",
    sizes: "192x192",
    type: "image/png",
  },
  {
    src: "/icon-512.png",
    sizes: "512x512",
    type: "image/png",
  },
]
```

**OG Image** wordt gebruikt in `next/src/app/layout.tsx`:
```typescript
openGraph: {
  images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
    },
  ],
}
```

---

## 📞 Support

Hulp nodig bij het maken van icons?
- **Canva Tutorial**: https://www.youtube.com/watch?v=tSNbXEyKqEU
- **Favicon Generator**: https://realfavicongenerator.net/
- **Free Icon Resources**: 
  - https://www.flaticon.com
  - https://icons8.com
  - https://www.iconfinder.com

---

## 💡 Pro Tips

1. **Consistentie**: Gebruik overal dezelfde oranje kleur (#FF6B00)
2. **Eenvoud**: Icons moeten ook op 16x16px leesbaar zijn
3. **Professional**: Investeer in een goede designer als je budget hebt
4. **Testing**: Test altijd op verschillende devices en browsers
5. **Backup**: Bewaar bronbestanden (PSD, AI, Figma) voor toekomstige edits

---

**Succes met het maken van je VSG Talent branding! 🚀**
