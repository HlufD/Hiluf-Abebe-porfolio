import { myContext } from "../context/myContext";
import { useContext } from "react";
const Input = ({ label, linkto, type, name }) => {
  const context = useContext(myContext);
  const { setEmail, email, onChangeHandler } = context;
  console.log(email);
  return (
    <div className="input-wrapper">
      <label htmlFor={`#${linkto}`}>{label}</label>
      <input
        type={type}
        id={`#${linkto}`}
        name={name}
        onChange={onChangeHandler}
        value={email[name]}
      />
    </div>
  );
};

export default Input;
