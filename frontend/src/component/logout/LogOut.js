import "../logout/LogOut.scss";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const LogOut = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    let navigate = useNavigate();

    useEffect(() => {
        const cookiesBlock = document.cookie.split(";");
        const cookies2 = document.cookie;
        cookiesBlock.forEach((cookie) => {
          const [name, value] = cookie.split("=");
        });
      }, [handleRemoveCookie]);

    function handleRemoveCookie (){
      removeCookie('tokenType', {path: '/'})
      removeCookie('accessToken', {path: '/'})

      navigate('/auth')
    }
    return(
        <button className="header__logOut" onClick={handleRemoveCookie}>
            Выход
        </button>
    )
}