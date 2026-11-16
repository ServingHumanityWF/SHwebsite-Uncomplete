document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("page-loader");
  const fill = document.querySelector(".loader-bar-fill");
  const percent = document.getElementById("loader-percent");

  if (!loader || !fill || !percent) {
    console.log("Loader elements not found!");
    return;
  }

  let progress = 0;

  fill.style.width = "0%";
  percent.textContent = "0%";

  const loading = setInterval(function () {
    if (progress < 90) {
      progress += Math.floor(Math.random() * 3) + 1;

      if (progress > 90) {
        progress = 90;
      }

      fill.style.width = progress + "%";
      percent.textContent = progress + "%";
    }
  }, 80);

  window.addEventListener("load", function () {
    clearInterval(loading);

    progress = 100;

    fill.style.width = "100%";
    percent.textContent = "100%";

    setTimeout(function () {
      loader.classList.add("loader-hidden");

      setTimeout(function () {
        loader.style.display = "none";
      }, 900);
    }, 700);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("close-btn");
  const nav = document.getElementById("nav-links");

  if (!menuToggle || !closeBtn || !nav) return;

  menuToggle.addEventListener("click", () => {
    nav.classList.add("active");

    menuToggle.setAttribute("aria-expanded", "true");
  });

  closeBtn.addEventListener("click", () => {
    nav.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
  });

  const dropdowns = document.querySelectorAll(".nav-dropdown");

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".dropdown-toggle, .projects-toggle");
    if (!button) return;

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove("open");

          const otherButton = otherDropdown.querySelector(
            ".dropdown-toggle, .projects-toggle",
          );
          otherButton?.setAttribute("aria-expanded", "false");
        }
      });
      const isOpen = dropdown.classList.toggle("open");

      button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  document.addEventListener("click", () => {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("open");

      const button = dropdown.querySelector(
        ".dropdown-toggle, .projects-toggle",
      );
      button?.setAttribute("aria-expanded", "false");
    });
  });

  document
    .querySelectorAll(
      ".projects-menu a, .nav-link:not(.projects-toggle), .nav-donate, .nav-sponsor",
    )
    .forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const words = [
    "Sponsor a Child",
    "Rashan Drive",
    "Rozgar Setup",
    "Medical Aid",
    "Khidmat Masjid-O-Madaris",
    "Clothing Drive",
    "Dawat-e-Iftaar",
    "Beat the Heat",
    "Waqf Qurbani",
    "Plantation Drive",
    "Corporate Social Responsibility",
    "Flood Relief Drive",
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const textElement = document.querySelector(".text");

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    textElement.innerHTML =
      currentWord.substring(0, charIndex) + '<span class="cursor"></span>';

    let speed = isDeleting ? 70 : 120;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 1000;
      isDeleting = true;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex++;

      if (wordIndex === words.length) {
        wordIndex = 0;
      }

      speed = 300;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();

  (function () {
    const revealElements = document.querySelectorAll(
      ".reveal-up, .reveal-left, .reveal-right",
    );

    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");

              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
        },
      );

      revealElements.forEach(function (element) {
        revealObserver.observe(element);
      });
    } else {
      revealElements.forEach(function (element) {
        element.classList.add("active");
      });
    }
  })();

  (function () {
    const galleryHeading = document.querySelector(".project-gallery-heading");

    const galleryItems = document.querySelectorAll(".project-gallery-item");

    if ("IntersectionObserver" in window) {
      const galleryObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("gallery-visible");

              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
        },
      );

      if (galleryHeading) {
        galleryObserver.observe(galleryHeading);
      }

      galleryItems.forEach(function (item, index) {
        item.style.transitionDelay = index * 0.08 + "s";

        galleryObserver.observe(item);
      });
    } else {
      if (galleryHeading) {
        galleryHeading.classList.add("gallery-visible");
      }

      galleryItems.forEach(function (item) {
        item.classList.add("gallery-visible");
      });
    }

    const lightbox = document.getElementById("gallery-lightbox");

    const lightboxImage = document.getElementById("gallery-lightbox-image");

    const lightboxTitle = document.getElementById("gallery-lightbox-title");

    const closeButton = document.getElementById("gallery-lightbox-close");

    galleryItems.forEach(function (item) {
      item.addEventListener("click", function () {
        const image = this.getAttribute("data-image");

        const title = this.getAttribute("data-title");

        lightboxImage.src = image;

        lightboxImage.alt = title;

        lightboxTitle.textContent = title;

        lightbox.classList.add("open");

        document.body.style.overflow = "hidden";
      });
    });

    function closeGalleryLightbox() {
      lightbox.classList.remove("open");

      document.body.style.overflow = "";
    }

    if (closeButton) {
      closeButton.addEventListener("click", closeGalleryLightbox);
    }

    if (lightbox) {
      lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
          closeGalleryLightbox();
        }
      });
    }

    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        lightbox &&
        lightbox.classList.contains("open")
      ) {
        closeGalleryLightbox();
      }
    });
  })();

  const backToTop = document.getElementById("back-to-top");

  function toggleBackToTop() {
    if (!backToTop) return;

    if (window.scrollY > 550) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }

  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTop?.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const animatedElements = document.querySelectorAll(
    ".footer .footer-col, .footer .footer-bottom p",
  );

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
});
/* =====================================================================
   VOLUNTEERS
   To add a volunteer, add one object to VOLUNTEERS below. The card appears
   on the page automatically.
   icon: any Font Awesome solid icon name, e.g. "fa-user", "fa-user-tie".
   ===================================================================== */
const VOLUNTEERS = [
  {
    name: "M.Umer Khan",
    role: "Senior Member",
    icon: "fa-user",
    text: "When I joined Serving Humanity in 2019, it became a turning point in my life. I realized the happiness and peace that come from helping the poor in the way God has directed us. I salute all the members who optimistically encourage others to be part of this group. Our little efforts can bring hope and life to the needy and disheartened. Now I’m moving forward to serve humanity as much as I can, spreading peace and harmony. I’m genuinely proud to be part of this transformative journey.",
  },
  {
    name: "Sheeza Fatima",
    role: "Marketing Representative",
    icon: "fa-user-tie",
    text: "Marketing Representative, I want to share my honest review of the last eight months at Serving Humanity Welfare Organization (REGD). It has been an incredible journey with a cooperative Boss and a fantastic office team. Working with such a cohesive and supportive environment has made my job enjoyable and fulfilling. The President’s guidance and encouragement have greatly helped in my growth and success. This being my first job, I feel completely satisfied with the positive atmosphere here. I’m genuinely proud to be part of this transformative journey.",
  },
  {
    name: "Usman Islam",
    role: "Marketing Representative",
    icon: "fa-user",
    text: "Marketing Representative, I want to say that Serving Humanity is doing an incredible job. They are making a real difference in people’s lives, and it’s inspiring to see the impact. The dedication and hard work of everyone involved are truly commendable. Keep up the fantastic work and know you’re making the world a better place. The compassion and teamwork I’ve witnessed here are unmatched. I’m genuinely proud to be part of this transformative journey.",
  },
];

