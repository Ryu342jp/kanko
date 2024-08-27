let prizes = [
    { name: 'チケット', count: 1, color: '#ff0000' },
    { name: '商品券A', count: 250, color: '#00ff00' },
    { name: '商品券B', count: 500, color: '#0000ff' },
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

let garaGaraSound;
let endSound;

let isSpinning = false;
let startX, startY;
let isDragging = false;
let currentRotation = 0;

// 音声ファイルの読み込み
function preloadAudio() {
    garaGaraSound = new Audio('gara.mp3');
    endSound = new Audio('kara.mp3');
    
    // がらがらの音の長さを確認
    garaGaraSound.addEventListener('loadedmetadata', () => {
        if (garaGaraSound.duration !== 3) {
            console.warn('がらがらの音の長さが3秒ではありません。音声ファイルを確認してください。');
        }
    });
}

// ページ読み込み時に音声をプリロード
window.addEventListener('load', preloadAudio);

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

let touchStartTime;

function handleTouchStart(e) {
    if (isSpinning) return;
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    touchStartTime = Date.now();
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

function handleTouchEnd(e) {
    if (!isDragging || isSpinning) return;
    isDragging = false;
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - touchStartTime;
    
    if (touchDuration < 300) { // 短いタッチの場合はスピンを開始
        startSpin();
    }
}

function startSpin() {
    if (isSpinning) return;
    isSpinning = true;

    // 音の再生開始
    garaGaraSound.currentTime = 0;
    garaGaraSound.play().catch(e => console.error("音声再生エラー:", e));

    const totalRotation = currentRotation + 1080; // 3回転（360度 × 3）
    octagon.style.transition = `transform 3s ease-out`;
    octagon.style.transform = `rotate(${totalRotation}deg)`;

    // がらがらの音が終わったら玉を落とす
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
        
        // 玉を元の位置に戻す
        setTimeout(() => {
            ball.style.transition = 'none';
            ball.style.top = '0px';
            ball.style.display = 'none';
            
            // 次の回転のために準備
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
    remainingPrizesDiv.innerHTML = '残り数:<br>' + 
        prizes.map(prize => `${prize.name}: ${prize.count}`).join('<br>');
}

function savePrizes() {
    localStorage.setItem('prizes', JSON.stringify(prizes));
}

// 初期表示時に残り数を更新
updateRemainingPrizes();
