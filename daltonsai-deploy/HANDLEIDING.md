# Daltons AI — Deployment Handleiding
## daltonsai.com via Vercel

---

## WAT ZIT IN DEZE FOLDER

| Bestand | Beschrijving |
|---|---|
| `index.html` | Het volledige Daltons AI platform (landing + admin + client) |
| `vercel.json` | Vercel deployment configuratie |

---

## STAP 1 — GitHub Repository Aanmaken

1. Ga naar **github.com** → Log in (of maak gratis account)
2. Klik op de groene **"New"** knop (linksboven)
3. Repository naam: `daltonsai`
4. Zet op **Private** (jouw code blijft privé)
5. Klik **"Create repository"**
6. Klik op **"uploading an existing file"**
7. Sleep BEIDE bestanden erin: `index.html` + `vercel.json`
8. Klik **"Commit changes"**

---

## STAP 2 — Vercel Account & Deploy

1. Ga naar **vercel.com** → Klik **"Sign Up"**
2. Kies **"Continue with GitHub"** (zelfde account)
3. Klik **"Add New Project"**
4. Kies jouw repository **"daltonsai"**
5. Alles laten staan zoals het is → Klik **"Deploy"**
6. Na ~30 seconden: ✅ Live op `daltonsai.vercel.app`

---

## STAP 3 — Eigen Domein daltonsai.com Koppelen

### In Vercel:
1. Ga naar jouw project → **Settings** → **Domains**
2. Typ: `daltonsai.com` → Klik **"Add"**
3. Vercel toont je 2 DNS-waarden (kopieer deze):
   - **A Record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com`

### Bij jouw domeinregistrar (waar je daltonsai.com hebt gekocht):
*(Dit is Namecheap, GoDaddy, TransIP, SIDN, of vergelijkbaar)*

1. Log in op jouw registrar
2. Ga naar **DNS Settings** / **DNS Beheer** van `daltonsai.com`
3. Verwijder eventuele oude A records
4. Voeg toe:
   ```
   Type: A
   Naam/Host: @
   Waarde: 76.76.21.21
   TTL: Automatisch
   ```
5. Voeg toe:
   ```
   Type: CNAME
   Naam/Host: www
   Waarde: cname.vercel-dns.com
   TTL: Automatisch
   ```
6. Opslaan

### Wachten:
- DNS verspreidt zich in **5 minuten tot 48 uur** (meestal binnen 30 min)
- Vercel geeft automatisch een **gratis SSL certificaat** (https://)

---

## STAP 4 — API Key Instellen

Zodra de site live is op daltonsai.com:

1. Ga naar **daltonsai.com** → Klik **"Admin Panel"**
2. Klik op **⚙ API Key** (rechtsboven)
3. Voer je Anthropic API key in: `sk-ant-api03-...`
4. Alle 13 AI agents zijn nu live ✅

---

## UPDATES DOORVOEREN (later)

Wanneer je het platform wilt updaten:
1. Ga naar jouw GitHub repository
2. Klik op `index.html` → **Edit** (potlood icoon)
3. Vervang de inhoud → **Commit**
4. Vercel deployt automatisch binnen 30 seconden ✅

---

## HULP NODIG?

- Vercel documentatie: docs.vercel.com
- GitHub uploaden: docs.github.com
- DNS problemen? Gebruik dnschecker.org om te controleren

**KVK: 97688835 | Daltons AI B.V.**
