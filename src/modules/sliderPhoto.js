const sliderPhoto = () => {
    const gallerySlider = document.querySelector('.gallery-slider'),
        slide = gallery.querySelectorAll('.slide'),
        dot = gallery.querySelectorAll('.slider-dots');

    let currentSlide = 0,
        interval; // счётчик слайдов и точек

    const prevSlide = (elem, i, strClass) => { // удаление слайда
        elem[i].classList.remove(strClass);
    };

    const nextSlide = (elem, i, strClass) => { // переключение на след слайд
        elem[i].classList.add(strClass);
    }

    gallerySlider.addEventListener('click', (event) => { // слушатель событий на ручное переключение слайдов
        event.preventDefault();
        let target = event.target;

        if(!target.matches('.slider-arrow, .slider-dots')) { // если пользователь нажал не на точки или не на стрелки то прервём слушатель событий
            return;
        }

        prevSlide(slide, currentSlide, 'slide-active'); // // удаляем класс актив у слайда
        prevSlide(dot, currentSlide, 'active'); // удаляем класс актив у точки

        if(target.matches('.slider-arrow.next')) { // если пользователь нажал на кнопку вправо то увеличим счётчик
            currentSlide++;
        }else if(target.matches('.slider-arrow.prev')) { // если пользователь нажал на кнопку влево то уменьшим счётчик
            currentSlide--;
        }else if(target.matches('.slider-dots')) { // если пользователь нажал на точку то переберём все точки
            dot.forEach((elem, index) => {
                if(elem === target) {  // если мы нашли нужную точку которая соответствует таргету
                    currentSlide = index; // счётчику присваиваем нужный индекс
                }
            })
        }

        if(currentSlide >= slide.length) { // если счётчик выходит за рамки колличества слайдов то возвращаем его к первому
            currentSlide = 0;
        }

        if(currentSlide < 0) { // обратное переключение с 0 на последний 
            currentSlide = slide.length - 1;
        }

        nextSlide(slide, currentSlide, 'slide-active'); // вывод активного слайда
        nextSlide(dot, currentSlide, 'active'); // вывод активной точки
    })

    const autoPlaySlide = () => { // автоматическое переключение слайдов
        prevSlide(slide, currentSlide, 'slide-active'); // удаляем класс актив у слайда
        prevSlide(dot, currentSlide, 'active'); // удаляем класс актив у точки

        currentSlide++; // получаем номер след слайда и кнопки

        if(currentSlide >= slide.length){ // если счётчик выходит за рамки колличества слайдов то возвращаем его к первому
            currentSlide = 0;
        };

        nextSlide(slide, currentSlide, 'slide-active'); // добавляем класс следующему слайду
        nextSlide(dot, currentSlide, 'active'); // добавляем класс следующей точке
    };

    const startSlide = () => { // запуск автоматического переключения слайдов с интервалом
        interval = setInterval(autoPlaySlide, 3000);
    };
    
    const stopSlide = () => { // отключение автоматического переключения слайдов с интервалом
        clearInterval(interval);
    }

    gallerySlider.addEventListener('mouseover', () => { // если пользователь находится на точках или стрелках то останавливаем автоматическое переключение
        stopSlide();
    })

    gallerySlider.addEventListener('mouseout', () => { // если пользователь покинул точки или стрелки то запускаем автоматическое переключение
        startSlide();
    })

    startSlide();

}

export default sliderPhoto;