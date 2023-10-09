import "../admin/admin.scss";
import { FormNews } from "../../component/form/fromNews";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const Admin = () => {
  const { pathname } = useLocation();

  useEffect(() => console.log(pathname));

  return (
    <main className="adminPage container">
      <ul className="flex admin__nav">
        <Link
          to="/news"
          className={"/news" === pathname ? "active" : ""}
        >
          новость
        </Link>
        <Link
          to="/project"
          className={"/project" === pathname ? "active" : ""}
        >
          проект
        </Link>
      </ul>
      <Routes>
        <Route path="/project" element={<>Lorem.</>} />
        <Route path="/news" element={<FormNews />} />
      </Routes>
    </main>
  );
};
