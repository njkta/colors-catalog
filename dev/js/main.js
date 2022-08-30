"use strict";

window.onload = function(){
    let onClickMenu = () => {
        let menuIcon = document.querySelectorAll('.icon-menu');
        let menu = document.querySelector('.right-menu-container')
        let iconOpen = '#burger-menu';
        let iconClose = '#icon-close';

        menuIcon.forEach(el => {
            el.addEventListener("click", () => {
                let iconPath = el.children[0].getAttribute("xlink:href")
                /*el.classList.toggle('close')

                menu.classList.toggle('show')*/
                console.log(iconPath)
            })
        })
    }

    let onClickBasket = () => {
        let basketIconOpen = document.querySelector('.open-basket');
        let basketIconClose = document.querySelector('.basket__close');
        let basketCloseAll = document.querySelector('.basket__back');
        let basket = document.querySelector('.basket__box');

        basketIconOpen.addEventListener('click', basketOpen(basket))
        basketIconClose.addEventListener('click', basketClose(basket))
        basketCloseAll.addEventListener('click', basketClose(basket))
    }

    let basketOpen = (el) => {
        return () => {
            el.style.display = 'block';
            document.body.classList.add('show-basket')
        }

    }
    let basketClose = (el) => {
        return () => {
            el.style.display = 'none';
            document.body.classList.remove('show-basket')
        }
    }

    let onAddToBasket = () => {
        let btnProduct = document.querySelectorAll('.add-to-basket');
        let orderList = {};
        let counter = 0;
        let html = ``;

        btnProduct.forEach(el => {
            el.addEventListener('click', () => {
                el.disabled = true
                counter++

                let productCard = el.parentElement.parentElement;
                let imgProduct = productCard.querySelector('.catalog__image_front').getAttribute('src');
                let titleProduct = productCard.querySelector('.catalog__title').textContent;
                let priceProduct = productCard.querySelector('.catalog__price').textContent;

                orderList = {
                    img: imgProduct,
                    title: titleProduct,
                    price: priceProduct,
                    count: 1
                }

                counterInBasket(counter)

                let basketList = document.querySelector('.basket-list');
                let elCount = 1;

                html += `
                    <div class="basket-list__item">
                        <div class="basket-list__images">
                            <img class="basket-list__image" src="${orderList.img}">
                        </div>
                        <div class="basket-list__info">
                            <div class="catalog__title basket-list__title">${orderList.title}</div>
                            <div class="catalog__price basket-list__price">${orderList.price}</div>
                        </div>
                        <div class="basket-list__other">
                            <div class="basket-list__btn">
                                <span class="btn btn_small btn_minus"></span>
                                <span class="basket-list__counter">${elCount}</span>
                                <span class="btn btn_small btn_plus"></span>
                            </div>
                            <div class="basket-list__delete">
                                <svg width="24" height="24">
                                    <use xlink:href="#icon-close"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                `;
                basketList.innerHTML = html;

                toolsBasket(html, el);
            })
        })

    }

    let toolsBasket = (html, btnAdd) => {
        let clearAll = document.querySelector('.basket__clear');
        let clearProduct = document.querySelectorAll('.basket-list__delete');
        let countProduct = document.querySelectorAll('.basket-list__counter');
        let countProductPlus = document.querySelectorAll('.btn_plus');
        let countProductMinus = document.querySelectorAll('.btn_minus');
        let basketList = document.querySelector('.basket-list');

        clearAll.addEventListener('click', () => {
            basketList.innerHTML = ''
            counterInBasket(0)
            btnAdd.disabled = false
        })

        console.log(clearProduct)

        clearProduct.forEach(el => {
            el.addEventListener('click', () => {

                el.parentElement.parentElement.innerHTML = ''
                btnAdd.disabled = false
            })
        })

    }

    let counterInBasket = (counter) => {
        let basketCounter = document.querySelectorAll('.basket__count')
        basketCounter.forEach(el => el.setAttribute('data-count', counter))
    }

    onClickMenu();
    onClickBasket();
    onAddToBasket();
}

