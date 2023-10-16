import { Header3 } from "../../component/header3/Header3";
import { FormEdit } from "../../component/formEdit/FormEdit";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const AdminEdit = () => {
    let { state } = useLocation();
  return (
    <>
      <Header3 />

      <main className="adminPage container container-admin">
        <div className="admin__public">
          <div className="public__title flex justif-ss-betw align-cent">
            <p>Изменить публикацию</p>
            <Link to="/adminmain">
                <button>Отмена</button>
            </Link>
          </div>
        </div>
        <FormEdit 
          state={state}
        />
      </main>
    </>
  );
};
