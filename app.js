/* ==========================================================================
   TyanGO Home - Application Logic Engine (EVOLUTION 2.0)
   Handles interactive state, Role switcher, Proactive AI, Timeline, & Legacy
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderSmartCalendar();
  initChatEngine();
  initEventListeners();
  startProactiveAIScheduler();
});

// View Titles Mapping
const viewTitles = {
  'home': { title: 'La Historia de tu Familia', subtitle: 'Tecnología para cuidar lo que más importa' },
  'timeline': { title: 'Línea del Tiempo Histórica', subtitle: 'Cronología de vida, momentos y aprendizajes' },
  'legacy': { title: 'Baúl del Legado', subtitle: 'Cápsulas del tiempo y sabiduría para las futuras generaciones' },
  'calendar': { title: 'Smart Calendar', subtitle: 'Detección de sobrecarga y tiempos de calidad sugeridos' },
  'chat': { title: 'Family GPT (Memoria Viva)', subtitle: 'Asistente con memoria biográfica de los Mendoza' },
  'family': { title: 'Family Brain 2.0', subtitle: 'Grafo afirmativo de lenguajes del amor, costumbres y sueños' },
  'memories': { title: 'Álbum & Recuerdos', subtitle: 'Fotos y Libro Familiar Anual 2026' },
  'goals': { title: 'Metas & Logros', subtitle: 'Misiones familiares gamificadas y medallas' },
  'home-mgr': { title: 'Home Manager', subtitle: 'Garantías, inventario y presupuesto tranquilo' },
  'radar': { title: 'Radar Emocional', subtitle: 'Check-in de bienestar y tendencias del hogar' },
  'conflict': { title: 'Mediador de Paz', subtitle: 'Espacio de mediación privada con empatía' },
  'settings': { title: 'Configuración & Privacidad', subtitle: 'Control Zero-Knowledge y plan Home Harmony' }
};

function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = item.getAttribute('data-view');
      switchView(targetView);
    });
  });
}

function switchView(viewId) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const activeNav = document.querySelector(`.nav-item[data-view="${viewId}"]`);
  if (activeNav) activeNav.classList.add('active');

  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  const targetSec = document.getElementById(`view-${viewId}`);
  if (targetSec) targetSec.classList.add('active');

  if (viewTitles[viewId]) {
    document.getElementById('current-view-title').textContent = viewTitles[viewId].title;
    document.getElementById('current-view-subtitle').textContent = viewTitles[viewId].subtitle;
  }
}

// Role Switcher Handler (Padres, Niños, Abuelos)
function switchRole(roleName, btnElement) {
  document.querySelectorAll('.role-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  document.body.className = ''; // Reset
  if (roleName === 'kids') {
    document.body.classList.add('role-kids');
    showToast('👧 Modo Niños Activado: Misiones divertidas e interfaz simplificada');
  } else if (roleName === 'grandparents') {
    document.body.classList.add('role-grandparents');
    showToast('👵 Modo Abuelos Activado: Fuentes más grandes y acceso directo al Legado de voz');
  } else {
    showToast('👨‍👩‍👧‍👦 Modo Padres Activado: Control completo de la vida familiar');
  }
}

// Smart Calendar
function renderSmartCalendar() {
  const container = document.getElementById('calendar-days-container');
  if (!container) return;
  container.innerHTML = '';

  const totalDays = 31;
  const events = {
    3: [{ title: 'Cumple del Abuelo 🎂', type: 'family' }],
    8: [{ title: 'Examen Guitarra Sofía 🎸', type: 'work' }],
    12: [{ title: 'Picnic en el Parque 🧺', type: 'ai-suggested' }],
    15: [{ title: 'Cena de Tacos 🌮', type: 'family' }],
    29: [{ title: 'HOY: Noche sin Pantallas 🌙', type: 'family' }]
  };

  for (let d = 1; d <= totalDays; d++) {
    const dayCell = document.createElement('div');
    dayCell.className = `calendar-day-cell ${d === 29 ? 'today' : ''}`;
    let html = `<span class="day-number">${d}</span>`;
    if (events[d]) {
      events[d].forEach(ev => {
        html += `<div class="event-pill event-${ev.type}">${ev.title}</div>`;
      });
    }
    dayCell.innerHTML = html;
    container.appendChild(dayCell);
  }
}

// Family GPT Engine
function initChatEngine() {
  const btnSend = document.getElementById('btn-send-chat');
  const input = document.getElementById('chat-input');

  if (btnSend && input) {
    btnSend.addEventListener('click', () => sendChatMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });
  }
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const container = document.getElementById('chat-messages-container');
  const text = input.value.trim();
  if (!text) return;

  const userMsg = document.createElement('div');
  userMsg.className = 'message-bubble message-user';
  userMsg.innerHTML = `<strong>Tú:</strong> ${escapeHtml(text)}`;
  container.appendChild(userMsg);

  input.value = '';
  container.scrollTop = container.scrollHeight;

  setTimeout(() => {
    const aiMsg = document.createElement('div');
    aiMsg.className = 'message-bubble message-ai';
    let aiText = getSimulatedAIResponse(text);
    aiMsg.innerHTML = `<strong>Family GPT:</strong> ${aiText}`;
    container.appendChild(aiMsg);
    container.scrollTop = container.scrollHeight;
  }, 1000);
}

function getSimulatedAIResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('regalo') || q.includes('abuelo') || q.includes('cumpleaños')) {
    return 'Según la memoria familiar, al **Abuelo Antonio** le encanta el tango antiguo y los chocolates amargos. Además, el Family Brain recuerda que su lenguaje del amor son las palabras de afecto. ¿Te gustaría generar una carta especial con Celebrations AI?';
  } else if (q.includes('playa') || q.includes('vacaciones') || q.includes('viaje')) {
    return 'En **Enero de 2026** fuisteis a la playa. Mateo aprendió a nadar y Sofía tomó fotografías del atardecer. Tienen activa la meta para Bariloche en Diciembre al 60% de avance.';
  } else {
    return `Recuerdo cada capítulo de los Mendoza desde 2017. He indexado "${escapeHtml(query)}" en el Grafo de Memoria Viva para sugerir actividades familiares.`;
  }
}

// Proactive AI Engine Simulator
function startProactiveAIScheduler() {
  setTimeout(() => {
    showProactiveToast("🤖 IA Proactiva: Hace 20 días que no cenas solo con Elena. ¿Quieres que busque un restaurante italiano sugerido por Family Brain?");
  }, 8000);
}

function triggerProactiveAIAction() {
  showToast("✨ Sugerencia aceptada: Evento agendado en el Smart Calendar y recordatorio enviado a Elena.");
}

function showProactiveToast(text) {
  let toastEl = document.createElement('div');
  toastEl.className = 'proactive-ai-toast';
  toastEl.innerHTML = `
    <div style="font-size:24px; color:var(--primary-terracotta);"><i class="fa-solid fa-sparkles"></i></div>
    <div style="flex:1; font-size:12.5px; color:var(--deep-navy);">${text}</div>
    <button class="btn-primary" style="padding:6px 12px; font-size:11px;" onclick="this.parentElement.remove(); triggerProactiveAIAction();">Aceptar</button>
  `;
  document.body.appendChild(toastEl);
  setTimeout(() => { if (toastEl) toastEl.remove(); }, 10000);
}

// UI Event Listeners
function initEventListeners() {
  const btnCelebration = document.getElementById('btn-quick-celebration');
  if (btnCelebration) {
    btnCelebration.addEventListener('click', () => toggleModal('celebrations-modal', true));
  }

  const btnGptPrompt = document.getElementById('btn-family-gpt-prompt');
  if (btnGptPrompt) {
    btnGptPrompt.addEventListener('click', () => {
      switchView('chat');
      document.getElementById('chat-input').focus();
    });
  }

  const btnBook = document.getElementById('btn-generate-book');
  if (btnBook) {
    btnBook.addEventListener('click', () => {
      showToast('📖 "Libro Familiar 2026" generado con fotos y audios en alta resolución.');
    });
  }
}

function registerMood(moodText, emoji) {
  showToast(`Estado emocional guardado: ${emoji} ${moodText}. ¡Gracias por cuidar el clima de casa!`);
}

function toggleModal(modalId, show) {
  const modal = document.getElementById(modalId);
  if (modal) {
    if (show) modal.classList.add('active');
    else modal.classList.remove('active');
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
  });
}
