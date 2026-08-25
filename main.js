const letterContent = "Cảm ơn em vì 5 tháng qua đã luôn ở bên anh, cùng anh trải qua những lúc vui vẻ, hạnh phúc và cả những khi không được tốt đẹp. Có thể anh chưa phải là một người hoàn hảo, đôi lúc còn vô tâm, làm em buồn hay khiến em phải suy nghĩ nhiều, nhưng anh thật sự trân trọng từng khoảnh khắc mà chúng ta đã có cùng nhau. 5 tháng có thể không phải là một khoảng thời gian quá dài, nhưng với anh, nó đủ để tạo nên rất nhiều kỷ niệm đáng nhớ. Cảm ơn em vì đã xuất hiện, đã yêu thương, quan tâm và kiên nhẫn với anh. Anh mong rằng 5 tháng vừa qua chỉ là một phần nhỏ trong hành trình thật dài của hai đứa mình, và sau này chúng ta vẫn sẽ cùng nhau tạo thêm thật nhiều kỷ niệm đẹp nữa. Anh yêu em rất nhiều";
const durationWrite = 24;
let typingInterval = null;
let buttonShowTimeout = null;

const galleryImages = [
    "./img/anh/IMG_4603.jpg",
    "./img/anh/IMG_4698.JPG",
    "./img/anh/IMG_4700.JPG",
    "./img/anh/IMG_5240.jpg",
    "./img/anh/IMG_5675.jpg",
    "./img/anh/IMG_5677.jpg",
    "./img/anh/IMG_5679.jpg",
    "./img/anh/IMG_5680.JPG",
    "./img/anh/IMG_5681.JPG",
    "./img/anh/IMG_5682.JPG",
    "./img/anh/IMG_5683.JPG",
    "./img/anh/IMG_5684.jpg",
    "./img/anh/IMG_5696.jpg",
    "./img/anh/IMG_5697.JPG",
    "./img/anh/IMG_5698.JPG",
    "./img/anh/IMG_5706.jpg",
    "./img/anh/IMG_5844.JPG",
    "./img/anh/IMG_5850.JPG",
    "./img/anh/IMG_5851.jpg"
];

let isRainPlaying = true;

function updateCardScale() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const paddingX = vw < 600 ? 16 : 30;
    const paddingY = vh < 600 ? 16 : 30;
    const scaleX = (vw - paddingX) / 800;
    const scaleY = (vh - paddingY) / 600;
    let scale = Math.min(scaleX, scaleY, 1);
    if (scale < 0.28) scale = 0.28;
    document.documentElement.style.setProperty("--card-scale", scale.toFixed(4));
}

let resizeRaf = null;
function onResize() {
    if (resizeRaf) cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(updateCardScale);
}

window.addEventListener("resize", onResize, { passive: true });
window.addEventListener("orientationchange", () => {
    setTimeout(updateCardScale, 100);
}, { passive: true });
updateCardScale();

function effectWrite() {
    const boxLetter = document.querySelector(".letterContent");
    const rightContent = document.querySelector(".rightContent");
    const galleryBtn = document.getElementById("galleryBtn");
    if (!boxLetter) return;

    boxLetter.textContent = "";
    if (galleryBtn) galleryBtn.classList.remove("show");

    if (typingInterval) {
        clearInterval(typingInterval);
        typingInterval = null;
    }
    if (buttonShowTimeout) {
        clearTimeout(buttonShowTimeout);
        buttonShowTimeout = null;
    }

    let charIndex = 0;
    const totalLen = letterContent.length;

    typingInterval = setInterval(() => {
        if (charIndex < totalLen) {
            boxLetter.textContent = letterContent.slice(0, charIndex + 1);
            charIndex++;

            // Batch scroll updates to avoid layout thrashing on every tick
            if (rightContent && (charIndex % 3 === 0 || charIndex === totalLen)) {
                rightContent.scrollTop = rightContent.scrollHeight;
            }
        } else {
            clearInterval(typingInterval);
            typingInterval = null;

            if (galleryBtn) {
                buttonShowTimeout = setTimeout(() => {
                    galleryBtn.classList.add("show");
                    if (rightContent) {
                        rightContent.scrollTop = rightContent.scrollHeight;
                    }
                }, 350);
            }
        }
    }, durationWrite);
}

