// visitor-tracker.js
// Функція для отримання IP адреси відвідувачів
async function getVisitorIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Помилка при отриманні IP:', error);
        return 'невідомо';
    }
}

// Функція для отримання інформації про локацію на основі IP
async function getLocationInfo(ip) {
    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();
        return {
            country: data.country_name || 'невідомо',
            city: data.city || 'невідомо',
            region: data.region || 'невідомо'
        };
    } catch (error) {
        console.error('Помилка при отриманні інформації про локацію:', error);
        return { country: 'невідомо', city: 'невідомо', region: 'невідомо' };
    }
}
function getKyivTime() {
    const now = new Date();

    // Створюємо рядок дати/часу в київському часовому поясі
    const options = {
        timeZone: 'Europe/Kiev',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };

    return new Intl.DateTimeFormat('uk-UA', options).format(now);
}
// Головна функція для відстеження візитів
async function trackVisit() {
    const visitTimestamp = getKyivTime();

    const visitorIP = await getVisitorIP();
    const locationInfo = await getLocationInfo(visitorIP);
    const userAgent = navigator.userAgent;

    const visitData = {
        timestamp: visitTimestamp,
        ip: visitorIP,
        country: locationInfo.country,
        city: locationInfo.city,
        region: locationInfo.region,
        userAgent: userAgent,
        page: window.location.pathname
    };

    // Отримуємо поточні дані
    let visitsData = JSON.parse(localStorage.getItem('visitsData')) || [];
    visitsData.push(visitData);

    // Зберігаємо оновлені дані
    localStorage.setItem('visitsData', JSON.stringify(visitsData));

    // Оновлюємо лічильник
    updateVisitorCounter(visitsData.length);
}

// Функція для оновлення лічильника на сторінці
function updateVisitorCounter(count) {
    // Перевіряємо, чи існує лічильник
    let counterElement = document.getElementById('visitor-counter');

    // Якщо не існує, створюємо його
    if (!counterElement) {
        counterElement = document.createElement('div');
        counterElement.id = 'visitor-counter';
        counterElement.style.position = 'fixed';
        counterElement.style.bottom = '10px';
        counterElement.style.right = '10px';
        counterElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        counterElement.style.color = 'white';
        counterElement.style.padding = '8px 12px';
        counterElement.style.borderRadius = '20px';
        counterElement.style.fontSize = '14px';
        counterElement.style.fontWeight = 'bold';
        counterElement.style.cursor = 'pointer';
        counterElement.style.zIndex = '9999';
        counterElement.style.opacity = '0';

        // Додаємо обробник подій для відкриття логів
        counterElement.addEventListener('click', showVisitsLog);

        document.body.appendChild(counterElement);
    }

    // Оновлюємо текст лічильника
    counterElement.textContent = `👁️ ${count}`;
}

function showVisitsLog() {
    // Перевіряємо, чи є дані
    const visitsData = JSON.parse(localStorage.getItem('visitsData')) || [];

    if (visitsData.length === 0) {
        alert('Немає даних про відвідування');
        return;
    }

    // Створюємо BOM (Byte Order Mark) для коректного розпізнавання UTF-8
    const BOM = "\uFEFF";

    // Формуємо CSV рядок для Excel з BOM на початку
    let csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(BOM);

    // Додаємо заголовок
    csvContent += encodeURIComponent('Дата і час,IP-адреса,Країна,Місто,Регіон,User Agent,Сторінка\n');

    // Додаємо дані
    visitsData.forEach(visit => {
        const row = [
            visit.timestamp,
            visit.ip,
            visit.country,
            visit.city,
            visit.region,
            visit.userAgent,
            visit.page
        ].map(value => `"${value}"`).join(',');

        csvContent += encodeURIComponent(row + '\n');
    });

    // Створюємо елемент для завантаження
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `visits_${new Date().toISOString().slice(0, 10)}.csv`);

    // Імітуємо клік для завантаження файлу
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Запускаємо відстеження при завантаженні сторінки
document.addEventListener('DOMContentLoaded', trackVisit);