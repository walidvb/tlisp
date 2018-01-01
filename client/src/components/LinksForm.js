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
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <TextArea className="form-control" field="description" id="description" />
                        </div>
                        <div className="form-group">
                            <RadioGroup field="is_a_set">
                                {group => (
                                    <div>
                                        <label htmlFor="mix" className="">Mix</label>
                                        <Radio group={group} value="0" id="mix" className="" />
                                        <Radio group={group} value="1" id="track" className="" />
                                        <label htmlFor="track" className="">Track</label>
                                    </div>
                                )}
                            </RadioGroup>
                        </div>
                        <div className="form-check">
                            <label htmlFor="published" className="form-check-label"> 
                                <Checkbox field="published" id="published" className="form-check-input"/>
                                Public
                            </label>
                            <small className={styles.help_text}>
                                ({formApi.values.published ? "This post will be available to your selected cliques": "This link will only be visible to you"})
                            </small>
                        </div>
                        <div>
                            <label htmlFor={`tags`}><h3> Tags </h3></label>
                            <DDSelect placeholder="Tag your link" creatable={true} multiple={true} options={props.tags.map(v => ({label: v, value: v}))} field={'tag_list'} id={`tags`} />
                        </div>
                        <Playlists className="form-control" playlists={props.playlists} />
                        <Cliques className="form-control" cliques={props.cliques} />
                    </div>
                )}
            </Form>
        </NestedForm>
    )
}

function Cliques(props) {
    const options = props.cliques.map( c => ({value: c.id, label: c.name}));
    if(options.length < 2){
        return (
            <Text field={["clique_ids", 0]} type="hidden"/>
        )
    }
    return (
        <div className="form-group">
            <label htmlFor={`cliques`}><h3> Cliques </h3></label>
            <DDSelect placeholder="Select one or more clique to share to" multiple={true}  options={options} field={'clique_ids'} id={`cliques`} />
        </div>
    )
};

function Playlists(props) {
    const options = props.playlists.map( pl => ({ value: pl.id, label: pl.name }));
    return (
        <div className="form-group">
            <label htmlFor={`playlists`}><h3> Playlists </h3></label>
            <DDSelect placeholder="Select one or more playlists" creatable={true} multiple={true} options={options} field={'playlist_ids'} id={`playlists`} />
        </div>
    )
};

class LinksForm extends Component {
    constructor(){
        super()
        this.state = {
            loaded: false,
            link: {},
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
            .then(({ link, playlists, cliques, tags }) => this.setState({
                loaded: true,
                link,
                playlists,
                cliques,
                tags,
                oembeddable: typeof(link.oembed) == "object" && Object.keys(link.oembed).length > 0,
            }, this.setDefaultValues))
    }
    setDefaultValues(){
        const { url } = this.state.link;
        const { description } = this.state.link.oembed;
        this.linkFormApi.setAllValues({
            url,
            description,
            is_a_set: "0",
            published: true,
        });
        if(this.state.cliques.length == 1){
            this.linkFormApi.setValue('clique_ids', [this.state.cliques[0].id]);
        }
    }
    preSubmit({ link }, formApi){
        const { clique_ids, playlist_ids } = link
        let link_ = link;
        if(clique_ids !== undefined){
            link_.clique_ids = clique_ids.map(v => v.value)
        }
        if (playlist_ids !== undefined) {
            link_.playlist_ids = playlist_ids.map(v => v.value)
        }
        return { link: link_ };
    }
    handleSubmit(body) {
        request(routes.api.links.create, {
            method: 'POST',
            body
        }).then(r => r.json()).then(c => console.log(c))
    }
    renderLinkHeader(){
        const { link, oembeddable } = this.state;
        const { oembed } = this.state.link;
        return !oembeddable ? (<div> Not Suported </div>) : (
            <div className={styles.details}>
                <img className={styles.thumbnail} src={oembed.thumbnail_url || oembed.image} />
                <div>
                    <h3 className={styles.title}>{oembed.title}</h3>
                    <div className={styles.url}>{link.url}</div>
                </div>
            </div>
        )
    }
    render() {
        const { link, loaded, playlists, cliques, tags } = this.state;
        if(!loaded){
            return <div className={styles.container}>LOADING</div>
        }
        const { oembed } = link;
        return (
            <div className={styles.container}>
                {this.renderLinkHeader()}
                <Form dontPreventDefault={true}  onSubmit={this.handleSubmit} preSubmit={this.preSubmit}>
                    { formApi => (
                        <form className={styles.form_container} onSubmit={formApi.submitForm} id="form2">
                            <LinkDetails getApi={f => this.linkFormApi = f} 
                                playlists={playlists} 
                                cliques={cliques} 
                                tags={tags}
                                link={oembed} 
                                this={this} />
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