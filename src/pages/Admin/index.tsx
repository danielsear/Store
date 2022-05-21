
import './styles.css'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import plusSymbol from '../../assets/images/plus_circle_outline_icon.svg'

import { database } from '../../services/firebase'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import CardProduct from '../../components/CardProduct'

export type CardType = {
  id:string,
  image: string,
  titulo: string, 
  precoAVista: string,
  precoAPrazo: string,
}


type Products= Record< 
  string,
  {
    image: string,
    precoAPrazo: string,
    precoAVista: string,
    titulo: string,
  }
>

function Admin(){
const [card, setCard] = useState({})

const [produtos, setProdutos]= useState<CardType[]>([])


/*

async function returnData(){

  await database.ref('page').child('products').on('value', products =>{
    const listProducts :Products = products.val()
    const arrayProducts = Object.entries(listProducts).map(([key,value])=> {
      return {
        id: key,
          image: value.image,
          precoAPrazo: value.precoAPrazo,
          precoAVista: value.precoAVista,
          titulo: value.titulo,
        
      }
    })

    arrayProducts.forEach(product => 
       {
         console.log(product);
         
         setProdutos(product)
        }
    )
  })
}
*/

console.log(produtos);


useEffect(()=>{

  const produxtsRef= database.ref('page')

  produxtsRef.on('value', page =>{
    const pages = page.val()
    const listProducts :Products = pages.products ?? {}
    const arrayProducts = Object.entries(listProducts).map(([key,value])=> {
      return {
        id: key,
          image: value.image,
          precoAPrazo: value.precoAPrazo,
          precoAVista: value.precoAVista,
          titulo: value.titulo,
      }
    })
    setProdutos(arrayProducts)
  })

 return ()=>{
  produxtsRef.off('value')
 }
}, [card])



console.log(produtos);


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
              <div className='admin_show_product'>
                {produtos.map(produto =>{
                  return(
                    <CardProduct
                    image={produto.image}
                    titulo={produto.titulo}
                    precoAVista={produto.precoAVista}
                    precoAPrazo={produto.precoAPrazo}
                    key={produto.id}
                    />
                   )
                  })}
              </div>
        </div>
      <Footer/>
    </>
  )
}


export default Admin