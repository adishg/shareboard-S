/*
 *   Copyright (c) 2021
 *   All rights reserved.
 */
import React from "react";
import "./dashboardMain.scss";

export const DashboardMain: React.FC = () => {
  return (
    <div className="px-0 mainwrapper">
      <div className="row">
        <h3>Create a board</h3>
      </div>
      <div className="row">
        <div className="customcard bluefill">
          <a className="bluefill noborder text-center">
            <span className="fa fa-plus d-block"> </span>New Board
          </a>
        </div>
        <div className="customcard alignend">
          <div className="greybg">
            <span className="fa fa-plus"> </span>Quick retrospective
          </div>
        </div>
        <div className="customcard alignend">
          <div className="greybg">
            <span className="fa fa-plus"> </span>New requirement
          </div>
        </div>
        <div className="customcard alignend">
          <div className="greybg">
            <span className="fa fa-plus"> </span>Blank template
          </div>
        </div>
        <div className="customcard">
          <a className="noborder text-center">
            <span className="fa fa-ellipsis-h d-block"> </span>show all
            templates
          </a>
        </div>
      </div>
      <div className="row">
        <h3>All Boards</h3>
      </div>
      <div className="row">
        <div className="customcard largecard alignend">
          <div className="greybg">
            <span className="fa fa-plus"> </span>Quick retrospective
          </div>
        </div>
        <div className="customcard largecard alignend">
          <div className="greybg">
            <span className="fa fa-plus"> </span>New requirement
          </div>
        </div>
      </div>
    </div>
  );
};
