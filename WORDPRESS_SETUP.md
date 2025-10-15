# WordPress Setup Handleiding - Levy Racing Backend

## 📋 Overzicht
Deze handleiding helpt je om WordPress te configureren als backend voor de Levy Racing Pulse app.

**WordPress URL:** `http://levy-racing-backend.local`  
**Admin URL:** `http://levy-racing-backend.local/wp-admin`

---

## 🔧 Stap 1: Login WordPress Admin

1. Klik op **"WP Admin"** knop in Local
2. Of ga naar: `http://levy-racing-backend.local/wp-admin`
3. Login met:
   - **Username:** Ray
   - **Password:** 123456

---

## 📦 Stap 2: Pods Plugin Installeren

### 2.1 Installatie
1. Ga naar **Plugins** → **Nieuwe plugin toevoegen**
2. Zoek naar **"Pods – Custom Content Types and Fields"**
3. Klik op **Installeren** en daarna **Activeren**

### 2.2 Waarom Pods?
- ✅ Gratis en krachtig
- ✅ Custom Post Types + Custom Fields in één
- ✅ Goede REST API ondersteuning
- ✅ Nederlandse community

---

## 🏗️ Stap 3: Custom Post Type "Evenementen" Aanmaken

### 3.1 Nieuw Pod Aanmaken
1. Ga naar **Pods Admin** → **Add New**
2. Kies **"Custom Post Type"**
3. Vul in:
   - **Label (Plural):** Evenementen
   - **Label (Singular):** Evenement
   - **Pod Name:** evenement

### 3.2 Advanced Options
Scroll naar beneden en configureer:

**Labels & Admin:**
- **Menu Name:** Evenementen
- **Menu Icon:** dashicons-calendar-alt

**Advanced Options:**
- **Supports:** Title, Editor, Featured Image
- **Public:** Yes
- **Show in REST API:** Yes (BELANGRIJK!)
- **REST API Base:** evenementen

Klik op **Save Pod**

### 3.3 Custom Fields Toevoegen aan Evenementen

Klik op **"Edit Pod"** bij Evenementen, ga naar tab **"Manage Fields"**

Voeg deze velden toe (klik telkens op **"Add Field"**):

#### Veld 1: Datum
- **Label:** Datum
- **Name:** datum
- **Field Type:** Date / Time
- **Date Format:** dd/mm/yyyy
- **Show in REST API:** Yes

#### Veld 2: Einddatum
- **Label:** Einddatum
- **Name:** einddatum
- **Field Type:** Date / Time
- **Date Format:** dd/mm/yyyy
- **Show in REST API:** Yes

#### Veld 3: Tijd
- **Label:** Tijd
- **Name:** tijd
- **Field Type:** Plain Text
- **Show in REST API:** Yes

#### Veld 4: Locatie
- **Label:** Locatie/Circuit
- **Name:** locatie
- **Field Type:** Plain Text
- **Show in REST API:** Yes

#### Veld 5: Stad
- **Label:** Stad
- **Name:** stad
- **Field Type:** Plain Text
- **Show in REST API:** Yes

#### Veld 6: Adres
- **Label:** Adres
- **Name:** adres
- **Field Type:** Plain Text
- **Show in REST API:** Yes

#### Veld 7: Klasse
- **Label:** Klasse
- **Name:** klasse
- **Field Type:** Plain Text
- **Show in REST API:** Yes

#### Veld 8: Volgende Race
- **Label:** Volgende Race
- **Name:** volgende_race
- **Field Type:** Yes / No
- **Show in REST API:** Yes

#### Veld 9: Resultaat
- **Label:** Resultaat (voor afgelopen events)
- **Name:** resultaat
- **Field Type:** Plain Text
- **Show in REST API:** Yes

Klik op **Save Pod**

---

## 📝 Stap 4: Posts Configureren voor Race Verslagen

### 4.1 Custom Fields voor Posts

1. Ga naar **Pods Admin** → **Add New**
2. Kies **"Extend Existing"**
3. Selecteer **"Post"**
4. Klik op **Create Pod**

### 4.2 Voeg Custom Fields toe aan Posts

Ga naar **"Manage Fields"** en voeg toe:

#### Veld 1: Circuit
- **Label:** Circuit
- **Name:** circuit
- **Field Type:** Plain Text
- **Show in REST API:** Yes

#### Veld 2: Positie
- **Label:** Positie
- **Name:** positie
- **Field Type:** Number
- **Number Format:** 9999
- **Show in REST API:** Yes

---

## 🏷️ Stap 5: Taxonomieën Aanmaken

### 5.1 Taxonomie: Competities

1. Ga naar **Pods Admin** → **Add New**
2. Kies **"Custom Taxonomy"**
3. Vul in:
   - **Label (Plural):** Competities
   - **Label (Singular):** Competitie
   - **Taxonomy Name:** competitie

**Advanced Options:**
- **Associated Post Types:** Post (vink aan)
- **Show in REST API:** Yes
- **REST API Base:** competities

Klik op **Save Pod**

### 5.2 Taxonomie: Seizoenen

