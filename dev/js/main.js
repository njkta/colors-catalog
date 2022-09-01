"use strict";

window.onload = function(){
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


    let btnProduct = document.querySelectorAll('.add-to-basket');
    let orderList = [];
    let counter = 0;
    let basketList = document.querySelector('.basket-list');
    let clearBasket = document.querySelector('.basket__clear');
    let deleteProductBtn = '';
    let countProductPlus = '';
    let countProductMinus = '';

    let renderBasket = () => {
        if (orderList.length === 0) {
            basketList.innerHTML = ''
            counter = 0
            counterInBasket(counter)
        } else {
            orderList.forEach(el => {

                let idProduct = el.getAttribute('id');
                let imgProduct = el.querySelector('.catalog__image_front').getAttribute('src');
                let titleProduct = el.querySelector('.catalog__title').textContent;
                let priceProduct = el.querySelector('.catalog__price>span').textContent;

                basketList.innerHTML += `
                    <div id="${idProduct}" class="basket-list__item">
                        <div class="basket-list__images">
                            <img class="basket-list__image" src="${imgProduct}" alt="${titleProduct}">
                        </div>
                        <div class="basket-list__info">
                            <div class="catalog__title basket-list__title">${titleProduct}</div>
                            <div class="catalog__price basket-list__price"><span>${priceProduct}</span> ₽</div>
                        </div>
                        <div class="basket-list__other">
                            <div class="basket-list__btn">
                                <button class="btn btn_small btn_minus" type="button"></button>
                                <span class="basket-list__counter" data-count-product="1"></span>
                                <button class="btn btn_small btn_plus" type="button"></button>
                            </div>
                            <div class="basket-list__delete">
                                <svg width="24" height="24">
                                    <use xlink:href="#icon-close"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                `;

            })


            deleteProductBtn = document.querySelectorAll('.basket-list__delete');
            deleteProductBtn.forEach(el => el.addEventListener('click', deleteFromBasket(el)))

            countProductPlus = document.querySelectorAll('.btn_plus');
            countProductMinus = document.querySelectorAll('.btn_minus');
            countProductPlus.forEach(el => el.addEventListener('click', productPlus(el)))
            countProductMinus.forEach(el => el.addEventListener('click', productMinus(el)))

            counter = orderList.length
            counterInBasket(counter)
        }

    }
    let addToBasket = (el) => {
        return () => {
            el.disabled = true
            let productCardInCatalog = el.parentElement.parentElement.parentElement;

            orderList.push(productCardInCatalog)
            basketList.innerHTML = ''
            renderBasket()
        }
    }

    let deleteFromBasket = (el) => {
        return () => {
            el.parentElement.parentElement.classList.add('deleted')
            counter = orderList.length - 1
            counterInBasket(counter)
            /*let productCardInBasketID = el.parentElement.parentElement.getAttribute('id');
            let item = orderList.find(el => el.getAttribute('id') === productCardInBasketID)
            let index = orderList.indexOf(item)


            item.querySelector('.add-to-basket').disabled = false
            orderList.splice(index, 1)

            basketList.innerHTML = ''
            renderBasket()*/

        }
    }


    btnProduct.forEach(el => el.addEventListener('click', addToBasket(el)))

    clearBasket.addEventListener('click', () => {
        orderList = []
        counterInBasket(0)
        btnProduct.forEach(el => el.disabled = false)
        renderBasket()
    })

    let productPlus = (el) => {
        return () => {
            let countProducts = el.previousElementSibling
            let currentCount = countProducts.getAttribute('data-count-product')
            currentCount++
            countProducts.setAttribute('data-count-product', currentCount)
        }
    }
    let productMinus = (el) => {
        return () => {
            el.disabled = false
            let countProducts = el.nextElementSibling
            let currentCount = countProducts.getAttribute('data-count-product')
            currentCount--
            countProducts.setAttribute('data-count-product', currentCount)

            if (+currentCount === 0) {
                el.disabled = true
            }
        }
    }

    let counterInBasket = (counter) => {
        let basketCounter = document.querySelectorAll('.basket__count')
        basketCounter.forEach(el => el.setAttribute('data-count', counter))
    }


    let setCountOfCatalog = () => {
        let countAllProducts = document.querySelectorAll('.catalog__item').length
        let attrCount = document.querySelector('[data-all-count]')
        return attrCount.setAttribute('data-all-count', countAllProducts)
    }

    let filter = () => {
        let filterItems = document.querySelectorAll('.filter__input')
        let filterProducts = document.querySelectorAll('.catalog__item')
        filterItems.forEach(el => {
            el.addEventListener('click', () => {
                let filterClass = el.parentElement.getAttribute('data-filter')

                if (!el.checked){

                }
                filterProducts.forEach(elProd => {
                    elProd.classList.remove("hide")
                    if (!elProd.classList.contains(filterClass)){
                        elProd.classList.add("hide")
                    }
                })
            })
        })
    }

    let catalogSortBtn = document.querySelector('.catalog-sort__item_default')
    let defaultSort = catalogSortBtn.children[0]
    let catalogSortModalClose = document.querySelector('.modal-sort__back')
    let catalogSortItem = document.querySelectorAll('.catalog-sort__item')
    let catalogItem = document.querySelectorAll('.catalog__item')
    let catalogSortModal = document.querySelector('.modal-sort')
    let sortValue = ''
    let sortText = ''

    catalogSortBtn.addEventListener('click', () => catalogSortModal.style.display = 'block')
    catalogSortModalClose.addEventListener('click', () => catalogSortModal.style.display = 'none')
    catalogSortItem.forEach(el => {
        el.addEventListener('click', () => {
            sortValue = el.getAttribute('data-sort')
            sortText = el.textContent
            defaultSort.innerHTML = sortText
            catalogSortModal.style.display = 'none';

            sort(catalogItem, sortValue)

        })
    })

    let sort = (elCollection, sortBy) => {
        let elArr = Array.from(elCollection)
        let prices = []

        let sortLow = () => {
            elArr.forEach((el, index) => {
                let price = el.querySelector('.catalog__price').children[0].textContent

                prices.push.apply(prices,[[el.id, price]])
                prices.sort()
            })


        }

        switch (sortBy) {
            case 'high':

                // sortHigh(el);
                break;
            case 'low':
                sortLow();
                break;
            case 'popular':

                // sortPopular(el);
                break;
            case 'new':

                // sortNew(el);
                break;
            default: sortLow(el);
        }


    }


    onClickBasket();
    setCountOfCatalog();
    filter();
}

