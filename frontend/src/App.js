import { Header2 } from "./component/header2/Header2";
import { Admin } from "./pages/admin/Admin";
import { Main } from "./pages/main/Main";
import { Footer } from "./component/footer/Footer";
import { Auth } from "./pages/auth/Auth";
import { Route, Routes, RedirectFunction } from "react-router-dom";
import { AdminMain } from "./pages/adminMain/AdminMain";
import { lazy, Suspense } from "react";

import { useState } from "react";
import { AdminEdit } from "./pages/admidEdit/AdminEdit";



function App() {
  const [state, setState] = useState({
    language: "RU",
  });

  return (
    <div className="overflow">
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header2 setState={setState} state={state} />
                <Main language={state.language} />
                <Footer />
              </>
            }
          />
          <Route path="adminmain/add" element={<Admin />} />
          <Route path="adminmain/*" element={<AdminMain />} />
          <Route path="auth" element={<Auth />} />
          <Route path="adminmain/edit" element={<AdminEdit />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
