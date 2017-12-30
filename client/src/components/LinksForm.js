import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Form, NestedForm, Text, Radio, RadioGroup, Select, Checkbox } from 'react-form';

import routes from '../routes';
import request from '../request';

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
                        <Text field="description" id="description" />
                    </div>
                )}
            </Form>
        </NestedForm>
    )
}

function Playlists(props) {
    console.log(props)
    return (
        <div>
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
        const { oembed, playlists, loaded } = this.state;
        if(!loaded){
            return <div>LOADING</div>
        }
        return (
            <div>
                <img src={oembed.thumbnail_url || oembed.image} />
                { oembed.title }
                <Form getApi={f => this.formApi = f} dontPreventDefault={false}  onSubmit={this.handleSubmit}>
                    { formApi => (
                        <form onSubmit={formApi.submitForm} id="form2">
                            <LinkDetails link={oembed} this={this} />
                            <Playlists playlists={playlists} />
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