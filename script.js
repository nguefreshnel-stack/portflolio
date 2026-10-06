/* =========================================================
   PORTFOLIO SCRIPTS - HAMILTON FRESHNEL
   Gestion dynamique des projets, thèmes, filtres et interactions
   ========================================================= */

/* --------- PERSISTENT DARK MODE --------- */
const toggleBtn = document.getElementById("theme-toggle");

function applyInitialTheme() {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        document.body.classList.add("dark");
        if (toggleBtn) toggleBtn.textContent = "☀️";
    } else {
        document.body.classList.remove("dark");
        if (toggleBtn) toggleBtn.textContent = "🌙";
    }
}

applyInitialTheme();

if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
        toggleBtn.textContent = isDark ? "☀️" : "🌙";
    });
}

/* --------- MOBILE NAVBAR TOGGLE --------- */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        menuToggle.classList.toggle("active");
        const isOpen = navLinks.classList.contains("open");
        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

/* --------- DONNÉES DYNAMIQUES DES PROJETS --------- */
const portfolioProjects = [
    {
        id: "intek",
        title: "Application Web de Gestion de Tickets & SAV",
        category: ["stage", "fullstack"],
        categoryLabel: "Stage en Entreprise",
        isStage: true,
        company: "INTEK SARL — Douala (Service Technique)",
        image: "images/intek-project.png",
        summary: "Solution complète de Helpdesk et GMAO pour digitaliser le cycle de vie des interventions techniques sur équipements informatiques et énergétiques (onduleurs haute puissance, serveurs, PC).",
        role: "Stagiaire Développeur Fullstack (Scrum Master & Dév) • Encadré par M. Chendjou Frédéric (Pro) & M. Ngouma Timothée (Académique)",
        stack: ["Angular", "Spring Boot", "Java", "MySQL", "JWT", "UML / Merise", "Agile Scrum"],
        keyFeatures: [
            "Authentification sécurisée RBAC (Admin & Techniciens) avec Token JWT et DTOs.",
            "Dashboard technique avec voyant d'urgence en temps réel pour tickets prioritaires.",
            "Système de notifications en direct avec cloche et compteur d'alertes.",
            "Side Drawer interactif pour l'inspection rapide des détails d'intervention sans rechargement.",
            "Module d'importation par lot (Batch Excel) pour la prise en charge des parcs clients.",
            "Upload de photos de pannes et génération numérique des procès-verbaux (PV) de sortie."
        ],
        github: "https://github.com/nguefreshnel-stack"
    },
    {
        id: "mediko",
        title: "MediKo — Gestion Pharmaceutique & Médicale",
        category: ["fullstack", "web"],
        categoryLabel: "Projet Fullstack",
        isStage: false,
        company: "Projet d'Ingénierie Santé & Officines",
        image: "images/mediko-project.png",
        summary: "Plateforme centralisée permettant aux officines et professionnels de santé d'administrer les stocks de médicaments, prévenir les ruptures, tracer les audits et cartographier les officines.",
        role: "Concepteur & Développeur Fullstack",
        stack: ["Angular", "Laravel (PHP)", "MySQL", "TypeScript", "SCSS", "Audit Logs", "REST API"],
        keyFeatures: [
            "Gestion des stocks en temps réel avec détection des seuils critiques et alertes de péremption.",
            "Système d'audit logging complet traçant chaque opération sensible (entrées, sorties, accès).",
            "Contrôle d'accès strict (RBAC) pour gestionnaires, pharmaciens et superviseurs.",
            "Cartographie interactive des pharmacies partenaires et suivi des approvisionnements.",
            "Interface Angular modulaire avec Reactive Forms et validation métier robuste."
        ],
        github: "https://github.com/nguefreshnel-stack"
    },
    {
        id: "mobile-scolaire",
        title: "Application Mobile de Suivi & Gestion Scolaire",
        category: ["mobile", "uiux"],
        categoryLabel: "Projet Académique",
        isStage: false,
        company: "Projet de Fin de Semestre",
        image: "images/projet1.png",
        summary: "Application scolaire intuitive facilitant la communication entre étudiants et administration, le suivi des présences, la consultation des notes et des moyennes académiques.",
        role: "Designer UI/UX & Développeur Front/Back",
        stack: ["UI/UX Design", "PHP", "MySQL", "Node.js", "REST API", "Mobile UI"],
        keyFeatures: [
            "Prototypage et design UI/UX complet de l'ensemble des parcours étudiants et professeurs.",
            "Consultation instantanée des moyennes, relevés de notes et coefficients.",
            "Espace administration pour la saisie des évaluations et le contrôle des effectifs.",
            "API légère développée en Node.js et PHP/MySQL."
        ],
        github: "https://github.com/nguefreshnel-stack"
    }
];

