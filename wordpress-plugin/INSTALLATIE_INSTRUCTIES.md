# 📦 VSG Talent WordPress Plugin - Installatie Instructies

Deze plugin voegt een REST API endpoint toe aan WordPress waarmee de Next.js frontend bedrijfsgegevens kan ophalen.

---

## 🚀 Snelle Installatie

### Methode 1: Via WordPress Admin (Aanbevolen)

1. **Download de plugin**
   - Ga naar de `wordpress-plugin` folder
   - Rechtermuisklik op `vsg-talent-business-info.php`
   - Download/kopieer het bestand

2. **Upload naar WordPress**
   - Log in op je WordPress admin: `http://levy-racing-backend.local/wp-admin`
   - Ga naar: **Plugins** → **Add New** → **Upload Plugin**
   - Klik op **Choose File** en selecteer `vsg-talent-business-info.php`
   - Klik op **Install Now**

3. **Activeer de plugin**
   - Klik op **Activate Plugin**
   - Je ziet nu een nieuw menu-item: **VSG Business Info** (met gebouw icoon)

---

### Methode 2: Via FTP/SFTP

1. **Upload bestand**
   ```
   Upload naar: /wp-content/plugins/vsg-talent-business-info/
   Bestand: vsg-talent-business-info.php
   ```

2. **Activeer in WordPress**
   - Ga naar **Plugins** in WordPress admin
   - Zoek **VSG Talent Business Info**
   - Klik op **Activate**

---

### Methode 3: Via Terminal (als je SSH toegang hebt)

```bash
# Ga naar plugins directory
cd /pad/naar/wordpress/wp-content/plugins/

# Maak plugin folder
mkdir vsg-talent-business-info

# Kopieer het bestand
cp /Users/raygritter/Coding/Levy\ Opbergen/levy-racing-pulse/wordpress-plugin/vsg-talent-business-info.php vsg-talent-business-info/

# Zet correcte permissies
chmod 644 vsg-talent-business-info/vsg-talent-business-info.php
```

Dan in WordPress admin activeren.

---

## ⚙️ Configuratie

### 1. Open Settings Page

Na activatie zie je in de WordPress sidebar:
```
📊 Dashboard
📝 Posts
📄 Pages
...
🏢 VSG Business Info  ← NIEUW!
```

Klik hierop.

### 2. Vul Gegevens In

De plugin heeft al **default VSG Dakwerken data**, maar je kunt alles aanpassen:

#### Organisatie Informatie:
- Organisatie Naam: `VSG Talent`
- Juridische Naam: `VSG Dakwerken B.V.`
- Beschrijving: Vrije tekst
- Opgericht: `2010`

#### Adres Gegevens:
- Straat: `Söderblomstraat`
- Huisnummer: `181`
- Postcode: `2131 GE`
- Plaats: `Hoofddorp`
- Provincie: `Noord-Holland`
- Latitude: `52.30338852113304`
- Longitude: `4.671270639907734`

#### Contact Gegevens:
- Telefoon: `+31 6 51664731`
- Email: `info@vsgdakwerken.nl`
- KvK Nummer: (optioneel)
- BTW Nummer: (optioneel)

#### Social Media:
- Instagram: `https://www.instagram.com/vsgdakwerken.nl/`
- LinkedIn: `https://www.linkedin.com/company/vsg-dakwerken/`
- Facebook: (optioneel)
- YouTube: (optioneel)
- TikTok: (optioneel)
- Twitter: (optioneel)

### 3. Klik "Opslaan"

---

## ✅ Testen

### Test 1: REST API Endpoint

1. **In WordPress admin page**
   - Scroll naar beneden naar "REST API Endpoint"
   - Klik op de **"Test Endpoint"** button
   - Je zou JSON output moeten zien met alle VSG data

2. **In browser**
   - Ga naar: `http://levy-racing-backend.local/wp-json/levy/v1/business-info`
   - Je zou JSON moeten zien zoals:
   ```json
   {
     "organizationName": "VSG Talent",
     "legalName": "VSG Dakwerken B.V.",
     "address": {
       "street": "Söderblomstraat",
       ...
     },
     ...
   }
   ```

### Test 2: Next.js Frontend

1. Start de Next.js dev server (als die nog niet draait)
2. Open: `http://localhost:3001`
3. Scroll naar de footer
4. Je zou nu de **VSG Dakwerken contactgegevens** moeten zien

---

## 🔧 Geavanceerde Configuratie

### Contactpersonen Aanpassen

Standaard worden Stephan en Mustafa getoond. Om dit aan te passen:

