import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Form from './components/Form';


import Admin from './pages/Admin';
import Home from "./pages/Home";



function App() {
  
  
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/form' element={<Form/>}/>
          <Route path='/admin/login/senha' element={<Admin/>} />
        </Routes>
      </Router>
  
  )
}

export default App;
