/* =========================================================
   ABOUT PAGE SCRIPT
   Serving Humanity Welfare Foundation

   0. Team members list  <-- yahan se team add / edit hoti hai
   1. Typing animation (header bar)
   2. Footer scroll animation
   3. Team carousel (cards khud ban jate hain)
   4. Donate Now popup + copy buttons
   5. Be a Sponsor popup + partnership form
   6. Project pages lock
========================================================= */

/* =========================================================
   0. TEAM MEMBERS
   ---------------------------------------------------------
   Team ka poora section is list se banta hai.

   NAYA MEMBER ADD KARNE KE LIYE: neeche kisi bhi line ki tarah
   ek nayi line copy karke list mein paste karein:

     { name: "Naam", role: "Designation", image: "photo.png" },

   - name   : member ka naam
   - role   : designation
   - image  : photo ki file ka naam (Images folder mein rakhein).
              Poora path bhi de sakte hain, jaise "../../Images/team/ali.jpg"
              ya "https://..." link.
              Photo na mile ya image khali ho to naam ke pehle huroof
              wala card dikhta hai.

   Member HATANE ke liye us ki line delete kar dein.
   Cards, dots aur arrows apne aap theek ho jate hain.
   List ki tarteeb hi cards ki tarteeb hai.
========================================================= */

// Jis folder mein team ki photos hain (page ke hisaab se)
const TEAM_IMAGE_FOLDER = "../../Images/Team/";

const TEAM_MEMBERS = [
  {
    name: "Aseef Uddin",
    role: "President",
    image: "Aseef Uddin- President.png",
  },
  {
    name: "Neha Naeem",
    role: "Vice President",
    image: "Neha Naeem- Vice President.png",
  },
  {
    name: "Syeda Asbah Mumtaz",
    role: "Managing Director",
    image: "Syeda Asbah Mumtaz- Managing Director.png",
  },
  {
    name: "M.Owaiz Khan",
    role: "General Secretary",
    image: "M.Owaiz Khan- General Secretary.png",
  },
  {
    name: "M.Sheraz Khan",
    role: "Finance Secretary",
    image: "M.Sheraz Khan- Finance Secretary.png",
  },
  {
    name: "Sameer Siddiqui",
    role: "Joint Secretary",
    image: "Sameer Siddiqui- Joint Secretary.png",
  },
  {
    name: "Firza Fatima",
    role: "Core Member",
    image: "Firza Fatima- Core Member.png",
  },
  {
    name: "M.Mudassir",
    role: "Core Member",
    image: "M.Mudassir- Core Member.png",
  },
  {
    name: "Sheeza Fatima",
    role: "Finance Manager",
    image: "Sheeza Fatima- Finance Manager.png",
  },
  {
    name: "Mahira Arif",
    role: "SMM & Content Writer",
    image: "Mahira Arif- SMM & Content Writer.png",
  },
  {
    name: "Usman Khan",
    role: "Marketing Executive",
    image: "Usman Khan- Marketing Executive.png",
  },
  {
    name: "Muhammad Hammad",
    role: "CSR Officer",
    image: "Hammad- CSR Officer.png",
  },
  {
    name: "Mishal Sabir",
    role: "Animator",
    image: "Mishal Sabir- Animator.png",
  },
  {
    name: "Hashir Malik",
    role: "Graphic Designer",
    image: "Hashir Malik- Graphic Designer.png",
  },
  {
    name: "Shayan Imran",
    role: "Content Creator",
    image: "Shayan Imran- Content Creator.png",
  },
];

function resolveTeamImage(path) {
  const value = (path || "").trim();
  if (!value) return "";
  // full link or already a path -> use as is, otherwise add the folder
  if (/^(https?:)?\/\//i.test(value) || /^\.{0,2}\//.test(value)) return value;
  return TEAM_IMAGE_FOLDER + value;
}

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(function (word) {
      return word.charAt(0).toUpperCase();
    })
    .join("");
}

