/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    // Calculator

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = 'none';
            }
            switch (input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }



    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();

            })
        })


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/spinner/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });



    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);





            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)

                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                })


        });
    }
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
         <div class="modal__content">                
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>                    
            </div>        
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000)

    }
    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res))
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {

    // Modal

    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });



    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });




    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
    let slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;


    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }


    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';


    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;

    })

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators')
    indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1)
        dot.style.cssText = `
         box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;`;

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);



    }
    function cutString(str) {
        return +str.replace(/\D/g, '')
    }
    function dotOpacity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }


    next.addEventListener('click', () => {
        if (offset == cutString(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += cutString(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        dotOpacity();
    })

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = cutString(width) * (slides.length - 1)
        } else {
            offset -= cutString(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        dotOpacity();
    })


    dots.forEach(dot => dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = cutString(width) * (slideTo - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;
        dotOpacity();
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

    }))
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    let tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function (event) {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function timer(id, deadline) {
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor((t / (1000 * 60 * 60 * 24))),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60) % 24));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json()
    // Метод json() превращает json в объект JS
}

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json()
    // Метод json() превращает json в объект JS
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");










window.addEventListener('DOMContentLoaded', function () {


    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('.modal', modalTimerId), 300000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', '.tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-10-10');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])();

});




























// Tabs



// Timer


// Используем классы для создание карточек меню


// getResources('http://localhost:3000/menu')
//     .then(data => createCard(data))


// function createCard(data) {
//     data.forEach(({ img, altimg, title, descr, price }) => {
//         const element = document.createElement('div');
//         element.classList.add('menu__item');
//         element.innerHTML =
//             `
//              <img src=${img} alt=${altimg}>
//             <h3 class="menu__item-subtitle">${title}</h3>
//             <div class="menu__item-descr">${descr}</div>
//             <div class="menu__item-divider"></div>
//             <div class="menu__item-price">
//                 <div class="menu__item-cost">Цена:</div>
//                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
//             </div>
//             `;
//         document.querySelector('.menu .container').append(element)
//     })
// }

// new MenuCard(
//     "img/tabs/vegy.jpg",
//     "vegy",
//     'Меню "Фитнес"',
//     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
//     9,
//     ".menu .container"
// ).render();

// new MenuCard(
//     "img/tabs/post.jpg",
//     "post",
//     'Меню "Постное"',
//     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
//     14,
//     ".menu .container"
// ).render();

// new MenuCard(
//     "img/tabs/elite.jpg",
//     "elite",
//     'Меню “Премиум”',
//     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
//     21,
//     ".menu .container"
// ).render();

// axios.get('http://localhost:3000/menu')
//     .then(data => {
//         data.data.forEach(({ img, altimg, title, descr, price }) => {
//             new MenuCard(img, altimg, title, descr, price, ".menu .container").render();

//         })

//     })

// Forms




// Slider







// const films = [
//     {
//         name: 'Titanic',
//         rating: 9
//     },
//     {
//         name: 'Die hard 5',
//         rating: 5
//     },
//     {
//         name: 'Matrix',
//         rating: 8
//     },
//     {
//         name: 'Some bad film',
//         rating: 4
//     }
// ];


// function listOfFilmsIds(arr) {
//     return arr.map((film, i) => {
//         film.id = i;
//         return film;

//     })
// }

// console.log(listOfFilmsIds(films))

// let transformedArray = listOfFilmsIds(films);

// function checkFilms(arr) {
//     return arr.every(film => film.name)
// }

// console.log(checkFilms(transformedArray))

// function checkFilms(arr) {
//     return arr.every(film => film.id || film.id === 0)
// }

// function showGoodFilms(arr) {
//     return arr.filter(film => film.rating >=8)
// }

// console.log(showGoodFilms(films))


// function showListOfFilms(arr) {

//     return arr.reduce((acc, curr) => `${typeof (acc) === 'object' ? acc.name : acc}, ${curr.name}`);
// }
// console.log(showListOfFilms(films))


// function listOfFilm(arr) {
//     return arr.reduce((acc, curr) => {
//           return  `${acc.name}, ${curr.name}`;

//     });
// }

// console.log(listOfFilm(films));




// const funds = [
//     { amount: -1400 },
//     { amount: 2400 },
//     { amount: -1000 },
//     { amount: 500 },
//     { amount: 10400 },
//     { amount: -11400 }
// ];

