import { Header } from "./component/header/Header";
import { Header2 } from "./component/header2/Header2";
import { Header3 } from "./component/header3/Header3";
import { Admin } from "./pages/admin/Admin";
import { BrowserRouter } from "react-router-dom";
import { Main } from "./pages/main/Main";
import { Footer } from "./component/footer/Footer";
import { Auth } from "./pages/auth/Auth";

function App() {
  const bodyLock = () => {
    document.body.classList.toggle('lock');
  }

  return (
    <div className="App">
      {/*<Header/>*/}
      {/*<Header3 />*/}
     {/* <BrowserRouter>
          <Admin/>
          </BrowserRouter>
  */}
      {<Auth/>}
      {/*<Footer/>*/}
    </div>
  );
}

export default App;
