function nextScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    const reel = document.getElementById('myReel');
    if(id !== 'video-reel' && reel) reel.pause();
}
function startExperience() {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    nextScreen('video-reel');
}
function showPhotos() {
    nextScreen('memories');
    confetti({ particleCount: 200, spread: 100, colors: ['#D4AF37', '#8B0000'] });
    const canvas = document.getElementById('photo-canvas');
    canvas.innerHTML = ''; 
    for (let i = 1; i <= 50; i++) {
        const img = document.createElement('div');
        img.className = 'scatter-photo';
        img.innerHTML = `<img src="img${i}.jpg">`;
        img.style.left = "50%"; img.style.top = "50%";
        makeDraggable(img);
        canvas.appendChild(img);
        setTimeout(() => {
            const rx = Math.random() * 75 + 10;
            const ry = Math.random() * 60 + 15;
            const rr = Math.random() * 60 - 30;
            img.style.transition = "all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            img.style.left = `${rx}%`; img.style.top = `${ry}%`;
            img.style.transform = `translate(-50%, -50%) rotate(${rr}deg) scale(1)`;
            img.style.opacity = "1";
        }, i * 40);
    }
}
function makeDraggable(el) {
    let p1 = 0, p2 = 0, p3 = 0, p4 = 0;
    el.onmousedown = dragStart; el.ontouchstart = dragStart;
    function dragStart(e) {
        el.style.transition = "none"; el.style.zIndex = Date.now();
        p3 = e.clientX || e.touches[0].clientX; p4 = e.clientY || e.touches[0].clientY;
        document.onmousemove = dragging; document.ontouchmove = dragging;
        document.onmouseup = dragEnd; document.ontouchend = dragEnd;
    }
    function dragging(e) {
        let cx = e.clientX || e.touches[0].clientX; let cy = e.clientY || e.touches[0].clientY;
        p1 = p3 - cx; p2 = p4 - cy; p3 = cx; p4 = cy;
        el.style.top = (el.offsetTop - p2) + "px"; el.style.left = (el.offsetLeft - p1) + "px";
    }
    function dragEnd() { document.onmousemove = null; document.ontouchmove = null; }
}
function finalCelebration() {
    confetti({ particleCount: 600, spread: 160, colors: ['#D4AF37', '#8B0000'] });
}
