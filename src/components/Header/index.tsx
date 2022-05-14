import './styles.css'

import userMenu from '../../assets/images/user-enter1.svg'

function Header(){
  return (
    
      <div id='header_container'>
        <section className='logo'>Kassinha Variedades</section>
        <section className='pesquisa'>Pesquisa</section>
        <section className='user_menu'>
          <div >
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

