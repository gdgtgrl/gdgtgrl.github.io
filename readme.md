# GDGTGRL Interactive Projects

This repository is a collection of standalone interactive HTML guides, research explainers, dashboards, and educational tools. The main landing page is [`index.html`](index.html), which provides a visual index and direct link to every project.

## Projects

| File | Project | Description |
|---|---|---|
| [`air_traveler_rights.html`](air_traveler_rights.html) | Air Traveler Rights & Advocacy Tool | A guide to airline passenger rights, responsibilities, complaint options, and practical advocacy. |
| [`black_american_identity.html`](black_american_identity.html) | Black American Origins, Identity, and Evidence | An evidence-focused examination of alternative Black identity movements through history, genomics, and archaeology. |
| [`cyber_security_awareness_2026.html`](cyber_security_awareness_2026.html) | Cyber Security Awareness 2026 | An interactive fundamentals resource and AI lab covering real-world threats, defensive practices, and security guidance. |
| [`digital_footprint_infographic.html`](digital_footprint_infographic.html) | Digital Footprint Tracking: A Primer | A practical introduction for private investigators navigating online and device-generated data trails. |
| [`dmv_theater_season.html`](dmv_theater_season.html) | 2026–2027 DMV Regional Theatre Season | An interactive briefing and production schedule for theatres in Washington, D.C., Maryland, and Northern Virginia. |
| [`federal_is_audit_guide.html`](federal_is_audit_guide.html) | Federal Audit Intelligence Platform | A reference integrating FISCAM, FISMA, NIST SP 800-53, compliance analysis, and threat visualization. |
| [`lives_lost.html`](lives_lost.html) | Lives Lost, Movements Born | An interactive remembrance documenting high-profile tragedies from 2009–2023 and related movements for change. |

## Viewing the Site

### GitHub Pages

When this repository is published with GitHub Pages, `index.html` serves as the homepage automatically.

### Locally

For a quick preview, open `index.html` in a web browser. Because some browser features work better through a local web server, you can also run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## Repository Structure

```text
.
├── index.html
├── README.md
├── air_traveler_rights.html
├── black_american_identity.html
├── cyber_security_awareness_2026.html
├── digital_footprint_infographic.html
├── dmv_theater_season.html
├── federal_is_audit_guide.html
└── lives_lost.html
```

## Notes

- Each project is contained in a standalone HTML file.
- Project links use relative paths, so the collection can be hosted from the repository root.
- The landing page is responsive and supports reduced-motion accessibility preferences.
- Rename or remove a project file only after updating its corresponding link in `index.html` and entry in this README.

