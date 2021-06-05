const closeModal = () => { // закрытие модального окна 
    const modal = document.querySelector('#thanks') // модальное окно

    const formContent = modal.querySelector('.form-content'); // форма модального окна
    const header = formContent.querySelector('h4'); // header формы
    const text = formContent.querySelector('p'); // text формы

    modal.addEventListener('click', (event) => { // функция закрывания модалки
        let target = event.target;
        if(target.classList.contains('close_icon')){ // если это крестик
            modal.style.display = 'none'; // закрываем окно
            modalReset(); // откатываем модальное окно на положительны результат
        }else if(target.classList.contains('close-btn')){
            modal.style.display = 'none'; // закрывание окна
            modalReset() // откатываем модальное окно на положительны результат
        }else {
            target = target.closest('.form-content'); // всплытием поднимаемся вверх
            if(!target) { // если это не попап тогда это подложка
                modal.style.display = 'none'; // закрываем окно
                modalReset();// откатываем модальное окно на положительны результат
            }
        }
    })

    const modalReset = () => {
        header.textContent = 'СПАСИБО!';
        text.textContent = 'Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.';
    }
}

export default closeModal;