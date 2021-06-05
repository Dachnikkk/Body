const calc = () => {
    const priceTotal = document.querySelector('#price-total'); // цена
    const form = document.querySelector('#card_order'); // форма
    const time = document.querySelector('.time'); // время
    const checkBoxMozaika = document.querySelector('#card_leto_mozaika'); // чекбокс мозаики
    const checkBoxSchelkovo = document.querySelector('#card_leto_schelkovo'); // чекбокс щелково
    const promoInput = form.querySelector('.input-text').children[0];// поле промокода
    const promo = 'ТЕЛО2020'; // промокод
    let promoConfirm = false; // подтверждён или не подтверждён промокод
    
    let checkboxClubValue = checkBoxMozaika.value; // запишем в переменную по стандарту чекбокс = мозаика
    let checkboxTimeValue = '1'; // по стандарту время = 1 месяцу

    form.addEventListener('input', (event) => { 
        if(event.target === checkBoxMozaika){ // если change произошел на чекбосе мозаики
            checkboxClubValue = checkBoxMozaika.value; // запишем в переменную мозаику
            changePrice(); // изменим цену
        }else if(event.target === checkBoxSchelkovo) { // если change произошел на чекбосе щелково
            checkboxClubValue = checkBoxSchelkovo.value; // запишем в переменную щелково
            changePrice(); // изменим цену
        }else if(event.target === promoInput) { // если это поле инпута промокода
            if(event.target.value === promo) { // если это наш промокод
                promoConfirm = true; // подтверждаем промокод
                changePrice(); // запускаем измение цены
            }else { // если не наш промокод
                promoConfirm = false; // убераем подтверждение промокода
                changePrice(); // меняем цену
            }
        }
    })

    time.addEventListener('change', (event) => { // если в блоке time изменяется время
        checkboxTimeValue = event.target.value; // запишем время в переменную
        changePrice(); // изменим цену
    })

    const promocode = (price) => { // изменение цен
        if(promoConfirm){ // если промокод верный
            priceTotal.textContent = Math.round(price * 0.7); // -30%
        }else { // если промокод неверный 
            priceTotal.textContent = price;
        }
    };
 
    const changePrice = () => { //функция изменения цены
        if(checkboxClubValue === 'mozaika' && checkboxTimeValue === '1'){
            promocode(1999);
        }else if(checkboxClubValue === 'mozaika' && checkboxTimeValue === '6'){
            promocode(9900);
        }else if(checkboxClubValue === 'mozaika' && checkboxTimeValue === '9'){
            promocode(13900);
        }else if(checkboxClubValue === 'mozaika' && checkboxTimeValue === '12'){
            promocode(19900);
        }else if(checkboxClubValue === 'schelkovo' && checkboxTimeValue === '1'){
            promocode(2999);
        }else if(checkboxClubValue === 'schelkovo' && checkboxTimeValue === '6'){
            promocode(14990);
        }else if(checkboxClubValue === 'schelkovo' && checkboxTimeValue === '9'){
            promocode(21990);
        }else if(checkboxClubValue === 'schelkovo' && checkboxTimeValue === '12'){
            promocode(24990);
        }
    }

}

export default calc;