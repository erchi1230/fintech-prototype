# Maybern Design System (MVDS)

> **Purpose**: A minimum-viable design system for building data-rich, information-dense fintech UIs for private equity fund management platforms.
> **Stack**: Tailwind CSS v4 + CSS Custom Properties.
> **Architecture**: Three-tier token model inspired by IBM Carbon Design System.

---

## Quick Start

```css
/* In your app's main CSS file: */
@import "@maybern/design-system/src/index.css";
```

All Tailwind utilities, semantic color classes, and component classes become available.

---

## Token Architecture

```
┌─────────────────────────────────────────────────┐
│  TIER 1: PRIMITIVES  (src/tokens/primitives.css)│
│  Raw values. NO semantic meaning.               │
│  e.g. --green-400: #266044                      │
│  ⚠️  NEVER use directly in components.          │
├─────────────────────────────────────────────────┤
│  TIER 2: SEMANTIC   (src/tokens/semantic.css)   │
│  Role-based aliases.                            │
│  e.g. --interactive: var(--green-400)           │
│  ✅  Use in layouts and general styling.        │
├─────────────────────────────────────────────────┤
│  TIER 3: COMPONENT  (src/tokens/semantic.css)   │
│  Scoped to specific components.                 │
│  e.g. --button-primary-bg: var(--interactive)   │
│  ✅  Use when building/customizing components.  │
└─────────────────────────────────────────────────┘
```

### Rules for Token Usage
1. **Components** must use Tier 3 tokens (or Tier 2 for layout).
2. **Layouts** use Tier 2 semantic tokens.
3. **Tier 1 primitives** are escape-hatches only — never in production components.
4. If a semantic token doesn't exist for your use case, define one in `semantic.css` first.

---

## Color System

### Semantic Background Colors
| Tailwind Class          | Token             | Value         | Use When                                |
|-------------------------|-------------------|---------------|------------------------------------------|
| `bg-bg`                 | `--bg`            | `#f9fcfa`     | Page canvas / root background            |
| `bg-bg-layer-01`        | `--bg-layer-01`   | `#ffffff`     | Cards, panels ON the page                |
| `bg-bg-layer-02`        | `--bg-layer-02`   | `#f9fafb`     | Nested surfaces ON layer-01              |
| `bg-bg-layer-03`        | `--bg-layer-03`   | `#f2f4f7`     | Deeply nested elements                   |
| `bg-bg-inverse`         | `--bg-inverse`    | `#101828`     | Dark backgrounds                         |
| `bg-bg-brand`           | `--bg-brand`      | `#08331f`     | Hero sections, brand headers             |
| `bg-bg-brand-light`     | `--bg-brand-light` | `#defaeb`    | Light brand highlights                   |
| `bg-bg-brand-subtle`    | `--bg-brand-subtle`| `#d8f3e7`    | Subtle brand tinted areas                |
| `bg-bg-hover`           | `--bg-hover`      | `rgba(…,0.04)`| Hover state on any surface               |
| `bg-bg-active`          | `--bg-active`     | `rgba(…,0.08)`| Active/pressed state                     |
| `bg-bg-selected`        | `--bg-selected`   | `#defaeb`     | Selected rows, items                     |
| `bg-bg-disabled`        | `--bg-disabled`   | `#f2f4f7`     | Disabled input backgrounds               |

### Layer Model (Critical for data-dense UIs)
```
Page background (--bg) → Card (--bg-layer-01) → Nested panel (--bg-layer-02) → Inner element (--bg-layer-03)
```
Each nested surface increments the layer. This creates visual hierarchy without needing borders or shadows.

