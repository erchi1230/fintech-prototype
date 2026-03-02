import { useState, useCallback, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, MessageSquare, ChevronDown, Info, Users } from "lucide-react";

/*
 * ScenarioModeling.tsx
 * Fund Scenario Modeling Tool
 *
 * Zone 1 — Fixed comparison panel (sticky below GlobalNav)
 * Zone 2 — Scenario Assumptions & Sensitivity
 * Zone 3 — Fund Performance Full Breakdown (expandable rows)
 *
 * NOTE: No --transition-* tokens exist in the design system.
 * Chevron and row animations use 0.2s ease / 0.15s ease as safe defaults.
 */

/* ── Layout constants — shared across all zones ───────────────────── */
const H_PAD     = "var(--spacing-07)";  /* 24px — aligns with GlobalNav */
const LABEL_COL = "13rem";              /* fixed label column width       */
const GRID_COLS = `${LABEL_COL} 1fr 1fr 1fr`;

/* ── Zone 1 data ──────────────────────────────────────────────────── */
const SCENARIOS = [
  {
    key: "base", label: "Base Case",
    irr: "18.2%",  irrDelta: null,         irrUp: null,
    moic: "2.0x",  moicDelta: null,        moicUp: null,
    lpDist: "$1.85B", lpDistDelta: null,      lpDistUp: null,
    gpDist: "$80M",   gpDistDelta: null,      gpDistUp: null,
    mgmtFee: "$75M",  mgmtFeeDelta: null,     mgmtFeeUp: null as null | boolean | "neutral",
  },
  {
    key: "up",   label: "Upside",
    irr: "27.6%",  irrDelta: "+9.4pp",     irrUp: true,
    moic: "2.5x",  moicDelta: "+0.5x",     moicUp: true,
    lpDist: "$2.28B", lpDistDelta: "+$0.43B", lpDistUp: true,
    gpDist: "$160M",  gpDistDelta: "+$80M",   gpDistUp: true,
    mgmtFee: "$60M",  mgmtFeeDelta: "−$15M",  mgmtFeeUp: "neutral" as const,
  },
  {
    key: "down", label: "Downside",
    irr: "11.4%",  irrDelta: "−6.8pp",     irrUp: false,
    moic: "1.5x",  moicDelta: "−0.5x",     moicUp: false,
    lpDist: "$1.40B", lpDistDelta: "−$0.45B", lpDistUp: false,
    gpDist: "$0",     gpDistDelta: "−$80M",   gpDistUp: false,
    mgmtFee: "$105M", mgmtFeeDelta: "+$30M",  mgmtFeeUp: "neutral" as const,
  },
];

const CONFIDENCE_LABEL = "Last calculated: Jun 30, 2025 at 9:42am";
const SECTION_LABEL     = "Performance By Scenarios";
/* ── Zone 2 data ──────────────────────────────────────────────────── */
type SensRow = { key: string; irr: string; delta: string | null };

const SENSITIVITY_EXIT: SensRow[] = [
  { key: "base", irr: "18.2%", delta: null },
  { key: "up",   irr: "24.1%", delta: "↑ 5.9pp" },
  { key: "down", irr: "13.8%", delta: "↓ 4.4pp" },
];

const SENSITIVITY_HOLD: SensRow[] = [
  { key: "base", irr: "18.2%", delta: null },
  { key: "up",   irr: "21.3%", delta: "↑ 3.1pp" },
  { key: "down", irr: "15.6%", delta: "↓ 2.6pp" },
];


/* ── Zone 3 data ──────────────────────────────────────────────────── */
type StepDef = {
  label: string;
  values: [string, string, string];   /* [base, upside, downside] */
  isConclusion?: boolean;             /* last step — styled distinctly  */
  warningColIndex?: number;           /* col idx gets error color text   */
  tooltipColIndex?: number;           /* col idx gets inline info icon   */
  tooltipContent?: string;
};

type MetricDef = {
  key: string;
  label: string;
  values: [string, string, string];
  deltas: [string, string, string];   /* [base always "—", upside, downside] */
  steps: StepDef[];
  footnote?: string;
};

