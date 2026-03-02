import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, Share2, MessageSquare, TrendingDown, TrendingUp } from "lucide-react";

/*
 * ScenarioModeling.tsx
 * Fund Scenario Modeling Tool — Zone 1: Comparison Panel
 */

/* ── Data ─────────────────────────────────────────────────────────── */
const SCENARIOS = [
  { key: "base", label: "Base Case", irr: "18.2%", exitMultiple: "2.0x", hold: "5yr", lpDist: "$1.40B", delta: null as string | null },
  { key: "down", label: "Downside",  irr: "11.4%", exitMultiple: "1.5x", hold: "7yr", lpDist: "$1.12B", delta: "−6.8pts" },
  { key: "up",   label: "Upside",    irr: "27.6%", exitMultiple: "2.5x", hold: "4yr", lpDist: "$1.68B", delta: "+9.4pts" },
];

type ConfidenceStatus = "Final" | "Preliminary";
const CONFIDENCE_STATUS: ConfidenceStatus = "Final";
const CONFIDENCE_LABEL = "Last calculated: Jun 30, 2025 at 9:42am";
const SECTION_LABEL = "Net IRR Across Scenarios";
const FUND_CONTEXT = "Total Capital Invested: $1,000,000,000";

/* ── Horizontal padding matching the global topbar ──────────────── */
const H_PAD = "var(--spacing-07)";

/* ── Shared styles ───────────────────────────────────────────────── */
const LABEL_COL = "12rem";  /* fixed label column — wide enough for "Total LP Distributions" */

const labelCellStyle: React.CSSProperties = {
  fontSize: "var(--text-sm)",
  color: "var(--text-secondary)",
  display: "flex",
  alignItems: "center",
};

const valueCellStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

/* ── Divider spanning all 4 grid columns ─────────────────────────── */
function GridDivider() {
  return (
    <div
      style={{
        gridColumn: "1 / -1",
        height: 1,
        backgroundColor: "var(--border-subtle)",
      }}
    />
  );
}

/* ========================================================================
   COMPARISON PANEL
   4-column grid: Label col + Base / Downside / Upside
   ======================================================================== */
