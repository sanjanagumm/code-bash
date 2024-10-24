import React from "react";
import "./Card.css";

function Card(props) {
  return (
    <div className="card" id={props.color}>
      <div className="icon">{props.icon}</div>
      <div className="text">
        <h3>{props.num}</h3>
        <p>{props.txt}</p>
      </div>
    </div>
  );
}

export default Card;
