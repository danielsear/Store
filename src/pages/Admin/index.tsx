
import Footer from '../../components/Footer'
import Header from '../../components/Header'

import './styles.css'

import { ChangeEvent, FormEvent, useState } from 'react'

import plusSymbol from '../../assets/images/plus_circle_outline_icon.svg'

import { database } from '../../services/firebase'

export type CardType = {
  image: string,
  titulo: string, 
  precoAVista: string,
  precoAPrazo: string,
}

function Admin(){
const [card, setCard] = useState({})

function handlerChangeInputFildCard(e: ChangeEvent<HTMLInputElement>){
   setCard({...card, [e.target.name] : e.target.value})
}

function handlerShowFildCreateCard(){
    const fild = document.querySelector('.admin_CardProduct_container')
    fild?.classList.add('active_display_card')
}
async function handlerCreateCard(e: FormEvent){
  e.preventDefault()
    await database.ref('page').child('products').push(card)
    .then((e)=>{
      const fild = document.querySelector('.admin_CardProduct_container')
       fild?.classList.remove('active_display_card')
    })
    .catch(error => console.error(error))
  
}
console.log(card);

  
  
  return (
    <>
      <Header/>  
        <div className="admin_container">
            <div className='admin_button_create_card' onClick={handlerShowFildCreateCard}>
            Create Card <i><img src={plusSymbol} alt="simbulo de mais" /></i>
          </div>
              <form className='admin_CardProduct_container' onSubmit={handlerCreateCard}>
                  <div className='admin_image'>
                    <label htmlFor="imagem">Imagem:</label>
                    <input type="file" name='image' onChange={handlerChangeInputFildCard}/>
                  </div>
                <div className="admin_CardProduct_info">
                  <div>
                    <label htmlFor="Titulo">Titulo  :  </label>
                    <input type="text" name='titulo' onChange={handlerChangeInputFildCard}/>
                  </div>
                  <strong>R$ <input type="text" name='precoAVista' onChange={handlerChangeInputFildCard}/> de 1x</strong> <br />ou  de até 3x <input type="text" name='precoAPrazo' onChange={handlerChangeInputFildCard}/>
                  <div className='admin_button'>
                  <button type='submit'>Confirme</button> 
                  </div>
                </div>
              </form>
        </div>
      <Footer/>
    </>
  )
}


export default Admin