import React from "react";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <img
        src={getImageUrl("hero/foto2.png")}
        alt="Amine Image"
        className={styles.heroImg}
      />
      <div className={styles.content}>
        <h1 className={styles.title}>Amine Bennani </h1>
        <p className={styles.description}>
          Computer Engineering graduate from the University of Seville,<br />
          currently pursuing a master's in Artificial Intelligence at Oxford Brookes University.
        </p>

        <a href="mailto:myemail@email.com" className={styles.contactBtn}>
          Contact Me
        </a>
      </div>
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