function createTeamCard(member) {
  const card = document.createElement("div");
  card.className = "sh-team-card";

  function showInitials() {
    if (card.querySelector(".sh-team-card-fallback")) return;

    const fallback = document.createElement("div");
    fallback.className = "sh-team-card-fallback";
    fallback.setAttribute("aria-hidden", "true");
    fallback.textContent = getInitials(member.name);
    card.insertBefore(fallback, card.firstChild);
  }

  const src = resolveTeamImage(member.image);

  if (src) {
    const img = document.createElement("img");
    img.alt = member.name;
    img.decoding = "async";
    img.addEventListener("error", function () {
      img.remove();
      showInitials();
    });
    img.src = src;
    card.appendChild(img);
  } else {
    showInitials();
  }

  const overlay = document.createElement("div");
  overlay.className = "sh-team-card-overlay";
  card.appendChild(overlay);

  const info = document.createElement("div");
  info.className = "sh-team-card-info";

  const nameEl = document.createElement("h3");
  nameEl.textContent = member.name;

  const roleEl = document.createElement("span");
  roleEl.textContent = member.role || "";

  info.appendChild(nameEl);
  info.appendChild(roleEl);
  card.appendChild(info);

  return card;
}

function renderTeam() {
  const section = document.getElementById("our-team");
  const stage = document.getElementById("sh-team-stage");
  if (!section || !stage) return;

  // only members that have a name
  const members = TEAM_MEMBERS.filter(function (member) {
    return member && typeof member.name === "string" && member.name.trim();
  }).map(function (member) {
    return {
      name: member.name.trim(),
      role: (member.role || "").trim(),
      image: member.image,
    };
  });

  stage.textContent = "";

  // empty list: hide the whole section
  if (!members.length) {
    section.hidden = true;
    return;
  }

  section.hidden = false;
  members.forEach(function (member) {
    stage.appendChild(createTeamCard(member));
  });

  // a single member does not need arrows or dots
  if (members.length < 2) {
    ["sh-team-prev", "sh-team-next", "sh-team-dots"].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderTeam();
  initTyping();
  initFooterAnimation();
  initTeamCarousel();
  initDonationPopup();
  initSponsorPopup();
  initSponsorForm();
});

/* =========================================================
   1. TYPING ANIMATION
========================================================= */

function initTyping() {
  const textElement = document.querySelector(".text");
  if (!textElement) return;

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
}

/* =========================================================
   2. FOOTER SCROLL ANIMATION
========================================================= */

