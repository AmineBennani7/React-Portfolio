// French content, laid over the English source data (src/data/*).
// Only text is translated; names of projects, companies and technologies stay as they are.

export const fr = {
  categories: {
    all: "Tous",
    cv: "Vision par ordinateur",
    robotics: "Robotique",
    ai: "IA & LLM",
    data: "Données",
    software: "Logiciel",
  },

  projects: {
    obr: {
      discipline: "Formula Student AI · Projet d’équipe",
      summary:
        "Perception pour la voiture autonome Formula Student de l’équipe. Au sein du groupe perception, j’ai travaillé sur la détection et le suivi de cônes avec YOLOv8, de la constitution des données d’entraînement à l’accélération du modèle sur la voiture.",
      cover: { kind: "Caméra embarquée", caption: "Détections de cônes vues par la caméra embarquée de la voiture." },
      stats: [
        ["3 000+", "images d’entraînement"],
        ["+15 %", "de précision de détection"],
        ["22 → 30", "FPS"],
        ["2e", "Formula Student UK AI (équipe)"],
      ],
      links: [{ label: "Voir l’expérience" }],
    },

    gps: {
      discipline: "Analyse géospatiale · Ingénierie spatiale",
      headline: "Nettoyer et analyser les traces GPS de véhicules.",
      summary:
        "Une application Python qui nettoie des données GPS brutes de véhicules et détecte arrêts, trajets, événements de géorepérage et vitesses anormales. Les résultats sont stockés dans PostGIS ; l’application tourne sous Docker et est couverte par des tests automatisés.",
      status: { label: "Terminé" },
      cover: {
        kind: "Capture d’écran",
        caption: "Carte Streamlit avec quatre trajectoires de véhicules, les arrêts détectés et les zones de géorepérage à Séville (données synthétiques).",
      },
      facts: [
        ["Entrées", "CSV · GPX · GeoJSON"],
        ["Données", "Flotte synthétique, 3 véhicules, 2 jours"],
        ["Stockage", "PostGIS, GeoJSON, CSV"],
        ["Tests", "pytest et Ruff"],
      ],
      caseStudy: {
        problem:
          "Les données GPS brutes contiennent des horodatages manquants, des coordonnées (0, 0), des doublons, des positions imprécises et des sauts soudains de plusieurs kilomètres. Utilisées telles quelles, elles faussent les distances et les vitesses. Je voulais un pipeline qui nettoie les données, enregistre pourquoi chaque point a été rejeté, puis applique des analyses de trajectoire et spatiales utiles sur le résultat.",
        architecture: [
          { label: "Lecture", detail: "Lecteurs CSV, GPX et GeoJSON qui produisent une table commune" },
          { label: "Validation", detail: "Contrôles par règles ; chaque enregistrement rejeté garde son motif" },
          { label: "Nettoyage", detail: "Supprime les sauts GPS qui supposeraient plus de 200 km/h" },
          { label: "Traitement", detail: "Trajectoires, arrêts, trajets et anomalies de vitesse" },
          { label: "Spatial", detail: "Géorepérage, jointures spatiales et zones tampons en ETRS89 / UTM 30N" },
          { label: "Restitution", detail: "Stockage PostGIS, exports de fichiers et tableau de bord Streamlit" },
        ],
        implementation: [
          "J’ai écrit les lecteurs, les règles de validation et un rapport de qualité des données qui montre la distance à chaque étape du nettoyage.",
          "Les trajectoires, la détection des arrêts et le découpage en trajets s’appuient sur MovingPandas ; les distances sont mesurées dans un système de coordonnées projeté (EPSG:25830).",
          "Les lieux fréquents sont trouvés en regroupant les arrêts avec DBSCAN. Les vitesses inhabituelles et les freinages brusques sont signalés avec un z-score robuste par véhicule.",
          "Les itinéraires sont comparés avec la distance de Hausdorff, la distance de Fréchet et le recouvrement de zones tampons.",
          "Les entrées, sorties et temps de présence dans les zones sont calculés par jointures spatiales ; les requêtes PostGIS utilisent un index spatial GiST.",
        ],
        ownership: [
          ["Lecteurs et règles de validation", "Python, pandas, gpxpy"],
          ["Trajectoires, arrêts et trajets", "MovingPandas"],
          ["Lieux fréquents", "scikit-learn DBSCAN"],
          ["Similarité des itinéraires", "Shapely"],
          ["Géorepérage et jointures spatiales", "GeoPandas"],
          ["Stockage et requêtes en base", "PostGIS, SQLAlchemy, GeoAlchemy2"],
          ["Tableau de bord et cartes", "Streamlit, Folium, Altair"],
        ],
        results: [
          "Sur les données de flotte d’exemple, 2 046 enregistrements ont été lus, dont 2 031 valides (99,3 %) et 15 rejetés, chacun avec son motif.",
          "4 trajectoires, 34,0 km, 11 arrêts et 15 trajets détectés.",
          "Le même itinéraire fait deux jours différents correspond presque parfaitement, avec une distance de Hausdorff de 13,8 m, une distance de Fréchet de 13,9 m et un recouvrement de 100 %.",
          "Le tronçon rapide ajouté exprès a bien été détecté, avec 7 points entre 72 et 84 km/h.",
        ],
        resultsNote: "Ces résultats proviennent de données d’exemple synthétiques, avec des erreurs ajoutées volontairement.",
        limitations: [
          "Les données d’exemple sont synthétiques ; le pipeline n’a pas encore été testé sur de vrais journaux GPS.",
          "L’accrochage à la route utilise la route la plus proche, pas un véritable map matching.",
          "La règle d’anomalie de vitesse est statistique et ne tient pas compte des limitations de vitesse.",
        ],
        gallery: [
          { kind: "Capture d’écran", caption: "Trace brute (en pointillés) et trace nettoyée. La ligne qui sort de la carte est un saut GPS ; les cercles blancs sont des points peu précis." },
          { kind: "Capture d’écran", caption: "Onglet qualité des données, avec les enregistrements rejetés par motif et la distance à chaque étape du nettoyage." },
          { kind: "Capture d’écran", caption: "Événements de géorepérage et temps passé dans chaque zone." },
          { kind: "Capture d’écran", caption: "Profils de vitesse et d’accélération." },
        ],
      },
    },

    tennis: {
      discipline: "Vision par ordinateur · Mémoire de MSc",
      headline: "Suivi des joueurs et de la balle dans des vidéos de tennis amateur.",
      summary:
        "C’est mon mémoire de MSc, un pipeline qui suit les joueurs avec YOLOv8 et ByteTrack et une balle petite et rapide avec GridTrackNet, projette le tout sur le court grâce à une homographie, et produit une vidéo annotée avec mini-carte et nombre de frappes.",
      status: { label: "Terminé" },
      cover: {
        kind: "Sortie du système",
        caption: "Sortie du système, avec les joueurs suivis et leur identifiant, la position de la balle, les compteurs de frappes et une vue du court de dessus (en haut à droite).",
      },
      facts: [
        ["Joueurs", "YOLOv8 + ByteTrack"],
        ["Balle", "GridTrackNet"],
        ["Projection sur le court", "Homographie à 4 points"],
        ["Évaluation", "Précision, rappel, MOTA, MOTP"],
      ],
      caseStudy: {
        problem:
          "C’était mon projet de mémoire de MSc à Oxford Brookes. L’analyse du tennis professionnel s’appuie sur plusieurs caméras calibrées. Les matchs amateurs sont généralement filmés avec une seule caméra fixe, et la balle ne fait que quelques pixels et apparaît souvent floue. L’objectif était d’extraire des données de match utiles de cette seule vue, comme la position des joueurs, la trajectoire de la balle et les frappes de chaque joueur.",
        architecture: [
          { label: "Vidéo", detail: "Images lues par lots avec OpenCV" },
          { label: "Joueurs", detail: "Détecteur YOLOv8 avec identifiants ByteTrack" },
          { label: "Balle", detail: "Prédictions par carte de chaleur de GridTrackNet" },
          { label: "Court", detail: "Homographie à partir des quatre coins du court" },
          { label: "Frappes", detail: "Balle proche d’un joueur en coordonnées du court" },
          { label: "Sortie", detail: "Vidéo annotée, mini-carte et nombre de frappes" },
        ],
        implementation: [
          "J’ai entraîné le détecteur de joueurs YOLOv8 sur un jeu de données annoté dans Roboflow et utilisé ByteTrack pour conserver des identifiants stables d’une image à l’autre.",
          "Quand un joueur n’est pas détecté, sa dernière position connue est conservée jusqu’à 20 images pour que la mini-carte reste stable.",
          "Les positions des joueurs et de la balle sont projetées sur le court par homographie, ce qui permet de distinguer le joueur proche du joueur éloigné et de mesurer les distances.",
          "Une frappe est détectée quand la balle s’approche d’un joueur en coordonnées du court. Une deuxième approche, fondée sur les pics du mouvement vertical de la balle, figure aussi dans le dépôt.",
          "J’ai écrit des scripts d’évaluation qui convertissent les prédictions au format MOTChallenge et calculent la précision, le rappel, la MOTA et la MOTP.",
        ],
        ownership: [
          ["Détection des joueurs", "YOLOv8 (Ultralytics), entraîné sur un jeu de données dédié"],
          ["Suivi des joueurs", "ByteTrack"],
          ["Suivi de la balle", "GridTrackNet"],
          ["Calibration du court et mini-carte", "OpenCV"],
          ["Détection des frappes et évaluation", "Python, pandas, SciPy"],
        ],
        results: [
          "Un pipeline complet, de la vidéo du match à une vidéo annotée avec cadres des joueurs, traînée de la balle, mini-carte et nombre de frappes.",
          "Des scripts d’évaluation de la détection et du suivi par rapport à une vérité terrain au format YOLO ou MOTChallenge.",
        ],
        limitations: [
          "La calibration du court est manuelle, il faut sélectionner les quatre coins pour chaque position de caméra.",
          "La détection de la balle est moins fiable en cas de flou de mouvement et d’occultation.",
          "La détection des frappes repose sur des règles, pas sur un modèle entraîné.",
        ],
        gallery: [{ kind: "Sortie du modèle", caption: "Sortie du détecteur sur terre battue, avec les deux joueurs loin de la caméra." }],
      },
    },

    voice: {
      discipline: "Projet de fin d’études · Université de Séville",
      summary:
        "Une application Flutter où les clients commandent en parlant à un chatbot. L’assistant utilise LangChain et GPT-4 pour répondre aux questions sur la carte et enregistrer la commande, ensuite envoyée à un panneau web React utilisé par le personnel du restaurant.",
      cover: { kind: "Captures d’écran", caption: "Le chatbot vocal mobile (à gauche) et le panneau de contrôle du personnel (à droite), tirés du dépôt." },
      links: [{ label: "Rapport (ES)" }],
    },

    cozmo: {
      discipline: "Robotique · Projet de MSc",
      summary:
        "Des programmes pour un robot Anki Cozmo. Le robot explore une arène, estime sa position par une mise à jour de filtre de Kalman à partir des repères muraux, évite les vides, ramasse des cubes et les transporte jusqu’à une cible le long d’un chemin A* qui garde une distance de sécurité avec les murs et les bords. Un projet précédent portait sur la localisation par filtre particulaire.",
      tags: ["Python", "Cozmo SDK", "NumPy", "Filtre de Kalman", "Planification A*", "Filtre particulaire"],
      cover: { kind: "Photo", caption: "Cozmo dans l’une des arènes de test réelles, avec murs, repères muraux et cubes cibles." },
      links: [{ label: "Vidéo de démo" }],
    },

    council: {
      discipline: "Orchestration multi-agents · Automatisation du développement",
      headline: "Un outil Python qui fait travailler ensemble deux agents de code IA.",
      summary:
        "Un outil Python qui fait passer une tâche de développement par deux agents de code. Codex CLI planifie et relit, Claude Code CLI implémente et Playwright vérifie le résultat dans un vrai navigateur avant que Git ne le commite.",
      status: { label: "V1 validée · V2 expérimentale" },
      cover: { kind: "Schéma", caption: "Flux de la V1 pour une tâche lancée par l’utilisateur." },
      cardText: ["Planifier", "Construire", "Tester", "Relire", "Commiter"],
      facts: [
        ["Lancé par", "L’utilisateur, une tâche par exécution"],
        ["Planification et revue", "Codex CLI"],
        ["Implémentation", "Claude Code CLI"],
        ["Vérifications", "Tests et captures Playwright"],
      ],
      caseStudy: {
        problem:
          "Utiliser deux assistants IA sur un même projet m’obligeait à copier les plans et les réponses de l’un à l’autre à la main. J’ai construit un outil qui mène une tâche de la planification jusqu’au commit en une seule commande, tout en laissant l’utilisateur choisir la tâche à lancer.",
        architecture: [
          { label: "Tâche", detail: "Une phrase, lancée en ligne de commande" },
          { label: "Plan", detail: "Codex CLI rédige le plan sans toucher au code" },
          { label: "Build", detail: "Claude Code CLI implémente et met à jour la documentation" },
          { label: "Vérification", detail: "Tests et captures Playwright sur desktop et mobile" },
          { label: "Revue", detail: "Codex CLI accepte le résultat ou le refuse avec des retours" },
          { label: "Commit", detail: "Commit Git, ou retour arrière si la correction échoue" },
        ],
        implementation: [
          "L’orchestrateur Python pilote les deux agents via leurs outils en ligne de commande ; il utilise donc les abonnements existants plutôt que des appels d’API payants.",
          "Le contexte du projet est stocké dans des fichiers Markdown (architecture, décisions, TODO, changelog), car les agents ne gardent aucune mémoire d’une exécution à l’autre.",
          "Quand le relecteur refuse un résultat, ses retours sont renvoyés automatiquement au développeur, et la correction repasse par les mêmes vérifications.",
          "Chaque étape acceptée est commitée, ce qui permet d’annuler proprement une correction ratée.",
        ],
        ownership: [
          ["Orchestration, prompts et mémoire du projet", "Python"],
          ["Planification, revue et génération de code", "Codex CLI, Claude Code CLI"],
          ["Tests dans le navigateur et captures", "Playwright"],
          ["Versionnage et retour arrière", "Git"],
        ],
        results: [
          "La V1 a mené des tâches complètes sur une application web de démonstration en une seule commande, du plan jusqu’au commit, avec le code, les tests, les captures, la revue et la documentation.",
          "Les résultats refusés ont été corrigés automatiquement, sans rien recopier à la main.",
          "Lors d’une exécution, un texte presque invisible a passé tous les tests mais a été repéré sur la capture, puis corrigé.",
        ],
        resultsNote: "La V1 traite une tâche à la fois, lancée par l’utilisateur. Elle ne gère pas de projet de façon autonome.",
        limitations: [
          "Testé uniquement sur une petite application de démonstration pour l’instant.",
          "Une seule tâche consomme une grande partie du quota d’utilisation des modèles.",
          "La V2 (une boucle continue avec conditions d’arrêt et validations enregistrées) est encore expérimentale.",
        ],
        gallery: [
          { kind: "Sortie d’exécution", caption: "Capture desktop prise par l’étape Playwright lors d’une exécution de la V1 sur l’application de démo (recadrée)." },
          { kind: "Sortie d’exécution", caption: "Capture mobile de la même exécution, utilisée par le relecteur pour vérifier la mise en page." },
        ],
      },
    },

    airflow: {
      discipline: "Data engineering · Python · PostgreSQL",
      headline: "Un pipeline Apache Airflow quotidien pour les données d’expédition.",
      summary:
        "Un pipeline de données en Python, construit avec Apache Airflow, qui traite des données logistiques et GPS, valide les enregistrements d’expédition, calcule des KPI de livraison et de rentabilité, détecte les retards potentiels et charge les résultats dans PostgreSQL.",
      status: { label: "Terminé" },
      cardCover: {
        kind: "Photo d’illustration",
        caption: "Terminal à conteneurs de nuit (Hambourg). Photo d’illustration, pas une capture du projet.",
        credit: { text: "Photo « Container Terminal Burchardkai night » de mybroetchen, CC BY 2.0, via Wikimedia Commons" },
      },
      cover: { kind: "Capture d’écran", caption: "Vue graphe d’Airflow du DAG daily_logistics_pipeline (recadrée)." },
      facts: [
        ["Orchestration", "Apache Airflow sous Docker"],
        ["Sources", "CSV d’expéditions et positions GPS"],
        ["Destination", "PostgreSQL"],
        ["Garde-fous", "Contrôle qualité et relances"],
      ],
      caseStudy: {
        problem:
          "Les données logistiques mêlent itinéraires, horaires, coûts et chiffre d’affaires, et elles sont souvent incomplètes ou incohérentes. Les équipes opérationnelles ont besoin de taux de ponctualité, de retards, de rentabilité et d’alertes précoces, calculés uniquement quand les données d’entrée sont fiables.",
        architecture: [
          { label: "Extraction", detail: "Fichiers d’expéditions et GPS chargés en parallèle" },
          { label: "Validation", detail: "Champs manquants, statuts et dates invalides" },
          { label: "Fusion + ETA", detail: "Dernière position GPS par expédition et risque de retard" },
          { label: "Transformation", detail: "Retards, catégories de retard, marge et rentabilité" },
          { label: "KPI + alertes", detail: "KPI globaux et par itinéraire ; six règles d’alerte" },
          { label: "Contrôle + chargement", detail: "S’arrête au-delà de 20 % de lignes invalides ; charge PostgreSQL" },
        ],
        implementation: [
          "Les lignes invalides sont enregistrées dans un fichier de qualité des données distinct au lieu d’être supprimées en silence.",
          "L’ETA correspond au dernier horodatage GPS plus la distance restante à 60 km/h de moyenne ; chaque expédition est marquée ON_TIME ou RISK_DELAY.",
          "Six règles d’alerte couvrent des cas comme les longs retards à l’arrivée, la faible rentabilité ou les longs trajets à faible marge.",
          "Chaque tâche est relancée deux fois avec un délai de cinq minutes, et une dernière tâche journalise un résumé de l’exécution.",
        ],
        ownership: [
          ["DAG, validation, KPI et alertes", "Python, Pandas, Apache Airflow"],
          ["Stockage", "PostgreSQL"],
          ["Exécution", "Docker Compose"],
        ],
        results: [
          "Sur une exécution d’exemple avec 20 expéditions, le taux de ponctualité est de 42 % et le retard moyen à l’arrivée de 33,7 minutes.",
          "Sur une exécution plus large de 500 lignes, aucune ligne n’était invalide, 171 alertes ont été levées et l’itinéraire le plus à risque a été identifié (Luxembourg → Nancy).",
        ],
        resultsNote: "Les données d’expédition et GPS sont simulées.",
        limitations: [
          "Les données d’entrée sont simulées ; il n’y a pas de flux en temps réel.",
          "L’ETA utilise une vitesse moyenne fixe plutôt que des données de trafic.",
        ],
        gallery: [
          { kind: "Capture d’écran", caption: "DAG de la phase 1 avec son historique d’exécution." },
          { kind: "Capture d’écran", caption: "DAG de la phase 2, avec extraction en parallèle, fusion GPS, ETA, contrôle qualité et résumé." },
          { kind: "Capture d’écran", caption: "Expéditions traitées chargées dans PostgreSQL." },
          { kind: "Capture d’écran", caption: "Services Airflow et PostgreSQL sous Docker." },
        ],
      },
    },

    fabric: {
      discipline: "Plateforme de données · Business intelligence",
      headline: "Une plateforme d’analyse des ventes de bout en bout dans Microsoft Fabric.",
      summary:
        "Les fichiers de ventes quotidiens sont chargés dans un Lakehouse, nettoyés avec PySpark en tables Delta, modélisés en schéma en étoile dans un Warehouse Fabric avec des dimensions SCD de type 1 et 2, puis restitués dans Power BI.",
      status: { label: "Projet de démonstration" },
      cover: { kind: "Capture d’écran", caption: "Vue de synthèse Power BI construite sur le schéma en étoile du Warehouse (données d’exemple)." },
      facts: [
        ["Architecture", "Bronze · Silver · Gold"],
        ["Traitement", "Notebooks PySpark"],
        ["Modèle de données", "Schéma en étoile, SCD1 et SCD2"],
        ["Reporting", "Power BI"],
      ],
      caseStudy: {
        problem:
          "L’objectif était de construire tout le chemin, des fichiers bruts quotidiens jusqu’à des rapports fiables, sur une seule plateforme, avec historique des dimensions, séparation nette entre données brutes et nettoyées, et un pipeline orchestré.",
        architecture: [
          { label: "Chargement", detail: "Fichiers CSV de ventes quotidiens dans le Lakehouse" },
          { label: "Bronze", detail: "Table des commandes brutes" },
          { label: "Silver", detail: "Commandes nettoyées en tables Delta (PySpark)" },
          { label: "Gold", detail: "Schéma en étoile du Warehouse, avec tables de faits et de dimensions" },
          { label: "Modèle", detail: "Modèle sémantique avec mesures DAX" },
          { label: "Rapport", detail: "Quatre pages de rapport Power BI" },
        ],
        implementation: [
          "Un pipeline Fabric enchaîne l’ingestion, le notebook de transformation PySpark et les étapes SQL du Warehouse.",
          "DimChannel utilise un SCD de type 1 (un MERGE qui écrase les changements) ; DimProduct utilise un SCD de type 2 et conserve l’historique avec dates de début et de fin et un indicateur de ligne courante.",
          "Les rapports couvrent le chiffre d’affaires, les commandes, les unités vendues et le panier moyen par canal, catégorie de produit et période.",
        ],
        ownership: [
          ["Notebooks de transformation", "PySpark, Delta Lake"],
          ["Staging et logique SCD", "SQL dans le Warehouse Fabric"],
          ["Mesures et rapports", "DAX, Power BI"],
          ["Orchestration", "Fabric Pipelines"],
        ],
        results: [
          "Le pipeline s’exécute de bout en bout dans Fabric, ingestion, transformation et mises à jour SCD comprises.",
          "Quatre pages de rapport, avec une synthèse, la performance par canal et par produit, un explorateur des ventes et une analyse temporelle.",
        ],
        resultsNote: "C’est une démonstration construite sur des fichiers d’exemple, pas un déploiement en production.",
        limitations: [
          "Les fichiers sont chargés à la main ; il n’y a pas de zone d’atterrissage automatisée.",
          "Les exécutions planifiées, la supervision et l’actualisation automatique des rapports ne sont pas encore en place.",
        ],
        gallery: [
          { kind: "Schéma du dépôt", caption: "Schéma en étoile dans le Warehouse." },
          { kind: "Capture d’écran", caption: "Pipeline Fabric." },
          { kind: "Capture d’écran", caption: "Page de rapport d’analyse temporelle." },
        ],
      },
    },

    clair: {
      discipline: "IA documentaire · Recherche et LLM",
      headline: "Une analyse de sinistres qui cite les clauses du contrat sur lesquelles elle s’appuie.",
      summary:
        "Un projet de recherche pour aider des gestionnaires de sinistres francophones à confronter un incident à un contrat d’assurance habitation. Il extrait les clauses des PDF de contrats, retrouve les plus pertinentes par recherche lexicale et sémantique, et n’accepte que les réponses du modèle dont les citations peuvent être vérifiées.",
      tags: ["Python", "FastAPI", "SQLite FTS5", "Recherche hybride", "React", "TypeScript", "Ollama", "pytest"],
      status: { label: "En développement · en local" },
      cover: { kind: "Schéma", caption: "Pipeline actuel (jalon M1). L’interface affiche des documents d’assureurs, elle n’est donc pas déployée publiquement." },
      facts: [
        ["Étape", "Jalon M1, validation technique"],
        ["Documents", "Contrats d’assurance habitation publics FR/LU"],
        ["Recherche", "SQLite FTS5 + embeddings locaux"],
        ["Déploiement", "En local uniquement"],
      ],
      caseStudy: {
        problem:
          "Un LLM donne facilement une réponse plausible sur une garantie d’assurance ; le plus difficile est de montrer d’où vient cette réponse. À partir d’un incident et d’un contrat, le système doit retrouver les garanties, exclusions et conditions pertinentes, les citer, et signaler les informations manquantes plutôt que deviner.",
        architecture: [
          { label: "Documents", detail: "Téléchargés depuis les URL officielles et vérifiés par SHA-256" },
          { label: "Extraction", detail: "Extraction du texte avec pypdf" },
          { label: "Segmentation", detail: "Clauses stockées dans un index SQLite local" },
          { label: "Recherche", detail: "Recherche lexicale et sémantique dans un seul contrat" },
          { label: "Analyse", detail: "Réponse du LLM validée par un schéma" },
          { label: "Contrôle", detail: "Vérification des citations et règles R1, R2 et R4" },
        ],
        implementation: [
          "J’ai choisi pypdf après avoir comparé plusieurs bibliothèques d’extraction de PDF, puis construit la segmentation des clauses et un index SQLite FTS5.",
          "La recherche combine mots-clés et embeddings locaux, et reste toujours limitée au contrat sélectionné.",
          "Chaque citation d’une réponse du modèle est vérifiée. La clause doit faire partie de celles fournies, et le texte cité doit y figurer. Sans citation valide, la réponse devient INSUFFICIENT_INFORMATION.",
          "Le backend est un service FastAPI avec une interface React en français. Un fournisseur Ollama local n’accepte que les connexions locales et vérifie la longueur de contexte du modèle après chaque appel.",
        ],
        ownership: [
          ["Pipeline documentaire, recherche et contrôles", "Python, SQLite FTS5"],
          ["API", "FastAPI"],
          ["Interface", "React, TypeScript"],
          ["Modèles de langage", "Qwen via Ollama ; Gemma via OpenRouter pour les cas fictifs"],
        ],
        results: [
          "Lors d’une comparaison locale sur 12 cas fictifs et d’exercice, Qwen3.5 9B a donné une réponse acceptable dans 11 cas, contre 5 pour qwen2.5:7b, avec un temps médian de 37 s par cas.",
          "La recherche hybride fonctionne, mais le recall@10 est d’environ 37 %, en dessous de l’objectif.",
        ],
        resultsNote: "L’analyse par le modèle ne porte pour l’instant que sur des cas fictifs, et les résultats demandent toujours une vérification humaine.",
        limitations: [
          "Les vrais documents d’assureurs ne sont encore envoyés à aucun modèle, en raison de contraintes de partage des données.",
          "Le rappel de la recherche doit encore progresser.",
          "Il n’y a pas de démo publique, car l’API tourne en local et le contenu des assureurs n’est pas publié.",
        ],
      },
    },
  },

  experience: {
    "exp-sword": {
      period: "Avr. 2026 — aujourd’hui",
      role: "Ingénieur Data & IA",
      context: "Mission chez EBTrans (logistique)",
      summary:
        "Je suis responsable du volet automatisation et IA de ma mission chez EBTrans. Je développe des outils Python, des flux d’intégration de données et des applications d’IA qui améliorent les processus internes et soutiennent les équipes métier, et je contribue au reporting et aux sujets liés aux données.",
      points: [
        "Je pilote les initiatives d’automatisation et d’IA de la mission, en identifiant des cas d’usage concrets et en construisant des solutions internes.",
        "Je développe des composants Python et SQL pour l’intégration de données entre systèmes métier, avec PostgreSQL, Talend et des API REST.",
        "Je construis des workflows n8n pour le traitement de documents, l’extraction structurée avec OCR et LLM, la validation et l’automatisation de processus.",
        "Je travaille sur des applications d’IA à base de LLM, de RAG et d’agents IA pour des cas d’usage internes.",
        "Je collabore avec les équipes techniques et métier sur le développement, les tests, le débogage et le support en production.",
        "J’ai préparé et présenté en interne une session sur l’IA et l’automatisation avec n8n, avec des démonstrations en direct.",
      ],
    },
    "exp-obr": {
      period: "Sept. 2024 — juin 2025",
      role: "Ingénieur IA, perception",
      context: "Équipe Formula Student AI",
      summary: "Membre du groupe perception de la voiture autonome Formula Student de l’université.",
      points: [
        "J’ai développé la détection et le suivi des cônes avec YOLOv8 pour la voiture, en lien avec les équipes navigation et contrôle.",
        "J’ai constitué un jeu d’entraînement de plus de 3 000 images, amélioré la précision de détection de 15 % et fait passer la vitesse d’inférence de 22 à 30 FPS.",
        "L’équipe a terminé 2e de Formula Student UK AI.",
      ],
    },
    "exp-sopra": {
      period: "Sept. 2023 — avr. 2024",
      role: "Ingénieur logiciel stagiaire",
      context: "Séville, Espagne",
      summary: "Développement backend et traitement de données pour des clients internationaux.",
      points: [
        "J’ai développé des composants backend avec Java, Spring Boot, FastAPI et SQL.",
        "J’ai écrit des étapes d’ingestion et de transformation de données semi-structurées.",
        "J’ai créé des tableaux de bord Power BI pour suivre les données traitées, dans une équipe qui travaillait en espagnol et en français.",
      ],
    },
  },

  education: [
    {
      title: "MSc en intelligence artificielle",
      org: "Oxford Brookes University, Royaume-Uni",
      note: "Mention Distinction. Mémoire sur le suivi d’objets petits et rapides (l’Amateur Tennis CV System).",
    },
    {
      title: "Grado (licence) en ingénierie informatique",
      org: "Université de Séville, Espagne",
      note: "Spécialité technologies de l’information. Mon projet de fin d’études était le Smart Voice Restaurant Assistant.",
    },
  ],

  expertise: [
    {
      domain: "Ingénierie logicielle",
      items: ["Python", "Java", "SQL", "Développement backend", "API REST", "FastAPI", "Spring Boot", "Git", "Docker", "Linux", "Tests", "CI/CD"],
    },
    {
      domain: "IA et automatisation",
      items: ["LLM", "RAG", "Agents IA", "LangChain", "n8n", "OCR", "Traitement de documents", "Automatisation de workflows", "Intégration de systèmes"],
    },
    {
      domain: "Vision par ordinateur et systèmes autonomes",
      items: ["OpenCV", "YOLOv8", "Détection et suivi d’objets", "PyTorch", "ROS", "SLAM", "Filtrage de Kalman", "Localisation"],
    },
    {
      domain: "Data engineering et analytique",
      items: ["PostgreSQL", "Talend", "ETL / ELT", "Apache Airflow", "PySpark", "Microsoft Fabric", "AWS", "Power BI", "QuickSight"],
    },
  ],

  archive: [
    { note: "Application de bureau WPF en MVVM" },
    { title: "Assistant de voyage VisAI", note: "Chatbot de voyage avec LLM et API externes" },
    { note: "Annonces de refuges collectées par scraping, avec recherche plein texte" },
    { title: "Lecteur de pièces d’identité", note: "Extraction OCR de pièces d’identité françaises et britanniques" },
    { title: "Projets de réseaux de neurones", note: "Cinq exercices sur les CNN, l’augmentation de données et le transfer learning" },
    { note: "Petit jeu d’arcade" },
    { title: "Analyse de sentiments", note: "Analyse de sentiments d’avis sur des jeux vidéo" },
  ],
};
