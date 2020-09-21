import {userService} from '../../services/userService';
import { loading, doneLoading } from './systemActions';


export function addToCart(item) {
  return dispatch => dispatch({ type: 'ADD_TO_CART', item })
}
export function clearCart() {
  return dispatch => dispatch({ type: 'CLEAR_CART' })
}

export function checkout() {
  return (dispatch, getState) => {
      const { cartItems } = getState().userReducer
      const userBalance = getState().userReducer.loggedinUser.balance
      const totalPrice = cartItems.reduce((acc, item) => acc += item.price, 0)
      if (userBalance < totalPrice) return Promise.reject('You dont have enough cash!')
      // Here call the service and make change in backend
      dispatch({ type: 'SPEND_BALANCE', spendAmount: totalPrice })
      dispatch({ type: 'CLEAR_CART' })
      return Promise.resolve('Checked out successfully')
  }
}

export function updateUser(user) {
  return async dispatch => {
     const _user = await userService.update(user);
      dispatch({ type: 'UPDATE_USER', _user })
    };
}


// THUNK
export function loadUsers() {
  return async dispatch => {
    try {
      // example for loading
      dispatch(loading());
      const users = await userService.getUsers();
      dispatch({ type: 'SET_USERS', users });
    } catch (err) {
      console.log('UserActions: err in loadUsers', err);
      // example for rerouting - after changing the store
      // history.push('/some/path');
    } finally {
      dispatch(doneLoading());
    }
  };
}
// THUNK
export function removeUser(userId) {
  return async dispatch => {
    try {
      await userService.remove(userId);
      dispatch({ type: 'USER_REMOVE', userId });
    } catch (err) {
      console.log('UserActions: err in removeUser', err);
    }
  };
}
// THUNK
export function login(userCreds) {
  return async dispatch => {
    const user = await userService.login(userCreds);
    dispatch({ type: 'SET_USER', user });
  };
}
export function signup(userCreds) {
  console.log('usercred-',userCreds);
  return async dispatch => {
    const user = await userService.signup(userCreds);
    dispatch({ type: 'SET_USER', user });
  };
}
export function logout() {
  return async dispatch => {
    await userService.logout();
    dispatch({ type: 'SET_USER', user: null });
  };
}
