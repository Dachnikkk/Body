function validation() {
    const inputsName = document.querySelectorAll('input');
    inputsName.forEach((item) => {
        if(item.name === 'name'){
            item.addEventListener('input', (e) => { // вешаем слушатель на ввод
                if (e.target.value !== '') { // если строка не пустая
                    if (!e.target.value.match(/([а-я]|\s)$/gi)) { // если это не кирилица и не пробел
                            e.target.value = e.target.value.split('').slice(0, e.target.value.length - 1).join(''); // мы вырезаем строку и вставляем в value без последнего элемента
                    }
                }
            })
        }
    })
}

export default validation;