/* Cards per view and gap for each screen width (JavaScript controls the
   slider layout, not CSS). Checked in order, first match wins. */
const VOLUNTEER_LAYOUT = [
  { maxWidth: 767, perView: 1, gap: 0 },
  { maxWidth: 1024, perView: 2, gap: 20 },
  { maxWidth: Infinity, perView: 3, gap: 25 },
];

function getVolunteerLayout() {
  const width = window.innerWidth;
  return VOLUNTEER_LAYOUT.find((layout) => width <= layout.maxWidth);
}

function createVolunteerCard(volunteer) {
  const card = document.createElement("article");
  card.className = "volunteer-card";

  const top = document.createElement("div");
  top.className = "volunteer-top";
  const iconWrap = document.createElement("div");
  iconWrap.className = "volunteer-icon";
  const icon = document.createElement("i");
  icon.className = "fa-solid " + volunteer.icon;
  iconWrap.appendChild(icon);
  top.appendChild(iconWrap);

  const info = document.createElement("div");
  info.className = "volunteer-info";
  const h3 = document.createElement("h3");
  h3.textContent = volunteer.name;
  const role = document.createElement("span");
  role.className = "role";
  role.textContent = volunteer.role;
  const divider = document.createElement("div");
  divider.className = "card-divider";
  const p = document.createElement("p");
  p.textContent = volunteer.text;
  info.append(h3, role, divider, p);

  card.append(top, info);
  return card;
}

document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("volunteerTrack");
  const viewport = document.querySelector(".volunteers-viewport");
  const prevBtn = document.getElementById("volunteerPrev");
  const nextBtn = document.getElementById("volunteerNext");
  const dotsContainer = document.getElementById("volunteerDots");

  if (!track || !viewport || !prevBtn || !nextBtn) {
    return;
  }

  let cards = [];
  let currentIndex = 0;

  function renderVolunteers() {
    const fragment = document.createDocumentFragment();
    VOLUNTEERS.forEach(function (volunteer) {
      fragment.appendChild(createVolunteerCard(volunteer));
    });
    track.replaceChildren(fragment);
    cards = Array.from(track.querySelectorAll(".volunteer-card"));
  }

  // Sets each card's width and the gap from the layout table above.
  function applyLayout() {
    const layout = getVolunteerLayout();
    const cardWidth =
      (viewport.clientWidth - layout.gap * (layout.perView - 1)) /
      layout.perView;

    track.style.gap = layout.gap + "px";
    cards.forEach(function (card) {
      card.style.flex = "0 0 " + cardWidth + "px";
      card.style.width = cardWidth + "px";
    });

    return { cardWidth: cardWidth, gap: layout.gap, perView: layout.perView };
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - getVolunteerLayout().perView);
  }

  function updateSlider() {
    const dimensions = applyLayout();
    const move = (dimensions.cardWidth + dimensions.gap) * currentIndex;

    track.style.transform = "translate3d(-" + move + "px, 0, 0)";
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= getMaxIndex();
    updateDots();
  }

  function createDots() {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";
    const maxIndex = getMaxIndex();

    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "volunteer-dot";
      dot.setAttribute("aria-label", "Volunteer slide " + (i + 1));
      dot.addEventListener("click", function () {
        currentIndex = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    }

    updateDots();
  }

  function updateDots() {
    if (!dotsContainer) return;

    dotsContainer
      .querySelectorAll(".volunteer-dot")
      .forEach(function (dot, index) {
        dot.classList.toggle("active", index === currentIndex);
      });
  }

  nextBtn.addEventListener("click", function () {
    if (currentIndex < getMaxIndex()) {
      currentIndex++;
      updateSlider();
    }
  });

  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      currentIndex = Math.min(currentIndex, getMaxIndex());
      createDots();
      updateSlider();
    }, 150);
  });

  renderVolunteers();
  createDots();
  updateSlider();
});
/* =====================================================================
   IMPACT STATS
   To add a stat box, add one object to IMPACT_STATS below. It appears on
   the page automatically, and the counter animates to its target number.
   heading: use a line break (\n) to split a heading over two lines.
   icon: any Font Awesome solid icon name, e.g. "fa-sun".
   ===================================================================== */
const IMPACT_STATS = [
  {
    src: "Images/sponsor-a-child.jpg",
    alt: "Sponsor A Child",
    icon: "fa-child-reaching",
    heading: "Sponsor A Child",
    target: 843,
    label: "Students Sponsored",
  },
  {
    src: "Images/Screenshot 2026-09-19 010357.png",
    alt: "Rashan Drives",
    icon: "fa-bowl-food",
    heading: "Rashan Drives",
    target: 2509,
    label: "Rashan Bags Donated",
  },
  {
    src: "Images/Screenshot 2026-09-19 005010.png",
    alt: "Masjid Madaris",
    icon: "fa-mosque",
    heading: "Khidmat\nMasjid-o-Madaris",
    target: 8709,
    label: "Quran Pak Donated",
  },
  {
    src: "Images/Screenshot 2026-09-19 010622.png",
    alt: "Rozgar Setup",
    icon: "fa-briefcase",
    heading: "Rozgar Setup",
    target: 30,
    label: "Rozgar Opportunities Created",
  },
  {
    src: "Images/WhatsApp Image 2026-09-19 at 1.17.22 AM.jpeg",
    alt: "Medical Aid",
    icon: "fa-kit-medical",
    heading: "Medical Aid",
    target: 221,
    label: "Medical Cases Solved",
  },
  {
    src: "Images/Screenshot 2026-09-19 013014.png",
    alt: "Beat The Heat",
    icon: "fa-sun",
    heading: "Beat The Heat",
    target: 18,
    label: "Coolers Arranged",
  },
  {
    src: "Images/plantation003.jpeg",
    alt: "Plantation Drive",
    icon: "fa-seedling",
    heading: "Plantation Drive",
    target: 780,
    label: "Plants Planted",
  },
  {
    src: "Images/C-S-R.jpg",
    alt: "Corporate Social Responsibility",
    icon: "fa-building",
    heading: "Corporate Social\nResponsibility",
    target: 85,
    label: "Activities",
  },
];

