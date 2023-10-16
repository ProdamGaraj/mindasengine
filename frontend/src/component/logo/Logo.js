import LogoImg from "../../img/logo.svg";
import LogoStart from "../../img/logo.png";

export const Logo = () => {
    return(
        <>
            <a href="/" className="flex align-cent" style={{gap:'10px'}}>
               <img src={LogoStart} alt="" />
            </a>
        </>
    )
}