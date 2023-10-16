import React from "react";
import { DropdownHeader } from "../dropdownHeader/Dropdown";
import { Logo } from "../logo/Logo";
import { ContactsHeader } from "../headerCont/ContactHeader";

import '../header/header.scss'; 

export const Header = () => {
    return(
        <header className="flex justif-ss-betw align-cent container">
            <DropdownHeader/>
            <Logo/>
            <ContactsHeader/>
        </header>
    )
}