// const getPositiveIncomeAmount = (data) => {
//     return data.filter(item => item.amount > 0).reduce((acc, curr) => acc + curr.amount, 0)
// }


// console.log(getPositiveIncomeAmount(funds))

// const getTotalIncomeAmount = (data) => {
//     return data.some(item => item.amount < 0) ? data.reduce((acc, curr) => acc + curr.amount, 0) : getPositiveIncomeAmount(data)
// }



// console.log(getTotalIncomeAmount(funds))


























// const forms = document.querySelectorAll('form');

// const message = {
//     loading: 'img/spinner/spinner.svg',
//     success: 'Спасибо, мы свяжемся с Вами в ближайшее время',
//     failure: 'Ошибка, что-то пошло не так'
// }

// forms.forEach((item) => {
//     postData(item);
// })

// function postData(form) {
//     form.addEventListener('submit', (e) => {
//         e.preventDefault();

//         let statusMessage = document.createElement('img');
//         statusMessage.src = message.loading;
//         statusMessage.style.cssText = `
//                 display: block;
//                 margin: 0 auto;
//             `;
//         form.insertAdjacentElement('afterend', statusMessage);
//         const request = new XMLHttpRequest;
//         request.open('POST', 'server.php');
//         request.setRequestHeader('Content-type', 'application/json; charset=utf-8')


//         const formData = new FormData(form);
//         const object = {};
//         formData.forEach((value, key) => {
//             object[key] = value;
//         });
//         const json = JSON.stringify(object);
//         request.send(json);

//         request.addEventListener('load', () => {
//             if (request.status === 200) {
//                 showThanksModal(message.success);
//                 statusMessage.remove();
//                 form.reset();
//             } else {
//                 showThanksModal(message.failure);
//             }
//         })
//     })
// }

// function showThanksModal(message) {
//     const prevModalDialog = document.querySelector('.model__dialog');
//     prevModalDialog.classList.add('hide');

//     const thanksModal = document.createElement('div');
//     thanksModal.classList.add('modal__dialog');
//     thanksModal.innerHTML = `
//     <div class="modal__content">
//                      <div data-close class="modal__close">&times;</div>
//                      <div class="modal__title">${message}</div>
//              </div>

//     `;

//     document.querySelector('.modal').append(thanksModal);

//     setTimeout(() => {
//         thanksModal.remove();
//         prevModalDialog.classList.add('show');
//         prevModalDialog.classList.remove('hide');
//         closeModal();
//     }, 4000)




// }








// const films = [
//     {
//         name: 'Titanic',
//         rating: 9
//     },
//     {
//         name: 'Die hard 5',
//         rating: 5
//     },
//     {
//         name: 'Matrix',
//         rating: 8
//     },
//     {
//         name: 'Some bad film',
//         rating: 4
//     }
// ];

// function showGoodFilms(arr) {
//     return arr.filter(item => item.rating >= 8)
// }
// console.log(showGoodFilms(films))

// function showListOfFilms(arr) {
//     return arr.reduce((acc, curr) => `${typeof (acc) === 'object' ? acc.name : acc}, ${curr.name}`
//     )
// }
// console.log(showListOfFilms(films))


// function setFilmsIds(arr) {
//     return arr.map((item, i) => {
//         item.id = i;
//         return item;
//     })
// }
// console.log(setFilmsIds(films))

// const tranformedArray = setFilmsIds(films);

// function checkFilms(arr) {
//     return arr.every(item => item.id || item.id === 0)
// }
// console.log(checkFilms(tranformedArray))




// const funds = [
//     { amount: -1400 },
//     { amount: 2400 },
//     { amount: -1000 },
//     { amount: 500 },
//     { amount: 10400 },
//     { amount: -11400 }
// ];

// const getPositiveIncomeAmount = (data) => {
//     return data.filter(data => data.amount > 0).reduce((acc, curr) => acc + curr.amount, 0)
// };
// console.log(getPositiveIncomeAmount(funds))
// const getTotalIncomeAmount = (data) => {
//     return data.some(item => item.amount < 0) ? data.reduce((acc, curr) => acc + curr.amount, 0) : getPositiveIncomeAmount(data)
// };
// console.log(getTotalIncomeAmount(funds))

// const obj = {
//     ivan: 'persone',
//     ann: 'persone',
//     dog: 'animal',
//     cat: 'animal'
// }

// const newArr = Object.entries(obj)
//     .filter(item => item[1] === 'persone')
//     .map(item => item[0])

// console.log(newArr)

