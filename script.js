// Datos de usuarios
const users = [
    {
        id: 1,
        name: 'Laura',
        age: 26,
        city: 'Madrid',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop',
        bio: 'Amante de viajes y buena comida 🌍✈️',
        verified: true
    },
    {
        id: 2,
        name: 'Sofía',
        age: 24,
        city: 'Barcelona',
        photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=600&fit=crop',
        bio: 'Yoga, café y películas',
        verified: true
    },
    {
        id: 3,
        name: 'Mateo',
        age: 28,
        city: 'Valencia',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop',
        bio: 'Deportista y amigo de aventuras',
        verified: true
    },
    {
        id: 4,
        name: 'Valeria',
        age: 25,
        city: 'Madrid',
        photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=600&fit=crop',
        bio: 'Fotógrafa | Cocinera | Viajera',
        verified: false
    },
    {
        id: 5,
        name: 'Carlos',
        age: 29,
        city: 'Sevilla',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop',
        bio: 'Músico y amante de la naturaleza',
        verified: true
    },
    {
        id: 6,
        name: 'Claudia',
        age: 27,
        city: 'Bilbao',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop',
        bio: 'Chef | Poeta | Soñadora',
        verified: true
    }
];

// Estado de la app
let currentUserIndex = 0;
let myProfile = JSON.parse(localStorage.getItem('myProfile')) || {
    name: 'Toni',
    age: 28,
    city: 'Madrid',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&h=600&fit=crop',
    bio: 'Desarrollador | Viajero | Amante del café',
    likes: [],
    matches: []
};

let currentChatUser = null;
let messages = JSON.parse(localStorage.getItem('messages')) || {};

// Inicializar la app
window.addEventListener('load', () => {
    renderCards();
    setupNavigationButtons();
});

