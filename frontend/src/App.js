import { Header } from "./component/header/Header";
import { Header2 } from "./component/header2/Header2";
import { Admin } from "./pages/admin/Admin";
import { BrowserRouter } from "react-router-dom";
import { Main } from "./pages/main/Main";
import { Footer } from "./component/footer/Footer";

function App() {
  const bodyLock = () => {
    document.body.classList.toggle('lock');
  }

  return (
    <div className="App">
      <Header 
        bodyLock={bodyLock}
      />
      <Header2 />
      
     {/* <BrowserRouter>
          <Admin/>
          </BrowserRouter>
      */}

      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
