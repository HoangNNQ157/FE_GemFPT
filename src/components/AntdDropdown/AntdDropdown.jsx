// src/components/AntdDropdown/AntdDropdown.js

import { Button, Dropdown, Menu } from "antd";
import React from "react";
import { FaCaretDown } from "react-icons/fa";

const AntdDropdown = ({ title, menu }) => {
    return (
        <Dropdown overlay={menu} trigger={["click"]}>
            <Button
                style={{
                    border: "none",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                }}
            >
                {title} <FaCaretDown />
            </Button>
        </Dropdown>
    );
};

export default AntdDropdown;
