// ==========================================
//  Birthday Website
// ==========================================

// ==========================================
//  THE SAFE  -  the ONLY place a name is stored.
//  Edit the value below (e.g. "Sara") and the name
//  appears everywhere on the page automatically.
//  Leave it as "" (none) and the name is simply left out.
// ==========================================
const SAFE = Object.freeze({
    name: "Toty"
});

// Helpers that read from the safe
const NAME = SAFE.name.trim();
const nameOr = (withName, withoutName = "") => (NAME ? withName : withoutName);

function applyName() {
    // Every <span data-name data-before=".." data-after=".."> is filled from the safe
    document.querySelectorAll("[data-name]").forEach(el => {
        el.textContent = NAME
            ? (el.dataset.before || "") + NAME + (el.dataset.after || "")
            : "";
    });
    // Mirrored title text (CSS reflection under the hero heading)
    const heroTitle = document.getElementById("heroTitle");
    if (heroTitle) heroTitle.setAttribute("data-text", nameOr(`Happy Birthday ${NAME}`, "Happy Birthday"));
    const sender = document.getElementById("wishSender");
    if (sender) sender.value = NAME || "Someone";
    document.title = pageTitle();
}
function pageTitle() { return nameOr(`Happy Birthday ${NAME} 🎂`, "Happy Birthday 🎂"); }
applyName();

// --- Config ---
const music = document.getElementById("bgMusic");
const muteBtn = document.getElementById('muteBtn');
const mainMessage = "You make every day brighter just by being you. ✨💖";
const items = ["✨", "💖", "🌸", "⭐", "🎂", "🎉", "🦋", "💫", "❤️", "💕", "💗", "💓", "💝", "💞","16", "🤍", "♥️"];
const heartItems = ["💖", "❤️", "💕", "💗", "💓", "💝", "💞", "🤍", "♥️", "💘"];