// const gloves = ['red', 'red', 'blue', 'green', 'red', 'blue', 'black', 'black']

// function numberOfPairs(gloves) {

//     let hash = {};
//     let res = 0;
//     for (let i = 0; i < gloves.length; i++) {
//         if (!hash[gloves[i]]) {
//             hash[gloves[i]] = 1;
//         } else {
//             hash[gloves[i]]++;
//         }
//     }
//     Object.keys(hash).forEach(key => res += Math.floor(hash[key] / 2));
//     return `Количество пар: ${res}`;
// }

// console.log(numberOfPairs(gloves))

// arr1 = [1, 2, 3, 4, 5, 6];
// arr2 = [2, 1, 4, 3, 5, 6];

// function compareArr() {

//     return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort())
// if (arr1.length !== arr2.length) {
//     return false;
// }

// arr1.sort();
// arr2.sort();

// for (let i = 0; i < arr1.length; i++) {
//     if (arr1[i] !== arr2[i]) {
//         return false;
//     }
// } return true;
// }

// console.log(compareArr())


// const arr3 = [1, 2, [3, 5], [7]];
// function sumDigits(arr) {
//     const b = arr.toString().split(',');
//     let sum = 0;

//     for (i = 0; i < b.length; i++) {
//         sum += Number.isNaN(Number(b[i])) ? 0 : Number(b[i])
//     }
//     return sum;

// }
// console.log(sumDigits(arr3))

// const arr3 = [1, 2, [3, 5], [7]];
// function arraySum(arr) {

//     return arr
//         .toString().split(',')
//         .map(el => parseFloat(el))
//         .filter(el => !Number.isNaN(el))
//         .reduce((acc, cur) => acc + cur)
// }
// console.log(arraySum(arr3))

// function nameShuffler(str) {
//     let fn = '', ln = '', mod = 'fn';

//     for (let i = 0; i < str.length; i++) {
//         if (str[i] === ' ') {
//             mod = 'ln';
//             continue;
//         }
//         if (mod === 'fn') {
//             fn += str[i];
//         }
//         else {
//             ln += str[i];
//         }

//     } return `${ln} ${fn} `
// }

// console.log(nameShuffler('Davie Johns'))

// function nameShuffler(str) {
//     return str.split(' ').reverse().join(' ')
// }

// console.log(nameShuffler('Davie Johns'))


// function solution(a, b) {
//     let s = '', l = '';
//     if (a.length > b.length) {
//         s = b; l = a;
//     } else {
//         s = a; l = b;
//     } return `${s}${l}${s}`
// }
// console.log(solution('yy', 'uuuuuuu'))

// function solution(a, b) {

//     return (a.length > b.length) ? `${b}${a}${b}` : `${a}${b}${a}`
// }
// console.log(solution('yy', 'uuuuuuu'))


// function shootInFavella(info) {
//     const load = {
//         'PT92': 17,
//         'M4A1': 30,
//         'M16A2': 30,
//         'PSG1': 5
//     }
//     return Math.ceil((info[1] * 3) / load[info[0]])
// }
// console.log(shootInFavella(["PSG1", 15]))



// function sayHello(name, city, state) {

//     return `Hello, ${name.join(' ')}! Wellcome to ${city}, ${state}!`
// }

// console.log(sayHello(['John', 'Smith'], 'Phoenix', 'Arizona'))

// function noSpace(x) {

//     // return x.split(' ').join('')
//     return x.replace(/ /g, '')
// }

// console.log(noSpace('oree kdkkd mdmdmd'))




// function fakeBin(x) {
//     let str = ''
//     for (let i = 0; i < x.length; i++) {
//         if (Number(x[i]) >= 5) {
//             str += '1';
//         } else {
//             str += '0';
//         }
//     } return str;

// }
// console.log(fakeBin('1 2 3 4 5 6 7 8 9 0'))


// function fakeBin(x) {
//     var newStr = "";
//     for (var i = 0; i < x.length; i++) {
//         if (Number(x[i]) >= 5) {
//             newStr += "1"
//         }
//         else {
//             newStr += "0";
//         }
//     }
//     return newStr;
// }

// function fakeBin(x) {
//     return x.split('').map(el => el >= 5 ? 1 : 0).join('')
// }
// console.log(fakeBin('1 2 3 4 5 6 7 8 9 0'))

// console.log('1 2 4 1 5 6 6 4 3 4 5 3 6'.split('').filter(i => i > 5).join(''))