/* Number of columns for each screen width (JavaScript controls this).
   Checked in order, first match wins. */
const IMPACT_LAYOUT = [
  { maxWidth: 480, columns: 1 },
  { maxWidth: 1024, columns: 2 },
  { maxWidth: Infinity, columns: 4 },
];

function renderImpactStats() {
  const container = document.getElementById("impactStats");
  if (!container) return;

  const fragment = document.createDocumentFragment();

  IMPACT_STATS.forEach(function (stat) {
    const article = document.createElement("article");
    article.className = "stat-box";

    const img = document.createElement("img");
    img.src = stat.src;
    img.alt = stat.alt;

    const overlay = document.createElement("div");
    overlay.className = "stat-overlay";

    const content = document.createElement("div");
    content.className = "stat-content";

    const iconWrap = document.createElement("div");
    iconWrap.className = "stat-icon";
    const icon = document.createElement("i");
    icon.className = "fa-solid " + stat.icon;
    iconWrap.appendChild(icon);

    const heading = document.createElement("div");
    heading.className = "heading-1";
    stat.heading.split("\n").forEach(function (line, index) {
      if (index > 0) heading.appendChild(document.createElement("br"));
      heading.appendChild(document.createTextNode(line));
    });

    const number = document.createElement("div");
    number.className = "number";
    number.dataset.target = String(stat.target);
    number.textContent = "0";

    const label = document.createElement("div");
    label.className = "label";
    label.textContent = stat.label;

    content.append(iconWrap, heading, number, label);
    article.append(img, overlay, content);
    fragment.appendChild(article);
  });

  container.replaceChildren(fragment);
  applyImpactLayout();
}

function applyImpactLayout() {
  const container = document.getElementById("impactStats");
  if (!container) return;

  const layout = IMPACT_LAYOUT.find(function (item) {
    return window.innerWidth <= item.maxWidth;
  });
  container.style.gridTemplateColumns =
    "repeat(" + layout.columns + ", minmax(0, 1fr))";
}

document.addEventListener("DOMContentLoaded", function () {
  renderImpactStats();

  let impactResizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(impactResizeTimer);
    impactResizeTimer = setTimeout(applyImpactLayout, 150);
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const impactSection = document.querySelector(".impact-section");
  const numbers = document.querySelectorAll(".stat-box .number");

  if (!impactSection || !numbers.length) return;

  function animateCounter(element) {
    const target = parseInt(element.getAttribute("data-target"), 10);

    if (isNaN(target)) return;

    const duration = 7000; // 7 seconds
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(easedProgress * target);

      element.textContent = currentValue.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(updateCounter);
  }

  const observer = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          numbers.forEach(function (number) {
            animateCounter(number);
          });

          observer.unobserve(impactSection);
        }
      });
    },
    {
      threshold: 0.25,
    },
  );

  observer.observe(impactSection);
});

document.addEventListener("DOMContentLoaded", function () {
  const donationModal = document.getElementById("donation-modal");
  const donationDialog = donationModal
    ? donationModal.querySelector(".donation-dialog")
    : null;
  const donationClose = document.getElementById("donation-close");
  const copyToast = document.getElementById("copy-toast");

  if (!donationModal || !donationDialog) return;

  function openDonationPopup(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    donationModal.classList.remove("zakat-only-mode");
    donationModal.classList.add("open");
    donationModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("donation-lock");

    setTimeout(function () {
      if (donationClose) donationClose.focus();
    }, 80);
  }

  function closeDonationPopup() {
    donationModal.classList.remove("open", "zakat-only-mode");
    donationModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("donation-lock");
    const zakatSummary = document.getElementById("zakat-modal-summary");
    if (zakatSummary) {
      zakatSummary.hidden = true;
      const zakatText = document.getElementById("zakat-modal-text");
      if (zakatText) zakatText.textContent = "";
    }
  }
  document
    .querySelectorAll(
      ".nav-donate, .donate-btn, [data-donate], a[href='#donate']",
    )
    .forEach(function (trigger) {
      trigger.addEventListener("click", openDonationPopup);
    });

  if (donationClose)
    donationClose.addEventListener("click", closeDonationPopup);

  const backdrop = donationModal.querySelector(".donation-backdrop");
  if (backdrop) backdrop.addEventListener("click", closeDonationPopup);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && donationModal.classList.contains("open")) {
      closeDonationPopup();
    }
  });

  const copyButtons = document.querySelectorAll(".copy-btn");
  let toastTimer;

  function showCopyToast(message) {
    if (!copyToast) return;
    const textElement = copyToast.querySelector("span");
    if (textElement) textElement.textContent = message;

    copyToast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      copyToast.classList.remove("show");
    }, 1800);
  }

  async function copyText(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      markCopied(button);
    } catch (error) {
      const helper = document.createElement("textarea");
      helper.value = text;
      helper.style.position = "fixed";
      helper.style.left = "-9999px";
      document.body.appendChild(helper);
      helper.select();

      try {
        document.execCommand("copy");
        markCopied(button);
      } catch (fallbackError) {
        showCopyToast("Please copy manually");
      }

      document.body.removeChild(helper);
    }
  }

  function markCopied(button) {
    button.classList.add("copied");
    button.innerHTML = '<i class="fa-solid fa-check"></i>';
    showCopyToast("Copied successfully");

    setTimeout(function () {
      button.classList.remove("copied");
      button.innerHTML = '<i class="fa-regular fa-copy"></i>';
    }, 1500);
  }

  copyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const value = this.getAttribute("data-copy");
      if (value) copyText(value, this);
    });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Tab" || !donationModal.classList.contains("open"))
      return;

    const focusable = donationDialog.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  donationModal.setAttribute("aria-hidden", "true");
});

/* =========================================================
   ZAKAT CALCULATOR
   ---------------------------------------------------------
   - A button opens the calculator (a card on laptops, a bottom sheet on
     phones). "Quick" = one total. "Detailed" = one box for each kind of wealth.
   - Zakat = 2.5% of the wealth, but only when the wealth is at or above the
     Nisab. The Nisab comes from the gold / silver prices in zakat-config.js.
   - "Donate Zakat" opens the Donate popup in "Zakat only" mode (only the
     UBL Zakat account is shown) and the popup has a "Copy amount" button.
   - The numbers are remembered for the visit (sessionStorage), so they are
     still there on the next page. They never leave the browser.
   - English / اردو: a switch at the top of the card. Urdu text is right to
     left and uses an Urdu font (loaded only when Urdu is chosen). All the
     words are in the TEXT list below (en = English, ur = Urdu), so a wrong
     word can be fixed in one place. The choice is remembered.
========================================================= */

