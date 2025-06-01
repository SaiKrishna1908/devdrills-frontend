import './App.css'
import Home from './components/Home/Home'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login/Login';
import PrivateRoutes from './PrivateRoutes';
import TokenExchange from './components/Home/TokenExchange';


function App() {   

  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes></PrivateRoutes>}>              
              <Route path='/home' element={<Home></Home>}></Route>
          </Route>                    
          <Route path='/' element={localStorage.getItem("token") == null ? <Login></Login> : <Home></Home>}></Route>
          <Route path='/exchange' element={<TokenExchange/>}></Route>
        </Routes>        
      </Router>      
    </>
  )
}

export default App
