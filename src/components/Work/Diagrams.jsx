import styles from "./Diagrams.module.css";

/* Conceptual diagrams, clearly labelled as such where they are used. */

function Node({ x, y, w = 210, h = 96, step, title, sub, tone }) {
  return (
    <g transform={`translate(${x} ${y})`} className={tone ? styles[tone] : undefined}>
      <rect className={styles.box} width={w} height={h} rx="6" />
      <text className={styles.step} x="16" y="26">
        {step}
      </text>
      <text className={styles.title} x="16" y="56">
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

export function CouncilDiagram() {
  const id = "council";
  const a = `url(#${id}-arrow)`;
  const aa = `url(#${id}-arrow-accent)`;
  return (
    <svg className={styles.svg} viewBox="0 0 800 500" role="img" aria-labelledby="council-d-title">
      <title id="council-d-title">
        AI Council V1 flow: a human-triggered task is planned by Codex CLI, built by Claude Code CLI, verified with tests
        and Playwright screenshots, reviewed by Codex CLI, then committed with Git or sent back with feedback.
      </title>
      <Defs id={id} />
      <rect width="800" height="500" fill={`url(#${id}-dots)`} />

      <Node x={40} y={70} step="01 · HUMAN" title="One task" sub="started from the CLI" tone="muted" />
      <Node x={295} y={70} step="02 · PLAN" title="Codex CLI" sub="plans, changes nothing" />
      <Node x={550} y={70} step="03 · BUILD" title="Claude Code CLI" sub="implements, documents" tone="accent" />
      <Node x={550} y={330} step="04 · VERIFY" title="Tests + Playwright" sub="desktop & mobile captures" />
      <Node x={295} y={330} step="05 · REVIEW" title="Codex CLI" sub="accept or reject" />
      <Node x={40} y={330} step="06 · COMMIT" title="Git" sub="commit, or roll back" tone="muted" />

      <path className={styles.flow} d="M250 118 H291" markerEnd={a} />
      <path className={styles.flow} d="M505 118 H546" markerEnd={a} />
      <path className={styles.flow} d="M655 166 V326" markerEnd={a} />
      <path className={styles.flow} d="M550 378 H509" markerEnd={a} />
      <path className={styles.flow} d="M295 378 H254" markerEnd={a} />
      <text className={styles.edge} x="258" y="366">accept</text>

      <path className={styles.feedback} d="M420 326 C 430 240, 520 230, 600 170" markerEnd={aa} />
      <text className={styles.edgeAccent} x="438" y="252">reject → feedback</text>

      <text className={styles.caption} x="40" y="478">
        MARKDOWN MEMORY · ONE TASK PER RUN · NO AUTONOMOUS LOOP IN V1
      </text>
    </svg>
  );
}

export function ClairDiagram() {
  const id = "clair";
  const a = `url(#${id}-arrow)`;
  return (
    <svg className={styles.svg} viewBox="0 0 800 500" role="img" aria-labelledby="clair-d-title">
      <title id="clair-d-title">
        ClairSinistre pipeline: public insurer PDFs verified by hash, clause extraction and segmentation, a local
        keyword and semantic index, retrieval filtered by contract, schema-validated model output, then citation
        checks and abstention rules, all running locally.
      </title>
      <Defs id={id} />
      <rect width="800" height="500" fill={`url(#${id}-dots)`} />
      <rect className={styles.boundary} x="20" y="34" width="760" height="402" rx="10" />
      <text className={styles.boundaryLabel} x="764" y="56" textAnchor="end">LOCAL ONLY · LOOPBACK API · NOT DEPLOYED</text>

      <Node x={40} y={84} step="01 · CORPUS" title="Insurer PDFs" sub="official URLs, SHA-256" tone="muted" />
      <Node x={295} y={84} step="02 · EXTRACT" title="Clauses" sub="pypdf + segmentation" />
      <Node x={550} y={84} step="03 · INDEX" title="SQLite FTS5" sub="+ local embeddings" />
      <Node x={550} y={318} step="04 · RETRIEVE" title="Per contract" sub="keyword + semantic" />
      <Node x={295} y={318} step="05 · ASSESS" title="Model output" sub="schema-validated" />
      <Node x={40} y={318} step="06 · SAFEGUARD" title="Cite or abstain" sub="citation checks, R1 R2 R4" tone="accent" />

      <path className={styles.flow} d="M250 132 H291" markerEnd={a} />
      <path className={styles.flow} d="M505 132 H546" markerEnd={a} />
      <path className={styles.flow} d="M655 180 V314" markerEnd={a} />
      <path className={styles.flow} d="M550 366 H509" markerEnd={a} />
      <path className={styles.flow} d="M295 366 H254" markerEnd={a} />

      <text className={styles.caption} x="40" y="476">
        NO CITED GUARANTEE OR EXCLUSION → INSUFFICIENT_INFORMATION
      </text>
    </svg>
  );
}

