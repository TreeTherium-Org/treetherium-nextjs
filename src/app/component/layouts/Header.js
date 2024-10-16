"use client";

import React, { useState } from "react";
import Link from "next/link";

const Header = (props) => {
  const [search, setSearch] = useState(false);

  const searchPopup = (
    <>
      <div
        className={search ? "body-overlay active" : "body-overlay"}
        id="body-overlay"
        onClick={() => setSearch(false)}
      />
      <div className={search ? "search-popup active" : "search-popup"} id="search-popup">
        <form className="search-form">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search....." />
          </div>
          <button type="button" className="submit-btn">
            <i className="fa fa-search" />
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {props.searchPopup ? searchPopup : null}
      <div className="header-area" style={{ backgroundImage: "url('/assets/img/bg/1.png')" }}>
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-3">
              <Link href="/" className="menu-back-page home-clicked">
                <i className="fa fa-angle-left" />
              </Link>
            </div>
            <div className="col-sm-4 col-6 text-center">
              <div className="page-name">{props.title}</div>
            </div>
            <div className="col-sm-4 col-3 text-right">
              {props.searchPopup ? (
                <div className="search header-search" onClick={() => setSearch(true)}>
                  <i className="fa fa-search" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Page Title */}
      <div className="page-title mg-top-50">
        <div className="container">
          <Link href="/" className="float-left home-clicked">Home</Link>
          <span className="float-right">{props.title}</span>
        </div>
      </div>
    </>
  );
};

export default Header;
