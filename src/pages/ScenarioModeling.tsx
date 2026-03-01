import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, Share2, MessageSquare } from "lucide-react";

/*
 * ScenarioModeling.tsx
 * Fund Scenario Modeling Tool — Zone 1: Signal Bar
 */

/* ── Data ─────────────────────────────────────────────────────────── */
const BASE = {
  label: "Base Case",
  irr: "18.2%",
  assumptions: "2.0x Exit Multiple · 5yr Hold",
};
const DOWN = {
  label: "Downside",
  irr: "11.4%",
  assumptions: "1.5x Exit Multiple · 7yr Hold",
  delta: "−6.8pts vs. Base",
};
const UP = {
  label: "Upside",
  irr: "27.6%",
  assumptions: "2.5x Exit Multiple · 4yr Hold",
  delta: "+9.4pts vs. Base",
};

type ConfidenceStatus = "Final" | "Preliminary";
const CONFIDENCE_STATUS: ConfidenceStatus = "Final";
const CONFIDENCE_LABEL = "Last calculated: Jun 30, 2025 at 9:42am";
const SECTION_LABEL = "Fund Performance Overview";

/* ── Horizontal padding matching the global topbar ──────────────── */
const H_PAD = "var(--spacing-07)"; /* 24px — matches .mb-topbar */

/* ========================================================================
   SCENARIO CARD
   Uses mb-card mb-card--kpi from the component library.
   Color surface overrides for downside/upside — gap flags [1][2][3][4]
   still apply (no --surface-warning / --surface-success tokens exist).
   ======================================================================== */
function ScenarioCard({
  scenario,
}: {
  scenario: typeof BASE & { delta?: string; variant: "base" | "downside" | "upside" };
}) {
  const isBase = scenario.variant === "base";
  const isDown = scenario.variant === "downside";

  return (
    <div className="mb-card mb-card--kpi" style={{ flex: 1 }}>

      {/* Label — mb-card__title with overline treatment */}
      <div className="mb-card__header">
        <span
          className="mb-card__title"
          style={{ textTransform: "uppercase", letterSpacing: "var(--tracking-wide)" }}
        >
          {scenario.label}
        </span>
      </div>

      {/* Assumption context — mb-card__subtitle, placed before value */}
      <span
        className="mb-card__subtitle"
        style={{ marginTop: 0, marginBottom: "var(--spacing-04)" }}
      >
        {scenario.assumptions}
      </span>

      {/* Net IRR — mb-card__value (text-3xl, semibold, tabular-nums) */}
      <span className="mb-card__value">{scenario.irr}</span>

      {/* Base Case — baseline indicator, same delta treatment as other cards */}
      {isBase && (
        <span className="mb-card__delta mb-card__delta--unchanged">
          Performance baseline
        </span>
      )}

      {/* Downside / Upside — colored delta badge */}
      {!isBase && scenario.delta && (
        <span
          className={`mb-card__delta ${
            isDown ? "mb-card__delta--negative" : "mb-card__delta--positive"
          }`}
        >
          {scenario.delta}
        </span>
      )}
    </div>
  );
}

/* ========================================================================
   STANDALONE GLOBAL NAV
   Back · Title (center) · Settings / Share / Comments (right)
   ======================================================================== */
function GlobalNav({ title }: { title: string }) {
  const navigate = useNavigate();

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "var(--topbar-height)",        /* 56px */
        paddingLeft: H_PAD,
        paddingRight: H_PAD,
        backgroundColor: "var(--bg-layer-01)",
        borderBottom: "1px solid var(--border-subtle)",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      {/* Left — back action */}
      <button
        className="mb-btn mb-btn--ghost mb-btn--sm"
        onClick={() => navigate(-1)}
        style={{ gap: "var(--spacing-02)", color: "var(--text-secondary)" }}
      >
        <ArrowLeft size={15} />
        Back
      </button>

      {/* Center — page title */}
      <span
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "var(--text-sm)",
          fontWeight: "var(--weight-semibold)",
          color: "var(--text-primary)",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </span>

      {/* Right — Settings, Share, Comments */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-01)" }}>
        <button
          className="mb-btn mb-btn--ghost mb-btn--icon mb-btn--sm"
          title="Settings"
          style={{ color: "var(--text-tertiary)" }}
        >
          <Settings size={16} />
        </button>
        <button
          className="mb-btn mb-btn--ghost mb-btn--icon mb-btn--sm"
          title="Comments"
          style={{ color: "var(--text-tertiary)" }}
        >
          <MessageSquare size={16} />
        </button>
        <button
          className="mb-btn mb-btn--outline mb-btn--sm"
          title="Share"
          style={{ gap: "var(--spacing-02)" }}
        >
          <Share2 size={14} />
          Share
        </button>
      </div>
    </header>
  );
}

/* ========================================================================
   MAIN PAGE COMPONENT
   ======================================================================== */
export default function ScenarioModeling() {
  const badgeVariant =
    CONFIDENCE_STATUS === "Final" ? "mb-badge--success" : "mb-badge--warning";

  return (
    <div
      style={{
        backgroundColor: "var(--bg)",
        minHeight: "100vh",
      }}
    >
      <GlobalNav title="Fund Scenario Modeling" />
      {/* ================================================================
          ZONE 1 — SIGNAL BAR
          ================================================================ */}
      <div
        style={{
          backgroundColor: "var(--bg-layer-01)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        {/* ── Top bar: section label (left) + confidence signal (right) ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: H_PAD,
            paddingRight: H_PAD,
            paddingTop: "var(--spacing-06)",
            paddingBottom: "var(--spacing-04)",
          }}
        >
          {/* Section label */}
          <span
            style={{
              fontSize: "var(--text-xl)",
              fontWeight: "var(--weight-semibold)",
              color: "var(--text-primary)",
            }}
          >
            {SECTION_LABEL}
          </span>

          {/* Confidence signal */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-02)",
              fontSize: "var(--text-xs)",
              color: "var(--text-secondary)",
            }}
          >
            <span>{CONFIDENCE_LABEL} ·</span>
            <span className={`mb-badge ${badgeVariant}`}>
              {CONFIDENCE_STATUS}
            </span>
          </div>
        </div>

        {/* ── Scenario cards row ─────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-05)",
            paddingLeft: H_PAD,
            paddingRight: H_PAD,
            paddingTop: "var(--spacing-04)",
            paddingBottom: "var(--spacing-06)",
          }}
        >
          <ScenarioCard scenario={{ ...BASE, variant: "base" }} />
          <ScenarioCard scenario={{ ...DOWN, variant: "downside" }} />
          <ScenarioCard scenario={{ ...UP, variant: "upside" }} />
        </div>

      </div>

      {/* ================================================================
          Zone 2 — Full Comparison Grid — to be implemented in next session
          ================================================================ */}
      <div
        style={{
          minHeight: 600,
          backgroundColor: "var(--bg)",
          border: "1px dashed var(--border-subtle)",
          margin: "var(--spacing-07)",
          borderRadius: "var(--card-radius)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "var(--text-xs)",
            color: "var(--text-tertiary)",
          }}
        >
          Zone 2 placeholder
        </span>
      </div>
    </div>
  );
}
