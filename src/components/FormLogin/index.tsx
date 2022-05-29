import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, findUsers } from '../../services/User'

import './styles.css'

type UsersType = User[]

function FormLogin() {
  const navegate = useNavigate()

  const [users, setUsers] = useState<UsersType>()

  const [user, setUser] = useState<User>({
    id: '',
    email: '',
    name: '',
    password: '',
    admin: false
  })

  async function getUsers() {
    const response: UsersType = await findUsers()
    setUsers(response)
    return
  }

  useEffect(() => {
    getUsers()
  }, [])

  function handleUser(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (user?.email && user.password && user.name) {
      if (users) {
        const userLogged = users.find(element => {
          if (
            user.email === element.email &&
            user.password === element.password &&
            user.name === element.name
          ) {
            if (element.admin) {
              console.log('usuario admin logado')
              return {
                name: element.name,
                email: element.email,
                admin: element.admin
              }
            }
            console.log('usuario logado')
            return {
              name: element.name,
              email: element.email
            }
          }
        })
        navegate(`/${userLogged}`)
      }
    } else {
      console.log('Usuario não existe')
    }
  }

  return (
    <div className="form_container">
      <div className="form_header">Kassinha Variedades</div>
      <h2>Login:</h2>
      <form className="form_Cadastro" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="name"
            name="name"
            placeholder="Digite seu nome"
            onChange={handleUser}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Digite seu email"
            onChange={handleUser}
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            name="password"
            onChange={handleUser}
            placeholder="Digite sua senha"
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>
        Você não possui cadastro?{' '}
        <a href="/form/create-login">Criar cadastro</a>
      </p>
    </div>
  )
}

export default FormLogin