function initZakatCalculator() {
  const fab = document.getElementById("zakat-fab");
  const overlay = document.getElementById("zakat-overlay");
  const panel = document.getElementById("zakat-panel");
  if (!fab || !overlay || !panel) return;

  const $ = function (id) {
    return document.getElementById(id);
  };

  /* ---------- settings: zakat-config.js, with safe defaults ---------- */

  const defaults = {
    updated: "2026-11-14",
    goldPerGram: 35231.1,
    silverPerGram: 458.076132,
    nisabBasis: "silver",
    silverNisabGrams: 612.36,
    goldNisabGrams: 87.48,
    tolaGrams: 11.664,
    rate: 0.025,
    maxAgeDays: 45,
  };
  const cfg = Object.assign({}, defaults, window.ZAKAT_CONFIG || {});
  [
    "goldPerGram",
    "silverPerGram",
    "silverNisabGrams",
    "goldNisabGrams",
    "tolaGrams",
    "rate",
    "maxAgeDays",
  ].forEach(function (key) {
    if (!(Number(cfg[key]) > 0)) cfg[key] = defaults[key];
    cfg[key] = Number(cfg[key]);
  });

  const useGold = cfg.nisabBasis === "gold";
  // rounded to whole rupees: the number shown on screen is the number used
  const nisabValue = Math.round(
    useGold
      ? cfg.goldNisabGrams * cfg.goldPerGram
      : cfg.silverNisabGrams * cfg.silverPerGram,
  );
  const basisGrams = useGold ? cfg.goldNisabGrams : cfg.silverNisabGrams;
  const basisPricePerGram = useGold ? cfg.goldPerGram : cfg.silverPerGram;

  const money = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 });
  const decimal = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 1 });

  /* ---------- English / اردو ---------- */

  let lang = "en";

  const TEXT = {
    en: {
      title: "Zakat Calculator",
      subtitle: "2.5% of your wealth, once it reaches the Nisab",
      closeAria: "Close Zakat calculator",
      tabsAria: "Calculator type",
      tabSimple: "Quick",
      tabDetail: "Detailed",
      simpleLabel: "Total zakatable wealth",
      simplePlaceholder: "e.g. 500,000",
      simpleHint:
        "Cash, bank savings, gold, silver, business goods and money owed to you, minus the debts you must pay now.",
      cashLabel: "Cash in hand and bank accounts",
      goldLabel: "Gold you own (jewellery too)",
      silverLabel: "Silver you own",
      goldUnitAria: "Gold weight unit",
      silverUnitAria: "Silver weight unit",
      unitTola: "tola",
      unitGram: "gram",
      businessLabel: "Business goods and investments",
      businessHint:
        "Stock for sale, shares, prize bonds, savings certificates.",
      receivableLabel: "Money owed to you",
      receivableHint: "Only what you expect to get back.",
      debtsLabel: "Debts you must pay now",
      debtsHint: "This amount is taken off your total.",
      resultLabel: "Your Zakat",
      totalLabel: "Your zakatable wealth",
      rememberLabel: "Remember:",
      rememberText:
        "Zakat is due when your wealth has stayed at or above the Nisab for one full lunar year. If you are unsure, please ask a scholar.",
      donate: "Donate Zakat",
      reset: "Reset",
      privacy: "Your numbers stay in your browser. We never receive them.",
      statusEmpty: "Enter your wealth to see your Zakat.",
      statusBelow: "Your wealth is below the Nisab, so Zakat is not due on it.",
      statusAbove: "That is {rate} of {total}.",
      rate: "{n}%",
      nisabLabel: "Nisab ({basis}, {grams} g)",
      basisSilver: "silver",
      basisGold: "gold",
      ratesText:
        "Nisab today is about {nisab} ({basis}, {grams} g at {price} per gram, rates of {date}).",
      ratesStale:
        " These rates are {days} days old, so please check today's gold and silver rate before you pay.",
      worth: "Worth about {amount} at the current rate",
      summary:
        "Your calculated Zakat: {amount}. Please use the UBL Zakat account details below.",
      copyAmount: "Copy amount",
      copied: "Amount copied",
      copyManual: "Please copy the amount manually",
    },
    ur: {
      title: "زکوٰۃ کیلکولیٹر",
      subtitle: "آپ کے مال کا ڈھائی فیصد، جب وہ نصاب تک پہنچ جائے",
      closeAria: "زکوٰۃ کیلکولیٹر بند کریں",
      tabsAria: "کیلکولیٹر کی قسم",
      tabSimple: "فوری",
      tabDetail: "تفصیلی",
      simpleLabel: "زکوٰۃ کے قابل کُل مال",
      simplePlaceholder: "مثلاً 500,000",
      simpleHint:
        "نقدی، بینک میں جمع رقم، سونا، چاندی، تجارتی مال اور وہ رقم جو آپ کو واپس ملنی ہے۔ اس میں سے وہ قرض نکال دیں جو آپ کو ابھی ادا کرنا ہے۔",
      cashLabel: "ہاتھ میں موجود نقدی اور بینک اکاؤنٹس",
      goldLabel: "آپ کے پاس موجود سونا (زیورات سمیت)",
      silverLabel: "آپ کے پاس موجود چاندی",
      goldUnitAria: "سونے کے وزن کی اکائی",
      silverUnitAria: "چاندی کے وزن کی اکائی",
      unitTola: "تولہ",
      unitGram: "گرام",
      businessLabel: "تجارتی مال اور سرمایہ کاری",
      businessHint:
        "فروخت کے لیے موجود مال، شیئرز، پرائز بانڈز، سیونگ سرٹیفکیٹس۔",
      receivableLabel: "آپ کو واپس ملنے والی رقم",
      receivableHint: "صرف وہ رقم جس کے ملنے کی آپ کو امید ہو۔",
      debtsLabel: "وہ قرض جو آپ کو ابھی ادا کرنا ہے",
      debtsHint: "یہ رقم آپ کے کُل مال میں سے منہا کر دی جائے گی۔",
      resultLabel: "آپ کی زکوٰۃ",
      totalLabel: "آپ کا زکوٰۃ کے قابل مال",
      rememberLabel: "یاد رکھیں:",
      rememberText:
        "زکوٰۃ اس وقت واجب ہوتی ہے جب آپ کا مال پورا قمری سال نصاب کے برابر یا اس سے زیادہ رہے۔ اگر کوئی شک ہو تو کسی عالم سے پوچھ لیں۔",
      donate: "زکوٰۃ ادا کریں",
      reset: "ری سیٹ",
      privacy: "آپ کے اعداد صرف آپ کے براؤزر میں رہتے ہیں، ہم تک نہیں پہنچتے۔",
      statusEmpty: "اپنا مال درج کریں تاکہ آپ کی زکوٰۃ معلوم ہو سکے۔",
      statusBelow: "آپ کا مال نصاب سے کم ہے، اس لیے اس پر زکوٰۃ واجب نہیں۔",
      statusAbove: "یہ {total} کا {rate} ہے۔",
      rate: "{n} فیصد",
      nisabLabel: "نصاب ({basis}، {grams} گرام)",
      basisSilver: "چاندی",
      basisGold: "سونا",
      ratesText:
        "آج کا نصاب تقریباً {nisab} ہے ({basis}، {grams} گرام، {price} فی گرام کے حساب سے، {date} کے نرخ)۔",
      ratesStale:
        " یہ نرخ {days} دن پرانے ہیں، اس لیے ادائیگی سے پہلے آج کا سونے اور چاندی کا نرخ ضرور دیکھ لیں۔",
      worth: "موجودہ نرخ پر تقریباً {amount} کا",
      summary:
        "آپ کی حساب شدہ زکوٰۃ: {amount}۔ براہِ کرم نیچے دی گئی UBL زکوٰۃ اکاؤنٹ کی تفصیلات استعمال کریں۔",
      copyAmount: "رقم کاپی کریں",
      copied: "رقم کاپی ہو گئی",
      copyManual: "براہِ کرم رقم خود کاپی کریں",
    },
  };

  function t(key, vars) {
    let text = (TEXT[lang] && TEXT[lang][key]) || TEXT.en[key] || key;
    if (vars) {
      Object.keys(vars).forEach(function (name) {
        text = text.split("{" + name + "}").join(vars[name]);
      });
    }
    return text;
  }

  // English: PKR 12,500    Urdu: 12,500 روپے   (digits stay 0-9 in both)
  function pkr(n) {
    const value = money.format(Math.round(n));
    return lang === "ur" ? value + " روپے" : "PKR " + value;
  }

  function pricePerGram(n) {
    return lang === "ur"
      ? decimal.format(n) + " روپے"
      : "PKR " + decimal.format(n);
  }

  function basisWord() {
    return t(useGold ? "basisGold" : "basisSilver");
  }

  /* ---------- elements ---------- */

  const inputs = {
    wealth: $("zakat-wealth"),
    cash: $("zakat-cash"),
    gold: $("zakat-gold"),
    silver: $("zakat-silver"),
    business: $("zakat-business"),
    receivable: $("zakat-receivable"),
    debts: $("zakat-debts"),
  };
  const goldUnit = $("zakat-gold-unit");
  const silverUnit = $("zakat-silver-unit");
  const goldHint = $("zakat-gold-hint");
  const silverHint = $("zakat-silver-hint");

  const resultEl = $("zakat-result");
  const statusEl = $("zakat-status");
  const breakdown = $("zakat-breakdown");
  const totalEl = $("zakat-total");
  const nisabEl = $("zakat-nisab");
  const nisabLabel = $("zakat-nisab-label");
  const ratesEl = $("zakat-rates");
  const donateBtn = $("zakat-donate-btn");
  const resetBtn = $("zakat-reset");

  const copyBtn = $("zakat-copy-amount");
  const langButtons = Array.prototype.slice.call(
    panel.querySelectorAll("[data-zakat-lang]"),
  );

  const tabs = [$("zakat-tab-simple"), $("zakat-tab-detail")];
  const panes = { simple: $("zakat-simple"), detail: $("zakat-detail") };

  if (!resultEl || !statusEl || !donateBtn || !inputs.wealth) return;

  let mode = "simple";
  let due = 0;

  /* ---------- rates note (and a warning when the prices are old) ---------- */

  function showRates() {
    if (!ratesEl) return;
    const date = new Date(cfg.updated + "T00:00:00");
    const valid = !isNaN(date.getTime());

    let dateLabel = String(cfg.updated);
    if (valid) {
      const options = { day: "numeric", month: "short", year: "numeric" };
      try {
        dateLabel = date.toLocaleDateString(
          lang === "ur" ? "ur-PK-u-nu-latn" : "en-GB",
          options,
        );
      } catch (error) {
        dateLabel = date.toLocaleDateString("en-GB", options);
      }
    }

    ratesEl.classList.remove("is-stale");
    ratesEl.textContent = t("ratesText", {
      nisab: pkr(nisabValue),
      basis: basisWord(),
      grams: basisGrams,
      price: pricePerGram(basisPricePerGram),
      date: dateLabel,
    });

    const age = valid
      ? Math.floor((Date.now() - date.getTime()) / 86400000)
      : 0;
    if (age > cfg.maxAgeDays) {
      ratesEl.classList.add("is-stale");
      ratesEl.textContent += t("ratesStale", { days: age });
    }
  }

  /* ---------- typing: commas appear while the person types ---------- */

  function formatField(input, allowDecimals) {
    const caret =
      typeof input.selectionStart === "number"
        ? input.selectionStart
        : input.value.length;
    const keep = function (text) {
      return allowDecimals
        ? text.replace(/[^\d.]/g, "")
        : text.replace(/\D/g, "");
    };
    const validBeforeCaret = keep(input.value.slice(0, caret)).length;

    let raw = keep(input.value);
    if (allowDecimals) {
      const parts = raw.split(".");
      raw =
        parts[0] +
        (parts.length > 1 ? "." + parts.slice(1).join("").slice(0, 3) : "");
    }

    const dot = raw.indexOf(".");
    let whole = dot === -1 ? raw : raw.slice(0, dot);
    const fraction = dot === -1 ? "" : raw.slice(dot);
    whole = whole.replace(/^0+(?=\d)/, "").slice(0, 13);
    if (!allowDecimals) whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const out = whole + fraction;
    if (out === input.value) return;
    input.value = out;

    if (document.activeElement === input && input.setSelectionRange) {
      let position = 0;
      let seen = 0;
      while (position < out.length && seen < validBeforeCaret) {
        if (/[\d.]/.test(out.charAt(position))) seen += 1;
        position += 1;
      }
      input.setSelectionRange(position, position);
    }
  }

  const decimalFields = { gold: true, silver: true };

  Object.keys(inputs).forEach(function (key) {
    const input = inputs[key];
    if (!input) return;
    input.addEventListener("input", function () {
      formatField(input, !!decimalFields[key]);
      calculate();
    });
  });
  [goldUnit, silverUnit].forEach(function (select) {
    if (select) select.addEventListener("change", calculate);
  });

  /* ---------- the calculation ---------- */

  function readNumber(input) {
    if (!input) return 0;
    const value = parseFloat(String(input.value).replace(/,/g, ""));
    return isFinite(value) && value > 0 ? value : 0;
  }

  function gramsPerUnit(select) {
    return select && select.value === "gram" ? 1 : cfg.tolaGrams;
  }

  function calculate() {
    let total = 0;

    if (mode === "simple") {
      total = readNumber(inputs.wealth);
    } else {
      const goldValue =
        readNumber(inputs.gold) * gramsPerUnit(goldUnit) * cfg.goldPerGram;
      const silverValue =
        readNumber(inputs.silver) *
        gramsPerUnit(silverUnit) *
        cfg.silverPerGram;

      if (goldHint) {
        goldHint.textContent = goldValue
          ? t("worth", { amount: pkr(goldValue) })
          : "";
      }
      if (silverHint) {
        silverHint.textContent = silverValue
          ? t("worth", { amount: pkr(silverValue) })
          : "";
      }

      total = Math.max(
        0,
        readNumber(inputs.cash) +
          goldValue +
          silverValue +
          readNumber(inputs.business) +
          readNumber(inputs.receivable) -
          readNumber(inputs.debts),
      );
    }

    total = Math.round(total);
    const reachesNisab = total > 0 && total >= nisabValue;
    due = reachesNisab ? Math.round(total * cfg.rate) : 0;

    render(total, reachesNisab);
    save();
  }

  function render(total, reachesNisab) {
    const ratePercent = t("rate", { n: decimal.format(cfg.rate * 100) });

    resultEl.textContent = pkr(due);
    statusEl.classList.remove("is-below");

    if (!total) {
      statusEl.textContent = t("statusEmpty");
    } else if (!reachesNisab) {
      statusEl.textContent = t("statusBelow");
      statusEl.classList.add("is-below");
    } else {
      statusEl.textContent = t("statusAbove", {
        rate: ratePercent,
        total: pkr(total),
      });
    }

    if (breakdown) breakdown.hidden = !total;
    if (totalEl) totalEl.textContent = pkr(total);
    if (nisabLabel) {
      nisabLabel.textContent = t("nisabLabel", {
        basis: basisWord(),
        grams: basisGrams,
      });
    }
    if (nisabEl) nisabEl.textContent = pkr(nisabValue);

    donateBtn.setAttribute("aria-disabled", String(!due));
  }

  /* ---------- remembered for the visit (this tab only) ---------- */

  const STORE_KEY = "zakat-calculator-v1";

  function save() {
    try {
      const data = { mode: mode, values: {}, goldUnit: "", silverUnit: "" };
      Object.keys(inputs).forEach(function (key) {
        if (inputs[key] && inputs[key].value)
          data.values[key] = inputs[key].value;
      });
      if (goldUnit) data.goldUnit = goldUnit.value;
      if (silverUnit) data.silverUnit = silverUnit.value;

      if (Object.keys(data.values).length) {
        window.sessionStorage.setItem(STORE_KEY, JSON.stringify(data));
      } else {
        window.sessionStorage.removeItem(STORE_KEY);
      }
    } catch (error) {
      /* storage blocked: the calculator still works, it just forgets */
    }
  }

  function restore() {
    try {
      const raw = window.sessionStorage.getItem(STORE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (!data || typeof data !== "object") return;

      Object.keys(inputs).forEach(function (key) {
        const value = data.values && data.values[key];
        if (inputs[key] && typeof value === "string") {
          inputs[key].value = value;
          formatField(inputs[key], !!decimalFields[key]);
        }
      });
      if (goldUnit && (data.goldUnit === "gram" || data.goldUnit === "tola")) {
        goldUnit.value = data.goldUnit;
      }
      if (
        silverUnit &&
        (data.silverUnit === "gram" || data.silverUnit === "tola")
      ) {
        silverUnit.value = data.silverUnit;
      }
      if (data.mode === "detail") setMode("detail", false);
    } catch (error) {
      /* nothing saved, or it could not be read */
    }
  }

  /* ---------- Quick / Detailed ---------- */

  function setMode(next, moveFocus) {
    mode = next;
    tabs.forEach(function (tab) {
      if (!tab) return;
      const active = tab.getAttribute("data-zakat-mode") === next;
      tab.setAttribute("aria-selected", String(active));
      tab.setAttribute("tabindex", active ? "0" : "-1");
      if (active && moveFocus) tab.focus();
    });
    if (panes.simple) panes.simple.hidden = next !== "simple";
    if (panes.detail) panes.detail.hidden = next !== "detail";
    calculate();
  }

  tabs.forEach(function (tab, index) {
    if (!tab) return;
    tab.addEventListener("click", function () {
      setMode(tab.getAttribute("data-zakat-mode"), false);
    });
    tab.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const other = tabs[index === 0 ? 1 : 0];
      if (other) setMode(other.getAttribute("data-zakat-mode"), true);
    });
  });

  /* ---------- open / close ---------- */

  let returnFocusTo = null;

  function isOpen() {
    return !overlay.hidden;
  }

  function openPanel() {
    returnFocusTo = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add("zakat-open");
    fab.setAttribute("aria-expanded", "true");
    panel.focus({ preventScroll: true });
  }

  function closePanel(giveFocusBack) {
    overlay.hidden = true;
    document.body.classList.remove("zakat-open");
    fab.setAttribute("aria-expanded", "false");
    if (giveFocusBack !== false) {
      const target =
        returnFocusTo && document.contains(returnFocusTo) ? returnFocusTo : fab;
      target.focus();
    }
  }

  fab.addEventListener("click", function () {
    if (isOpen()) closePanel(true);
    else openPanel();
  });

  overlay.addEventListener("click", function (event) {
    if (event.target.closest && event.target.closest("[data-zakat-close]")) {
      closePanel(true);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (!isOpen()) return;

    if (event.key === "Escape") {
      closePanel(true);
      return;
    }

    // keep the Tab key inside the card while it is open
    if (event.key === "Tab") {
      const focusable = Array.prototype.filter.call(
        panel.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
        function (el) {
          return !el.disabled && el.offsetParent !== null;
        },
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === panel)
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  /* ---------- reset ---------- */

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      Object.keys(inputs).forEach(function (key) {
        if (inputs[key]) inputs[key].value = "";
      });
      if (goldUnit) goldUnit.value = "tola";
      if (silverUnit) silverUnit.value = "tola";
      try {
        window.sessionStorage.removeItem(STORE_KEY);
      } catch (error) {
        /* ignore */
      }
      calculate();
      const first = mode === "simple" ? inputs.wealth : inputs.cash;
      if (first) first.focus();
    });
  }

  /* ---------- Donate Zakat -> Donate popup (Zakat only) ---------- */

  let donatedAmount = 0;

  function nudge() {
    statusEl.classList.remove("is-nudge");
    // restart the little shake
    void statusEl.offsetWidth;
    statusEl.classList.add("is-nudge");
    window.setTimeout(function () {
      statusEl.classList.remove("is-nudge");
    }, 450);
    const first = mode === "simple" ? inputs.wealth : inputs.cash;
    if (first) first.focus();
  }

  donateBtn.addEventListener("click", function () {
    if (!due) {
      nudge();
      return;
    }

    const modal = $("donation-modal");
    if (!modal) return;

    donatedAmount = due;
    closePanel(false);

    modal.classList.add("zakat-only-mode", "open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("donation-lock");

    const text = $("zakat-modal-text");
    const summary = $("zakat-modal-summary");
    const copyLabel = $("zakat-copy-label");
    if (text) {
      text.setAttribute("lang", lang);
      text.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
      text.textContent = t("summary", { amount: pkr(donatedAmount) });
    }
    if (copyBtn) copyBtn.setAttribute("lang", lang);
    if (copyLabel) copyLabel.textContent = t("copyAmount");
    if (summary) summary.hidden = false;

    window.setTimeout(function () {
      const close = $("donation-close");
      if (close) close.focus();
    }, 80);
  });

  /* ---------- "Copy amount" in the popup ---------- */

  function showToast(message) {
    const toast = $("copy-toast");
    if (!toast) return;
    const label = toast.querySelector("span");
    if (label) label.textContent = message;
    toast.classList.add("show");
    window.setTimeout(function () {
      toast.classList.remove("show");
    }, 1800);
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async function () {
      const text = String(donatedAmount || due);
      try {
        await navigator.clipboard.writeText(text);
        showToast(t("copied"));
      } catch (error) {
        const helper = document.createElement("textarea");
        helper.value = text;
        helper.style.position = "fixed";
        helper.style.left = "-9999px";
        document.body.appendChild(helper);
        helper.select();
        try {
          document.execCommand("copy");
          showToast(t("copied"));
        } catch (fallbackError) {
          showToast(t("copyManual"));
        }
        document.body.removeChild(helper);
      }
    });
  }

  /* ---------- language switch ---------- */

  const LANG_KEY = "zakat-lang";

  // the Urdu font is only downloaded when somebody picks Urdu
  function loadUrduFont() {
    if (document.getElementById("zakat-urdu-font")) return;
    const link = document.createElement("link");
    link.id = "zakat-urdu-font";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap";
    document.head.appendChild(link);
  }

  function applyLanguage(next, remember) {
    lang = next === "ur" ? "ur" : "en";
    if (lang === "ur") loadUrduFont();

    panel.setAttribute("lang", lang);
    panel.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");

    panel.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    panel.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute(
        "placeholder",
        t(el.getAttribute("data-i18n-placeholder")),
      );
    });
    panel.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });

    langButtons.forEach(function (button) {
      button.setAttribute(
        "aria-pressed",
        String(button.getAttribute("data-zakat-lang") === lang),
      );
    });

    showRates();
    calculate();

    if (remember) {
      try {
        window.localStorage.setItem(LANG_KEY, lang);
      } catch (error) {
        /* storage blocked: the choice is just not remembered */
      }
    }
  }

  langButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyLanguage(button.getAttribute("data-zakat-lang"), true);
    });
  });

  function firstLanguage() {
    try {
      const saved = window.localStorage.getItem(LANG_KEY);
      if (saved === "ur" || saved === "en") return saved;
    } catch (error) {
      /* ignore */
    }
    // somebody whose browser is set to Urdu gets Urdu the first time
    const browser = String(navigator.language || "").toLowerCase();
    return browser.indexOf("ur") === 0 ? "ur" : "en";
  }

  /* ---------- start ---------- */

  restore();
  applyLanguage(firstLanguage(), false);
}

