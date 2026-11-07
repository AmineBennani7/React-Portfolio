import styles from "./SectionHead.module.css";

export function SectionHead({ index, label, title, children, id }) {
  return (
    <div className={styles.head} data-reveal>
      <p className={styles.label}>
        <span className={styles.index}>{index}</span>
        <span>{label}</span>
      </p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {children && <div className={styles.aside}>{children}</div>}
    </div>
  );
}
