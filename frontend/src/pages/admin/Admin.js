import "../admin/admin.scss";
import { Link } from "react-router-dom";
import { Header3 } from "../../component/header3/Header3";
import { FormNews2 } from "../../component/form/formNews2";

 const Admin = () => {
  return (
    <>
    <Header3/>
      <main className="adminPage container container-admin">
      <div className="admin__public">
        <div className="public__title flex justif-ss-betw align-cent">
          <p>Новая публикация</p>
          <Link to='/adminmain'>
          <button>
            Отмена
          </button>
          </Link>
        </div>
      </div>
        <FormNews2 />
    </main>
    </>

  );
};

export default Admin