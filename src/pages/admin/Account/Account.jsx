import React, { useEffect, useState } from "react";
import "./Account.css";
import TableAccountManager from "../../../components/TableManager/TableAccountManager";
import HeaderSearch from "../../../components/Header/HeaderSearch/HeaderSearch";
import useDebounce from "../../../hook/debound";

export default function Account() {
    return (
        <div>
            <TableAccountManager />
            
        </div>
    );
}
