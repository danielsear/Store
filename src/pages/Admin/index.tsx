import './styles.css'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import plusSymbol from '../../assets/images/plus_circle_outline_icon.svg'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import CardProduct from '../../components/CardProduct'

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

type photo = {
  name: string
  size: number
  type: string
}

function Admin() {
  const [card, setCard] = useState({})
  const [produtos, setProdutos] = useState<CardType[]>([])

  const [imageProgress, setImageProgress] = useState(0)

  /*

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

*/
  function handlerChangeInputFildCard(e: ChangeEvent<HTMLInputElement>) {
    setCard({ ...card, [e.target.name]: e.target.value })
  }

  function handlerChangeInputImageFildCard(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files

    if (files) {
      const file: photo = {
        name: files[0].name,
        size: files[0].size,
        type: files[0].type
      }
    }

    console.log(files?.item.length)
  }

  function handlerShowFildCreateCard() {
    const fild = document.querySelector('.admin_CardProduct_container')
    fild?.classList.add('active_display_card')
  }
  async function handlerCreateCard(e: FormEvent) {
    e.preventDefault()
  }

  const [cardEdit, setCardEdit] = useState({})
  const [idCardEdit, setIdCardEdit] = useState('')

  function handlerChangeInputFildCardEdit(e: ChangeEvent<HTMLInputElement>) {
    setCardEdit({ ...cardEdit, [e.target.name]: e.target.value })
  }

  async function handlerEditCard(e: FormEvent) {
    e.preventDefault()
  }

  function handlerEdit(id: string) {
    setIdCardEdit(id)
    const fild = document.querySelector('.edit_CardProduct_container')
    fild?.classList.add('active_display_card_edit')
  }

  function handlerDelete(id: string) {
    const confirme = window.confirm(
      'Você deseja realmente deletar esse produto?'
    )
  }

  return (
    <>
      <Header />

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
              onChange={handlerChangeInputImageFildCard}
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
              <button type="submit">Criar Produto</button>
            </div>
          </div>
        </form>

        <form className="edit_CardProduct_container" onSubmit={handlerEditCard}>
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
                onClickEdit={() => {
                  handlerEdit(produto.id)
                }}
                onClickDelete={() => {
                  handlerDelete(produto.id)
                }}
              />
            )
          })}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Admin
