// --- ตั้งค่าข้อมูลตรงนี้ (สำคัญ!) ---
const CORRECT_PASS = "190925"; // รหัสผ่าน (วันเดือนปี)
const START_DATE = "2025-09-19"; // วันที่เริ่มคบกัน (YYYY-MM-DD)
// ---------------------------------

let currentPass = "";

function goToPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0,0);
}

// Keypad Logic
function addNum(num) {
    if(currentPass.length < 6) {
        currentPass += num;
        updateDisplay();
    }
}

function clearNum() {
    currentPass = "";
    updateDisplay();
}

function updateDisplay() {
    const dots = "• ".repeat(currentPass.length);
    document.getElementById('pass-input').value = dots;
}

function checkPass() {
    if(currentPass === CORRECT_PASS) {
        goToPage('page-menu');
    } else {
        document.getElementById('error-msg').style.display = 'block';
        setTimeout(() => {
            document.getElementById('error-msg').style.display = 'none';
            clearNum();
        }, 2000);
    }
}

// Timer Logic
function updateTimer() {
    const start = new Date(START_DATE).getTime();
    const now = new Date().getTime();
    const diff = now - start;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    // ตรวจสอบว่ามี element อยู่ในหน้าเว็บจริงไหมเพื่อป้องกัน error
    if(document.getElementById('d')) {
        document.getElementById('d').innerText = d;
        document.getElementById('h').innerText = h;
        document.getElementById('m').innerText = m;
        document.getElementById('s').innerText = s;
    }
}
setInterval(updateTimer, 1000);

// Music Logic
const audio = document.getElementById('bg-music');
let isPlaying = false;

function toggleMusic() {
    const icon = document.getElementById('play-icon');
    if(isPlaying) {
        audio.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    } else {
        audio.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }
    isPlaying = !isPlaying;
}

// Letter Logic
function openLetter() {
    document.querySelector('.envelope').style.display = 'none';
    document.getElementById('letter-content').style.display = 'block';
    document.getElementById('letter-content').style.animation = 'fadeIn 1s';
}
// ฟังก์ชันสำหรับปุ่ม Back ในหน้าเพลงโดยเฉพาะ
function stopMusicAndGoBack() {
    const audio = document.getElementById('bg-music');
    const icon = document.getElementById('play-icon');

    // 1. สั่งหยุดเพลง
    audio.pause();
    
    
    // 2. เปลี่ยนไอคอนกลับเป็นรูป Play (เพื่อให้พร้อมกดเล่นใหม่)
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
    isPlaying = false; // รีเซ็ตสถานะว่าเพลงหยุดแล้ว

    // 3. กลับไปหน้าเมนู
    goToPage('page-menu');
}