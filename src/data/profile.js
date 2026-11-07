// Personal details, experience, skills and the compact project list.

export const profile = {
  name: "Amine Bennani",
  role: "Software & AI Engineer",
  location: "Luxembourg",
  email: "aminebenn2000@gmail.com",
  linkedin: "https://www.linkedin.com/in/amine-bennani-51638410a/",
  github: "https://github.com/AmineBennani7",
};

export const experience = [
  {
    period: "Apr 2026 — Present",
    role: "Data & AI Engineer",
    org: "Sword Group Luxembourg",
    id: "exp-sword",
    context: "Consultant at EBTrans (logistics)",
    summary:
      "I work on Python development, data integration, process automation and AI applications for a logistics company.",
    points: [
      "Develop Python and SQL components for data integration between business systems, using Talend ETL jobs, PostgreSQL and REST APIs.",
      "Build n8n workflows that automate document processing: OCR, structured extraction with LLMs, validation and human review.",
      "Work on LLM applications using retrieval (RAG) and AI agents, and on data reporting with AWS and Amazon QuickSight.",
      "Prepared and gave an internal presentation on AI and automation with n8n, covering workflows, AI agents, structured extraction, integration and validation, with live demos.",
    ],
    tags: ["Python", "SQL", "Talend", "PostgreSQL", "REST APIs", "n8n", "LLMs", "RAG", "AWS QuickSight"],
  },
  {
    period: "Sep 2024 — Jun 2025",
    role: "AI Engineer, Perception",
    org: "Oxford Brookes Racing Autonomous",
    id: "exp-obr",
    context: "Formula Student AI team",
    summary: "Member of the perception group for the university's driverless Formula Student car.",
    points: [
      "Developed YOLOv8 cone detection and tracking for the car, working with the navigation and control teams.",
      "Built a training set of more than 3,000 images, improved detection precision by 15% and increased inference speed from 22 to 30 FPS.",
      "The team finished 2nd in Formula Student UK AI.",
    ],
    tags: ["Python", "YOLOv8", "OpenCV", "Roboflow"],
  },
  {
    period: "Sep 2023 — Apr 2024",
    role: "Software Engineer Intern",
    org: "Sopra Steria",
    id: "exp-sopra",
    context: "Seville, Spain",
    summary: "Backend and data-processing work for international clients.",
    points: [
      "Built backend components with Java, Spring Boot, FastAPI and SQL.",
      "Wrote ingestion and transformation steps for semi-structured data.",
      "Built Power BI dashboards to monitor the processed data, in a team working in Spanish and French.",
    ],
    tags: ["Java", "Spring Boot", "FastAPI", "SQL", "Power BI"],
  },
];

export const education = [
  {
    year: "2025",
    title: "MSc Artificial Intelligence",
    org: "Oxford Brookes University, UK",
    note: "Distinction. Dissertation on tracking small, fast-moving objects (the Amateur Tennis CV System).",
  },
  {
    year: "2024",
    title: "BSc Computer Engineering",
    org: "University of Seville, Spain",
    note: "Information Technologies. Final-year project: the Smart Voice Restaurant Assistant.",
  },
];

