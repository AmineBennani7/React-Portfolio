import styles from "./SectionHead.module.css";

export function SectionHead({ title, children, id }) {
  return (
    <div className={styles.head} data-reveal>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {children && <p className={styles.aside}>{children}</p>}
    </div>
  );
}
