// Personal details, experience, skills and the compact project list.

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
    role: "Data & AI Engineer",
    org: "Sword Group Luxembourg",
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

// Skills grouped by area, each linked to where it was used.
export const expertise = [
  {
    domain: "Python & backend",
    items: ["Python", "SQL", "Java", "Spring Boot", "FastAPI", "Flask", "REST APIs", "Git", "Docker", "pytest"],
    evidence: [
      { label: "Sword Group", href: "#experience" },
      { label: "Sopra Steria", href: "#experience" },
      { label: "GPS Trajectory Analysis", href: "#work/gps" },
    ],
  },
  {
    domain: "AI & LLMs",
    items: ["LLM applications", "RAG", "AI agents", "Structured extraction", "OCR", "LangChain"],
    evidence: [
      { label: "Sword Group", href: "#experience" },
      { label: "Voice Restaurant Assistant", href: "#project-voice" },
      { label: "ClairSinistre", href: "#work/clair" },
    ],
  },
  {
    domain: "Computer vision",
    items: ["YOLOv8", "OpenCV", "PyTorch", "TensorFlow", "ByteTrack", "GridTrackNet", "Roboflow"],
    evidence: [
      { label: "Oxford Brookes Racing", href: "#project-obr" },
      { label: "Tennis CV System", href: "#work/tennis" },
    ],
  },
  {
    domain: "Robotics & autonomous systems",
    items: ["Perception for autonomous driving", "Localisation (Kalman and particle filters)", "A* path planning", "Cozmo SDK"],
    evidence: [
      { label: "Oxford Brookes Racing", href: "#project-obr" },
      { label: "Cozmo Search & Rescue", href: "#project-cozmo" },
    ],
  },
  {
    domain: "Data engineering",
    items: ["PostgreSQL", "PostGIS", "Talend", "ETL", "Apache Airflow", "Spark", "Microsoft Fabric", "Power BI", "AWS QuickSight"],
    evidence: [
      { label: "Sword Group", href: "#experience" },
      { label: "Airflow Pipeline", href: "#work/airflow" },
      { label: "Fabric Analytics", href: "#work/fabric" },
    ],
  },
  {
    domain: "Automation",
    items: ["n8n", "Workflow orchestration", "Playwright"],
    evidence: [
      { label: "Sword Group", href: "#experience" },
      { label: "AI Council", href: "#work/council" },
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
