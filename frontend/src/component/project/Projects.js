import "../project/projects.scss";

export const Projects = () => {
  const projectArray = [
    {
      projectName: "BilimBank",
      projectDesc:
        "ОписаниеОписаниеОписание ОписаниеОписаниеОписание ОписаниеОписаниеОписание",
      projectKind: "Разработка сайта",
      projectImg: "",
    },
    {
      projectName: "BilimBank",
      projectDesc:
        "ОписаниеОписаниеОписание ОписаниеОписаниеОписание ОписаниеОписаниеОписание",
      projectKind: "Чат-бот",
      projectImg: "",
    },
    {
      projectName: "BilimBank",
      projectDesc:
        "ОписаниеОписаниеОписание ОписаниеОписаниеОписание ОписаниеОписаниеОписание",
      projectKind: "Лэндинг",
      projectImg: "",
    },
  ];
  return (
    <div className="main__project container">
      <h1 className="preview__title">Наши проекты</h1>
      <ul className="project__list">
        {projectArray.map((el, i) => (
          <li className="item flex justif-ss-betw">
            <div className="item__info">
              <div className="info__name">{el.projectName}</div>
              <div className="info__desc">{el.projectDesc}</div>
            </div>
            <div className="item__img">
              <p>{el.projectKind}</p>
              <div className="img__list">
                <ul>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