// function doubleChar(str) {
//     newStr = '';
//     for (let i = 0; i < str.length; i++) {
//         for (let k = 0; k < 2; k++) {
//             newStr += str[i]
//         }

//     } return newStr
// }
// console.log(doubleChar('HeLLo'))

// function doubleChar(str) {
//     return str.split('').map(i => i + i).join('')
// }
// console.log(doubleChar('HeLLo'))

// function squareSum(numbers) {
//     sum = 0;
//     for (let i = 0; i < numbers.length; i++) {
//         sum += numbers[i] * numbers[i]
//     }

//     return sum
// }

// console.log(squareSum([1, 2, 2]))

// function squareSum(numbers) {
//     return numbers.reduce((sum, num) => sum + (num * num), 0)
// }

// console.log(squareSum([1, 2, 2]))

// function squareOrSquareRoot(array) {
//     let array2 = [];
//     for (let i = 0; i < array.length; i++) {
//         if (Number.isInteger(Math.sqrt(array[i]))) {
//             array2[i] = Math.sqrt(array[i])
//         } else {
//             array2[i] = array[i] * array[i]
//         }
//     }
//     return array2;
// }

// console.log(squareOrSquareRoot([4, 3, 9, 7, 2, 1]))

// function squareOrSquareRoot(array) {

//     return array.map(i => Number.isInteger(Math.sqrt(i)) ? Math.sqrt(i) : i * i)
// }

// console.log(squareOrSquareRoot([4, 3, 9, 7, 2, 1]))


// // function removeEveryOther(arr) {
// //     return arr.filter(function (elem, index) {
// //         return index % 2 === 0;
// //     });
// // }
// // console.log(removeEveryOther(['hello', 'world', 'hello', 'hello', 'world']))

// function squareArea(A) {
//     let r = 2 * A / Math.PI;
//     return Math.round(r * r * 100) / 100
// }
// console.log(squareArea(10))


// function howMuchILoveYou(nbPetals) {
//     let arr = ["I love you", "a little", "a lot", "passionately", "madly", "not at all"]

//     for (let i = 0; i < nbPetals.length; i++) {
//         arr.push(arr[i]);
//     }
//     arr = '' + arr.slice(-1)
//     return arr
// }
// console.log(howMuchILoveYou(5))

// function howMuchILoveYou(nbPetals) {
//     let words = ['I love you', 'a little', 'a lot', 'passionately', 'madly', 'not at all']
//     for (let i = 0; i < nbPetals; i++) {
//         words.push(words[i]);
//     }
//     let word = `${words.slice(-1)}`
//     return word
// }
// console.log(howMuchILoveYou(5))

// function howMuchILoveYou(nbPetals) {
//     let phrase = {
//         0: "not at all",
//         1: "I love you",
//         2: "a little",
//         3: "a lot",
//         4: "passionately",
//         5: "madly"
//     }
//     return phrase[nbPetals % 6]
// }
// console.log(howMuchILoveYou(5))



// function extraPerfect(n) {
//     let arr = [];
//     for (let i = 0; i <= n; i++) {
//         if (i % 2 !== 0) {
//             arr.push(i)
//         }

//     } return arr
// }
// console.log(extraPerfect(7))


// function vowelIndices(word) {

//     let arr = [];

//     for (let i = 0; i < word.length; i++) {
//         if (/[aeioyu]/i.test(word[i])) {
//             arr.push(i + 1)
//         }
//     }
//     return arr;


// }
// console.log(vowelIndices('super'))

// function vowelIndices(word) {
//     var arr = [];
//     for (var i = 0; i < word.length; i++) {
//         if (/[aeioyu]/i.test(word[i])) {
//             arr.push(i + 1);
//         }
//     }
//     return arr;
// }

// console.log(vowelIndices('super'))

// // Длинное решение
// function solution(str, ending) {
//     let a = str.split('').reverse().join('');
//     let b = ending.split('').reverse().join('');
//     console.log(a)
//     let res = '';

//     for (let i = 0; i < b.length; i++) {
//         if (b[i] === a[i]) {
//             res += b[i];
//         }
//     }
//     console.log(res)
//     if (res === b) {
//         return true;
//     } else {
//         return false;
//     }

// }
// console.log(solution('abc', 'dbc'))



// // Короткое
// function solution(str, ending) {
//     return str.endsWith(ending);

// }
// console.log(solution('abc', 'abc'))


// function alternateSqSum(arr) {
//     let sum = 0;
//     arr.forEach((item, i) => {
//         if (i % 2 === 0) {
//             sum += item
//         } else {
//             sum += item * item
//         }
//     });
//     return sum;

