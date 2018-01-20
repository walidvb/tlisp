import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Form, NestedForm, Text } from 'react-form';


import DDSelect from '../ui_components/DDSelect';
import { request, routes } from '../../request';

import styles from './NewsletterForm.scss'
import { submitLink } from '../../actions/linkActions';
console.log(styles)
const qs = require('qs');

class NewsletterForm extends Component {
    constructor() {
        super()
        this.state = {
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    static propTypes = {

    }
    componentDidMount() {
        const params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        
    }
    handleSubmit(body) {
        this.setState({
            errors: undefined,
        })
        request(routes.api.newsletter, {
            method: 'POST',
            body
        })
            .then(link => {
                this.setState({
                    link,
                    success: true,
                })
            })
            .catch((r, e) => {
                this.setState({
                    errors: "Seems like something went wrong.."
                });
            })

    }
    render() {
        const { errors, success, loaded,  } = this.state;
        return (
            <div className={[styles.container].join(' ')}>
                {success ? <div>Success!</div> :
                    <Form
                        onSubmit={this.handleSubmit}
                        preSubmit={(values, formApi) => {}}>
                        {topFormApi => (
                            <form id="form2">
                                <NestedForm field="newsletter">
                                    <Form getApi={formApi => this.formApi = formApi}>
                                        {formApi => (
                                            <div className={styles.container}>
                                                <Text className={styles.input} field="email" placeholder="Your email"/>
                                                <button className={["button button__border", styles.button].join(' ')} type="submit" >Subscribe</button>
                                            </div>
                                        )}
                                    </Form>
                                </NestedForm>
                            </form>
                        )}
                    </Form>
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