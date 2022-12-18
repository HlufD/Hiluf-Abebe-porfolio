import { myContext } from "../context/myContext";
import { useContext } from "react";
const Input = ({ label, linkto, type, name }) => {
  const context = useContext(myContext);
  const { setEmail, email, onChangeHandler } = context;
  return (
    <div className="input-wrapper">
      <input
        className="input"
        type={type}
        id={`#${linkto}`}
        name={name}
        onChange={onChangeHandler}
        value={email[name]}
        placeholder=" "
      />
      <span className="label" htmlFor={`${linkto}`}>
        {label}
      </span>
    </div>
  );
};

export default Input;