// Renderizar tarjetas
function renderCards() {
    const cardsStack = document.getElementById('cardsStack');
    cardsStack.innerHTML = '';

    users.forEach((user, index) => {
        if (index < currentUserIndex) return;

        const card = document.createElement('div');
        card.className = 'card';

        if (index === currentUserIndex) {
            card.classList.add('active');
        } else if (index === currentUserIndex + 1) {
            card.classList.add('next');
        } else if (index === currentUserIndex + 2) {
            card.classList.add('next-next');
        }

        card.innerHTML = `
            <img src="${user.photo}" alt="${user.name}" class="card-image">
            <div class="card-info">
                <div class="card-name">${user.name}, ${user.age}</div>
                <div class="card-details">
                    <span>📍 ${user.city}</span>
                    ${user.verified ? '<span class="card-badge">✓ Verificado</span>' : ''}
                </div>
                <div style="color: #b0b0b0; margin-top: 8px; font-size: 14px;">${user.bio}</div>
            </div>
        `;

        // Eventos de arrastre
        let startX = 0;
        let currentX = 0;

        card.addEventListener('mousedown', (e) => {
            if (index !== currentUserIndex) return;
            startX = e.clientX;
            card.style.cursor = 'grabbing';
        });

        card.addEventListener('mousemove', (e) => {
            if (index !== currentUserIndex || !startX) return;
            currentX = e.clientX - startX;
            card.style.transform = `translateX(${currentX}px) rotate(${currentX / 10}deg)`;
        });

        card.addEventListener('mouseup', () => {
            if (index !== currentUserIndex) return;
            
            if (currentX > 100) {
                likeCard();
            } else if (currentX < -100) {
                rejectCard();
            } else {
                card.style.transform = '';
            }
            startX = 0;
            currentX = 0;
            card.style.cursor = 'grab';
        });

        cardsStack.appendChild(card);
    });

    if (currentUserIndex >= users.length) {
        const emptyState = document.createElement('div');
        emptyState.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: #b0b0b0;
        `;
        emptyState.innerHTML = `
            <span style="font-size: 64px; margin-bottom: 16px;">🎉</span>
            <p>¡Ya has visto todos los perfiles!</p>
            <p style="font-size: 14px; margin-top: 8px;">Vuelve pronto para nuevas conexiones</p>
        `;
        cardsStack.appendChild(emptyState);
    }
}

// Like card
function likeCard() {
    if (currentUserIndex >= users.length) return;

    const card = document.querySelector('.card.active');
    const user = users[currentUserIndex];

    // Guardar like
    myProfile.likes.push(user.id);

    // Probabilidad de match (50%)
    if (Math.random() > 0.5) {
        myProfile.matches.push(user);
        showMatchModal(user);
    }

    localStorage.setItem('myProfile', JSON.stringify(myProfile));

    card.classList.add('swiped-right');
    setTimeout(() => {
        currentUserIndex++;
        renderCards();
    }, 500);
}

// Reject card
function rejectCard() {
    if (currentUserIndex >= users.length) return;

    const card = document.querySelector('.card.active');
    card.classList.add('swiped-left');
    setTimeout(() => {
        currentUserIndex++;
        renderCards();
    }, 500);
}

// Superlike card
function superlikeCard() {
    if (currentUserIndex >= users.length) return;

    const user = users[currentUserIndex];
    myProfile.likes.push(user.id);
    myProfile.matches.push(user);
    localStorage.setItem('myProfile', JSON.stringify(myProfile));

    showMatchModal(user);

    const card = document.querySelector('.card.active');
    card.style.animation = 'pulse 0.5s ease';
    setTimeout(() => {
        currentUserIndex++;
        renderCards();
    }, 500);
}

// Mostrar modal de match
function showMatchModal(user) {
    document.getElementById('matchImg1').src = myProfile.photo;
    document.getElementById('matchImg2').src = user.photo;
    document.getElementById('matchName').textContent = `¡Tú y ${user.name} se gustan mutuamente!`;
    document.getElementById('matchModal').classList.remove('hidden');
}

// Iniciar chat
function startChat() {
    const user = users[currentUserIndex - 1] || users[0];
    currentChatUser = user;
    
    if (!messages[user.id]) {
        messages[user.id] = [];
    }

    openChat(user);
    closeModal();
}

// Abrir chat
function openChat(user) {
    document.getElementById('chatName').textContent = user.name;
    document.getElementById('chatAvatar').src = user.photo;
    
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
    
    (messages[user.id] || []).forEach(msg => {
        const msgEl = document.createElement('div');
        msgEl.className = `chat-message ${msg.type}`;
        msgEl.textContent = msg.text;
        chatMessages.appendChild(msgEl);
    });

    document.getElementById('chatModal').classList.remove('hidden');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Enviar mensaje
function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    
    if (!text || !currentChatUser) return;

    if (!messages[currentChatUser.id]) {
        messages[currentChatUser.id] = [];
    }

    messages[currentChatUser.id].push({ type: 'sent', text });
    localStorage.setItem('messages', JSON.stringify(messages));

    const chatMessages = document.getElementById('chatMessages');
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-message sent';
    msgEl.textContent = text;
    chatMessages.appendChild(msgEl);

    input.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Auto-respuesta
    setTimeout(() => {
        const replies = [
            '¡Me encantó tu perfil! 😊',
            'Hola! Qué tal estás? 🙌',
            '¡Qué conexión! Hablemos más 💬',
            'Me encantaría conocerte 🌟'
        ];
        const reply = replies[Math.floor(Math.random() * replies.length)];
        messages[currentChatUser.id].push({ type: 'received', text: reply });
        localStorage.setItem('messages', JSON.stringify(messages));

        const replyEl = document.createElement('div');
        replyEl.className = 'chat-message received';
        replyEl.textContent = reply;
        chatMessages.appendChild(replyEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

// Manejar tecla Enter en chat
function handleChatKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

// Cerrar chat
function closeChat() {
    document.getElementById('chatModal').classList.add('hidden');
    currentChatUser = null;
}

// Abrir perfil
function openProfile() {
    showView('profileView');
    renderProfile();
}

// Renderizar perfil
function renderProfile() {
    const profileContent = document.getElementById('profileContent');
    profileContent.innerHTML = `
        <div class="profile-card">
            <div class="profile-header">
                <img src="${myProfile.photo}" alt="${myProfile.name}" class="profile-avatar">
                <div class="profile-basic">
                    <div class="profile-name">${myProfile.name}, ${myProfile.age}</div>
                    <div class="profile-location">📍 ${myProfile.city}</div>
                    <div class="profile-stats">
                        <div class="profile-stat">
                            <span class="profile-stat-value">${myProfile.likes.length}</span>
                            <span>Likes</span>
                        </div>
                        <div class="profile-stat">
                            <span class="profile-stat-value">${myProfile.matches.length}</span>
                            <span>Matches</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="profile-bio">${myProfile.bio}</div>
            <button class="btn-primary" style="width: 100%; margin-bottom: 12px;" onclick="editProfile()">Editar Perfil</button>
        </div>
    `;
}

// Editar perfil
function editProfile() {
    document.getElementById('profileName').value = myProfile.name;
    document.getElementById('profileAge').value = myProfile.age;
    document.getElementById('profileCity').value = myProfile.city;
    document.getElementById('profilePhoto').value = myProfile.photo;
    document.getElementById('profileBio').value = myProfile.bio;
    document.getElementById('editProfileModal').classList.remove('hidden');
}

// Guardar perfil
function saveProfile(e) {
    e.preventDefault();
    myProfile.name = document.getElementById('profileName').value;
    myProfile.age = parseInt(document.getElementById('profileAge').value);
    myProfile.city = document.getElementById('profileCity').value;
    myProfile.photo = document.getElementById('profilePhoto').value || myProfile.photo;
    myProfile.bio = document.getElementById('profileBio').value;
    
    localStorage.setItem('myProfile', JSON.stringify(myProfile));
    closeEditProfile();
    renderProfile();
}

// Cerrar editar perfil
function closeEditProfile() {
    document.getElementById('editProfileModal').classList.add('hidden');
}

// Abrir mensajes
function openMessages() {
    showView('messagesView');
    renderMessages();
}

// Renderizar mensajes
function renderMessages() {
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = '';

    myProfile.matches.forEach(user => {
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        messageItem.onclick = () => openChat(user);
        messageItem.innerHTML = `
            <img src="${user.photo}" alt="${user.name}" class="message-avatar">
            <div class="message-content">
                <div class="message-name">${user.name}</div>
                <div class="message-text">${messages[user.id] ? messages[user.id][messages[user.id].length - 1].text : 'Escribe un mensaje...'}</div>
            </div>
            <div class="message-time">Ahora</div>
        `;
        messagesList.appendChild(messageItem);
    });

    if (myProfile.matches.length === 0) {
        messagesList.innerHTML = '<p style="text-align: center; color: #b0b0b0; padding: 40px 20px;">Aún no tienes matches. ¡Sigue conociendo gente!</p>';
    }
}

// Mostrar vista
function showView(viewName) {
    // Ocultar todas las vistas
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    
    // Mostrar la vista seleccionada
    document.getElementById(viewName).classList.add('active');
    
    // Actualizar botones de navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === viewName) {
            btn.classList.add('active');
        }
    });
}

// Volver a tarjetas
function backToCards() {
    showView('cardsView');
}

// Cerrar modal
function closeModal() {
    document.getElementById('matchModal').classList.add('hidden');
}

// Setup navegación
function setupNavigationButtons() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const viewName = btn.dataset.view;
            showView(viewName);
        });
    });
}