// Skills grouped by area. Every item is backed by the CV, the current role or a repository;
// "Used in" points to where it was used.
export const expertise = [
  {
    domain: "Programming & software engineering",
    items: ["Python", "SQL", "Java", "C++", "C#", "JavaScript", "TypeScript", "FastAPI", "Flask", "Spring Boot", "REST APIs", "Git", "Docker", "Linux", "pytest"],
    evidence: [
      { label: "Sword Group", href: "#exp-sword" },
      { label: "Sopra Steria", href: "#exp-sopra" },
      { label: "GPS Trajectory Analysis", href: "#project-gps" },
      { label: "Voice Restaurant Assistant", href: "#project-voice" },
    ],
  },
  {
    domain: "AI engineering & LLMs",
    items: ["LLMs", "RAG", "AI agents", "LangChain", "Prompt engineering", "OCR", "Document processing", "Structured extraction", "PyTorch", "TensorFlow"],
    evidence: [
      { label: "Sword Group", href: "#exp-sword" },
      { label: "ClairSinistre", href: "#work/clair" },
      { label: "Voice Restaurant Assistant", href: "#project-voice" },
      { label: "AI Council", href: "#work/council" },
    ],
  },
  {
    domain: "Computer vision & robotics",
    items: ["OpenCV", "YOLOv8", "Object detection", "Multi-object tracking", "ByteTrack", "GridTrackNet", "Homography", "Autonomous perception", "Kalman filtering", "Particle filters", "A* path planning", "Cozmo SDK"],
    evidence: [
      { label: "Oxford Brookes Racing", href: "#project-obr" },
      { label: "Tennis CV System", href: "#project-tennis" },
      { label: "Cozmo Search & Rescue", href: "#project-cozmo" },
    ],
  },
  {
    domain: "Data engineering & geospatial",
    items: ["PostgreSQL", "PostGIS", "Talend", "ETL / ELT", "Apache Airflow", "Pandas", "PySpark", "Delta Lake", "GeoPandas", "MovingPandas", "Shapely", "OSMnx"],
    evidence: [
      { label: "Sword Group", href: "#exp-sword" },
      { label: "GPS Trajectory Analysis", href: "#project-gps" },
      { label: "Airflow Pipeline", href: "#project-airflow" },
      { label: "Fabric Analytics", href: "#work/fabric" },
    ],
  },
  {
    domain: "Cloud & business intelligence",
    items: ["AWS S3", "AWS Athena", "Amazon QuickSight", "Microsoft Fabric", "Power BI", "DAX", "Data warehousing", "Star schema modelling"],
    evidence: [
      { label: "Sword Group", href: "#exp-sword" },
      { label: "Fabric Analytics", href: "#work/fabric" },
      { label: "Sopra Steria", href: "#exp-sopra" },
    ],
  },
  {
    domain: "Automation & integration",
    items: ["n8n", "Workflow orchestration", "Webhooks", "AI automation", "Playwright", "CI/CD (GitHub Actions)"],
    evidence: [
      { label: "Sword Group", href: "#exp-sword" },
      { label: "AI Council", href: "#work/council" },
      { label: "GPS Trajectory Analysis", href: "#project-gps" },
    ],
  },
];

// Smaller projects without a case study, shown in the compact list.
export const archive = [
  { year: "2025", title: "InvoiceTracker", note: "WPF desktop app with MVVM", stack: ".NET 8 · C#", categories: ["software"], href: "https://github.com/AmineBennani7/InvoiceTracker.NET8-WPF" },
  { year: "2025", title: "VisAI travel assistant", note: "Travel chatbot with LLMs and external APIs", stack: "Python · LangChain", categories: ["ai"], href: "https://github.com/AmineBennani7/AI-Powered-Travel-Assistant" },
  { year: "2024", title: "AnimalShelter", note: "Scraped shelter listings with full-text search", stack: "Django · BeautifulSoup · Whoosh", categories: ["software", "data"], href: "https://github.com/AmineBennani7/animalShelter" },
  { year: "2024", title: "ID document recogniser", note: "OCR extraction from French and UK ID documents", stack: "Python · Tesseract · OpenCV", categories: ["cv"], href: "https://github.com/AmineBennani7/id-recognizer" },
  { year: "2024", title: "Neural network projects", note: "Five exercises: CNNs, augmentation, transfer learning", stack: "TensorFlow · Keras", categories: ["ai", "cv"], href: "https://github.com/AmineBennani7/neural-network-projects" },
  { year: "2024", title: "Goku's Escape", note: "Small arcade game", stack: "Python · Pygame", categories: ["software"], href: "https://github.com/AmineBennani7/Goku-s-Escape" },
  { year: "2023", title: "Sentiment analysis", note: "Sentiment analysis of video-game reviews", stack: "Python · Jupyter", categories: ["ai"], href: "https://github.com/AmineBennani7/Sentimental-Analysis-" },
];
