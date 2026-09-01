// Números de WhatsApp de los asesores de venta (Guatemala, código 502)
const WHATSAPP_PRIMARY = "50254946629"; // 5494-6629
const WHATSAPP_SECONDARY = "50248360597"; // 4836-0597
const WHATSAPP_MESSAGE = "Hola, quisiera más información sobre Lotificación San Pablo.";

const WHATSAPP_CONTACTS = [
  { label: "Asesor · 5494-6629", number: WHATSAPP_PRIMARY },
  { label: "Asesor · 4836-0597", number: WHATSAPP_SECONDARY },
];

function waLink(number) {
  return `https://wa.me/${number}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

// Fallback href (used if JS fails, and for the two explicit advisor buttons)
document.querySelectorAll('[id^="wa-"]').forEach((el) => {
  if (el.id === "wa-contact-1") {
    el.href = waLink(WHATSAPP_PRIMARY);
  } else if (el.id === "wa-contact-2") {
    el.href = waLink(WHATSAPP_SECONDARY);
  } else {
    el.href = waLink(WHATSAPP_PRIMARY);
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Mobile nav ----------
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ---------- WhatsApp advisor picker ----------
const popover = document.createElement("div");
popover.className = "wa-popover";
popover.innerHTML =
  '<p class="wa-popover-title">¿Con quién quieres hablar?</p>' +
  WHATSAPP_CONTACTS.map(
    (c) => `<a href="${waLink(c.number)}" target="_blank" rel="noopener">${c.label}</a>`
  ).join("");
document.body.appendChild(popover);

function closePopover() {
  popover.classList.remove("open");
}

function openPopoverNear(trigger) {
  const rect = trigger.getBoundingClientRect();
  popover.classList.add("open");
  const popRect = popover.getBoundingClientRect();

  const spaceBelow = window.innerHeight - rect.bottom;
  const top =
    spaceBelow > popRect.height + 12
      ? rect.bottom + 8
      : Math.max(12, rect.top - popRect.height - 8);

  const maxLeft = window.innerWidth - popRect.width - 12;
  const left = Math.min(Math.max(12, rect.left), Math.max(12, maxLeft));

  popover.style.top = `${top}px`;
  popover.style.left = `${left}px`;
}

document.querySelectorAll(".wa-trigger").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const alreadyOpenForThis =
      popover.classList.contains("open") && popover.dataset.owner === el.id;
    closePopover();
    if (!alreadyOpenForThis) {
      popover.dataset.owner = el.id;
      openPopoverNear(el);
    }
  });
});

document.addEventListener("click", (e) => {
  if (!popover.contains(e.target) && !e.target.closest(".wa-trigger")) {
    closePopover();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePopover();
});
window.addEventListener("scroll", closePopover, { passive: true });
window.addEventListener("resize", closePopover);

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in-view"));
}
