import { Header3 } from "../../component/header3/Header3";
import { FormEdit } from "../../component/formEdit/FormEdit";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../admin/admin.scss";

 const AdminEdit = (props) => {
    let { state } = useLocation();
    let navigate = useNavigate();
    //console.log(state);
    useEffect(() => {
      if (state == null) {
        navigate("/adminmain");
      }
    }, []);
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
        {state == null ? navigate('/adminmain') : <FormEdit state={state}/>}
      </main>
    </>
  );
};

export default AdminEdit;