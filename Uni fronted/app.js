const pages = ['inicio','perfil','grupos','grupo-detalle','mensajes','notificaciones','eventos','buscar'];
const titles = {
  inicio:'Inicio', perfil:'Perfil', grupos:'Grupos Académicos',
  'grupo-detalle':'Desarrollo Web Moderno',
  mensajes:'Mensajes', notificaciones:'Notificaciones',
  eventos:'Eventos Universitarios', buscar:'Buscar personas'
};
const navMap = {inicio:'inicio',perfil:'perfil',grupos:'grupos','grupo-detalle':'grupos',mensajes:'mensajes',notificaciones:'notificaciones',eventos:'eventos',buscar:'buscar'};

// ── LOCAL STORAGE KEYS ──
const LS_FOLLOWING = 'unisocial_following';   // Set de personas seguidas
const LS_JOINED    = 'unisocial_joined';       // Set de grupos unidos
const LS_MESSAGES  = 'unisocial_messages';     // Mensajes del chat

// ── HELPERS ──
function getSet(key) {
  try { return new Set(JSON.parse(localStorage.getItem(key)) || []); }
  catch { return new Set(); }
}
function saveSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

// ── SEGUIR / DEJAR DE SEGUIR ──
function toggleFollow(btn) {
  const following = getSet(LS_FOLLOWING);
  const name = btn.closest('.person-card')
    ? btn.closest('.person-card').querySelector('.person-name').textContent.trim()
    : btn.dataset.name || btn.previousElementSibling?.querySelector('.sg-name')?.textContent.trim() || '';

  if (following.has(name)) {
    following.delete(name);
    saveSet(LS_FOLLOWING, following);
    setFollowBtn(btn, false);
  } else {
    following.add(name);
    saveSet(LS_FOLLOWING, following);
    setFollowBtn(btn, true);
  }
}

function setFollowBtn(btn, isFollowing) {
  if (isFollowing) {
    btn.textContent = 'Siguiendo';
    btn.style.background = 'var(--gray-bg)';
    btn.style.color = 'var(--gray-dark)';
    btn.style.borderColor = 'var(--border)';
  } else {
    btn.textContent = 'Seguir';
    btn.style.background = 'var(--orange)';
    btn.style.color = 'white';
    btn.style.borderColor = 'var(--orange)';
  }
}

// ── UNIRSE / SALIR DE GRUPO ──
function toggleJoin(btn) {
  const joined = getSet(LS_JOINED);
  // Busca el nombre del grupo en el card más cercano
  const card = btn.closest('.explore-card') || btn.closest('.suggested-group') || btn.closest('.my-group-card');
  const name = card
    ? (card.querySelector('.explore-card-name') || card.querySelector('.sg-name') || card.querySelector('h4'))?.textContent.trim()
    : btn.dataset.group || '';

  if (joined.has(name)) {
    joined.delete(name);
    saveSet(LS_JOINED, joined);
    setJoinBtn(btn, false);
  } else {
    joined.add(name);
    saveSet(LS_JOINED, joined);
    setJoinBtn(btn, true);
  }
}

function setJoinBtn(btn, isJoined) {
  if (isJoined) {
    btn.textContent = 'Unido ✓';
    btn.style.background = 'var(--orange)';
    btn.style.color = 'white';
    btn.style.borderColor = 'var(--orange)';
  } else {
    btn.textContent = 'Unirse';
    btn.style.background = '';
    btn.style.color = 'var(--orange)';
    btn.style.borderColor = 'var(--orange)';
  }
}

// ── MENSAJES ──
function loadMessages() {
  try {
    const saved = JSON.parse(localStorage.getItem(LS_MESSAGES)) || [];
    const container = document.getElementById('chatMessages');
    if (!container || saved.length === 0) return;
    saved.forEach(m => {
      const div = document.createElement('div');
      div.className = 'msg mine';
      div.innerHTML = `<div class="avatar" style="background:#E0834A;width:30px;height:30px;font-size:11px;flex-shrink:0">JD</div><div><div class="msg-bubble">${m.text}</div><div class="msg-time">${m.time}</div></div>`;
      container.appendChild(div);
    });
    container.scrollTop = container.scrollHeight;
  } catch(e) {}
}

