import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'



import AuthContextProvider from './Context/AuthContex';


import Admin from './pages/Admin';
import Home from "./pages/Home";
import FormCreate from './components/FormCreate';
import FormLogin from './components/FormLogin';



function App() {
  
  
  return (
      <Router>
        <AuthContextProvider>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/form/login' element={<FormLogin/>}/>
              <Route path='/form/create-login' element={<FormCreate/>}/>
              <Route path='/admin/login/senha' element={<Admin/>} />
            </Routes>
        </AuthContextProvider>
      </Router>
  
  )
}

export default App;
