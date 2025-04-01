const slidesToShow = 5; // Количество видимых элементов
const slidesToScroll = 3; // Количество слайдов при прокрутке
const slidesTotal = 10; // Всего слайдов

const track = document.querySelector(".slider-track");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const styles = window.getComputedStyle(track);
const gap = parseFloat(styles.getPropertyValue('gap'));

let isAnimating = true;

// Создаём слайды динамически
for (let i = 1; i <= slidesTotal; i++) {
    const slide = document.createElement("div");
    slide.classList.add("slide");
    slide.textContent = i;
    track.appendChild(slide);
}

// Рассчитываем ширину слайдов динамически
function updateSlideWidth() {
    const containerWidth = document.querySelector(".slider-container").offsetWidth;    
    const slideWidth = containerWidth / slidesToShow - track.offsetWidth * gap / 100; // Вычитаем gap

    document.querySelectorAll(".slide").forEach(slide => {
        slide.style.flex = `0 0 ${slideWidth}px`;
    });
}

let currentIndex = 0;

// Обновление слайдера
function updateSlider() {
    const slideWidth = track.children[0].offsetWidth + track.offsetWidth * gap / 100; // Учитываем gap

     // Если анимация должна быть включена (кнопка нажата), убираем класс 'no-animation'
    if (isAnimating) {
        track.classList.remove("no-animation");
    } else {
        track.classList.add("no-animation"); // Если анимация не нужна, добавляем класс
    }

    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= slidesTotal - slidesToShow;
}

// Обработчики событий
prevBtn.addEventListener("click", () => {
    isAnimating = true; 
    if (currentIndex > 0) {
        currentIndex = Math.max(0, currentIndex - slidesToScroll);
        updateSlider();
    }   
});

nextBtn.addEventListener("click", () => {
    isAnimating = true; 
    if (currentIndex < slidesTotal - slidesToShow) {
        currentIndex = Math.min(slidesTotal - slidesToShow, currentIndex + slidesToScroll);
        updateSlider();
    }
});

// Инициализация
updateSlideWidth();
updateSlider();
window.addEventListener("resize", () => {
    isAnimating = false;
    updateSlideWidth();
    updateSlider();
}); // Пересчитывать размеры при изменении окна