1. Scroll in de settings page naar **"Contactpersonen (JSON)"**
2. Voeg custom JSON toe:

```json
[
  {
    "name": "Stephan van Opbergen",
    "role": "Mede-eigenaar en Verkoop / Administratie",
    "email": "stephan@vsgdakwerken.nl",
    "phone": "+31 6 51664731",
    "linkedin": "https://www.linkedin.com/in/stephan-van-opbergen/"
  },
  {
    "name": "Mustafa Guner",
    "role": "Mede-eigenaar en Project Leider",
    "email": "mustafa@vsgdakwerken.nl",
    "phone": "+31 6 34064773",
    "linkedin": ""
  },
  {
    "name": "Nieuwe Persoon",
    "role": "Marketing Manager",
    "email": "marketing@vsgdakwerken.nl",
    "phone": "+31 6 87654321",
    "linkedin": ""
  }
]
```

3. Klik "Opslaan"

### Openingstijden Toevoegen

Momenteel staat het op "24 uur geopend". Om dit aan te passen, voeg JSON toe in de backend (toekomstige functionaliteit).

---

## 🐛 Troubleshooting

### ❌ Endpoint geeft 404

**Probleem**: `http://levy-racing-backend.local/wp-json/levy/v1/business-info` geeft een 404 error.

**Oplossing**:
1. Ga naar WordPress admin
2. Ga naar **Settings** → **Permalinks**
3. Klik op **Save Changes** (ook al verander je niks)
4. Dit "flusht" de permalink cache
5. Test de endpoint opnieuw

### ❌ CORS Errors in Console

**Probleem**: Browser console toont CORS policy errors.

**Oplossing**: De plugin heeft al CORS headers ingebouwd, maar als het nog steeds niet werkt:

1. Voeg toe aan `wp-config.php`:
```php
define('WP_ALLOW_REPAIR', true);
header('Access-Control-Allow-Origin: *');
```

2. Of gebruik een CORS plugin zoals "WP CORS"

### ❌ Data komt niet door naar Next.js

**Probleem**: Frontend toont nog steeds oude data.

**Mogelijke oorzaken**:
1. **Next.js cache**: Herstart de Next.js dev server
2. **Browser cache**: Hard refresh (Cmd+Shift+R op Mac, Ctrl+Shift+R op Windows)
3. **WordPress endpoint werkt niet**: Test de endpoint direct in je browser
4. **Verkeerde API URL**: Check `.env.local` in Next.js project

---

## 📝 Plugin Features

✅ **REST API Endpoint**: `/wp-json/levy/v1/business-info`
✅ **Admin Settings Page**: Makkelijk bewerken via WordPress admin
✅ **Default Data**: VSG Dakwerken gegevens pre-filled
✅ **CORS Support**: Cross-origin requests toegestaan
✅ **JSON Configuration**: Geavanceerde opties voor contacten
✅ **Auto-cache**: Next.js cached de data voor 1 uur

---

## 🔄 Updates

De plugin data wordt automatisch gesynchroniseerd met de Next.js frontend:
- **Cache tijd**: 1 uur (3600 seconden)
- **Update**: Wijzigingen in WordPress zijn binnen 1 uur zichtbaar op de site
- **Force refresh**: Herstart Next.js server voor directe update

---

## 🗑️ Deïnstallatie

Om de plugin te verwijderen:

1. **Deactiveer** de plugin in WordPress
2. **Delete** de plugin
3. ⚠️ **Let op**: Dit verwijdert NIET je instellingen
4. Om instellingen ook te verwijderen, voeg toe aan `wp-config.php`:
   ```php
   define('WP_UNINSTALL_PLUGIN', true);
   ```

---

## 📞 Support

**Werkt iets niet?**
1. Check de troubleshooting sectie hierboven
2. Test de REST endpoint direct in je browser
3. Check WordPress error logs: `/wp-content/debug.log`
4. Check Next.js console output

**Vragen over configuratie?**
- Zie: `WORDPRESS_BUSINESS_INFO_SETUP.md` voor ACF setup
- Zie: `VSG_TALENT_REBRANDING.md` voor complete overview

---

## ✅ Checklist

Na installatie:
- [ ] Plugin geüpload en geactiveerd
- [ ] Settings page geopend en gegevens ingevuld
- [ ] REST endpoint getest (JSON zichtbaar)
- [ ] Next.js frontend checked (footer toont VSG data)
- [ ] Contactgegevens correct (telefoon, email, adres)
- [ ] Social media links werken

**Als alles groen is: je bent klaar! 🎉**
