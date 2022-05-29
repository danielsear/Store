import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateUser, { User } from '../../services/User'

import './styles.css'

function FormLogin() {
  const navegate = useNavigate()

  function handleUser() {}

  return (
    <div className="form_container">
      <div className="form_header">Kassinha Variedades</div>
      <h2>Login:</h2>
      <form className="form_Cadastro">
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

        <button>Entrar</button>
        <p>
          Você não possui cadastro?{' '}
          <a href="/form/create-login">Criar cadastro</a>
        </p>
      </form>
    </div>
  )
}

export default FormLogin
