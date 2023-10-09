import { Preview } from "../../component/preview/Preview";
import { Projects } from "../../component/project/Projects";
import { AboutUs } from "../../component/aboutUs/AboutUs";

export const Main = () => {
  return (
    <main className="main">
      <Preview />
      <Projects />
      <AboutUs />
    </main>
  );
};
