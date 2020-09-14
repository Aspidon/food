import tabs from './modules/tabs';
import slider from './modules/slider';
import cards from './modules/cards';
import forms from './modules/forms';
import calc from './modules/calc';
import modal from './modules/modal';
import timer from './modules/timer';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);
    // Изменил значение, чтобы не отвлекало

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    cards();
    forms('form', modalTimerId);
    calc();
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2020-09-30');
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        slide: '.offer__slide'
    });

});