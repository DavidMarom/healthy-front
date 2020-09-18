import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signup } from '../../store/actions/userActions';

class _SignUp extends Component {

    state = {
        msg: '',
        signupCred: {
            email: '',
            password: '',
            userName: '',
            fullName: '',
            prefs: []
        }
    };

    //????????????????????????????????????????????????????????????????????
    addToPrefs =(pref)=>{
        this.setState(prevState => {
            return {prefs: [...prevState.prefs, pref]}
        }, ()=>console.log(this.state.prefs))
    }

    signupHandleChange = ev => {
        const { name, value } = ev.target;
        this.setState(prevState => ({
            signupCred: {
                ...prevState.signupCred,
                [name]: value
            }
        }));
    };

    doSignup = async ev => {
        ev.preventDefault();
        const { email, password, username, fullName, prefs } = this.state.signupCred;
        if (!email || !password || !username || !fullName || !prefs) {
            return this.setState({ msg: 'All inputs are required!' });
        }
        const signupCreds = { email, password, username, fullName, prefs };
        this.props.signup(signupCreds);
        this.setState({ signupCred: { email: '', password: '', username: '', fullName: '' } });
    };


    render() {
        let signupSection = (
            <form onSubmit={this.doSignup}>
                <input
                    type="text"
                    name="email"
                    value={this.state.signupCred.email}
                    onChange={this.signupHandleChange}
                    placeholder="Email"
                />
                <br />
                <input
                    name="password"
                    type="password"
                    value={this.state.signupCred.password}
                    onChange={this.signupHandleChange}
                    placeholder="Password"
                />
                <br />
                <input
                    type="text"
                    name="fullName"
                    value={this.state.signupCred.fullName}
                    onChange={this.signupHandleChange}
                    placeholder="full name"
                />
                <br />
                <br />
                <input
                    type="text"
                    name="userName"
                    value={this.state.signupCred.username}
                    onChange={this.signupHandleChange}
                    placeholder="Username"
                />
                <br />
                <section>
                <h2>Please choose are your interests?</h2>
                    <ul>
                        <li onClick={()=>this.addToPrefs('sport')}>Sport</li>
                        <li onClick={()=>this.addToPrefs('yoga')}>Yoga</li>
                        <li onClick={()=>this.addToPrefs('running')}>Running</li>
                        <li onClick={()=>this.addToPrefs('jogging')}>jogging</li>
                        <li name="pilatis">pilatis</li>
                        <li name="Swimming">Swimming</li>
                        <li name="Meditation">Meditation</li>
                        <li name="Nutrition">Nutrition</li>
                        <li name="Diets">Diets</li>
                        <li name="mindfullness">mindfullness</li>
                        <li name="well-bieng<">well-bieng</li>
                    </ul>
                </section>
                <button>Signup</button>
            </form>
        );

        const { loggedInUser } = this.props;
        return (
            <div className="test">
                <h1>
                    SignUp Here!
                </h1>
                <h2>{this.state.msg}</h2>
                {loggedInUser && (
                    <div>
                        <h2>Welcome: {loggedInUser.username} </h2>
                        <button onClick={this.props.logout}>Logout</button>
                    </div>
                )}
                {!loggedInUser && signupSection}
                <hr />
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
    signup
};

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp);


// "user": [
//     {
//       "_id": "u101",
//       "fullName": "Jenny Tieck",
//       "userName": "Jenny",
//       "password": "secret",
//       "email": "jenny12@gmail.com",
//       "facebook": "https://www.facebook.com/chen.edri.3",
//       "twitter": "",
//       "imgUrl": "https://res.cloudinary.com/dygtul5wx/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1600327755/sprint%204/users/68_styiv0.jpg",
//       "income": 320,
//       "prefs": [
//         "sport",
//         "yoga",
//         "wellBieng"
//       ]