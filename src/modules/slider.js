const slider = () => {
    const slides = Array.from(document.querySelector('.main-slider').children); // все слайды
    const maxSlides = slides.length - 1; // всего слайдов 
    let slideNow = 0; // слайд сейчас

    const delSlide = (slideNow) => { // функция удаления слайда
        slides[slideNow].style.display = 'none';
    }

    const addSlide = (slideNow) => { // функция добавления слайда
        slides[slideNow].style.display = 'flex';
    }    

    setInterval(() => { // каждые 3 секунды
        delSlide(slideNow); // удаляем слайд
        if(slideNow === maxSlides){ // если это последний слайд
            slideNow = 0; // делаем первым
        }else { // иначе
            slideNow++; // следующий слайд
        }
        addSlide(slideNow); // добавление слайда на экран
    },3000)

}

export default slider;