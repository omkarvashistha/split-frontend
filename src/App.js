import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './components/Login/login';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Navbar from './components/Navbar/Navbar';
import Main from './components/MainComponent/Main';

const App = () => {
  return(
    <>
      
      <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>
          <Route path='/' element = {<Main/>}/>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/signup' element = {<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </>
    
  )
}

export default App;
