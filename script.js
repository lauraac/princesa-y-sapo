// ===============================
// CONFIGURACIÓN BÁSICA
// ===============================

// Cambia esta fecha por la del evento real
// Formato: "YYYY-MM-DDTHH:MM:SS"
const EVENT_DATE_STRING = "2025-10-12T19:00:00";

// ===============================
// MANEJO DEL OVERLAY DE INTRO
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const introOverlay = document.getElementById("introOverlay");
  const enterBtn = document.getElementById("enterInvitationBtn");
  const bgMusic = document.getElementById("bgMusic");
  const toggleMusicBtn = document.getElementById("toggleMusicBtn");

  if (enterBtn && introOverlay) {
    enterBtn.addEventListener("click", () => {
      introOverlay.classList.add("intro-overlay--hidden");
      // Aquí podrías iniciar el video de intro o la música si quieres
      // pero por políticas de navegador, lo ideal es que la música
      // se controle con el botón de "Reproducir música".
    });
  }

  // ===============================
  // MÚSICA DE FONDO
  // ===============================

  if (toggleMusicBtn && bgMusic) {
    let isPlaying = false;

    toggleMusicBtn.addEventListener("click", async () => {
      try {
        if (!isPlaying) {
          await bgMusic.play();
          isPlaying = true;
          toggleMusicBtn.textContent = "⏸ Pausar música";
        } else {
          bgMusic.pause();
          isPlaying = false;
          toggleMusicBtn.textContent = "🎵 Reproducir música";
        }
      } catch (error) {
        console.error("Error al reproducir la música:", error);
      }
    });
  }

  // ===============================
  // CONTADOR REGRESIVO
  // ===============================

  initCountdown();

  // ===============================
  // FORMULARIO DE RSVP
  // ===============================

  const rsvpForm = document.getElementById("rsvpForm");
  const rsvpSuccessMsg = document.getElementById("rsvpSuccessMsg");

  if (rsvpForm && rsvpSuccessMsg) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(rsvpForm);
      const name = formData.get("guestName") || "Invitado";
      const attendance = formData.get("attendance");

      let message = "";

      if (attendance === "si") {
        message = `¡Gracias, ${name}! ✨ Tu lugar en el reino ha sido reservado.`;
      } else if (attendance === "no") {
        message = `Gracias por avisarnos, ${name}. 💌 Camila recibirá tu mensaje con cariño.`;
      } else {
        message = `Tu respuesta ha sido registrada. ¡Gracias por contestar!`;
      }

      rsvpSuccessMsg.textContent = message;
      rsvpSuccessMsg.style.display = "block";

      // Aquí después puedes:
      // - Enviar la info a Google Sheets
      // - Consumir un endpoint
      // - Mandar un correo, etc.
      // De momento solo mostramos el mensaje.
    });
  }
});

// ===============================
// FUNCIÓN DE CONTADOR
// ===============================

function initCountdown() {
  const eventDate = new Date(EVENT_DATE_STRING);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateCountdown() {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ===============================
// ESTRELLAS ALEATORIAS MAGICAS
// ===============================

function createMagicStar() {
  const star = document.createElement("div");
  star.classList.add("magic-star");

  const container = document.querySelector(".magic-stars");

  star.style.left = Math.random() * 100 + "vw";
  star.style.top = Math.random() * 100 + "vh";

  container.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 1800);
}

setInterval(createMagicStar, 600);
