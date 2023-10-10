import { Header } from "./component/header/Header";
import { Header2 } from "./component/header2/Header2";
import { Header3 } from "./component/header3/Header3";
import { Admin } from "./pages/admin/Admin";
import { BrowserRouter } from "react-router-dom";
import { Main } from "./pages/main/Main";
import { Footer } from "./component/footer/Footer";
import { Auth } from "./pages/auth/Auth";
import { Route, Routes } from "react-router-dom";

function App() {
  const bodyLock = () => {
    document.body.classList.toggle('lock');
  }

  return (
    <div className="App">
      <Routes>
        <Route 
          path="/"
          element={
            <>
              <Header/>
                <Main/>
              <Footer/>
            </>
          }
        />
          <Route
            path="admin/*"
            element={
              <Admin/>
            }
          />
          <Route
            path="auth"
            element={
              <Auth/>
            }
          />
      </Routes>
      {/*<Header3 />*/}
    </div>
  );
}

export default App;
