'use strict';

class SliderCarousel{ 
    constructor({main, wrap, next, prev, position = 0, slidesToShow = 4, responsive = []}) {
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.slides = document.querySelector(wrap).children;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow // колл-во слайдов на экране
        this.position = 0,
        this.options = {
            position, // начальная позиция
            widthSlide: Math.floor(100 / this.slidesToShow) // вычисление процента на каждый видимый слайд для flex
        },
        this.responsive = responsive,
        this.interval;
    }

    init() {
        this.addClass(); 
        this.addStyle();
        this.controlSlider();
        this.responseInit();
        this.startSlide();
    }

    addClass() { // функция добавления кастомных классов
        this.main.classList.add('plugin-slider');
        this.wrap.classList.add('plugin-slider__wrap');
        for(const item of this.slides) {
            if(item.tagName === 'DIV') {
                item.classList.add('plugin-slider__item');
            }
        }
    }

    addStyle() { // добавление стилей
        let style = document.querySelector('#sliderCarousel-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderCarousel-style';
        }
        style.textContent = `
        .plugin-slider {
            overflow: hidden !important; 
            padding-left: 0 !important; 
            padding-right: 0 !important; 
        }
        .plugin-slider__wrap {
            display: flex !important;
            transition: transform 0.5s !important;
            will-change: transform !important;
        }

        .plugin-slider__item {
            flex: 0 0 ${this.options.widthSlide}% !important;
            margin: 0 0 !important;
        }
        `
        document.head.appendChild(style); // занесём стили в head
    }

    controlSlider() { // функция навешивающая слушатели событий на кнопки
        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', this.nextSlider.bind(this));
        this.main.addEventListener('mouseover', this.stopSlide.bind(this));// если пользователь находится на слайдере то останавливаем автоматическое переключение
        this.main.addEventListener('mouseout', this.startSlide.bind(this)); // если пользователь покинул слайдер то запускаем автоматическое переключение
    }

    prevSlider() { // если пользователь нажал на кнопку назад
        if(this.options.position > 0) { // проверяем если это не начальный элемент то выполняем следующие действия
            --this.options.position; // уменьшаем счётчик на 1
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`; // передвигаем влево
        }else {
            this.options.position = this.slides.length - 5;
            this.wrap.style.transition = "none";
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
        
    }

    nextSlider() { // если пользователь нажал на кнопку вперёд
        if(this.options.position < this.slides.length - this.slidesToShow) { // проверяем если это не последний элемент
            ++this.options.position; // увеличиваем счётчик на 1
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`; // передвигаем вправо
        }else {
            this.options.position = 0;
            this.wrap.style.transition = "none";
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }

    startSlide() { // запуск автоматического переключения слайдов с интервалом
        this.interval = setInterval(this.nextSlider.bind(this), 3000);
    };
    
    stopSlide() { // отключение автоматического переключения слайдов с интервалом
        clearInterval(this.interval);
    }

    responseInit(){ // адаптив для слайдера
        const slidesToShowDefault = this.slidesToShow; // слайдов по дефолту
        const allResponse = this.responsive.map(item => item.breakpoint); // получим все брейкпоинты и вынесем их в отдельный массив 
        const maxResponse = Math.max(...allResponse); // максималньное разрешение
        const checkResponse = () => { // функция проверки разрешения
            const widthWindow =  document.documentElement.clientWidth; // разрешение экрана 
            if(widthWindow < maxResponse) { // если мы подошли к самому первому разрешению при котором нам нужно менять кол-во элементов в слайдере
                for(let i = 0; i < allResponse.length; i++) {
                    if(widthWindow < allResponse[i]) { // если разрешение экрана меньше брейкпоинта
                        this.slidesToShow = this.responsive[i].slidesToShow; // запишем колличество элементов которое мы должны показать
                        this.options.widthSlide = Math.floor(100 / this.slidesToShow); // расчитаем размер под них для flex
                        this.addStyle(); // заменим значение в стилях
                    }
                }
            }else { // иначе ставим дефолтные значения
                this.slidesToShow = slidesToShowDefault; // запишем колличество слайдов
                this.options.widthSlide = Math.floor(100 / this.slidesToShow); // рассчитаем для них размер под них для flex
                this.addStyle(); // заменим значение в стилях
            }
        };

        window.addEventListener('resize', checkResponse); // слушатель событий на изменение разрешения экрана

    }

}