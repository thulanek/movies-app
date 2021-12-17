import React, { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const pageLinks: { name: string; link: string }[] = [
    { name: "popular", link: "/popular" },
    { name: "favourites", link: "/favourites" },
    { name: "about dev", link: "/about" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const overlayClass =
    "side-menu-overlay" + (menuOpen ? "" : " overlay-closed");

  const sideMenuClass =
    "side-menu-container" + (menuOpen ? " side-menu-open" : "");

  return (
    <header className="header-container">
      <Link to="/">
        <div className="header-logo-container">
          <div className="header-logo">home</div>
        </div>
      </Link>

      <div className="header-nav-links">
        {pageLinks.map(({ name, link }) => (
          <Link to={link} key={name}>
            <p className="header-nav-link">{name}</p>
          </Link>
        ))}
      </div>

      <div onClick={closeMenu} className={overlayClass}></div>

      <div onClick={toggleMenu} className="hamburger-toggle">
        <div className="hamburger-slice"></div>
        <div className="hamburger-slice"></div>
        <div className="hamburger-slice"></div>
      </div>

      <div className={sideMenuClass}>
        <div onClick={closeMenu} className="side-menu-logo">
          close
        </div>

        <Link to="/">
          <h3 onClick={closeMenu} className="side-menu-page-link">
            home
          </h3>
        </Link>
        {pageLinks.map(({ name, link }) => (
          <Link to={link} key={name}>
            <h3 onClick={closeMenu} className="side-menu-page-link">
              {name}
            </h3>
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