### Semantic Text Colors
| Tailwind Class          | Token              | Hex       | Use When                         |
|-------------------------|--------------------|-----------|-----------------------------------|
| `text-text-primary`     | `--text-primary`   | `#101828` | Headings, body text, primary data |
| `text-text-secondary`   | `--text-secondary` | `#475467` | Supporting text, descriptions     |
| `text-text-tertiary`    | `--text-tertiary`  | `#667085` | Muted text, metadata, timestamps  |
| `text-text-placeholder` | `--text-placeholder`| `#98a2b3`| Input placeholders                |
| `text-text-disabled`    | `--text-disabled`  | `#d0d5dd` | Disabled elements                 |
| `text-text-inverse`     | `--text-inverse`   | `#ffffff` | Text on dark backgrounds          |
| `text-text-on-color`    | `--text-on-color`  | `#ffffff` | Text on colored backgrounds       |
| `text-text-brand`       | `--text-brand`     | `#266044` | Brand-colored text                |
| `text-text-error`       | `--text-error`     | `#d92d20` | Error messages, validation        |
| `text-text-link`        | `--text-link`      | `#1570ef` | Hyperlinks                        |

### Semantic Border Colors
| Tailwind Class             | Token                | Hex       | Use When                      |
|----------------------------|----------------------|-----------|--------------------------------|
| `border-border-subtle`     | `--border-subtle`    | `#e5e7eb` | Card borders, dividers         |
| `border-border-strong`     | `--border-strong`    | `#d0d5dd` | Input borders, table lines     |
| `border-border-interactive`| `--border-interactive`| `#266044`| Focus borders, active states   |
| `border-border-error`      | `--border-error`     | `#f04438` | Error state borders            |
| `border-border-disabled`   | `--border-disabled`  | `#e5e7eb` | Disabled element borders       |

### Interactive Colors
| Tailwind Class             | Token                    | Hex       | Use When                   |
|----------------------------|--------------------------|-----------|------------------------------|
| `bg-interactive`           | `--interactive`          | `#266044` | Primary buttons, actions     |
| `bg-interactive-hover`     | `--interactive-hover`    | `#1e4734` | Hover on primary actions     |
| `bg-interactive-active`    | `--interactive-active`   | `#08331f` | Active/pressed primary       |
| `bg-interactive-secondary` | `--interactive-secondary`| `#b4e2cc` | Secondary action bg          |

### Support / Status Colors
| Status    | Main       | Light BG   | Dark       |
|-----------|------------|------------|------------|
| Error     | `#f04438`  | `#fef3f2`  | `#b42318`  |
| Warning   | `#f79009`  | `#fffcf5`  | `#b54708`  |
| Success   | `#15b79e`  | `#f0fdf9`  | `#107569`  |
| Info      | `#2e90fa`  | `#eff8ff`  | `#175cd3`  |

Tailwind: `bg-support-error`, `bg-support-error-light`, `text-support-success`, etc.

### Data Visualization Colors
| Token       | Color     | Series         |
|-------------|-----------|----------------|
| `--data-01` | `#44936d` | Primary        |
| `--data-02` | `#2e90fa` | Secondary      |
| `--data-03` | `#fdb022` | Tertiary       |
| `--data-04` | `#2ed3b7` | Quaternary     |
| `--data-05` | `#f97066` | Quinary        |
| `--data-06` | `#98a2b3` | Neutral        |

---

## Typography

### Font Stack
| Token                 | Family                  | Use When                           |
|-----------------------|-------------------------|------------------------------------|
| `font-serif`          | Signifier Regular       | Display headings, hero text        |
| `font-serif-medium`   | Signifier Medium        | Sub-headings, emphasis headings    |
| `font-sans`           | Inter                   | Body text, UI elements, data       |
| `font-mono`           | JetBrains Mono          | Code, raw data values              |

