import React from 'react'
// import Styles from"./Button.module.css"
import './Button.css'
function Button(props) {
  return (
    <button
      className={`button__${props.Btntype}`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button