import './styles.css'

import img1 from '../../assets/images/products/porcelanas-brancas.jpg'

function CardProduct(){
  return (
    
     <div className='container'>
        <div className='CardProduct_container'>
            <a href="#">
              <img src={img1} alt="Jogo de porcelana branca" />
            </a>
            <div className="CardProduct_info">
              <p>Jogo de Porcelana Branca</p>
              <p><strong>R$ 198,90 de 1x</strong> <br />ou 3x de 66,30</p>
            </div>
      </div>
     </div>
    
  )
}

export default CardProduct