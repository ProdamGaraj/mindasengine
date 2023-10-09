import { Header } from "./component/header/Header";
import { Admin } from "./pages/admin/Admin";
import { BrowserRouter } from "react-router-dom";
import { Main } from "./pages/main/Main";

function App() {
  const bodyLock = () => {
    document.body.classList.toggle('lock');
  }

  return (
    <div className="App">
      <Header 
        bodyLock={bodyLock}
      />
      
     {/* <BrowserRouter>
          <Admin/>
          </BrowserRouter>
      */}

      <Main/>
    </div>
  );
}

export default App;
