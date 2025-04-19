// Получаем элементы DOM
const phoneBtn = document.getElementById('phoneBtn');
const telegramBtn = document.getElementById('telegramBtn');
const vkBtn = document.getElementById('vkBtn');
const modal = document.getElementById('qrModal');
const modalTitle = document.getElementById('modalTitle');
const qrImage = document.getElementById('qrImage');
const closeBtn = document.querySelector('.close');

// Обработчики кнопок
phoneBtn.addEventListener('click', () => {
    showQRCode('Телефон', 'images/phone-qr.png');
});

telegramBtn.addEventListener('click', () => {
    showQRCode('Telegram', 'images/telegram-qr.png');
});

vkBtn.addEventListener('click', () => {
    showQRCode('VK', 'images/vk-qr.png');
});

// Функция показа QR-кода
function showQRCode(title, imageSrc) {
    modalTitle.textContent = title;
    qrImage.src = imageSrc;
    modal.style.display = 'block';
}

// Закрытие модального окна
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Регистрация Service Worker для PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => console.log('SW registered'))
        .catch(err => console.error('SW registration failed:', err));
    });
  }

// Обработчик события beforeinstallprompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Предотвращаем автоматическое отображение подсказки
    e.preventDefault();
    // Сохраняем событие для последующего использования
    deferredPrompt = e;
    // Показываем кнопку установки (можно добавить свою кнопку в интерфейсе)
    showInstallPromotion();
});

function showInstallPromotion() {
    // Здесь можно добавить свою кнопку для установки приложения
    console.log('Приложение доступно для установки');
}

// Функция для вызова установки
function promptInstall() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Пользователь согласился установить приложение');
            } else {
                console.log('Пользователь отказался от установки');
            }
            deferredPrompt = null;
        });
    }
}

// Проверка соединения при загрузке
window.addEventListener('load', () => {
    if (!navigator.onLine) {
      // Перенаправляем на offline.html если нет соединения
      if (!window.location.pathname.includes('offline.html')) {
        window.location.href = './offline.html';
      }
    }
  });
  
  // Отслеживаем изменения соединения
  window.addEventListener('offline', () => {
    if (!window.location.pathname.includes('offline.html')) {
      window.location.href = './offline.html';
    }
  });
  
  window.addEventListener('online', () => {
    if (window.location.pathname.includes('offline.html')) {
      window.location.href = '/';
    }
  });
