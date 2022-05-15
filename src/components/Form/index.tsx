import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.css'


type UserType = {
  nameUser: string,
  emailUser: string,
  passwordUser:string
}

function Form(){
  const navegate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [user, setUser] = useState<UserType>()

  
  function handleSubmit(e: FormEvent){
    e.preventDefault()

   try {
    if(name && email && password){
      setUser({
        nameUser: name,
        emailUser: email,
        passwordUser:password
      })
      navegate('/nameUser/idUserDatabase')
    }
    throw new Error("Preencha todos os campos");
   } catch (error) {
      document.write('ERROR: '+ error)
      navegate('/error')
   }
    console.log(user);
    
  }

 
  

  return (
      <div className='form_container'>
          <div className='form_header'>
              Kassinha Variedades
          </div>
          <h2>Cadastro:</h2>
          <form className='form_Cadastro'>
            <div>
              <label htmlFor="name">Nome:</label>
              <input type="text" 
              name='name' 
              placeholder='Digite seu nome' 
              onChange={event => setName(event.target.value)} 
              />
            </div>
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
            <button onClick={handleSubmit}>Cadastrar</button>
          </form>
      </div>
    
  )
}

export default Form

