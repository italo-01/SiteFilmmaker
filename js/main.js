/**
 * SCRIPT PRINCIPAL - RAFAEL CINEMATOGRAPHY
 * Controles de UI, modal de vídeo, filtros de portfólio e WhatsApp CTA
 */

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileMenu();
  initPortfolio();
  initVideoModal();
  initContactForm();
  initSmoothScroll();
});

/* ==========================================================================
   HEADER SCROLL EFFECT
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/* ==========================================================================
   MENU MOBILE
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById("mobileToggle");
  const mobileNav = document.getElementById("mobileNav");
  const mobileBackdrop = document.getElementById("mobileBackdrop");
  const mobileLinks = document.querySelectorAll(".mobile-nav a");

  if (!mobileToggle || !mobileNav || !mobileBackdrop) return;

  function toggleMenu() {
    const isOpen = mobileNav.classList.toggle("open");
    mobileBackdrop.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  function closeMenu() {
    mobileNav.classList.remove("open");
    mobileBackdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  mobileToggle.addEventListener("click", toggleMenu);
  mobileBackdrop.addEventListener("click", closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

/* ==========================================================================
   PORTFÓLIO E FILTROS DINÂMICOS
   ========================================================================== */
function initPortfolio() {
  const grid = document.getElementById("portfolioGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (!grid || !window.PORTFOLIO_PROJECTS) return;

  function renderProjects(category = "all") {
    grid.innerHTML = "";

    const filtered = category === "all"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter(p => p.category === category);

    filtered.forEach((project, index) => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.setAttribute("data-id", project.id);
      card.style.animation = `fadeInUp 0.4s ease forwards ${index * 0.06}s`;

      card.innerHTML = `
        <div class="card-media">
          <img class="card-thumb" src="${project.thumbnail}" alt="${project.title}" loading="lazy">
          <span class="card-category-badge">${project.categoryLabel}</span>
          <span class="card-duration-badge">${project.duration}</span>
          <div class="card-overlay">
            <div class="card-play-btn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
        </div>
        <div class="card-info">
          <div class="card-client">${project.client} &bull; ${project.year}</div>
          <h3 class="card-title">${project.title}</h3>
          <p class="card-role">${project.role}</p>
        </div>
      `;

      card.addEventListener("click", () => {
        openProjectModal(project);
      });

      grid.appendChild(card);
    });
  }

  // Eventos de clique nos filtros
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter");
      renderProjects(category);
    });
  });

  // Render inicial
  renderProjects("all");
}

/* ==========================================================================
   MODAL DE VÍDEO (LIGHTBOX)
   ========================================================================== */
let currentVideoIframe = null;

function initVideoModal() {
  const modal = document.getElementById("videoModal");
  const closeBtn = document.getElementById("modalCloseBtn");
  const showreelBtn = document.getElementById("heroShowreelBtn");

  if (!modal) return;

  function closeModal() {
    modal.classList.remove("open");
    const container = document.getElementById("modalVideoContent");
    if (container) {
      container.innerHTML = ""; // Para o áudio/vídeo imediatamente
    }
    document.body.style.overflow = "";
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  // Botão do Hero Showreel
  if (showreelBtn) {
    showreelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openShowreelModal();
    });
  }
}

function openShowreelModal() {
  const modal = document.getElementById("videoModal");
  const container = document.getElementById("modalVideoContent");
  const titleElem = document.getElementById("modalTitle");
  const subElem = document.getElementById("modalSubtitle");

  if (!modal || !container) return;

  titleElem.textContent = "RAFAEL // SHOWREEL OFICIAL 2024";
  subElem.textContent = "Direção de Cena, Cinematografia e Color Grading • Seleção de Melhores Momentos";

  // Usamos um vídeo cinematográfico demonstrativo em alta definição (Vimeo/YouTube player seguro)
  container.innerHTML = `
    <iframe 
      src="https://player.vimeo.com/video/76979871?autoplay=1&title=0&byline=0&portrait=0&color=e5a93c" 
      width="100%" 
      height="100%" 
      frameborder="0" 
      allow="autoplay; fullscreen; picture-in-picture" 
      allowfullscreen>
    </iframe>
  `;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function openProjectModal(project) {
  const modal = document.getElementById("videoModal");
  const container = document.getElementById("modalVideoContent");
  const titleElem = document.getElementById("modalTitle");
  const subElem = document.getElementById("modalSubtitle");

  if (!modal || !container) return;

  titleElem.textContent = project.title;
  subElem.textContent = `${project.client} | ${project.role} (${project.year})`;

  // Injeção de vídeo responsivo
  // Se for projeto demonstrativo, pode usar um player do vimeo ou embed customizado
  const videoSrc = project.videoUrl.includes("dQw4w9WgXcQ")
    ? "https://player.vimeo.com/video/35396305?autoplay=1&title=0&byline=0&portrait=0&color=e5a93c" // clipe cinematográfico de alta qualidade
    : project.videoUrl;

  container.innerHTML = `
    <iframe 
      src="${videoSrc}" 
      width="100%" 
      height="100%" 
      frameborder="0" 
      allow="autoplay; fullscreen; picture-in-picture" 
      allowfullscreen>
    </iframe>
  `;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

/* ==========================================================================
   FORMULÁRIO DE CONTATO & INTEGRAÇÃO COM WHATSAPP
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("formName").value.trim();
    const email = document.getElementById("formEmail").value.trim();
    const phone = document.getElementById("formPhone").value.trim();
    const projectType = document.getElementById("formType").value;
    const date = document.getElementById("formDate").value.trim();
    const message = document.getElementById("formMessage").value.trim();

    // Monta texto estruturado e elegante para o WhatsApp
    const whatsappNumber = "5511999999999"; // Substitua pelo número real de Rafael com DDD
    const textLines = [
      `*NOVO CONTATO VIA SITE - FILMMAKER RAFAEL* 🎬`,
      ``,
      `*Nome:* ${name}`,
      `*E-mail:* ${email}`,
      `*Telefone/WhatsApp:* ${phone || "Não informado"}`,
      `*Tipo de Projeto:* ${projectType}`,
      `*Previsão de Data:* ${date || "A definir"}`,
      ``,
      `*Detalhes/Briefing:*`,
      `${message}`
    ];

    const encodedMessage = encodeURIComponent(textLines.join("\n"));
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Feedback visual
    const submitBtn = form.querySelector(".form-submit-btn");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Encaminhando para o WhatsApp...</span>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      submitBtn.innerHTML = `<span>Mensagem Pronta no WhatsApp! ✓</span>`;
      submitBtn.style.backgroundColor = "#22c55e";

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.backgroundColor = "";
        submitBtn.disabled = false;
        form.reset();
      }, 4000);
    }, 800);
  });
}

/* ==========================================================================
   SMOOTH SCROLL PARA LINKS INTERNOS
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}
