import { useLang } from "../../i18n/context";
import styles from "./Diagrams.module.css";

/* Conceptual diagrams, clearly labelled as such where they are used. */

function Node({ x, y, w = 210, h = 96, step, title, sub, tone }) {
  return (
    <g transform={`translate(${x} ${y})`} className={tone ? styles[tone] : undefined}>
      <rect className={styles.box} width={w} height={h} rx="6" />
      <text className={styles.step} x="16" y="26">
        {step}
      </text>
      <text className={title.length > 16 ? styles.titleSm : styles.title} x="16" y="56">
        {title}
      </text>
      <text className={styles.sub} x="16" y="78">
        {sub}
      </text>
    </g>
  );
}

function Defs({ id }) {
  return (
    <defs>
      <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" className={styles.arrowHead} />
      </marker>
      <marker id={`${id}-arrow-accent`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" className={styles.arrowHeadAccent} />
      </marker>
      <pattern id={`${id}-dots`} width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" className={styles.dot} />
      </pattern>
    </defs>
  );
}

const COUNCIL_POS = [
  [40, 70, "muted"],
  [295, 70],
  [550, 70, "accent"],
  [550, 330],
  [295, 330],
  [40, 330, "muted"],
];

const CLAIR_POS = [
  [40, 84, "muted"],
  [295, 84],
  [550, 84],
  [550, 318],
  [295, 318],
  [40, 318, "accent"],
];

export function CouncilDiagram() {
  const { t } = useLang();
  const d = t.diagrams.council;
  const id = "council";
  const a = `url(#${id}-arrow)`;
  const aa = `url(#${id}-arrow-accent)`;
  return (
    <svg className={styles.svg} viewBox="0 0 800 500" role="img" aria-labelledby="council-d-title">
      <title id="council-d-title">{d.title}</title>
      <Defs id={id} />
      <rect width="800" height="500" fill={`url(#${id}-dots)`} />

      {d.nodes.map(([step, title, sub], i) => (
        <Node key={i} x={COUNCIL_POS[i][0]} y={COUNCIL_POS[i][1]} tone={COUNCIL_POS[i][2]} step={step} title={title} sub={sub} />
      ))}

      <path className={styles.flow} d="M250 118 H291" markerEnd={a} />
      <path className={styles.flow} d="M505 118 H546" markerEnd={a} />
      <path className={styles.flow} d="M655 166 V326" markerEnd={a} />
      <path className={styles.flow} d="M550 378 H509" markerEnd={a} />
      <path className={styles.flow} d="M295 378 H254" markerEnd={a} />
      <text className={styles.edge} x="258" y="366">{d.accept}</text>

      <path className={styles.feedback} d="M420 326 C 430 240, 520 230, 600 170" markerEnd={aa} />
      <text className={styles.edgeAccent} x="438" y="252">{d.reject}</text>

      <text className={styles.caption} x="40" y="478">
        {d.caption}
      </text>
    </svg>
  );
}

export function ClairDiagram() {
  const { t } = useLang();
  const d = t.diagrams.clair;
  const id = "clair";
  const a = `url(#${id}-arrow)`;
  return (
    <svg className={styles.svg} viewBox="0 0 800 500" role="img" aria-labelledby="clair-d-title">
      <title id="clair-d-title">{d.title}</title>
      <Defs id={id} />
      <rect width="800" height="500" fill={`url(#${id}-dots)`} />
      <rect className={styles.boundary} x="20" y="34" width="760" height="402" rx="10" />
      <text className={styles.boundaryLabel} x="764" y="56" textAnchor="end">{d.boundary}</text>

      {d.nodes.map(([step, title, sub], i) => (
        <Node key={i} x={CLAIR_POS[i][0]} y={CLAIR_POS[i][1]} tone={CLAIR_POS[i][2]} step={step} title={title} sub={sub} />
      ))}

      <path className={styles.flow} d="M250 132 H291" markerEnd={a} />
      <path className={styles.flow} d="M505 132 H546" markerEnd={a} />
      <path className={styles.flow} d="M655 180 V314" markerEnd={a} />
      <path className={styles.flow} d="M550 366 H509" markerEnd={a} />
      <path className={styles.flow} d="M295 366 H254" markerEnd={a} />

      <text className={styles.caption} x="40" y="476">
        {d.caption}
      </text>
    </svg>
  );
}