### Type Tokens (CSS Classes)
| Class              | Size  | Weight | Family        | Use When                          |
|--------------------|-------|--------|---------------|--------------------------------------|
| `type-display-01`  | 68px  | 400    | Serif         | Hero marketing headlines             |
| `type-display-02`  | 56px  | 400    | Serif         | Large section headlines              |
| `type-heading-01`  | 48px  | 400    | Serif         | Page-level headings                  |
| `type-heading-02`  | 40px  | 500    | Serif Medium  | Major section headings               |
| `type-heading-03`  | 32px  | 500    | Serif Medium  | Sub-section headings                 |
| `type-heading-04`  | 24px  | 600    | Sans          | Card/panel titles                    |
| `type-heading-05`  | 20px  | 600    | Sans          | Minor headings, widget titles        |
| `type-body-01`     | 18px  | 400    | Sans          | Marketing/editorial body text        |
| `type-body-02`     | 14px  | 400    | Sans          | Default body text (data UIs)         |
| `type-label-01`    | 14px  | 500    | Sans          | Form labels, table headers           |
| `type-label-02`    | 12px  | 500    | Sans (UPPER)  | Section labels, overlines            |
| `type-caption-01`  | 12px  | 400    | Sans          | Helper text, timestamps, metadata    |
| `type-code-01`     | 14px  | 400    | Mono          | Inline code, identifiers             |
| `type-code-02`     | 12px  | 400    | Mono          | Small code, annotations              |
| `type-data-01`     | 14px  | 500    | Sans (tabular)| Table cell values, numeric data      |
| `type-data-02`     | 12px  | 400    | Sans (tabular)| Small numeric data                   |
| `type-kpi`         | 32px  | 600    | Sans (tabular)| Large KPI metric values              |

---

## Spacing

8px base unit. Use `p-spacing-05`, `gap-spacing-07`, `m-spacing-03` in Tailwind.

| Token          | Value  | px   | Common Usage                              |
|----------------|--------|------|-------------------------------------------|
| `spacing-01`   | 0.125rem| 2px | Minimal gaps, badge padding               |
| `spacing-02`   | 0.25rem | 4px | Icon gaps, tight padding                  |
| `spacing-03`   | 0.5rem  | 8px | Button icon gap, input padding            |
| `spacing-04`   | 0.75rem | 12px| Table cell padding, compact sections      |
| `spacing-05`   | 1rem    | 16px| **Base gap** — card padding, grid gaps    |
| `spacing-06`   | 1.25rem | 20px| Nav padding                               |
| `spacing-07`   | 1.5rem  | 24px| Section gaps, content padding             |
| `spacing-08`   | 2rem    | 32px| Major section gaps                        |
| `spacing-09`   | 2.5rem  | 40px| Page-level spacing                        |
| `spacing-10`   | 3rem    | 48px| Large section dividers                    |
| `spacing-11`   | 4rem    | 64px| Hero section internal spacing             |
| `spacing-12`   | 5rem    | 80px| Section vertical padding                  |
| `spacing-13`   | 10rem   | 160px| Hero/marketing sections                  |

---

## Components Reference

### Naming Convention
```
.mb-{component}                  → base class
.mb-{component}--{variant}       → variant modifier
.mb-{component}--{size}          → size modifier
.mb-{component}__{element}       → child element
```

### 1. Button

**Variants**: `--primary`, `--secondary`, `--ghost`, `--danger`, `--outline`
**Sizes**: `--sm`, `--md` (default), `--lg`

```html
<!-- Primary button (default size) -->
<button class="mb-btn mb-btn--primary">Create Fund</button>

<!-- Secondary small -->
<button class="mb-btn mb-btn--secondary mb-btn--sm">Filter</button>

<!-- Ghost button -->
<button class="mb-btn mb-btn--ghost">Cancel</button>

<!-- Danger large -->
<button class="mb-btn mb-btn--danger mb-btn--lg">Delete</button>

<!-- Outline -->
<button class="mb-btn mb-btn--outline">Export</button>

<!-- Icon-only -->
<button class="mb-btn mb-btn--ghost mb-btn--icon">
  <svg>...</svg>
</button>

<!-- Disabled -->
<button class="mb-btn mb-btn--primary" disabled>Disabled</button>

<!-- Tailwind-only equivalent (no component class needed) -->
<button class="inline-flex items-center gap-spacing-03 px-spacing-05 py-spacing-03 bg-interactive text-text-on-color rounded-md text-sm font-medium hover:bg-interactive-hover active:bg-interactive-active focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2 transition-colors">
  Create Fund
</button>
```

