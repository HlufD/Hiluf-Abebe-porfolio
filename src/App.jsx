import { useState } from "react";
import Counter from "./Comp/Counter";

function NameList() {
  const [list, setlist] = useState(["Hluf", "Abebe", "Derbew"]);
  let [name, setName] = useState("");

  function addlistList() {
    setlist([...list, name]);
    setName("");
  }

  return (
    <div>
      <ul>
        {list.map((list, index) => {
          return <li key={index}>{list}</li>;
        })}
      </ul>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn" onClick={addlistList}>
        Add Name
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Counter />
      <NameList />
    </div>
  );
}

export default App;