1. Ga naar **Pods Admin** → **Add New**
2. Kies **"Custom Taxonomy"**
3. Vul in:
   - **Label (Plural):** Seizoenen
   - **Label (Singular):** Seizoen
   - **Taxonomy Name:** seizoen

**Advanced Options:**
- **Associated Post Types:** Post (vink aan)
- **Show in REST API:** Yes
- **REST API Base:** seizoenen

Klik op **Save Pod**

---

## 🔐 Stap 6: REST API Authenticatie Instellen

### 6.1 Application Password Aanmaken

1. Ga naar **Gebruikers** → **Profiel**
2. Scroll naar beneden naar **"Application Passwords"**
3. Vul in bij **"New Application Password Name":** `Levy Racing App`
4. Klik op **Add New Application Password**
5. **BELANGRIJK:** Kopieer het gegenereerde wachtwoord (bijv. `xxxx xxxx xxxx xxxx xxxx xxxx`)
6. Bewaar dit veilig - je hebt het nodig voor de React app!

---

## 🧪 Stap 7: Test Data Toevoegen

### 7.1 Competities Toevoegen

1. Ga naar **Berichten** → **Competities**
2. Voeg toe:
   - Rotax Max Challenge
   - IAME X30 Challenge
   - ONK Karting

### 7.2 Seizoenen Toevoegen

1. Ga naar **Berichten** → **Seizoenen**
2. Voeg toe:
   - 2024
   - 2025

### 7.3 Test Evenement Aanmaken

1. Ga naar **Evenementen** → **Nieuwe toevoegen**
2. Vul in:
   - **Titel:** Rotax Max Challenge - Ronde 3
   - **Datum:** 12-04-2025
   - **Einddatum:** 13-04-2025
   - **Tijd:** 09:00 - 18:00
   - **Locatie:** Circuit Park Berghem
   - **Stad:** Berghem
   - **Adres:** Berghem, Nederland
   - **Klasse:** Senior Max
   - **Volgende Race:** Ja
3. Klik op **Publiceren**

### 7.4 Test Race Verslag Aanmaken

1. Ga naar **Berichten** → **Nieuw bericht**
2. Vul in:
   - **Titel:** Podium Finish in Rotax Max Challenge Nederland
   - **Inhoud:** Fantastisch weekend in Lelystad met een 2e plaats in de finale!
   - **Circuit:** Raceway Lelystad
   - **Positie:** 2
   - **Competitie:** Rotax Max Challenge (selecteer)
   - **Seizoen:** 2024 (selecteer)
   - **Uitgelichte afbeelding:** Upload een foto
3. Klik op **Publiceren**

---

## ✅ Stap 8: REST API Testen

### 8.1 Test Endpoints in Browser

Open deze URLs in je browser:

**Evenementen:**
```
http://levy-racing-backend.local/wp-json/wp/v2/evenementen
```

**Posts (Race Verslagen):**
```
http://levy-racing-backend.local/wp-json/wp/v2/posts
```

**Competities:**
```
http://levy-racing-backend.local/wp-json/wp/v2/competities
```

Je zou JSON data moeten zien!

---

## 🔧 Stap 9: CORS Configuratie

Om de React app te laten communiceren met WordPress, moeten we CORS toestaan.

### 9.1 Via Plugin (Makkelijkste Manier)

1. Ga naar **Plugins** → **Nieuwe plugin toevoegen**
2. Zoek naar **"WP CORS"**
3. Installeer en activeer
4. Ga naar **Instellingen** → **WP CORS**
5. Vul in bij **"Access-Control-Allow-Origin":** `http://localhost:5173`
6. Klik op **Save Changes**

### 9.2 Via Code (Alternatief)

Als je liever code gebruikt, voeg dit toe aan `wp-config.php`:

```php
// CORS Headers voor React App
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
```

---

## 📝 Stap 10: Noteer Deze Gegevens

Je hebt deze gegevens nodig voor de React app:

```
WordPress URL: http://levy-racing-backend.local
Username: Ray
Application Password: [het wachtwoord dat je in stap 6 hebt gekopieerd]
```

---

## ✅ Checklist

- [ ] Pods plugin geïnstalleerd en geactiveerd
- [ ] Custom Post Type "Evenementen" aangemaakt met alle velden
- [ ] Posts uitgebreid met custom fields (circuit, positie)
- [ ] Taxonomieën "Competities" en "Seizoenen" aangemaakt
- [ ] Application Password gegenereerd en opgeslagen
- [ ] Test data toegevoegd (1 evenement, 1 post)
- [ ] REST API endpoints getest in browser
- [ ] CORS geconfigureerd voor localhost:5173

---

## 🆘 Hulp Nodig?

Als je ergens vastloopt:
1. Check of Pods plugin actief is
2. Controleer of "Show in REST API" op Yes staat voor alle Pods
3. Test de REST API endpoints in je browser
4. Check de browser console voor CORS errors

---

## 📚 Volgende Stap

Na het voltooien van deze setup, gaan we de React app configureren om data van WordPress op te halen!