const LP_METRICS: MetricDef[] = [
  {
    key: "net-irr",
    label: "Net IRR",
    values: ["18.2%", "27.6%", "11.4%"],
    deltas: ["—", "↑ 9.4pp vs. Base", "↓ 6.8pp vs. Base"],
    steps: [
      { label: "Total Capital Invested",   values: ["$1.00B",  "$1.00B",  "$1.00B"]  },
      { label: "Exit Multiple Applied",    values: ["2.0x",    "2.5x",    "1.5x"]    },
      { label: "Gross Exit Proceeds",      values: ["$2.00B",  "$2.50B",  "$1.50B"]  },
      { label: "Management Fees Deducted", values: ["−$75M",   "−$60M",   "−$105M"]  },
      { label: "Net Proceeds to Fund",     values: ["$1.93B",  "$2.44B",  "$1.40B"]  },
      { label: "GP Carry Deducted",        values: ["−$80M",   "−$160M",  "$0"]      },
      { label: "Net Proceeds to LPs",      values: ["$1.85B",  "$2.28B",  "$1.40B"]  },
      { label: "Hold Period Applied",      values: ["5 years", "4 years", "7 years"] },
      { label: "Net IRR to LPs",           values: ["18.2%",   "27.6%",   "11.4%"],   isConclusion: true },
    ],
  },
  {
    key: "gross-moic",
    label: "Gross MOIC",
    values: ["2.0x", "2.5x", "1.5x"],
    deltas: ["—", "↑ 0.5x vs. Base", "↓ 0.5x vs. Base"],
    steps: [
      { label: "Total Capital Invested", values: ["$1.00B", "$1.00B", "$1.00B"] },
      { label: "Exit Multiple Applied",  values: ["2.0x",   "2.5x",   "1.5x"]   },
      { label: "Gross Exit Proceeds",    values: ["$2.00B", "$2.50B", "$1.50B"] },
      { label: "Gross MOIC to LPs",      values: ["2.0x",   "2.5x",   "1.5x"],   isConclusion: true },
    ],
  },
  {
    key: "lp-dist",
    label: "Total LP Distributions",
    values: ["$1.85B", "$2.28B", "$1.40B"],
    deltas: ["—", "+ $0.43B vs. Base", "− $0.45B vs. Base"],
    steps: [
      { label: "Gross Exit Proceeds",      values: ["$2.00B", "$2.50B", "$1.50B"] },
      { label: "Management Fees Deducted", values: ["−$75M",  "−$60M",  "−$105M"] },
      { label: "GP Carry Deducted",        values: ["−$80M",  "−$160M", "$0"]     },
      { label: "Total LP Distributions",   values: ["$1.85B", "$2.28B", "$1.40B"], isConclusion: true },
    ],
  },
];

const GP_METRICS: MetricDef[] = [
  {
    key: "gp-dist",
    label: "Total GP Distributions",
    values: ["$80M", "$160M", "$0"],
    deltas: ["—", "+ $80M vs. Base", "− $80M vs. Base"],
    steps: [
      { label: "Net Proceeds to Fund",             values: ["$1.93B",    "$2.44B",  "$1.40B"]      },
      { label: "Return of LP Capital",             values: ["−$1.00B",   "−$1.00B", "−$1.00B"]     },
      { label: "Preferred Return Hurdle Check",    values: ["Cleared",   "Cleared", "Not cleared"], warningColIndex: 2 },
      { label: "Carry Eligible Proceeds",          values: ["$0.93B",    "$1.44B",  "$0"]           },
      { label: "Carried Interest Rate",            values: ["20%",       "20%",     "20%"]          },
      { label: "Total GP Distributions",           values: ["$80M",      "$160M",   "$0"],
        isConclusion: true,
        tooltipColIndex: 2,
        tooltipContent: "Hurdle rate not cleared in downside scenario — no carry earned",
      },
    ],
  },
  {
    key: "mgmt-fee",
    label: "Total Management Fee",
    values: ["$75M", "$60M", "$105M"],
    deltas: ["—", "− $15M vs. Base", "+ $30M vs. Base"],
    steps: [
      { label: "Total Capital Invested",      values: ["$1.00B",  "$1.00B",  "$1.00B"]  },
      { label: "Annual Fee Rate",             values: ["1.5%",    "1.5%",    "1.5%"]    },
      { label: "Quarterly Fee",               values: ["$3.75M",  "$3.75M",  "$3.75M"]  },
      { label: "Number of Quarters",          values: ["20",      "16",      "28"]       },
      { label: "Total Management Fee", values: ["$75M",    "$60M",    "$105M"],    isConclusion: true },
    ],
    footnote: "Management fee total varies across scenarios because hold period determines number of quarters fees are charged.",
  },
];

/* ========================================================================
   SHARED PRIMITIVES
   ======================================================================== */



/* ========================================================================
   SHARED PRIMITIVES (incl. tooltip)
   ======================================================================== */

type MbTooltipContextValue = {
  open: boolean;
  setOpen: (next: boolean) => void;
};

const MbTooltipContext = createContext<MbTooltipContextValue | null>(null);

function useMbTooltipContext() {
  const ctx = useContext(MbTooltipContext);
  if (!ctx) {
    throw new Error("MbTooltip components must be used within <MbTooltip>");
  }
  return ctx;
}

function MbTooltip({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <MbTooltipContext.Provider value={{ open, setOpen }}>
      <span className="mb-tooltip-root" data-open={open ? "true" : "false"}>
        {children}
      </span>
    </MbTooltipContext.Provider>
  );
}

