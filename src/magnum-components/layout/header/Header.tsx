import React from "react";
import "./Header.scss";

export const Header: React.FC = () => {
  return (
    <header className="cmp-header">
      <nav className="navbar navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="/">
          <img src={`${window.location.origin}/logo-180x180.png`} alt="" />
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
        </a>
        <div
          className="container collapse navbar-collapse"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="/">
              Help
            </a>
            <a className="nav-link" href="/">
              Login
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};
