/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 *   Copyright (c) 2021
 *   All rights reserved.
 */
import React from "react";
import "./dashboardSidebar.scss";

export const DashboardSidebar: React.FC = () => {
  return (
    <div className="sidebarwrapper float-left">
      <div className="sidenavbar" id="sidebar-wrapper">
        <div className="list-group list-group-flush">
          <a href="#" className="sidebarlink active">
            <i className="fa fa-desktop"></i> All Boards
          </a>
          <a href="#" className="sidebarlink">
            <i className="fa fa-star"></i>Starred Boards
          </a>
          <div className="contentwrap">
            <div className="col-lg-4 col-md-4 col-xs-4 float-left pl-0">
              <h5>Projects</h5>
            </div>
            <div className="col-lg-8 col-md-8 col-xs-8 float-left pr-0">
              <a href="#" className=" btn btn-bd-primary">
                <span className="fa fa-plus"> </span>Add
              </a>
            </div>
          </div>
          <div className="contentwrap">
            <div className="col-lg-4 col-md-4 col-xs-4 float-left pl-0">
              <h5>Meetings</h5>
            </div>
            <div className="col-lg-8 col-md-8 col-xs-8 float-left pr-0">
              <a href="#" className=" btn btn-bd-primary">
                Scheule Now
              </a>
            </div>
          </div>
          <div id="calendar">{/* Calender to be added here */}</div>
          <div className="contentwrap noborder">
            <h5>15 April, 2021</h5>
            <div className="eachschedule">
              <div className="row">
                <h5>New project discsions</h5>
              </div>
              <div className="row smallfont">
                <div className="col-xl-8 col-md-8 col-sm-8 float-left px-0">
                  <p className="eachscheduletime">09:00 AM - 10:00 AM</p>
                </div>
                <div className="col-xl-4 col-md-4 col-sm-4 float-left px-0">
                  <p>2</p>
                </div>
              </div>
            </div>
            <div className="eachschedule">
              <div className="row">
                <h5>Sprint demo, retrospective</h5>
              </div>
              <div className="row smallfont">
                <div className="col-xl-8 col-md-8 col-sm-8 float-left px-0">
                  <p className="eachscheduletime">02:30 PM - 04:00 PM</p>
                </div>
                <div className="col-xl-4 col-md-4 col-sm-4 float-left px-0">
                  <p>2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