document.addEventListener("DOMContentLoaded", initZakatCalculator);

document.addEventListener("DOMContentLoaded", function () {
  const sponsorModal = document.getElementById("sponsorModal");

  const sponsorClose = document.getElementById("sponsorClose");

  const sponsorOverlay = sponsorModal
    ? sponsorModal.querySelector(".sponsor-modal-overlay")
    : null;

  const sponsorTriggers = document.querySelectorAll(
    ".nav-sponsor, " +
      ".sponsor-btn, " +
      "[data-sponsor], " +
      "a[href='#sponsor']",
  );

  if (!sponsorModal || !sponsorTriggers.length) {
    return;
  }

  function openSponsorModal(event) {
    if (event) {
      event.preventDefault();
    }

    sponsorModal.classList.add("active");

    sponsorModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    const dialog = sponsorModal.querySelector(".sponsor-dialog");

    if (dialog) {
      dialog.scrollTop = 0;
    }
  }

  function closeSponsorModal() {
    sponsorModal.classList.remove("active");

    sponsorModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  }

  sponsorTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", openSponsorModal);
  });

  if (sponsorClose) {
    sponsorClose.addEventListener("click", closeSponsorModal);
  }

  if (sponsorOverlay) {
    sponsorOverlay.addEventListener("click", closeSponsorModal);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && sponsorModal.classList.contains("active")) {
      closeSponsorModal();
    }
  });

  const sponsorDialog = sponsorModal.querySelector(".sponsor-dialog");

  if (sponsorDialog) {
    sponsorDialog.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }
}); 

