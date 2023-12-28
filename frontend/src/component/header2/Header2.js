import "../header2/header2.scss";
import { DropdownHeader } from "../dropdownHeader/Dropdown";
import { Logo } from "../logo/Logo";
import { ContactsHeader } from "../headerCont/ContactHeader";
import { motion } from "framer-motion";

 const Header2 = (props) => {
  return (
    <header className="h-2">
      <motion.div
        className="header__wrapper flex justif-ss-betw align-cent container"
      >
        <DropdownHeader setState={props.setState} state={props.state} />
        <Logo />
        <ContactsHeader />
      </motion.div>
    </header>
  );
};

export default Header2;
