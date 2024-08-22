const customStampIDs = [11501, 21802, 36903, 45804, 50085];

// 指定座標
const targetLocations = [
    { lat: 32.74940020598272, lon: 129.87958316982198 }, // A地点
    { lat: 32.80864261545204, lon: 129.87437337696068 }  // B地点（仮の座標）
];
const maxDistance = 200; // メートル単位

function initializeStamps() {
    updateStamps();
}

function updateStamps() {
    const stamps = JSON.parse(localStorage.getItem('stamps') || '[]');
    document.querySelectorAll('.stamp').forEach((stamp) => {
        const stampId = parseInt(stamp.dataset.id);
        if (stamps.includes(stampId)) {
            stamp.classList.add('collected');
            const img = stamp.querySelector('.stamp-image');
            if (img.complete) {
                stamp.classList.add('has-image');
            } else {
                img.onload = () => stamp.classList.add('has-image');
                img.onerror = () => stamp.classList.remove('has-image');
            }
        }
    });
}

function collectStamp(id) {
    const stamps = JSON.parse(localStorage.getItem('stamps') || '[]');
    if (!stamps.includes(id)) {
        stamps.push(id);
        localStorage.setItem('stamps', JSON.stringify(stamps));
        updateStamps();
        const stampIndex = customStampIDs.indexOf(id) + 1;
        alert(`スタンプ${stampIndex}（ID: ${id}）を獲得しました！`);
    } else {
        alert('このスタンプは既に獲得済みです。');
    }
}

function checkLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            
            const distance = calculateDistance(userLat, userLon, targetLat, targetLon);
            
            if (distance <= maxDistance) {
                const urlParams = new URLSearchParams(window.location.search);
                const stampId = urlParams.get('id');
                if (stampId && customStampIDs.includes(parseInt(stampId))) {
                    collectStamp(parseInt(stampId));
                } else {
                    alert("有効なスタンプIDが指定されていません。");
                }
            } else {
                alert("指定された範囲内にいません。");
            }
        }, function(error) {
            alert("位置情報の取得に失敗しました: " + error.message);
        });
    } else {
        alert("お使いのブラウザは位置情報をサポートしていません。");
    }
}

// 2点間の距離をメートル単位で計算する関数
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // 地球の半径（メートル）
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // メートル単位の距離
}

window.onload = initializeStamps;

// URLパラメータからスタンプIDを取得して収集
const urlParams = new URLSearchParams(window.location.search);
const stampId = urlParams.get('id');
if (stampId) {
    checkLocation();
}
