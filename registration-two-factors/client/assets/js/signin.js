let btn = document.querySelector(".fa-eye")

btn.addEventListener("click", () => {
  let inputSenha = document.querySelector("#senha")

  if (inputSenha.getAttribute("type") == "password") {
    inputSenha.setAttribute("type", "text")
  } else {
    inputSenha.setAttribute("type", "password")
  }
})

function entrar() {
  let email = document.querySelector("#email")
  let emailLabel = document.querySelector("#emailLabel")

  let senha = document.querySelector("#senha")
  let senhaLabel = document.querySelector("#senhaLabel")

  let msgError = document.querySelector("#msgError")
  let listaUser = []

  let userValid = {
    email: null,
    senha: null,
  }

  listaUser = JSON.parse(localStorage.getItem("listaUser"))

  listaUser?.forEach((item) => {
    if (email.value == item.emailCad && senha.value == item.senhaCad) {
      userValid = {
        email: item.emailCad,
        senha: item.senhaCad,
      }
    }
  })

  if (email.value == userValid.email && senha.value == userValid.senha) {
    const user = {
      email: email.value,
      senha: senha.value,
    }

    fetch("http://localhost:3000/login", {
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
        if (data == false) {
          msgError.setAttribute("style", "display: block")
          msgError.innerHTML = "Usuario ou senha incorreto"
          return 
        }
        window.history.pushState(data, "", "../html/qrcodesignin.html")
        window.location.reload()
      })
  } else {
    emailLabel.setAttribute("style", "color: red")
    email.setAttribute("style", "border-color: red")
    senhaLabel.setAttribute("style", "color: red")
    senha.setAttribute("style", "border-color: red")
    msgError.setAttribute("style", "display: block")
    msgError.innerHTML = "Email ou senha incorretos"
    usuario.focus()
  }
}