function ComparisonPanel() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${LABEL_COL} 1fr 1fr 1fr`,
        paddingLeft: H_PAD,
        paddingRight: H_PAD,
      }}
    >
      {/* ── ROW: Scenario headers ──────────────────────────────── */}
      <div style={{ paddingBottom: "var(--spacing-06)" }} />
      {SCENARIOS.map((s) => (
        <div key={s.key} style={{ paddingBottom: "var(--spacing-06)", ...valueCellStyle }}>
          <span
            style={{
              fontSize: "var(--text-xs)",
              fontWeight: "var(--weight-semibold)",
              color: "var(--text-primary)",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-wide)",
            }}
          >
            {s.label}
          </span>
        </div>
      ))}

      {/* ── DIVIDER 1 — below headers ──────────────────────────── */}
      <GridDivider />

      {/* ── ROW: Exit Multiple ─────────────────────────────────── */}
      <div style={{ ...labelCellStyle, padding: "var(--spacing-04) 0" }}>Exit Multiple</div>
      {SCENARIOS.map((s) => (
        <div key={s.key} style={{ ...valueCellStyle, padding: "var(--spacing-04) 0" }}>
          <span
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: "var(--weight-medium)",
              color: "var(--text-primary)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {s.exitMultiple}
          </span>
        </div>
      ))}

      {/* ── ROW: Hold Period ───────────────────────────────────── */}
      <div style={{ ...labelCellStyle, padding: "var(--spacing-04) 0 var(--spacing-06)" }}>Hold Period</div>
      {SCENARIOS.map((s) => (
        <div key={s.key} style={{ ...valueCellStyle, padding: "var(--spacing-04) 0 var(--spacing-06)" }}>
          <span
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: "var(--weight-medium)",
              color: "var(--text-primary)",
            }}
          >
            {s.hold}
          </span>
        </div>
      ))}

      {/* ── DIVIDER 2 — above outputs ──────────────────────────── */}
      <GridDivider />

      {/* ── ROW: Net IRR — dominant ────────────────────────────── */}
      <div style={{ ...labelCellStyle, padding: "var(--spacing-07) 0 var(--spacing-04)" }}>Net IRR</div>
      {SCENARIOS.map((s) => (
        <div key={s.key} style={{ ...valueCellStyle, padding: "var(--spacing-07) 0 var(--spacing-04)" }}>
          <span
            style={{
              fontSize: "var(--text-4xl)",
              fontWeight: "var(--weight-semibold)",
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--text-primary)",
              lineHeight: "var(--leading-tight)",
            }}
          >
            {s.irr}
          </span>
        </div>
      ))}

      {/* ── ROW: LP Distributions ──────────────────────────────── */}
      <div style={{ ...labelCellStyle, padding: "var(--spacing-03) 0" }}>Total LP Distributions</div>
      {SCENARIOS.map((s) => (
        <div key={s.key} style={{ ...valueCellStyle, padding: "var(--spacing-03) 0" }}>
          <span
            style={{
              fontSize: "var(--text-xl)",
              fontWeight: "var(--weight-medium)",
              color: "var(--text-secondary)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {s.lpDist}
          </span>
        </div>
      ))}

      {/* ── ROW: Delta ─────────────────────────────────────────── */}
      <div
        style={{
          ...labelCellStyle,
          padding: "var(--spacing-04) 0 var(--spacing-08)",
          fontSize: "var(--text-xs)",
          color: "var(--text-tertiary)",
        }}
      >
        vs. Base Case
      </div>
      {SCENARIOS.map((s) => (
        <div
          key={s.key}
          style={{
            ...valueCellStyle,
            padding: "var(--spacing-04) 0 var(--spacing-08)",
            gap: "var(--spacing-02)",
          }}
        >
          {s.delta === null ? (
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>—</span>
          ) : s.delta.startsWith("+") ? (
            <>
              <TrendingUp size={11} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>{s.delta}</span>
            </>
          ) : (
            <>
              <TrendingDown size={11} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>{s.delta}</span>
            </>
          )}
        </div>
      ))}
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
        className="mb-btn mb-btn--ghost"
        onClick={() => navigate(-1)}
        style={{ gap: "var(--spacing-02)", color: "var(--text-secondary)" }}
      >
        <ArrowLeft size={16} />
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
      <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-03)" }}>
        <button
          className="mb-btn mb-btn--outline mb-btn--icon"
          title="Settings"
        >
          <Settings size={16} />
        </button>
        <button
          className="mb-btn mb-btn--outline mb-btn--icon"
          title="Comments"
        >
          <MessageSquare size={16} />
        </button>
        <button
          className="mb-btn mb-btn--outline"
          title="Share"
          style={{ gap: "var(--spacing-02)" }}
        >
          <Share2 size={16} />
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
          ZONE 1 — COMPARISON PANEL
          ================================================================ */}
      <div
        style={{
          backgroundColor: "var(--bg-layer-01)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        {/* ── Top bar ─────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: H_PAD,
            paddingRight: H_PAD,
            paddingTop: "var(--spacing-07)",
            paddingBottom: "var(--spacing-06)",
          }}
        >
          {/* Left — zone label */}
          <span
            style={{
              fontSize: "var(--text-xl)",
              fontWeight: "var(--weight-semibold)",
              color: "var(--text-primary)",
            }}
          >
            {SECTION_LABEL}
          </span>

          {/* Right — fund context + confidence signal */}
          <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-05)" }}>
            <span
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--text-secondary)",
              }}
            >
              {FUND_CONTEXT}
            </span>
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
        </div>

        {/* ── Comparison panel grid ───────────────────────────────── */}
        <ComparisonPanel />
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