/* --------- RENDU DYNAMIQUE DE LA GRILLE DES PROJETS --------- */
function renderProjects(filter = "all") {
    const grid = document.getElementById("dynamic-projects-grid");
    if (!grid) return;

    grid.innerHTML = "";

    const filtered = filter === "all" 
        ? portfolioProjects 
        : portfolioProjects.filter(p => p.category.includes(filter));

    filtered.forEach((p, index) => {
        const article = document.createElement("article");
        article.className = `project-card reveal show delay-${(index % 4) + 1}`;
        article.id = `card-${p.id}`;

        const stageBadge = p.isStage ? `<span class="tag badge-stage">⭐ Stage INTEK</span>` : "";
        const tagsHtml = p.stack.map(tag => `<span class="tag">${tag}</span>`).join("");

        article.innerHTML = `
            <img src="${p.image}" alt="${p.title}" loading="lazy" />
            <div class="project-content">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:6px;">
                    <span style="font-size:0.8rem;font-weight:600;color:var(--text-muted);">${p.categoryLabel}</span>
                    ${stageBadge}
                </div>
                <h3>${p.title}</h3>
                <p>${p.summary}</p>
                <p style="font-size:0.88rem;color:var(--text);margin-top:6px;"><strong>Contexte :</strong> ${p.company}</p>
                
                <div class="project-tags">
                    ${tagsHtml}
                </div>

                <div class="project-footer" style="display:flex;gap:10px;flex-wrap:wrap;">
                    <button class="btn btn-details" data-id="${p.id}" style="padding:10px 18px;font-size:0.88rem;">Voir les détails</button>
                    <a class="btn btn-secondary" href="${p.github}" target="_blank" rel="noopener noreferrer" style="padding:10px 18px;font-size:0.88rem;">GitHub</a>
                </div>
            </div>
        `;
        grid.appendChild(article);
    });

    // Attacher les écouteurs pour la modale
    grid.querySelectorAll(".btn-details").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            openProjectModal(id);
        });
    });
}

/* --------- MODALE DYNAMIQUE DE DÉTAILS PROJET --------- */
function openProjectModal(projectId) {
    const project = portfolioProjects.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById("project-modal");
    if (!modal) return;

    const modalTitle = document.getElementById("modal-title");
    const modalContent = document.getElementById("modal-body-content");

    modalTitle.textContent = project.title;

    const featuresHtml = project.keyFeatures.map(f => `<li>${f}</li>`).join("");
    const stackPills = project.stack.map(s => `<span class="tag">${s}</span>`).join("");

    modalContent.innerHTML = `
        <img src="${project.image}" alt="${project.title}" style="width:100%;max-height:260px;object-fit:cover;border-radius:12px;margin-bottom:12px;border:1px solid var(--border-color);">
        
        <div>
            <h4>Contexte & Cadre de réalisation</h4>
            <p style="color:var(--text-muted);">${project.company}</p>
            <p style="color:var(--text);font-weight:500;margin-top:4px;">${project.role}</p>
        </div>

        <div>
            <h4>Présentation</h4>
            <p style="color:var(--text-muted);">${project.summary}</p>
        </div>

        <div>
            <h4>Fonctionnalités & Apports Clés</h4>
            <ul>${featuresHtml}</ul>
        </div>

        <div>
            <h4>Stack Technique</h4>
            <div class="project-tags">${stackPills}</div>
        </div>

        <div style="margin-top:14px;display:flex;gap:12px;">
            <a class="btn" href="${project.github}" target="_blank" rel="noopener noreferrer">Explorer sur GitHub</a>
            <button class="btn btn-secondary close-modal-trigger">Fermer</button>
        </div>
    `;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";

    modal.querySelectorAll(".close-modal-trigger").forEach(btn => {
        btn.addEventListener("click", closeProjectModal);
    });
}

function closeProjectModal() {
    const modal = document.getElementById("project-modal");
    if (modal) {
        modal.classList.remove("open");
        document.body.style.overflow = "auto";
    }
}

// Initialisation des filtres et de la modale sur projects.html
function initProjectsPage() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                filterButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                const filter = btn.getAttribute("data-filter");
                renderProjects(filter);
            });
        });
        renderProjects("all");
    }

    const modal = document.getElementById("project-modal");
    if (modal) {
        const overlay = modal.querySelector(".modal-overlay");
        const closeBtn = modal.querySelector(".modal-close");
        if (overlay) overlay.addEventListener("click", closeProjectModal);
        if (closeBtn) closeBtn.addEventListener("click", closeProjectModal);
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeProjectModal();
        });
    }
}

/* --------- ANIMATION DYNAMIQUE DES CHIFFRES (HERO STATS) --------- */
function animateStats() {
    const statNumbers = document.querySelectorAll(".stat-number[data-target]");
    statNumbers.forEach(stat => {
        const target = +stat.getAttribute("data-target");
        let count = 0;
        const duration = 1200;
        const stepTime = 30;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                stat.textContent = target + (stat.getAttribute("data-suffix") || "");
                clearInterval(timer);
            } else {
                stat.textContent = Math.ceil(count) + (stat.getAttribute("data-suffix") || "");
            }
        }, stepTime);
    });
}

/* --------- SCROLL REVEAL ANIMATION --------- */
function revealElements() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 75) {
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealElements);
window.addEventListener("DOMContentLoaded", () => {
    applyInitialTheme();
    initProjectsPage();
    revealElements();
    animateStats();
});
window.addEventListener("load", revealElements);

/* --------- CONTACT FORM UX FEEDBACK --------- */
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector("button[type='submit']");
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = "Envoi en cours...";

        setTimeout(() => {
            alert("Merci pour ton message ! Il a bien été envoyé.");
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 700);
    });
}
