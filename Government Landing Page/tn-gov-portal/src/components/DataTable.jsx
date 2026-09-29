export default function DataTable({ title, columns, rows, onEdit, onDelete }) {
  return (
    <div className="table-card">
      <h3>{title}</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              {columns.map((c) => (
                <th key={c.label}>{c.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="empty">
                  No data added yet
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={r.id}>
                  <td>{i + 1}</td>
                  {columns.map((c) => (
                    <td key={c.label}>{c.render(r)}</td>
                  ))}
                  <td>
                    <button className="edit" onClick={() => onEdit(r)}>Edit</button>
                    <button className="del" onClick={() => onDelete(r.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
