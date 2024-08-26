let prizes = [
    { name: '商品A', count: 100, color: '#ff0000' },
    { name: '商品B', count: 5, color: '#00ff00' },
    { name: '商品C', count: 50, color: '#0000ff' },
    { name: 'はずれ', count: 200, color: '#ffffff' }
];

// ローカルストレージから保存されたデータを読み込む
const savedPrizes = localStorage.getItem('prizes');
if (savedPrizes) {
    prizes = JSON.parse(savedPrizes);
}

const garapon = document.getElementById('garapon');
const octagon = document.getElementById('octagon');
const ball = document.getElementById('ball');
const resultDiv = document.getElementById('result');
const remainingPrizesDiv = document.getElementById('remaining-prizes');

const garaGaraSound = new Audio('path/to/your/garagara_sound.mp3');
const endSound = new Audio('path/to/your/end_sound.mp3');

let isSpinning = false;
let startX, startY;
let isDragging = false;
let currentRotation = 0;

garapon.addEventListener('touchstart', handleTouchStart);
garapon.addEventListener('touchmove', handleTouchMove);
garapon.addEventListener('touchend', handleTouchEnd);

// 色設定の取得と更新
const colorA = document.getElementById('colorA');
const colorB = document.getElementById('colorB');
const colorC = document.getElementById('colorC');

colorA.addEventListener('change', updateColors);
colorB.addEventListener('change', updateColors);
colorC.addEventListener('change', updateColors);

function updateColors() {
    prizes[0].color = colorA.value;
    prizes[1].color = colorB.value;
    prizes[2].color = colorC.value;
    savePrizes();
    updateRemainingPrizes();
}

function handleTouchStart(e) {
    if (isSpinning) return;
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    garaGaraSound.play();
}

function handleTouchMove(e) {
    if (!isDragging || isSpinning) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    const rotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    currentRotation += rotation;
    octagon.style.transform = `rotate(${currentRotation}deg)`;
    startX = currentX;
    startY = currentY;
}

function handleTouchEnd() {
    if (!isDragging || isSpinning) return;
    isDragging = false;
    isSpinning = true;
    garaGaraSound.pause();
    garaGaraSound.currentTime = 0;

    // 3秒間の回転アニメーション
    const totalRotation = currentRotation + 1080; // 3回転（360度 × 3）
    octagon.style.transition = `transform 3s ease-out`;
    octagon.style.transform = `rotate(${totalRotation}deg)`;

    setTimeout(() => {
        isSpinning = false;
        currentRotation = totalRotation % 360;
        octagon.style.transition = 'none';
        endSound.play(); // 回転終了時に音を再生
        dropBall();
    }, 3000); // 3秒後に実行
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
    remainingPrizesDiv.innerHTML = '残り数:<br>' + 
        prizes.map(prize => `${prize.name}: ${prize.count}`).join('<br>');
}

function savePrizes() {
    localStorage.setItem('prizes', JSON.stringify(prizes));
}

// 初期表示時に残り数を更新
updateRemainingPrizes();
