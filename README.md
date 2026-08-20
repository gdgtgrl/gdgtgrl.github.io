# GDGTGRL Interactive Projects

This repository collects standalone interactive guides, research explainers, professional audit/security tools, and personal utilities. The main landing page is [`index.html`](index.html), which provides a visual directory of the browser-ready projects plus links to supporting source and data files.

## Interactive Projects

| File | Project | Description |
|---|---|---|
| [`air_traveler_rights.html`](air_traveler_rights.html) | Air Traveler Rights & Advocacy Tool | Practical guidance on airline passenger rights, responsibilities, complaints, and traveler advocacy. |
| [`black_american_identity.html`](black_american_identity.html) | Black American Origins, Identity, and Evidence | Evidence-focused exploration of Black American origins and alternative identity claims using history, genomics, and archaeology. |
| [`cyber_security_awareness_2026.html`](cyber_security_awareness_2026.html) | Cyber Security Awareness 2026: Fundamentals & AI Lab | Interactive security-awareness material covering modern cyber threats, defensive practices, and AI-related issues. |
| [`digital_footprint_infographic.html`](digital_footprint_infographic.html) | Digital Footprint Tracking: A Primer | Primer on online and device-generated data trails, with investigative and privacy considerations. |
| [`dmv_theater_season.html`](dmv_theater_season.html) | 2026–2027 Regional Theatre Season Briefing & Interactive Guide | Interactive theatre-season briefing for Washington, D.C., Maryland, and Northern Virginia. |
| [`federal_is_audit_guide.html`](federal_is_audit_guide.html) | Federal Audit Intelligence Platform | Federal IT audit reference incorporating FISCAM, FISMA, NIST SP 800-53, compliance analysis, and threat information. |
| [`lives_lost.html`](lives_lost.html) | Lives Lost, Movements Born | Interactive remembrance of high-profile tragedies and related movements for social change. |
| [`master_grocery_list_app.html`](master_grocery_list_app.html) | Master Grocery List App | Browser-based grocery planning utility built around a categorized master inventory. |
| [`nfr_assistant.html`](nfr_assistant.html) | NFR Studio — Notice of Findings & Recommendations Assistant | Audit-writing utility for organizing and drafting Notices of Findings & Recommendations. |

## Supporting Files

| File | Type | Purpose |
|---|---|---|
| [`master_grocery_list.csv`](master_grocery_list.csv) | CSV | Grocery inventory data organized by item, storage location, category, and meal-planning field. |
| [`nist_sp_800_53_rev_5_explorer_infographic (3).tsx`](nist_sp_800_53_rev_5_explorer_infographic%20%283%29.tsx) | React / TypeScript | Source for a NIST SP 800-53 Rev. 5 control explorer containing control-family information and FISCAM mappings. |
| [`manifest.json`](manifest.json) | JSON | Web-app manifest metadata currently configured for the Remembrance Registry. |
| [`index.html`](index.html) | HTML | Repository landing page and project directory. |
| [`README.md`](README.md) | Markdown | This repository guide. |

## Viewing the Site

### GitHub Pages

When GitHub Pages is configured to publish from the repository root, `index.html` serves as the homepage automatically. All project links are relative, so the collection can remain in the same directory without hard-coded domain paths.

### Locally

For a simple preview, open `index.html` directly in a web browser. For more consistent browser behavior, run a small local web server from the repository directory:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

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
├── lives_lost.html
├── master_grocery_list_app.html
├── nfr_assistant.html
├── master_grocery_list.csv
├── nist_sp_800_53_rev_5_explorer_infographic (3).tsx
└── manifest.json
```

## Notes

- The nine `.html` project files can be opened directly from the landing page.
- `master_grocery_list.csv` is a data file rather than a standalone webpage.
- The `.tsx` file is React/TypeScript source and requires a React build environment before it can run as a webpage.
- `manifest.json` contains progressive-web-app metadata; its current name and settings are specific to the remembrance project rather than the entire repository.
- When adding, renaming, or removing files, update both `index.html` and this README so the directory remains accurate.
