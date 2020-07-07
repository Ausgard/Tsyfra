const requestURL = 'https://jsonplaceholder.typicode.com/users'
const xhr = new XMLHttpRequest()
let popupBtn = document.querySelector('.footer__popup')
let contactForm = document.querySelector('.contact-form')

popupBtn.addEventListener('click', popupHandler)
window.addEventListener('keydown', popupHandler)

function popupHandler(event) {
    if(event.which === 1) {
        contactForm.classList.toggle('hidden')
    }
    if(event.which === 27 && !contactForm.classList.contains('hidden')) {
        contactForm.classList.add('hidden')
    }
}

// xhr.open('GET', requestURL)
// xhr.responseType = 'json'

// xhr.onload = function() {
//     console.log(xhr)
// }

// xhr.send()