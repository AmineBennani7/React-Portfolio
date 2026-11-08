// Spanish content, laid over the English source data (src/data/*).
// Only text is translated; names of projects, companies and technologies stay as they are.

export const es = {
  categories: {
    all: "Todos",
    cv: "Visión por computador",
    robotics: "Robótica",
    ai: "IA y LLM",
    data: "Datos",
    software: "Software",
  },

  projects: {
    obr: {
      discipline: "Formula Student AI · Proyecto de equipo",
      summary:
        "Percepción para el coche autónomo de Formula Student del equipo. Dentro del grupo de percepción trabajé en la detección y el seguimiento de conos con YOLOv8, desde la creación de los datos de entrenamiento hasta conseguir que el modelo fuera más rápido en el coche.",
      cover: { kind: "Cámara a bordo", caption: "Detecciones de conos desde la cámara a bordo del coche." },
      stats: [
        ["3.000+", "imágenes de entrenamiento"],
        ["+15 %", "de precisión en la detección"],
        ["22 → 30", "FPS"],
        ["2.º", "Formula Student UK AI (equipo)"],
      ],
      links: [{ label: "Ver la experiencia" }],
    },

    gps: {
      discipline: "Análisis geoespacial · Ingeniería espacial",
      headline: "Limpieza y análisis de trazas GPS de vehículos.",
      summary:
        "Una aplicación en Python que limpia datos GPS en bruto de vehículos y detecta paradas, trayectos, eventos de geocercas y velocidades anómalas. Guarda los resultados en PostGIS, se ejecuta en Docker y tiene tests automatizados.",
      status: { label: "Terminado" },
      cover: {
        kind: "Captura de pantalla",
        caption: "Mapa de Streamlit con cuatro trayectorias de vehículos, las paradas detectadas y las geocercas en Sevilla (datos sintéticos).",
      },
      facts: [
        ["Entrada", "CSV · GPX · GeoJSON"],
        ["Datos", "Flota sintética, 3 vehículos, 2 días"],
        ["Almacenamiento", "PostGIS, GeoJSON, CSV"],
        ["Tests", "pytest y Ruff"],
      ],
      caseStudy: {
        problem:
          "Los datos GPS en bruto incluyen marcas de tiempo vacías, coordenadas (0, 0), duplicados, posiciones imprecisas y saltos repentinos de varios kilómetros. Si se usan tal cual, las distancias y las velocidades salen mal. Quería un pipeline que limpiara los datos, registrara por qué se descartaba cada punto y después aplicara un análisis útil de trayectorias y espacial sobre el resultado.",
        architecture: [
          { label: "Lectura", detail: "Lectores de CSV, GPX y GeoJSON que generan una tabla común" },
          { label: "Validación", detail: "Comprobaciones por reglas; cada registro descartado guarda el motivo" },
          { label: "Limpieza", detail: "Elimina saltos GPS que supondrían más de 200 km/h" },
          { label: "Procesado", detail: "Trayectorias, paradas, trayectos y anomalías de velocidad" },
          { label: "Espacial", detail: "Geocercas, uniones espaciales y buffers en ETRS89 / UTM 30N" },
          { label: "Salida", detail: "Almacenamiento en PostGIS, exportación de ficheros y panel en Streamlit" },
        ],
        implementation: [
          "Escribí los lectores, las reglas de validación y un informe de calidad de datos que muestra la distancia en cada fase de la limpieza.",
          "Las trayectorias, la detección de paradas y la división en trayectos usan MovingPandas; las distancias se miden en un sistema de coordenadas proyectado (EPSG:25830).",
          "Los lugares frecuentes se obtienen agrupando paradas con DBSCAN. Las velocidades inusuales y las frenadas bruscas se marcan con un z-score robusto por vehículo.",
          "Las rutas se comparan con la distancia de Hausdorff, la distancia de Fréchet y el solapamiento de buffers.",
          "Las entradas, salidas y tiempos de permanencia en geocercas se calculan con uniones espaciales; las consultas de PostGIS usan un índice espacial GiST.",
        ],
        ownership: [
          ["Lectores y reglas de validación", "Python, pandas, gpxpy"],
          ["Trayectorias, paradas y trayectos", "MovingPandas"],
          ["Lugares frecuentes", "scikit-learn DBSCAN"],
          ["Similitud de rutas", "Shapely"],
          ["Geocercas y uniones espaciales", "GeoPandas"],
          ["Almacenamiento y consultas", "PostGIS, SQLAlchemy, GeoAlchemy2"],
          ["Panel y mapas", "Streamlit, Folium, Altair"],
        ],
        results: [
          "Con los datos de ejemplo de la flota se leyeron 2.046 registros, de los que 2.031 eran válidos (99,3 %) y 15 se descartaron, cada uno con su motivo.",
          "4 trayectorias, 34,0 km, 11 paradas y 15 trayectos detectados.",
          "La misma ruta hecha dos días distintos coincide casi del todo, con una distancia de Hausdorff de 13,8 m, una de Fréchet de 13,9 m y un 100 % de solapamiento.",
          "Se detectó el tramo rápido que añadí a propósito, con 7 puntos entre 72 y 84 km/h.",
        ],
        resultsNote: "Los resultados proceden de datos de ejemplo sintéticos, con errores añadidos a propósito.",
        limitations: [
          "Los datos de ejemplo son sintéticos; el pipeline todavía no se ha probado con registros GPS reales.",
          "El ajuste a la carretera usa la vía más cercana, no un map matching completo.",
          "La regla de velocidad anómala es estadística y no tiene en cuenta los límites de velocidad.",
        ],
        gallery: [
          { kind: "Captura de pantalla", caption: "Traza en bruto (discontinua) y traza limpia. La línea que sale del mapa es un salto GPS; los círculos blancos son puntos poco precisos." },
          { kind: "Captura de pantalla", caption: "Pestaña de calidad de datos, con los registros descartados por motivo y la distancia en cada fase de la limpieza." },
          { kind: "Captura de pantalla", caption: "Eventos de geocercas y tiempo en cada zona." },
          { kind: "Captura de pantalla", caption: "Perfiles de velocidad y aceleración." },
        ],
      },
    },

    tennis: {
      discipline: "Visión por computador · Tesis de MSc",
      headline: "Seguimiento de jugadores y pelota en vídeos de tenis amateur.",
      summary:
        "Es mi tesis de MSc, un pipeline que sigue a los jugadores con YOLOv8 y ByteTrack y una pelota pequeña y rápida con GridTrackNet, lo proyecta todo sobre la pista con una homografía y genera un vídeo anotado con minimapa y recuento de golpes.",
      status: { label: "Terminado" },
      cover: {
        kind: "Salida del sistema",
        caption: "Salida del sistema, con los jugadores seguidos y su ID, la posición de la pelota, los contadores de golpes y una vista cenital de la pista (arriba a la derecha).",
      },
      facts: [
        ["Jugadores", "YOLOv8 + ByteTrack"],
        ["Pelota", "GridTrackNet"],
        ["Proyección en la pista", "Homografía de 4 puntos"],
        ["Evaluación", "Precisión, recall, MOTA, MOTP"],
      ],
      caseStudy: {
        problem:
          "Fue mi proyecto de tesis de MSc en Oxford Brookes. El análisis del tenis profesional se apoya en varias cámaras calibradas. Los partidos amateur suelen grabarse con una sola cámara fija, y la pelota ocupa apenas unos píxeles y a menudo sale borrosa. El objetivo era sacar datos útiles del partido con esa única vista, como la posición de los jugadores, la trayectoria de la pelota y los golpes de cada uno.",
        architecture: [
          { label: "Vídeo", detail: "Fotogramas leídos por lotes con OpenCV" },
          { label: "Jugadores", detail: "Detector YOLOv8 con identificadores de ByteTrack" },
          { label: "Pelota", detail: "Predicciones de mapas de calor de GridTrackNet" },
          { label: "Pista", detail: "Homografía a partir de las cuatro esquinas de la pista" },
          { label: "Golpes", detail: "Pelota cerca de un jugador en coordenadas de pista" },
          { label: "Salida", detail: "Vídeo anotado, minimapa y recuento de golpes" },
        ],
        implementation: [
          "Entrené el detector de jugadores YOLOv8 con un dataset etiquetado en Roboflow y usé ByteTrack para mantener IDs estables entre fotogramas.",
          "Cuando no se detecta a un jugador, se conserva su última posición conocida durante un máximo de 20 fotogramas para que el minimapa no salte.",
          "Las posiciones de los jugadores y de la pelota se proyectan sobre la pista con una homografía, que sirve para distinguir al jugador cercano del lejano y para medir distancias.",
          "Un golpe se detecta cuando la pelota se acerca a un jugador en coordenadas de pista. En el repositorio también hay un segundo enfoque basado en los picos del movimiento vertical de la pelota.",
          "Escribí scripts de evaluación que convierten las predicciones al formato MOTChallenge y calculan precisión, recall, MOTA y MOTP.",
        ],
        ownership: [
          ["Detección de jugadores", "YOLOv8 (Ultralytics), entrenado con un dataset propio"],
          ["Seguimiento de jugadores", "ByteTrack"],
          ["Seguimiento de la pelota", "GridTrackNet"],
          ["Calibración de la pista y minimapa", "OpenCV"],
          ["Detección de golpes y evaluación", "Python, pandas, SciPy"],
        ],
        results: [
          "Un pipeline completo, del vídeo del partido a un vídeo anotado con los recuadros de los jugadores, la estela de la pelota, el minimapa y el recuento de golpes.",
          "Scripts de evaluación de la detección y el seguimiento frente a ground truth en formato YOLO o MOTChallenge.",
        ],
        limitations: [
          "La calibración de la pista es manual y hay que seleccionar las cuatro esquinas para cada posición de cámara.",
          "La detección de la pelota es menos fiable con desenfoque de movimiento y oclusiones.",
          "La detección de golpes se basa en reglas, no en un modelo entrenado.",
        ],
        gallery: [{ kind: "Salida del modelo", caption: "Salida del detector en tierra batida, con los dos jugadores lejos de la cámara." }],
      },
    },

    voice: {
      discipline: "Trabajo de fin de grado · Universidad de Sevilla",
      summary:
        "Una app en Flutter en la que los clientes piden la comida hablando con un chatbot. El asistente usa LangChain y GPT-4 para responder preguntas sobre la carta y registrar el pedido, que se envía a un panel web en React que usa el personal del restaurante.",
      cover: { kind: "Capturas de pantalla", caption: "El chatbot de voz en el móvil (izquierda) y el panel de control del personal (derecha), sacados del repositorio." },
      links: [{ label: "Memoria (ES)" }],
    },

    cozmo: {
      discipline: "Robótica · Proyecto del MSc",
      summary:
        "Programas para un robot Anki Cozmo. El robot explora un escenario, estima su posición con una actualización de filtro de Kalman a partir de marcadores en las paredes, evita los bordes, recoge cubos y los lleva hasta un objetivo por un camino A* que mantiene una distancia de seguridad con paredes y bordes. Un proyecto anterior trató la localización con filtro de partículas.",
      tags: ["Python", "Cozmo SDK", "NumPy", "Filtro de Kalman", "Planificación A*", "Filtro de partículas"],
      cover: { kind: "Foto", caption: "Cozmo en uno de los escenarios de prueba reales, con paredes, marcadores y cubos objetivo." },
      links: [{ label: "Vídeo de la demo" }],
    },

    council: {
      discipline: "Orquestación multiagente · Automatización del desarrollo",
      headline: "Una herramienta en Python que hace trabajar juntos a dos agentes de código con IA.",
      summary:
        "Una herramienta en Python que pasa una tarea de desarrollo por dos agentes de código. Codex CLI planifica y revisa, Claude Code CLI implementa y Playwright comprueba el resultado en un navegador real antes de que Git haga el commit.",
      status: { label: "V1 validada · V2 experimental" },
      cover: { kind: "Diagrama", caption: "Flujo de la V1 para una tarea lanzada por el usuario." },
      cardText: ["Planificar", "Implementar", "Probar", "Revisar", "Commit"],
      facts: [
        ["Lo lanza", "El usuario, una tarea por ejecución"],
        ["Planificación y revisión", "Codex CLI"],
        ["Implementación", "Claude Code CLI"],
        ["Comprobaciones", "Tests y capturas de Playwright"],
      ],
      caseStudy: {
        problem:
          "Usar dos asistentes de IA en el mismo proyecto me obligaba a copiar a mano planes y respuestas de uno a otro. Construí una herramienta que lleva una tarea desde la planificación hasta el commit con un solo comando, y el usuario sigue decidiendo qué tarea lanzar.",
        architecture: [
          { label: "Tarea", detail: "Una frase, lanzada desde la línea de comandos" },
          { label: "Plan", detail: "Codex CLI escribe el plan sin tocar el código" },
          { label: "Build", detail: "Claude Code CLI implementa y actualiza la documentación" },
          { label: "Verificación", detail: "Tests y capturas de Playwright en escritorio y móvil" },
          { label: "Revisión", detail: "Codex CLI acepta el resultado o lo rechaza con comentarios" },
          { label: "Commit", detail: "Commit en Git, o vuelta atrás si la corrección falla" },
        ],
        implementation: [
          "El orquestador en Python controla los dos agentes a través de sus herramientas de línea de comandos, así que usa las suscripciones existentes en lugar de llamadas de pago a la API.",
          "El contexto del proyecto se guarda en ficheros Markdown (arquitectura, decisiones, TODO, changelog), porque los agentes no conservan memoria entre ejecuciones.",
          "Cuando el revisor rechaza un resultado, sus comentarios vuelven automáticamente al desarrollador y la corrección pasa por las mismas comprobaciones.",
          "Cada paso aceptado se guarda con un commit, de modo que una corrección fallida se puede deshacer limpiamente.",
        ],
        ownership: [
          ["Orquestación, prompts y memoria del proyecto", "Python"],
          ["Planificación, revisión y generación de código", "Codex CLI, Claude Code CLI"],
          ["Tests en el navegador y capturas", "Playwright"],
          ["Control de versiones y vuelta atrás", "Git"],
        ],
        results: [
          "La V1 completó tareas enteras en una app web de demostración con un solo comando, desde el plan hasta el commit, con el código, los tests, las capturas, la revisión y la documentación.",
          "Los resultados rechazados se corrigieron automáticamente, sin copiar nada a mano.",
          "En una ejecución, un texto casi invisible pasó todos los tests, pero se detectó en la captura y se corrigió.",
        ],
        resultsNote: "La V1 ejecuta una tarea cada vez, lanzada por el usuario. No gestiona proyectos de forma autónoma.",
        limitations: [
          "Por ahora solo se ha probado en una pequeña app de demostración.",
          "Una sola tarea consume buena parte de la cuota de uso de los modelos.",
          "La V2 (un bucle continuo con condiciones de parada y aprobaciones registradas) sigue siendo experimental.",
        ],
        gallery: [
          { kind: "Salida de ejecución", caption: "Captura de escritorio tomada por el paso de Playwright en una ejecución de la V1 sobre la app de demo (recortada)." },
          { kind: "Salida de ejecución", caption: "Captura móvil de la misma ejecución, que el revisor usa para comprobar el diseño." },
        ],
      },
    },

    airflow: {
      discipline: "Ingeniería de datos · Python · PostgreSQL",
      headline: "Un pipeline diario en Apache Airflow para datos de envíos.",
      summary:
        "Un pipeline de datos en Python, construido con Apache Airflow, que procesa datos logísticos y GPS, valida los registros de envíos, calcula KPI de entrega y rentabilidad, detecta posibles retrasos y carga los resultados en PostgreSQL.",
      status: { label: "Terminado" },
      cardCover: {
        kind: "Foto ilustrativa",
        caption: "Terminal de contenedores de noche (Hamburgo). Foto ilustrativa, no una captura del proyecto.",
        credit: { text: "Foto «Container Terminal Burchardkai night» de mybroetchen, CC BY 2.0, vía Wikimedia Commons" },
      },
      cover: { kind: "Captura de pantalla", caption: "Vista de grafo de Airflow del DAG daily_logistics_pipeline (recortada)." },
      facts: [
        ["Orquestación", "Apache Airflow en Docker"],
        ["Fuentes", "CSV de envíos y posiciones GPS"],
        ["Destino", "PostgreSQL"],
        ["Salvaguardas", "Control de calidad y reintentos"],
      ],
      caseStudy: {
        problem:
          "Los datos logísticos mezclan rutas, horarios, costes e ingresos, y a menudo están incompletos o son incoherentes. Los equipos de operaciones necesitan tasas de puntualidad, retrasos, rentabilidad y alertas tempranas, calculadas solo cuando los datos de entrada son fiables.",
        architecture: [
          { label: "Extracción", detail: "Ficheros de envíos y GPS cargados en paralelo" },
          { label: "Validación", detail: "Campos vacíos, estados y fechas no válidos" },
          { label: "Unión + ETA", detail: "Última posición GPS por envío y riesgo de retraso" },
          { label: "Transformación", detail: "Retrasos, categorías de retraso, beneficio y margen" },
          { label: "KPI + alertas", detail: "KPI globales y por ruta; seis reglas de alerta" },
          { label: "Control + carga", detail: "Se detiene con más de un 20 % de filas no válidas; carga PostgreSQL" },
        ],
        implementation: [
          "Las filas no válidas se guardan en un fichero aparte de calidad de datos en lugar de descartarse sin avisar.",
          "La ETA es la última marca de tiempo GPS más la distancia restante a una media de 60 km/h; cada envío se marca como ON_TIME o RISK_DELAY.",
          "Seis reglas de alerta cubren casos como grandes retrasos en la llegada, baja rentabilidad o trayectos largos con poco margen.",
          "Cada tarea se reintenta dos veces con cinco minutos de espera, y una tarea final registra un resumen de la ejecución.",
        ],
        ownership: [
          ["DAG, validación, KPI y alertas", "Python, Pandas, Apache Airflow"],
          ["Almacenamiento", "PostgreSQL"],
          ["Ejecución", "Docker Compose"],
        ],
        results: [
          "En una ejecución de ejemplo con 20 envíos, la puntualidad fue del 42 % y el retraso medio en la llegada de 33,7 minutos.",
          "En una ejecución más grande con 500 filas no hubo ninguna fila no válida, saltaron 171 alertas y se identificó la ruta con más riesgo (Luxemburgo → Nancy).",
        ],
        resultsNote: "Los datos de envíos y GPS son simulados.",
        limitations: [
          "Los datos de entrada son simulados; no hay un flujo de datos en tiempo real.",
          "La ETA usa una velocidad media fija en lugar de datos de tráfico.",
        ],
        gallery: [
          { kind: "Captura de pantalla", caption: "DAG de la fase 1 con su historial de ejecuciones." },
          { kind: "Captura de pantalla", caption: "DAG de la fase 2, con extracción en paralelo, unión con GPS, ETA, control de calidad y resumen." },
          { kind: "Captura de pantalla", caption: "Envíos procesados cargados en PostgreSQL." },
          { kind: "Captura de pantalla", caption: "Servicios de Airflow y PostgreSQL en Docker." },
        ],
      },
    },

    fabric: {
      discipline: "Plataforma de datos · Business intelligence",
      headline: "Una plataforma de análisis de ventas de principio a fin en Microsoft Fabric.",
      summary:
        "Los ficheros de ventas diarios se cargan en un Lakehouse, se limpian con PySpark en tablas Delta, se modelan como esquema en estrella en un Warehouse de Fabric con dimensiones SCD de tipo 1 y 2, y se presentan en Power BI.",
      status: { label: "Proyecto de demostración" },
      cover: { kind: "Captura de pantalla", caption: "Resumen ejecutivo en Power BI construido sobre el esquema en estrella del Warehouse (datos de ejemplo)." },
      facts: [
        ["Arquitectura", "Bronze · Silver · Gold"],
        ["Procesado", "Notebooks de PySpark"],
        ["Modelo de datos", "Esquema en estrella, SCD1 y SCD2"],
        ["Informes", "Power BI"],
      ],
      caseStudy: {
        problem:
          "El objetivo era construir todo el recorrido, de los ficheros diarios en bruto a informes fiables, en una sola plataforma, con historial de dimensiones, una separación clara entre datos en bruto y limpios, y un pipeline orquestado.",
        architecture: [
          { label: "Carga", detail: "Ficheros CSV de ventas diarios en el Lakehouse" },
          { label: "Bronze", detail: "Tabla de pedidos en bruto" },
          { label: "Silver", detail: "Pedidos limpios en tablas Delta (PySpark)" },
          { label: "Gold", detail: "Esquema en estrella del Warehouse, con tablas de hechos y dimensiones" },
          { label: "Modelo", detail: "Modelo semántico con medidas DAX" },
          { label: "Informe", detail: "Cuatro páginas de informe en Power BI" },
        ],
        implementation: [
          "Un pipeline de Fabric ejecuta en orden la ingesta, el notebook de transformación en PySpark y los pasos SQL del Warehouse.",
          "DimChannel usa SCD de tipo 1 (un MERGE que sobrescribe los cambios); DimProduct usa SCD de tipo 2 y conserva el historial con fechas de inicio y fin y un indicador de fila vigente.",
          "Los informes cubren ingresos, pedidos, unidades vendidas y ticket medio por canal, categoría de producto y periodo.",
        ],
        ownership: [
          ["Notebooks de transformación", "PySpark, Delta Lake"],
          ["Staging y lógica SCD", "SQL en el Warehouse de Fabric"],
          ["Medidas e informes", "DAX, Power BI"],
          ["Orquestación", "Fabric Pipelines"],
        ],
        results: [
          "El pipeline se ejecuta de principio a fin en Fabric, incluidas la ingesta, la transformación y las actualizaciones SCD.",
          "Cuatro páginas de informe, con un resumen ejecutivo, el rendimiento por canal y producto, un explorador de ventas y un análisis temporal.",
        ],
        resultsNote: "Es una demostración construida con ficheros de ejemplo, no un despliegue en producción.",
        limitations: [
          "Los ficheros se cargan a mano; no hay una zona de aterrizaje automatizada.",
          "Todavía no hay ejecuciones programadas, monitorización ni actualización automática de los informes.",
        ],
        gallery: [
          { kind: "Diagrama del repositorio", caption: "Esquema en estrella en el Warehouse." },
          { kind: "Captura de pantalla", caption: "Pipeline de Fabric." },
          { kind: "Captura de pantalla", caption: "Página de informe de análisis temporal." },
        ],
      },
    },

    clair: {
      discipline: "IA documental · Recuperación de información y LLM",
      headline: "Análisis de siniestros que cita las cláusulas del contrato en las que se basa.",
      summary:
        "Un proyecto de investigación para ayudar a tramitadores de siniestros francófonos a contrastar un incidente con una póliza de seguro de hogar. Extrae las cláusulas de los PDF de las pólizas, encuentra las relevantes con búsqueda léxica y semántica, y solo acepta respuestas del modelo cuyas citas se puedan verificar.",
      tags: ["Python", "FastAPI", "SQLite FTS5", "Búsqueda híbrida", "React", "TypeScript", "Ollama", "pytest"],
      status: { label: "En desarrollo · en local" },
      cover: { kind: "Diagrama", caption: "Pipeline actual (hito M1). La interfaz muestra documentos de aseguradoras, por eso no está desplegada públicamente." },
      facts: [
        ["Fase", "Hito M1, validación técnica"],
        ["Documentos", "Pólizas de hogar públicas de FR/LU"],
        ["Búsqueda", "SQLite FTS5 + embeddings locales"],
        ["Despliegue", "Solo en local"],
      ],
      caseStudy: {
        problem:
          "Un LLM da con facilidad una respuesta verosímil sobre una cobertura; lo difícil es mostrar de dónde sale. A partir de un incidente y una póliza, el sistema debe encontrar las garantías, exclusiones y condiciones relevantes, citarlas e indicar cuándo falta información en lugar de adivinar.",
        architecture: [
          { label: "Documentos", detail: "Descargados de las URL oficiales y comprobados con SHA-256" },
          { label: "Extracción", detail: "Extracción de texto con pypdf" },
          { label: "Segmentación", detail: "Cláusulas guardadas en un índice SQLite local" },
          { label: "Búsqueda", detail: "Búsqueda léxica y semántica dentro de un contrato" },
          { label: "Análisis", detail: "Respuesta del LLM validada con un esquema" },
          { label: "Control", detail: "Comprobación de citas y reglas R1, R2 y R4" },
        ],
        implementation: [
          "Elegí pypdf tras comparar varias librerías de extracción de PDF y después construí la segmentación de cláusulas y un índice SQLite FTS5.",
          "La búsqueda combina palabras clave y embeddings locales, siempre limitada al contrato seleccionado.",
          "Cada cita de una respuesta del modelo se comprueba. La cláusula tiene que estar entre las proporcionadas y el texto citado tiene que aparecer en ella. Sin una cita válida, la respuesta pasa a ser INSUFFICIENT_INFORMATION.",
          "El backend es un servicio FastAPI con una interfaz en React en francés. Un proveedor local de Ollama solo acepta conexiones locales y comprueba la longitud de contexto del modelo tras cada llamada.",
        ],
        ownership: [
          ["Pipeline documental, búsqueda y controles", "Python, SQLite FTS5"],
          ["API", "FastAPI"],
          ["Interfaz", "React, TypeScript"],
          ["Modelos de lenguaje", "Qwen con Ollama; Gemma con OpenRouter para los casos ficticios"],
        ],
        results: [
          "En una comparación local con 12 casos ficticios y de ejercicio, Qwen3.5 9B dio una respuesta aceptable en 11 casos, frente a 5 de qwen2.5:7b, con un tiempo mediano de 37 s por caso.",
          "La búsqueda híbrida funciona, pero el recall@10 ronda el 37 %, por debajo del objetivo.",
        ],
        resultsNote: "Por ahora el análisis con el modelo solo se aplica a casos ficticios, y los resultados siempre requieren revisión humana.",
        limitations: [
          "Todavía no se envían documentos reales de aseguradoras a ningún modelo, por restricciones en el uso compartido de datos.",
          "El recall de la búsqueda tiene que mejorar.",
          "No hay demo pública, porque la API se ejecuta en local y el contenido de las aseguradoras no se publica.",
        ],
      },
    },
  },

  experience: {
    "exp-sword": {
      period: "Feb. 2026 — actualidad",
      role: "Ingeniero de Datos e IA",
      context: "Proyecto para EBTrans (logística)",
      summary:
        "Soy el responsable de la parte de automatización e IA de mi proyecto en EBTrans. Desarrollo herramientas en Python, flujos de integración de datos y aplicaciones de IA que mejoran los procesos internos y dan soporte a los equipos de negocio, y colaboro en tareas de reporting y de datos.",
      points: [
        "Lidero las iniciativas de automatización e IA del proyecto, identificando casos de uso prácticos y desarrollando soluciones internas.",
        "Desarrollo componentes en Python y SQL para integrar datos entre sistemas de negocio, con PostgreSQL, Talend y API REST.",
        "Construyo workflows en n8n para procesar documentos, hacer extracción estructurada con OCR y LLM, validar datos y automatizar procesos.",
        "Trabajo en aplicaciones de IA con LLM, RAG y agentes de IA para casos de uso internos.",
        "Colaboro con equipos técnicos y de negocio en desarrollo, pruebas, depuración y soporte en producción.",
        "Preparé e impartí una presentación interna sobre IA y automatización con n8n, con demos en directo.",
      ],
    },
    "exp-obr": {
      period: "Sept. 2024 — jun. 2025",
      role: "Ingeniero de IA, percepción",
      context: "Equipo de Formula Student AI",
      summary: "Miembro del grupo de percepción del coche autónomo de Formula Student de la universidad.",
      points: [
        "Desarrollé la detección y el seguimiento de conos con YOLOv8 para el coche, junto a los equipos de navegación y control.",
        "Creé un dataset de entrenamiento de más de 3.000 imágenes, mejoré la precisión de detección un 15 % y aumenté la velocidad de inferencia de 22 a 30 FPS.",
        "El equipo quedó 2.º en Formula Student UK AI.",
      ],
    },
    "exp-sopra": {
      period: "Sept. 2023 — abr. 2024",
      role: "Ingeniero de software en prácticas",
      context: "Sevilla, España",
      summary: "Desarrollo backend y procesamiento de datos para clientes internacionales.",
      points: [
        "Desarrollé componentes backend con Java, Spring Boot, FastAPI y SQL.",
        "Escribí pasos de ingesta y transformación de datos semiestructurados.",
        "Creé paneles en Power BI para seguir los datos procesados, en un equipo que trabajaba en español y en francés.",
      ],
    },
  },

  education: [
    {
      title: "MSc en Inteligencia Artificial",
      org: "Oxford Brookes University, Reino Unido",
      note: "Con Distinction. Tesis sobre el seguimiento de objetos pequeños y rápidos (el Amateur Tennis CV System).",
    },
    {
      title: "Grado en Ingeniería Informática",
      org: "Universidad de Sevilla, España",
      note: "Mención en Tecnologías de la Información. Mi trabajo de fin de grado fue el Smart Voice Restaurant Assistant.",
    },
  ],

  expertise: [
    {
      domain: "Ingeniería de software",
      items: ["Python", "Java", "SQL", "Desarrollo backend", "API REST", "FastAPI", "Spring Boot", "Git", "Docker", "Linux", "Testing", "CI/CD"],
    },
    {
      domain: "IA y automatización",
      items: ["LLM", "RAG", "Agentes de IA", "LangChain", "n8n", "OCR", "Procesamiento de documentos", "Automatización de workflows", "Integración de sistemas"],
    },
    {
      domain: "Visión por computador y sistemas autónomos",
      items: ["OpenCV", "YOLOv8", "Detección y seguimiento de objetos", "PyTorch", "ROS", "SLAM", "Filtro de Kalman", "Localización"],
    },
    {
      domain: "Ingeniería de datos y analítica",
      items: ["PostgreSQL", "Talend", "ETL / ELT", "Apache Airflow", "PySpark", "Microsoft Fabric", "AWS", "Power BI", "QuickSight"],
    },
  ],

  archive: [
    { note: "App de escritorio WPF con MVVM" },
    { title: "Asistente de viajes VisAI", note: "Chatbot de viajes con LLM y API externas" },
    { note: "Anuncios de protectoras obtenidos por scraping, con búsqueda de texto completo" },
    { title: "Lector de documentos de identidad", note: "Extracción OCR de documentos de identidad franceses y británicos" },
    { title: "Proyectos de redes neuronales", note: "Cinco ejercicios sobre CNN, aumento de datos y transfer learning" },
    { note: "Pequeño juego arcade" },
    { title: "Análisis de sentimiento", note: "Análisis de sentimiento de reseñas de videojuegos" },
  ],
};