function createPhotoRain() {
    const rainBox = document.getElementById("photoRainBox");
    if (!rainBox) return;
    rainBox.innerHTML = "";

    const heartSymbols = ["💖", "💕", "🌸", "✨", "❤️", "🌹"];
    const isMobile = window.innerWidth < 768;
    const totalCount = isMobile ? 14 : 26;
    const heartCount = isMobile ? 16 : 30;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < totalCount; i++) {
        const imgSrc = galleryImages[i % galleryImages.length];
        const photoItem = document.createElement("div");
        photoItem.className = "fallingPhotoItem";

        const leftPos = (i * (90 / totalCount) + Math.random() * 4).toFixed(1);
        const duration = (6 + Math.random() * 5).toFixed(1);
        const delay = (Math.random() * 6).toFixed(1);
        const startRot = (-16 + Math.random() * 32).toFixed(1);
        const midRot = (-16 + Math.random() * 32).toFixed(1);
        const endRot = (-16 + Math.random() * 32).toFixed(1);
        const sway = (-30 + Math.random() * 60).toFixed(1);

        photoItem.style.left = `${leftPos}%`;
        photoItem.style.animationDuration = `${duration}s`;
        photoItem.style.animationDelay = `${delay}s`;
        photoItem.style.setProperty("--start-rot", `${startRot}deg`);
        photoItem.style.setProperty("--mid-rot", `${midRot}deg`);
        photoItem.style.setProperty("--end-rot", `${endRot}deg`);
        photoItem.style.setProperty("--sway", `${sway}px`);

        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = "Kỉ niệm";
        img.decoding = "async";
        img.loading = "eager";
        photoItem.appendChild(img);

        photoItem.addEventListener("click", (e) => {
            e.stopPropagation();
            zoomPhoto(imgSrc);
        });

        fragment.appendChild(photoItem);
    }

    for (let j = 0; j < heartCount; j++) {
        const heart = document.createElement("div");
        heart.className = "fallingHeartItem";
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = `${(Math.random() * 94).toFixed(1)}%`;
        heart.style.animationDuration = `${(4 + Math.random() * 5).toFixed(1)}s`;
        heart.style.animationDelay = `${(Math.random() * 5).toFixed(1)}s`;
        heart.style.setProperty("--sway-h", `${(-20 + Math.random() * 40).toFixed(1)}px`);
        fragment.appendChild(heart);
    }

    rainBox.appendChild(fragment);
}

function zoomPhoto(src) {
    const modal = document.getElementById("photoZoomModal");
    const img = document.getElementById("photoZoomImg");
    if (!modal || !img) return;
    img.src = src;
    modal.classList.add("active");
}

function closeZoom() {
    const modal = document.getElementById("photoZoomModal");
    if (modal) modal.classList.remove("active");
}

function startPhotoRain() {
    const modal = document.getElementById("photoRainModal");
    if (!modal) return;
    modal.classList.add("active");
    createPhotoRain();
    isRainPlaying = true;
    const toggleBtn = document.getElementById("photoRainToggleBtn");
    if (toggleBtn) toggleBtn.textContent = "⏸ Tạm dừng";
}

function stopPhotoRain() {
    const modal = document.getElementById("photoRainModal");
    if (!modal) return;
    modal.classList.remove("active");
    closeZoom();

    // Clean up elements after fade out to release memory on mobile
    setTimeout(() => {
        const rainBox = document.getElementById("photoRainBox");
        if (rainBox && !modal.classList.contains("active")) {
            rainBox.innerHTML = "";
        }
    }, 450);
}

function toggleRainPlay() {
    const items = document.querySelectorAll(".fallingPhotoItem, .fallingHeartItem");
    const toggleBtn = document.getElementById("photoRainToggleBtn");
    isRainPlaying = !isRainPlaying;

    const playState = isRainPlaying ? "running" : "paused";
    for (let i = 0; i < items.length; i++) {
        items[i].style.animationPlayState = playState;
    }

    if (toggleBtn) {
        toggleBtn.textContent = isRainPlaying ? "⏸ Tạm dừng" : "▶ Tiếp tục";
    }
}

window.addEventListener("DOMContentLoaded", () => {
    updateCardScale();
    setTimeout(() => {
        const container = document.querySelector(".container");
        if (container) container.classList.add("active");
    }, 400);
});

const openBtn = document.querySelector(".openBtn");
if (openBtn) {
    openBtn.addEventListener("click", () => {
        const card = document.querySelector(".cardValentine");
        const container = document.querySelector(".container");
        if (card) card.classList.add("active");
        if (container) container.classList.add("close");
    });
}

const cardValentine = document.querySelector(".cardValentine");
if (cardValentine) {
    cardValentine.addEventListener("click", (e) => {
        if (e.target && e.target.id === "galleryBtn") return;

        cardValentine.classList.toggle("open");

        if (cardValentine.classList.contains("open")) {
            setTimeout(effectWrite, 450);
        } else {
            if (typingInterval) {
                clearInterval(typingInterval);
                typingInterval = null;
            }
            if (buttonShowTimeout) {
                clearTimeout(buttonShowTimeout);
                buttonShowTimeout = null;
            }
            const galleryBtn = document.getElementById("galleryBtn");
            if (galleryBtn) galleryBtn.classList.remove("show");
            setTimeout(() => {
                const boxLetter = document.querySelector(".letterContent");
                if (boxLetter) boxLetter.textContent = "";
            }, 800);
        }
    });
}

const galleryBtn = document.getElementById("galleryBtn");
if (galleryBtn) {
    galleryBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        startPhotoRain();
    });
}

const photoRainCloseBtn = document.getElementById("photoRainCloseBtn");
if (photoRainCloseBtn) photoRainCloseBtn.addEventListener("click", stopPhotoRain);

const photoRainOverlay = document.getElementById("photoRainOverlay");
if (photoRainOverlay) photoRainOverlay.addEventListener("click", stopPhotoRain);

const photoRainToggleBtn = document.getElementById("photoRainToggleBtn");
if (photoRainToggleBtn) {
    photoRainToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleRainPlay();
    });
}

const photoZoomClose = document.getElementById("photoZoomClose");
if (photoZoomClose) photoZoomClose.addEventListener("click", closeZoom);

const photoZoomModal = document.getElementById("photoZoomModal");
if (photoZoomModal) {
    photoZoomModal.addEventListener("click", (e) => {
        if (e.target === photoZoomModal) closeZoom();
    });
}