const cards = Array.from(document.querySelectorAll('.profile-card'));
const ageRange = document.getElementById('ageRange');
const distanceRange = document.getElementById('distanceRange');
const ageValue = document.getElementById('ageValue');
const distanceValue = document.getElementById('distanceValue');
const matchBanner = document.getElementById('matchBanner');

const SUPABASE_URL = window.SUPABASE_URL || 'https://TU_PROYECTO.supabase.co';
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'TU_ANON_KEY';

let supabase = null;

if (window.supabase) {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  console.warn('Supabase no está cargado. Cambia los valores de SUPABASE_URL y SUPABASE_ANON_KEY en index.html.');
}

async function cargarPerfiles() {
  if (!supabase) return;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(10);

  if (error) {
    console.error('Error al cargar perfiles:', error);
    return;
  }

  console.log('Perfiles desde Supabase:', data);
}

async function guardarLike(userId, likedUserId) {
  if (!supabase) return;

  const { data, error } = await supabase
    .from('likes')
    .insert([{ user_id: userId, liked_user_id: likedUserId }]);

  if (error) {
    console.error('Error guardando like:', error);
    return;
  }

  console.log('Like guardado:', data);
}

let currentIndex = 0;

function updateAgeDistanceLabels() {
  ageValue.textContent = ageRange.value;
  distanceValue.textContent = `${distanceRange.value} km`;
}

ageRange.addEventListener('input', updateAgeDistanceLabels);
distanceRange.addEventListener('input', updateAgeDistanceLabels);

function updateCards() {
  cards.forEach((card, index) => {
    card.classList.toggle('active', index === currentIndex);
    card.style.display = index >= currentIndex ? 'block' : 'none';
  });
}

function showMatch() {
  matchBanner.style.display = 'flex';
  setTimeout(() => {
    matchBanner.style.display = 'none';
  }, 2200);
}

function nextCard(direction) {
  const activeCard = cards[currentIndex];
  if (!activeCard) return;

  activeCard.classList.add(direction === 'left' ? 'swipe-left' : 'swipe-right');

  setTimeout(() => {
    currentIndex++;
    if (currentIndex >= cards.length) {
      currentIndex = 0;
    }
    updateCards();
    cards.forEach(card => card.classList.remove('swipe-left', 'swipe-right'));
  }, 220);

  if (direction === 'right') {
    showMatch();
  }
}

document.getElementById('likeBtn').addEventListener('click', () => {
  nextCard('right');
  guardarLike(1, 2);
});

document.getElementById('dislikeBtn').addEventListener('click', () => nextCard('left'));
document.getElementById('superlikeBtn').addEventListener('click', () => {
  const activeCard = cards[currentIndex];
  if (!activeCard) return;

  activeCard.style.transform = 'translateY(-18px) scale(1.02)';
  setTimeout(() => {
    activeCard.style.transform = '';
    nextCard('right');
  }, 260);
});

let startX = 0;
let dragging = false;

cards.forEach((card) => {
  card.addEventListener('pointerdown', (e) => {
    dragging = true;
    startX = e.clientX;
    card.setPointerCapture(e.pointerId);
  });

  card.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const deltaX = e.clientX - startX;
    card.style.transform = `translateX(${deltaX}px) rotate(${deltaX / 18}deg)`;
  });

  card.addEventListener('pointerup', (e) => {
    if (!dragging) return;
    dragging = false;
    const deltaX = e.clientX - startX;

    if (deltaX > 120) {
      card.classList.add('swipe-right');
      setTimeout(() => nextCard('right'), 180);
    } else if (deltaX < -120) {
      card.classList.add('swipe-left');
      setTimeout(() => nextCard('left'), 180);
    } else {
      card.style.transform = '';
    }
  });
});

matchBanner.style.display = 'none';
updateAgeDistanceLabels();
updateCards();
cargarPerfiles();
