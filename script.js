// script.js

// Данные работ (в реальном приложении будут загружаться с сервера)

const worksData = [
    {
        id: 1,
        title: "Анализ рынка недвижимости в Москве",
        subject: "economics",
        type: "coursework",
        price: 2500,
        pages: 35,
        year: 2023,
        description: "Подробный анализ текущего состояния рынка недвижимости в Москве с прогнозами на будущее.",
        reserved: false
    },
    {
        id: 2,
        title: "Правовые аспекты цифровой экономики",
        subject: "law",
        type: "diploma",
        price: 5500,
        pages: 85,
        year: 2022,
        description: "Комплексное исследование правовых вопросов, возникающих в условиях развития цифровой экономики.",
        reserved: false
    },
    {
        id: 3,
        title: "Влияние стресса на производительность труда",
        subject: "psychology",
        type: "coursework",
        price: 2200,
        pages: 30,
        year: 2023,
        description: "Исследование взаимосвязи между уровнем стресса и производительностью сотрудников.",
        reserved: false
    },
    {
        id: 4,
        title: "Разработка системы управления базами данных",
        subject: "engineering",
        type: "diploma",
        price: 6000,
        pages: 90,
        year: 2022,
        description: "Проектирование и реализация системы управления базами данных для предприятия.",
        reserved: true
    },
    {
        id: 5,
        title: "Этические проблемы современной медицины",
        subject: "medicine",
        type: "essay",
        price: 1500,
        pages: 15,
        year: 2023,
        description: "Анализ основных этических дилемм, возникающих в современной медицинской практике.",
        reserved: false
    },
    {
        id: 6,
        title: "Отчет по практике в юридической фирме",
        subject: "law",
        type: "report",
        price: 1800,
        pages: 25,
        year: 2023,
        description: "Подробный отчет о прохождении практики в юридической фирме с анализом выполненных задач.",
        reserved: false
    }
    ,
    {
        id: 7,
        title: "Отчет по практике в юридической фирме",
        subject: "law",
        type: "report",
        price: 1800,
        pages: 25,
        year: 2023,
        description: "Подробный отчет о прохождении практики в юридической фирме с анализом выполненных задач.",
        reserved: false
    }
    ,
    {
        id: 8,
        title: "Отчет по практике в юридической фирме",
        subject: "law",
        type: "report",
        price: 1800,
        pages: 25,
        year: 2023,
        description: "Подробный отчет о прохождении практики в юридической фирме с анализом выполненных задач.",
        reserved: false
    }
    ,
    {
        id: 9,
        title: "Отчет по практике в юридической фирме",
        subject: "law",
        type: "report",
        price: 1800,
        pages: 25,
        year: 2023,
        description: "Подробный отчет о прохождении практики в юридической фирме с анализом выполненных задач.",
        reserved: false
    },
    {
        id: 10,
        title: "Отчет по практике в юридической фирме",
        subject: "law",
        type: "report",
        price: 1800,
        pages: 25,
        year: 2023,
        description: "Подробный отчет о прохождении практики в юридической фирме с анализом выполненных задач.",
        reserved: false
    },
    {
        id: 11,
        title: "Отчет по практике в юридической фирме",
        subject: "law",
        type: "report",
        price: 1800,
        pages: 25,
        year: 2023,
        description: "Подробный отчет о прохождении практики в юридической фирме с анализом выполненных задач.",
        reserved: false
    },
    {
        id: 12,
        title: "Отчет по практике в юридической фирме",
        subject: "law",
        type: "report",
        price: 1800,
        pages: 25,
        year: 2023,
        description: "Подробный отчет о прохождении практики в юридической фирме с анализом выполненных задач.",
        reserved: false
    }
];

// DOM элементы
const worksGrid = document.getElementById('worksGrid');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const workModal = document.getElementById('workModal');
const paymentModal = document.getElementById('paymentModal');
const closeButtons = document.querySelectorAll('.close');
const exploreWorksBtn = document.getElementById('exploreWorks');
const orderWorkBtn = document.getElementById('orderWork');
const applyFiltersBtn = document.getElementById('applyFilters');
const loadMoreBtn = document.getElementById('loadMore');
const subjectFilter = document.getElementById('subject');
const workTypeFilter = document.getElementById('work-type');
const priceRangeFilter = document.getElementById('price-range');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const contactForm = document.getElementById('contactForm');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');

// Переменные состояния
let currentUser = null;
let displayedWorks = [];
let currentFilters = {
    subject: 'all',
    type: 'all',
    price: 'all'
};
let visibleWorksCount = 4;

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    loadWorks();
    setupEventListeners();
});

