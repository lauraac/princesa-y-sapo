// Scroll suave para los botones mágicos de navegación
document.querySelectorAll(".btn-outline[data-target]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    const el = document.querySelector(target);
    if (!el) return;
    window.scrollTo({
      top: el.offsetTop - 16,
      behavior: "smooth",
    });
  });
});

// Intro y control de música
const introOverlay = document.getElementById("intro-overlay");
const btnEnter = document.getElementById("btn-enter");
const btnToggleMusic = document.getElementById("btn-toggle-music");
const bgMusic = document.getElementById("bg-music");
let musicOn = false;

if (btnEnter) {
  btnEnter.addEventListener("click", () => {
    if (introOverlay) {
      introOverlay.style.opacity = "0";
      introOverlay.style.pointerEvents = "none";
      setTimeout(() => {
        introOverlay.style.display = "none";
      }, 500);
    }
    // Opcional: empezar la música al entrar
    if (bgMusic && !musicOn) {
      bgMusic
        .play()
        .then(() => {
          musicOn = true;
          if (btnToggleMusic) {
            btnToggleMusic.textContent = "🔇 Pausar música";
          }
        })
        .catch(() => {
          // Si el navegador bloquea autoplay, el usuario puede activarla con el botón
        });
    }
  });
}

if (btnToggleMusic && bgMusic) {
  btnToggleMusic.addEventListener("click", () => {
    if (!musicOn) {
      bgMusic
        .play()
        .then(() => {
          musicOn = true;
          btnToggleMusic.textContent = "🔇 Pausar música";
        })
        .catch(() => {});
    } else {
      bgMusic.pause();
      musicOn = false;
      btnToggleMusic.textContent = "🔈 Activar música";
    }
  });
}

// Enviar formulario de RSVP (ejemplo: armar mensaje para WhatsApp)
const rsvpForm = document.getElementById("rsvp-form");

if (rsvpForm) {
  rsvpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre")?.value.trim() || "";
    const acomp = document.getElementById("acompanantes")?.value || "0";
    const mensaje = document.getElementById("mensaje")?.value.trim() || "";

    // AQUÍ pon el número de WhatsApp de los papás de Camila (con código de país)
    const telefono = "5210000000000"; // EJEMPLO, cámbialo por el real

    const texto =
      `Hola 👑, soy ${nombre}.%0A` +
      `Confirmo mi asistencia al cuento de Camila Yoselyn.%0A` +
      `Acompañantes: ${acom}.%0A` +
      (mensaje ? `Mensaje para la princesa: ${mensaje}` : "");

    const url = `https://wa.me/${telefono}?text=${texto}`;

    window.open(url, "_blank");
  });
}
