# Vesli website

The website of **Vesli**, a small web design business run by Wessel and Elise. Vesli builds websites for local businesses in the Drechtsteden area, such as hair salons, cafés and lunchrooms.

This project was made for the **End of Block Challenge** of the Applied Data Science & AI programme at Breda University of Applied Sciences (BUas). The challenge had one week. The goal was a working, responsive website that we can keep using and improving for our business afterwards. It was not required to be fully finished, so this README lists clearly what is done and what is still open.

---

## Contents

- [Vesli website](#vesli-website)
  - [Contents](#contents)
  - [What's included](#whats-included)
    - [Pages](#pages)
    - [Home page features](#home-page-features)
    - [General](#general)
  - [What's still missing](#whats-still-missing)
  - [Tech stack](#tech-stack)
  - [Run it locally](#run-it-locally)
    - [Troubleshooting](#troubleshooting)
    - [Viewing the mobile version](#viewing-the-mobile-version)
  - [Project structure](#project-structure)
  - [Editing content](#editing-content)
    - [Team (Over ons)](#team-over-ons)
    - [Services](#services)
    - [Portfolio projects](#portfolio-projects)
    - [Other text](#other-text)
    - [Contact email](#contact-email)
  - [Deploying to Render](#deploying-to-render)
  - [Design](#design)
  - [Credits](#credits)

---

## What's included

### Pages

| Page | URL | Status |
|---|---|---|
| Home | `/` | Done |
| Diensten (Services) | `/diensten` | Done, content loaded from `data/services.json` |
| Portfolio | `/portfolio` | Done, content loaded from `data/portfolio.json` (concept projects for now) |
| Over ons (About us) | `/over-ons` | Done, team loaded from `data/team.json`, with photos |
| Contact | `/contact` | Placeholder page with email link, form not built yet |
| Privacyverklaring | `/privacy` | Placeholder page |
| 404 page | any unknown URL | Done |

### Home page features

- **Animated hero:** a 3D wave of dots drawn on a canvas, which pauses when it scrolls out of view.
- **Showcase:** a laptop and a phone showing three example client websites (kapper, café, lunchroom), each with its own design. The examples switch automatically every 6 seconds, with a progress bar, and stop switching once a visitor picks one.
- **"Gemaakt voor jouw soort zaak":** tabs per business type, each with a working interactive demo:
  - Kapper: pick a treatment and a time, then confirm an appointment.
  - Café: switch between menu categories.
  - Lunchroom: add or remove items and see the total update.

  The demos run in the browser only. Nothing is sent or stored.
- **Tools marquee:** a scrolling strip of the tools we build with.
- **Services cards**, a **process timeline** that fills in while scrolling, a **numbered project index**, a **FAQ** that folds open, and a **call to action**.

### General

- **Responsive and mobile-first:** tested at 360 px, 768 px and 1440 px wide, without horizontal scrolling.
- **Shared layout:** one base template with a glass navigation bar, a mobile menu and a footer, used by every page.
- **Content in data files:** services, portfolio projects and team members are JSON files, so adding a project means adding one entry, not writing HTML.
- **Accessibility basics:** skip link, keyboard-friendly tabs (arrow keys), visible focus styles, alt texts on photos, and all animations switched off for visitors who set "reduce motion" on their device.
- **Self-hosted fonts:** Unbounded and Schibsted Grotesk are served from our own server instead of Google Fonts, which is friendlier for privacy (AVG/GDPR).
- **Visitor text in Dutch:** our clients are Dutch local businesses. Code and documentation are in English.

---

## What's still missing

In order of priority:

1. **Contact form.** The Contact page only shows an email link. Still to build: a form (name, email, business name, message), validation with Dutch error messages, spam protection (honeypot) and sending the enquiry by email through SMTP, with the login stored in environment variables.
2. **Privacy statement.** The page exists but needs the real text: what the contact form collects, why, how long we keep it and how to ask for removal. Needed before the form goes live.
3. **Real contact email.** `CONTACT_EMAIL` at the top of `app.py` is still the placeholder `info@vesli.nl`.
4. **Real portfolio projects.** The portfolio shows concept projects without business names. Next step: screenshots of real work, and only naming businesses once they agree.
5. **Copy check.** Some texts make promises we should confirm, for example that we visit clients in person.
6. **Deployment and domain.** Deploy to Render, then connect our own domain.
7. **Extras.** Favicon, a share image for WhatsApp and social media, and a paid Render plan before we send clients to the site (the free plan sleeps after 15 minutes without visitors and then takes about a minute to wake up).

---

## Tech stack

- **Backend:** Python 3.12 with [Flask](https://flask.palletsprojects.com/) (routing, Jinja templates, JSON data loading)
- **Frontend:** HTML, CSS and vanilla JavaScript, with no frameworks or build step
- **Production server:** Gunicorn
- **Hosting:** [Render](https://render.com)
- **Design:** Figma
- **Version control:** Git and GitHub

---

## Run it locally

You need [Python 3.12](https://www.python.org/downloads/) or newer. On Windows, tick "Add Python to PATH" during installation.

**1. Get the code**

```bash
git clone <repository-url>
cd vesli
```

**2. Create a virtual environment and install the packages** (one time only)

Windows (PowerShell):

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

macOS / Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

**3. Start the website**

```bash
python app.py
```

Open http://127.0.0.1:5000 in your browser. Press `Ctrl + C` in the terminal to stop it.

Next time, you only need to activate the environment and run `python app.py`.

### Troubleshooting

- **"running scripts is disabled on this system"** (Windows): run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once, or skip activation and use `.venv\Scripts\python app.py`.
- **"Could not open requirements file"**: the terminal is in the wrong folder. Use `cd` to go to the folder that contains `app.py`.
- **A change doesn't show up:** refresh with `Ctrl + F5`.

### Viewing the mobile version

- **In the browser:** press `F12`, then `Ctrl + Shift + M`, and pick a phone from the device list.
- **On a real phone (same Wi-Fi):** start the site with `flask --app app run --host=0.0.0.0`, find your computer's IP address with `ipconfig` (Windows) or `ifconfig` (macOS), and open `http://<your-ip>:5000` on your phone.

---

## Project structure

```
vesli/
├── app.py                  Flask app: one route per page, loads the JSON data
├── requirements.txt        Python packages (flask, gunicorn)
├── .python-version         Python version for Render
├── DESIGN.md               Style guide: colours, fonts, spacing, components
├── data/
│   ├── services.json       Services shown on Home and Diensten
│   ├── portfolio.json      Projects shown on Home and Portfolio
│   └── team.json           Team members shown on Over ons
├── templates/
│   ├── base.html           Shared layout: head, navigation, footer
│   ├── _macros.html        The three example client websites in the showcase
│   ├── _page_intro.html    Page header used on every page except Home
│   ├── _project_index.html Numbered project list
│   ├── index.html          Home
│   ├── diensten.html       Services
│   ├── portfolio.html      Portfolio
│   ├── over-ons.html       About us
│   ├── contact.html        Contact
│   ├── privacy.html        Privacy statement
│   └── 404.html            Page not found
└── static/
    ├── css/style.css       All styles; design tokens as CSS variables at the top
    ├── js/main.js          Menu, tabs, demos, scroll effects, hero animation
    ├── fonts/              Unbounded and Schibsted Grotesk (+ licences)
    └── img/                Photos (wessel.jpg, elise.jpg)
```

---

## Editing content

You don't need to restart the site for content changes: save the file and refresh the browser.

### Team (Over ons)

Edit `data/team.json`. Each person has a `name`, `role`, `bio` and `photo`.

```json
{
  "name": "Wessel",
  "role": "Mede-oprichter",
  "bio": "Wessel studeert Applied Data Science & AI aan ...",
  "photo": "img/wessel.jpg"
}
```

Keep the quotes and commas. To use a `"` inside the text, write `\"`.

**Photos:** put a square image (around 480 × 480 px) in `static/img/` with the file name from `photo`. If the file is missing, the card shows the person's initial instead.

### Services

Edit `data/services.json`. Each service has a `title`, `summary`, a list of `includes` and a `price`.

### Portfolio projects

Add an entry to `data/portfolio.json`:

```json
{
  "title": "Website voor Kapsalon X",
  "client_type": "Kapper",
  "description": "Wat we hebben gebouwd.",
  "image": "",
  "url": "https://example.nl",
  "concept": false
}
```

Set `"concept": true` to show a "Concept" label. If `url` is filled in, the title links to the live site.

### Other text

Page text lives in the templates in `templates/`. Only change the text between the HTML tags. The text at the top of each page is in the `intro_title` and `intro_lead` values on the `{% with %}` line.

### Contact email

Change `CONTACT_EMAIL` at the top of `app.py`. It is used in the footer, the Contact page and the call to action.

---

## Deploying to Render

1. Push the code to GitHub.
2. In [Render](https://render.com), choose **New → Web Service** and connect the repository.
3. Settings:
   - **Build command:** `pip install -r requirements.txt`
   - **Start command:** `gunicorn app:app`
   - **Instance type:** Free (for now)
4. Every push to the `main` branch deploys automatically.

When the contact form is added, its email login goes in Render under **Environment** as environment variables, never in the code.

---

## Design

The site uses a dark "tech" theme with a mint accent. All colours, fonts and spacing values are CSS variables at the top of `static/css/style.css`, with the same names as in Figma. See [`DESIGN.md`](DESIGN.md) for the full style guide.

The three example client websites in the showcase each have their own style, to show that every business gets a design that fits them:

- **Kapper:** elegant, serif font, blush colours
- **Café:** dark and warm, bold capitals
- **Lunchroom:** fresh green, rounded product cards

---

## Credits

Made by **Wessel** and **Elise**, Applied Data Science & AI students at Breda University of Applied Sciences.

Fonts: [Unbounded](https://github.com/googlefonts/unbounded) and [Schibsted Grotesk](https://github.com/schibsted/schibsted-grotesk), both under the SIL Open Font License. The licence files are in `static/fonts/`.