// --- Stars Background ---
// --- 92. Loading Bar Logic ---
function initLoadingBar() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    
    // Initial HTML with the rotation warning and countdown placeholder
    overlay.innerHTML = `
        <h2 style="font-family: 'Great Vibes'; font-size: 2.5rem; margin-bottom: 10px;">${nameOr(`${NAME}'s 16th Year...`, "The 16th Year...")}</h2>
        <div id="loadingTimer" style="font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 15px; opacity: 0.8;">
            Preparing the magic in 5...
        </div>
        <div class="progress-container"><div class="progress-bar" id="loadingBar"></div></div>
    `;
    document.body.appendChild(overlay);

    const bar = document.getElementById('loadingBar');
    const timerText = document.getElementById('loadingTimer');
    let timeLeft = 5;

    // 1. The Countdown Timer
    const countdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            timerText.textContent = `Preparing the magic in ${timeLeft}...`;
        } else {
            timerText.textContent = "Ready! ✨";
            clearInterval(countdownInterval);
        }
    }, 1000);

    // 2. The Smooth Loading Bar (set to 5 seconds)
    bar.style.transition = "width 5s linear";
    setTimeout(() => {
        bar.style.width = "100%";
    }, 100);

    // 3. Remove Overlay after 5.5 seconds
    setTimeout(() => {
        overlay.style.opacity = '0';
        overlay.style.transition = "opacity 0.8s ease";
        setTimeout(() => overlay.remove(), 800);
    }, 5500);
}
// Start loading immediately
initLoadingBar();
(function initStars() {
    const canvas = document.getElementById("starsCanvas");
    const ctx = canvas.getContext("2d");
    let stars = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < 150; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.5 + 0.3,
                alpha: Math.random(),
                speed: Math.random() * 0.005 + 0.002
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.alpha += s.speed;
            const a = Math.abs(Math.sin(s.alpha));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${a * 0.7 + 0.1})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }

    resize();
    createStars();
    draw();
    window.addEventListener("resize", () => { resize(); createStars(); });
})();

// --- Confetti System ---
const confettiCanvas = document.getElementById("confettiCanvas");
const confettiCtx = confettiCanvas.getContext("2d");
let confettiPieces = [];
let confettiRunning = false;

function resizeConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeConfetti();
window.addEventListener("resize", resizeConfetti);

function spawnConfetti(count) {
    const colors = ["#ff4d94", "#a855f7", "#fbbf24", "#34d399", "#60a5fa", "#f472b6", "#fff"];
    for (let i = 0; i < count; i++) {
        confettiPieces.push({
            x: Math.random() * confettiCanvas.width,
            y: -10 - Math.random() * confettiCanvas.height * 0.5,
            w: Math.random() * 8 + 4,
            h: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 3 + 2,
            rot: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10,
            gravity: 0.04 + Math.random() * 0.02,
            opacity: 1
        });
    }

    if (!confettiRunning) {
        confettiRunning = true;
        animateConfetti();
    }
}

function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiPieces.forEach(p => {
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.rot += p.rotSpeed;

        if (p.y > confettiCanvas.height + 20) {
            p.opacity -= 0.02;
        }

        confettiCtx.save();
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate((p.rot * Math.PI) / 180);
        confettiCtx.globalAlpha = Math.max(0, p.opacity);
        confettiCtx.fillStyle = p.color;
        confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        confettiCtx.restore();
    });

    confettiPieces = confettiPieces.filter(p => p.opacity > 0);

    if (confettiPieces.length > 0) {
        requestAnimationFrame(animateConfetti);
    } else {
        confettiRunning = false;
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
}

// --- Envelope / Landing ---
const landing = document.getElementById("landing");
const envelope = document.getElementById("envelope");
const mainContent = document.getElementById("mainContent");

landing.addEventListener("click", () => {
    const music = document.getElementById("bgMusic");
    if (music) {
        music.play().catch(error => console.log("Music play blocked:", error));
    }	
    envelope.classList.add("open");

    // Play envelope open sound
    playSound('envelope');

    setTimeout(() => {
        // Launch supernova effect before revealing content
        launchSupernova(() => {});

        // Heart pop sound as hearts fly
        setTimeout(() => playSound('heartpop'), 400);

        landing.classList.add("fade-out");
        mainContent.classList.remove("hidden");

        // Start typewriter on hero
        typeWriter(mainMessage, "typewriter", 60);

        // Spawn a burst of floating particles
        for (let i = 0; i < 70; i++) {
            setTimeout(spawnParticle, i * 60);
        }

        // Burst of hearts on open
        heartBurst(70);

        // Continuous particles
        setInterval(spawnParticle, 500);

        // Continuous hearts
        setInterval(spawnHeart, 700);
    }, 900);

});

// --- Typewriter Effect ---
function typeWriter(text, elementId, speed) {
    let i = 0;
    const elem = document.getElementById(elementId);
    if (!elem) return;
    function type() {
        if (i < text.length) {
            elem.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// --- Floating Particles ---
function spawnParticle() {
    const p = document.createElement("div");
    p.className = "particle";
    p.textContent = items[Math.floor(Math.random() * items.length)];
    p.style.left = Math.random() * 100 + "vw";
    p.style.bottom = "-20px";
    p.style.fontSize = (Math.random() * 18 + 14) + "px";
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 5000);
}

// --- Cursor Sparkle ---
let lastSparkle = 0;
document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastSparkle < 80) return;
    lastSparkle = now;

    const sparkle = document.createElement("div");
    sparkle.className = "cursor-sparkle";
    sparkle.textContent = "✨";
    sparkle.style.left = e.clientX + "px";
    sparkle.style.top = e.clientY + "px";
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
});

// --- Scroll Reveal for Wish Cards ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute("data-delay") || 0;
            setTimeout(() => {
                entry.target.classList.add("visible");
                playSound('heartpop');
            }, parseInt(delay));
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".wish-card").forEach(card => {
    observer.observe(card);
});

// --- Heart Rain ---
function spawnHeart() {
    const p = document.createElement("div");
    p.className = "particle heart-particle";
    p.textContent = heartItems[Math.floor(Math.random() * heartItems.length)];
    p.style.left = Math.random() * 100 + "vw";
    p.style.bottom = "-20px";
    p.style.fontSize = (Math.random() * 22 + 16) + "px";
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 5000);
}

function heartBurst(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(spawnHeart, i * 40);
    }
}

// --- Supernova Effect ---
function createSupernovaCanvas() {
    const c = document.createElement("canvas");
    c.id = "supernovaCanvas";
    c.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:999;pointer-events:none;";
    document.body.appendChild(c);
    return c;
}

function launchSupernova(callback) {
    const canvas = createSupernovaCanvas();
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const particles = [];
    const rings = [];
    let flashAlpha = 1.0;
    let frame = 0;
    const totalFrames = 120;

    for (let i = 0; i < 200; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2;
        const hue = Math.random() * 60 + 300; 
        particles.push({
            x: cx, y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            r: Math.random() * 3 + 1,
            color: `hsl(${hue}, 100%, ${60 + Math.random() * 30}%)`,
            life: 1.0,
            decay: 0.005 + Math.random() * 0.01
        });
    }

    for (let i = 0; i < 60; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;
        particles.push({
            x: cx, y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            r: 0,
            isHeart: true,
            emoji: heartItems[Math.floor(Math.random() * heartItems.length)],
            size: Math.random() * 20 + 12,
            life: 1.0,
            decay: 0.006 + Math.random() * 0.008
        });
    }

    for (let i = 0; i < 4; i++) {
        rings.push({
            r: 0,
            maxR: Math.min(canvas.width, canvas.height) * (0.4 + i * 0.2),
            speed: 6 + i * 2,
            width: 3 - i * 0.5,
            alpha: 0.8 - i * 0.15,
            hue: 320 + i * 20,
            delay: i * 8
        });
    }

    playSound('supernova');

    function animate() {
        frame++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (flashAlpha > 0) {
            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 300 * (1 - flashAlpha + 0.3));
            grad.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha})`);
            grad.addColorStop(0.3, `rgba(255, 150, 220, ${flashAlpha * 0.7})`);
            grad.addColorStop(0.6, `rgba(168, 85, 247, ${flashAlpha * 0.4})`);
            grad.addColorStop(1, `rgba(168, 85, 247, 0)`);
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            flashAlpha -= 0.02;
        }

        rings.forEach(ring => {
            if (frame < ring.delay) return;
            ring.r += ring.speed;
            const alpha = ring.alpha * (1 - ring.r / ring.maxR);
            if (alpha <= 0) return;
            ctx.beginPath();
            ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
            ctx.strokeStyle = `hsla(${ring.hue}, 100%, 70%, ${alpha})`;
            ctx.lineWidth = ring.width;
            ctx.stroke();
        });

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.99;
            p.vy *= 0.99;
            p.life -= p.decay;

            if (p.life <= 0) return;

            if (p.isHeart) {
                ctx.globalAlpha = p.life;
                ctx.font = p.size + "px serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(p.emoji, p.x, p.y);
                ctx.globalAlpha = 1;
            } else {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        });

        if (frame < totalFrames) {
            requestAnimationFrame(animate);
        } else {
            canvas.remove();
            if (callback) callback();
        }
    }
    animate();
}

