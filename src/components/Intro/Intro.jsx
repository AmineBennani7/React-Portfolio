import React from "react";
import styles from "./Intro.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <img
        src={getImageUrl("User/foto2.png")}
        alt="Amine Image"
        className={styles.heroImg}
      />
      <div className={styles.content}>
        <h1 className={styles.title}>Amine Bennani</h1>
        <p className={styles.description}>
          Computer Engineering graduate, currently pursuing a master's<br />
          in Artificial Intelligence at Oxford Brookes University.
        </p>

        <div className={styles.buttonContainer}>
          <a href="mailto:aminebenn2000@gmail.com" className={styles.contactBtn}>
            Contact Me
          </a>
          <a 
            href={getImageUrl("User/CV-amine-ENGL.pdf")} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.cvBtn}
          >
            View My CV
          </a>
        </div>
      </div>
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
