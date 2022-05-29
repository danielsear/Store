import './styles.css'

export type CardType = {
  id: string
  image: string
  titulo: string
  precoAVista: string
  precoAPrazo: string
  userAdmin?: boolean
  onClickEdit?: () => void
  onClickDelete?: () => void
}

function CardProduct({
  id,
  image,
  titulo,
  precoAVista,
  precoAPrazo,
  userAdmin,
  onClickEdit,
  onClickDelete
}: CardType) {
  return (
    <>
      <div className="CardProduct_container">
        <img src={image} alt={titulo} />

        <div className="CardProduct_info">
          <p>{titulo}</p>
          <p>
            <strong>R$ {precoAVista} de 1x</strong> <br />
            ou de até 3x {precoAPrazo}
          </p>
        </div>
        {userAdmin && (
          <div className="card_button">
            <div className="card_button_edit">
              <button onClick={onClickEdit}>Edit</button>
            </div>
            <div className="card_button_delete">
              <button onClick={onClickDelete}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CardProduct
