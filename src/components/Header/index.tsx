import './styles.css'

import userMenu from '../../assets/images/user-enter1.svg'
import Search from '../../assets/images/search_icon.svg'

import {FormEvent} from 'react'

import { useNavigate } from 'react-router-dom'




function Header(){
  const navigate = useNavigate()

  function handleLogin(e: FormEvent) {
    e.preventDefault()

    navigate('/form')
  }

  
  return (
      <div id='header_container'>
        <section className='logo'>Kassinha Variedades</section>
        <section className='pesquisa'>
         <div className='search'>
            <input type="text"  placeholder='  o que você esta procurando?'/>
            <button><img src={Search} alt="pesquisa" /></button>
           </div>
          </section>
        <section className='user_menu'>
          <div onClick={handleLogin}>
            <a href="#userMenu" >
              <i><img src={userMenu} alt="Menu do usuário" /></i>
              Entrar
            </a>
          </div>
        </section>
      </div>
    
  )
}

export default Header

