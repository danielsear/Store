import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {v4} from 'uuid'

import './styles.css'

import {auth, database} from '../../services/firebase'


function Form(){
  const navegate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
 

  
  function handleSubmit(e: FormEvent){
    e.preventDefault()

    const id = v4()

    if(name && email && password){
     
      
      const userconect = {
        id: id,
        name: name,
        email:email,
        password: password
      }

      auth.createUserWithEmailAndPassword(userconect.email, userconect.password)
      .then((userCredential)=>{ 
        const user = userCredential.user; 
       const key = database.ref('page').child('userAuthentication').push(userconect).key
       
        navegate(`/form/login/${key}`)
      }).catch(error => console.error(error))

    }
   
  }

 
  return (
      <div className='form_container'>
          <div className='form_header'>
              Kassinha Variedades
          </div>
          <h2>Create Login:</h2>
          <form className='form_Cadastro' onSubmit={handleSubmit}>
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
            <button type='submit' >Cadastrar</button>
          </form>
      </div>
    
  )
}

export default Form

