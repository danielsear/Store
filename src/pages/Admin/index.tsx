import './styles.css'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import plusSymbol from '../../assets/images/plus_circle_outline_icon.svg'

import { database } from '../../services/firebase'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import CardProduct from '../../components/CardProduct'
import useAuth from '../../hooks/useAuth'

export type CardType = {
  id: string
  image: string
  titulo: string
  precoAVista: string
  precoAPrazo: string
}

type Products = Record<
  string,
  {
    image: string
    precoAPrazo: string
    precoAVista: string
    titulo: string
  }
>

function Admin() {
  const [card, setCard] = useState({})
  const [produtos, setProdutos] = useState<CardType[]>([])

  const { user } = useAuth()

  useEffect(() => {
    const produxtsRef = database.ref('page')

    produxtsRef.on('value', page => {
      const pages = page.val()
      const listProducts: Products = pages.products ?? {}
      const arrayProducts = Object.entries(listProducts).map(([key, value]) => {
        return {
          id: key,
          image: value.image,
          precoAPrazo: value.precoAPrazo,
          precoAVista: value.precoAVista,
          titulo: value.titulo
        }
      })
      setProdutos(arrayProducts)
    })

    return () => {
      produxtsRef.off('value')
    }
  }, [card])

  function handlerChangeInputFildCard(e: ChangeEvent<HTMLInputElement>) {
    setCard({ ...card, [e.target.name]: e.target.value })
  }

  function handlerShowFildCreateCard() {
    const fild = document.querySelector('.admin_CardProduct_container')
    fild?.classList.add('active_display_card')
  }
  async function handlerCreateCard(e: FormEvent) {
    e.preventDefault()
    await database
      .ref('page')
      .child('products')
      .push(card)
      .then(e => {
        const fild = document.querySelector('.admin_CardProduct_container')
        fild?.classList.remove('active_display_card')
      })
      .catch(error => console.error(error))
  }

  const [cardEdit, setCardEdit] = useState({})
  const [idCardEdit, setIdCardEdit] = useState('')

  function handlerChangeInputFildCardEdit(e: ChangeEvent<HTMLInputElement>) {
    setCardEdit({ ...cardEdit, [e.target.name]: e.target.value })
  }

  async function handlerEditCard(e: FormEvent) {
    e.preventDefault()
    await database
      .ref('page')
      .child(`products/${idCardEdit}`)
      .set(cardEdit)
      .then(e => {
        const fildEdit = document.querySelector('.edit_CardProduct_container')
        fildEdit?.classList.remove('active_display_card_edit')

        console.log('Produto editado com sucesso')
      })
      .catch(error => console.error(error))
  }

  function handlerClick(id: string) {
    setIdCardEdit(id)
    const fild = document.querySelector('.edit_CardProduct_container')
    fild?.classList.add('active_display_card_edit')
  }

  function handlerDelete(id: string) {
    const confirme = window.confirm(
      'Você deseja realmente deletar esse produto?'
    )
    if (confirme) {
      database.ref('page').child(`products/${id}`).remove()
      console.log('Produto deletado com sucesso!')
    }
  }

  return (
    <>
      {user?.admin === true && <Header />}
      {user?.admin === true ? (
        <div className="admin_container">
          <div
            className="admin_button_create_card"
            onClick={handlerShowFildCreateCard}
          >
            Create Card{' '}
            <i>
              <img src={plusSymbol} alt="simbulo de mais" />
            </i>
          </div>
          <form
            className="admin_CardProduct_container"
            onSubmit={handlerCreateCard}
          >
            <div className="admin_image">
              <label htmlFor="imagem">Imagem:</label>
              <input
                type="file"
                name="image"
                onChange={handlerChangeInputFildCard}
              />
            </div>
            <div className="admin_CardProduct_info">
              <div>
                <label htmlFor="Titulo">Titulo : </label>
                <input
                  type="text"
                  name="titulo"
                  onChange={handlerChangeInputFildCard}
                />
              </div>
              <strong>
                R${' '}
                <input
                  type="text"
                  name="precoAVista"
                  onChange={handlerChangeInputFildCard}
                />{' '}
                de 1x
              </strong>{' '}
              <br />
              ou de até 3x{' '}
              <input
                type="text"
                name="precoAPrazo"
                onChange={handlerChangeInputFildCard}
              />
              <div className="admin_button">
                <button type="submit">Confirme</button>
              </div>
            </div>
          </form>

          <form
            className="edit_CardProduct_container"
            onSubmit={handlerEditCard}
          >
            <div className="edit_image">
              <label htmlFor="imagem">Imagem:</label>
              <input
                type="file"
                name="image"
                onChange={handlerChangeInputFildCardEdit}
              />
            </div>
            <div className="edit_CardProduct_info">
              <div>
                <label htmlFor="Titulo">Titulo : </label>
                <input
                  type="text"
                  name="titulo"
                  onChange={handlerChangeInputFildCardEdit}
                />
              </div>
              <strong>
                R${' '}
                <input
                  type="text"
                  name="precoAVista"
                  onChange={handlerChangeInputFildCardEdit}
                />{' '}
                de 1x
              </strong>{' '}
              <br />
              ou de até 3x{' '}
              <input
                type="text"
                name="precoAPrazo"
                onChange={handlerChangeInputFildCardEdit}
              />
              <div className="edit_button">
                <button type="submit">Editar Produto</button>
              </div>
            </div>
          </form>

          <div className="admin_show_product">
            {produtos.map(produto => {
              return (
                <CardProduct
                  image={produto.image}
                  titulo={produto.titulo}
                  precoAVista={produto.precoAVista}
                  precoAPrazo={produto.precoAPrazo}
                  key={produto.id}
                  id={produto.id}
                  userAdmin={user.admin}
                  onClickEdit={() => {
                    handlerClick(produto.id)
                  }}
                  onClickDelete={() => {
                    handlerDelete(produto.id)
                  }}
                />
              )
            })}
          </div>
        </div>
      ) : (
        <div className="error_admin_not_logged">
          <h1>Servidor não encontrado;</h1>
        </div>
      )}
      {user?.admin === true && <Footer />}
    </>
  )
}

export default Admin
