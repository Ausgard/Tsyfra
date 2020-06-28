let menuBtn = document.querySelector('.header__menu-btn')
let menuBlock = document.querySelector('.header__nav')
let subMenuBtn = document.querySelector('.header__nav-link')
let subMenuBlock = document.querySelector('.header__nav-s-list')
let bgImage = document.querySelector('.top-content__bg-block')

window.addEventListener('keydown', menuHandler)
menuBtn.addEventListener('click', menuHandler)
menuBtn.addEventListener('keydown', menuHandler)
menuBlock.addEventListener('click', subMenuHandler)
menuBlock.addEventListener('keydown', subMenuHandler)

function menuHandler(event) {
    if (event.which === 1) {
        menuBlock.classList.toggle('hidden')
        menuBlock.classList.toggle('show-menu')
    } else {
        if (event.which === 27 && !menuBlock.classList.contains('hidden')) {
            menuBlock.classList.add('hidden')
        }
    }
}

function subMenuHandler(event) {
    let targetElem = event.target.nextElementSibling
    if (event.which === 1 && event.target.nextElementSibling) {
        event.preventDefault()
        targetElem.classList.toggle('hidden')
    } else {
        if (event.which === 27 && !targetElem.classList.contains('hidden')) {
            targetElem.classList.add('hidden')
        }
    }
}
