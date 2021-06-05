const scroll = () => {
    const totop = document.querySelector('#totop'); // кнопка стрелка
    const topMenu = document.querySelector('.top-menu'); // топ меню
    window.addEventListener('scroll', () => { // слушатель событий на скролл
        let scrollTop = document.documentElement.scrollTop; // положение от верха страницы до текущего 
        if(scrollTop >= 186) { // если попадаем на топ меню
            topMenu.style.position = 'fixed' // фиксируем его сверху
        }else{ // если мы идём выше чем топ меню
            topMenu.style.position = 'relative'; // меню остаётся на месте
        }
        if(scrollTop >= 600) { // если прошли первый блок 
            totop.style.display = 'block'; // появляется стрелка
        }else{ // если мы на первом блоке
            totop.style.display = 'none'; // пропадает стрелка
        }
    })
}

export default scroll;