import { Preview } from "../../component/preview/Preview";
import { Projects } from "../../component/project/Projects";
import { AboutUs } from "../../component/aboutUs/AboutUs";
import { News } from "../../component/news/News";
import { Contact } from "../../component/contact/Contact";
import { motion } from "framer-motion";
import { useEffect } from "react";
import React, { Component } from "react";

import "../main/main.scss";

function Main(props) {
  
  return (
    <motion.main
      className="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <section id="preview">
        <Preview language={props.language} />
      </section>
      <section id="news">
        <News language={props.language} />
      </section>
      <section id="aboutUs">
        <AboutUs language={props.language} />
      </section>
      <section id="project">
        <Projects language={props.language} />
      </section>
      <section id="contacts">
        <Contact language={props.language} />
      </section>
    </motion.main>
  );
}

export default Main;
