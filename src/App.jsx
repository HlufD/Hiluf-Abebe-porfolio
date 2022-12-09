import { useState, useReducer } from "react";

function UserForm() {
  const [state, dispach] = useReducer(
    (state, action) => {
      return { ...state, ...action };
    },
    {
      first: "",
      last: "",
    }
  );
  return (
    <div>
      <input
        type="text"
        value={state.first}
        onChange={(e) => dispach({ first: e.target.value })}
      />
      <input
        type="text"
        value={state.last}
        onChange={(e) => dispach({ last: e.target.value })}
      />
      <p>{state.first}</p>
      <p>{state.last}</p>
    </div>
  );
}

function NameList() {
  const [state, dispach] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_NAME":
          return { ...state, name: action.payload };
        case "ADD_NAME":
          return {
            ...state,
            names: [...state.names, action.payload],
            name: "",
          };
      }
    },
    {
      names: [],
      name: "",
    }
  );

  return (
    <div className="App">
      <input
        type="text"
        value={state.name}
        onChange={(e) => dispach({ type: "SET_NAME", payload: e.target.value })}
      />
      <button
        onClick={() => dispach({ type: "ADD_NAME", payload: state.name })}
      >
        Add Name
      </button>
      {state.names.length === 0 ? (
        <p>Empty Name List</p>
      ) : (
        state.names.map((name, index) => <p key={index}>{name}</p>)
      )}
    </div>
  );
}

function App() {
  return (
    <>
      <UserForm />
      <NameList />
    </>
  );
}

export default App;
