import './styles.css'


export type CardType = {
  image: string,
  titulo: string, 
  precoAVista: string,
  precoAPrazo: string,
}

function CardProduct({image, titulo, precoAVista,precoAPrazo}: CardType){

  return (
    
     <div className='container'>
        <div className='CardProduct_container'>
            <a href="#">
              <img src={image} alt="Jogo de porcelana branca" />
            </a>
            <div className="CardProduct_info">
              <p>{titulo}</p>
              <p><strong>R$ {precoAVista} de 1x</strong> <br />ou  de até 3x {precoAPrazo}</p>
            </div>
      </div>
     </div>
    
  )
}

export default CardProduct