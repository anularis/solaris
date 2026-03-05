# Scholar Portfolio — Setup & Customisation Guide

A minimal, sophisticated academic portfolio with heavy gold accents,
animated hero canvas, and a fully searchable interface.

---

## Folder Structure

```
portfolio/
├── index.html              ← Home page
├── css/
│   ├── style.css           ← Design system & all components
│   └── animations.css      ← Hero canvas + page transitions
├── js/
│   ├── components.js       ← Shared navbar, footer, search overlay
│   └── main.js             ← Nav scroll, search logic, canvas, reveal
├── research/
│   └── index.html          ← Filterable research grid
├── writing/
│   └── index.html          ← Essays & long-form writing
├── media/
│   └── index.html          ← Lectures, interviews, appearances
├── about/
│   └── index.html          ← Full bio, timeline, intellectual motifs
└── contact/
    └── index.html          ← Contact form + direct links
```

---

## Hosting on GitHub Pages

1. Create a new GitHub repository (e.g. `your-username.github.io`)
2. Push this entire `portfolio/` folder contents to the `main` branch root
3. Go to Settings → Pages → Source: `main` / `/ (root)`
4. Your site will be live at `https://your-username.github.io`

---

## Personalisation Checklist

Search for `[` in any file to find all placeholder tokens:

| Token | Replace with |
|---|---|
| `[Scholar Name]` | Full name |
| `[Location]` | City, Country |
| `[Languages]` | e.g. English, French, Arabic |
| `[Year]` | Actual years |
| `[Degree · Institution]` | e.g. MA Egyptology · Oxford |
| `[Lecture Title Placeholder]` | Real lecture titles |
| `[Podcast / Show Title]` | Real media appearances |
| `email@example.com` | Real email |
| `[LinkedIn Handle]` | LinkedIn URL |

---

## Adding New Research Papers

Open `research/index.html` and duplicate any `.research-item` block:

```html
<div class="research-item reveal" data-tags="egyptology history">
  <div style="display:flex;gap:32px;padding:28px;border:1px solid var(--ash);border-top:none;...">
    <div style="min-width:40px"><span>2025</span></div>
    <div style="flex:1">
      <div><!-- tag pills --></div>
      <h3>Title</h3>
      <p>Abstract...</p>
      <div><!-- status badge + link --></div>
    </div>
  </div>
</div>
```

**Filter tags** — must match one of: `egyptology` `psychology` `ir` `history` `policy` `philosophy`  
Add new filter categories by duplicating a `<button class="tag" data-filter="...">` in the filter bar.

---

## Adding New Writing

Open `writing/index.html` and duplicate any `.card` block.

---

## Adding Media Appearances

Open `media/index.html` and duplicate any lecture row or interview card.

---

## Updating Search Index

Open `js/main.js` and add to the `SEARCH_INDEX` array at the top:

```js
{ type: 'Research', title: 'Your New Paper Title', href: '../research/index.html' },
{ type: 'Writing',  title: 'Your New Essay',        href: '../writing/index.html' },
```

---

## Updating Navigation / Footer

All nav and footer HTML lives in `js/components.js`.  
Edit once — updates across all pages automatically.

To change the scholar name in the nav logo and footer, search `[Scholar Portfolio]` and `[Scholar Name]` in `components.js`.

---

## Wiring Up the Contact Form

The contact form in `contact/index.html` currently opens a `mailto:` link.
To use a real backend, replace the `submitContactForm()` function body with:

**Formspree** (free, no backend needed):
```js
const res = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, subject, message })
});
```

---

## Design Tokens (CSS Variables)

All colours and settings are in `css/style.css` at the top under `:root {}`.
Primary accent: `--gold: #E8C84A`. Change this to update the whole palette.

---

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge).  
No build tools required — pure HTML/CSS/JS, zero dependencies.
