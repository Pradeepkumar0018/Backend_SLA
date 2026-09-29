export default function Banner({ onAdd }) {
  return (
    <header id="home" className="banner">
      <h1>Tamil Nadu Citizen Services Portal</h1>
      <p>
        From Cauvery water sharing and Chennai floods to farmer irrigation,
        road safety and waste management — one place to organise departments
        and services that solve Tamil Nadu's everyday public issues.
      </p>
      <div className="btn-group">
        <button onClick={() => onAdd("category")}>+ Add Category</button>
        <button onClick={() => onAdd("department")}>+ Add Department</button>
        <button onClick={() => onAdd("service")}>+ Add Services</button>
      </div>
    </header>
  );
}
