// Números de WhatsApp de los asesores de venta (Guatemala, código 502)
const WHATSAPP_PRIMARY = "50254946629"; // 5494-6629
const WHATSAPP_SECONDARY = "50248360597"; // 4836-0597
const WHATSAPP_MESSAGE = "Hola, quisiera más información sobre Lotificación San Pablo.";

function waLink(number) {
  return `https://wa.me/${number}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

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
