import React, { useEffect, useState } from 'react';
import './MowMenu.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MowMenu = ({setComponent}) => { 
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [{"name" : "Home" , "component" : 'home'},
                    {"name" : "Friends" , "component" : 'friends'},
                    {"name" : "Activity" , "component" : 'home'}, 
                    {"name" : "Account" , "component" : 'home'}];
  const [authenticated,setAuth] = useState(false);
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.isAuthenticated.isAuth);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(()=>{
      if(isAuth) {setAuth(true)};
  },[isAuth])

  return (
    <div className={`mobile-navbar-container`}>
        <ul className='mobile-navbar-list'>
          {navItems.map((item,index) => (
            <li key={index} onClick={() => {setComponent(item.component)}}>
              {item.name}
            </li>
          ))}
          {authenticated ?
              <li onClick={(e)=>{e.preventDefault(); localStorage.clear(); navigate('/login')}}>    
                Logout
              </li>
              :
              <li onClick={(e)=>{e.preventDefault(); localStorage.clear(); navigate('/login')}}>    
                  Login
              </li>
          }
        </ul>
    </div>
  );
};

export default MowMenu;
