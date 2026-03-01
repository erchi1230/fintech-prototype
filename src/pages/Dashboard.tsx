export default function Dashboard() {
  return (
    <main className="mb-content">
      <div className="mb-page-header">
        <h1 className="mb-page-header__title">Dashboard</h1>
        <div className="mb-page-header__actions">
          <button className="mb-btn mb-btn--outline mb-btn--sm">Export</button>
          <button className="mb-btn mb-btn--primary mb-btn--sm">New Transaction</button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="mb-kpi-grid">
        {["Total AUM", "Net IRR", "DPI", "TVPI"].map((label) => (
          <div key={label} className="mb-card mb-card--kpi">
            <div className="mb-card__header">
              <span className="mb-card__title">{label}</span>
            </div>
            <div className="mb-card__body">
              <div className="mb-card__value">—</div>
              <div className="mb-card__delta mb-card__delta--positive">Loading...</div>
            </div>
          </div>
        ))}
      </div>

      <hr className="mb-divider" />

      {/* Placeholder for charts and tables */}
      <div className="mb-card">
        <div className="mb-card__header">
          <span className="mb-card__title">Fund Performance</span>
        </div>
        <div className="mb-card__body">
          <p className="text-text-tertiary">Chart and data table will go here.</p>
        </div>
      </div>
    </main>
  );
}
