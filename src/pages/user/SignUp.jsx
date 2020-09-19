import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signup } from '../../store/actions/userActions.js';

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

    addToPrefs =(pref)=>{
        let prefs = (this.state.prefs || []);
        prefs.push(pref)
        this.setState(prevState=>({
                 signupCred:{
                    ...prevState.signupCred,
                 prefs:[...this.state.signupCred.prefs, pref]}
        }), ()=> console.log(this.state.signupCred))
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
        console.log('inside',this.state.signupCred);
        const { email, password, userName, fullName, prefs } = this.state.signupCred;
        if (!email || !password || !userName || !fullName || !prefs) {
            return this.setState({ msg: 'All inputs are required!' });
        }
        const signupCreds = { email, password, userName, fullName, prefs };
        this.props.signup(signupCreds);
        this.setState({ signupCred: { email: '', password: '', userName: '', fullName: '', prefs:[] } });
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
                        <li onClick={()=>this.addToPrefs('jogging')}name="pilatis">pilatis</li>
                        <li onClick={()=>this.addToPrefs('cardio')}name="cardio">cardio</li>
                        <li onClick={()=>this.addToPrefs('meditation')}name="Meditation">Meditation</li>
                        <li onClick={()=>this.addToPrefs('nutrition')}name="Nutrition">Nutrition</li>
                        <li onClick={()=>this.addToPrefs('diet')}name="Diet">Diets</li>
                        <li onClick={()=>this.addToPrefs('mindfullness')}name="mindfullness">mindfullness</li>
                        <li onClick={()=>this.addToPrefs('well-bieng')} name="well-bieng<">well-bieng</li>
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

