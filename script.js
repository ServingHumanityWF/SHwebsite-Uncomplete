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
    .querySelectorAll(".projects-menu a, .nav-link:not(.projects-toggle), .nav-donate")
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
      if (event.key === "Escape" && lightbox && lightbox.classList.contains("open")) {
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
  {
    name: "Volunteer Name",
    role: "Volunteer Role",
    icon: "fa-user",
    text: "Marketing Representative, I want to say that Serving Humanity is doing an incredible job. They are making a real difference in people’s lives, and it’s inspiring to see the impact. The dedication and hard work of everyone involved are truly commendable. Keep up the fantastic work and know you’re making the world a better place. The compassion and teamwork I’ve witnessed here are unmatched. I’m genuinely proud to be part of this transformative journey.",
  }
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

    dotsContainer.querySelectorAll(".volunteer-dot").forEach(function (dot, index) {
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
    src: "../../Images/sponsor-a-child.jpg",
    alt: "Sponsor A Child",
    icon: "fa-child-reaching",
    heading: "Sponsor A Child",
    target: 843,
    label: "Students Sponsored",
  },
  {
    src: "../../Images/Screenshot 2026-09-19 010357.png",
    alt: "Rashan Drives",
    icon: "fa-bowl-food",
    heading: "Rashan Drives",
    target: 2509,
    label: "Rashan Bags Donated",
  },
  {
    src: "../../Images/Screenshot 2026-09-19 005010.png",
    alt: "Masjid Madaris",
    icon: "fa-mosque",
    heading: "Khidmat\nMasjid-o-Madaris",
    target: 8709,
    label: "Quran Pak Donated",
  },
  {
    src: "../../Images/Screenshot 2026-09-19 010622.png",
    alt: "Rozgar Setup",
    icon: "fa-briefcase",
    heading: "Rozgar Setup",
    target: 30,
    label: "Rozgar Opportunities Created",
  },
  {
    src: "../../Images/WhatsApp Image 2026-09-19 at 1.17.22 AM.jpeg",
    alt: "Medical Aid",
    icon: "fa-kit-medical",
    heading: "Medical Aid",
    target: 221,
    label: "Medical Cases Solved",
  },
  {
    src: "../../Images/Screenshot 2026-09-19 013014.png",
    alt: "Beat The Heat",
    icon: "fa-sun",
    heading: "Beat The Heat",
    target: 18,
    label: "Coolers Arranged",
  },
  {
    src: "../../Images/plantation003.jpeg",
    alt: "Plantation Drive",
    icon: "fa-seedling",
    heading: "Plantation Drive",
    target: 780,
    label: "Plants Planted",
  },
  {
    src: "../../Images/C-S-R.jpg",
    alt: "Corporate Social Responsibility",
    icon: "fa-building",
    heading: "Corporate Social\nResponsibility",
    target: 85,
    label: "Activities",
  }
];

/* Number of columns for each screen width (JavaScript controls this).
   Checked in order, first match wins. */
const IMPACT_LAYOUT = [
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

    donationModal.classList.add("open");
    donationModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("donation-lock");

    setTimeout(function () {
      if (donationClose) donationClose.focus();
    }, 80);
  }

  function closeDonationPopup() {
    donationModal.classList.remove("open");
    donationModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("donation-lock");
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
const SPONSOR_FORM_ENDPOINT = "";
const PARTNER_EMAIL = "servinghumanitysh1@gmail.com";

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
      "mailto:" + PARTNER_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
    window.location.href = url;
  }

  async function sendToEndpoint(data) {
    const response = await fetch(SPONSOR_FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
          "success"
        );
      } else {
        // Email mode: the user still has to press Send in their email app,
        // so keep the form filled in case they need to try again.
        sendByEmail(data);
        setStatus(
          "Your email app has opened with your request. Please press Send to complete it.",
          "success"
        );
      }
    } catch (error) {
      setStatus(
        "Sorry, your request could not be sent. Please try again or contact us on WhatsApp.",
        "error"
      );
    } finally {
      submitBtn.disabled = false;
    }
  });
});
