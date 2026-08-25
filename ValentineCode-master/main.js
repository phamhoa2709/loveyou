const letterContent = "Cảm ơn em vì 5 tháng qua đã luôn ở bên anh, cùng anh trải qua những lúc vui vẻ, hạnh phúc và cả những khi không được tốt đẹp. Có thể anh chưa phải là một người hoàn hảo, đôi lúc còn vô tâm, làm em buồn hay khiến em phải suy nghĩ nhiều, nhưng anh thật sự trân trọng từng khoảnh khắc mà chúng ta đã có cùng nhau. 5 tháng có thể không phải là một khoảng thời gian quá dài, nhưng với anh, nó đủ để tạo nên rất nhiều kỷ niệm đáng nhớ. Cảm ơn em vì đã xuất hiện, đã yêu thương, quan tâm và kiên nhẫn với anh. Anh mong rằng 5 tháng vừa qua chỉ là một phần nhỏ trong hành trình thật dài của hai đứa mình, và sau này chúng ta vẫn sẽ cùng nhau tạo thêm thật nhiều kỷ niệm đẹp nữa. Anh yêu em rất nhiều";
const durationWrite = 25;
let typingTimeouts = [];

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

window.addEventListener("resize", updateCardScale);
window.addEventListener("orientationchange", () => {
    setTimeout(updateCardScale, 150);
});
updateCardScale();

function effectWrite() {
    const boxLetter = document.querySelector(".letterContent");
    const rightContent = document.querySelector(".rightContent");
    const galleryBtn = document.getElementById("galleryBtn");
    if (!boxLetter) return;

    boxLetter.innerHTML = "";
    if (galleryBtn) galleryBtn.classList.remove("show");

    typingTimeouts.forEach(t => clearTimeout(t));
    typingTimeouts = [];

    const letters = letterContent.split("");
    letters.forEach((val, index) => {
        const timeout = setTimeout(() => {
            boxLetter.innerHTML += val;
            if (rightContent) {
                rightContent.scrollTop = rightContent.scrollHeight;
            }
            if (index === letters.length - 1 && galleryBtn) {
                setTimeout(() => {
                    galleryBtn.classList.add("show");
                    if (rightContent) {
                        rightContent.scrollTop = rightContent.scrollHeight;
                    }
                }, 400);
            }
        }, durationWrite * index);
        typingTimeouts.push(timeout);
    });
}

function createPhotoRain() {
    const rainBox = document.getElementById("photoRainBox");
    if (!rainBox) return;
    rainBox.innerHTML = "";

    const heartSymbols = ["💖", "💕", "🌸", "✨", "❤️", "🌹"];
    const totalCount = 28;

    for (let i = 0; i < totalCount; i++) {
        const imgSrc = galleryImages[i % galleryImages.length];
        const photoItem = document.createElement("div");
        photoItem.className = "fallingPhotoItem";

        const leftPos = (i * (92 / totalCount) + Math.random() * 4).toFixed(1);
        const duration = (6 + Math.random() * 5).toFixed(1);
        const delay = (Math.random() * 7).toFixed(1);
        const startRot = (-18 + Math.random() * 36).toFixed(1);
        const midRot = (-18 + Math.random() * 36).toFixed(1);
        const endRot = (-18 + Math.random() * 36).toFixed(1);
        const sway = (-35 + Math.random() * 70).toFixed(1);

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
        img.loading = "lazy";
        photoItem.appendChild(img);

        photoItem.addEventListener("click", (e) => {
            e.stopPropagation();
            zoomPhoto(imgSrc);
        });

        rainBox.appendChild(photoItem);
    }

    for (let j = 0; j < 35; j++) {
        const heart = document.createElement("div");
        heart.className = "fallingHeartItem";
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = `${(Math.random() * 95).toFixed(1)}%`;
        heart.style.animationDuration = `${(4 + Math.random() * 5).toFixed(1)}s`;
        heart.style.animationDelay = `${(Math.random() * 6).toFixed(1)}s`;
        heart.style.setProperty("--sway-h", `${(-25 + Math.random() * 50).toFixed(1)}px`);
        rainBox.appendChild(heart);
    }
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
}

function toggleRainPlay() {
    const items = document.querySelectorAll(".fallingPhotoItem, .fallingHeartItem");
    const toggleBtn = document.getElementById("photoRainToggleBtn");
    isRainPlaying = !isRainPlaying;

    items.forEach(item => {
        item.style.animationPlayState = isRainPlaying ? "running" : "paused";
    });

    if (toggleBtn) {
        toggleBtn.textContent = isRainPlaying ? "⏸ Tạm dừng" : "▶ Tiếp tục";
    }
}

window.addEventListener("load", () => {
    updateCardScale();
    setTimeout(() => {
        document.querySelector(".container").classList.add("active");
    }, 500);
});

const openBtn = document.querySelector(".openBtn");
if (openBtn) {
    openBtn.addEventListener("click", () => {
        document.querySelector(".cardValentine").classList.add("active");
        document.querySelector(".container").classList.add("close");
    });
}

const cardValentine = document.querySelector(".cardValentine");
if (cardValentine) {
    cardValentine.addEventListener("click", (e) => {
        if (e.target && e.target.id === "galleryBtn") return;

        cardValentine.classList.toggle("open");

        if (cardValentine.classList.contains("open")) {
            setTimeout(effectWrite, 500);
        } else {
            typingTimeouts.forEach(t => clearTimeout(t));
            typingTimeouts = [];
            const galleryBtn = document.getElementById("galleryBtn");
            if (galleryBtn) galleryBtn.classList.remove("show");
            setTimeout(() => {
                const boxLetter = document.querySelector(".letterContent");
                if (boxLetter) boxLetter.innerHTML = "";
            }, 1000);
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
if (photoRainToggleBtn) photoRainToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleRainPlay();
});

const photoZoomClose = document.getElementById("photoZoomClose");
if (photoZoomClose) photoZoomClose.addEventListener("click", closeZoom);

const photoZoomModal = document.getElementById("photoZoomModal");
if (photoZoomModal) photoZoomModal.addEventListener("click", (e) => {
    if (e.target === photoZoomModal) closeZoom();
});