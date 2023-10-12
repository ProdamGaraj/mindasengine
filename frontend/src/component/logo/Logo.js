import LogoImg from "../../img/logo2.png";
import LogoText from "../../img/logo2text.png";

export const Logo = () => {
    return(
        <>
            <a href="/" className="flex align-cent" style={{gap:'10px'}}>
                <img src={LogoImg} alt="" style={{maxHeight:'44px', maxWidth:'44px'}}/>
                <img src={LogoText} alt="" style={{maxHeight:'44px', maxWidth:'215px'}}/>
            </a>
        </>
    )
}