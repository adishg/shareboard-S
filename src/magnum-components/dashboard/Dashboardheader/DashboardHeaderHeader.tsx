/*
 *   Copyright (c) 2021
 *   All rights reserved.
 */
import React from "react";
import "./DashboardHeader.scss";
import { signOut } from "./../../../services/auth-service";

export const DashboardHeader: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-md custom-navbar navbar-dark">
      <img
        className="logo-image"
        src={`${window.location.origin}/logo-180x180.png`}
        alt=""
      />
      <button
        className="navbar-toggler navbar-toggler-right custom-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span className="navbar-toggler-icon "></span>
      </button>
      <div className="collapse navbar-collapse " id="collapsibleNavbar">
        <form className="form-inline mr-auto">
          <div className="form-group has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <input type="text" className="form-control" placeholder="Search" />
          </div>
        </form>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className=" btn btn-bd-primary">
              <span className="fa fa-plus"> </span>Invite members
            </a>
          </li>
          <li className="nav-item">
            <a className=" btn btn-bd-primary bluefill">Upgrade</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span className="fa fa-question largeicon"> </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span className="fa fa-bell largeicon"> </span>
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => {
                signOut();
              }}
              className="nav-link"
              href="#"
            >
              <span className="largeicon">SA</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
