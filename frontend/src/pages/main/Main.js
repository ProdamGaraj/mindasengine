import { Preview } from "../../component/preview/Preview";
import { Projects } from "../../component/project/Projects";
import { AboutUs } from "../../component/aboutUs/AboutUs";
import { News } from "../../component/news/News";
import { Contact } from "../../component/contact/Contact";

export const Main = () => {
  return (
    <main className="main">
      <section id="preview">
        <Preview />
      </section>
      <section id="project"><Projects /></section>
      <section id="aboutUs"><AboutUs /></section>
      <section id="news"><News /></section>
      <section id="contacts"><Contact /></section>
    </main>
  );
};