// --- Sound Effects ---
let audioCtx = null;
function getAudioCtx() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
}

function playSound(type) {
    try {
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();

        switch (type) {
            case 'envelope': {
                const dur = 0.6;
                const osc1 = ctx.createOscillator();
                const gain1 = ctx.createGain();
                osc1.type = 'sine';
                osc1.frequency.setValueAtTime(800, ctx.currentTime);
                osc1.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + dur);
                gain1.gain.setValueAtTime(0.15, ctx.currentTime);
                gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
                osc1.connect(gain1).connect(ctx.destination);
                osc1.start(ctx.currentTime);
                osc1.stop(ctx.currentTime + dur);
                break;
            }
            case 'supernova': {
                const dur = 1.5;
                const boom = ctx.createOscillator();
                const boomG = ctx.createGain();
                boom.type = 'sine';
                boom.frequency.setValueAtTime(60, ctx.currentTime);
                boom.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.8);
                boomG.gain.setValueAtTime(0.3, ctx.currentTime);
                boomG.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
                boom.connect(boomG).connect(ctx.destination);
                boom.start(ctx.currentTime);
                boom.stop(ctx.currentTime + 0.8);
                break;
            }
            case 'celebrate': {
                const notes = [523, 659, 784, 1047];
                notes.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const g = ctx.createGain();
                    osc.type = 'square';
                    osc.frequency.value = freq;
                    g.gain.setValueAtTime(0.07, ctx.currentTime + i * 0.12);
                    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.25);
                    osc.connect(g).connect(ctx.destination);
                    osc.start(ctx.currentTime + i * 0.12);
                    osc.stop(ctx.currentTime + i * 0.12 + 0.25);
                });
                break;
            }
            case 'heartpop': {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1200, ctx.currentTime);
                g.gain.setValueAtTime(0.06, ctx.currentTime);
                g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
                osc.connect(g).connect(ctx.destination);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.15);
                break;
            }
        }
    } catch (e) {}
}

