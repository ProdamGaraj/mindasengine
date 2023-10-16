import "../header2/header2.scss";
import { DropdownHeader } from "../dropdownHeader/Dropdown";
import { Logo } from "../logo/Logo";
import { HeaderNav } from "../headerNav/HeaderNav";
import { ContactsHeader } from "../headerCont/ContactHeader";

export const Header2 = () => {
    return(
        <header>
            <div className="header__wrapper flex justif-ss-betw align-cent container">
                <DropdownHeader/>
                <Logo/>
                <ContactsHeader/>
            </div>
        </header>
    )
}