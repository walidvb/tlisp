import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


import {signUpSuccess} from '../../actions/userActions';
import { request, routes } from '../../request';
import styles from './LoginForm.scss';

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class LoginForm extends Component {
    static propTypes = {

    }
    state ={
        user: { email: '', password: '', name: '' },
        valid: false,
    }
    handleChange(key, value){
        let { user } = this.state;
        user[key] = value;
        this.setState({ user });
        this.validateForm();
    }
    validateForm(){
        const { name, email, password, password_confirmation } = this.state.user;
        const emailValid = emailRegExp.test(email);
        const passwordsMatch = password.length >= 4 && password == password_confirmation;
        this.setState({
            valid: passwordsMatch && emailValid && name.length > 2,
            passwordsMatch,
            emailInvalid: email.length > 0 && !emailValid,
        })
    }
    handleSubmit(evt){
        evt.preventDefault()
        const options = {
            method: 'POST',
            body: {user: this.state.user}
        }

        request(routes.api.users.signUp, options)
        .then(( { user } ) => {
            this.setState({
                success: true,
            })

            this.props.signUpSuccess(user)
        })
    }
    render() {
        const { emailInvalid, valid, user, passwordsMatch } = this.state;
        return (
            <form className={styles.container} onSubmit={this.handleSubmit.bind(this)}>
                <div><input className={["input"].join(' ')} type="email" placeholder="Your name"
                    onChange={(evt) => this.handleChange('name', evt.target.value)} /></div>
                <div><input className={["input", (emailInvalid ? "invalid" : null)].join(' ')} type="email" placeholder="Your email" 
                    onChange={(evt) => this.handleChange('email', evt.target.value)}/></div>
                <div><input className="input" type="password" placeholder="Your password" 
                    onChange={(evt) => this.handleChange('password', evt.target.value)} /></div>
                <div>
                    <input className={["input", (!passwordsMatch)].join(' ')} type="password" placeholder="Repeat your password" 
                    onChange={(evt) => this.handleChange('password_confirmation', evt.target.value)} />
                    {(user.password_confirmation && !passwordsMatch) ? <div className="hint red"> Password confirmation doesn't match</div> : null}
                </div>
                <button className={["button border", styles.passwordConfirmation].join(' ')} disabled={!valid}> Sign up </button>
            </form>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    signUpSuccess: (user) => dispatch(signUpSuccess(user)),    
})


const mapStateToProps = (state, ownProps) => ({
    
})


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);