// --- Final Wish Logic ---
function handleFinalWish() {
    const input = document.getElementById("userWish");
    const btn = document.getElementById("celebrateBtn");
    const wishText = input.value.trim();

    if (wishText !== "") {
        // 1. Send the wish
        const hiddenInput = document.getElementById("hiddenWishInput");
        const form = document.getElementById("wishForm");
        if (hiddenInput && form) {
            hiddenInput.value = wishText;
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            }).catch(() => {}); // offline? the celebration still plays
        }

        // 2. Floating echo of the wish
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const echo = document.createElement('div');
                echo.className = 'wish-echo';
                echo.textContent = wishText;
                document.body.appendChild(echo);
                setTimeout(() => echo.remove(), 2500);
            }, i * 400);
        }

        // 3. Finale (button locks so the wish can't be sent twice)
        btn.disabled = true;
        setTimeout(() => {
            launchFinale();
            btn.textContent = "I hope it comes true! ✨❤️";
        }, 1500);
    } else {
        // Nothing typed: just the fireworks
        launchFinale();
    }

    input.value = "";
    triggerSkyMagic();
    triggerEmojiRain();
}

function launchFinale() {
    playSound('celebrate');
    spawnConfetti(150);
    launchBloom();
    heartBurst(30);
}

function launchBloom() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const flower = document.createElement("div");
            flower.className = "bloom";
            flower.textContent = ["🌸", "🌺", "🌹", "🌷", "🌻"][Math.floor(Math.random() * 5)];
            flower.style.left = Math.random() * 100 + "vw";
            flower.style.top = Math.random() * 100 + "vh";
            document.body.appendChild(flower);
            setTimeout(() => flower.remove(), 3000);
        }, i * 100);
    }
}

