import { Route, Routes, RedirectFunction } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import React from "react";

import { useState } from "react";

const AdminPage = React.lazy(() => import("./pages/adminMain/AdminMain"));
const MainPage = React.lazy(() => import("./pages/main/Main"));
const Header2 = React.lazy(() => import("./component/header2/Header2"));
const Footer = React.lazy(() => import("./component/footer/Footer"));

const AdminAuthPage = lazy(() => import("./pages/auth/Auth"));
const AdminAddPage = lazy(() => import("./pages/admin/Admin"));
const AdminEditPage = lazy(() => import("./pages/admidEdit/AdminEdit"));

function App() {
  const [state, setState] = useState({
    language: "RU",
  });
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <div className="overflow">
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<></>}>
                <Header2 setState={setState} state={state} />
                <MainPage language={state.language} />
                <Footer />
              </Suspense>
            }
          />
          <Route
            path="adminmain/add"
            element={
              <Suspense fallback={<></>}>
                <AdminAddPage />
              </Suspense>
            }
          />
          <Route
            path="adminmain/*"
            element={
              <Suspense fallback={<></>}>
                <AdminPage />
              </Suspense>
            }
          />
          <Route
            path="auth"
            element={
              <Suspense fallback={<></>}>
                <AdminAuthPage />
              </Suspense>
            }
          />
          <Route
            path="adminmain/edit"
            element={
              <Suspense fallback={<></>}>
                <AdminEditPage />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
