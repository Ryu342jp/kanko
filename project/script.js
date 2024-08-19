// カスタムスタンプIDの設定
const customStampIDs = [101, 202, 303, 404, 505];

const totalStamps = customStampIDs.length;

function initializeStamps() {
    const stampContainer = document.getElementById('stamp-container');
    for (let i = 0; i < totalStamps; i++) {
        const stamp = document.createElement('div');
        stamp.className = 'stamp';
        stamp.textContent = i + 1; // 表示は1から始まる連番
        stamp.dataset.id = customStampIDs[i]; // データ属性にカスタムIDを設定
        stampContainer.appendChild(stamp);
    }
    updateStamps();
}

function updateStamps() {
    const stamps = JSON.parse(localStorage.getItem('stamps') || '[]');
    document.querySelectorAll('.stamp').forEach((stamp) => {
        if (stamps.includes(parseInt(stamp.dataset.id))) {
            stamp.classList.add('collected');
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

window.onload = initializeStamps;

// URLパラメータからスタンプIDを取得して収集
const urlParams = new URLSearchParams(window.location.search);
const stampId = urlParams.get('id');
if (stampId) {
    collectStamp(parseInt(stampId));
}
