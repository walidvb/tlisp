import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Form, NestedForm, TextArea, Text, Radio, RadioGroup, Select, Option, Checkbox } from 'react-form';

import DDSelect from './ui_components/DDSelect';
import routes from '../routes';
import request from '../request';

import styles from './LinksForm.scss'
import { submitLink } from '../actions/linkActions';

const qs = require('qs');

function LinkDetails(props) {
    return (
        <NestedForm field="link">
            <Form getApi={f => props.this.formApi = f}>
                {formApi => (
                    <div>
                        <Text field="url" type="hidden" />
                        <label htmlFor="description">Description</label>
                        <TextArea field="description" id="description" />
                        <Playlists playlists={props.playlists} />
                        <Cliques cliques={props.cliques} />
                    </div>
                )}
            </Form>
        </NestedForm>
    )
}

function Cliques(props) {
    const options = props.cliques.map( c => ({value: c.id, label: c.name}));
    return (
            <div>
                <label htmlFor={`cliques`}><h3> Cliques </h3></label>
                <Select multiple="true" options={options} field={'clique_ids'} id={`cliques`} />
            </div>
    )
};

function Playlists(props) {
    const options = props.playlists.map( pl => ({ value: pl.id, label: pl.name }));
    return (
        <div>
            <label htmlFor={`playlists`}><h3> Playlists </h3></label>
            <DDSelect multiple={true} options={options} field={'clique_ids'} id={`playlists`} />
        </div>
    )
};

class LinksForm extends Component {
    constructor(){
        super()
        this.state = {
            oembed: {},
            loaded: false,
        }
        this.setDefaultValues = this.setDefaultValues.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    static propTypes = {

    }
    componentDidMount() {
        const params = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
        request(routes.api.links.formDetails(params.url))
            .then(res => res.json())
            .then(({ link, playlists, cliques }) => this.setState({
                loaded: true,
                oembed: link.oembed,
                playlists,
                cliques
            }, this.setDefaultValues))
    }
    setDefaultValues(){
        const { description, url } = this.state.oembed;
        this.formApi.setAllValues({
            url,
            description,
        })
    }
    handleSubmit(body) {
        console.log(body);
        request(routes.api.links.create, {
            method: 'POST',
            body,
        }).then(r => r.json()).then(c => console.log(c))
    }
    render() {
        const { oembed, loaded, playlists, cliques } = this.state;
        if(!loaded){
            return <div>LOADING</div>
        }
        return (
            <div>
                <img className={styles.thumbnail} src={oembed.thumbnail_url || oembed.image} />
                { oembed.title }
                <Form getApi={f => this.formApi = f} dontPreventDefault={false}  onSubmit={this.handleSubmit}>
                    { formApi => (
                        <form onSubmit={formApi.submitForm} id="form2">
                            <LinkDetails playlists={playlists} cliques={cliques} link={oembed} this={this} />
                            <button type="submit" >Submit</button>
                        </form>
                    )}
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    
});

const mapDispatchToProps = (dispatch) =>  ({
    save: (data) => dispatch(submitLink(data))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LinksForm));