import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './components/Login/login';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return(
    <>
      
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/home' element = {<Home/>}/>
          <Route path='/signup' element = {<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </>
    
  )
}

export default App;
