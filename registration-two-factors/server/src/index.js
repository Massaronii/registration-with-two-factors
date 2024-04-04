import express from "express"
import bodyParser from "body-parser"
import { Low } from "lowdb"
import { JSONFile } from "lowdb/node"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { authenticator } from "otplib"
import  cors from "cors"

const __dirname = dirname(fileURLToPath(import.meta.url))
const databaseFile = join(__dirname, "database", "index.json")

const nomeProjeto = "Cadastro-2Fatores"

const adapter = new JSONFile(databaseFile)
const defaultData = { usuarios: [] }
const db = new Low(adapter, defaultData)
await db.read()

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get("/", (request, response) => {
  response.json("nome")
  response.status(200)
})

app.post("/cadastro", async (request, response) => {
  const email = request.body.email
  const senha = request.body.senha
  const secret = authenticator.generateSecret()
  const novoUsuario = { email, senha, secret }

  const usuarios = db.data.usuarios
  usuarios.push(novoUsuario)
  await db.write()

  const authenticatorUri = authenticator.keyuri(email, nomeProjeto, secret)

  const resposta = { usuario: novoUsuario, authenticatorUri }
  console.log(resposta)
  response.json(resposta)
})

app.post("/login", async (request, response) => {
  const emailLogin = request.body.email
  const senha = request.body.senha
  const usuarios = db.data.usuarios
  
  const user = usuarios.find(({ email }) => email === emailLogin)

  if(!user){
    response.json(false) 
    return 
  }
 
  if (user.senha != senha) {
    response.json(false)
    return 
  }

  response.json(user)
})

app.post("/verificar-codigo", (request, response) => {
  const codigo = request.body.codigo
  const email = request.body.email
  const usuarios = db.data.usuarios
  const usuarioEncontrado = usuarios.find((usuario) => {
    if (email == usuario.email) {
      return true
    } else {
      return false
    }
  })
  const iscodigoValido = authenticator.check(codigo, usuarioEncontrado.secret)
  response.json(iscodigoValido)
  response.status(200)
})

app.listen(port, () => {
  console.log(`ouvindo na port ${port}`)
})
