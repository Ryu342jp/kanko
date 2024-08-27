const customStampIDs = [11501, 21802, 36903, 45804, 50085];

const stampData = [
    { id: '11501', image: 'https://ryu342jp.github.io/kanko/project/stamp-01-05.png' },
    { id: '21802', image: 'https://ryu342jp.github.io/kanko/project/stamp-01-06.png' },
    { id: '36903', image: 'st3.png' },
    { id: '45804', image: 'st4.png' },
    { id: '50085', image: 'st5.png' },
];

function initializeStamps() {
    updateStamps();
}

function updateStamps() {
    const stampCounts = JSON.parse(localStorage.getItem('stampCounts') || '{}');
    const stampContainer = document.getElementById('stamp-container');
    stampContainer.innerHTML = '';
    
    customStampIDs.forEach(id => {
        const stampInfo = stampData.find(stamp => stamp.id === id.toString());
        if (stampInfo) {
            const newStamp = document.createElement('div');
            newStamp.className = 'stamp';
            if (stampCounts[id] && stampCounts[id] > 0) {
                newStamp.classList.add('collected');
            }
            newStamp.style.backgroundImage = `url(${stampInfo.image})`;
            newStamp.innerHTML = `<div class="stamp-count">${stampCounts[id] || 0}</div>`;
            newStamp.setAttribute('data-id', id);
            stampContainer.appendChild(newStamp);
        }
    });
}

function collectStamp(id) {
    const stampCounts = JSON.parse(localStorage.getItem('stampCounts') || '{}');
    if (!stampCounts[id]) {
        stampCounts[id] = 0;
    }
    stampCounts[id]++;
    localStorage.setItem('stampCounts', JSON.stringify(stampCounts));
    updateStamps();
    alert(`スタンプを獲得しました！獲得回数: ${stampCounts[id]}`);
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

// その他の関数（calculateDistance, イベントリスナーなど）は変更なし
