import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {signUpSuccess} from '../../actions/userActions';
import { request, routes } from '../../request';
import styles from './LoginForm.scss';

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class LoginForm extends Component {
    static propTypes = {

    }
    state ={
        user: { 
            email: '', 
            password: '',
            name: '', 
            password_confirmation: '',
        },
        valid: false,
    }
    handleChange(key, value){
        let { user } = this.state;
        user[key] = value;
        this.setState({ user });
        if(!this.state.success){
            this.validateForm();
        }
    }
    validateForm(){
        const isSignUp = this.state.isSignUp;
        const { name, email, password, password_confirmation } = this.state.user;
        const emailValid = emailRegExp.test(email);
        const passwordsMatch = password.length >= 4 && 
            (!isSignUp || password == password_confirmation);
        this.setState({
            valid: passwordsMatch && emailValid,
            passwordsMatch,
            emailInvalid: email.length > 0 && !emailValid,
        })
    }
    handleSubmit(evt){
        evt.preventDefault()
        const isSignUp = this.state.isSignUp;
        let options = {
            method: 'POST',
            body: {
                user: {
                    ...this.state.user,
                }
            }
        }
        let url = routes.api.users.signIn;
        if(isSignUp){
            options.body.clique_ids = [this.props.clique.id];
            url = routes.api.users.signUp;
        }
        request(url, options)
        .then(( { user } ) => {
            this.setState({
                success: true,
                user,
            })
        })
    }
    handleSubmitName(evt){
        evt.preventDefault();
        const options = {
            method: 'PATCH',
            body: { user: {
                name: this.state.user.name,
                initials: this.state.user.initials,
            } }
        }

        request(routes.api.users.update, options)
            .then(({ user }) => {
                this.setState({
                    success: true,
                    user
                })
                this.props.signUpSuccess(user);
                this.props.history.push(routes.links.explore);
            })

    }
    renderGetName(){
        const nameValid = this.state.user.name && this.state.user.name.length > 2;
        return (
            <div>
                <div>One last thing...</div>
                <div> Let us know your name and initials, so that your friends can identify you </div>
                <form className={styles.container} onSubmit={this.handleSubmitName.bind(this)}>
                    <div>
                        <div>
                            <input type="text" autoFocus placeholder="Your name" className="input" onChange={evt => this.handleChange('name', evt.target.value)} />
                        </div>
                        <div>
                            <input type="text" placeholder="Your initials" className="input" onChange={evt => this.handleChange('initials', evt.target.value)} />
                        </div>
                        <button className={["button button__border"].join(' ')} disabled={!nameValid}> Show me how it works! </button>
                    </div>
                </form>
            </div>
        )
    }
    renderLoginForm() {
        const { isSignUp, emailInvalid, valid, user, passwordsMatch } = this.state;
        const passwordValid = user.password === '' || user.password.length >= 4
        const passwordConfirmationValid = user.password_confirmation.length <=3 || passwordsMatch ;
        return (
            <form className={styles.container} onSubmit={this.handleSubmit.bind(this)}>
                <div><input className={["input", (emailInvalid ? "invalid" : null)].join(' ')} type="email" placeholder="Your email" 
                    onChange={(evt) => this.handleChange('email', evt.target.value)}/>
                </div>
                <div>
                    <input className={["input", (!passwordValid ? 'invalid' : null)].join(' ')} type="password" placeholder="Your password" 
                    onChange={(evt) => this.handleChange('password', evt.target.value)} />
                </div>
                { !isSignUp ? null :
                    <div>
                        <input className={["input", (!passwordConfirmationValid ? 'invalid' : null)].join(' ')} type="password" placeholder="Repeat your password" 
                        onChange={(evt) => this.handleChange('password_confirmation', evt.target.value)} />
                        {(user.password_confirmation && !passwordConfirmationValid) ? <div className="hint red"> Password confirmation doesn't match</div> : null}
                    </div>
                }
                <button className={["button button__border"].join(' ')} disabled={!valid}> {isSignUp ? "Sign Up" : "Log In"} </button>
            </form>
        )
    }
    render(){
        if(!this.state.success){
            return this.renderLoginForm();
        }
        else{
            return this.renderGetName();
        }
    }
}


const mapDispatchToProps = (dispatch) => ({
    signUpSuccess: (user) => dispatch(signUpSuccess(user)),    
})


const mapStateToProps = (state, ownProps) => ({
    
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));