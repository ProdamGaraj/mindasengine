import "../headerNav/headerNav.scss";
import { Link, animateScroll as scroll } from "react-scroll";

export const HeaderNav = () => {
  return (
    <nav className="header__nav">
      <ul className="nav__list flex">
        <li className="nav__item">
          <Link
            activeClass="active"
            to="news"
            spy={true}
            smooth={true}
            offset={-70}
            duration={700}
          >
            <a href="#">Новости</a>
          </Link>
        </li>
        <li className="nav__item">
          <Link
            to="aboutUs"
            spy={true}
            smooth={true}
            offset={-70}
            duration={900}
          >
            О нас
          </Link>
        </li>
        <li className="nav__item">
          <Link to="project" spy={true} smooth={true} offset={-70} duration={1100}>
            Наши проекты
          </Link>
        </li>
        <li className="nav__item">
          <Link
            to="contacts"
            spy={true}
            smooth={true}
            offset={-70}
            duration={1300}
          >
            Контакты
          </Link>
        </li>
      </ul>
    </nav>
  );
};
