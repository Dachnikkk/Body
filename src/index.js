'use strict';

import clubsBurgerMenu from './modules/clubsBurgerMenu';
import openClosePopup from './modules/openClosePopup';
import slider from './modules/slider';
import formConfirm from './modules/formConfirm';
import calc from './modules/calc';
import scroll from './modules/scroll'
import modal from './modules/modal'
import maskPhone from './modules/maskPhone'
import validation from './modules/validation'
import sliderPhoto from './modules/sliderPhoto'

try{
    // Меню бургеров на клубы
    clubsBurgerMenu('.clubs-list', '.clubs-ul');
} catch(error) {
    
}

try{
    // открытие попап окна 'запись на бесплатный визит'
    openClosePopup('.open-popup', '#free_visit_form');
} catch(error) {
    
}

try{
    // открытие и закрытие бургер меню на 768px>
    openClosePopup('.menu-button', '.popup-menu');
} catch(error) {
    
}


try{
    // Запись на бесплатный визит
    formConfirm('form2');
} catch(error) {
    
}

try{
    // открытие попап окна 'перезвоните мне'
    openClosePopup('.callback-btn', '#callback_form');
} catch(error) {
    
}

try{
    // Запись на перезвон
    formConfirm('form1');
} catch(error) {
    
}

try{
    // Подарок
    openClosePopup('.fixed-gift', '#gift');
} catch(error) {
    
}

try{
    // Главный слайдер
    slider();
} catch(error) {
    
}

try{
    // Запись на бесплатный визит на странице
    formConfirm('banner-form');
} catch(error) {
    
}

try{
    // калькулятор
    calc();
} catch(error) {
    
}

try{
    // скролл
    scroll();
} catch(error) {
    
}

try{
    // Запись на перезвон
    formConfirm('card_order');
} catch(error) {
    
}

try{
    // Запись в footer
    formConfirm('footer_form');
} catch(error) {
    
}

try{
    // модальное окно thanks
    modal();
} catch(error) {
    
}

try{
    // Валидация номера в footer
    maskPhone('#callback_footer_form-phone');
} catch(error) {
    
}

try{
    // Валидация номера на калькуляторе
    maskPhone('#callback_form-phone');
} catch(error) {
    
}

try{
    // Валидация номера на странице
    maskPhone('#phone');
} catch(error) {
    
}

try{
    // Валидация номера на перезвоне
    maskPhone('#callback_form1-phone');
} catch(error) {
    
}


try{
    // Валидация номера на бесплатном визите
    maskPhone('#callback_form2-phone');
} catch(error) {
    
}

try{
    // Валидация имен
    validation();
} catch(error) {
    
}

try{ // слайдер для фото
    sliderPhoto();
} catch(error) {

}


