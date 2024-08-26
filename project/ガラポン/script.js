const prizes = [
    { name: '商品A', count: 100 },
    { name: '商品B', count: 5 },
    { name: '商品C', count: 50 },
    { name: 'はずれ', count: 200 }
];

let remainingPrizes = [...prizes];

const garapon = document.getElementById('garapon');
const octagon = document.getElementById('octagon');
const ball = document.getElementById('ball');
const resultDiv = document.getElementById('result');

const garaGaraSound = new Audio('https://soundbible.com/grab.php?id=1700&type=mp3');
const ballDropSound = new Audio('https://soundbible.com/grab.php?id=1830&type=mp3');

let isSpinning = false;
let startX, startY;
let isDragging = false;
let currentRotation = 0;

garapon.addEventListener('touchstart', handleTouchStart);
garapon.addEventListener('touchmove', handleTouchMove);
garapon.addEventListener('touchend', handleTouchEnd);

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

    const spins = 5 + Math.floor(Math.random() * 5);
    const totalRotation = spins * 360 + (360 - (currentRotation % 360));

    octagon.style.transition = `transform ${spins}s ease-out`;
    octagon.style.transform = `rotate(${totalRotation}deg)`;

    setTimeout(() => {
        isSpinning = false;
        currentRotation = totalRotation % 360;
        octagon.style.transition = 'none';
        dropBall();
    }, spins * 1000);
}

function dropBall() {
    ball.style.display = 'block';
    ball.style.top = '340px';
    ballDropSound.play();

    setTimeout(() => {
        const prize = drawPrize();
        resultDiv.textContent = `結果: ${prize.name}`;
        ball.style.display = 'none';
    }, 500);
}

function drawPrize() {
    const totalCount = remainingPrizes.reduce((sum, prize) => sum + prize.count, 0);
    const randomNum = Math.floor(Math.random() * totalCount);
    let currentSum = 0;

    for (let prize of remainingPrizes) {
        currentSum += prize.count;
        if (randomNum < currentSum) {
            prize.count--;
            if (prize.count === 0) {
                remainingPrizes = remainingPrizes.filter(p => p !== prize);
            }
            return prize;
        }
    }
}
