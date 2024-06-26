import React, { useState } from "react";
import { blankAvatar } from "../../data/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./Header.css";

export default function Header({ page }) {
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);

  const toggleSortDropdown = () => {
    setSortDropdownVisible(!sortDropdownVisible);
  };

  return (
    <div>
      <div className="header-container">
        <div className="header-left">
          <div className="header-page-title">
            {page}
          </div>
          <div className="header-search-sort">
            <input
              className="header-search-input"
              placeholder="SEARCH"
            />
            <div className="header-sort-by" onClick={toggleSortDropdown}>
              <div>SORT BY</div> 
              <Icon className="icon-down" icon="teenyicons:down-solid" />
              {sortDropdownVisible && (
                <div className="sort-dropdown">
                  <div className="sort-option">Ascending</div>
                  <div className="sort-option">Decrease</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="header-right">
          <div className="header-profile">
            <div className="profile-avatar">
              <img src={blankAvatar} className="avatar-img" alt="Avatar" />
            </div>
            <div className="profile-info">
              <div className="profile-name">Nguyen Minh Hieu</div>
              <div className="profile-counter">counter : 5</div>
              <div className="profile-role">
                <span>STAFF</span> 
                <Icon className="icon-exit" icon="mingcute:exit-line" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
