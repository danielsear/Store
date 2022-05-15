import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './styles.css'

import {auth} from '../../services/firebase'


type UserType = {
  emailUser: string,
  passwordUser:string,
  admin? : boolean
}

function FormLogin(){
  const navegate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [user, setUser] = useState<UserType>()

  
  function handleSubmit(e: FormEvent){
    e.preventDefault()


    if( email && password){
      setUser({
  
        emailUser: email,
        passwordUser:password
      })

      const userconect = {
        email:email,
        password: password
      }

    }
    
  }

 
  return (
      <div className='form_container'>
          <div className='form_header'>
              Kassinha Variedades
          </div>
          <h2>Login:</h2>
          <form className='form_Cadastro'>
            <div>
              <label htmlFor="email" >Email:</label>
              <input type="email"
                name='email' 
                placeholder='Digite seu email' 
                onChange={event => setEmail(event.target.value)}
                />
            </div> 
            <div>
              <label htmlFor="password">Senha:</label>
              <input type="password" 
              name='password' 
              onChange={event => setpassword(event.target.value)}
              placeholder='Digite sua senha' 
              />
            </div>
           
            <button onClick={handleSubmit}>Entrar</button>
            <p>Você não possui cadastro? <a href="/form/create-login">Criar cadastro</a></p>
          
          </form>
      </div>
    
  )
}

export default FormLogin