// --- Interaction & Parallax ---
document.addEventListener("mousemove", (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    const heroInner = document.querySelector('.hero-inner');
    if (heroInner) {
        heroInner.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${-moveY * 2}deg) rotateY(${moveX * 2}deg)`;
    }
    const stars = document.getElementById("starsCanvas");
    if(stars) stars.style.transform = `scale(1.1) translate(${-moveX * 2}px, ${-moveY * 2}px)`;
});

let rainInterval;
document.addEventListener("mousedown", (e) => {
    const bloom = document.createElement("div");
    bloom.className = "bloom";
    bloom.textContent = ["🌸", "🌺", "🌹", "🌷", "🌻"][Math.floor(Math.random() * 5)];
    bloom.style.left = e.clientX + "px";
    bloom.style.top = e.clientY + "px";
    document.body.appendChild(bloom);
    setTimeout(() => bloom.remove(), 2000);

    rainInterval = setInterval(() => {
        spawnHeartAt(e.clientX, e.clientY);
    }, 100);
});

document.addEventListener("mouseup", () => clearInterval(rainInterval));

function spawnHeartAt(x, y) {
    const p = document.createElement("div");
    p.className = "particle heart-particle";
    p.textContent = "💖";
    p.style.left = x + (Math.random() * 40 - 20) + "px";
    p.style.top = y + "px";
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 3000);
}

// --- Window Misc ---
window.addEventListener('blur', () => document.title = nameOr(`Come back, ${NAME}! 🎂`, "Come back! 🎂"));
window.addEventListener('focus', () => document.title = pageTitle());
// --- Idea 14 & 17: Butterflies & Lanterns ---
function startAtmosphere() {
    // Spawn 6 butterflies
    for (let i = 0; i < 6; i++) {
        const b = document.createElement("div");
        b.className = "butterfly";
        b.textContent = "🦋";
        b.style.top = (Math.random() * 80) + "vh";
        b.style.animation = `flutter ${10 + Math.random() * 10}s linear infinite`;
        b.style.animationDelay = (i * 2) + "s";
        document.body.appendChild(b);
    }
    // Spawn lanterns every 4 seconds
    setInterval(() => {
        const l = document.createElement("div");
        l.className = "lantern";
        l.textContent = "🏮";
        l.style.left = (Math.random() * 100) + "vw";
        l.style.bottom = "-50px";
        l.style.animation = `rise ${8 + Math.random() * 5}s linear forwards`;
        document.body.appendChild(l);
        setTimeout(() => l.remove(), 12000);
    }, 4000);
}

// --- Idea 11, 18, 59: Shooting Stars & Moon ---
function triggerSkyMagic() {
    for(let i=0; i<8; i++) {
        setTimeout(() => {
            const s = document.createElement("div");
            s.className = "shooting-star";
            s.style.left = Math.random() * 80 + "vw";
            s.style.top = Math.random() * 40 + "vh";
            document.body.appendChild(s);
            setTimeout(() => s.remove(), 2000);
        }, i * 300);
    }
}

// --- Idea 49: Emoji Rain ---
function triggerEmojiRain() {
    for (let i = 0; i < 60; i++) {
        setTimeout(spawnParticle, i * 30);
    }
}

// --- Secret Message: swipe down at the very end, then hold ---
const HOLD_MS = 1200;          // how long to hold still
let holdTimer = null;
let pressing = false;

function atTheEnd() {
    const fin = document.getElementById("final");
    return !!fin && window.scrollY >= fin.offsetTop - 30;
}

function showSecret() {
    if (document.querySelector(".secret-toast")) return;
    const msg = document.createElement("div");
    msg.className = "secret-toast";
    msg.textContent = "I love you ❤️";
    document.body.appendChild(msg);
    setTimeout(() => msg.classList.add("show"), 100);
    setTimeout(() => msg.remove(), 6000);
}

function armHold(e) {
    clearTimeout(holdTimer);
    if (e && e.target && e.target.closest && e.target.closest("input, button, textarea")) return;
    holdTimer = setTimeout(() => { if (atTheEnd()) showSecret(); }, HOLD_MS);
}
function cancelHold() { clearTimeout(holdTimer); }

// Phone: any movement restarts the timer, so it fires once the finger holds still
document.addEventListener("touchstart", armHold, { passive: true });
document.addEventListener("touchmove", armHold, { passive: true });
document.addEventListener("touchend", cancelHold);
document.addEventListener("touchcancel", cancelHold);
// Computer: click and hold
document.addEventListener("mousedown", (e) => { pressing = true; armHold(e); });
document.addEventListener("mousemove", (e) => { if (pressing) armHold(e); });
document.addEventListener("mouseup", () => { pressing = false; cancelHold(); });

// Initialize atmosphere
startAtmosphere();
function initQuotesAtom() {
    const container = document.getElementById('quotesAtom');
    if (!container) return; // no quotes section on the page
    // --- PASTE HER QUOTES HERE ---
    const quotes = [
        "Quote 1 goes here",
        "Quote 2 goes here",
        "Quote 3 goes here",
        "Maybe a 4th one?",
        "Everything revolves around you"
    ];

    quotes.forEach((text, i) => {
        const path = document.createElement('div');
        path.className = 'electron-path';
        
        // Randomly tilt each orbit
        const rotX = 60 + (Math.random() * 20); // Tilt between 60-80 deg
        const rotY = (360 / quotes.length) * i; // Space them out evenly
        const duration = 5 + (Math.random() * 5); // Different speeds
        
        path.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
        path.style.animation = `atomOrbit ${duration}s linear infinite`;

        const word = document.createElement('span');
        word.className = 'electron-word';
        word.textContent = text;
        
        // This keeps the word from looking "upside down" as it orbits
        word.style.animation = `keepWordReadable ${duration}s linear infinite`;
        
        // Add a unique animation for the word itself to reverse the path rotation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes keepWordReadable${i} {
                from { transform: rotateZ(0deg) rotateX(-${rotX}deg) rotateY(-${rotY}deg); }
                to { transform: rotateZ(-360deg) rotateX(-${rotX}deg) rotateY(-${rotY}deg); }
            }
        `;
        document.head.appendChild(style);
        word.style.animation = `keepWordReadable${i} ${duration}s linear infinite`;

        path.appendChild(word);
        container.appendChild(path);
    });
}

// Call this function when the page loads or when the envelope is opened
document.addEventListener('DOMContentLoaded', initQuotesAtom);

// DOUBLE TAP CONFETTI
let lastTap = 0;

document.addEventListener("touchend", function () {
    const now = new Date().getTime();
    const tapLength = now - lastTap;

    if (tapLength < 300 && tapLength > 0) {
        spawnConfetti(120);
        playSound('celebrate');
    }

    lastTap = now;
});
// PHONE TILT PARALLAX
window.addEventListener("deviceorientation", (event) => {

    const tiltX = event.gamma;
    const tiltY = event.beta;

    const stars = document.getElementById("starsCanvas");
    const hero = document.querySelector(".hero-inner");

    if (stars) {
        stars.style.transform =
            `translate(${tiltX * 0.5}px, ${tiltY * 0.5}px) scale(1.1)`;
    }

    if (hero) {
        hero.style.transform =
            `rotateY(${tiltX * 0.2}deg) rotateX(${tiltY * -0.2}deg)`;
    }

});