const cards = Array.from(document.querySelectorAll('.profile-card'));
const ageRange = document.getElementById('ageRange');
const distanceRange = document.getElementById('distanceRange');
const ageValue = document.getElementById('ageValue');
const distanceValue = document.getElementById('distanceValue');
const matchBanner = document.getElementById('matchBanner');

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

document.getElementById('likeBtn').addEventListener('click', () => nextCard('right'));
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
