const requestURL = 'https://jsonplaceholder.typicode.com/posts'
let popupBtn = document.querySelector('.footer__popup')
let contactForm = document.querySelector('.contact-form')
let contactFormBtn = document.querySelector('.contact-form__btn')
let inputName = document.querySelector('.contact-form__name input')
let inputEmail = document.querySelector('.contact-form__e-mail input')
let inputMessage = document.querySelector('.contact-form__message textarea')
let successBlock = document.querySelector('.success-popup')
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
    let formData
    let formDataJson 
    let switchName
    let switchEmail
    let switchMessage
    let separator = ' '
    let nameArrMod = []
    nameArr = inputName.value.split(separator)
    emailArr = inputEmail.value.split('')

    function nameValidation(nameArr) {
        let flag = false
        for (let i = 0; i < nameArr.length; i++) {
            if (nameArr.length < 2 || nameArr.length >= 3 || nameArr[i].length === 0) {
                document.querySelector('.contact-form__name input[placeholder]').style.backgroundColor = '#ff020226';
                inputName.setCustomValidity('Заполните в формате: "Имя Фамилия"')
                flag = false
                switchName = false
            }
            else {
                inputName.setCustomValidity('')
                document.querySelector('.contact-form__name input[placeholder]').style.backgroundColor = '#28ff0226';
                flag = true
                switchName = true
            }
        }
      
        if (flag === true) {
            for (let i = 0; i < nameArr.length; i++) {
                nameArrMod.push(nameArr[i].replace(/[0-9`~!@#$%^&*()_|[+-=?;:'",.<>{}]/g, ''))
            }
            inputName.value = nameArrMod.join(' ')
        }
        return switchName
    }
    nameValidation(nameArr)

    function emailValidation(emailArr) {
        for (let i = 0; i < emailArr.length; i++) {
            if (emailArr[i] === ' ') {
                for (let i = 0; i < emailArr.length; i++) {
                    for (let j = i + 1; j < emailArr.length;) {
                        if (emailArr[i] === ' ') {
                            emailArr.splice(i, 1);
                        } else {
                            j++;
                        }
                    }
                }
                document.querySelector('.contact-form__e-mail input[placeholder]').style.backgroundColor = '#ff020226';
                inputEmail.setCustomValidity('Заполните поле в формате: "name@email.com"')
            } else {
                let symbol = '@'
                for (let i = 0; i < emailArr.length; i++) {
                    if (emailArr[i] !== ' ' && emailArr[i] === '@' && emailArr.length > 6 && emailArr[0] !== symbol) {
                        document.querySelector('.contact-form__e-mail input[placeholder]').style.backgroundColor = '#28ff0226';
                        inputEmail.setCustomValidity('')
                        switchEmail = true
                    } 
                }
            }
        }
        inputEmail.value = emailArr.join('')
      return switchEmail
      
    }
    emailValidation(emailArr)

    function messageValidation(inputMessage) {
        if (inputMessage.value.length < 20) {
            document.querySelector('.contact-form__message textarea[id=client-message][placeholder]').style.backgroundColor = '#ff020226';
            inputMessage.setCustomValidity('Длина сообщения должна быть не менее 20 символов')
            switchMessage = false
        } else {
            document.querySelector('.contact-form__message textarea[id=client-message][placeholder]').style.backgroundColor = '#28ff0226';
            inputMessage.setCustomValidity('')
            switchMessage = true
        }
        return switchMessage

    }
    messageValidation(inputMessage)
    if (switchName && switchEmail && switchMessage) {
        formData = {
            name: nameArrMod[0],
            surname: nameArrMod[1],
            email: emailArr.join(''),
            message: inputMessage.value
        }
        formDataJson = JSON.stringify(formData)
        let xhr = new XMLHttpRequest()
        xhr.open('POST', requestURL)
        xhr.setRequestHeader("Content-type", "application/json")
        xhr.onload = function() {
            console.log(xhr.responseType)
            if (xhr.readyState === 4 && 200 < xhr.status < 299) {
                showSuccessBlock ()
            }
        }
        xhr.send(formDataJson)
    }
    function showSuccessBlock () {
        contactForm.classList.add('hidden')
        successBlock.classList.remove('hidden')
        window.addEventListener('click', closeSuccessBlock)
        function closeSuccessBlock (event) {
            if (!successBlock.classList.contains('hidden') && contactForm.classList.contains('hidden') && event.which === 1) {
                successBlock.classList.add('hidden')
            }
        }  
    }
}