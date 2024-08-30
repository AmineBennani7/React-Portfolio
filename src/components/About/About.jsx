import React from "react";
import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About me</h2>
      <div className={styles.content}>
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/wave.png")} alt="Cursor icon" />
            <p>
              Hello! I'm Amine Bennani, a passionate IT enthusiast currently
              pursuing a master's degree in Artificial Intelligence at Oxford
              Brookes University.
            </p>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/graduate.png")} alt="Server icon" />
            <p>
              During my studies in Computer Engineering at the University of
              Seville, I have acquired a solid foundation in programming and
              project management, facing challenges that have strengthened my
              technical skills.
            </p>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/robot.png")} alt="AI icon" />
            <p>
              I developed a particular interest in Artificial Intelligence
              during my undergraduate years. I explored Deep Learning and
              Machine Learning, as well as the functioning of LLMs and their fine-tuning. My final year project included
              a virtual assistant capable of taking orders for a restaurant
              system. This hands-on experience confirmed my passion for AI and
              led me to pursue a master's degree about it.
            </p>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/star.png")} alt="Team icon" />
            <p>
              I am eager to expand my knowledge and skills to make a positive
              impact in the tech field. I also believe in adaptability and
              teamwork as essential components for overcoming challenges and
              achieving success.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};
