const formConfirm = (id) => {
    const form = document.querySelector(`#${id}`); // форма
    const modal = document.querySelector('#thanks') // модальное окно
    const formContent = modal.querySelector('.form-content'); // форма модального окна
    const header = formContent.querySelector('h4'); // header формы
    const text = formContent.querySelector('p'); // text формы

    const errorMessage = 'Что то пошло не так...', // зададим подготовленные тексты для прогресса
        loadMessage = 'Загрузка...';
    
    const statusMessage = document.createElement('div'); // создаём див где будет прогресс
    form.appendChild(statusMessage); // добавим прогресс на страницу

    const createForm = (target) => { // создание запроса
        statusMessage.style.cssText = 'font-size: 2rem; color: white;'; // зададим стили для текста прогресса
        statusMessage.textContent = loadMessage; // добавим текст прогресса
 
        const formData = new FormData(target); // запишем данные формы 
        let body = {};

        formData.forEach((val, key) => { // перебор для записи значений формы в объект
            body[key] = val;
        })

        const outputData = (form) => { // функция очистки инпутов
            const inputs = form.querySelectorAll('input'); // найдём инпуты
            inputs.forEach((item) => {
                if(item.type === 'radio'){  // не надо очищать value у инпутов времени

                }else if(item.name === 'form_name'){ // не надо очищать value у самой формы

                }else {
                    item.value = '' // очистим инпуты
                }
            })
            statusMessage.textContent = ''; // убираем 'загрузка' со страницы
        }

        const postData = (body) => { // запрос на сервер

            return fetch('./server.php', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
                credentials: 'include'
            })
        }
        postData(body, form)
            .then((response) => {
                if(response.status !== 200){
                    throw new Error('status network not 200');
                }
                if(id === 'card_order') { // если это форма калькулятор
                    defaultCalc(); // вернём к стандартным значениям все инпуты
                }
                if(id === 'footer_form') { // если это форма footer
                    defaultFooter(); // вернём к стандартным значениям все инпуты
                }
                const popup = form.closest('.popup'); // найдём попап окно
                if(popup) {
                    popup.style.display = 'none'; // закроем его
                }
                modal.style.display = 'flex'; //открываем модальное окно
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 3000)
                outputData(form);
            }) 
            .catch(error => {
                if(id === 'card_order') { // если это форма калькулятор
                    defaultCalc(); // вернём к стандартным значениям все инпуты
                }
                if(id === 'footer_form') { // если это форма footer
                    defaultFooter(); // вернём к стандартным значениям все инпуты
                }
                const popup = form.closest('.popup'); // найдём попап окно
                if(popup) {
                    popup.style.display = 'none'; // закроем его
                }
                modal.style.display = 'flex'; //открываем модальное окно
                header.textContent = 'Упс...'; // заменяем текст в header
                text.textContent = errorMessage; // заменяем текст 
                outputData(form);
                console.error(error)
            });

    }

    const defaultCalc = () => { // обнуление формы калькулятора
        const priceTotal = document.querySelector('#price-total'); // цена
        const checkBoxMozaika = document.querySelector('#card_leto_mozaika'); // чекбокс мозаики
        const time = document.querySelector('.time'); // время
        const cardsTypes = document.querySelector('.cards-types'); // карточки с мозаики или щелково
        if(cardsTypes) { // если это калькулятор на странице мозаика или щёлково
            const firstCard = cardsTypes.children[0]; // первая карточка

            firstCard.checked = true; // обнуляем на неё
        }else { // если это калькулятор на главной странице
            const firstTime = time.children[0]; // 1 месяц
            priceTotal.textContent = 1999; // обнуляем цену на цену 1 месяц
            checkBoxMozaika.checked = true; // вернём чекбокс на мозаику
            firstTime.checked = true; // возвращаем чекбокс на 1 месяц
        }
    };

    const defaultFooter = () => { // обнуление формы footer
        const checkBoxMozaika = document.querySelector('#footer_leto_mozaika');
        checkBoxMozaika.checked = true;
    };

    const satusMessageError = (text) => {
        statusMessage.textContent = text;
        statusMessage.style.cssText = 'font-size: 1.2rem; color: red;'; // зададим стили для текста прогресса
    }

    const checking = () => { // проверка чекбокса
        const inputs = form.querySelectorAll('input');
        let checkBox, // чекбокс(заведём переменную чтобы вытащить из цикла)
            phone,// телефон(заведём переменную чтобы вытащить из цикла)
            name; // имя(заведём переменную чтобы вытащить из цикла)
        inputs.forEach((item) => { // переберём все инпуты чтобы найти чекбокс
            if(item.type === 'checkbox'){  // если есть тип чекбокс
                checkBox = item; // запишем в чекбокс
            }else if(item.name === 'phone') { // если у инпута есть имя phone
                phone = item; // запишем в phone
            }else if(item.name === 'name') { // если у инпута есть имя phone
                name = item; // запишем в phone
            }
        })
        let phoneArr = phone.value.split(''); // строку представим как массив
        let nameArr = name.value.split(''); // строку представим как массив
        if(phoneArr.length != 18){ // если в телефоне не хватает символов
            satusMessageError('Номер телефона введён некорректно!'); // выведем сообщение
            return false;
        }
        if(nameArr.length < 3) {// если в поле ввода имени менее 3 символов
            satusMessageError('Имя введёно некорректно!'); // выведем сообщение
            return false;
        }
        if(id === 'footer_form') { // если у формы нет чекбокса с конфедициальностью 
            return true
        }
        if(checkBox.checked ) {// если чекбокс чекнут
            checkBox.checked = false; // убераем чек и переходим дальше
            return true // вернём true
        } else { // если чекбокс не чекнут
            satusMessageError('Подтвердите обработку персональных данных!');
            return false; // вернём false
        }
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // при прянитии формы убираем обновление страницы
        if(checking()){ // проверим чекбокс 
            createForm(event.target) // если чекнут то продолжим отправку формы
        } else {
            return // иначе завершим
        }
    })

}

export default formConfirm;