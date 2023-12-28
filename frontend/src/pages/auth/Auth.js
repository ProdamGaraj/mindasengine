import "../auth/auth.scss";
import { AuthForm } from "../../component/authForm/AuthForm";
import { BasicForm } from "../../component/authForm/AuthForm";
import { Header3 } from "../../component/header3/Header3";

const Auth = () => {
    return(
        <>
        <Header3/>
            <BasicForm />
        </>
    )
}

export default Auth