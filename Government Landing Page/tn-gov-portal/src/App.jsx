import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Issues from "./components/Issues";
import DataTable from "./components/DataTable";
import FormModal from "./components/FormModal";

export default function App() {
  const [categories, setCategories] = useLocalStorage("categories", []);
  const [departments, setDepartments] = useLocalStorage("departments", []);
  const [services, setServices] = useLocalStorage("services", []);
  const [modal, setModal] = useState(null); // { type, data }

  const setters = { category: setCategories, department: setDepartments, service: setServices };
  const nameOf = (list, id) => list.find((x) => x.id === id)?.name || "-";

  // add or update
  const handleSave = (type, item) => {
    const set = setters[type];
    if (item.id) set((list) => list.map((x) => (x.id === item.id ? item : x)));
    else set((list) => [...list, { ...item, id: Date.now() }]);
    setModal(null);
  };

  // delete (with cascade)
  const handleDelete = (type, id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    if (type === "category") {
      const depIds = departments.filter((d) => d.categoryId === id).map((d) => d.id);
      setCategories((c) => c.filter((x) => x.id !== id));
      setDepartments((d) => d.filter((x) => x.categoryId !== id));
      setServices((s) => s.filter((x) => !depIds.includes(x.departmentId)));
    } else if (type === "department") {
      setDepartments((d) => d.filter((x) => x.id !== id));
      setServices((s) => s.filter((x) => x.departmentId !== id));
    } else {
      setServices((s) => s.filter((x) => x.id !== id));
    }
  };

  return (
    <>
      <Navbar />
      <Banner onAdd={(type) => setModal({ type, data: null })} />

      <section id="department" className="section">
        <h2>Categories & Departments</h2>
        <DataTable
          title="Category List"
          columns={[
            { label: "Category Name", render: (r) => r.name },
            {
              label: "Status",
              render: (r) => (
                <span className={`badge ${r.status === "Active" ? "on" : "off"}`}>{r.status}</span>
              ),
            },
          ]}
          rows={categories}
          onEdit={(r) => setModal({ type: "category", data: r })}
          onDelete={(id) => handleDelete("category", id)}
        />
        <DataTable
          title="Department List"
          columns={[
            { label: "Department Name", render: (r) => r.name },
            { label: "Category", render: (r) => nameOf(categories, r.categoryId) },
          ]}
          rows={departments}
          onEdit={(r) => setModal({ type: "department", data: r })}
          onDelete={(id) => handleDelete("department", id)}
        />
      </section>

      <section id="services" className="section">
        <h2>Services</h2>
        <DataTable
          title="Service List"
          columns={[
            { label: "Service Name", render: (r) => r.name },
            { label: "Department", render: (r) => nameOf(departments, r.departmentId) },
          ]}
          rows={services}
          onEdit={(r) => setModal({ type: "service", data: r })}
          onDelete={(id) => handleDelete("service", id)}
        />
      </section>

      <Issues />

      <footer className="footer">© 2026 TN Gov Connect | Government of Tamil Nadu (Demo Project)</footer>

      {modal && (
        <FormModal
          type={modal.type}
          data={modal.data}
          categories={categories}
          departments={departments}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
