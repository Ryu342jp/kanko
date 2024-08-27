const customStampIDs = [11501, 21802, 36903, 45804, 50085];

// 指定座標（A地点とB地点）
const targetLocations = [
    { lat: 32.74940020598272, lon: 129.87958316982198 }, // A地点
    { lat: 32.80864261545204, lon: 129.87437337696068 },  // B地点（仮の座標）
    { lat: 32.74274063579224, lon: 129.87767150491538 } 
];
const maxDistance = 200; // メートル単位

function initializeStamps() {
    updateStamps();
}

function updateStamps() {
    const stamps = JSON.parse(localStorage.getItem('stamps') || '[]');
    document.querySelectorAll('.stamp').forEach((stamp) => {
        const stampId = parseInt(stamp.dataset.id);
        const colorImg = stamp.querySelector('.stamp-color');
        if (stamps.includes(stampId)) {
            stamp.classList.add('collected');
            if (colorImg && colorImg.complete && colorImg.naturalWidth !== 0) {
                stamp.classList.add('has-image');
            } else {
                stamp.classList.remove('has-image');
                stamp.style.backgroundColor = '#4CAF50';
                stamp.style.color = 'white';
            }
        } else {
            stamp.classList.remove('collected');
            stamp.classList.remove('has-image');
            stamp.style.backgroundColor = '';
            stamp.style.color = '';
        }
    });

    if (stamps.length === customStampIDs.length) {
        document.getElementById('completion-button').style.display = 'block';
    } else {
        document.getElementById('completion-button').style.display = 'none';
    }
}

function showCompletionCode() {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    alert(`完了コード: ${code}\nこのコードをスタッフに見せてください。`);
    document.getElementById('staff-reset').style.display = 'block';
}

function resetStamps() {
    const password = document.getElementById('staff-password').value;
    if (password === 'staffpass123') {
        localStorage.removeItem('stamps');
        updateStamps();
        alert('スタンプがリセットされました。');
        document.getElementById('staff-reset').style.display = 'none';
        document.getElementById('completion-button').style.display = 'none';
    } else {
        alert('パスワードが正しくありません。');
    }
}

function collectStamp(id) {
    const stamps = JSON.parse(localStorage.getItem('stamps') || '[]');
    if (!stamps.includes(id)) {
        stamps.push(id);
        localStorage.setItem('stamps', JSON.stringify(stamps));
        updateStamps();
        const stampIndex = customStampIDs.indexOf(id) + 1;
        alert(`スタンプ${stampIndex}を獲得しました！`);
    } else {
        alert('このスタンプは既に獲得済みです。');
    }
}

function checkLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            
            let isInRange = false;
            for (const target of targetLocations) {
                const distance = calculateDistance(userLat, userLon, target.lat, target.lon);
                if (distance <= maxDistance) {
                    isInRange = true;
                    break;
                }
            }
            
            if (isInRange) {
                const urlParams = new URLSearchParams(window.location.search);
                const stampId = urlParams.get('id');
                if (stampId && customStampIDs.includes(parseInt(stampId))) {
                    collectStamp(parseInt(stampId));
                } else {
                    alert("有効な範囲内にいますが、スタンプIDが指定されていないか無効です。");
                }
            } else {
                alert("指定された範囲内にいません。スタンプを収集するには、指定された場所に移動してください。");
            }
        }, function(error) {
            alert("位置情報の取得に失敗しました: " + error.message + "\n位置情報の許可を確認し、ページをリロードしてください。");
        });
    } else {
        alert("お使いのブラウザは位置情報をサポートしていません。");
    }
}

// 2点間の距離をメートル単位で計算する関数
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
}

document.addEventListener('DOMContentLoaded', function() {
    initializeStamps();
    checkLocation();

    // QRコードから読み込んだIDでスタンプを追加
    const stampContainer = document.getElementById('stamp-container');

    // スタンプIDと画像のペアを定義
    const stampData = [
        { id: '12345', image: 'image/image01.jpg' },
        { id: '67890', image: 'image/image02.jpg' },
        { id: '24680', image: 'image/image03.jpg' },
        // 他のスタンプデータを追加
    ];

    function getStampIdsFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const ids = urlParams.get('id');
        return ids ? ids.split(',') : [];
    }

    function getStoredStampIds() {
        const storedIds = localStorage.getItem('stampIds');
        return storedIds ? storedIds.split(',') : [];
    }

    function storeStampIds(stampIds) {
        localStorage.setItem('stampIds', stampIds.join(','));
    }

    function displayStamp(stampId) {
        const stampInfo = stampData.find(stamp => stamp.id === stampId);
        if (!stampInfo) return;

        const newStamp = document.createElement('div');
        newStamp.className = 'stamp';
        newStamp.style.backgroundImage = `url(${stampInfo.image})`;
        newStamp.style.display = 'block';
        newStamp.setAttribute('data-id', stampId);

        stampContainer.appendChild(newStamp);
        console.log(`スタンプID: ${stampId}, 画像: ${stampInfo.image}`);
    }

    // URLからスタンプIDを取得して表示
    const newStampIds = getStampIdsFromUrl();
    const storedStampIds = getStoredStampIds();

    newStampIds.forEach(stampId => {
        if (!storedStampIds.includes(stampId)) {
            displayStamp(stampId);
            storedStampIds.push(stampId);
        }
    });

    storeStampIds(storedStampIds);
});

//スライダー機能
let startX;
let scrollLeft;

const container = document.querySelector('#container');

container.addEventListener('mousedown', (e) => {
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.style.cursor = 'grabbing';
    container.style.userSelect = 'none';
});

container.addEventListener('mouseleave', () => {
    container.style.cursor = 'auto';
    container.style.userSelect = 'auto';
});

container.addEventListener('mouseup', () => {
    container.style.cursor = 'auto';
    container.style.userSelect = 'auto';
});

container.addEventListener('mousemove', (e) => {
    if (startX !== undefined) {
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    }
});

container.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
});

container.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
});
