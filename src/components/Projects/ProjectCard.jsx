import React from "react";

import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, Doc, source },
  isFirstCard // Use this prop to determine if it's the first card
}) => {
  return (
    <div className={styles.container}>
      <img
        src={getImageUrl(imageSrc)}
        alt={`Image of ${title}`}
        className={styles.image}
      />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <ul className={styles.skills}>
        {skills.map((skill, id) => (
          <li key={id} className={styles.skill}>
            {skill}
          </li>
        ))}
      </ul>
      <div className={styles.links}>
        {/* Render the "Documentation" link only if isFirstCard is true and Doc is provided */}
        {isFirstCard && Doc && (
          <a href={Doc} className={styles.link} target="_blank" rel="noopener noreferrer">
            Documentation (Esp)
          </a>
        )}
        <a href={source} className={styles.link}>
          Source
        </a>
      </div>
    </div>
  );
};