/* =====================================================================
   SPONSOR PARTNERSHIP FORM
   SPONSOR_FORM_ENDPOINT: optional. If you have a server or form service
   (e.g. Formspree, Google Apps Script), put its URL here and submissions
   are POSTed to it as JSON. Leave it empty to open an email to
   PARTNER_EMAIL instead.
   ===================================================================== */
const SPONSOR_FORM_ENDPOINT =
  "https://formsubmit.co/ajax/servinghumanitywebsite@gmail.com";
const PARTNER_EMAIL = "servinghumanitywebsite@gmail.com";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("sponsorJoinForm");
  if (!form) return;

  const statusEl = document.getElementById("sponsorFormStatus");
  const submitBtn = document.getElementById("sponsorSubmitBtn");
  const projectSelect = document.getElementById("partnerProject");

  // Project list comes from IMPACT_STATS, so a new stat shows up here too.
  if (projectSelect && typeof IMPACT_STATS !== "undefined") {
    IMPACT_STATS.forEach(function (stat) {
      const option = document.createElement("option");
      option.value = stat.heading.replace(/\n/g, " ");
      option.textContent = option.value;
      projectSelect.appendChild(option);
    });
  }

  function setStatus(message, type) {
    statusEl.textContent = message;
    statusEl.classList.toggle("is-error", type === "error");
    statusEl.classList.toggle("is-success", type === "success");
  }

  function getValue(name) {
    const field = form.elements[name];
    return field ? field.value.trim() : "";
  }

  function validate() {
    const errors = [];
    form.querySelectorAll(".is-invalid").forEach(function (el) {
      el.classList.remove("is-invalid");
    });

    const required = ["name", "phone", "involvement"];
    required.forEach(function (name) {
      if (!getValue(name)) {
        form.elements[name].classList.add("is-invalid");
        errors.push(name);
      }
    });

    const phone = getValue("phone");
    if (phone && !/^[+()\d\s-]{7,20}$/.test(phone)) {
      form.elements.phone.classList.add("is-invalid");
      errors.push("phone");
    }

    const email = getValue("email");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      form.elements.email.classList.add("is-invalid");
      errors.push("email");
    }

    return errors;
  }

  function buildPayload() {
    return {
      name: getValue("name"),
      phone: getValue("phone"),
      email: getValue("email"),
      city: getValue("city"),
      involvement: getValue("involvement"),
      project: getValue("project"),
      commitment: getValue("commitment"),
      organization: getValue("organization"),
      message: getValue("message"),
      submittedAt: new Date().toISOString(),
    };
  }

  function sendByEmail(data) {
    const subject = "Partnership request: " + data.involvement;
    const lines = [
      "Name: " + data.name,
      "Phone / WhatsApp: " + data.phone,
      "Email: " + (data.email || "-"),
      "City: " + (data.city || "-"),
      "How they want to join: " + data.involvement,
      "Project: " + (data.project || "Not sure yet"),
      "Type of support: " + (data.commitment || "-"),
      "Organization: " + (data.organization || "-"),
      "",
      "Message:",
      data.message || "-",
    ];
    const url =
      "mailto:" +
      PARTNER_EMAIL +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(lines.join("\n"));
    window.location.href = url;
  }

  async function sendToEndpoint(data) {
    const response = await fetch(SPONSOR_FORM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Request failed: " + response.status);
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const errors = validate();
    if (errors.length) {
      setStatus("Please fill in the required fields (marked *).", "error");
      form.elements[errors[0]].focus();
      return;
    }

    const data = buildPayload();
    submitBtn.disabled = true;
    setStatus("Sending your request...", "");

    try {
      if (SPONSOR_FORM_ENDPOINT) {
        await sendToEndpoint(data);
        form.reset();
        setStatus(
          "Thank you! Your partnership request has been sent. Our team will contact you soon.",
          "success",
        );
      } else {
        // Email mode: the user still has to press Send in their email app,
        // so keep the form filled in case they need to try again.
        sendByEmail(data);
        setStatus(
          "Your email app has opened with your request. Please press Send to complete it.",
          "success",
        );
      }
    } catch (error) {
      setStatus(
        "Sorry, your request could not be sent. Please try again or contact us on WhatsApp.",
        "error",
      );
    } finally {
      submitBtn.disabled = false;
    }
  });
});

