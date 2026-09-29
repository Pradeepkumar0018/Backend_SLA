import { useState } from "react";

const labels = { category: "Category", department: "Department", service: "Service" };

export default function FormModal({ type, data, categories, departments, onSave, onClose }) {
  const isEdit = Boolean(data);
  const [form, setForm] = useState(data || { status: "Active" });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const item = { ...form };
    if (type === "department") item.categoryId = Number(item.categoryId);
    if (type === "service") item.departmentId = Number(item.departmentId);
    onSave(type, item);
  };

  const missing =
    (type === "department" && categories.length === 0 && "Add a category first!") ||
    (type === "service" && departments.length === 0 && "Add a department first!");

  return (
    <div className="overlay" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h3>{isEdit ? "Edit" : "Add"} {labels[type]}</h3>

        {missing && <p className="warn">{missing}</p>}

        {type === "category" && (
          <>
            <label>Category Name</label>
            <input name="name" value={form.name || ""} onChange={change} required />
            <label>Category Status</label>
            <select name="status" value={form.status} onChange={change}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </>
        )}

        {type === "department" && (
          <>
            <label>Select Category</label>
            <select name="categoryId" value={form.categoryId || ""} onChange={change} required>
              <option value="">-- Select --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <label>Department Name</label>
            <input name="name" value={form.name || ""} onChange={change} required />
          </>
        )}

        {type === "service" && (
          <>
            <label>Service Name</label>
            <input name="name" value={form.name || ""} onChange={change} required />
            <label>Select Department</label>
            <select name="departmentId" value={form.departmentId || ""} onChange={change} required>
              <option value="">-- Select --</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </>
        )}

        <div className="modal-btns">
          <button type="button" className="cancel" onClick={onClose}>Cancel</button>
          <button type="submit" disabled={Boolean(missing)}>{isEdit ? "Update" : "Save"}</button>
        </div>
      </form>
    </div>
  );
}
