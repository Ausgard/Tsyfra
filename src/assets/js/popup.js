const requestURL = 'https://jsonplaceholder.typicode.com/users'
const xhr = new XMLHttpRequest()
let popupBtn = document.querySelector('.footer__popup')
let contactForm = document.querySelector('.contact-form')
let contactFormBtn = document.querySelector('.contact-form__btn')

let inputName = document.querySelector('.contact-form__name input')
let inputEmail = document.querySelector('.contact-form__e-mail input')
let inputMessage = document.querySelector('.contact-form__message textarea')

popupBtn.addEventListener('click', popupHandler)
window.addEventListener('keydown', popupHandler)
contactFormBtn.addEventListener('click', formHandler)

function popupHandler(event) {
    if(event.which === 1) {
        contactForm.classList.toggle('hidden')
    }
    if(event.which === 27 && !contactForm.classList.contains('hidden')) {
        contactForm.classList.add('hidden')
    }
}

function formHandler() {
    event.preventDefault()
    let separator = ' ';
    nameArr = inputName.value.split(separator)
    emailArr = inputEmail.value.split(separator)

    function nameValidation(nameArr) {
        let flag = false
        for (let i = 0; i < nameArr.length; i++) {
            if (nameArr.length < 2 || nameArr.length >= 3 || nameArr[i].length === 0) {
                document.querySelector('.contact-form__name input[placeholder]').style.backgroundColor = '#ff020226';
                inputName.setCustomValidity('Заполните в формате: "Имя Фамилия"')
                flag = false
            }
            else {
                inputName.setCustomValidity('')
                document.querySelector('.contact-form__name input[placeholder]').style.backgroundColor = '#28ff0226';
                flag = true
            }
        }
      
        if (flag === true) {
            let nameArrMod = []
            let nameArrModSymbol = []
            for (let i = 0; i < nameArr.length; i++) {
                nameArrMod.push(nameArr[i].replace(/[0-9`~!@#$%^&*()_|[+-=?;:'",.<>{}]/g, ''))
            }
            inputName.value = nameArrMod.join(' ')
        }
    }
    nameValidation(nameArr)

    function emailValidation(emailArr) {
        for (let i = 0; i < emailArr.length; i++) {
            if (emailArr.length >= 2 || emailArr[i].length === 0) {
                document.querySelector('.contact-form__e-mail input[placeholder]').style.backgroundColor = '#ff020226';
                inputEmail.setCustomValidity('Заполните в формате: "name@email.com"')
            } else {
                inputName.setCustomValidity('')
                document.querySelector('.contact-form__e-mail input[placeholder]').style.backgroundColor = '#28ff0226';
            }
        }
        if (emailArr[0].includes('@')) {
            inputName.setCustomValidity('')
            document.querySelector('.contact-form__e-mail input[placeholder]').style.backgroundColor = '#28ff0226';
        } else {
            document.querySelector('.contact-form__e-mail input[placeholder]').style.backgroundColor = '#ff020226';
            inputEmail.setCustomValidity('Заполните в формате: "name@email.com"')
        }
    }
    emailValidation(emailArr)

    function messageValidation(inputMessage) {
        if (inputMessage.value.length < 20) {
            document.querySelector('.contact-form__message textarea[id=client-message][placeholder]').style.backgroundColor = '#ff020226';
            inputMessage.setCustomValidity('Длина сообщения должна быть не менее 20 символов')
        } else {
            document.querySelector('.contact-form__message textarea[id=client-message][placeholder]').style.backgroundColor = '#28ff0226';
            inputMessage.setCustomValidity('')
        }
    }
    messageValidation(inputMessage)
    console.log(inputMessage.value.length)
}

// xhr.open('GET', requestURL)
// xhr.responseType = 'json'

// xhr.onload = function() {
//     console.log(xhr)
// }

// xhr.send()