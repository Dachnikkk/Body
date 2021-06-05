const openClosePopup = (classBtn, classPopup) => {
    const btn = document.querySelector(`${classBtn}`); // конпка
    const popup = document.querySelector(`${classPopup}`); // попап окно
    
    btn.addEventListener('click', () => { // функция открывания попап окна
        if(!popup.style.display || popup.style.display === 'none') { 
            popup.style.display = 'block'; // открываем окно
            if(btn.classList[0] === 'fixed-gift') { // если кнопка подарка
                const closeBtn = popup.querySelector('.close-btn'); // кнопка ок у подарка
                closeBtn.addEventListener('click', () => {
                    popup.style.display = 'none'; // закрывание окна
                })
                btn.style.display = 'none'; // убираем её
            }
        }
    })

    popup.addEventListener('click', (event) => { // функция закрывания попап окна
        let target = event.target;
        if(target.classList.contains('close_icon')){ // если это крестик
            popup.style.display = 'none'; // закрываем 
        }else if(target.closest('.popup-menu')){ // если это топ меню то нам не нужно закрывать его при нажатии на окно
        }else {
            target = target.closest('.form-content'); // всплытием поднимаемся вверх
            if(!target) { // если это не попап тогда это подложка
                popup.style.display = 'none'; // закрываем окно
            }
        }
    })
}

export default openClosePopup;