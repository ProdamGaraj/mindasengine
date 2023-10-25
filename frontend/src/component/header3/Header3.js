import { DropdownHeader } from "../dropdownHeader/Dropdown";
import { Logo } from "../logo/Logo";
import { LogOut } from "../logout/LogOut";
import { useLocation } from "react-router";

export const Header3 = () => {
  const { pathname } = useLocation();
  return (
    <header className="flex justif-ss-betw align-cent container container-admin">
      <DropdownHeader />
      <Logo />
      {"/auth" !== pathname ? <LogOut /> : <div> </div>}
    </header>
  );
};
