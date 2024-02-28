import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import { Suspense, lazy } from 'react';
import fallbackDiv from './components/Common/Fallback Div/FallbackDiv';


const App = () => {
  const Main = lazy(()=> import('./components/MainComponent/Main'));
  const Login = lazy(()=> import('./components/Login/login'));
  const Signup = lazy(()=> import('./components/Signup/Signup'));
  return(
    <>
      <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>
          <Route path='/' element = {<Suspense fallback={fallbackDiv}><Main/></Suspense>}/>
          <Route path='/login' element = {<Suspense fallback={fallbackDiv}><Login/></Suspense>}/>
          <Route path='/signup' element = {<Suspense fallback={fallbackDiv}><Signup/></Suspense>}/>
          <Route path='/main' element = {<Suspense fallback={fallbackDiv}><Main/></Suspense>}/>
        </Routes>
      </BrowserRouter>
    </>
    
  )
}

export default App;
