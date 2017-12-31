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
            <Form getApi={props.getApi}>
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
                <DDSelect multiple={true} options={options} field={'clique_ids'} id={`cliques`} />
            </div>
    )
};

function Playlists(props) {
    const options = props.playlists.map( pl => ({ value: pl.id, label: pl.name }));
    return (
        <div>
            <label htmlFor={`playlists`}><h3> Playlists </h3></label>
            <DDSelect multiple={true} options={options} field={'playlist_ids'} id={`playlists`} />
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
                link,
                playlists,
                cliques,
            }, this.setDefaultValues))
    }
    setDefaultValues(){
        const { url } = this.state.link;
        const { description } = this.state.link.oembed;

        console.log(this.state, description, url)
        this.linkFormApi.setAllValues({
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
        const { link,loaded, playlists, cliques } = this.state;
        if(!loaded){
            return <div>LOADING</div>
        }
        const { oembed } = link;
        return (
            <div>
                <img className={styles.thumbnail} src={oembed.thumbnail_url || oembed.image} />
                { oembed.title }
                <Form dontPreventDefault={false}  onSubmit={this.handleSubmit}>
                    { formApi => (
                        <form  onSubmit={formApi.submitForm} id="form2">
                            <LinkDetails getApi={f => this.linkFormApi = f} playlists={playlists} cliques={cliques} link={oembed} this={this} />
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