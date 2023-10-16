import LogoImg from "../../img/logo.svg";

export const Logo = () => {
    return(
        <>
            <a href="/" className="flex align-cent" style={{gap:'10px'}}>
               <img src={LogoImg} alt="" />
            </a>
        </>
    )
}