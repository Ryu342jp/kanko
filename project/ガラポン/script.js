let prizes = [
  { name: 'チケット, count: 1, color: '#ff0000' },
  { name: 'はずれ', count: 1000, color: '#ffffff' }
];

const garapon = document.getElementById('garapon');
const octagon = document.getElementById('octagon');
const ball = document.getElementById('ball');
const resultDiv = document.getElementById('result');
const remainingPrizesDiv = document.getElementById('remaining-prizes');

let garaGaraSound, endSound;
let isSpinning = false;
let startX, startY;
let isDragging = false;
let currentRotation = 0;

function preloadAudio() {
  garaGaraSound = new Audio('gara.mp3');
  endSound = new Audio('kara.mp3');
}

window.addEventListener('load', () => {
  preloadAudio();
  loadSavedPrizes();
  updateRemainingPrizes();
  setupEventListeners();
});

function loadSavedPrizes() {
  const savedPrizes = localStorage.getItem('prizes');
  if (savedPrizes) {
    prizes = JSON.parse(savedPrizes);
  }
}

function setupEventListeners() {
  garapon.addEventListener('touchstart', handleTouchStart);
  garapon.addEventListener('touchmove', handleTouchMove);
  garapon.addEventListener('touchend', handleTouchEnd);

  ['colorA', 'colorB', 'colorC'].forEach((id, index) => {
    document.getElementById(id).addEventListener('change', (e) => {
      prizes[index].color = e.target.value;
      savePrizes();
      updateRemainingPrizes();
    });
  });
}

let currentRotation = 0;
let startAngle = 0;

function handleTouchStart(e) {
  if (isSpinning) return;
  isDragging = true;
  const touch = e.touches[0];
  startAngle = Math.atan2(touch.clientY - 150, touch.clientX - 150);
}

function handleTouchMove(e) {
  if (!isDragging || isSpinning) return;
  const touch = e.touches[0];
  const currentAngle = Math.atan2(touch.clientY - 150, touch.clientX - 150);
  let rotation = (currentAngle - startAngle) * (180 / Math.PI);
  
  // 回転の連続性を保つ
  if (rotation < 0) rotation += 360;
  if (rotation > 180) rotation -= 360;
  
  currentRotation += rotation;
  octagon.style.transform = `rotate(${currentRotation}deg)`;
  startAngle = currentAngle;
}

function handleTouchEnd() {
  if (!isDragging || isSpinning) return;
  isDragging = false;
  startSpin();
}

// イベントリスナーの設定
garapon.addEventListener('touchstart', handleTouchStart);
garapon.addEventListener('touchmove', handleTouchMove);
garapon.addEventListener('touchend', handleTouchEnd);

function startSpin() {
  if (isSpinning) return;
  isSpinning = true;
  garaGaraSound.currentTime = 0;
  garaGaraSound.play().catch(e => console.error("音声再生エラー:", e));
  
  const totalRotation = currentRotation + 1080;
  octagon.style.transition = `transform 3s ease-out`;
  octagon.style.transform = `rotate(${totalRotation}deg)`;
  
  setTimeout(() => {
    isSpinning = false;
    currentRotation = totalRotation % 360;
    octagon.style.transition = 'none';
    endSound.play().catch(e => console.error("音声再生エラー:", e));
    dropBall();
  }, 3000);
}

function dropBall() {
  const prize = drawPrize();
  ball.style.backgroundColor = prize.color;
  ball.style.display = 'block';
  ball.style.top = '340px';
  
  setTimeout(() => {
    resultDiv.textContent = `結果: ${prize.name}`;
    updateRemainingPrizes();
    savePrizes();
    
    setTimeout(() => {
      ball.style.transition = 'none';
      ball.style.top = '0px';
      ball.style.display = 'none';
      isSpinning = false;
    }, 2000);
  }, 500);
}

function drawPrize() {
  const totalCount = prizes.reduce((sum, prize) => sum + prize.count, 0);
  const randomNum = Math.floor(Math.random() * totalCount);
  let currentSum = 0;
  for (let prize of prizes) {
    currentSum += prize.count;
    if (randomNum < currentSum) {
      prize.count--;
      return prize;
    }
  }
}

function updateRemainingPrizes() {
  remainingPrizesDiv.innerHTML = '残り数:' + prizes.map(prize => `${prize.name}: ${prize.count}`).join(' ');
}

function savePrizes() {
  localStorage.setItem('prizes', JSON.stringify(prizes));
}