### 2. Input / Form Controls

```html
<!-- Text input with label -->
<div class="mb-input-group">
  <label class="mb-input__label">Fund Name</label>
  <input type="text" class="mb-input" placeholder="Enter fund name..." />
  <span class="mb-input__helper">Must be unique across your organization.</span>
</div>

<!-- Error state -->
<div class="mb-input-group">
  <label class="mb-input__label">Commitment Amount</label>
  <input type="text" class="mb-input mb-input--error" value="abc" />
  <span class="mb-input__error">Please enter a valid number.</span>
</div>

<!-- Select -->
<select class="mb-input mb-select">
  <option>Select fund type...</option>
  <option>Buyout</option>
  <option>Venture Capital</option>
  <option>Real Estate</option>
</select>

<!-- Textarea -->
<textarea class="mb-input mb-textarea" placeholder="Notes..."></textarea>
```

### 3. Data Table

**Density**: `--compact`, default, `--relaxed`
**Features**: `--zebra` for striping

```html
<div class="mb-table-wrapper">
  <table class="mb-table mb-table--zebra">
    <thead class="mb-table__head">
      <tr>
        <th class="mb-table__header mb-table__header--sortable">Investor ▾</th>
        <th class="mb-table__header">Fund</th>
        <th class="mb-table__header mb-table__header--sortable">Commitment</th>
        <th class="mb-table__header">Status</th>
        <th class="mb-table__header mb-table__cell--actions">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr class="mb-table__row">
        <td class="mb-table__cell">Blackstone Capital</td>
        <td class="mb-table__cell mb-table__cell--secondary">Fund IV</td>
        <td class="mb-table__cell mb-table__cell--numeric">$25,000,000</td>
        <td class="mb-table__cell">
          <span class="mb-badge mb-badge--success">
            <span class="mb-badge__dot"></span> Active
          </span>
        </td>
        <td class="mb-table__cell mb-table__cell--actions">
          <button class="mb-btn mb-btn--ghost mb-btn--sm">Edit</button>
        </td>
      </tr>
      <tr class="mb-table__row">
        <td class="mb-table__cell">Sequoia Partners</td>
        <td class="mb-table__cell mb-table__cell--secondary">Fund IV</td>
        <td class="mb-table__cell mb-table__cell--numeric">$15,000,000</td>
        <td class="mb-table__cell">
          <span class="mb-badge mb-badge--warning">
            <span class="mb-badge__dot"></span> Pending
          </span>
        </td>
        <td class="mb-table__cell mb-table__cell--actions">
          <button class="mb-btn mb-btn--ghost mb-btn--sm">Edit</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Compact density for data-heavy views -->
<table class="mb-table mb-table--compact">...</table>
```

### 4. Card / Panel

```html
<!-- Standard card -->
<div class="mb-card">
  <div class="mb-card__header">
    <h3 class="mb-card__title">Fund Performance</h3>
    <button class="mb-btn mb-btn--ghost mb-btn--icon mb-btn--sm">⋯</button>
  </div>
  <div class="mb-card__body">
    <p>Content goes here...</p>
  </div>
  <div class="mb-card__footer">
    <button class="mb-btn mb-btn--ghost mb-btn--sm">Details</button>
    <button class="mb-btn mb-btn--primary mb-btn--sm">Export</button>
  </div>
</div>

<!-- KPI Card -->
<div class="mb-card mb-card--kpi">
  <div class="mb-card__header">
    <span class="mb-card__title">Total AUM</span>
  </div>
  <div class="mb-card__body">
    <div class="mb-card__value">$2.4B</div>
    <div class="mb-card__delta mb-card__delta--positive">↑ 12.3% vs last quarter</div>
  </div>
</div>

<!-- KPI Grid -->
<div class="mb-kpi-grid">
  <div class="mb-card mb-card--kpi">...</div>
  <div class="mb-card mb-card--kpi">...</div>
  <div class="mb-card mb-card--kpi">...</div>
  <div class="mb-card mb-card--kpi">...</div>
</div>
```

### 5. Badge / Tag

**Variants**: `--neutral`, `--success`, `--warning`, `--error`, `--info`, `--brand`

```html
<span class="mb-badge mb-badge--success"><span class="mb-badge__dot"></span> Active</span>
<span class="mb-badge mb-badge--warning"><span class="mb-badge__dot"></span> Pending</span>
<span class="mb-badge mb-badge--error"><span class="mb-badge__dot"></span> Overdue</span>
<span class="mb-badge mb-badge--info">New</span>
<span class="mb-badge mb-badge--neutral">Draft</span>
<span class="mb-badge mb-badge--brand">PE Fund</span>
```

### 6. Navigation

```html
<!-- Topbar -->
<header class="mb-topbar">
  <a href="/" class="mb-topbar__logo">Maybern</a>
  <nav class="mb-topbar__nav">
    <a href="/dashboard" class="mb-topbar__link mb-topbar__link--active">Dashboard</a>
    <a href="/funds" class="mb-topbar__link">Funds</a>
    <a href="/investors" class="mb-topbar__link">Investors</a>
    <a href="/reports" class="mb-topbar__link">Reports</a>
  </nav>
  <div>
    <button class="mb-btn mb-btn--primary mb-btn--sm">Book Demo</button>
  </div>
</header>

<!-- Sidebar -->
<nav class="mb-sidebar">
  <div class="mb-sidebar__label">Fund Management</div>
  <a href="/dashboard" class="mb-sidebar__item mb-sidebar__item--active">
    <svg>...</svg> Dashboard
  </a>
  <a href="/funds" class="mb-sidebar__item">
    <svg>...</svg> Funds
  </a>
  <a href="/investors" class="mb-sidebar__item">
    <svg>...</svg> Investors
  </a>
  <div class="mb-sidebar__label">Operations</div>
  <a href="/capital-calls" class="mb-sidebar__item">
    <svg>...</svg> Capital Calls
  </a>
  <a href="/distributions" class="mb-sidebar__item">
    <svg>...</svg> Distributions
  </a>
</nav>
```

### 7. Modal / Dialog

**Sizes**: `--sm`, default (32rem), `--lg`, `--xl`

```html
<div class="mb-modal-overlay">
  <div class="mb-modal">
    <div class="mb-modal__header">
      <h2 class="mb-modal__title">Confirm Distribution</h2>
      <button class="mb-btn mb-btn--ghost mb-btn--icon mb-btn--sm">✕</button>
    </div>
    <div class="mb-modal__body">
      <p>Are you sure you want to process this distribution of $5,000,000?</p>
    </div>
    <div class="mb-modal__footer">
      <button class="mb-btn mb-btn--outline">Cancel</button>
      <button class="mb-btn mb-btn--primary">Confirm</button>
    </div>
  </div>
</div>
```

### 8. Tabs

**Variants**: line (default), `--container`

```html
<!-- Line tabs -->
<div class="mb-tabs">
  <button class="mb-tab mb-tab--active">Overview</button>
  <button class="mb-tab">Investors</button>
  <button class="mb-tab">Transactions</button>
  <button class="mb-tab">Documents</button>
</div>
<div class="mb-tab-panel">Tab content here...</div>

<!-- Container tabs -->
<div class="mb-tabs mb-tabs--container">
  <button class="mb-tab mb-tab--active">Performance</button>
  <button class="mb-tab">Cash Flows</button>
  <button class="mb-tab">Holdings</button>
</div>
```

### 9. Layout

