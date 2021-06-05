const clubsBurgerMenu = (btn, menu) => {
    const clubsListBtn = document.querySelector(btn); // кнопка выбрать клуб
    const clubsListMenu = document.querySelector(menu); // выпадающее меню

    clubsListBtn.addEventListener('click', () => { // слушатель событий на клик по кнопке
        if(clubsListMenu.style.display === 'block') { // если кнопка имеет block то заменяем на none
            clubsListMenu.style.display = 'none';
        }else { // если кнопка имеет none то заменяем на block
            clubsListMenu.style.display = 'block';
        }
    })
}

export default clubsBurgerMenu;