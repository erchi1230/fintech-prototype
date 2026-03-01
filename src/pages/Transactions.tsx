export default function Transactions() {
  return (
    <main className="mb-content">
      <div className="mb-page-header">
        <h1 className="mb-page-header__title">Transactions</h1>
        <div className="mb-page-header__actions">
          <button className="mb-btn mb-btn--outline mb-btn--sm">Export CSV</button>
          <button className="mb-btn mb-btn--primary mb-btn--sm">New Transaction</button>
        </div>
      </div>

      <div className="mb-toolbar">
        <div className="mb-toolbar__group">
          <input
            type="text"
            className="mb-input"
            placeholder="Search transactions..."
            style={{ maxWidth: "16rem" }}
          />
          <select className="mb-input mb-select" style={{ maxWidth: "10rem" }}>
            <option>All Types</option>
            <option>Capital Call</option>
            <option>Distribution</option>
            <option>Management Fee</option>
          </select>
        </div>
      </div>

      <div className="mb-card">
        <div className="mb-card__body">
          <p className="text-text-tertiary">Transactions table will go here.</p>
        </div>
      </div>
    </main>
  );
}