function MbTooltipTrigger({ children }: { children: React.ReactNode }) {
  const { setOpen } = useMbTooltipContext();
  return (
    <span
      className="mb-tooltip-trigger"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
    </span>
  );
}

function MbTooltipContent({ children }: { children: React.ReactNode }) {
  const { open } = useMbTooltipContext();
  return (
    <span
      className="mb-tooltip-panel"
      role="tooltip"
      aria-hidden={open ? "false" : "true"}
    >
      {children}
    </span>
  );
}

/* ========================================================================
   ZONE 1 HELPERS
   ======================================================================== */

type ScenarioRow = typeof SCENARIOS[number];

function deltaBadgeStyle(isUp: boolean | null | "neutral"): React.CSSProperties {
  if (isUp === true)      return { backgroundColor: "var(--bg-brand-light)",     color: "var(--interactive)" };
  if (isUp === false)     return { backgroundColor: "var(--support-error-light)", color: "var(--support-error-dark)" };
  if (isUp === "neutral") return { backgroundColor: "var(--bg-layer-02)",         color: "var(--text-secondary)" };
  return {};
}

type MetricKey = "irr" | "moic" | "lpDist" | "gpDist" | "mgmtFee";

type MetricConfig = {
  key: MetricKey;
  label: string;
  tooltip?: string;
  tooltipWidth?: "wide";
  values: (s: ScenarioRow) => string;
  delta: (s: ScenarioRow) => string | null;
  isUp: (s: ScenarioRow) => boolean | null | "neutral";
};

const METRIC_OPTIONS: MetricConfig[] = [
  {
    key: "irr",
    label: "Net IRR",
    values: (s) => s.irr,
    delta: (s) => s.irrDelta,
    isUp: (s) => s.irrUp,
  },
  {
    key: "moic",
    label: "Gross MOIC to LP",
    values: (s) => s.moic,
    delta: (s) => s.moicDelta,
    isUp: (s) => s.moicUp,
  },
  {
    key: "lpDist",
    label: "Total LP Distributions",
    values: (s) => s.lpDist,
    delta: (s) => s.lpDistDelta,
    isUp: (s) => s.lpDistUp,
  },
  {
    key: "gpDist",
    label: "Total GP Distributions",
    tooltip: "Carried Interest Rate is 20%",
    values: (s) => s.gpDist,
    delta: (s) => s.gpDistDelta,
    isUp: (s) => s.gpDistUp,
  },
  {
    key: "mgmtFee",
    label: "Total Management Fee",
    tooltip: "1.5% on total capital invested, charged quarterly",
    tooltipWidth: "wide",
    values: (s) => s.mgmtFee,
    delta: (s) => s.mgmtFeeDelta,
    isUp: (s) => s.mgmtFeeUp,
  },
];

const PRIMARY_METRIC_LABELS: Record<MetricKey, string> = {
  irr: "Net IRR",
  moic: "Gross MOIC",
  lpDist: "LP Dist.",
  gpDist: "GP Dist.",
  mgmtFee: "Mgmt. Fee",
};