function sendMsg() {
  const input = document.getElementById('msgInput');
  const text = input.value.trim();
  if (!text) return;

  const msgs = document.getElementById('chatMessages');
  const now = new Date();
  const t = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');

  // Renderizar
  const div = document.createElement('div');
  div.className = 'msg mine';
  div.innerHTML = `<div class="avatar" style="background:#E0834A;width:30px;height:30px;font-size:11px;flex-shrink:0">JD</div><div><div class="msg-bubble">${text}</div><div class="msg-time">${t}</div></div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;

  // Guardar en localStorage
  try {
    const saved = JSON.parse(localStorage.getItem(LS_MESSAGES)) || [];
    saved.push({ text, time: t });
    localStorage.setItem(LS_MESSAGES, JSON.stringify(saved));
  } catch(e) {}

  input.value = '';
}

// ── FOTO DE PERFIL ──
const LS_AVATAR = 'unisocial_avatar';

function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validar que sea imagen y no muy pesada (max 5MB)
  if (!file.type.startsWith('image/')) {
    showToast('⚠️ Solo se permiten imágenes');
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    showToast('⚠️ La imagen es muy grande (máx 5MB)');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const base64 = e.target.result;
    // Guardar en localStorage
    localStorage.setItem(LS_AVATAR, base64);
    // Aplicar en toda la app
    applyAvatar(base64);
    showToast('✅ Foto de perfil actualizada');
  };
  reader.readAsDataURL(file);
}

function applyAvatar(base64) {
  // Avatar del perfil
  const profileAvatar = document.getElementById('profileAvatar');
  if (profileAvatar) {
    profileAvatar.innerHTML = `<img src="${base64}" alt="Foto de perfil">`;
    profileAvatar.style.background = 'none';
    profileAvatar.style.padding = '0';
  }
  // Avatar del sidebar
  const sidebarAvatar = document.getElementById('sidebarAvatar');
  if (sidebarAvatar) {
    sidebarAvatar.innerHTML = `<img src="${base64}" alt="Foto" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
    sidebarAvatar.style.background = 'none';
    sidebarAvatar.style.overflow = 'hidden';
  }
  // Avatar del composer (feed)
  const composerAvatar = document.getElementById('composerAvatar');
  if (composerAvatar) {
    composerAvatar.innerHTML = `<img src="${base64}" alt="Foto" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
    composerAvatar.style.background = 'none';
    composerAvatar.style.overflow = 'hidden';
  }
}

function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}


function restoreState() {
  // Restaurar foto de perfil guardada
  const savedAvatar = localStorage.getItem(LS_AVATAR);
  if (savedAvatar) applyAvatar(savedAvatar);

  const following = getSet(LS_FOLLOWING);
  const joined    = getSet(LS_JOINED);

  // Restaurar botones "Seguir" en tarjetas de personas
  document.querySelectorAll('.person-card').forEach(card => {
    const name = card.querySelector('.person-name')?.textContent.trim();
    const btn  = card.querySelector('.btn-view');
    if (name && btn && (btn.textContent === 'Seguir' || btn.textContent === 'Siguiendo')) {
      setFollowBtn(btn, following.has(name));
      btn.onclick = () => toggleFollow(btn);
    }
  });

  // Restaurar botones "Seguir" en panel derecho (suggested-person)
  document.querySelectorAll('.suggested-person').forEach(sp => {
    const name = sp.querySelector('.sg-name')?.textContent.trim();
    const btn  = sp.nextElementSibling;
    if (name && btn && btn.classList.contains('btn-follow')) {
      btn.dataset.name = name;
      if (following.has(name)) {
        btn.textContent = 'Siguiendo';
        btn.style.background = 'var(--gray-bg)';
        btn.style.color = 'var(--gray-dark)';
      }
      btn.onclick = () => {
        const f = getSet(LS_FOLLOWING);
        if (f.has(name)) { f.delete(name); btn.textContent='Seguir'; btn.style.background='var(--orange)'; btn.style.color='white'; }
        else             { f.add(name);    btn.textContent='Siguiendo'; btn.style.background='var(--gray-bg)'; btn.style.color='var(--gray-dark)'; }
        saveSet(LS_FOLLOWING, f);
      };
    }
  });

  // Restaurar botones "Unirse" en grupos
  document.querySelectorAll('.btn-join').forEach(btn => {
    const card = btn.closest('.explore-card') || btn.closest('.suggested-group');
    const name = card
      ? (card.querySelector('.explore-card-name') || card.querySelector('.sg-name'))?.textContent.trim()
      : null;
    if (name) {
      setJoinBtn(btn, joined.has(name));
      btn.onclick = () => toggleJoin(btn);
    }
  });

  // Cargar mensajes guardados
  loadMessages();
}

// ── NAVEGACIÓN ──
function showPage(id) {
  pages.forEach(p => {
    const el = document.getElementById('page-'+p);
    if (el) el.classList.toggle('active', p===id);
  });
  document.getElementById('pageTitle').textContent = titles[id] || '';

  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navKey = navMap[id];
  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.textContent.trim().toLowerCase().startsWith(
      navKey==='inicio'?'inicio':navKey==='perfil'?'perfil':navKey==='grupos'?'grupos':
      navKey==='mensajes'?'mensajes':navKey==='notificaciones'?'noti':
      navKey==='eventos'?'eventos':'buscar'
    )) n.classList.add('active');
  });

  document.querySelectorAll('.bn-item').forEach(n => n.classList.remove('active'));
  const bn = document.getElementById('bn-'+(navKey==='grupo-detalle'?'grupos':navKey));
  if (bn) bn.classList.add('active');

  if (window.innerWidth <= 768) closeSidebar();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('open');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}

function switchProfileTab(el, tab) {
  document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  ['pub','grupos','act'].forEach(t => {
    const el2 = document.getElementById('tab-'+t);
    if (el2) el2.style.display = t===tab ? 'block' : 'none';
  });
}

function switchGroupTab(el, tab) {
  document.querySelectorAll('.group-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  ['feed','ejercicios','reuniones','actividad'].forEach(t => {
    const el2 = document.getElementById('gtab-'+t);
    if (el2) el2.classList.toggle('active', t===tab);
  });
}

function openChat(name, sub, color, initials) {
  document.getElementById('chatName').textContent = name;
  document.getElementById('chatSub').textContent = sub;
  document.getElementById('chatAvatar').textContent = initials;
  document.getElementById('chatAvatar').style.background = color;
  if (window.innerWidth <= 768) {
    document.getElementById('convList').classList.add('hidden');
    document.getElementById('backBtn').style.display = 'flex';
  }
  document.querySelectorAll('.conv-item').forEach(c => c.classList.remove('active'));
  event.currentTarget.classList.add('active');
}

function showConvList() {
  document.getElementById('convList').classList.remove('hidden');
  document.getElementById('backBtn').style.display = 'none';
}

// ── FILTER CHIPS ──
document.querySelectorAll('.filter-chips').forEach(group => {
  group.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filterPeople(); // re-filtrar al cambiar categoría
    });
  });
});

// ── BÚSQUEDA DE PERSONAS EN TIEMPO REAL ──
function filterPeople() {
  const searchInput = document.getElementById('people-search-input');
  const activeChip  = document.querySelector('#page-buscar .filter-chips .chip.active');
  const query    = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const category = activeChip  ? activeChip.textContent.trim().toLowerCase() : 'todos';

  const cards = document.querySelectorAll('#page-buscar .person-card');
  let anyVisible = false;

  cards.forEach(card => {
    const name    = card.querySelector('.person-name')?.textContent.toLowerCase() || '';
    const career  = card.querySelector('.person-career')?.textContent.toLowerCase() || '';
    const semester= card.querySelector('.person-sem')?.textContent.toLowerCase()   || '';

    const matchesQuery = !query ||
      name.includes(query) ||
      career.includes(query) ||
      semester.includes(query);

    const matchesCategory = category === 'todos' ||
      career.includes(category === 'ingeniería' ? 'ing' : category);

    if (matchesQuery && matchesCategory) {
      card.style.display = '';
      anyVisible = true;
    } else {
      card.style.display = 'none';
    }
  });

  // Mostrar mensaje si no hay resultados
  let noResults = document.getElementById('no-results-msg');
  if (!noResults) {
    noResults = document.createElement('div');
    noResults.id = 'no-results-msg';
    noResults.style.cssText = 'grid-column:1/-1;text-align:center;padding:32px 0;color:var(--gray);font-size:14px;';
    noResults.innerHTML = '😕 No se encontraron estudiantes con ese nombre o carrera.';
    document.querySelector('#page-buscar .people-grid').appendChild(noResults);
  }
  noResults.style.display = anyVisible ? 'none' : 'block';
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  restoreState();
  initFeed();

  // Conectar búsqueda en tiempo real
  const searchInput = document.getElementById('people-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', filterPeople);
  }
});

// ══════════════════════════════════════════
// ── SISTEMA DE PUBLICACIONES ──
// ══════════════════════════════════════════
const LS_POSTS = 'unisocial_posts';
const EMOJIS   = ['❤️','😂','😮','😢','👏','🔥'];
let pendingImageBase64 = null;

const DEFAULT_POSTS = [
  {
    id: 'p1', isOwn: false,
    author: 'María González', initials: 'MG', avatarColor: '#4A90D9',
    tag: 'Ing. Industrial', tagClass: 'tag-ingenieria',
    handle: '@mariag', time: 'hace 2h',
    text: '¿Alguien más está trabajando en el proyecto de optimización de procesos? Me gustaría formar un grupo de estudio para discutir los algoritmos de programación lineal. 📊',
    image: null, reactions: { '❤️':5, '👏':3 }, myReaction: null, comments: []
  },
  {
    id: 'p2', isOwn: false,
    author: 'Carlos Ruiz', initials: 'CR', avatarColor: '#5CB85C',
    tag: 'Ciencias', tagClass: 'tag-ciencias',
    handle: '@carlosr', time: 'hace 4h',
    text: 'Increíble la feria Empresarial ambiental que se acerca muchachos, ¿quienes asistirán?, los esperamos. 🌿',
    image: null, reactions: { '🔥':12, '❤️':8 }, myReaction: null,
    comments: [{ author: 'Ana Martínez', initials: 'AM', avatarColor: '#D97C4A', text: '¡Yo voy! Me parece súper importante 🌱', time: 'hace 3h' }]
  },
  {
    id: 'p3', isOwn: false,
    author: 'Ana Martínez', initials: 'AM', avatarColor: '#D97C4A',
    tag: 'Diseño', tagClass: 'tag-arte',
    handle: '@anam', time: 'hace 6h',
    text: 'Mi proyecto de tesis sobre diseño sostenible fue seleccionado para la exposición anual. ¡Gracias a todos por el apoyo! 🎨✨',
    image: null, reactions: { '❤️':24, '😮':6, '👏':15 }, myReaction: null, comments: []
  }
];

function getPosts() {
  try {
    const saved = JSON.parse(localStorage.getItem(LS_POSTS));
    return saved && saved.length ? saved : JSON.parse(JSON.stringify(DEFAULT_POSTS));
  } catch { return JSON.parse(JSON.stringify(DEFAULT_POSTS)); }
}
function savePosts(posts) {
  localStorage.setItem(LS_POSTS, JSON.stringify(posts));
}
function initFeed() {
  renderFeed(getPosts());
}
function renderFeed(posts) {
  const container = document.getElementById('feedContainer');
  if (!container) return;
  container.innerHTML = '';
  posts.forEach(post => container.appendChild(buildPostEl(post)));
}

function buildPostEl(post) {
  const div = document.createElement('div');
  div.className = 'post';
  div.id = 'post-' + post.id;
  const isMe = post.isOwn;
  const savedAvatar = localStorage.getItem(LS_AVATAR);
  const avatarHTML = isMe && savedAvatar
    ? `<div class="avatar" style="background:none;overflow:hidden;flex-shrink:0"><img src="${savedAvatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%"></div>`
    : `<div class="avatar" style="background:${post.avatarColor};flex-shrink:0">${post.initials}</div>`;
  const imgHTML = post.image ? `<img src="${post.image}" class="post-image-full" alt="imagen">` : '';
  const reactHTML = buildReactionsHTML(post);
  const commHTML = buildCommentsHTML(post);
  const deleteBtn = isMe ? `<button class="post-delete-btn" onclick="deletePost('${post.id}')" title="Eliminar">🗑 Eliminar</button>` : '';

  div.innerHTML = `
    <div class="post-header">
      ${avatarHTML}
      <div class="post-meta">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
          <span class="name">${post.author}</span>
          <span class="role-tag ${post.tagClass}">${post.tag}</span>
        </div>
        <div class="time">${post.handle} · ${post.time}</div>
      </div>
      ${deleteBtn}
    </div>
    <p class="post-text">${post.text}</p>
    ${imgHTML}
    <div class="reactions-bar" id="reactbar-${post.id}">${reactHTML}</div>
    <div class="post-actions">
      <button class="action-btn" onclick="toggleComments('${post.id}')">
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/></svg>
        <span id="ccount-${post.id}">${post.comments.length > 0 ? post.comments.length + ' ' : ''}</span>Comentar
      </button>
      <div class="reaction-picker-wrap">
        <button class="action-btn" onclick="toggleReactionPicker(event,'${post.id}')">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
          Reaccionar
        </button>
        <div class="reaction-picker" id="picker-${post.id}">
          ${EMOJIS.map(e => `<span class="reaction-emoji" onclick="addReaction('${post.id}','${e}')">${e}</span>`).join('')}
        </div>
      </div>
      <button class="action-btn" onclick="sharePost('${post.id}')">
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
        Compartir
      </button>
    </div>
    <div class="comments-section" id="comments-${post.id}">
      <div id="commentsList-${post.id}">${commHTML}</div>
      <div class="comment-input-row">
        <div class="avatar" style="background:#E0834A;width:32px;height:32px;font-size:11px;flex-shrink:0">JD</div>
        <input class="comment-input" id="cinput-${post.id}" placeholder="Escribe un comentario..."
               onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();submitComment('${post.id}')}">
        <button class="btn-send-comment" onclick="submitComment('${post.id}')">
          <svg viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>`;
  return div;
}

function buildReactionsHTML(post) {
  return Object.entries(post.reactions)
    .filter(([,c]) => c > 0)
    .map(([emoji, count]) =>
      `<button class="reaction-pill ${post.myReaction===emoji?'active':''}" onclick="addReaction('${post.id}','${emoji}')">
        ${emoji} <span class="count">${count}</span>
       </button>`
    ).join('');
}

function buildCommentsHTML(post) {
  return post.comments.map(c => `
    <div class="comment-item">
      <div class="avatar" style="background:${c.avatarColor};width:32px;height:32px;font-size:11px;flex-shrink:0">${c.initials}</div>
      <div class="comment-bubble">
        <div class="c-author">${c.author}</div>
        <div class="c-text">${c.text}</div>
        <div class="c-time">${c.time}</div>
      </div>
    </div>`).join('');
}

// ── PUBLICAR ──
function autoGrow(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}
function previewPostImage(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 8 * 1024 * 1024) { showToast('⚠️ Imagen muy grande (máx 8MB)'); return; }
  const reader = new FileReader();
  reader.onload = (ev) => {
    pendingImageBase64 = ev.target.result;
    document.getElementById('postImagePreview').src = pendingImageBase64;
    document.getElementById('postImagePreviewWrap').style.display = 'flex';
  };
  reader.readAsDataURL(file);
}
function removePostImage() {
  pendingImageBase64 = null;
  document.getElementById('postImagePreviewWrap').style.display = 'none';
  document.getElementById('postImageInput').value = '';
}
function publishPost() {
  const textarea = document.getElementById('postTextarea');
  const text = textarea.value.trim();
  if (!text && !pendingImageBase64) { showToast('✏️ Escribe algo para publicar'); return; }
  const posts = getPosts();
  const now = new Date();
  const newPost = {
    id: 'u_' + Date.now(), isOwn: true,
    author: 'Juan Díaz', initials: 'JD', avatarColor: '#E0834A',
    tag: 'Ing. de Sistemas', tagClass: 'tag-ingenieria',
    handle: '@juandiaz', time: `hoy ${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`,
    text, image: pendingImageBase64, reactions: {}, myReaction: null, comments: []
  };
  posts.unshift(newPost);
  savePosts(posts);
  renderFeed(posts);
  textarea.value = ''; textarea.style.height = 'auto';
  removePostImage();
  showToast('✅ Publicación publicada');
}

// ── ELIMINAR ──
function deletePost(postId) {
  if (!confirm('¿Eliminar esta publicación?')) return;
  const posts = getPosts().filter(p => p.id !== postId);
  savePosts(posts);
  const el = document.getElementById('post-' + postId);
  if (el) { el.style.opacity='0'; el.style.transform='scale(0.95)'; el.style.transition='0.2s'; setTimeout(()=>el.remove(),200); }
  showToast('🗑 Publicación eliminada');
}

// ── REACCIONES ──
function toggleReactionPicker(e, postId) {
  e.stopPropagation();
  const picker = document.getElementById('picker-' + postId);
  document.querySelectorAll('.reaction-picker.open').forEach(p => { if(p!==picker) p.classList.remove('open'); });
  picker.classList.toggle('open');
}
function addReaction(postId, emoji) {
  const picker = document.getElementById('picker-' + postId);
  if (picker) picker.classList.remove('open');
  const posts = getPosts();
  const post = posts.find(p => p.id === postId);
  if (!post) return;
  if (post.myReaction === emoji) {
    post.reactions[emoji] = Math.max(0,(post.reactions[emoji]||1)-1);
    if (!post.reactions[emoji]) delete post.reactions[emoji];
    post.myReaction = null;
  } else {
    if (post.myReaction && post.reactions[post.myReaction]) {
      post.reactions[post.myReaction] = Math.max(0,post.reactions[post.myReaction]-1);
      if (!post.reactions[post.myReaction]) delete post.reactions[post.myReaction];
    }
    post.reactions[emoji] = (post.reactions[emoji]||0)+1;
    post.myReaction = emoji;
  }
  savePosts(posts);
  const reactBar = document.getElementById('reactbar-' + postId);
  if (reactBar) reactBar.innerHTML = buildReactionsHTML(post);
}

// ── COMENTARIOS ──
function toggleComments(postId) {
  const section = document.getElementById('comments-' + postId);
  if (!section) return;
  section.classList.toggle('open');
  if (section.classList.contains('open')) document.getElementById('cinput-' + postId)?.focus();
}
function submitComment(postId) {
  const input = document.getElementById('cinput-' + postId);
  const text = input?.value.trim();
  if (!text) return;
  const posts = getPosts();
  const post = posts.find(p => p.id === postId);
  if (!post) return;
  const now = new Date();
  const comment = {
    author: 'Juan Díaz', initials: 'JD', avatarColor: '#E0834A',
    text, time: `hoy ${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`
  };
  post.comments.push(comment);
  savePosts(posts);
  const list = document.getElementById('commentsList-' + postId);
  if (list) {
    const el = document.createElement('div');
    el.className = 'comment-item';
    el.innerHTML = `
      <div class="avatar" style="background:#E0834A;width:32px;height:32px;font-size:11px;flex-shrink:0">JD</div>
      <div class="comment-bubble">
        <div class="c-author">Juan Díaz</div>
        <div class="c-text">${text}</div>
        <div class="c-time">${comment.time}</div>
      </div>`;
    list.appendChild(el);
  }
  const ccount = document.getElementById('ccount-' + postId);
  if (ccount) ccount.textContent = post.comments.length + ' ';
  input.value = '';
}
function sharePost() { showToast('🔗 Enlace copiado al portapapeles'); }

// Cerrar reaction picker al clic fuera
document.addEventListener('click', e => {
  if (!e.target.closest('.reaction-picker-wrap'))
    document.querySelectorAll('.reaction-picker.open').forEach(p => p.classList.remove('open'));
});
