import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  loadUsers,
  removeUser,
  login,
  logout,
} from '../../store/actions/userActions';

class _Login extends Component {
  state = {
    msg: '',
    loginCred: {
      // email: '',
      password: ''
    },
    signupCred: {
      // email: '',
      password: ''
    }
  };

  loginHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }));
  };

  signupHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value
      }
    }));
  };

  doLogin = async ev => {
    ev.preventDefault();
    const { email, password } = this.state.loginCred;
    if (!email || !password) {
      return this.setState({ msg: 'Please enter user/password' });
    }
    const userCreds = { email, password };
    this.props.login(userCreds);
    this.setState({ loginCred: { email: '', password: '' } });
  };

  removeUser = userId => {
    this.props.removeUser(userId);
  };

  openGuestMode=(ev)=>{
    ev.preventDefault();
    const guest = {
      email : 'guestMode@gmail.com',
      password : '123'
  }
  this.props.login(guest);
  this.setState({ loginCred: { email: '', password: '' } });
}

  render() {
    let loginSection = (
      <form className="main-container" onSubmit={this.doLogin}>
        <input
          type="text"
          name="email"
          value={this.state.loginCred.email || ''}
          onChange={this.loginHandleChange}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          name="password"
          value={this.state.loginCred.password || ''}
          onChange={this.loginHandleChange}
          placeholder="Password"
        />
        <br />
        <button>Login</button>
      </form>
    );

    const { loggedInUser } = this.props;
    return (
      <div className="main-container">
        <div className="just-row">
          <h1>
            Login
        </h1>
        </div>
        <h2>{this.state.msg}</h2>
        {loggedInUser && (
          <div>
            <h2>Welcome: {loggedInUser.fullName} </h2>
            <button onClick={this.props.logout}>Logout</button>
          </div>
        )}
        {!loggedInUser && loginSection}
        <hr />
        {/* <button onClick={this.props.loadUsers}>Get All Users</button> */}
        {this.props.isLoading && 'Loading...'}
        {this.props.users && <ul>
          {this.props.users.map(user => (
            <li key={user._id}>
              <pre>{JSON.stringify(user, null, 2)}</pre>
              <button
                onClick={() => {
                  this.removeUser(user._id);
                }}
              >
                Remove {user.fullName}
              </button>
            </li>
          ))}
        </ul>}
        <div className="guest-mode">
          <button onClick={this.openGuestMode}>Demo Mode</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.userReducer.users,
    loggedInUser: state.userReducer.loggedInUser,
    isLoading: state.systemReducer.isLoading
  };
};
const mapDispatchToProps = {
  login,
  logout,
  removeUser,
  loadUsers
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);
