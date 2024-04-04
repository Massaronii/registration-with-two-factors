let btn = document.querySelector("#verSenha")
let btnConfirm = document.querySelector("#verConfirmSenha")

let email = document.querySelector("#email")
let labelEmail = document.querySelector("#labelEmail")
let validEmail = false

let senha = document.querySelector("#senha")
let labelSenha = document.querySelector("#labelSenha")
let validSenha = false

let confirmSenha = document.querySelector("#confirmSenha")
let labelConfirmSenha = document.querySelector("#labelConfirmSenha")
let validConfirmSenha = false

let msgError = document.querySelector("#msgError")
let msgSuccess = document.querySelector("#msgSuccess")

email.addEventListener("keyup", () => {
  if (email.value.length <= 4) {
    labelEmail.setAttribute("style", "color: red")
    labelEmail.innerHTML = "E-mail *Insira no minimo 5 caracteres"
    email.setAttribute("style", "border-color: red")
    validEmail = false
  } else {
    labelEmail.setAttribute("style", "color: green")
    labelEmail.innerHTML = "E-mail"
    email.setAttribute("style", "border-color: green")
    validEmail = true
  }
})

senha.addEventListener("keyup", () => {
  if (senha.value.length <= 5) {
    labelSenha.setAttribute("style", "color: red")
    labelSenha.innerHTML = "Senha *Insira no minimo 6 caracteres"
    senha.setAttribute("style", "border-color: red")
    validSenha = false
  } else {
    labelSenha.setAttribute("style", "color: green")
    labelSenha.innerHTML = "Senha"
    senha.setAttribute("style", "border-color: green")
    validSenha = true
  }
})

confirmSenha.addEventListener("keyup", () => {
  if (senha.value != confirmSenha.value) {
    labelConfirmSenha.setAttribute("style", "color: red")
    labelConfirmSenha.innerHTML = "Confirmar Senha *As senhas não conferem"
    confirmSenha.setAttribute("style", "border-color: red")
    validConfirmSenha = false
  } else {
    labelConfirmSenha.setAttribute("style", "color: green")
    labelConfirmSenha.innerHTML = "Confirmar Senha"
    confirmSenha.setAttribute("style", "border-color: green")
    validConfirmSenha = true
  }
})

function cadastrar(event) {
  event.preventDefault()
  if (validEmail && validSenha && validConfirmSenha) {
    const user = {
      email: email.value,
      senha: senha.value,
    }

    fetch("http://localhost:3000/cadastro", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(user),
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        window.history.pushState(data, "", "../html/qrcodesignup.html")
        window.location.reload()
      })
  } else {
    msgError.setAttribute("style", "display: block")
    msgError.innerHTML =
      "Preencha todos os campos corretamente antes de cadastrar"
    msgSuccess.innerHTML = ""
    msgSuccess.setAttribute("style", "display: none")
  }
}

btn.addEventListener("click", () => {
  let inputSenha = document.querySelector("#senha")

  if (inputSenha.getAttribute("type") == "password") {
    inputSenha.setAttribute("type", "text")
  } else {
    inputSenha.setAttribute("type", "password")
  }
})

btnConfirm.addEventListener("click", () => {
  let inputConfirmSenha = document.querySelector("#confirmSenha")

  if (inputConfirmSenha.getAttribute("type") == "password") {
    inputConfirmSenha.setAttribute("type", "text")
  } else {
    inputConfirmSenha.setAttribute("type", "password")
  }
})
