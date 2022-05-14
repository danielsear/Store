import './styles.css'

import Search from '../../assets/images/search_icon.svg'

function InputSearch(){
  return (
    <div className='search'>
      <input type="text"  placeholder='  O que você esta prucrando?'/>
      <button><img src={Search} alt="pesquisa" /></button>
    </div>
  )
}


export default InputSearch