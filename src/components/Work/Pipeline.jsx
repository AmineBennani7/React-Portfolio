import { useState } from "react";
import styles from "./Pipeline.module.css";

/**
 * Interactive architecture strip: each stage can be focused to read its detail.
 */
export function Pipeline({ steps, label }) {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.wrap}>
      <ol className={styles.steps} aria-label={label}>
        {steps.map((s, i) => (
          <li key={s.label} className={i === active ? styles.active : undefined}>
            <button
              type="button"
              className={styles.node}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.label}>{s.label}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className={styles.detail} aria-live="polite">
        <span className={styles.detailLabel}>{steps[active].label}</span>
        {steps[active].detail}
      </p>
    </div>
  );
}