function ComparisonPanel() {
  const [selectedMetricKey, setSelectedMetricKey] = useState<MetricKey>("irr");
  const [menuOpen, setMenuOpen] = useState(false);

  const selectedMetric = METRIC_OPTIONS.find((m) => m.key === selectedMetricKey)!;

  const dataRows = METRIC_OPTIONS.filter((m) => m.key !== selectedMetricKey);

  // #region agent log
  fetch('http://127.0.0.1:7942/ingest/61cf5694-de5f-4e03-9d6a-04e56dd22888', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Debug-Session-Id': '565fd3',
    },
    body: JSON.stringify({
      sessionId: '565fd3',
      runId: 'tooltip-width-debug',
      hypothesisId: 'H1',
      location: 'ScenarioModeling.tsx:ComparisonPanel',
      message: 'ComparisonPanel tooltip rows rendered',
      data: {
        tooltipLabels: dataRows.filter(r => r.tooltip).map(r => r.label),
        tooltips: dataRows.filter(r => r.tooltip).map(r => r.tooltip),
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion agent log

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: GRID_COLS,
        paddingLeft: H_PAD,
        paddingRight: H_PAD,
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      {/* Section header band — column labels for metrics and scenarios */}
      <div
        style={{
          gridColumn: "1 / -1",
          marginLeft: `calc(-1 * ${H_PAD})`,
          marginRight: `calc(-1 * ${H_PAD})`,
          paddingLeft: H_PAD,
          paddingRight: H_PAD,
          paddingTop: 0,
          paddingBottom: 0,
          backgroundColor: "var(--bg-layer-02)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
          display: "grid",
          gridTemplateColumns: GRID_COLS,
        }}
      >
        <div
          className="type-label-02"
          style={{
            color: "var(--text-secondary)",
            textAlign: "right",
            paddingTop: "var(--spacing-02)",
            paddingBottom: "var(--spacing-02)",
            paddingRight: "var(--spacing-05)",
          }}
        >
          Metrics
        </div>
        {SCENARIOS.map((s) => (
          <div
            key={s.key}
            className="type-label-02"
            style={{
              color: "var(--text-secondary)",
              textTransform: "uppercase",
              paddingTop: "var(--spacing-02)",
              paddingBottom: "var(--spacing-02)",
              paddingLeft: "var(--spacing-05)",
              borderLeft: "1px solid var(--border-subtle)",
            }}
          >
            {s.label}
          </div>
        ))}
      </div>

      {/* Primary metric — headline metric with ghost dropdown trigger */}
      <div
        style={{
          textAlign: "right",
          paddingRight: "var(--spacing-05)",
          paddingTop: "var(--spacing-05)",
          paddingBottom: "var(--spacing-05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        <button
          type="button"
          className="type-heading-06"
          onClick={() => setMenuOpen((open) => !open)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--spacing-02)",
            padding: "var(--spacing-02) var(--spacing-03)",
            borderRadius: "var(--radius-md)",
            border: "none",
            background: menuOpen ? "var(--bg-hover)" : "transparent",
            color: "var(--text-secondary)",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {PRIMARY_METRIC_LABELS[selectedMetricKey]}
          <ChevronDown size={16} />
        </button>
        {menuOpen && (
          <div className="mb-dropdown" style={{ minWidth: "14rem" }}>
            <div className="mb-dropdown__label">Primary metric</div>
            {METRIC_OPTIONS.map((metric) => (
              <button
                key={metric.key}
                type="button"
                className="mb-dropdown__item"
                onClick={() => {
                  setSelectedMetricKey(metric.key);
                  setMenuOpen(false);
                }}
                style={
                  metric.key === selectedMetricKey
                    ? { backgroundColor: "var(--bg-selected)" }
                    : undefined
                }
              >
                <span style={{ flex: 1 }}>{metric.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {SCENARIOS.map((s) => (
        <div
          key={s.key}
          className="type-kpi"
          style={{
            color: "var(--text-primary)",
            paddingTop: "var(--spacing-05)",
            paddingBottom: "var(--spacing-05)",
            paddingLeft: "var(--spacing-05)",
            borderLeft: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-03)",
          }}
        >
          {selectedMetric.values(s)}
          {selectedMetric.delta(s) && (
            <span
              className="mb-badge type-caption-01"
              style={{
                ...deltaBadgeStyle(selectedMetric.isUp(s)),
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {selectedMetric.delta(s)}
            </span>
          )}
        </div>
      ))}

      {/* Compact data rows — body text, tabular */}
      {dataRows.map((row) => (
        <>
          <div
            key={`${row.label}-label`}
            className="type-body-02"
            style={{
              color: "var(--text-secondary)",
              textAlign: "right",
              paddingRight: "var(--spacing-05)",
              paddingTop: "var(--spacing-03)",
              paddingBottom: "var(--spacing-03)",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "var(--spacing-02)",
            }}
          >
            {row.tooltip && (
              <MbTooltip>
                <MbTooltipTrigger>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      color: "var(--text-tertiary)",
                      flexShrink: 0,
                    }}
                  >
                    <Info size={12} />
                  </span>
                </MbTooltipTrigger>
                <MbTooltipContent>{row.tooltip}</MbTooltipContent>
              </MbTooltip>
            )}
            {row.label}
          </div>
          {SCENARIOS.map((s) => (
            <div
              key={`${row.label}-${s.key}`}
              className="type-body-02"
              style={{
                color: "var(--text-primary)",
                fontVariantNumeric: "tabular-nums",
                fontWeight: "var(--weight-medium)",
                paddingTop: "var(--spacing-03)",
                paddingBottom: "var(--spacing-03)",
                paddingLeft: "var(--spacing-05)",
                borderLeft: "1px solid var(--border-subtle)",
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-02)",
              }}
            >
              {row.values(s)}
              {row.delta(s) && (
                <span className="mb-badge type-caption-01" style={{ ...deltaBadgeStyle(row.isUp(s)), fontVariantNumeric: "tabular-nums" }}>
                  {row.delta(s)}
                </span>
              )}
            </div>
          ))}
        </>
      ))}
    </div>
  );
}

/* ========================================================================
   ZONE 1 — Fixed comparison panel
   ======================================================================== */
function Zone1() {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-layer-01)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: H_PAD,
          paddingRight: H_PAD,
          paddingTop: "var(--spacing-05)",
          paddingBottom: "var(--spacing-05)",
        }}
      >
        <span className="type-heading-06" style={{ color: "var(--text-primary)" }}>
          {SECTION_LABEL}
        </span>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="type-caption-01" style={{ color: "var(--text-secondary)" }}>{CONFIDENCE_LABEL}</span>
        </div>
      </div>
      <ComparisonPanel />
    </div>
  );
}

/* ========================================================================
   ZONE 2 HELPERS
   ======================================================================== */

/*
 * Z2GroupBand — full-width group label band inside a padded grid.
 * Negative margins bleed background flush to the container edges.
 */
function Z2GroupBand({ label }: { label: string }) {
  return (
    <div
      style={{
        gridColumn: "1 / -1",
        marginLeft: "calc(-1 * var(--spacing-07))",
        marginRight: "calc(-1 * var(--spacing-07))",
        paddingLeft: "var(--spacing-07)",
        paddingRight: "var(--spacing-07)",
        paddingTop: "var(--spacing-02)",
        paddingBottom: "var(--spacing-02)",
        backgroundColor: "var(--bg)",
      }}
    >
      <span
        className="type-caption-01"
        style={{ color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}
      >
        {label}
      </span>
    </div>
  );
}

/*
 * Z2AssumpRow — assumption value row (4 direct grid children).
 * Body-02, medium weight, primary color — high visual weight.
 */
function Z2AssumpRow({ label, values }: { label: string; values: [string, string, string] }) {
  return (
    <>
      <div
        className="type-body-02"
        style={{
          color: "var(--text-primary)",
          fontWeight: "var(--weight-medium)",
          textAlign: "right",
          paddingRight: "var(--spacing-05)",
          paddingTop: "var(--spacing-03)",
          paddingBottom: "var(--spacing-02)",
        }}
      >
        {label}
      </div>
      {values.map((v, i) => (
        <div
          key={i}
          className="type-body-02"
          style={{
            color: "var(--text-primary)",
            fontWeight: "var(--weight-medium)",
            fontVariantNumeric: "tabular-nums",
            paddingTop: "var(--spacing-03)",
            paddingBottom: "var(--spacing-02)",
          }}
        >
          {v}
        </div>
      ))}
    </>
  );
}

/*
 * Z2SensSubRow — isolated sensitivity sub-row (4 direct grid children).
 * Caption-01, secondary color, italic label — visually subordinate to
 * the assumption row above it. Label indented 16px from standard edge.
 * Background: bg-layer-03 — distinguishes from Zone 2 surface.
 * Deltas: secondary color, no color valence (directional arrows only).
 */
function Z2SensSubRow({ data }: { data: SensRow[] }) {
  return (
    <>
      {/* Label: indented 16px beyond standard paddingRight */}
      <div
        style={{
          backgroundColor: "var(--bg-layer-03)",
          textAlign: "right",
          paddingRight: "var(--spacing-08)",  /* 32px = standard 16px + 16px indent */
          paddingTop: "var(--spacing-02)",
          paddingBottom: "var(--spacing-03)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
        }}
      >
        <span className="type-caption-01" style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>
          IRR if only this changes
        </span>
      </div>

      {/* Value cells: value stacked above optional delta */}
      {data.map((s) => (
        <div
          key={s.key}
          style={{
            backgroundColor: "var(--bg-layer-03)",
            paddingTop: "var(--spacing-02)",
            paddingBottom: "var(--spacing-03)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-01)",
          }}
        >
          <span
            className="type-caption-01"
            style={{ color: "var(--text-secondary)", fontVariantNumeric: "tabular-nums" }}
          >
            {s.irr}
          </span>
          {s.delta && (
            <span className="type-caption-01" style={{ color: "var(--text-secondary)" }}>
              {s.delta}
            </span>
          )}
        </div>
      ))}
    </>
  );
}

/* Thin 50%-opacity divider between assumption blocks */
function Z2BlockDivider() {
  return (
    <div
      style={{
        gridColumn: "1 / -1",
        height: 1,
        backgroundColor: "var(--border-subtle)",
        opacity: 0.5,
      }}
    />
  );
}

/* ========================================================================
   ZONE 2 — Scenario Assumptions & Sensitivity
   ======================================================================== */
function Zone2() {
  return (
    <div style={{ backgroundColor: "var(--bg-layer-02)" }}>

      {/* Section header */}
      <div
        style={{
          paddingLeft: H_PAD,
          paddingRight: H_PAD,
          paddingTop: "var(--spacing-05)",
          paddingBottom: "var(--spacing-05)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <span className="type-heading-06" style={{ color: "var(--text-primary)" }}>
          Scenario Assumptions &amp; Sensitivity
        </span>
      </div>

      {/* ── Group 1: Variable Assumptions & Sensitivity ──────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: GRID_COLS,
          paddingLeft: H_PAD,
          paddingRight: H_PAD,
          paddingTop: "var(--spacing-04)",
          paddingBottom: "var(--spacing-03)",
        }}
      >
        {/* Column headers */}
        <div style={{ paddingBottom: "var(--spacing-03)" }} />
        {SCENARIOS.map((s) => (
          <div
            key={s.key}
            className="type-label-02"
            style={{ color: "var(--text-secondary)", textTransform: "uppercase", paddingBottom: "var(--spacing-03)" }}
          >
            {s.label}
          </div>
        ))}

        <Z2GroupBand label="Variable Assumptions &amp; Sensitivity" />

        {/* Exit Multiple block */}
        <Z2AssumpRow label="Exit Multiple" values={["2.0x", "2.5x", "1.5x"]} />
        <Z2SensSubRow data={SENSITIVITY_EXIT} />

        <Z2BlockDivider />

        {/* Hold Period block */}
        <Z2AssumpRow label="Hold Period" values={["5 years", "4 years", "7 years"]} />
        <Z2SensSubRow data={SENSITIVITY_HOLD} />
      </div>

      {/* ── Held Constant band — full width, outside grid ────────────── */}
      <div
        style={{
          paddingLeft: H_PAD,
          paddingRight: H_PAD,
          paddingTop: "var(--spacing-04)",
          paddingBottom: "var(--spacing-04)",
          backgroundColor: "var(--bg-layer-03)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <span className="type-caption-01" style={{ color: "var(--text-tertiary)" }}>
          Held constant across all scenarios: Management Fee 1.5% quarterly · Carried Interest 20% · Total Capital Invested $1,000,000,000
        </span>
      </div>

      {/* ── Group 2: Combined Effect ──────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: GRID_COLS,
          paddingLeft: H_PAD,
          paddingRight: H_PAD,
          paddingTop: "var(--spacing-03)",
          paddingBottom: "var(--spacing-04)",
        }}
      >
        <Z2GroupBand label="Combined Effect" />

        {/* Label: Actual Scenario Net IRR + sublabel */}
        <div
          className="type-body-02"
          style={{
            color: "var(--text-secondary)",
            textAlign: "right",
            paddingRight: "var(--spacing-05)",
            paddingTop: "var(--spacing-03)",
            paddingBottom: "var(--spacing-03)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-01)", alignItems: "flex-end" }}>
            <span style={{ fontWeight: "var(--weight-medium)", color: "var(--text-primary)" }}>
              Actual Scenario Net IRR
            </span>
            <span className="type-caption-01" style={{ color: "var(--text-tertiary)", fontStyle: "italic", fontWeight: "normal" }}>
              Both levers moving simultaneously
            </span>
          </div>
        </div>

        {/* Base Case — anchor value, no delta */}
        <div
          style={{ paddingTop: "var(--spacing-03)", paddingBottom: "var(--spacing-03)" }}
        >
          <span
            className="type-body-02"
            style={{ color: "var(--text-primary)", fontWeight: "var(--weight-medium)", fontVariantNumeric: "tabular-nums" }}
          >
            18.2%
          </span>
        </div>

        {/* Upside — muted green delta (color valence appropriate for final output) */}
        <div
          style={{
            paddingTop: "var(--spacing-03)",
            paddingBottom: "var(--spacing-03)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-01)",
          }}
        >
          <span
            className="type-body-02"
            style={{ color: "var(--text-primary)", fontWeight: "var(--weight-medium)", fontVariantNumeric: "tabular-nums" }}
          >
            27.6%
          </span>
          <span className="type-caption-01" style={{ color: "var(--interactive)" }}>
            ↑ 9.4pp vs. Base
          </span>
        </div>

        {/* Downside — muted red delta */}
        <div
          style={{
            paddingTop: "var(--spacing-03)",
            paddingBottom: "var(--spacing-03)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-01)",
          }}
        >
          <span
            className="type-body-02"
            style={{ color: "var(--text-primary)", fontWeight: "var(--weight-medium)", fontVariantNumeric: "tabular-nums" }}
          >
            11.4%
          </span>
          <span className="type-caption-01" style={{ color: "var(--support-error-dark)" }}>
            ↓ 6.8pp vs. Base
          </span>
        </div>

        {/* Footnote — full width */}
        <div
          style={{
            gridColumn: "1 / -1",
            marginTop: "var(--spacing-03)",
            paddingTop: "var(--spacing-04)",
            paddingBottom: "var(--spacing-02)",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <span className="type-caption-01" style={{ color: "var(--text-tertiary)", fontStyle: "italic" }}>
            The difference between isolated sensitivity and combined effect reflects the interaction of both levers moving simultaneously.
          </span>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================
   ZONE 3 HELPERS
   ======================================================================== */

/*
 * StepDivider — thin 50%-opacity rule between expanded calculation steps.
 * opacity applied to the element itself, content is just a 1px line.
 */
function StepDivider() {
  return (
    <div
      style={{
        height: 1,
        backgroundColor: "var(--border-subtle)",
        opacity: 0.5,
      }}
    />
  );
}

/*
 * Zone3GroupBand — full-width group label band.
 * Zone 3 background is --bg (page canvas), so the band uses --bg-layer-02
 * to provide subtle lift above the page background.
 */
function Zone3GroupBand({ label }: { label: string }) {
  return (
    <div
      style={{
        paddingLeft: H_PAD,
        paddingRight: H_PAD,
        paddingTop: "var(--spacing-02)",
        paddingBottom: "var(--spacing-02)",
        backgroundColor: "var(--bg-layer-02)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <span
        className="type-caption-01"
        style={{ color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}
      >
        {label}
      </span>
    </div>
  );
}

/*
 * MetricRow — a single expandable metric row for Zone 3.
 *
 * Renders as a self-contained full-width block with an internal 4-column
 * grid that matches Zone 1/2 column widths for visual alignment.
 *
 * Collapsed: metric name + chevron | 3 values | delta sub-row
 * Expanded:  header row (subtle bg) + calculation steps + optional footnote
 *
 * Click target: full header row (not chevron only)
 */
function MetricRow({ metric, expanded, onToggle }: {
  metric: MetricDef;
  expanded: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const headerBg = expanded
    ? "var(--bg-layer-02)"
    : hovered
    ? "var(--bg-hover)"
    : "transparent";

  return (
    <div>
      {/* ── Metric header row (clickable) ─────────────────────────────── */}
      <div
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "grid",
          gridTemplateColumns: GRID_COLS,
          paddingLeft: H_PAD,
          paddingRight: H_PAD,
          cursor: "pointer",
          backgroundColor: headerBg,
          borderBottom: expanded ? "1px solid var(--border-subtle)" : "none",
          transition: "background-color 0.15s ease",
        }}
      >
        {/* Label cell */}
        <div
          className="type-body-02"
          style={{
            color: "var(--text-primary)",
            fontWeight: "var(--weight-medium)",
            textAlign: "right",
            paddingRight: "var(--spacing-05)",
            paddingTop: "var(--spacing-03)",
            paddingBottom: "var(--spacing-03)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "var(--spacing-02)",
          }}
        >
          {metric.label}
          <ChevronDown
            size={14}
            style={{
              color: hovered ? "var(--text-secondary)" : "var(--text-tertiary)",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease, color 0.15s ease",
              flexShrink: 0,
            }}
          />
        </div>

        {/* Value cells — left-aligned, matching Zone 1 and Zone 2 */}
        {metric.values.map((val, i) => (
          <div
            key={i}
            className="type-body-02"
            style={{
              color: "var(--text-primary)",
              fontWeight: "var(--weight-medium)",
              fontVariantNumeric: "tabular-nums",
              paddingTop: "var(--spacing-03)",
              paddingBottom: "var(--spacing-03)",
            }}
          >
            {val}
          </div>
        ))}
      </div>

      {/* ── Delta sub-row ─────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: GRID_COLS,
          paddingLeft: H_PAD,
          paddingRight: H_PAD,
          backgroundColor: expanded ? "var(--bg-layer-02)" : "transparent",
        }}
      >
        <div style={{ paddingBottom: "var(--spacing-03)" }} />
        {metric.deltas.map((delta, i) => (
          <div
            key={i}
            className="type-caption-01"
            style={{
              color: i === 0 ? "var(--text-tertiary)" : "var(--text-secondary)",
              paddingBottom: "var(--spacing-03)",
            }}
          >
            {delta}
          </div>
        ))}
      </div>

      {/* ── Expanded calculation steps ─────────────────────────────────── */}
      {expanded && (
        <div style={{ backgroundColor: "var(--bg-layer-02)", paddingBottom: "var(--spacing-03)" }}>
          {metric.steps.map((step, stepIdx) => (
            <div key={stepIdx}>
              {stepIdx > 0 && <StepDivider />}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: GRID_COLS,
                  paddingLeft: H_PAD,
                  paddingRight: H_PAD,
                  backgroundColor: step.isConclusion ? "var(--bg-layer-01)" : "transparent",
                }}
              >
                {/* Step label — indented, italic caption */}
                <div
                  className="type-caption-01"
                  style={{
                    color: "var(--text-secondary)",
                    fontStyle: "italic",
                    fontWeight: step.isConclusion ? "var(--weight-medium)" : undefined,
                    textAlign: "right",
                    paddingRight: "var(--spacing-05)",
                    paddingLeft: "var(--spacing-07)",
                    paddingTop: "var(--spacing-02)",
                    paddingBottom: "var(--spacing-02)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  {step.label}
                </div>

                {/* Step value cells */}
                {step.values.map((val, colIdx) => {
                  const isWarning = step.warningColIndex === colIdx;
                  const hasTooltip = step.tooltipColIndex === colIdx && !!step.tooltipContent;

                  return (
                    <div
                      key={colIdx}
                      className={step.isConclusion ? "type-body-02" : "type-caption-01"}
                      style={{
                        color: isWarning ? "var(--support-error-dark)" : "var(--text-primary)",
                        fontWeight: step.isConclusion ? "var(--weight-medium)" : undefined,
                        fontVariantNumeric: "tabular-nums",
                        paddingTop: "var(--spacing-02)",
                        paddingBottom: "var(--spacing-02)",
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--spacing-01)",
                      }}
                    >
                      {val}
                      {hasTooltip && (
                        <span title={step.tooltipContent} style={{ display: "inline-flex", cursor: "help" }}>
                          <Info size={12} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Footnote — full-width, below all steps */}
          {metric.footnote && (
            <div
              style={{
                paddingLeft: H_PAD,
                paddingRight: H_PAD,
                paddingTop: "var(--spacing-03)",
                paddingBottom: "var(--spacing-02)",
                borderTop: "1px solid var(--border-subtle)",
                marginTop: "var(--spacing-02)",
              }}
            >
              <span className="type-caption-01" style={{ color: "var(--text-tertiary)", fontStyle: "italic" }}>
                {metric.footnote}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ========================================================================
   ZONE 3 — Fund Performance Full Breakdown
   ======================================================================== */
function Zone3() {
  /* Each key maps to whether that metric row is expanded */
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = useCallback((key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <div style={{ backgroundColor: "var(--bg)" }}>

      {/* Section header */}
      <div
        style={{
          paddingLeft: H_PAD,
          paddingRight: H_PAD,
          paddingTop: "var(--spacing-05)",
          paddingBottom: "var(--spacing-05)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <span className="type-heading-06" style={{ color: "var(--text-primary)" }}>
          Fund Performance — Full Breakdown
        </span>
      </div>

      {/* Column headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: GRID_COLS,
          paddingLeft: H_PAD,
          paddingRight: H_PAD,
          paddingTop: "var(--spacing-04)",
          paddingBottom: "var(--spacing-03)",
        }}
      >
        <div />
        {SCENARIOS.map((s) => (
          <div
            key={s.key}
            className="type-label-02"
            style={{
              color: "var(--text-secondary)",
              textTransform: "uppercase",
            }}
          >
            {s.label}
          </div>
        ))}
      </div>

      {/* LP Returns group */}
      <Zone3GroupBand label="LP Returns" />
      {LP_METRICS.map((metric, i) => (
        <div key={metric.key}>
          {i > 0 && (
            <div style={{ height: 1, backgroundColor: "var(--border-subtle)", marginLeft: H_PAD, marginRight: H_PAD }} />
          )}
          <MetricRow
            metric={metric}
            expanded={!!expanded[metric.key]}
            onToggle={() => toggle(metric.key)}
          />
        </div>
      ))}

      {/* GP Economics group */}
      <Zone3GroupBand label="GP Economics" />
      {GP_METRICS.map((metric, i) => (
        <div key={metric.key}>
          {i > 0 && (
            <div style={{ height: 1, backgroundColor: "var(--border-subtle)", marginLeft: H_PAD, marginRight: H_PAD }} />
          )}
          <MetricRow
            metric={metric}
            expanded={!!expanded[metric.key]}
            onToggle={() => toggle(metric.key)}
          />
        </div>
      ))}

      {/* Bottom breathing room */}
      <div style={{ height: "var(--spacing-10)" }} />
    </div>
  );
}

/* ========================================================================
   STANDALONE GLOBAL NAV
   ======================================================================== */
function GlobalNav({ title }: { title: string }) {
  const navigate = useNavigate();

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "var(--topbar-height)",
        paddingLeft: H_PAD,
        paddingRight: H_PAD,
        backgroundColor: "var(--bg-layer-01)",
        borderBottom: "1px solid var(--border-subtle)",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <button
        className="mb-btn mb-btn--outline"
        onClick={() => navigate(-1)}
        style={{ gap: "var(--spacing-02)" }}
      >
        <ArrowLeft size={16} />
        Back
      </button>

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

      <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-03)" }}>
        <button className="mb-btn mb-btn--outline mb-btn--icon" title="Settings">
          <Settings size={16} />
        </button>
        <button className="mb-btn mb-btn--outline mb-btn--icon" title="Comments">
          <MessageSquare size={16} />
        </button>
        <button className="mb-btn mb-btn--outline" title="Share" style={{ gap: "var(--spacing-02)" }}>
          <Users size={16} />
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
  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      <GlobalNav title="Fund Scenario Modeling" />
      <Zone1 />
      <Zone2 />
      <Zone3 />
    </div>
  );
}
