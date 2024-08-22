const customStampIDs = [11501, 21802, 36903, 45804, 50085];

// 指定座標（A地点とB地点）
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
        } else {
            stamp.classList.remove('collected');
        }
    });

    // すべてのスタンプが収集されたかチェック
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
    if (password === 'staffpass123') { // 実際の運用では、より安全なパスワード認証方法を使用してください
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


document.addEventListener('DOMContentLoaded', function() {
    initializeStamps();
    checkLocation();
});
