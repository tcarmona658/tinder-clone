* {
  box-sizing: border-box;
}

:root {
  --bg: #0b1020;
  --panel: rgba(17, 25, 41, 0.9);
  --panels: rgba(24, 35, 60, 0.85);
  --glass: rgba(255, 255, 255, 0.06);
  --line: rgba(255, 255, 255, 0.09);
  --text: #f5f7fb;
  --muted: #97a0b6;
  --pink: #ff4d7d;
  --pink-2: #ff7a91;
  --purple: #8b5cf6;
  --cyan: #4dd7ff;
  --green: #41d392;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(255, 77, 125, 0.18), transparent 30%),
    radial-gradient(circle at bottom right, rgba(77, 215, 255, 0.12), transparent 30%),
    var(--bg);
  color: var(--text);
  font-family: Inter, Arial, sans-serif;
}

button, input {
  font: inherit;
}

.app-shell {
  max-width: 1600px;
  min-height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 260px 1fr 360px;
  background: rgba(9, 13, 23, 0.85);
  backdrop-filter: blur(12px);
}

.sidebar {
  background: rgba(12, 17, 30, 0.9);
  border-right: 1px solid var(--line);
  padding: 18px 16px;
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.right-panel {
  border-left: 1px solid var(--line);
  border-right: none;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 6px 20px;
}

.brand-logo {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--pink), var(--purple));
  font-weight: 800;
  font-size: 22px;
}

.brand-name {
  font-weight: 800;
  letter-spacing: 0.5px;
}

.brand-sub {
  color: var(--muted);
  font-size: 12px;
}

.user-box {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 12px;
}

.user-box img,
.mini-match img,
.small-profile img {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  object-fit: cover;
}

.user-box h3 {
  margin: 0 0 4px;
  font-size: 16px;
}

.user-box p {
  margin: 0;
  color: var(--muted);
  font-size: 12px;
}

.filters-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 16px 14px;
}

.filters-box h4,
.panel-section h4 {
  margin: 0 0 16px;
  font-size: 18px;
}

.filters-box label {
  display: block;
  color: var(--muted);
  margin-bottom: 14px;
}

.range-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}

input[type="range"] {
  width: 100%;
}

.primary-btn {
  background: linear-gradient(135deg, var(--pink), var(--pink-2));
  border: none;
  border-radius: 14px;
  padding: 12px 16px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(255, 77, 125, 0.35);
}

.main-panel {
  padding: 18px 14px 14px;
  display: flex;
  flex-direction: column;
}

.topbar {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 14px;
}

.tab {
  padding: 10px 16px;
  border-radius: 12px;
  color: var(--muted);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
  font-weight: 600;
}

.tab.active {
  background: rgba(255, 77, 125, 0.12);
  border-color: rgba(255, 77, 125, 0.2);
  color: var(--text);
}

.match-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: linear-gradient(135deg, rgba(255, 77, 125, 0.12), rgba(77, 215, 255, 0.08));
  border: 1px solid rgba(255, 77, 125, 0.2);
  border-radius: 16px;
  padding: 12px 14px;
  margin-bottom: 18px;
  display: none;
}

.banner-text {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text);
}

.banner-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--green);
  display: inline-block;
}

.match-banner button {
  border: none;
  border-radius: 12px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  cursor: pointer;
}

.card-stage {
  position: relative;
  width: min(100%, 440px);
  height: 620px;
  margin: 0 auto;
  perspective: 1000px;
}

.profile-card {
  position: absolute;
  inset: 0;
  background: var(--panel);
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 28px 60px rgba(0,0,0,0.38);
  border: 1px solid var(--line);
  transition: transform 0.25s ease, opacity 0.25s ease;
  cursor: grab;
}

.profile-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-card:not(.active) {
  opacity: 0.8;
}

.profile-card:nth-child(2) {
  transform: scale(0.96) translateY(20px);
}

.profile-card:nth-child(3) {
  transform: scale(0.92) translateY(36px);
  opacity: 0.55;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1) 45%, transparent);
}

.card-meta {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  padding: 24px;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.name-row h2 {
  margin: 0;
  font-size: clamp(1.6rem, 2vw, 2rem);
}

.verified {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #1ab7ff;
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 800;
}

.card-meta p {
  margin: 10px 0 0;
  color: #f2f5fb;
  font-weight: 500;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.tags span {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 11px;
}

.controls {
  margin-top: 28px;
  display: flex;
  justify-content: center;
  gap: 26px;
}

.control-btn {
  width: 68px;
  height: 68px;
  border: none;
  border-radius: 50%;
  font-size: 2rem;
  cursor: pointer;
  box-shadow: 0 14px 30px rgba(0,0,0,0.2);
  transition: transform 0.2s ease;
}

.control-btn:hover {
  transform: scale(1.06);
}

.control-btn.reject {
  background: white;
  color: #ff5c5c;
}

.control-btn.super {
  background: #4db6ff;
  color: white;
  width: 58px;
  height: 58px;
}

.control-btn.like {
  background: linear-gradient(135deg, var(--pink), var(--pink-2));
  color: white;
}

.panel-section {
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 14px;
}

.match-mini-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mini-match {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 8px;
  border-radius: 12px;
  background: rgba(255,255,255,0.02);
}

.mini-match.active {
  background: rgba(255, 77, 125, 0.12);
}

.mini-match div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mini-match span {
  color: var(--muted);
  font-size: 12px;
}

.chat-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chat-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.online-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--green);
  display: inline-block;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bubble {
  max-width: 80%;
  padding: 10px 12px;
  border-radius: 14px;
  font-size: 13px;
  line-height: 1.4;
}

.bubble.incoming {
  background: rgba(255,255,255,0.06);
  color: white;
  align-self: flex-start;
}

.bubble.outgoing {
  background: linear-gradient(135deg, var(--pink), var(--pink-2));
  color: white;
  align-self: flex-end;
}

.chat-input-row {
  display: flex;
  gap: 8px;
}

.chat-input-row input {
  flex: 1;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--line);
  border-radius: 12px;
  color: white;
  padding: 10px 12px;
}

.chat-input-row button {
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--pink), var(--pink-2));
  color: white;
  padding: 10px 14px;
  font-weight: 700;
}

.small-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.small-profile div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.small-profile span {
  color: var(--muted);
  font-size: 12px;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%) translateY(120px);
  background: linear-gradient(135deg, var(--pink), var(--purple));
  color: white;
  font-weight: 700;
  border-radius: 999px;
  padding: 12px 20px;
  box-shadow: 0 20px 40px rgba(255, 77, 125, 0.3);
  transition: transform 0.25s ease;
  z-index: 50;
}

.toast.show {
  transform: translateX(-50%) translateY(0);
}

/* Swipe animations */
.profile-card.swipe-left {
  transform: translateX(-180px) rotate(-18deg);
  opacity: 0;
}

.profile-card.swipe-right {
  transform: translateX(180px) rotate(18deg);
  opacity: 0;
}

@media (max-width: 1100px) {
  .app-shell {
    grid-template-columns: 220px 1fr;
  }

  .right-panel {
    display: none;
  }
}

@media (max-width: 700px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .left-panel {
    display: none;
  }

  .main-panel {
    padding-top: 12px;
  }

  .card-stage {
    height: 540px;
  }

  .controls {
    gap: 18px;
  }
}