function initFooterAnimation() {
  const animatedElements = document.querySelectorAll(
    ".footer .footer-col, .footer .footer-bottom p",
  );

  // Very old browsers: just show everything
  if (!("IntersectionObserver" in window)) {
    animatedElements.forEach(function (element) {
      element.classList.add("animate");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  animatedElements.forEach(function (element) {
    observer.observe(element);
  });
}

/* =========================================================
   3. TEAM CAROUSEL
========================================================= */

function initTeamCarousel() {
  const stage = document.getElementById("sh-team-stage");
  const cards = Array.from(document.querySelectorAll(".sh-team-card"));
  const prevBtn = document.getElementById("sh-team-prev");
  const nextBtn = document.getElementById("sh-team-next");
  const dotsContainer = document.getElementById("sh-team-dots");
  const activeName = document.getElementById("sh-team-active-name");
  const activeRole = document.getElementById("sh-team-active-role");

  if (!stage || !cards.length || !prevBtn || !nextBtn || !dotsContainer) {
    return;
  }

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  let currentIndex = 0;
  let isAnimating = false;
  let autoPlay;

  /* ---------- dots ---------- */

  cards.forEach(function (_, index) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "sh-team-dot";
    dot.setAttribute("aria-label", "Show team member " + (index + 1));
    dot.addEventListener("click", function () {
      goTo(index);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.querySelectorAll(".sh-team-dot"));

  /* ---------- position of a card relative to the active one
     -2 / -1 / 0 / +1 / +2 ---------- */

  function getRelativePosition(index) {
    let difference = index - currentIndex;
    const total = cards.length;

    if (difference > total / 2) difference -= total;
    if (difference < -total / 2) difference += total;

    return difference;
  }

  function renderCards() {
    cards.forEach(function (card, index) {
      const position = getRelativePosition(index);

      card.classList.remove(
        "sh-center",
        "sh-left",
        "sh-right",
        "sh-left-two",
        "sh-right-two",
        "sh-hidden",
      );

      if (position === 0) card.classList.add("sh-center");
      else if (position === -1) card.classList.add("sh-left");
      else if (position === 1) card.classList.add("sh-right");
      else if (position === -2) card.classList.add("sh-left-two");
      else if (position === 2) card.classList.add("sh-right-two");
      else card.classList.add("sh-hidden");
    });

    const activeCard = cards[currentIndex];

    if (activeCard) {
      const heading = activeCard.querySelector(".sh-team-card-info h3");
      const role = activeCard.querySelector(".sh-team-card-info span");

      if (heading && activeName) {
        activeName.textContent = heading.textContent.trim();
      }
      if (role && activeRole) {
        activeRole.textContent = role.textContent.trim();
      }
    }

    dots.forEach(function (dot, index) {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goTo(index) {
    if (isAnimating || cards.length < 2) return;

    isAnimating = true;
    currentIndex = (index + cards.length) % cards.length;
    renderCards();

    setTimeout(function () {
      isAnimating = false;
    }, 650);

    restartAutoPlay();
  }

  prevBtn.addEventListener("click", function () {
    goTo(currentIndex - 1);
  });

  nextBtn.addEventListener("click", function () {
    goTo(currentIndex + 1);
  });

  /* ---------- keyboard (only while the section is on screen) ---------- */

  document.addEventListener("keydown", function (event) {
    const teamSection = document.getElementById("our-team");
    if (!teamSection) return;

    const rect = teamSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isVisible) return;

    if (event.key === "ArrowLeft") goTo(currentIndex - 1);
    if (event.key === "ArrowRight") goTo(currentIndex + 1);
  });

  /* ---------- autoplay (off for people who asked for less motion) ---------- */

  function startAutoPlay() {
    if (cards.length < 2 || reduceMotion) return;

    autoPlay = setInterval(function () {
      goTo(currentIndex + 1);
    }, 5000);
  }

  function restartAutoPlay() {
    clearInterval(autoPlay);
    startAutoPlay();
  }

  /* ---------- touch swipe ---------- */

  let touchStartX = 0;

  stage.addEventListener(
    "touchstart",
    function (event) {
      touchStartX = event.changedTouches[0].screenX;
    },
    { passive: true },
  );

  stage.addEventListener(
    "touchend",
    function (event) {
      const distance = event.changedTouches[0].screenX - touchStartX;

      if (Math.abs(distance) < 45) return;

      goTo(distance < 0 ? currentIndex + 1 : currentIndex - 1);
    },
    { passive: true },
  );

  renderCards();
  startAutoPlay();
}

/* =========================================================
   4. DONATE POPUP + COPY BUTTONS
========================================================= */

function initDonationPopup() {
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

  if (donationClose) {
    donationClose.addEventListener("click", closeDonationPopup);
  }

  const backdrop = donationModal.querySelector(".donation-backdrop");
  if (backdrop) backdrop.addEventListener("click", closeDonationPopup);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && donationModal.classList.contains("open")) {
      closeDonationPopup();
    }
  });

  /* ---------- copy buttons ---------- */

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

  function markCopied(button) {
    button.classList.add("copied");
    button.innerHTML = '<i class="fa-solid fa-check"></i>';
    showCopyToast("Copied successfully");

    setTimeout(function () {
      button.classList.remove("copied");
      button.innerHTML = '<i class="fa-regular fa-copy"></i>';
    }, 1500);
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

  document.querySelectorAll(".copy-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      const value = this.getAttribute("data-copy");
      if (value) copyText(value, this);
    });
  });

  /* ---------- keep keyboard focus inside the popup while it is open ---------- */

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Tab" || !donationModal.classList.contains("open")) {
      return;
    }

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
}

/* =========================================================
   5. BE A SPONSOR POPUP + PARTNERSHIP FORM
   Same behaviour as the main page.

   SPONSOR_FORM_ENDPOINT: optional. If you have a server or form service
   (e.g. Formspree, Google Apps Script), put its URL here and submissions
   are POSTed to it as JSON. Leave it empty to open an email to
   PARTNER_EMAIL instead.
   (The main page has its own copy of these two values in script.js.)
========================================================= */

const SPONSOR_FORM_ENDPOINT = "";
const PARTNER_EMAIL = "servinghumanitysh1@gmail.com";

// Same project list the main page builds from IMPACT_STATS
const SPONSOR_PROJECTS = [
  "Sponsor A Child",
  "Rashan Drives",
  "Khidmat Masjid-o-Madaris",
  "Rozgar Setup",
  "Medical Aid",
  "Beat The Heat",
  "Plantation Drive",
  "Corporate Social Responsibility",
];

function initSponsorPopup() {
  const sponsorModal = document.getElementById("sponsorModal");
  const sponsorClose = document.getElementById("sponsorClose");
  const sponsorOverlay = sponsorModal
    ? sponsorModal.querySelector(".sponsor-modal-overlay")
    : null;

  const sponsorTriggers = document.querySelectorAll(
    ".nav-sponsor, .sponsor-btn, [data-sponsor], a[href='#sponsor']",
  );

  if (!sponsorModal || !sponsorTriggers.length) return;

  function openSponsorModal(event) {
    if (event) event.preventDefault();

    sponsorModal.classList.add("active");
    sponsorModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const dialog = sponsorModal.querySelector(".sponsor-dialog");
    if (dialog) dialog.scrollTop = 0;
  }

  function closeSponsorModal() {
    sponsorModal.classList.remove("active");
    sponsorModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  sponsorTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", openSponsorModal);
  });

  if (sponsorClose) sponsorClose.addEventListener("click", closeSponsorModal);
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
}