// Загрузка работ
function loadWorks() {
    displayedWorks = filterWorks(worksData, currentFilters);
    renderWorks(displayedWorks.slice(0, visibleWorksCount));
    
    // Скрываем кнопку "Загрузить еще", если все работы уже отображены
    if (visibleWorksCount >= displayedWorks.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Фильтрация работ
function filterWorks(works, filters) {
    return works.filter(work => {
        // Фильтр по предмету
        if (filters.subject !== 'all' && work.subject !== filters.subject) {
            return false;
        }
        
        // Фильтр по типу работы
        if (filters.type !== 'all' && work.type !== filters.type) {
            return false;
        }
        
        // Фильтр по цене
        if (filters.price !== 'all') {
            if (filters.price === 'low' && work.price > 2000) return false;
            if (filters.price === 'medium' && (work.price <= 2000 || work.price > 5000)) return false;
            if (filters.price === 'high' && work.price <= 5000) return false;
        }
        
        return true;
    });
}

// Отрисовка работ
function renderWorks(works) {
    worksGrid.innerHTML = '';
    
    works.forEach(work => {
        const workCard = document.createElement('div');
        workCard.className = 'work-card';
        
        const typeLabels = {
            'coursework': 'Курсовая',
            'diploma': 'Дипломная',
            'essay': 'Эссе',
            'report': 'Отчет'
        };
        
        const subjectLabels = {
            'economics': 'Экономика',
            'law': 'Право',
            'psychology': 'Психология',
            'engineering': 'Инженерия',
            'medicine': 'Медицина'
        };
        
        workCard.innerHTML = `
            <div class="work-image">
                <span>${subjectLabels[work.subject]}</span>
            </div>
            <div class="work-info">
                <h3 class="work-title">${work.title}</h3>
                <div class="work-meta">
                    <span>${typeLabels[work.type]}</span>
                    <span>${work.pages} стр.</span>
                    <span>${work.year} г.</span>
                </div>
                <div class="work-price">${work.price} руб.</div>
                <div class="work-actions">
                    <button class="btn btn-outline view-work" data-id="${work.id}">Подробнее</button>
                    ${work.reserved ? 
                        '<button class="btn btn-outline" disabled>Забронирована</button>' : 
                        '<button class="btn btn-primary reserve-work" data-id="${work.id}">Забронировать</button>'
                    }
                </div>
            </div>
        `;
        
        worksGrid.appendChild(workCard);
    });
    
    // Добавляем обработчики событий для кнопок
    document.querySelectorAll('.view-work').forEach(btn => {
        btn.addEventListener('click', function() {
            const workId = parseInt(this.getAttribute('data-id'));
            showWorkDetails(workId);
        });
    });
    
    document.querySelectorAll('.reserve-work').forEach(btn => {
        btn.addEventListener('click', function() {
            const workId = parseInt(this.getAttribute('data-id'));
            reserveWork(workId);
        });
    });
}

// Показать детали работы
function showWorkDetails(workId) {
    const work = worksData.find(w => w.id === workId);
    if (!work) return;
    
    const typeLabels = {
        'coursework': 'Курсовая',
        'diploma': 'Дипломная',
        'essay': 'Эссе',
        'report': 'Отчет'
    };
    
    const subjectLabels = {
        'economics': 'Экономика',
        'law': 'Право',
        'psychology': 'Психология',
        'engineering': 'Инженерия',
        'medicine': 'Медицина'
    };
    
    document.getElementById('workModalContent').innerHTML = `
        <h2>${work.title}</h2>
        <div class="work-details">
            <p><strong>Предмет:</strong> ${subjectLabels[work.subject]}</p>
            <p><strong>Тип работы:</strong> ${typeLabels[work.type]}</p>
            <p><strong>Количество страниц:</strong> ${work.pages}</p>
            <p><strong>Год написания:</strong> ${work.year}</p>
            <p><strong>Цена:</strong> ${work.price} руб.</p>
            <p><strong>Описание:</strong> ${work.description}</p>
        </div>
        <div class="work-modal-actions">
            ${work.reserved ? 
                '<button class="btn btn-outline" disabled>Забронирована</button>' : 
                '<button class="btn btn-primary" id="reserveFromModal">Забронировать</button>'
            }
        </div>
    `;
    
    if (!work.reserved) {
        document.getElementById('reserveFromModal').addEventListener('click', function() {
            reserveWork(workId);
            workModal.style.display = 'none';
        });
    }
    
    workModal.style.display = 'flex';
}

// Бронирование работы
function reserveWork(workId) {
    if (!currentUser) {
        alert('Для бронирования работы необходимо войти в систему.');
        loginModal.style.display = 'flex';
        return;
    }
    
    const work = worksData.find(w => w.id === workId);
    if (!work) return;
    
    // В реальном приложении здесь был бы запрос к серверу
    work.reserved = true;
    
    // Обновляем отображение
    loadWorks();
    
    // Показываем модальное окно оплаты
    showPaymentModal(work);
}

// Показать модальное окно оплаты
function showPaymentModal(work) {
    document.getElementById('paymentContent').innerHTML = `
        <div class="payment-details">
            <h3>Оплата работы</h3>
            <p><strong>Название:</strong> ${work.title}</p>
            <p><strong>Цена:</strong> ${work.price} руб.</p>
            
            <div class="payment-methods">
                <h4>Выберите способ оплаты:</h4>
                <div class="payment-method">
                    <input type="radio" id="card" name="payment" value="card" checked>
                    <label for="card">Банковская карта</label>
                </div>
                <div class="payment-method">
                    <input type="radio" id="yandex" name="payment" value="yandex">
                    <label for="yandex">Яндекс.Деньги</label>
                </div>
                <div class="payment-method">
                    <input type="radio" id="qiwi" name="payment" value="qiwi">
                    <label for="qiwi">QIWI Кошелек</label>
                </div>
            </div>
            
            <div class="card-details" id="cardDetails">
                <h4>Данные карты:</h4>
                <div class="form-group">
                    <input type="text" placeholder="Номер карты" required>
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Срок действия (ММ/ГГ)" required>
                </div>
                <div class="form-group">
                    <input type="text" placeholder="CVV" required>
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Имя владельца" required>
                </div>
            </div>
            
            <button class="btn btn-primary" id="processPayment">Оплатить</button>
        </div>
    `;
    
    // Обработчики для переключения методов оплаты
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const cardDetails = document.getElementById('cardDetails');
            if (this.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });
    
    // Обработчик для кнопки оплаты
    document.getElementById('processPayment').addEventListener('click', function() {
        processPayment(work);
    });
    
    paymentModal.style.display = 'flex';
}

// Обработка оплаты
function processPayment(work) {
    // В реальном приложении здесь была бы интеграция с платежной системой
    alert(`Оплата работы "${work.title}" прошла успешно! Ссылка для скачивания отправлена на вашу почту.`);
    paymentModal.style.display = 'none';
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Модальные окна
    loginBtn.addEventListener('click', () => loginModal.style.display = 'flex');
    registerBtn.addEventListener('click', () => registerModal.style.display = 'flex');
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Закрытие модальных окон при клике вне их
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // Переключение между модальными окнами входа и регистрации
    switchToRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'flex';
    });
    
    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });
    
    // Кнопки главного баннера
    exploreWorksBtn.addEventListener('click', function() {
        document.getElementById('works').scrollIntoView({ behavior: 'smooth' });
    });
    
    orderWorkBtn.addEventListener('click', function() {
        alert('Функция заказа индивидуальной работы будет доступна в ближайшее время.');
    });
    
    // Фильтры
    applyFiltersBtn.addEventListener('click', function() {
        currentFilters = {
            subject: subjectFilter.value,
            type: workTypeFilter.value,
            price: priceRangeFilter.value
        };
        visibleWorksCount = 6;
        loadWorks();
    });
    
    // Кнопка "Загрузить еще"
    loadMoreBtn.addEventListener('click', function() {
        visibleWorksCount += 6;
        renderWorks(displayedWorks.slice(0, visibleWorksCount));
        
        if (visibleWorksCount >= displayedWorks.length) {
            loadMoreBtn.style.display = 'none';
        }
    });
    
    // Формы
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // В реальном приложении здесь была бы аутентификация
        currentUser = {
            name: 'Пользователь',
            email: document.querySelector('#loginForm input[type="email"]').value
        };
        loginModal.style.display = 'none';
        alert(`Добро пожаловать, ${currentUser.name}!`);
    });
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // В реальном приложении здесь была бы регистрация
        currentUser = {
            name: document.querySelector('#registerForm input[type="text"]').value,
            email: document.querySelector('#registerForm input[type="email"]').value
        };
        registerModal.style.display = 'none';
        alert(`Регистрация прошла успешно! Добро пожаловать, ${currentUser.name}!`);
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Ваше сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
        contactForm.reset();
    });
    
    // Плавная прокрутка для навигационных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}