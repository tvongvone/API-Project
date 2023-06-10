// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import alien from '../../images/alien.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='list-container'>
      <li>
        <NavLink style={{fontSize: '20px', textDecoration: 'none', fontWeight: '800px'}} exact to="/">tonysnb</NavLink>
      </li>
      {isLoaded && (
        <>
          <li>
          {sessionUser && (
            <NavLink to='/spots/new' style={{marginRight: '10px', textDecoration: 'none', color: 'dodgerblue'}}>Create a New Spot </NavLink>
          )}
            <ProfileButton user={sessionUser} />
          </li>
        </>
      )}
    </ul>
  );
}

export default Navigation;
