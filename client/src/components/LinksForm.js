import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Form, NestedForm, TextArea, Text, Radio, RadioGroup, Select, Option, Checkbox } from 'react-form';

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
                    </div>
                )}
            </Form>
        </NestedForm>
    )
}

function Cliques(props) {
    return (
        <div>
            <h3> Cliques </h3>
            {props.cliques.map((cl, i) =>
                <div key={cl.id}>
                    <label htmlFor={`clique-${i}`}>{cl.name}</label>
                    <Select multiple="true" field={['clique_ids', cl.id]} id={`clique-${i}`}>
                        <option value={cl.id}> c.name </option>
                    </Select>
                </div>
            )}
        </div>
    )
};

function Playlists(props) {
    console.log(props)
    return (
        <div>
            <h3> Playlists </h3>
            {props.playlists.map( (pl, i) => 
                <div key={pl.id}>
                    <Checkbox field={['playlist_ids', pl.id]} id={`playlist-${i}`} />
                    <label htmlFor={`playlist-${i}`}>{pl.name}</label>
                </div>
            )}
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
                            <LinkDetails link={oembed} this={this} />
                            <Playlists playlists={playlists} />
                            <Cliques cliques={cliques} />
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