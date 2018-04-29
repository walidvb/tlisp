import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Form, NestedForm, Text } from 'react-form';


import DDSelect from '../ui_components/DDSelect';
import { request, routes } from '../../request';

import styles from './NewsletterForm.scss'
import { submitLink } from '../../actions/linkActions';
import classCallCheck from 'babel-runtime/helpers/classCallCheck';
const qs = require('qs');

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class NewsletterForm extends Component {
    constructor() {
        super()
        this.state = {
            success: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    static propTypes = {

    }
    componentDidMount() {
        const params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        
    }
    handleSubmit(evt) {
        evt.preventDefault();
        this.setState({
            errors: undefined,
        })
        request(routes.api.newsletter.create, {
            method: 'POST',
            body: {
                newsletter: { email: this.state.email, source: qs['source'] }
            }
        })
        .then(email => {
            this.setState({
                email,
                success: true,
            })
        })
        .catch((r, e) => {
            this.setState({
                errors: "Seems like something went wrong.."
            });
        })

    }  
    handleChange({ target: { value } }){
        this.setState({
            email: value,
            error: !emailRegExp.test(value),
        })
    }
    renderSuccess(){
        return (<div className={styles.thanks}>
            <div className={styles.header}>Thanks! </div>
            <p>
                I'm still working to give you the best possible experience. 
                <br />
                I will send you an email with an invitation as soon as the beta is ready!
            </p>
            Walid
        </div>);
    }
    render() {
        const { errors, success, loaded,  } = this.state;
        return (
            <div className={[styles.container].join(' ')}>
                { success ? this.renderSuccess() :
                    
                    <form onSubmit={this.handleSubmit}  id="form2" className={styles.container}>
                        {this.state.error}
                        <input autoFocus={true} onChange={this.handleChange.bind(this)} className={styles.input} type="email" field="newsletter.email" placeholder="Your email"/>
                        <button disabled={this.state.error} className={["button button__border", styles.button].join(' ')} type="submit" >Keep me posted!</button>
                        <div className={[styles.hint].join(' ')}> Due to the very nature of the platform, access is based on invitation only.
                        <br /> Already have an account? <Link to={routes.user.signin}> Sign in here!</Link> </div>

                    </form>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch) => ({
    save: (data) => dispatch(submitLink(data))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewsletterForm));