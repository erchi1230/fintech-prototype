import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Download,
  Filter,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
} from "lucide-react";

/* ========================================================================
   TAB NAVIGATION
   ======================================================================== */
const tabs = [
  "Data Display",
  "Tables",
  "Forms & Controls",
  "Feedback",
  "Overlay",
] as const;
type Tab = (typeof tabs)[number];

/* ── Section wrapper ──────────────────────────────────── */
function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-[var(--spacing-09)]">
      <h2
        style={{
          fontSize: "var(--text-lg)",
          fontWeight: "var(--weight-semibold)",
          color: "var(--text-primary)",
          marginBottom: "var(--spacing-01)",
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--text-tertiary)",
            marginBottom: "var(--spacing-05)",
          }}
        >
          {description}
        </p>
      )}
      {!description && <div style={{ marginBottom: "var(--spacing-05)" }} />}
      {children}
    </section>
  );
}

/* ========================================================================
   DATA DISPLAY TAB
   KPI Cards, Bar List, Tracker, Category Bar, Description List, Stat/Trend
   ======================================================================== */
function DataDisplayTab() {
  return (
    <>
      {/* ── KPI Cards ─────────────────────────────────── */}
      <Section
        title="KPI Cards"
        description="Tremor-inspired metric cards with label → value → delta → progress."
      >
        <div className="mb-kpi-grid">
          {/* Card 1 */}
          <div className="mb-card mb-card--kpi">
            <div className="mb-card__header">
              <span className="mb-card__title">Total AUM</span>
            </div>
            <span
              style={{
                fontSize: "var(--text-3xl)",
                fontWeight: "var(--weight-semibold)",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "var(--tracking-tight)",
                color: "var(--text-primary)",
              }}
            >
              $2.4B
            </span>
            <span
              className="mb-stat mb-stat--positive"
              style={{ marginTop: "var(--spacing-02)" }}
            >
              <TrendingUp size={12} /> +12.3%
            </span>
            <div className="mb-card__footer">
              <span>vs. $2.14B last quarter</span>
              <ArrowRight size={12} />
            </div>
          </div>

          {/* Card 2 */}
          <div className="mb-card mb-card--kpi">
            <div className="mb-card__header">
              <span className="mb-card__title">Net IRR</span>
            </div>
            <span
              style={{
                fontSize: "var(--text-3xl)",
                fontWeight: "var(--weight-semibold)",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "var(--tracking-tight)",
                color: "var(--text-primary)",
              }}
            >
              18.3%
            </span>
            <span
              className="mb-stat mb-stat--negative"
              style={{ marginTop: "var(--spacing-02)" }}
            >
              <TrendingDown size={12} /> -2.1%
            </span>
            <div className="mb-card__footer">
              <span>Target: 20.0%</span>
              <ArrowRight size={12} />
            </div>
          </div>

          {/* Card 3 — with progress bar */}
          <div className="mb-card mb-card--kpi">
            <div className="mb-card__header">
              <span className="mb-card__title">Capital Deployed</span>
            </div>
            <span
              style={{
                fontSize: "var(--text-3xl)",
                fontWeight: "var(--weight-semibold)",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "var(--tracking-tight)",
                color: "var(--text-primary)",
              }}
            >
              $1.6B
            </span>
            <div
              className="mb-progress-group"
              style={{ marginTop: "var(--spacing-04)" }}
            >
              <div className="mb-progress-group__row">
                <span>67% of committed</span>
                <span>$2.4B</span>
              </div>
              <div className="mb-progress">
                <div className="mb-progress__fill" style={{ width: "67%" }} />
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="mb-card mb-card--kpi">
            <div className="mb-card__header">
              <span className="mb-card__title">Active Funds</span>
            </div>
            <span
              style={{
                fontSize: "var(--text-3xl)",
                fontWeight: "var(--weight-semibold)",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "var(--tracking-tight)",
                color: "var(--text-primary)",
              }}
            >
              12
            </span>
            <span
              className="mb-stat mb-stat--unchanged"
              style={{ marginTop: "var(--spacing-02)" }}
            >
              — No change
            </span>
            <div className="mb-card__footer">
              <span>3 in deployment phase</span>
              <ArrowRight size={12} />
            </div>
          </div>
        </div>
      </Section>

      {/* ── Card Variants ─────────────────────────────── */}
      <Section
        title="Card Variants"
        description="Elevated, outlined, and interactive card styles."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[var(--spacing-04)]">
          <div className="mb-card mb-card--elevated">
            <div className="mb-card__header">
              <span className="mb-card__title">Elevated</span>
            </div>
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--text-secondary)",
              }}
            >
              Stronger shadow for emphasis on primary content areas.
            </p>
          </div>
          <div className="mb-card mb-card--outlined">
            <div className="mb-card__header">
              <span className="mb-card__title">Outlined</span>
            </div>
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--text-secondary)",
              }}
            >
              No shadow — flat appearance. Good for dense layouts.
            </p>
          </div>
          <div className="mb-card mb-card--interactive">
            <div className="mb-card__header">
              <span className="mb-card__title">Interactive</span>
            </div>
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--text-secondary)",
              }}
            >
              Clickable card with hover state. Try hovering.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Stat / Trend ──────────────────────────────── */}
      <Section
        title="Stat Trend"
        description="Inline metric indicators for embedding in tables or cards."
      >
        <div className="flex flex-wrap gap-[var(--spacing-04)] items-center">
          <span className="mb-stat mb-stat--positive">
            <TrendingUp size={12} /> +14.2%
          </span>
          <span className="mb-stat mb-stat--negative">
            <TrendingDown size={12} /> -3.8%
          </span>
          <span className="mb-stat mb-stat--unchanged">— 0.0%</span>
          <span className="mb-stat mb-stat--positive">
            <TrendingUp size={12} /> +$2.4M
          </span>
          <span className="mb-stat mb-stat--negative">
            <TrendingDown size={12} /> -120 bps
          </span>
        </div>
      </Section>

      {/* ── Progress Bars ─────────────────────────────── */}
      <Section
        title="Progress Bar"
        description="Horizontal progress indicator with size and color variants."
      >
        <div className="flex flex-col gap-[var(--spacing-05)] max-w-lg">
          <div className="mb-progress-group">
            <div className="mb-progress-group__row">
              <span>Fund IV Deployment</span>
              <span>67%</span>
            </div>
            <div className="mb-progress">
              <div className="mb-progress__fill" style={{ width: "67%" }} />
            </div>
          </div>

          <div className="mb-progress-group">
            <div className="mb-progress-group__row">
              <span>Capital Call Schedule</span>
              <span>89%</span>
            </div>
            <div className="mb-progress mb-progress--success">
              <div className="mb-progress__fill" style={{ width: "89%" }} />
            </div>
          </div>

          <div className="mb-progress-group">
            <div className="mb-progress-group__row">
              <span>Distribution Target</span>
              <span>42%</span>
            </div>
            <div className="mb-progress mb-progress--warning">
              <div className="mb-progress__fill" style={{ width: "42%" }} />
            </div>
          </div>

          <div className="flex flex-col gap-[var(--spacing-03)]">
            <span
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--text-tertiary)",
              }}
            >
              Sizes: sm / md / lg
            </span>
            <div className="mb-progress mb-progress--sm">
              <div className="mb-progress__fill" style={{ width: "60%" }} />
            </div>
            <div className="mb-progress">
              <div className="mb-progress__fill" style={{ width: "60%" }} />
            </div>
            <div className="mb-progress mb-progress--lg">
              <div className="mb-progress__fill" style={{ width: "60%" }} />
            </div>
          </div>
        </div>
      </Section>

      {/* ── Bar List ──────────────────────────────────── */}
      <Section
        title="Bar List"
        description="Ranked horizontal bars for top-N data. Inspired by Tremor's BarList."
      >
        <div className="mb-card max-w-lg">
          <div className="mb-card__header">
            <span className="mb-card__title">Top Performing Funds</span>
          </div>
          <div className="mb-bar-list">
            {[
              { name: "Growth Fund IV", value: "$142M", pct: 100 },
              { name: "Buyout Fund III", value: "$118M", pct: 83 },
              { name: "Venture II", value: "$87M", pct: 61 },
              { name: "Real Estate I", value: "$64M", pct: 45 },
              { name: "Credit Opp. Fund", value: "$38M", pct: 27 },
            ].map((item) => (
              <div className="mb-bar-list__item" key={item.name}>
                <span className="mb-bar-list__label">{item.name}</span>
                <div className="mb-bar-list__track">
                  <div
                    className="mb-bar-list__bar"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <span className="mb-bar-list__value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Tracker ───────────────────────────────────── */}
      <Section
        title="Tracker"
        description="Status-over-time grid. 30 cells representing daily status."
      >
        <div className="mb-card max-w-lg">
          <div className="mb-card__header">
            <span className="mb-card__title">
              System Uptime — Last 30 Days
            </span>
            <span className="mb-stat mb-stat--positive">99.2%</span>
          </div>
          <div className="mb-tracker-group">
            <div className="mb-tracker">
              {[
                "s","s","s","s","s","s","w","s","s","s",
                "s","s","s","e","s","s","s","s","s","s",
                "w","s","s","s","s","s","s","s","s","s",
              ].map((status, i) => {
                const cls =
                  status === "e"
                    ? "mb-tracker__cell--error"
                    : status === "w"
                    ? "mb-tracker__cell--warning"
                    : "mb-tracker__cell--success";
                return (
                  <div key={i} className={`mb-tracker__cell ${cls}`} />
                );
              })}
            </div>
            <div className="mb-tracker-group__labels">
              <span>30 days ago</span>
              <span>Today</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Category Bar ──────────────────────────────── */}
      <Section
        title="Category Bar"
        description="Segmented bar for allocation/distribution views."
      >
        <div className="mb-card max-w-lg">
          <div className="mb-card__header">
            <span className="mb-card__title">Portfolio Allocation</span>
          </div>
          <div className="mb-category-bar">
            <div
              className="mb-category-bar__segment"
              style={{ flex: 40, backgroundColor: "var(--data-01)" }}
            />
            <div
              className="mb-category-bar__segment"
              style={{ flex: 25, backgroundColor: "var(--data-02)" }}
            />
            <div
              className="mb-category-bar__segment"
              style={{ flex: 15, backgroundColor: "var(--data-03)" }}
            />
            <div
              className="mb-category-bar__segment"
              style={{ flex: 12, backgroundColor: "var(--data-04)" }}
            />
            <div
              className="mb-category-bar__segment"
              style={{ flex: 8, backgroundColor: "var(--data-05)" }}
            />
          </div>
          <div className="mb-category-bar-legend">
            {[
              { label: "Private Equity (40%)", color: "var(--data-01)" },
              { label: "Real Estate (25%)", color: "var(--data-02)" },
              { label: "Venture Capital (15%)", color: "var(--data-03)" },
              { label: "Credit (12%)", color: "var(--data-04)" },
              { label: "Infrastructure (8%)", color: "var(--data-05)" },
            ].map((item) => (
              <div
                className="mb-category-bar-legend__item"
                key={item.label}
              >
                <div
                  className="mb-category-bar-legend__dot"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Description List ──────────────────────────── */}
      <Section
        title="Description List"
        description="Stripe-style key-value pairs for detail panels."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--spacing-05)]">
          <div className="mb-card">
            <div className="mb-card__header">
              <span className="mb-card__title">Fund Details</span>
            </div>
            <div className="mb-list">
              <div className="mb-list__item">
                <span className="mb-list__label">Fund Name</span>
                <span className="mb-list__value">Growth Equity Fund IV</span>
              </div>
              <div className="mb-list__item">
                <span className="mb-list__label">Vintage</span>
                <span className="mb-list__value">2021</span>
              </div>
              <div className="mb-list__item">
                <span className="mb-list__label">Committed Capital</span>
                <span className="mb-list__value">$450,000,000</span>
              </div>
              <div className="mb-list__item">
                <span className="mb-list__label">Strategy</span>
                <span className="mb-list__value">Growth Equity</span>
              </div>
              <div className="mb-list__item">
                <span className="mb-list__label">Status</span>
                <span className="mb-list__value">
                  <span className="mb-badge mb-badge--success">Active</span>
                </span>
              </div>
            </div>
          </div>

          <div className="mb-card">
            <div className="mb-card__header">
              <span className="mb-card__title">Performance Summary</span>
            </div>
            <div className="mb-list">
              <div className="mb-list__item">
                <span className="mb-list__label">Net IRR</span>
                <span className="mb-list__value">22.1%</span>
              </div>
              <div className="mb-list__item">
                <span className="mb-list__label">TVPI</span>
                <span className="mb-list__value">1.84x</span>
              </div>
              <div className="mb-list__item">
                <span className="mb-list__label">DPI</span>
                <span className="mb-list__value">0.42x</span>
              </div>
              <div className="mb-list__item">
                <span className="mb-list__label">Unrealized Value</span>
                <span className="mb-list__value">$640M</span>
              </div>
              <div className="mb-list__item">
                <span className="mb-list__label">Distributions</span>
                <span className="mb-list__value">$189M</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Avatars ───────────────────────────────────── */}
      <Section
        title="Avatars"
        description="Initials-based avatars with size variants and stacking."
      >
        <div className="flex items-center gap-[var(--spacing-05)]">
          <div className="flex items-center gap-[var(--spacing-03)]">
            <span className="mb-avatar mb-avatar--sm">JD</span>
            <span className="mb-avatar">MK</span>
            <span className="mb-avatar mb-avatar--lg">AP</span>
            <span className="mb-avatar mb-avatar--xl">RW</span>
          </div>

          <div
            style={{
              borderLeft: "1px solid var(--border-subtle)",
              height: "2rem",
              margin: "0 var(--spacing-03)",
            }}
          />

          <div>
            <span
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--text-tertiary)",
                display: "block",
                marginBottom: "var(--spacing-02)",
              }}
            >
              Stacked
            </span>
            <div className="mb-avatar-stack">
              <span className="mb-avatar">JD</span>
              <span className="mb-avatar">MK</span>
              <span className="mb-avatar">AP</span>
              <span
                className="mb-avatar"
                style={{
                  backgroundColor: "var(--gray-200)",
                  color: "var(--text-secondary)",
                }}
              >
                +3
              </span>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ========================================================================
   TABLES TAB
   ======================================================================== */
function TablesTab() {
  return (
    <>
      <Section
        title="Data Table"
        description="Enhanced table with toolbar, zebra striping, sort indicators, colored cells, and pagination."
      >
        <div className="mb-table-toolbar">
          <div className="mb-table-toolbar__group">
            <div style={{ position: "relative" }}>
              <Search
                size={14}
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-placeholder)",
                }}
              />
              <input
                className="mb-input"
                placeholder="Search funds…"
                style={{ maxWidth: 240, paddingLeft: "var(--spacing-08)" }}
              />
            </div>
            <button className="mb-btn mb-btn--outline mb-btn--sm">
              <Filter size={14} /> Filters
            </button>
          </div>
          <div className="mb-table-toolbar__group">
            <span className="mb-table-toolbar__count">8 results</span>
            <button className="mb-btn mb-btn--ghost mb-btn--sm">
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        <div className="mb-table-wrapper">
          <table className="mb-table mb-table--zebra">
            <thead className="mb-table__head">
              <tr>
                <th className="mb-table__header mb-table__header--sortable mb-table__header--sorted mb-table__header--asc">
                  Fund
                </th>
                <th className="mb-table__header">Vintage</th>
                <th
                  className="mb-table__header mb-table__header--sortable"
                  style={{ textAlign: "right" }}
                >
                  Committed
                </th>
                <th
                  className="mb-table__header mb-table__header--sortable"
                  style={{ textAlign: "right" }}
                >
                  Net IRR
                </th>
                <th className="mb-table__header" style={{ textAlign: "right" }}>
                  TVPI
                </th>
                <th className="mb-table__header">Status</th>
                <th className="mb-table__header mb-table__cell--actions" />
              </tr>
            </thead>
            <tbody>
              {[
                {
                  fund: "Growth Fund IV",
                  vintage: "2021",
                  committed: "$450M",
                  irr: "22.1%",
                  irrPositive: true,
                  tvpi: "1.84x",
                  status: "Active",
                  statusType: "success",
                },
                {
                  fund: "Buyout Fund III",
                  vintage: "2019",
                  committed: "$800M",
                  irr: "16.8%",
                  irrPositive: true,
                  tvpi: "1.62x",
                  status: "Harvesting",
                  statusType: "info",
                },
                {
                  fund: "Venture II",
                  vintage: "2022",
                  committed: "$200M",
                  irr: "—",
                  irrPositive: true,
                  tvpi: "1.12x",
                  status: "Deploying",
                  statusType: "warning",
                },
                {
                  fund: "Real Estate I",
                  vintage: "2020",
                  committed: "$350M",
                  irr: "9.4%",
                  irrPositive: true,
                  tvpi: "1.31x",
                  status: "Active",
                  statusType: "success",
                },
                {
                  fund: "Credit Opp.",
                  vintage: "2018",
                  committed: "$600M",
                  irr: "-2.1%",
                  irrPositive: false,
                  tvpi: "0.94x",
                  status: "Liquidating",
                  statusType: "error",
                },
              ].map((row) => (
                <tr className="mb-table__row" key={row.fund}>
                  <td
                    className="mb-table__cell"
                    style={{ fontWeight: "var(--weight-medium)" }}
                  >
                    <div className="flex items-center gap-[var(--spacing-03)]">
                      <span className="mb-avatar mb-avatar--sm">
                        {row.fund.slice(0, 2)}
                      </span>
                      {row.fund}
                    </div>
                  </td>
                  <td className="mb-table__cell mb-table__cell--secondary">
                    {row.vintage}
                  </td>
                  <td className="mb-table__cell mb-table__cell--numeric">
                    {row.committed}
                  </td>
                  <td
                    className={`mb-table__cell mb-table__cell--numeric ${
                      row.irrPositive
                        ? "mb-table__cell--positive"
                        : "mb-table__cell--negative"
                    }`}
                  >
                    {row.irr}
                  </td>
                  <td className="mb-table__cell mb-table__cell--numeric">
                    {row.tvpi}
                  </td>
                  <td className="mb-table__cell">
                    <span className={`mb-badge mb-badge--${row.statusType}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="mb-table__cell mb-table__cell--actions">
                    <button className="mb-btn mb-btn--ghost mb-btn--icon mb-btn--sm">
                      <MoreHorizontal size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mb-table__pagination">
            <span>Showing 1–5 of 8</span>
            <div className="mb-table__pagination-nav">
              <button className="mb-table__pagination-btn" disabled>
                <ChevronLeft size={14} />
              </button>
              <button className="mb-table__pagination-btn">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Compact Table"
        description="Higher data density for information-rich views."
      >
        <div className="mb-table-wrapper" style={{ maxWidth: "36rem" }}>
          <table className="mb-table mb-table--compact">
            <thead className="mb-table__head">
              <tr>
                <th className="mb-table__header">Date</th>
                <th className="mb-table__header">Transaction</th>
                <th className="mb-table__header" style={{ textAlign: "right" }}>
                  Amount
                </th>
                <th className="mb-table__header">Type</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  date: "2024-01-15",
                  txn: "Capital Call #7",
                  amount: "+$12.5M",
                  type: "Call",
                  positive: true,
                },
                {
                  date: "2024-01-08",
                  txn: "Distribution Q4",
                  amount: "-$8.2M",
                  type: "Distribution",
                  positive: false,
                },
                {
                  date: "2023-12-20",
                  txn: "Management Fee",
                  amount: "-$1.1M",
                  type: "Fee",
                  positive: false,
                },
                {
                  date: "2023-12-15",
                  txn: "Capital Call #6",
                  amount: "+$15.0M",
                  type: "Call",
                  positive: true,
                },
              ].map((row, i) => (
                <tr className="mb-table__row" key={i}>
                  <td className="mb-table__cell mb-table__cell--secondary">
                    {row.date}
                  </td>
                  <td className="mb-table__cell">{row.txn}</td>
                  <td
                    className={`mb-table__cell mb-table__cell--numeric ${
                      row.positive
                        ? "mb-table__cell--positive"
                        : "mb-table__cell--negative"
                    }`}
                  >
                    {row.amount}
                  </td>
                  <td className="mb-table__cell">
                    <span className="mb-badge mb-badge--neutral">
                      {row.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}

/* ========================================================================
   FORMS & CONTROLS TAB
   ======================================================================== */
function FormsTab() {
  return (
    <>
      <Section title="Buttons" description="All variants and sizes.">
        <div className="flex flex-col gap-[var(--spacing-05)]">
          <div className="flex flex-wrap gap-[var(--spacing-03)] items-center">
            <button className="mb-btn mb-btn--primary">Primary</button>
            <button className="mb-btn mb-btn--secondary">Secondary</button>
            <button className="mb-btn mb-btn--outline">Outline</button>
            <button className="mb-btn mb-btn--ghost">Ghost</button>
            <button className="mb-btn mb-btn--danger">Danger</button>
          </div>
          <div className="flex flex-wrap gap-[var(--spacing-03)] items-center">
            <button className="mb-btn mb-btn--primary mb-btn--sm">
              Small
            </button>
            <button className="mb-btn mb-btn--primary">Medium</button>
            <button className="mb-btn mb-btn--primary mb-btn--lg">
              Large
            </button>
            <button className="mb-btn mb-btn--primary" disabled>
              Disabled
            </button>
          </div>
          <div className="flex flex-wrap gap-[var(--spacing-03)] items-center">
            <button className="mb-btn mb-btn--primary mb-btn--sm">
              <Download size={14} /> Export CSV
            </button>
            <button className="mb-btn mb-btn--outline mb-btn--sm">
              <Filter size={14} /> Add Filter
            </button>
            <button className="mb-btn mb-btn--ghost mb-btn--icon mb-btn--sm">
              <MoreHorizontal size={14} />
            </button>
          </div>
        </div>
      </Section>

      <Section
        title="Form Controls"
        description="Inputs, selects, and their states."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--spacing-05)] max-w-2xl">
          <div className="mb-input-group">
            <label className="mb-input__label">Fund Name</label>
            <input
              className="mb-input"
              type="text"
              placeholder="Enter fund name…"
            />
            <span className="mb-input__helper">
              Required for new fund creation.
            </span>
          </div>
          <div className="mb-input-group">
            <label className="mb-input__label">Vintage Year</label>
            <select className="mb-input mb-select">
              <option>Select year…</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
            </select>
          </div>
          <div className="mb-input-group">
            <label className="mb-input__label">Committed Capital</label>
            <input
              className="mb-input mb-input--error"
              type="text"
              defaultValue="abc"
            />
            <span className="mb-input__error">
              Please enter a valid number.
            </span>
          </div>
          <div className="mb-input-group">
            <label className="mb-input__label">Notes</label>
            <textarea
              className="mb-input mb-textarea"
              placeholder="Additional notes…"
              rows={3}
            />
          </div>
          <div className="mb-input-group">
            <label className="mb-input__label">Disabled Field</label>
            <input
              className="mb-input"
              type="text"
              placeholder="Not editable"
              disabled
            />
          </div>
        </div>
      </Section>

      <Section title="Tabs" description="Line and container variants.">
        <div className="flex flex-col gap-[var(--spacing-06)]">
          <div>
            <span
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--text-tertiary)",
                marginBottom: "var(--spacing-02)",
                display: "block",
              }}
            >
              Line (default)
            </span>
            <div className="mb-tabs">
              <button className="mb-tab mb-tab--active">Overview</button>
              <button className="mb-tab">Performance</button>
              <button className="mb-tab">Holdings</button>
              <button className="mb-tab">Cash Flows</button>
              <button className="mb-tab" disabled>
                Documents
              </button>
            </div>
          </div>
          <div>
            <span
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--text-tertiary)",
                marginBottom: "var(--spacing-02)",
                display: "block",
              }}
            >
              Container
            </span>
            <div className="mb-tabs mb-tabs--container">
              <button className="mb-tab mb-tab--active">All</button>
              <button className="mb-tab">Active</button>
              <button className="mb-tab">Closed</button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ========================================================================
   FEEDBACK TAB
   ======================================================================== */
function FeedbackTab() {
  return (
    <>
      <Section
        title="Badges"
        description="Status indicators for tables, cards, and inline use."
      >
        <div className="flex flex-col gap-[var(--spacing-04)]">
          <div className="flex flex-wrap gap-[var(--spacing-03)]">
            <span className="mb-badge mb-badge--success">Active</span>
            <span className="mb-badge mb-badge--warning">Deploying</span>
            <span className="mb-badge mb-badge--error">Liquidating</span>
            <span className="mb-badge mb-badge--info">Harvesting</span>
            <span className="mb-badge mb-badge--neutral">Draft</span>
            <span className="mb-badge mb-badge--brand">Featured</span>
          </div>
          <div className="flex flex-wrap gap-[var(--spacing-03)]">
            <span className="mb-badge mb-badge--success">
              <span className="mb-badge__dot" /> Operational
            </span>
            <span className="mb-badge mb-badge--warning">
              <span className="mb-badge__dot" /> Degraded
            </span>
            <span className="mb-badge mb-badge--error">
              <span className="mb-badge__dot" /> Outage
            </span>
          </div>
        </div>
      </Section>

      <Section
        title="Tooltips"
        description="Pure-CSS tooltips on hover. Add data-tooltip attribute."
      >
        <div className="flex flex-wrap gap-[var(--spacing-06)] items-center">
          {[
            { label: "Net IRR", tip: "Net Internal Rate of Return" },
            { label: "TVPI", tip: "Total Value to Paid-In" },
            { label: "DPI", tip: "Distributions to Paid-In" },
            { label: "RVPI", tip: "Remaining Value to Paid-In" },
          ].map((item) => (
            <span className="mb-tooltip" data-tooltip={item.tip} key={item.label}>
              <span
                style={{
                  borderBottom: "1px dashed var(--border-strong)",
                  cursor: "help",
                }}
              >
                {item.label}
              </span>
            </span>
          ))}
        </div>
      </Section>

      <Section
        title="Empty State"
        description="Placeholder when no data is available."
      >
        <div className="mb-card" style={{ maxWidth: "28rem" }}>
          <div
            className="mb-empty-state"
            style={{ padding: "var(--spacing-09) var(--spacing-05)" }}
          >
            <div
              className="mb-empty-state__icon"
              style={{
                width: "3rem",
                height: "3rem",
                marginBottom: "var(--spacing-04)",
                color: "var(--gray-300)",
              }}
            >
              <Search size={48} strokeWidth={1} />
            </div>
            <span className="mb-empty-state__title">No results found</span>
            <span
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--text-tertiary)",
              }}
            >
              Try adjusting your search or filter criteria.
            </span>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ========================================================================
   OVERLAY TAB
   ======================================================================== */
function OverlayTab() {
  return (
    <>
      <Section
        title="Dropdown Menu"
        description="Action menu with items, separators, and section labels. Shown in static position for preview."
      >
        <div className="flex gap-[var(--spacing-06)]">
          <div className="mb-dropdown" style={{ position: "relative", top: 0 }}>
            <div className="mb-dropdown__label">Actions</div>
            <button className="mb-dropdown__item">
              <Edit size={14} /> Edit Fund
            </button>
            <button className="mb-dropdown__item">
              <Copy size={14} /> Duplicate
            </button>
            <button className="mb-dropdown__item">
              <ExternalLink size={14} /> View Report
            </button>
            <hr className="mb-dropdown__separator" />
            <button className="mb-dropdown__item mb-dropdown__item--danger">
              <Trash2 size={14} /> Delete
            </button>
          </div>

          <div className="mb-dropdown" style={{ position: "relative", top: 0 }}>
            <div className="mb-dropdown__label">Sort By</div>
            <button className="mb-dropdown__item">Fund Name</button>
            <button className="mb-dropdown__item">Vintage Year</button>
            <button className="mb-dropdown__item">Net IRR</button>
            <hr className="mb-dropdown__separator" />
            <div className="mb-dropdown__label">Order</div>
            <button className="mb-dropdown__item">Ascending</button>
            <button className="mb-dropdown__item">Descending</button>
          </div>
        </div>
      </Section>

      <Section
        title="Modal / Dialog"
        description="Static preview of modal structure."
      >
        <div className="mb-card" style={{ maxWidth: "32rem" }}>
          <div
            style={{
              borderBottom: "1px solid var(--border-subtle)",
              padding: "var(--spacing-04) var(--spacing-05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "var(--text-md)",
                fontWeight: "var(--weight-semibold)",
              }}
            >
              Confirm Capital Call
            </span>
            <button className="mb-btn mb-btn--ghost mb-btn--icon mb-btn--sm">
              ✕
            </button>
          </div>
          <div style={{ padding: "var(--spacing-05)" }}>
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--text-secondary)",
                marginBottom: "var(--spacing-04)",
              }}
            >
              You are about to initiate a capital call of{" "}
              <strong>$15,000,000</strong> for Growth Equity Fund IV. This action
              will notify all 23 limited partners.
            </p>
            <div className="mb-list mb-list--compact">
              <div className="mb-list__item">
                <span className="mb-list__label">Amount</span>
                <span className="mb-list__value">$15,000,000</span>
              </div>
              <div className="mb-list__item">
                <span className="mb-list__label">Due Date</span>
                <span className="mb-list__value">Feb 15, 2024</span>
              </div>
              <div className="mb-list__item">
                <span className="mb-list__label">LPs Notified</span>
                <span className="mb-list__value">23</span>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "var(--spacing-03)",
              padding: "var(--spacing-04) var(--spacing-05)",
              borderTop: "1px solid var(--border-subtle)",
            }}
          >
            <button className="mb-btn mb-btn--outline mb-btn--sm">
              Cancel
            </button>
            <button className="mb-btn mb-btn--primary mb-btn--sm">
              Confirm Call
            </button>
          </div>
        </div>
      </Section>

      <Section
        title="Layout Helpers"
        description="Page header, toolbar, divider patterns."
      >
        <div className="mb-card">
          <div
            className="mb-page-header"
            style={{
              paddingBottom: "var(--spacing-04)",
              marginBottom: "var(--spacing-04)",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "var(--text-lg)",
                  fontWeight: "var(--weight-semibold)",
                  color: "var(--text-primary)",
                }}
              >
                Fund Performance
              </h3>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-tertiary)",
                }}
              >
                Q4 2024 quarterly report
              </p>
            </div>
            <div className="mb-page-header__actions">
              <button className="mb-btn mb-btn--outline mb-btn--sm">
                <Download size={14} /> Export
              </button>
              <button className="mb-btn mb-btn--primary mb-btn--sm">
                Share Report
              </button>
            </div>
          </div>
          <div className="mb-toolbar">
            <div className="mb-toolbar__group">
              <button className="mb-btn mb-btn--ghost mb-btn--sm">
                All Funds
              </button>
              <button className="mb-btn mb-btn--ghost mb-btn--sm">
                Active Only
              </button>
            </div>
            <div className="mb-toolbar__group">
              <button className="mb-btn mb-btn--ghost mb-btn--icon mb-btn--sm">
                <Filter size={14} />
              </button>
              <button className="mb-btn mb-btn--ghost mb-btn--icon mb-btn--sm">
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
          <div className="mb-divider" style={{ margin: "0" }} />
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--text-tertiary)",
              paddingTop: "var(--spacing-04)",
            }}
          >
            Content area below the toolbar and divider.
          </p>
        </div>
      </Section>
    </>
  );
}

/* ========================================================================
   MAIN COMPONENT
   ======================================================================== */
export default function ComponentLibrary() {
  const [activeTab, setActiveTab] = useState<Tab>("Data Display");

  return (
    <div className="mb-content" style={{ padding: "var(--spacing-07)" }}>
      <div style={{ marginBottom: "var(--spacing-07)" }}>
        <h1
          style={{
            fontSize: "var(--text-xl)",
            fontWeight: "var(--weight-semibold)",
            color: "var(--text-primary)",
            marginBottom: "var(--spacing-01)",
          }}
        >
          Component Library
        </h1>
        <p
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--text-tertiary)",
          }}
        >
          Maybern Design System — 18 components, all tokens and primitives
        </p>
      </div>

      <div className="mb-tabs" style={{ marginBottom: "var(--spacing-07)" }}>
        {tabs.map((t) => (
          <button
            key={t}
            className={`mb-tab ${activeTab === t ? "mb-tab--active" : ""}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === "Data Display" && <DataDisplayTab />}
      {activeTab === "Tables" && <TablesTab />}
      {activeTab === "Forms & Controls" && <FormsTab />}
      {activeTab === "Feedback" && <FeedbackTab />}
      {activeTab === "Overlay" && <OverlayTab />}
    </div>
  );
}
