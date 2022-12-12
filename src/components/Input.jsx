const Input = ({ label, linkto, type }) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={`#${linkto}`}>{label}</label>
      <input type={type} id={`#${linkto}`} />
    </div>
  );
};

export default Input;
