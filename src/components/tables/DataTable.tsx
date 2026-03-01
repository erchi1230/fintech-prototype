/**
 * Generic DataTable component wrapping @tanstack/react-table
 * with Maybern DS styling (.mb-table classes).
 *
 * TODO: Implement with ColumnDef<T> generics and full table features.
 */
export default function DataTablePlaceholder() {
  return (
    <div className="mb-table-wrapper">
      <table className="mb-table">
        <thead className="mb-table__head">
          <tr>
            <th className="mb-table__header">Column</th>
            <th className="mb-table__header">Column</th>
            <th className="mb-table__header">Column</th>
          </tr>
        </thead>
        <tbody>
          <tr className="mb-table__row">
            <td className="mb-table__cell" colSpan={3}>
              <span className="text-text-tertiary">Connect to @tanstack/react-table</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
