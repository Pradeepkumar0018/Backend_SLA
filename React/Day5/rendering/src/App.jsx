function App() {

  let studentName = "Bala";
  let age = 22;
  let course = "React";
  let fees = 15000;

  return (
    <div>
      <h2>{studentName}</h2>

      <p>Age: {age}</p>
      <p>Course: {course}</p>
      <p>Fees: {fees}</p>
    </div>
  );
}

export default App;