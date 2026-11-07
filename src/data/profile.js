// Personal details, experience, skills and archive.

export const profile = {
  name: "Amine Bennani",
  role: "Software & AI Engineer",
  location: "Luxembourg",
  email: "aminebenn2000@gmail.com",
  linkedin: "https://www.linkedin.com/in/amine-bennani-51638410a/",
  github: "https://github.com/AmineBennani7",
  // Set to a file in /public (e.g. "/cv/amine-bennani-cv.pdf") once an
  // up-to-date CV is ready. While null, the site offers the CV on request.
  cvUrl: null,
};

export const experience = [
  {
    period: "Apr 2026 — Present",
    start: "2026",
    role: "Data & AI Engineer",
    org: "Sword Group Luxembourg",
    context: "Client: EBTrans",
    summary:
      "I develop Python applications and AI automation for a logistics client: enterprise data integration, LLM applications using RAG and AI agents, OCR and API workflows, and the databases and data pipelines behind them. I also set up testing for these workflows (structured outputs, error handling and human review) and help colleagues adopt them.",
    tags: ["Python", "LLMs", "RAG", "AI agents", "SQL", "PostgreSQL", "APIs", "n8n"],
  },
  {
    period: "2025 — 2026",
    start: "2025",
    role: "Software Engineer, OCR",
    org: "Early-stage startup",
    context: "Oxford, UK",
    summary: "I worked on OCR and document-processing software in Python for a small Oxford-based startup.",
    tags: ["Python", "OCR"],
  },
  {
    period: "Sep 2024 — Jun 2025",
    start: "2024",
    role: "AI Engineer, Perception",
    org: "Oxford Brookes Racing Autonomous",
    context: "Formula Student AI",
    summary:
      "I developed the YOLOv8 cone detection and tracking system for the team's autonomous race car. I built a training set of more than 3,000 images, improved detection precision by 15% and increased inference speed from 22 to 30 FPS, working with the navigation and control teams. The team finished 2nd in Formula Student UK AI.",
    tags: ["Python", "YOLOv8", "OpenCV", "Roboflow"],
  },
  {
    period: "Sep 2023 — Apr 2024",
    start: "2023",
    role: "Software Engineer Intern",
    org: "Sopra Steria",
    context: "Seville, Spain",
    summary:
      "I built backend and data-processing components for international clients with Java, Spring Boot, FastAPI and SQL, including ingestion and transformation of semi-structured data, and Power BI dashboards to monitor the processed data.",
    tags: ["Java", "Spring Boot", "FastAPI", "SQL", "Power BI"],
  },
];

export const education = [
  {
    year: "2025",
    title: "MSc Artificial Intelligence",
    org: "Oxford Brookes University",
    note: "Distinction. Dissertation on detecting and tracking small, fast-moving objects under motion blur.",
  },
  {
    year: "2024",
    title: "BSc Computer Engineering",
    org: "University of Seville",
    note: "Information Technologies.",
  },
];

// Each domain links to related work.
export const expertise = [
  {
    domain: "AI & Computer Vision",
    items: ["Python", "PyTorch", "TensorFlow", "YOLOv8", "OpenCV", "Object tracking", "LLM applications", "RAG", "AI agents", "LangChain"],
    evidence: [
      { label: "Oxford Brookes Racing", href: "#experience" },
      { label: "Tennis CV System", href: "#work/tennis" },
      { label: "Sword Group", href: "#experience" },
      { label: "ClairSinistre", href: "#work/clair" },
    ],
  },
  {
    domain: "Software Engineering",
    items: ["Java", "Spring Boot", "FastAPI", "REST APIs", "React", "JavaScript", "TypeScript", "Git", "Docker", "Playwright", "pytest"],
    evidence: [
      { label: "Sopra Steria", href: "#experience" },
      { label: "AI Council", href: "#work/council" },
      { label: "ClairSinistre", href: "#work/clair" },
    ],
  },
  {
    domain: "Data Engineering",
    items: ["SQL", "PostgreSQL", "PostGIS", "Apache Airflow", "Pandas", "GeoPandas", "Spark", "Microsoft Fabric", "Power BI", "AWS", "Talend", "n8n"],
    evidence: [
      { label: "GPS Trajectory Analysis", href: "#work/gps" },
      { label: "Airflow Pipeline", href: "#work/airflow" },
      { label: "Fabric Analytics", href: "#work/fabric" },
    ],
  },
];

export const archive = [
  { year: "2025", title: "InvoiceTracker", note: "WPF desktop app with MVVM", stack: ".NET 8 · C#", href: "https://github.com/AmineBennani7/InvoiceTracker.NET8-WPF" },
  { year: "2025", title: "VisAI travel assistant", note: "Travel chatbot with LLMs and external APIs", stack: "Python · LangChain", href: "https://github.com/AmineBennani7/AI-Powered-Travel-Assistant" },
  { year: "2024", title: "Cozmo search & rescue", note: "Robot pose tracking, mapping and path planning (MSc coursework)", stack: "Python · Cozmo SDK", href: "https://github.com/AmineBennani7/search_and_rescue_robotic" },
  { year: "2024", title: "Cozmo localisation", note: "Sensor models for cubes, cliffs and walls, and localisation experiments (MSc coursework)", stack: "Python · NumPy", href: "https://github.com/AmineBennani7/robotic_cozmo_1" },
  { year: "2024", title: "Voice restaurant assistant", note: "Final-year project: voice ordering with an LLM agent", stack: "Flutter · Flask · LangChain · React", href: "https://github.com/AmineBennani7/Smart-Voice-Restaurant-Assistant", doc: { label: "Report (ES)", href: "/docs/tfg-voice-assistant.pdf" } },
  { year: "2024", title: "ID document recogniser", note: "OCR extraction from French and UK ID documents", stack: "Python · Tesseract · OpenCV", href: "https://github.com/AmineBennani7/id-recognizer" },
  { year: "2024", title: "Neural network projects", note: "Five exercises: CNNs, augmentation, transfer learning", stack: "TensorFlow · Keras", href: "https://github.com/AmineBennani7/neural-network-projects" },
  { year: "2024", title: "AnimalShelter", note: "Scraped shelter listings with full-text search", stack: "Django · BeautifulSoup · Whoosh", href: "https://github.com/AmineBennani7/animalShelter" },
  { year: "2024", title: "Goku's Escape", note: "Small arcade game", stack: "Python · Pygame", href: "https://github.com/AmineBennani7/Goku-s-Escape" },
  { year: "2023", title: "Sentiment analysis", note: "Sentiment analysis of video-game reviews", stack: "Python · Jupyter", href: "https://github.com/AmineBennani7/Sentimental-Analysis-" },
];
