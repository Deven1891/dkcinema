// src/components/Footer.js
import React, { useState } from 'react';
import './Footer.css';
import { CgMenuBoxed } from 'react-icons/cg';
import { FiHeart, FiUserCheck } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { BsCollectionPlay } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import MenuDrawer from '../../Components/Drawer/MenuDrawer';

const MobileFooter = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { likedMovies } = useSelector(state => state.userGetFavoriteMovies);
  const { userInfo } = useSelector(state => state.userLogin);
  const both = 
      "transitions text-2xl flex-colo rounded-md px-4 py-3";
  const active = 
      "hover:bg-main hover:text-white bg-white text-main"
  const inActive = 
      "hover:bg-white hover:text-main text-white"
  const Hover = ({ isActive }) => 
      isActive ? `${active} ${both}`: `${inActive} ${both}`;

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <footer className='lg:hidden fixed z-50 bottom-0 w-full px-1'>
      <div className='bg-dry rounded-md flex-btn w-full p-1'>
        <NavLink to="/movies" className={Hover}>
            <BsCollectionPlay />
        </NavLink>
        <NavLink to="/favorites" className={Hover}>
            <div className='relative'>
                <div className='w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1'>
                  {likedMovies?.length > 0 ? likedMovies?.length : 0}
                </div>
                <FiHeart />
            </div>
        </NavLink>
        <NavLink to={userInfo ? userInfo.isAdmin ? "/dashboard" : "/profile" : "/login"} className={Hover}>
            <FiUserCheck />
        </NavLink>
        <button onClick={toggleDrawer} className={`${inActive} ${both}`}>
          <CgMenuBoxed />
        </button>
        {isDrawerOpen && (
          <div className="drawer">
            <MenuDrawer toggleDrawer={toggleDrawer} closeDrawer={closeDrawer}/>            
          </div>
        )}
      </div>
    </footer>
  );
};

export default MobileFooter;

