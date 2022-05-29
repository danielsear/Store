import './styles.css'

import userMenu from '../../assets/images/user-enter1.svg'
import Search from '../../assets/images/search_icon.svg'

import { FormEvent, useState } from 'react'

import { useNavigate, Link } from 'react-router-dom'

type UserCurrent = {
  photoURL?: string
  email: string
  displayName?: string
  admin?: boolean
}

function Header() {
  const navigate = useNavigate()

  const [userCurrent, setUserCurrent] = useState<UserCurrent>()

  /*
  
  function confirmUser() {
    if (user) {
      if (user.admin) {
        setUserCurrent({
          photoURL: user.avatar,
          email: user.email,
          displayName: user.name,
          admin: user.admin
        })
        return
      }
      setUserCurrent({
        photoURL: user.avatar,
        email: user.email,
        displayName: user.name
      })

      return
    } else if (
      currentUser?.email &&
      currentUser?.displayName &&
      currentUser.photoURL
    ) {
      setUserCurrent({
        photoURL: currentUser.photoURL,
        email: currentUser.email,
        displayName: currentUser.displayName
      })
      return
    } else if (currentUser?.email && currentUser?.displayName) {
      setUserCurrent({
        email: currentUser.email,
        displayName: currentUser.displayName
      })

      return
    } else if (currentUser?.email && currentUser?.photoURL) {
      setUserCurrent({
        email: currentUser.email,
        photoURL: currentUser.photoURL
      })
      return
    } else if (currentUser?.email) {
      setUserCurrent({
        email: currentUser.email
      })

      return
    }
  }

  useEffect(() => {
    confirmUser()
  }, [currentUser])


  async function handleLoginGoogle(e: FormEvent) {
    e.preventDefault()

    if (!user && !userCurrent) {
      await signInWithGoogle()
    }
  }

  function handleLogoff() {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch(error => {
        // An error happened.
      })
  }
  */

  function handleLogin(e: FormEvent) {
    e.preventDefault()

    navigate('/form/login')
  }

  function handleShowMenuOver() {
    const fild = document.querySelector('.show_hidden')
    fild?.classList.add('show_menu')
  }
  function handleShowMenuOut() {
    setTimeout(() => {
      const fild = document.querySelector('.show_hidden')
      fild?.classList.remove('show_menu')
    }, 3000)
  }

  return (
    <div id="header_container">
      <section className="logo">Kassinha Variedades</section>
      <section className="pesquisa">
        <div className="search">
          <input type="text" placeholder="  o que você esta procurando?" />
          <button>
            <img src={Search} alt="pesquisa" />
          </button>
        </div>
      </section>
      <section className="user_menu">
        {userCurrent ? (
          <div className="show_user_info">
            <img
              src={userCurrent.photoURL ? userCurrent.photoURL : userMenu}
              alt={
                userCurrent.displayName
                  ? userCurrent.displayName
                  : userCurrent.email
              }
            />
            <div>
              <strong>
                {userCurrent.displayName
                  ? userCurrent.displayName
                  : userCurrent.email.split('@')[0]}
              </strong>
              <br />
              <>
                {userCurrent.admin ? (
                  <Link to="/admin">Servidor Admin</Link>
                ) : (
                  'Olá, seja bem vindo!'
                )}
              </>
              <a href="/" className="sair">
                Sair
              </a>
            </div>
          </div>
        ) : (
          <>
            <div
              onMouseOver={handleShowMenuOver}
              onMouseOut={handleShowMenuOut}
            >
              <a href="#userMenu">
                <i>
                  <img src={userMenu} alt="Menu do usuário" />
                </i>
                Entrar
              </a>
            </div>
            <div className="show_hidden">
              <p>Google Account</p>
              <p onClick={handleLogin}>User Account</p>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default Header
