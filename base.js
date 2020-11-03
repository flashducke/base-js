//loader
window.onload = function () {
    document.querySelector('.main-load').classList.add('loaded-hiding');
    window.setTimeout(function () {
        document.querySelector('.main-load').classList.add('loaded');
        document.querySelector('.main-load').classList.remove('loaded-hiding');
    }, 500);
};
document.addEventListener("DOMContentLoaded", function (event) {
    // header scroll   
    if (document.documentElement.clientWidth > 1215) {
        jQuery(window).scroll(function () {
            if (jQuery(this).scrollTop() > 10) {
                jQuery('header .header-container').addClass('visible-contacts');
            } else {
                jQuery('header .header-container').removeClass('visible-contacts');
            }
        });
    }

    // modals
    const modals = () => {
        function bindModal(triggerSelector, modalSelector, closeSelector) {
            const trigger = document.querySelectorAll(triggerSelector),
                modal = document.querySelector(modalSelector),
                close = document.querySelector(closeSelector);
            trigger.forEach(item => {
                item.addEventListener('click', (e) => {
                    if (e.target) {
                        e.preventDefault()
                    }
                    document.querySelector('.modal-container').classList.add('active-modal');
                    modal.classList.add('active-modal-item');
                    document.querySelector('html,body').style.cssText = `
                                                            padding-right: 17px;
                                                            overflow: hidden;
                                                          `
                    document.querySelector('body header').style.cssText = `
                                                            z-index: 99;
                                                          `
                });
            })
            close.addEventListener('click', () => {
                document.querySelector('.modal-container').classList.remove('active-modal');
                modal.classList.remove('active-modal-item');
                document.querySelector('html,body').style.cssText = `
                                                            overflow: ;
                                                            padding-right: ;
                                                          `
                document.querySelector('body header').style.cssText = `
                                                            z-index: ;
                                                          `
            });
        }
        bindModal('.call-back-btn', '.form-container.order', '.form-container.order .modal-close');
        bindModal('.write-btn', '.form-container.write', '.form-container.write .modal-close');
        bindModal('.btn-burger', '.menu-modal', '.menu-modal .modal-close');
    }
    modals();

    //cookie popap
    function checkCookies() {
        let cookieDate = localStorage.getItem('cookieDate');
        let cookieNotification = document.querySelector('.cookie-popap');
        let cookieBtn = cookieNotification.querySelector('.cookie-btn');

        // Если записи про кукисы нет или она просрочена на 1 год, то показываем информацию про кукисы
        if (!cookieDate || (+cookieDate + 31536000000) < Date.now()) {
            cookieNotification.classList.add('show');
        }

        // При клике на кнопку, в локальное хранилище записывается текущая дата в системе UNIX
        cookieBtn.addEventListener('click', function () {
            localStorage.setItem('cookieDate', Date.now());
            cookieNotification.classList.remove('show');

        })
    }
    checkCookies();

    // input number
    jQuery(".table-count .arrow-minus").on('click', function () {
        if (jQuery(this).siblings('.table-count > input').val() > 1) {
            jQuery(this).siblings('.table-count > input').val(
                +jQuery(this).siblings('.table-count > input').val() - 1);
        }
    });

    jQuery(".table-count .arrow-plus").on('click', function () {
        jQuery(this).siblings('.table-count > input').val(
            +jQuery(this).siblings('.table-count > input').val() + 1);
    });

    // input file
    document.getElementById("file-input").addEventListener("change", (e) => {
        console.log(document.getElementById("file-input").files.name)
        let fileName = document.getElementById("file-input").files[0].name;
        document.querySelector(".file-name").innerHTML = "( " + fileName + " )";

    });


    // tabs in product page
    const tabs = (tabSelector, contentSelector, activeClass) => {
        const tab = document.querySelectorAll(tabSelector),
            content = document.querySelectorAll(contentSelector);

        function hideTabContent() {
            content.forEach(item => {
                item.style.display = 'none';
            });

            tab.forEach(item => {
                item.classList.remove(activeClass);
            });
        }

        function showTabContent(i = 0) {
            content[i].style.display = 'block';
            tab[i].classList.add(activeClass);
        }

        hideTabContent();
        showTabContent();

        tab.forEach((item, i) => {
            item.addEventListener('click', (e) => {
                const target = e.target;
                if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
            if (!item.hasAttribute('id')) {
                tab[i].parentNode.style.display = 'none';
            }
        });
    };
    if (document.querySelector('main').classList.value === 'page-product') {
        tabs('.product-tab > li > button', '.info-content', 'active');
    }
    // функция с параметрами: конпка по которой нажимаем и поле в которое нужно положить выбранный из списка пункт
    const fillingInput = (triggerButton, neededInput) => {
        const currentlyInput = querySelector(neededInput),
            currentlyBtn = querySelector(triggerButton);

        currentlyBtn.on('click touchstart', () => {
            let selectValue = querySelector('select').options.selectedIndex.value;
            currentlyInput.val(selectValue);
        });
    }
    fillingInput('.tn-atom[href="#popupmyform1"]', '#form244438748 input[name="type-of-card"]');
    fillingInput('.tn-atom[href="#popupmyform2"]', '#form244438749 input[name="type-of-card"]');

    // scroll top
    document.addEventListener("scroll", () => {
        document.querySelector(".go-up-arrow").classList[window.pageYOffset > 3000 ? "add" : "remove"]("visible");
    });

    document.querySelector('.go-up-arrow').addEventListener('click', () => {
        let curPos = document.scrollTop();
        let scrollTime = curPos / 4;
        document.querySelector("body,html").animate({ "scrollTop": 0 }, scrollTime);
    });

});