function confirmarQRcode() {
  let codigo = document.getElementById("numberQr")
  const body = {
    codigo: codigo.value,
    email: window.history.state.usuario.email,
  }
  if(!codigo.value){
     msgError.setAttribute("style", "display: block")
     msgError.innerHTML = "Adicione um Codigo"
     msgSuccess.innerHTML = ""
     msgSuccess.setAttribute("style", "display: none")
     return
  } 
  console.log(codigo.value)

  fetch("http://localhost:3000/verificar-codigo", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(body),
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data == true) {
        msgSuccess.setAttribute("style","display:block")
        msgSuccess.innerHTML = "Parabens voce esta cadastrado"
        msgError.innerHTML = ""
        msgError.setAttribute("style", "display: none")
        window.location.href = "../html/signin.html"
      } else {
        msgError.setAttribute("style", "display: block")
        msgError.innerHTML = "O codigo esta errado"
        msgSuccess.innerHTML = ""
        msgSuccess.setAttribute("style", "display: none")
      }
    })
}
