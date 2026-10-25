
"use strict";

document.documentElement.classList.add("js-ready");

document.addEventListener("DOMContentLoaded", () => {
    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

    const menuToggle = $("#menuToggle");
    const mainNav = $("#mainNav");
    const backToTop = $("#backToTop");
    const currentYear = $("#currentYear");
    const copyEmail = $("#copyEmail");
    const copyFeedback = $("#copyFeedback");
    const projectDialog = $("#projectDialog");
    const dialogTitle = $("#dialogTitle");
    const dialogDescription = $("#dialogDescription");
    const dialogClose = $("#dialogClose");
    const dialogDone = $("#dialogDone");
    const languageButtons = $$("[data-language]");

    const EMAIL = "juniormkataraka@gmail.com";
    const MOBILE_BREAKPOINT = 900;
    const LANGUAGE_KEY = "mkj-portfolio-language";

    let currentLanguage = "en";
    let lastProjectTrigger = null;
    let lastCopiedButtonText = null;
    let copyFeedbackTimer = null;

    /*
     * English is the source language.
     * French translations are matched to the original text nodes.
     * This allows translations without destroying existing HTML,
     * styling, links, icons, or nested elements.
     */

    const translations = {
        "Choose language": "Choisir la langue",
        "Open navigation menu": "Ouvrir le menu de navigation",
        "Close navigation menu": "Fermer le menu de navigation",
        "Main navigation": "Navigation principale",

        "About": "À propos",
        "Expertise": "Expertise",
        "Experience": "Expérience",
        "Projects": "Projets",
        "Education": "Formation",
        "Let's connect": "Prenons contact",

        "SECURITY · DATA · ENGINEERING": "SÉCURITÉ · DONNÉES · INGÉNIERIE",
        "Connecting information to": "Relier l'information à",
        "real-world impact.": "un impact concret.",
        "I'm": "Je suis",
        "Mushagalusa Kataraka Junior": "Mushagalusa Kataraka Junior",
        ", a security information": ", professionnel de l'information sécuritaire",
        "and digital operations professional working across humanitarian security,": "et des opérations numériques, intervenant dans la sécurité humanitaire,",
        "geospatial intelligence, data management, and technical systems.": "l'intelligence géospatiale, la gestion des données et les systèmes techniques.",

        "Explore my work": "Découvrir mes projets",
        "Get in touch": "Me contacter",
        "Years of experience": "Années d'expérience",
        "Languages": "Langues",
        "East Africa": "Afrique de l'Est",
        "Regional experience": "Expérience régionale",

        "PROFILE / 001": "PROFIL / 001",
        "● AVAILABLE TO CONNECT": "● DISPONIBLE POUR ÉCHANGER",
        "Portrait of Mushagalusa Kataraka Junior": "Portrait de Mushagalusa Kataraka Junior",
        "People. Information.": "Les personnes. L'information.",
        "Systems.": "Les systèmes.",
        "Operational intelligence": "Renseignement opérationnel",
        "GIS · DATA · System · ICT": "SIG · DONNÉES · SYSTÈMES · TIC",

        "SECURITY OPERATIONS": "OPÉRATIONS DE SÉCURITÉ",
        "INFORMATION MANAGEMENT": "GESTION DE L'INFORMATION",
        "GIS & CARTOGRAPHY": "SIG ET CARTOGRAPHIE",
        "DATA ANALYSIS": "ANALYSE DES DONNÉES",
        "ICT INFRASTRUCTURE": "INFRASTRUCTURE TIC",
        "DIGITAL SYSTEMS": "SYSTÈMES NUMÉRIQUES",

        "01 / ABOUT ME": "01 / À PROPOS",
        "Technology with a": "La technologie au service d'une",
        "mission.": "mission.",
        "I work at the intersection of": "Je travaille à la croisée de",
        "security information,": "l'information sécuritaire,",
        "data, geospatial technology, and digital infrastructure.": "des données, des technologies géospatiales et des infrastructures numériques.",

        "My professional experience spans humanitarian and security operations,": "Mon expérience professionnelle couvre les opérations humanitaires et de sécurité,",
        "conservation technology, information management, and technical support": "les technologies de conservation, la gestion de l'information et le soutien technique",
        "in the Democratic Republic of the Congo and the wider Great Lakes region.": "en République démocratique du Congo et dans la région des Grands Lacs.",

        "In my current role with the joint MONUSCO/UNDSS Security Information and": "Dans mes fonctions actuelles au Centre conjoint d'information et d'opérations de sécurité",
        "Operations Center in Goma, I support the reception, consolidation,": "de la MONUSCO et du Département de la sûreté et de la sécurité des Nations Unies (UNDSS) à Goma, je contribue à la réception, à la consolidation,",
        "recording, and escalation of security information, staff distress calls,": "à l'enregistrement et à la remontée hiérarchique des informations de sécurité et des appels de détresse du personnel,",
        "movement monitoring, communications, and operational coordination": "au suivi des mouvements, aux communications et à la coordination opérationnelle",
        "in accordance with established procedures and supervisory guidance.": "conformément aux procédures établies et aux directives de la hiérarchie.",

        "My broader technical background includes GIS and cartography, data": "Mon expérience technique comprend également les SIG et la cartographie, l'analyse des données,",
        "analysis, databases, dashboards, telecommunications, network systems,": "les bases de données, les tableaux de bord, les télécommunications, les réseaux,",
        "monitoring technologies, and the development of digital platforms.": "les technologies de suivi et le développement de plateformes numériques.",

        "PROFESSIONAL SNAPSHOT": "APERÇU PROFESSIONNEL",
        "Security operations": "Opérations de sécurité",
        "Information coordination and communications": "Coordination de l'information et communications",
        "Information management": "Gestion de l'information",
        "Structured data and operational reporting": "Données structurées et rapports opérationnels",
        "Geospatial intelligence": "Renseignement géospatial",
        "GIS, GPS and cartographic workflows": "SIG, GPS et processus cartographiques",
        "Technical systems": "Systèmes techniques",
        "ICT, networks and communications": "TIC, réseaux et communications",
        "LANGUAGES": "LANGUES",

        "02 / AREAS OF EXPERTISE": "02 / DOMAINES D'EXPERTISE",
        "Where technology meets": "Quand la technologie rencontre les",
        "operations.": "opérations.",
        "A multidisciplinary skill set developed across security operations,": "Des compétences pluridisciplinaires développées dans les opérations de sécurité,",
        "humanitarian environments, conservation, data, and digital infrastructure.": "les environnements humanitaires, la conservation, les données et les infrastructures numériques.",

        "Digital security technology": "Technologies de sécurité numérique",
        "OPERATIONS / 24-7": "OPÉRATIONS / 24 H SUR 24",
        "SECURITY & COORDINATION": "SÉCURITÉ ET COORDINATION",
        "Security Operations": "Opérations de sécurité",
        "Security information reception, incident logging, distress-call escalation, radio": "Réception des informations de sécurité, consignation des incidents, remontée des appels de détresse, communications radio",
        "communications, movement monitoring, and operational coordination.": "suivi des mouvements et coordination opérationnelle.",
        "Incident reporting": "Rapports d'incident",
        "Radio operations": "Opérations radio",

        "Information dashboards and data management": "Tableaux de bord et gestion des données",
        "DATA / INFORMATION": "DONNÉES / INFORMATION",
        "STRUCTURED INFORMATION": "INFORMATION STRUCTURÉE",
        "Information Management": "Gestion de l'information",
        "Information collection, data quality, databases, reporting workflows, operational dashboards,": "Collecte d'informations, qualité des données, bases de données, processus de rapportage, tableaux de bord opérationnels",
        "and information products for decision support.": "et produits d'information pour l'aide à la décision.",

        "Geospatial mapping and city cartography": "Cartographie géospatiale et urbaine",
        "SPATIAL / MAPPING": "ESPACE / CARTOGRAPHIE",
        "LOCATION INTELLIGENCE": "ANALYSE GÉOSPATIALE",
        "GIS & Cartography": "SIG et cartographie",
        "Geospatial analysis, GPS-enabled monitoring, mapping, field data, cartographic products, and": "Analyse géospatiale, suivi par GPS, cartographie, données de terrain, produits cartographiques et",
        "spatial information workflows.": "processus d'information spatiale.",

        "Data analytics dashboard": "Tableau de bord d'analyse des données",
        "ANALYTICS / INSIGHTS": "ANALYSE / RÉSULTATS",
        "EVIDENCE-BASED INSIGHTS": "ANALYSE FONDÉE SUR LES DONNÉES",
        "Data Analysis": "Analyse des données",
        "Data preparation, analytical reporting, population-related monitoring, survey data,": "Préparation des données, rapports analytiques, suivi lié aux populations, données d'enquête",
        "visualization, and translating datasets into useful findings.": "et visualisation pour transformer les jeux de données en résultats utiles.",

        "Electronic components and technical infrastructure": "Composants électroniques et infrastructure technique",
        "NETWORK / CONNECTIVITY": "RÉSEAUX / CONNECTIVITÉ",
        "COMMUNICATIONS & INFRASTRUCTURE": "COMMUNICATIONS ET INFRASTRUCTURE",
        "ICT & Communications": "TIC et communications",
        "Radio communications, telecommunications, LAN/WAN, satellite connectivity, CCTV, GPS": "Radiocommunications, télécommunications, réseaux LAN/WAN, connectivité satellitaire, vidéosurveillance, suivi GPS",
        "tracking, and field technical support.": "et assistance technique sur le terrain.",

        "Team collaborating on digital systems": "Équipe travaillant sur des systèmes numériques",
        "DEVELOPMENT / SYSTEMS": "DÉVELOPPEMENT / SYSTÈMES",
        "DIGITAL SOLUTIONS": "SOLUTIONS NUMÉRIQUES",
        "Digital Systems": "Systèmes numériques",
        "Web applications, APIs, database design, digital workflows, GIS-enabled platforms, technical": "Applications web, API, conception de bases de données, processus numériques, plateformes intégrant les SIG, documentation technique",
        "documentation, and system integration.": "et intégration des systèmes.",

        "03 / CAREER JOURNEY": "03 / PARCOURS PROFESSIONNEL",
        "Experience built in the": "Une expérience acquise sur le",
        "field.": "terrain.",
        "A career spanning security operations, humanitarian technology,": "Un parcours couvrant les opérations de sécurité, les technologies humanitaires,",
        "conservation, and data systems.": "la conservation et les systèmes de données.",

        "MAR 2024 — PRESENT": "MARS 2024 — AUJOURD'HUI",
        "CURRENT ROLE": "POSTE ACTUEL",
        "GOMA, DRC": "GOMA, RDC",
        "Security Information and Operations Center Officer": "Agent du Centre d'information et d'opérations de sécurité",
        "MONUSCO / UNDSS": "MONUSCO / UNDSS",
        "Support 24/7 SOC operations, receiving, recording, consolidating, and escalating": "Contribuer aux opérations du centre de sécurité 24 h/24, notamment à la réception, à l'enregistrement, à la consolidation et à la remontée hiérarchique",
        "security information and staff distress calls through established reporting lines.": "des informations de sécurité et des appels de détresse du personnel, selon les circuits de rapportage établis.",
        "Support movement monitoring, radio communications, incident logging, and the": "Contribuer au suivi des mouvements, aux communications radio, à la consignation des incidents et à la",
        "coordination of information with relevant personnel and supervisors.": "coordination de l'information avec le personnel concerné et la hiérarchie.",
        "Contribute to security reporting, situational awareness, operational continuity, and the": "Contribuer au rapportage sécuritaire, à la connaissance de la situation, à la continuité opérationnelle et au",
        "maintenance of communications systems.": "maintien des systèmes de communication.",
        "Support GIS-enabled monitoring and the preparation of movement and operational reports.": "Contribuer au suivi intégrant les SIG et à la préparation des rapports de mouvements et des rapports opérationnels.",
        "SOC operations": "Opérations du centre de sécurité",
        "Security information": "Information sécuritaire",

        "MAR 2021 — MAR 2024": "MARS 2021 — MARS 2024",
        "CONSERVATION TECHNOLOGY": "TECHNOLOGIES DE CONSERVATION",
        "DRC / UGANDA": "RDC / OUGANDA",
        "ICT Assistant / Technical Lead": "Assistant TIC / Responsable technique",
        "Virunga National Park / Queen Elizabeth National Park": "Parc national des Virunga / Parc national Queen Elizabeth",
        "Supported ICT and communications infrastructure across conservation operations in the": "Appuyer les infrastructures TIC et de communication dans le cadre des opérations de conservation en",
        "DRC and Uganda.": "RDC et en Ouganda.",
        "Worked with GIS, SMART monitoring workflows, camera traps, LoRaWAN IoT, radio-over-IP,": "Travailler avec les SIG, les processus de suivi SMART, les pièges photographiques, l'IoT LoRaWAN, la radio sur IP",
        "and technical monitoring systems.": "et les systèmes de surveillance technique.",
        "Contributed to connectivity, virtualization, backup power, and technical support for": "Contribuer à la connectivité, à la virtualisation, à l'alimentation électrique de secours et à l'assistance technique pour",
        "field operations.": "les opérations de terrain.",
        "Supported projects involving network systems, surveillance technologies, solar and UPS": "Appuyer des projets portant sur les réseaux, les technologies de surveillance, les systèmes solaires et les onduleurs",
        "solutions, and field equipment.": "ainsi que les équipements de terrain.",
        "Infrastructure": "Infrastructure",

        "FEB 2020 — OCT 2020": "FÉVR. 2020 — OCT. 2020",
        "TECHNICAL OPERATIONS": "OPÉRATIONS TECHNIQUES",
        "ICT Technician / Supervisor": "Technicien TIC / Superviseur",
        "Supported HF/VHF/UHF radio communications, satellite communications, GPS, CCTV, and": "Assurer le soutien aux communications radio HF/VHF/UHF, aux communications satellitaires, au GPS, à la vidéosurveillance et aux",
        "network connectivity.": "réseaux de connectivité.",
        "Contributed to WAN/LAN operations involving fibre, WiMAX, and VSAT infrastructure.": "Contribuer aux opérations WAN/LAN impliquant la fibre optique, le WiMAX et les infrastructures VSAT.",
        "Assisted with technical troubleshooting, equipment checks, and continuity of": "Participer au dépannage technique, à la vérification des équipements et au maintien de la",
        "communications services.": "continuité des services de communication.",
        "Telecommunications": "Télécommunications",
        "Networking": "Réseaux",

        "MAY 2015 — DEC 2018": "MAI 2015 — DÉC. 2018",
        "DATA & ANALYTICS": "DONNÉES ET ANALYSE",
        "RWANDA": "RWANDA",
        "Senior Data Analyst": "Analyste principal de données",
        "Data Analysis & Information Systems": "Analyse des données et systèmes d'information",
        "Worked with survey and population-related data, database management, and structured": "Travailler avec des données d'enquête et liées aux populations, la gestion de bases de données et des processus structurés",
        "information workflows.": "de gestion de l'information.",
        "Used GIS and cartography to support spatial analysis and reporting.": "Utiliser les SIG et la cartographie pour appuyer l'analyse spatiale et le rapportage.",
        "Developed analytical outputs and dashboards using data tools, visualization platforms,": "Développer des analyses et des tableaux de bord à l'aide d'outils de données, de plateformes de visualisation",
        "and reporting systems.": "et de systèmes de rapportage.",
        "Supported ICT, network, and technical requirements for clients and operational teams.": "Appuyer les besoins TIC, réseau et techniques des clients et des équipes opérationnelles.",
        "Data visualization": "Visualisation des données",

        "04 / SELECTED PROJECTS": "04 / PROJETS SÉLECTIONNÉS",
        "Ideas turned into": "Des idées transformées en",
        "systems.": "systèmes.",
        "Selected technical work and concepts. Sensitive operational details and": "Une sélection de réalisations et de concepts techniques. Les détails opérationnels sensibles et",
        "restricted configurations are intentionally excluded.": "les configurations à accès restreint ne sont volontairement pas publiés.",

        "Filter projects": "Filtrer les projets",
        "All projects": "Tous les projets",
        "Data &": "Données et",
        "platforms": "plateformes",
        "GIS &": "SIG et",
        "mapping": "cartographie",
        "ICT &": "TIC et",
        "systems": "systèmes",

        "View Security Information and Risk Management Platform details": "Voir les détails de la plateforme d'information sécuritaire et de gestion des risques",
        "Security information and risk management platform": "Plateforme d'information sécuritaire et de gestion des risques",
        "Security Information & Risk Management Platform": "Plateforme d'information sécuritaire et de gestion des risques",
        "A platform concept connecting structured data, geospatial views, APIs, and dashboards to": "Un concept de plateforme reliant des données structurées, des vues géospatiales, des API et des tableaux de bord afin de",
        "support information and risk-management workflows.": "soutenir les processus de gestion de l'information et des risques.",

        "View Geospatial Monitoring and Mapping details": "Voir les détails du suivi géospatial et de la cartographie",
        "GIS and cartographic monitoring": "Suivi SIG et cartographique",
        "Geospatial Monitoring & Mapping": "Suivi géospatial et cartographie",
        "Location-based information workflows, field monitoring, geospatial visualization, and": "Processus d'information géolocalisée, suivi de terrain, visualisation géospatiale et",
        "cartographic reporting.": "rapportage cartographique.",

        "View Communications and Technical Infrastructure details": "Voir les détails des communications et de l'infrastructure technique",
        "Communications and technical infrastructure project": "Projet de communications et d'infrastructure technique",
        "Communications & Technical Infrastructure": "Communications et infrastructure technique",
        "Field-focused communications, connectivity, monitoring equipment, and infrastructure": "Communications de terrain, connectivité, équipements de surveillance et soutien aux",
        "support.": "infrastructures.",

        "Explore project": "Découvrir le projet",

        "05 / TECHNICAL TOOLKIT": "05 / OUTILS TECHNIQUES",
        "Tools I work": "Les outils avec lesquels je",
        "with.": "travaille.",
        "GIS & Data": "SIG et données",
        "Databases & Development": "Bases de données et développement",
        "Networks & Infrastructure": "Réseaux et infrastructures",
        "Security Communications": "Communications de sécurité",

        "06 / EDUCATION & DEVELOPMENT": "06 / FORMATION ET DÉVELOPPEMENT",
        "Learning across": "Apprendre à travers plusieurs",
        "disciplines.": "disciplines.",
        "IN PROGRESS": "EN COURS",
        "Master's Studies in International Relations and Security Strategies": "Études de master en relations internationales et stratégies de sécurité",
        "O. P. Jindal Global University - Jindal School of International Affairs - INDIA": "Université mondiale O. P. Jindal – École Jindal des affaires internationales – INDE",
        "POSTGRADUATE STUDIES": "ÉTUDES DE CYCLE SUPÉRIEUR",
        "Bachelor's in Computer Science & Technology": "Licence en informatique et technologies",
        "Université Libre de Kigali (ULK), Rwanda": "Université libre de Kigali (ULK), Rwanda",
        "UNDERGRADUATE": "PREMIER CYCLE UNIVERSITAIRE",
        "COMPLETED": "TERMINÉ",
        "Bachelor's in IT Project Management": "Licence en gestion de projets informatiques",
        "ISIG Goma, Democratic Republic of the Congo": "ISIG Goma, République démocratique du Congo",
        "National Diploma in Industrial Electricity & Electronics": "Diplôme d'État en électricité industrielle et électronique",
        "ITIG Goma, Democratic Republic of the Congo": "ITIG Goma, République démocratique du Congo",
        "TECHNICAL EDUCATION": "FORMATION TECHNIQUE",
        "SELECTED TRAINING & CERTIFICATIONS": "FORMATIONS ET CERTIFICATIONS SÉLECTIONNÉES",

        "07 / PROFESSIONAL ENVIRONMENTS": "07 / ENVIRONNEMENTS PROFESSIONNELS",
        "Organizations and": "Organisations et",
        "experience.": "expérience.",
        "Selected organizations and professional environments associated with my": "Une sélection d'organisations et d'environnements professionnels liés à mon",
        "career journey.": "parcours professionnel.",
        "Conservation technology": "Technologies de conservation",
        "Technical field": "Opérations techniques de terrain",
        "Data engineering": "Ingénierie des données",
        "Logos are displayed for portfolio context. Their inclusion does not imply endorsement.": "Les logos sont présentés à titre illustratif dans ce portfolio. Leur présence ne signifie pas qu'ils constituent une approbation officielle.",

        "08 / CONTACT": "08 / CONTACT",
        "Let's build something": "Construisons quelque chose de",
        "meaningful.": "significatif.",
        "Interested in security information management, GIS, data systems, ICT infrastructure, or": "Vous vous intéressez à la gestion de l'information sécuritaire, aux SIG, aux systèmes de données, aux infrastructures TIC ou aux",
        "humanitarian technology? Let's connect.": "technologies humanitaires ? Prenons contact.",
        "Send me": "M'envoyer",
        "an email": "un e-mail",
        "EMAIL": "E-MAIL",
        "Copy email": "Copier l'e-mail",
        "PHONE": "TÉLÉPHONE",
        "LOCATION": "LOCALISATION",
        "Goma, Democratic Republic of the Congo": "Goma, République démocratique du Congo",
        "FOCUS": "DOMAINES",
        "Security · Information · GIS · Digital Systems": "Sécurité · Information · SIG · Systèmes numériques",

        "Built around information, technology, and impact.": "Au croisement de l'information, de la technologie et de l'impact.",
        "Back to top": "Retour en haut",

        "PROJECT DETAILS": "DÉTAILS DU PROJET",
        "Close dialog": "Fermer la fenêtre",
        "MKJ / SELECTED WORK": "MKJ / PROJETS SÉLECTIONNÉS",
        "PUBLIC PORTFOLIO OVERVIEW": "APERÇU PUBLIC DU PORTFOLIO",
        "Close": "Fermer",

        "Image unavailable": "Image indisponible"
    };

    const pageTitle = {
        en: "Mushagalusa Kataraka Junior | Security & Digital Operations",
        fr: "Mushagalusa Kataraka Junior | Sécurité et opérations numériques"
    };

    const pageDescription = {
        en: "Portfolio of Mushagalusa Kataraka Junior — Security Operations, Information Management, GIS, Data Analysis, ICT and Digital Systems.",
        fr: "Portfolio de Mushagalusa Kataraka Junior — opérations de sécurité, gestion de l'information, SIG, analyse des données, TIC et systèmes numériques."
    };

    const projectDetails = {
        project1: {
            title: {
                en: "Security Information & Risk Management Platform",
                fr: "Plateforme d'information sécuritaire et de gestion des risques"
            },
            description: {
                en: "A digital platform concept connecting databases, APIs, geospatial views and dashboards to support structured information and risk-management workflows. The public portfolio description intentionally excludes sensitive operational data, internal configurations and restricted information.",
                fr: "Un concept de plateforme numérique reliant des bases de données, des API, des vues géospatiales et des tableaux de bord pour soutenir les processus structurés de gestion de l'information et des risques. Cette présentation publique exclut volontairement les données opérationnelles sensibles, les configurations internes et les informations à accès restreint."
            }
        },
        project2: {
            title: {
                en: "Geospatial Monitoring & Mapping",
                fr: "Suivi géospatial et cartographie"
            },
            description: {
                en: "GIS and GPS-enabled workflows for presenting location-based information, supporting field monitoring and producing clear maps and operational reports. Specific datasets and sensitive location details are not published.",
                fr: "Des processus utilisant les SIG et le GPS pour présenter des informations géolocalisées, appuyer le suivi sur le terrain et produire des cartes claires ainsi que des rapports opérationnels. Les jeux de données spécifiques et les informations de localisation sensibles ne sont pas publiés."
            }
        },
        project3: {
            title: {
                en: "Communications & Technical Infrastructure",
                fr: "Communications et infrastructure technique"
            },
            description: {
                en: "Field-focused communications and technical infrastructure involving radio systems, connectivity, monitoring equipment and network support. Detailed configurations are intentionally omitted from this public overview.",
                fr: "Des systèmes de communication et une infrastructure technique adaptés au terrain, comprenant des systèmes radio, la connectivité, des équipements de surveillance et un soutien réseau. Les configurations détaillées sont volontairement exclues de cette présentation publique."
            }
        }
    };

    const prefersReducedMotion = () =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /*
     * Translation engine:
     * Saves each original text node so switching back to English
     * never translates an already translated French sentence.
     */

    const originalTextNodes = new WeakMap();
    const originalAttributes = new WeakMap();

    function normalizeText(value) {
        return value.trim().replace(/\s+/g, " ");
    }

    function translateTextNodes(language) {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT
        );

        let node;

        while ((node = walker.nextNode())) {
            const parent = node.parentElement;

            if (!parent) continue;

            if (
                parent.closest("script, style, noscript, textarea, input, code")
            ) {
                continue;
            }

            if (!originalTextNodes.has(node)) {
                originalTextNodes.set(node, node.nodeValue);
            }

            const original = originalTextNodes.get(node);
            const trimmed = original.trim();

            if (!trimmed) continue;

            const normalized = normalizeText(trimmed);
            const leading = original.match(/^\s*/)?.[0] || "";
            const trailing = original.match(/\s*$/)?.[0] || "";

            let replacement = normalized;

            if (language === "fr" && translations[normalized]) {
                replacement = translations[normalized];
            }

            node.nodeValue = leading + replacement + trailing;
        }
    }

    const attributeTranslations = {
        "Open navigation menu": "Ouvrir le menu de navigation",
        "Close navigation menu": "Fermer le menu de navigation",
        "MKJ home": "Accueil MKJ",
        "Main navigation": "Navigation principale",
        "Areas of expertise": "Domaines d'expertise",
        "Filter projects": "Filtrer les projets",
        "Back to top": "Retour en haut",
        "Close dialog": "Fermer la fenêtre",
        "Portrait of Mushagalusa Kataraka Junior": "Portrait de Mushagalusa Kataraka Junior",
        "Digital security technology": "Technologies de sécurité numérique",
        "Information dashboards and data management": "Tableaux de bord et gestion des données",
        "Geospatial mapping and city cartography": "Cartographie géospatiale et urbaine",
        "Data analytics dashboard": "Tableau de bord d'analyse des données",
        "Electronic components and technical infrastructure": "Composants électroniques et infrastructure technique",
        "Team collaborating on digital systems": "Équipe travaillant sur des systèmes numériques",
        "Security information and risk management platform": "Plateforme d'information sécuritaire et de gestion des risques",
        "GIS and cartographic monitoring": "Suivi SIG et cartographique",
        "Communications and technical infrastructure project": "Projet de communications et d'infrastructure technique",
        "UNDSS": "UNDSS",
        "Virunga National Park": "Parc national des Virunga",
        "FLSG": "FLSG",
        "UNDP": "PNUD"
    };

    function translateAttributes(language) {
        const elements = $$("[aria-label], [alt], [title]");

        elements.forEach((element) => {
            ["aria-label", "alt", "title"].forEach((attribute) => {
                if (!element.hasAttribute(attribute)) return;

                let originals = originalAttributes.get(element);

                if (!originals) {
                    originals = {};
                    originalAttributes.set(element, originals);
                }

                if (!(attribute in originals)) {
                    originals[attribute] = element.getAttribute(attribute);
                }

                const original = originals[attribute];

                if (language === "en") {
                    element.setAttribute(attribute, original);
                    return;
                }

                const normalized = normalizeText(original);
                const translated = attributeTranslations[normalized];

                if (translated) {
                    element.setAttribute(attribute, translated);
                }
            });
        });
    }

    function updateLanguageButtons(language) {
        languageButtons.forEach((button) => {
            const active = button.dataset.language === language;

            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });
    }

    function updateProjectDialogLanguage(language) {
        if (!projectDialog || !projectDialog.open) return;

        const activeProject = projectDialog.dataset.activeProject;
        const details = projectDetails[activeProject];

        if (!details) return;

        if (dialogTitle) {
            dialogTitle.textContent = details.title[language];
        }

        if (dialogDescription) {
            dialogDescription.textContent = details.description[language];
        }
    }

    function setLanguage(language, persist = true) {
        if (language !== "en" && language !== "fr") {
            language = "en";
        }

        currentLanguage = language;

        document.documentElement.lang = language;
        document.title = pageTitle[language];

        const descriptionMeta = $('meta[name="description"]');

        if (descriptionMeta) {
            descriptionMeta.setAttribute(
                "content",
                pageDescription[language]
            );
        }

        translateTextNodes(language);
        translateAttributes(language);
        updateLanguageButtons(language);
        updateProjectDialogLanguage(language);

        if (menuToggle) {
            menuToggle.setAttribute(
                "aria-label",
                language === "fr"
                    ? (
                        menuToggle.getAttribute("aria-expanded") === "true"
                            ? "Fermer le menu de navigation"
                            : "Ouvrir le menu de navigation"
                    )
                    : (
                        menuToggle.getAttribute("aria-expanded") === "true"
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    )
            );
        }

        if (persist) {
            try {
                localStorage.setItem(LANGUAGE_KEY, language);
            } catch (error) {
                // The site still works if browser storage is unavailable.
            }
        }
    }

    languageButtons.forEach((button) => {
        button.addEventListener("click", () => {
            setLanguage(button.dataset.language || "en");
            closeMenu();
        });
    });

    let savedLanguage = "en";

    try {
        const saved = localStorage.getItem(LANGUAGE_KEY);

        if (saved === "en" || saved === "fr") {
            savedLanguage = saved;
        }
    } catch (error) {
        // English remains the default when browser storage is unavailable.
    }

    /*
     * Navigation
     */

    function closeMenu() {
        if (!menuToggle || !mainNav) return;

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            currentLanguage === "fr"
                ? "Ouvrir le menu de navigation"
                : "Open navigation menu"
        );

        mainNav.classList.remove("open");
        document.body.classList.remove("menu-open");
    }

    function openMenu() {
        if (!menuToggle || !mainNav) return;

        menuToggle.setAttribute("aria-expanded", "true");

        menuToggle.setAttribute(
            "aria-label",
            currentLanguage === "fr"
                ? "Fermer le menu de navigation"
                : "Close navigation menu"
        );

        mainNav.classList.add("open");
        document.body.classList.add("menu-open");
    }

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            isOpen ? closeMenu() : openMenu();
        });

        $$("#mainNav a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeMenu();
        });

        document.addEventListener("click", (event) => {
            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            if (!isOpen) return;

            const clickedInsideNav = mainNav.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideNav && !clickedToggle) closeMenu();
        });

        let previousWidth = window.innerWidth;

        window.addEventListener("resize", () => {
            const currentWidth = window.innerWidth;

            if (
                (previousWidth <= MOBILE_BREAKPOINT &&
                    currentWidth > MOBILE_BREAKPOINT) ||
                (previousWidth > MOBILE_BREAKPOINT &&
                    currentWidth <= MOBILE_BREAKPOINT)
            ) {
                closeMenu();
            }

            previousWidth = currentWidth;
        });
    }

    /*
     * Active navigation section
     */

    const navLinks = $$("#mainNav a[href^='#']");
    const sections = navLinks
        .map((link) => $(link.getAttribute("href")))
        .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    navLinks.forEach((link) => {
                        const active =
                            link.getAttribute("href") ===
                            `#${entry.target.id}`;

                        link.classList.toggle("active", active);

                        if (active) {
                            link.setAttribute("aria-current", "location");
                        } else {
                            link.removeAttribute("aria-current");
                        }
                    });
                });
            },
            {
                root: null,
                rootMargin: "-25% 0px -60% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => sectionObserver.observe(section));
    }

    /*
     * Reveal animations
     */

    const revealItems = $$(".reveal");

    if (prefersReducedMotion()) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    } else if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px 40px 0px"
            }
        );

        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    /*
     * Project filters
     */

    const filterButtons = $$(".filter-button");
    const projectCards = $$(".project-card");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter || "all";

            filterButtons.forEach((filterButton) => {
                const isActive = filterButton === button;

                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute("aria-pressed", String(isActive));
            });

            projectCards.forEach((card) => {
                const category = card.dataset.category || "";
                const shouldShow =
                    selectedFilter === "all" || category === selectedFilter;

                card.classList.toggle("is-hidden", !shouldShow);
                card.setAttribute("aria-hidden", String(!shouldShow));
            });
        });
    });

    /*
     * Project dialog
     */

    function openProject(projectId, trigger) {
        const details = projectDetails[projectId];

        if (!details || !projectDialog) return;

        projectDialog.dataset.activeProject = projectId;

        if (dialogTitle) {
            dialogTitle.textContent = details.title[currentLanguage];
        }

        if (dialogDescription) {
            dialogDescription.textContent =
                details.description[currentLanguage];
        }

        lastProjectTrigger = trigger || document.activeElement;

        if (typeof projectDialog.showModal === "function") {
            if (!projectDialog.open) projectDialog.showModal();

            if (dialogClose) dialogClose.focus();
        } else {
            projectDialog.setAttribute("open", "");
            projectDialog.setAttribute("role", "dialog");
            projectDialog.setAttribute("aria-modal", "true");

            if (dialogClose) dialogClose.focus();
        }
    }

    function closeProjectDialog() {
        if (!projectDialog) return;

        if (
            typeof projectDialog.close === "function" &&
            projectDialog.open
        ) {
            projectDialog.close();
        } else {
            projectDialog.removeAttribute("open");
        }
    }

    $$("[data-project]").forEach((element) => {
        element.addEventListener("click", (event) => {
            const projectId = element.dataset.project;

            if (!projectId) return;

            event.preventDefault();
            openProject(projectId, element);
        });
    });

    if (dialogClose) {
        dialogClose.addEventListener("click", closeProjectDialog);
    }

    if (dialogDone) {
        dialogDone.addEventListener("click", closeProjectDialog);
    }

    if (projectDialog) {
        projectDialog.addEventListener("click", (event) => {
            if (event.target === projectDialog) {
                closeProjectDialog();
            }
        });

        projectDialog.addEventListener("close", () => {
            if (
                lastProjectTrigger &&
                typeof lastProjectTrigger.focus === "function"
            ) {
                lastProjectTrigger.focus();
            }
        });

        projectDialog.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeProjectDialog();
        });
    }

    /*
     * Copy email
     */

    async function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }

        const temporaryInput = document.createElement("textarea");

        temporaryInput.value = text;
        temporaryInput.setAttribute("readonly", "");
        temporaryInput.setAttribute("aria-hidden", "true");
        temporaryInput.style.position = "fixed";
        temporaryInput.style.top = "0";
        temporaryInput.style.left = "-9999px";
        temporaryInput.style.opacity = "0";

        document.body.appendChild(temporaryInput);

        temporaryInput.focus();
        temporaryInput.select();
        temporaryInput.setSelectionRange(0, temporaryInput.value.length);

        let successful = false;

        try {
            successful = document.execCommand("copy");
        } finally {
            temporaryInput.remove();
        }

        if (!successful) {
            throw new Error("Clipboard access is unavailable.");
        }

        return true;
    }

    if (copyEmail) {
        copyEmail.addEventListener("click", async () => {
            if (copyFeedback) copyFeedback.textContent = "";

            try {
                await copyText(EMAIL);

                if (copyFeedback) {
                    copyFeedback.textContent =
                        currentLanguage === "fr"
                            ? "Adresse e-mail copiée dans le presse-papiers."
                            : "Email address copied to clipboard.";
                }

                const buttonLabel = $("strong", copyEmail);

                if (buttonLabel) {
                    if (lastCopiedButtonText === null) {
                        lastCopiedButtonText = buttonLabel.textContent;
                    }

                    buttonLabel.textContent =
                        currentLanguage === "fr"
                            ? "Copié ✓"
                            : "Copied ✓";

                    window.setTimeout(() => {
                        if (buttonLabel) {
                            buttonLabel.textContent =
                                currentLanguage === "fr"
                                    ? "Copier l'e-mail"
                                    : lastCopiedButtonText || "Copy email";
                        }
                    }, 1800);
                }
            } catch (error) {
                if (copyFeedback) {
                    copyFeedback.textContent =
                        currentLanguage === "fr"
                            ? `Copie impossible. Veuillez copier cette adresse manuellement : ${EMAIL}`
                            : `Copy unavailable. Please copy this address manually: ${EMAIL}`;
                }
            }
        });
    }

    /*
     * Back-to-top
     */

    function updateBackToTop() {
        if (!backToTop) return;

        backToTop.classList.toggle("visible", window.scrollY > 500);
    }

    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();

    if (backToTop) {
        backToTop.addEventListener("click", (event) => {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion() ? "auto" : "smooth"
            });
        });
    }

    /*
     * Image fallback
     */

    function setImageFallback(image) {
        image.classList.add("image-fallback");
        image.alt = image.alt || "Image unavailable";

        if (image.dataset.fallbackApplied === "true") return;

        image.dataset.fallbackApplied = "true";
        image.removeAttribute("srcset");
        image.removeAttribute("sizes");

        image.src =
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360">
                    <rect width="600" height="360" fill="#10243a"/>
                    <g fill="none" stroke="#54d8f2" stroke-width="2" opacity=".65">
                        <circle cx="300" cy="180" r="64"/>
                        <circle cx="300" cy="180" r="96" stroke-dasharray="5 9"/>
                        <path d="M190 180h220M300 70v220"/>
                    </g>
                    <text x="300" y="310" fill="#a1b4c7" font-size="16"
                        font-family="Arial,sans-serif" text-anchor="middle">
                        MKJ · PORTFOLIO
                    </text>
                </svg>
            `);
    }

    $$("img").forEach((image) => {
        image.addEventListener("error", () => {
            if (image.dataset.fallbackApplied !== "true") {
                setImageFallback(image);
            }
        });

        if (
            image.complete &&
            image.naturalWidth === 0 &&
            image.currentSrc
        ) {
            setImageFallback(image);
        }
    });

    /*
     * Pause animations when the browser tab is hidden.
     */

    document.addEventListener("visibilitychange", () => {
        document.documentElement.classList.toggle(
            "tab-hidden",
            document.hidden
        );
    });

    /*
     * Apply the saved language after all handlers are ready.
     */

    setLanguage(savedLanguage, false);
});
