import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import React, { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return {
        right: !menuOpened && "-100%",
      };
    }
  };

  return (
    <div>
      <section className="h-wrapper">
        <div className="flexCenter paddings innerWidth h-container">
          <Link to="/">
            <img src="./logo.png" alt="logo" width={100} />
          </Link>

          <OutsideClickHandler
            onOutsideClick={() => {
              setMenuOpened(false);
            }}
          >
            <div
              className="flexCenter h-menu"
              style={getMenuStyles(menuOpened)}
            >
              <NavLink to="/properties">Properties</NavLink>
              <a href="mailto:phahlamoja08@gmail.com">Contact</a>
              <button className="button">Login</button>
            </div>
          </OutsideClickHandler>

          <div
            className="menu-icon"
            onClick={() => setMenuOpened((prev) => !prev)}
          >
            <BiMenuAltRight size={30} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
