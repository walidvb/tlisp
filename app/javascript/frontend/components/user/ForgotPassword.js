import React, { Component } from 'react'

import errorsToString from '../../utils/errorsToString';
import { request, routes } from '../../request';
import styles from './LoginForm.scss';

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class ForgotPassword extends Component {
    static propTypes = {
    }
    state = {
        user: {
            email: '',
        },
        emailValid: false,
    }
    handleChange(key, value) {
        let { user } = this.state;
        user[key] = value;
        this.setState({ user });
        if (!this.state.success) {
            this.validateForm();
        }
    }
    validateForm() {
        const { email } = this.state.user;
        const emailValid = emailRegExp.test(email) && email.length > 0;
        this.setState({
            emailValid
        })
    }
    handleSubmit(evt) {
        evt.preventDefault()
        this.setState({
            error: undefined,
        });
        request(routes.api.users.forgotPassword, {
            method: 'POST',
            body: {
                user: this.state.user,
            }
        })
        .then((res) => {
            this.setState({
                success: true,
                error: null
            })
        })
        .catch(({ errors }) => this.setState({error: errorsToString(errors)}))
    }
    renderSuccess() {
        return (
            <div>
                An email has just been sent to your address, please head there to reset your password!
            </div>
        )
    }
    renderForm() {
        const { emailValid, error } = this.state
        return (
            <form className={styles.container} onSubmit={this.handleSubmit.bind(this)}>
                {!error ? null : <div className="hint error red before">
                    {error}
                </div>
                }
                <div><input className={["input", (emailValid ? '' : "invalid")].join(' ')} type="email" placeholder="Enter your email"
                    onChange={(evt) => this.handleChange('email', evt.target.value)} />
                </div>
                <button className={["button button__border"].join(' ')} disabled={!emailValid}> Send reset instructions </button>
            </form>
        )
    }
    render() {
        if (!this.state.success) {
            return this.renderForm();
        }
        else {
            return this.renderSuccess();
        }
    }
}


export default ForgotPassword;