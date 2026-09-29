const issues = [
  { icon: "💧", title: "Water Scarcity", text: "Cauvery sharing and summer drinking water shortage in many districts." },
  { icon: "🌊", title: "Floods & Cyclones", text: "Chennai and coastal districts face heavy monsoon flooding every year." },
  { icon: "🌾", title: "Farmer Support", text: "Irrigation, crop insurance and fair prices for delta farmers." },
  { icon: "🚧", title: "Road Safety", text: "Damaged roads and high accident rates on highways." },
  { icon: "🗑️", title: "Waste Management", text: "Solid waste and Kodungaiyur/Perungudi dumpyard problems." },
  { icon: "⚡", title: "Power & Energy", text: "Peak demand, outages and shift to renewable energy." },
];

export default function Issues() {
  return (
    <section id="issues" className="section">
      <h2>Key Issues in Tamil Nadu</h2>
      <div className="issue-grid">
        {issues.map((i) => (
          <div className="issue-card" key={i.title}>
            <span>{i.icon}</span>
            <h4>{i.title}</h4>
            <p>{i.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
