document.addEventListener('DOMContentLoaded', () => {
    const stamps = document.querySelectorAll('.stamp');
    const message = document.getElementById('message');
    const targetLat = 32.80867009224347;
    const targetLon = 129.8743798718864;
    const maxDistance = 500; // メートル

    stamps.forEach(stamp => {
        stamp.addEventListener('click', () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => checkLocationAndStamp(position, stamp),
                    error => {
                        message.textContent = '位置情報の取得に失敗しました。';
                    }
                );
            } else {
                message.textContent = 'お使いのブラウザは位置情報をサポートしていません。';
            }
        });
    });

    function checkLocationAndStamp(position, stamp) {
        try {
            const distance = calculateDistance(
                position.coords.latitude,
                position.coords.longitude,
                targetLat,
                targetLon
            );

            if (distance <= maxDistance) {
                stampCollected(stamp);
            } else {
                message.textContent = '指定された場所に近づいてください（現在の距離: ' + Math.round(distance) + 'm）';
            }
        } catch (error) {
            console.error('位置情報の計算中にエラーが発生しました:', error);
            message.textContent = '位置情報の取得に問題が発生しました。再度お試しください。';
        }
    }

    navigator.geolocation.getCurrentPosition(
        position => checkLocationAndStamp(position, stamp),
        error => {
            console.error('位置情報の取得に失敗しました:', error);
            message.textContent = '位置情報の取得に失敗しました。ブラウザの設定をご確認ください。';
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );

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

        return R * c;
    }

    function stampCollected(stamp) {
        if (!stamp.classList.contains('stamped')) {
            stamp.classList.add('stamped');
            const stampId = stamp.getAttribute('data-id');
            // ここで画像を追加するか、色を変更します
            // 例: stamp.style.backgroundImage = `url('stamp_${stampId}.png')`;
            message.textContent = `スタンプ ${stamp.textContent} を獲得しました！`;
        } else {
            message.textContent = 'このスタンプは既に獲得済みです。';
        }
    }
});
