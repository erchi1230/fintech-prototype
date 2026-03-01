export default function Portfolio() {
  return (
    <main className="mb-content">
      <div className="mb-page-header">
        <h1 className="mb-page-header__title">Portfolio</h1>
        <div className="mb-page-header__actions">
          <button className="mb-btn mb-btn--outline mb-btn--sm">Filter</button>
          <button className="mb-btn mb-btn--primary mb-btn--sm">Add Company</button>
        </div>
      </div>

      <div className="mb-toolbar">
        <div className="mb-toolbar__group">
          <input
            type="text"
            className="mb-input"
            placeholder="Search portfolio companies..."
            style={{ maxWidth: "20rem" }}
          />
        </div>
      </div>

      <div className="mb-card">
        <div className="mb-card__body">
          <p className="text-text-tertiary">Portfolio companies table will go here.</p>
        </div>
      </div>
    </main>
  );
}
