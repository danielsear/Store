import './styles.css'

import userMenu from '../../assets/images/user-enter1.svg'
import Search from '../../assets/images/search_icon.svg'

import {FormEvent} from 'react'

import { useNavigate } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import { auth, database } from '../../services/firebase'




function Header(){
  const navigate = useNavigate()
  const {user,signInWithGoogle} = useAuth()

  

  function handleLogin(e: FormEvent) {
    e.preventDefault()

    navigate('/form/login')
  }
  async function handleLoginGoogle(e: FormEvent) {
    e.preventDefault()

    if(!user){
      await signInWithGoogle()
    }
  }
 
  function handleLogoff(){
   auth.signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  

  function handleShowMenuOver(){  
    const fild = document.querySelector('.show_hidden')
      fild?.classList.add('show_menu')
  }
  function handleShowMenuOut(){  
    setTimeout(() => {
      const fild = document.querySelector('.show_hidden')
      fild?.classList.remove('show_menu')
    }, 3000);
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
          {!user ? (
            <>
            <div  onMouseOver={handleShowMenuOver} onMouseOut={handleShowMenuOut}>
            <a href="#userMenu" >
              <i><img src={userMenu} alt="Menu do usuário" /></i>
              Entrar
            </a>
          </div>
          <div className='show_hidden'>
                  <p onClick={handleLoginGoogle}>Google</p>
                  <p onClick={handleLogin}>User</p>
            </div>
            </>
          ): (
            <div >
              <img src={user.avatar} alt={user.name} />
              Olá, seja bem vindo! 
            <a href="/" className='sair' onClick={handleLogoff}>
              Sair
            </a>
          </div>
          )}
        </section>
      </div>
    
  )
}

export default Header

