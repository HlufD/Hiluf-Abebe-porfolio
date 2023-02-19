import React from "react";
import { FaAngleRight } from "react-icons/fa";
function List(props) {
  const { text, value, Icon } = props;
  return (
    <li className="list-wrapper">
      <i className="about-icon"> {Icon}</i>
      <span>{text}:</span>
      {value}
    </li>
  );
}

export default List;
