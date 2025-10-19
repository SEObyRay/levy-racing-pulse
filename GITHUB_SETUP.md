# GitHub Multi-Account Setup

## Probleem
Je hebt twee GitHub accounts:
- `SEObyRay` (voor dit project)
- `socialscalinainc-design` (voor andere projecten)

macOS Keychain slaat maar één credential op per domein, waardoor je steeds moet switchen.

## Oplossing: SSH Keys per Account

### Stap 1: SSH Keys aanmaken (als je die nog niet hebt)

```bash
# SSH key voor SEObyRay
ssh-keygen -t ed25519 -C "ray@seobyray.com" -f ~/.ssh/id_ed25519_seobyray

# SSH key voor socialscalinainc-design
ssh-keygen -t ed25519 -C "design@socialscalina.com" -f ~/.ssh/id_ed25519_socialscalina
```

### Stap 2: SSH Keys toevoegen aan GitHub

**Voor SEObyRay:**
1. Kopieer public key: `cat ~/.ssh/id_ed25519_seobyray.pub`
2. Ga naar https://github.com/settings/keys
3. Klik "New SSH key"
4. Plak de key en save

**Voor socialscalinainc-design:**
1. Log uit en in met andere account
2. Kopieer public key: `cat ~/.ssh/id_ed25519_socialscalina.pub`
3. Ga naar https://github.com/settings/keys
4. Klik "New SSH key"
5. Plak de key en save

### Stap 3: SSH Config maken

Maak/edit `~/.ssh/config`:

```
# SEObyRay account
Host github-seobyray
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_seobyray
  IdentitiesOnly yes

# socialscalinainc-design account
Host github-socialscalina
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_socialscalina
  IdentitiesOnly yes
```

### Stap 4: Remote URL aanpassen per project

**Voor dit project (SEObyRay):**
```bash
git remote set-url origin git@github-seobyray:SEObyRay/levy-racing-pulse.git
```

**Voor socialscalina projecten:**
```bash
git remote set-url origin git@github-socialscalina:socialscalinainc-design/PROJECT_NAME.git
```

### Stap 5: Git config per project

**In dit project:**
```bash
git config user.name "Ray Gritter"
git config user.email "ray@seobyray.com"
```

**In socialscalina projecten:**
```bash
git config user.name "Social Scalina Design"
git config user.email "design@socialscalina.com"
```

## Voordelen
- ✅ Geen credential conflicts meer
- ✅ Automatisch juiste account per project
- ✅ Geen handmatig switchen nodig
- ✅ Werkt voor push/pull/clone

## Test
```bash
# Test SEObyRay connectie
ssh -T git@github-seobyray

# Test socialscalina connectie
ssh -T git@github-socialscalina
```

Beide moeten "Hi USERNAME! You've successfully authenticated" tonen.