function initSponsorForm() {
  const form = document.getElementById("sponsorJoinForm");
  if (!form) return;

  const statusEl = document.getElementById("sponsorFormStatus");
  const submitBtn = document.getElementById("sponsorSubmitBtn");
  const projectSelect = document.getElementById("partnerProject");

  if (projectSelect) {
    SPONSOR_PROJECTS.forEach(function (name) {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
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

    ["name", "phone", "involvement"].forEach(function (name) {
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
          "success",
        );
      } else {
        // Email mode: the person still has to press Send in their email app,
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
}

/* ==========================================================================
   6. PROJECT PAGES LOCK
   --------------------------------------------------------------------------
   Same lock as the main page. While Core / Seasonal project pages are being
   worked on, their links show an "Under Maintenance" popup instead of opening.

   To open the pages again, change the line below to  false.
   (The main page has its own switch in script.js.)
   ========================================================================== */

const PROJECTS_LOCKED = true;

(function () {
  if (!PROJECTS_LOCKED) return;

  const LOCKED_PATHS = ["projects/coreProjects/", "projects/seasonalProjects/"];

  function isLockedLink(anchor) {
    if (!anchor) return false;
    const href = (anchor.getAttribute("href") || "").replace(/\\/g, "/");
    return LOCKED_PATHS.some(function (path) {
      return href.indexOf(path) !== -1;
    });
  }

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

  // Capture phase: runs before every other click handler
  document.addEventListener(
    "click",
    function (event) {
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
    },
    true,
  );

  // Middle-click (open in new tab) is blocked too
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
