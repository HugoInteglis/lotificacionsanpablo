// EDITAR: número de WhatsApp en formato internacional sin "+" ni espacios (ej. "50212345678")
const WHATSAPP_NUMBER = "50200000000";
const WHATSAPP_MESSAGE = "Hola, quisiera más información sobre Lotificación San Pablo.";

const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

document.querySelectorAll('[id^="wa-"]').forEach((el) => {
  el.href = waLink;
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
