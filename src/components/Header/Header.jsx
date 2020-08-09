import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as $ from "jquery";
import { useEffect } from "react";
import "bootstrap";
import LogoIMG from "../../assets/images/logo.png";
import getHelp from "../../store/actions/getHelp";
import deleteHelp from "../../store/actions/deleteHelp";
import ShowHelp from "../Modals/ShowHelp/ShowHelp";
import logout from "../../store/actions/logout";
import getPost from "../../store/actions/getPost";
import { Link } from "react-router-dom";
import { CDN, REDUX_PAGE_HELPERS } from "../../store/CONSTANTS";

const Header = ({ noMargin, isSearch, assignmentMenu }) => {
  const { userDetails, helpArr, pageLoaders, notificationArr } = useSelector(
    (state) => state
  );
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getPost(1, search));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    $(function () {
      $('[data-toggle="popover"]').popover();
    });
    $(document).on("scroll", (e) => {
      const caroHeight = $(".header").outerHeight() + 30;
      if ($(document).scrollTop() >= caroHeight) {
        $(".header").addClass("active");
      } else {
        $(".header").removeClass("active");
      }
    });

    $("#helpDropdown").on("show.bs.dropdown", function () {
      dispatch(getHelp());
    });
  }, []);
  const chooseHelpItem = async (item) => {
    await dispatch({ type: REDUX_PAGE_HELPERS, value: { helpItem: item } });
    $("#showHelpModal").modal("show");
  };

  const handleASsignmentMenu = (_) => {
    $("#assignment-container").toggleClass("active");
  };

  const handleShowSearch = (_) => {
    $(".search-container").toggleClass("active");
    $(".search-container input").focus();
  };

  return (
    <header className={`header ${noMargin ? "mb-0" : ""}`}>
      <div className="header-col">
        {assignmentMenu && (
          <button className="assignment-open" onClick={handleASsignmentMenu}>
            <i className="fa fa-bars"></i>
          </button>
        )}
        <Link to="/">
          <img src={LogoIMG} className="header-logo" alt="" />
        </Link>
      </div>
      <div className="header-col">
        <div className="header-list">
          {isSearch && (
            <>
              <div
                className="header-list-item click"
                onClick={handleShowSearch}
              >
                <i className="fa fa-search" />
              </div>
              <div className="header-list-item seperator"></div>
            </>
          )}

          {/* Help Dropdown */}
          <div className="header-list-item dropdown" id="helpDropdown">
            <button className="dropdown-toggle without" data-toggle="dropdown">
              <i className="fa fa-question-circle" />
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="dropdown-header text-center">
                <button
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#helpModal"
                >
                  Need Help?
                </button>
              </div>
              {helpArr.length >= 1 && (
                <>
                  <div className="dropdown-divider"></div>
                  {pageLoaders.getHelp ? (
                    <div className="dropdown-item text-center">
                      <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    helpArr.map((item, index) => (
                      <div
                        key={index}
                        onClick={(_) => chooseHelpItem(item)}
                        className={`dropdown-item between ${
                          item.solution ? "" : "disabled"
                        }`}
                      >
                        <div className="d-flex align-items-center">
                          <button
                            onClick={(_) => dispatch(deleteHelp(item.id))}
                            className="btn ico text-danger mr-2"
                          >
                            <i className="fa fa-close text-danger"></i>
                          </button>
                          <span>{item.subject}</span>
                        </div>
                        {item.solution ? (
                          <div className="green-dot"></div>
                        ) : (
                          <div className="red-dot"></div>
                        )}
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </div>
          <div className="header-list-item seperator"></div>
          <div className="header-list-item dropdown">
            {notificationArr.length >= 1 ? (
              <button
                className="dropdown-toggle without"
                data-toggle="dropdown"
              >
                <i className="fa fa-bell" />
              </button>
            ) : (
              <button className="dropdown-toggle without">
                <i className="fa fa-bell" />
              </button>
            )}
            <div className="dropdown-menu dropdown-menu-right size-400">
              {notificationArr.map((item, index) => (
                <div key={index} className="dropdown-item start">
                  <img
                    src={item.image ? `${CDN}/${item.image}` : LogoIMG}
                    alt=""
                    className="notification-img"
                  />
                  <div className="notification-item">
                    <span className="notification-title">{item.title}</span>
                    <span className="notification-body">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="header-list-item seperator"></div>
          <div className="header-list-item dropdown">
            <button className="dropdown-toggle" data-toggle="dropdown">
              {userDetails.name}
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <Link to="/profile" className="dropdown-item">
                profile
              </Link>

              <Link to="/saved-posts" className="dropdown-item">
                saved posts
              </Link>

              <Link to="/assignments" className="dropdown-item">
                assignments
              </Link>

              {userDetails.role_type == "doctor" && (
                <button
                  data-toggle="modal"
                  data-target="#blockUnblockModal"
                  className="dropdown-item"
                >
                  block & inblock
                </button>
              )}
              <button
                data-toggle="modal"
                data-target="#aboutUsModal"
                className="dropdown-item"
              >
                About us
              </button>
              <button
                onClick={(_) => dispatch(logout())}
                className="dropdown-item"
              >
                logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <form className="search-container" onSubmit={handleSearch}>
        <input
          type="search"
          id="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>
          <i className="fa fa-search"></i>
        </button>
      </form>
    </header>
  );
};

export default Header;
