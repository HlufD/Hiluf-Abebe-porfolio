import { useState } from "react";

function Counter() {
  let [counter, setCounter] = useState(0);

  function Increase() {
    setCounter(counter++);
  }

  return (
    <button className="btn" onClick={Increase}>
      Click me to Increase {counter}
    </button>
  );
}

export default Counter;