/* ==========================================================================
   PROJECT PAGES LOCK
   --------------------------------------------------------------------------
   Jab tak Core / Seasonal project pages par kaam chal raha hai, in ke links
   click karne par page khulne ke bajaye "Under Maintenance" popup dikhega.

   Pages dobara kholne ke liye sirf neeche wali line ko  false  kar den.
   ========================================================================== */
const PROJECTS_LOCKED = true;

(function () {
  if (!PROJECTS_LOCKED) return;

  // Jin links mein ye folders aayen ge wo lock ho jayen ge
  const LOCKED_PATHS = ["projects/coreProjects/", "projects/seasonalProjects/"];

  function isLockedLink(anchor) {
    if (!anchor) return false;
    const href = (anchor.getAttribute("href") || "").replace(/\\/g, "/");
    return LOCKED_PATHS.some(function (path) {
      return href.indexOf(path) !== -1;
    });
  }

  // Popup ko ek dafa page mein add karo
  function buildModal() {
    const modal = document.createElement("div");
    modal.className = "lock-modal";
    modal.id = "lock-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML =
      '<div class="lock-backdrop" data-lock-close></div>' +
      '<div class="lock-dialog" role="dialog" aria-modal="true" aria-labelledby="lock-title">' +
      '<button type="button" class="lock-close" data-lock-close aria-label="Close">' +
      '<i class="fa-solid fa-xmark"></i></button>' +
      '<div class="lock-icon"><i class="fa-solid fa-lock"></i></div>' +
      '<span class="lock-eyebrow">UNDER MAINTENANCE</span>' +
      '<h2 id="lock-title">Page Temporarily <span>Locked</span></h2>' +
      "<p>We are currently working on our project pages to bring you a better " +
      "experience. This page will be available again very soon.</p>" +
      '<button type="button" class="lock-ok" data-lock-close>Got it</button>' +
      "</div>";
    document.body.appendChild(modal);
    return modal;
  }

  let modal = null;

  function openLockModal() {
    if (!modal) modal = buildModal();

    // close the slide-in menu (if it is open) so it is not left behind the popup
    const navMenu = document.getElementById("nav-links");
    const navButton = document.getElementById("menu-toggle");
    if (navMenu) navMenu.classList.remove("active");
    if (navButton) navButton.setAttribute("aria-expanded", "false");

    // class add karne se pehle ek frame ruko taake animation chale
    requestAnimationFrame(function () {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
    });
    document.body.style.overflow = "hidden";
  }

  function closeLockModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Capture phase: baqi sab click handlers se pehle chalta hai
  function blockClick(event) {
    const anchor = event.target.closest && event.target.closest("a");

    if (anchor && isLockedLink(anchor)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      openLockModal();
      return;
    }

    if (event.target.closest && event.target.closest("[data-lock-close]")) {
      closeLockModal();
    }
  }

  document.addEventListener("click", blockClick, true);
  // Middle-click (naye tab mein kholna) bhi block
  document.addEventListener(
    "auxclick",
    function (event) {
      const anchor = event.target.closest && event.target.closest("a");
      if (anchor && isLockedLink(anchor)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        openLockModal();
      }
    },
    true,
  );

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeLockModal();
  });
})();
