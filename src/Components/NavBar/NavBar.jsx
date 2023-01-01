import { React, useRef } from "react";
import Styles from "./NavBar.module.css";

import { FaSearch } from "react-icons/fa";
function NavBar(props) {
  const searchRef = useRef(null);

  const searchHandler = (e) => {
    // e.preventDefault();
    props.setSearchItem(searchRef.current.value);
    // console.log(searchRef.current.value);

    // searchRef.current.value = "";

  };
  return (
    <div className={Styles.NavBar__container}>
      <div className={Styles.NavBar__logo}>ToDoist</div>
      <div className={Styles.NavBar__search_container}>
        <input
          type="text"
          placeholder="Search Title here"
          pattern="/\d+$/g"
          ref={searchRef}
          onChange={searchHandler}
        />
      </div>
    </div>
  );
}

export default NavBar;
