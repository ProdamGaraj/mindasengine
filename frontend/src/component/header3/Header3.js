import { DropdownHeader } from "../dropdownHeader/Dropdown";
import { Logo } from "../logo/Logo";

export const Header3 = () => {
    return(
        <header className="flex justif-ss-betw align-cent container">
            <DropdownHeader/>
            <Logo/>
            <div>
            </div>
        </header>
    )
}