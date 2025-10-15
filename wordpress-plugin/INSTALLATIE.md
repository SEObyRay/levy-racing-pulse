# 🚀 WordPress Plugin Installatie

## Stap 1: ZIP Bestand Maken

Open Terminal en voer uit:

```bash
cd "/Users/raygritter/Coding/Levy Opbergen/levy-racing-pulse/wordpress-plugin"
zip -r levy-racing-setup.zip levy-racing-setup/
```

Dit maakt een `levy-racing-setup.zip` bestand aan.

## Stap 2: Plugin Uploaden in WordPress

1. Open je WordPress admin: `http://levy-racing-backend.local/wp-admin`
2. Ga naar **Plugins → Nieuwe plugin toevoegen**
3. Klik op **Plugin uploaden** (bovenaan de pagina)
4. Klik op **Bestand kiezen**
5. Selecteer `levy-racing-setup.zip`
6. Klik op **Nu installeren**
7. Wacht tot installatie compleet is
8. Klik op **Plugin activeren**

## Stap 3: Controleer Activatie

Je zou nu moeten zien:
- ✅ Nieuw menu item **"Levy Racing"** in de sidebar
- ✅ Nieuw menu item **"Evenementen"** in de sidebar
- ✅ Onder **Berichten** zie je nu **Competities** en **Seizoenen**

## Stap 4: Application Password Aanmaken

1. Ga naar **Gebruikers → Profiel**
2. Scroll naar beneden naar **"Application Passwords"**
3. Vul in: `Levy Racing App`
4. Klik op **Add New Application Password**
5. **BELANGRIJK:** Kopieer het gegenereerde wachtwoord
6. Bewaar dit - je hebt het nodig voor de React app!

## Stap 5: Test Data Toevoegen (Optioneel)

### Competities
- Ga naar **Berichten → Competities → Nieuwe competitie**
- Voeg toe: Rotax Max Challenge, IAME X30 Challenge, ONK Karting

### Seizoenen
- Ga naar **Berichten → Seizoenen → Nieuw seizoen**
- Voeg toe: 2024, 2025

### Test Evenement
- Ga naar **Evenementen → Nieuwe toevoegen**
- Vul alle velden in
- Publiceer

## ✅ Klaar!

Je WordPress backend is nu klaar voor de React app integratie.
