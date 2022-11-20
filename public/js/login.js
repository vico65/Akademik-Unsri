document.title = 'Login'

let passwordInput = document.getElementById('password_input')
let containerInputPassword = document.getElementById("container_input_password")
let buttonShowPassword = document.getElementById("button_show_password")
let iconMata = document.getElementById("icon_mata")

passwordInput.addEventListener("focus",() => {
    containerInputPassword.classList.add("ring-1")
    containerInputPassword.classList.add("ring-yellow-500")
    containerInputPassword.classList.add("border-yellow-500")
})

passwordInput.addEventListener("focusout",() => {
    containerInputPassword.classList.remove("ring-1")
    containerInputPassword.classList.remove("ring-yellow-500")
    containerInputPassword.classList.remove("border-yellow-500")
})

buttonShowPassword.addEventListener("click", (e) => {
    e.preventDefault()
    iconMata.classList.toggle('bi-eye');
    iconMata.classList.toggle('bi-eye-slash');
    passwordInput.getAttribute('type') == 'password' ? passwordInput.setAttribute('type', 'text'): passwordInput.setAttribute('type', 'password')
})



