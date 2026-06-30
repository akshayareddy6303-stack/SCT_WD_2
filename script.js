// Execution state storage structures
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCount = 0;

// UI Node Bindings
const displayEl = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsContainer = document.getElementById('lapsContainer');
const lapsBox = document.getElementById('lapsBox');
const clearLapsBtn = document.getElementById('clearLapsBtn');

function formatTime(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let centiseconds = Math.floor((ms % 1000) / 10);

    let txtHours = String(hours).padStart(2, '0');
    let txtMinutes = String(minutes).padStart(2, '0');
    let txtSeconds = String(seconds).padStart(2, '0');
    let txtCentiseconds = String(centiseconds).padStart(2, '0');

    return `${txtHours}:${txtMinutes}:${txtSeconds}.<span class="centiseconds-span">${txtCentiseconds}</span>`;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        displayEl.innerHTML = formatTime(elapsedTime);
    }, 10); // Sync loop at 10ms intervals for fine accuracy

    // Shift button layouts cleanly
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-flex';
    
    // Enable Lap system safely
    lapBtn.disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    pauseBtn.style.display = 'none';
    startBtn.style.display = 'inline-flex';
}

function resetTimer() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    
    displayEl.innerHTML = `00:00:00.<span class="centiseconds-span">00</span>`;
    clearAllLaps();

    pauseBtn.style.display = 'none';
    startBtn.style.display = 'inline-flex';

    // Disable Lap execution options
    lapBtn.disabled = true;
}

function recordLap() {
    lapCount++;
    lapsContainer.classList.add('active');

    const lapItem = document.createElement('div');
    lapItem.classList.add('lap-item');
    
    // Re-render inner HTML string values securely
    lapItem.innerHTML = `
        <span class="lap-number">Lap ${lapCount}</span>
        <span class="lap-time">${displayEl.innerHTML}</span>
    `;
    
    // Push latest lap directly to the top of list viewport
    lapsBox.insertBefore(lapItem, lapsBox.firstChild);
    lapsBox.scrollTop = 0;
}

function clearAllLaps() {
    lapCount = 0;
    lapsBox.innerHTML = '';
    lapsContainer.classList.remove('active');
}

// Action binding listeners 
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
clearLapsBtn.addEventListener('click', clearAllLaps);