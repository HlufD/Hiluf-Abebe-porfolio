import React from "react";
import { FaAngleRight } from "react-icons/fa";
function List(props) {
  const { text, value } = props;
  return (
    <li>
      <FaAngleRight className="about-icon" />
      <span>{text}:</span>
      {value}
    </li>
  );
}

export default List;
