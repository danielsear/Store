import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { v4 } from 'uuid'
import CreateUser, { User } from '../../services/User'

import './styles.css'

function Form() {
  const navegate = useNavigate()

  const [user, setUser] = useState<User>({
    email: '',
    name: '',
    password: '',
    admin: false
  })

  function handleUser(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const id = v4()

    if (user?.email && user.password && user.name) {
      CreateUser({
        email: user.email,
        password: user.password,
        name: user.name
      })
      navegate('/')
    } else if (user?.email && user.password && user.name && user.admin) {
      CreateUser({
        email: user.email,
        password: user.password,
        name: user.name,
        admin: user.admin
      })
      navegate('/')
    }
  }

  return (
    <div className="form_container">
      <div className="form_header">Kassinha Variedades</div>
      <h2>Create Login:</h2>
      <form className="form_Cadastro" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
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
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  )
}

export default Form
