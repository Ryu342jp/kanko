// カスタムスタンプIDの設定
const customStampIDs = [101, 202, 303, 404, 505];

const totalStamps = customStampIDs.length;

function initializeStamps() {
    const stampContainer = document.getElementById('stamp-container');
    for (let i = 0; i < totalStamps; i++) {
        const stamp = document.createElement('div');
        stamp.className = 'stamp';
        stamp.textContent = customStampIDs[i];
        stampContainer.appendChild(stamp);
    }
    updateStamps();
}

function updateStamps() {
    const stamps = JSON.parse(localStorage.getItem('stamps') || '[]');
    document.querySelectorAll('.stamp').forEach((stamp, index) => {
        if (stamps.includes(customStampIDs[index])) {
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
        alert(`スタンプ${id}を獲得しました`);
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