```html
<!-- Full page shell: sidebar + topbar + content -->
<div class="mb-shell">
  <nav class="mb-sidebar">...</nav>
  <div class="mb-shell__main">
    <header class="mb-topbar">...</header>
    <main class="mb-content">
      <!-- Page header -->
      <div class="mb-page-header">
        <h1 class="mb-page-header__title">Fund IV Overview</h1>
        <div class="mb-page-header__actions">
          <button class="mb-btn mb-btn--outline mb-btn--sm">Export</button>
          <button class="mb-btn mb-btn--primary mb-btn--sm">New Transaction</button>
        </div>
      </div>

      <!-- KPI row -->
      <div class="mb-kpi-grid">...</div>

      <hr class="mb-divider" />

      <!-- Toolbar + table -->
      <div class="mb-toolbar">
        <div class="mb-toolbar__group">
          <input type="text" class="mb-input" placeholder="Search investors..." style="max-width:16rem" />
          <select class="mb-input mb-select" style="max-width:10rem">
            <option>All Status</option>
          </select>
        </div>
        <div class="mb-toolbar__group">
          <button class="mb-btn mb-btn--outline mb-btn--sm">Export CSV</button>
        </div>
      </div>

      <div class="mb-table-wrapper">
        <table class="mb-table">...</table>
      </div>
    </main>
  </div>
</div>
```

---

## Composition Patterns

### Pattern: Fund Dashboard
```
mb-shell
├── mb-sidebar (Fund Management, Operations, Reports sections)
├── mb-shell__main
│   ├── mb-topbar
│   └── mb-content
│       ├── mb-page-header ("Fund IV Overview" + actions)
│       ├── mb-kpi-grid (4x mb-card--kpi: AUM, IRR, DPI, TVPI)
│       ├── mb-divider
│       ├── mb-tabs (Overview | Cash Flows | Investors | Documents)
│       └── mb-table-wrapper > mb-table (investor commitments)
```

### Pattern: Data List View
```
mb-content
├── mb-page-header ("Investors" + "Add Investor" button)
├── mb-toolbar (search input + status filter + export button)
├── mb-table-wrapper > mb-table--zebra
└── pagination controls (custom)
```

### Pattern: Form / Detail View
```
mb-content
├── mb-page-header ("New Capital Call")
├── mb-card
│   ├── mb-card__header ("Call Details")
│   └── mb-card__body
│       ├── grid of mb-input-groups (2-col layout)
│       └── mb-card__footer (Cancel + Submit buttons)
```

---

## Agent Instructions

### When generating UI with this system:
1. **Always use semantic token classes** — e.g. `text-text-primary` not `text-gray-900`.
2. **Use the layer model for backgrounds** — page is `bg-bg`, cards are `bg-bg-layer-01`, nested panels are `bg-bg-layer-02`.
3. **Use component classes first** — e.g. `mb-btn mb-btn--primary` before composing with Tailwind utilities.
4. **Mix component classes + Tailwind** freely — e.g. `<div class="mb-card mt-spacing-05">` is valid.
5. **For data-dense tables**, default to `mb-table--compact` with `type-data-01` for numeric cells.
6. **Use `tabular-nums`** (via `type-data-01`/`type-data-02`/`type-kpi`) for any numeric data to ensure column alignment.
7. **Financial values** should be right-aligned using `mb-table__cell--numeric`.
8. **Status indicators** always use `mb-badge` with the appropriate variant.
9. **The 14px (`text-sm`) base font size** is intentional for data-dense UIs — do not increase it for application views.
10. **Prefer `gap`** (via Tailwind's `gap-spacing-*`) over margins for spacing between siblings.

### File Reference
| File                       | Purpose                                         |
|----------------------------|-------------------------------------------------|
| `src/index.css`            | Entry point — import this in your app            |
| `src/tokens/primitives.css`| Tier 1: Raw color scales, spacing, type, radius  |
| `src/tokens/semantic.css`  | Tier 2+3: Semantic + component token mappings    |
| `tailwind.config.css`      | Tailwind v4 theme extending with tokens          |
| `src/base.css`             | @font-face, type presets, base element styles     |
| `src/components.css`       | All component classes (.mb-*)                    |
| `SYSTEM.md`                | This file — the source of truth                  |
