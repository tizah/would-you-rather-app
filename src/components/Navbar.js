// Packages
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// Action Creators
import { setAuthedUser } from '../actions/authedUser';
// Material UI
import Avatar from '@material-ui/core/Avatar';
import { sarah, johndoe , tylermcginnis } from './Images'

class Navbar extends Component {

  handleLogout = () => {
    this.props.dispatch(setAuthedUser(null));
  }

  render() {

    const { userName, userAvatar } = this.props;

    return (
      <div className='nav'>
        <ul className='nav-list'>
          <li className='nav-item'>
            <NavLink to='/home' activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
<div class='space'> </div>
          <li className='user-greeting'>
            <span>Hey, {userName}!</span>
          </li>
          <li className='nav-item logout'>
            <NavLink to='/' exact activeClassName='active' onClick={this.handleLogout}>
              Log out
            </NavLink>
          </li>
          <li className='user-avatar'>
          <FontAwesomeIcon icon={userAvatar}/>
            <Avatar alt='avatar' src={ [sarah, johndoe, tylermcginnis].find(x => x.includes(userAvatar)) }/>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ users, authedUser }) => {
  const user = users[authedUser];
  return {
    userName: user ? user['name'] : '',
    userAvatar: user ? user['avatarURL'] : ''
  }
};

export default connect(mapStateToProps)(Navbar);
