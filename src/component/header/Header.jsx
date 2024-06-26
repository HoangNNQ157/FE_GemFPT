import React from "react";
import { blankAvatar } from "../../data/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./Header.css";

export default function Header({ page }) {
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
            <div className="header-sort-by">
              <div>SORT BY</div> 
              <Icon className="icon-down" icon="teenyicons:down-solid" />
            </div>
           
          </div>
        </div>
        <div className="header-right">
          <div className="header-profile">
            <div className="profile-avatar">
              <img src={blankAvatar} className="avatar-img" alt="Avatar" />
            </div>
            <div className="profile-info">
              <div className="profile-name">KEVIN BRUNO</div>
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

