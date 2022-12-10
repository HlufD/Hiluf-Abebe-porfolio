import { useState, useMemo } from "react";
let render = 0;
function SortedList({ list }) {
  console.log("function rendererd");

  const sortedList = useMemo(() => {
    console.log("Runnig sort", render++);
    return [...list].sort();
  }, [list]);

  return (
    <div>
      <p>{list.join(",")}</p>
      <p>{sortedList.join(",")}</p>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  // example one
  const [numbers] = useState([10, 12, 13]);
  const total = useMemo(() => {
    return numbers.reduce((acc, number) => acc + number, 0);
  }, [numbers]);

  //example 2
  // the array is allrady sorted so it is not good to do the sort evry time the state changes or component rerenderd
  const Names = ["Abebe", "Hluf", "Zelalem"];

  return (
    <div>
      <p>{total}</p>
      <p>{count}</p>
      <SortedList list={Names} />
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

export default App;

//usememo uses the concept of memoazation or uses calculated value unless the dependacy changes in somehow
