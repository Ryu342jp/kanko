const customStampIDs = [101, 202, 303, 404, 505];

function initializeStamps() {
    updateStamps();
}

function updateStamps() {
    const stamps = JSON.parse(localStorage.getItem('stamps') || '[]');
    document.querySelectorAll('.stamp').forEach((stamp) => {
        const stampId = parseInt(stamp.dataset.id);
        if (stamps.includes(stampId)) {
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
