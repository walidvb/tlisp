import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Form, NestedForm, Text, Radio, RadioGroup, Select, Checkbox } from 'react-form';

import routes from '../routes';
import request from '../request';

const qs = require('qs');

function LinkDetails(props) {
    return (
        <NestedForm field="link">
            <Form>
                {formApi => (
                    <div>
                        <label htmlFor="title" >Title</label>
                        <Text autoFocus="true" field="title" id="title" />
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
        console.log(this.state);
    }
    render() {
        const { oembed, playlists, loaded } = this.state;
        if(!loaded){
            return <div>LOADING</div>
        }
        return (
            <div>
                <img src={oembed.thumbnail_url} />
                <Form onSubmit={a => console.log(a)}>
                    { formApi => (
                        <form onSubmit={formApi.submitForm} id="form2">
                            <LinkDetails />
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
    
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LinksForm));