// }


// console.log(alternateSqSum([11, 12, 13, 14, 15]))

// function alternateSqSum(arr) {
//     return arr.reduce((prev, cur, index) => {
//         return prev + (index % 2 ? Math.pow(cur, 2) : cur)
//     })

// }


// console.log(alternateSqSum([11, 12, 13, 14, 15]))


// // function removeEveryOther(arr) {
// //     return arr.filter(function (elem, index) {
// //         return index % 2 === 0;
// //     });
// // }
// // console.log(removeEveryOther(['hello', 'world', 'hello', 'hello', 'world']))


// function comp(array1, array2) {
//     if (array1 === null || array2 === null) {
//         return false
//     } else {
//         array1.sort(function (a, b) {
//             return a - b;
//         })
//         array2.sort(function (a, b) {
//             return a - b;
//         })
//         let compare = [];
//         for (let i = 0; i < array2.length; i++) {
//             compare.push(Math.sqrt(array2[i]))
//         }
//         if (compare.join('') === array1.join('')) {
//             return true
//         } else {
//             return false
//         }
//     }
// }


// console.log(comp([121, 144, 19, 161, 19, 144, 19, 11], [121, 14641, 20736, 361, 25921, 361, 20736, 361]))



// function comp(array1, array2) {
//     if (array1 === null || array2 === null) return false;
//     for (let i = 0; i < array2.length; i++) {
//         const idxa = array1.indexOf(Math.sqrt(array2[i]));
//         if (!idxa === -1) return false;
//         array1[idxa] = null;

//     }



//     return true;
// }


// console.log(comp([121, 144, 19, 161, 19, 144, 19, 11], [121, 14641, 20736, 361, 25921, 361, 20736, 361]))

// function comp(array1, array2) {
//     if (array1 === null || array2 === null) return false;
//     array1.sort((a, b) => a - b); array2.sort((a, b) => a - b)
//     return array1.map(elem => elem * elem).every((elem, i) => elem === array2[i])
// }

// console.log(comp([121, 144, 19, 161, 19, 144, 19, 11], [121, 14641, 20736, 361, 25921, 361, 20736, 361]))









// function evaporator(content, evap_per_day, threshold) {
//     let gas = 100;
//     let days = 0;
//     while (gas >= threshold) {
//         gas -= gas * evap_per_day / 100;
//         days++;
//     } return days;
// }


// console.log(evaporator(10, 10, 5))


// function sumTwoSmallestNumbers(numbers) {

//     numbers.sort((a, b) => a - b);


//     return numbers[0] + numbers[1]

// }
// console.log(sumTwoSmallestNumbers([1, 5, 5, 5, 10, 200]))



// function bingo(a) {
//     return [2, 7, 9, 14, 15].every(elem => a.includes(elem) ? true : false)


// }

// console.log(bingo([21, 13, 2, 7, 5, 14, 7, 15, 9, 10]))

// function missingNo(nums) {

//     return 5050 - nums.reduce((prev, curr) => prev + curr, 0)

// }

// function missingNo(nums) {

//     for (let i = 0; i <= 100; i++) {
//         if (!nums.includes(i)) return i
//     }

// }

// console.log(missingNo([9, 45, 53, 10, 100, 30, 85, 72, 69, 93, 98, 27, 73, 82, 91, 60, 5, 79, 88, 18, 71, 36, 44, 22, 89, 40, 59, 80, 81, 67, 25, 54, 13, 64, 56, 39, 48, 92, 84, 94, 87, 90, 77, 63, 32, 68, 37, 96, 23, 0, 95, 1, 52, 78, 6, 57, 50, 2, 46, 19, 76, 47, 14, 4, 3, 29, 17, 11, 21, 24, 74, 65, 12, 83, 28, 41, 66, 7, 58, 55, 51, 43, 97, 42, 86, 49, 31, 20, 75, 70, 34, 33, 38, 8, 15, 62, 35, 61, 99, 16]))


// function ghostBusters(building) {
//     if (!building.includes(' ')) {
//         return "You just wanted my autograph didn't you?"
//     }
//     return building.replace(/\ /g, '')
// }
// console.log(ghostBusters("Sky scr aper"))

// function ghostBusters(building) {
//     return /\s/.test(building) ? building.replace(/\s+/g, '') : "You just wanted my autograph didn't you?";
// }
// console.log(ghostBusters("Sky scr aper"))


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map