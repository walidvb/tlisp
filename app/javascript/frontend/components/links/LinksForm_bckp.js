import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, NestedForm, Text, Radio, RadioGroup, Checkbox } from 'react-form';


import DDSelect from '../ui_components/DDSelect';
import DDMentions from '../ui_components/DDMentions'
import DDMentionUsers from '../ui_components/DDMentionUsers'
import LinkDetails from './LinkDetails';
import ReactFormDDMood from '../ui_components/ReactFormDDMood';
import { request, routes } from '../../request';

import styles from './LinksForm.scss'
import { submitLink } from '../../actions/linkActions';
const qs = require('qs');

function LinkFormDetails(props) {
    return (
        <NestedForm field="link">
            <Form getApi={props.getApi}>
                {formApi => (
                    <div>
                        <Text field="url" type="hidden" />
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <DDMentions formApi={formApi} tags={props.tags} cliques={props.cliques} field="description"/>
                            <DDMentionUsers field={'mentions'} formApi={formApi} />
                        </div>
                        <div className="form-group flex">
                            <div>
                                <label htmlFor="played_by">Played by</label>
                                <div>
                                    <DDSelect placeholder="Select who played this gem" creatable={true} optionName="Enter new" options={[]} field={'played_by'} id={`played_by`} />
                                    {/* <Text className="form-control" field="played_by"  /> */}
                                </div>
                            </div>
                            <div style={{marginLeft: ".5rem"}}>
                                <label htmlFor="heard_at">Heard at</label>
                                <div>
                                    <DDSelect placeholder="Where did you hear this" creatable={true} optionName="Enter new" options={[]} field={'heard_at'} id={`heard_at`} />
                                </div>
                            </div>
                        </div>
                        <div className="flex form-group">
                            <div className="" style={{ flex: "0 0 300px", marginRight: '2rem'}}>
                                <label htmlFor={`mood`}>Energy Level</label>
                                <ReactFormDDMood field={'mood'} id='mood' />
                            </div>
                            <div>
                                <div className="form-check">
                                    <label htmlFor="published" className="form-check-label">
                                        <Checkbox field="published" id="published" className="form-check-input" />
                                        Public
                                    </label>
                                    <span className={"hint"}>
                                        <div className="fa fa-info" />
                                        {formApi.values.published ? "This link will be available to your friends" : "This link will only be visible to you"}
                                    </span>
                                </div>
                                <RadioGroup field="is_a_set" style={{marginTop: '1rem'}}>
                                    {group => (
                                        <div>
                                            <label htmlFor="mix" className="">Mix</label>
                                            <Radio group={group} value="0" id="mix" className="" style={{marginLeft: '.5rem', marginRight: '1rem'}}/>
                                            <Radio group={group} value="1" id="track" className="" />
                                            <label htmlFor="track" className="">Track</label>
                                        </div>
                                    )}
                                </RadioGroup>
                            </div>
                        </div>
                        <Cliques className="form-control" cliques={props.cliques} canSelectCliques={props.canSelectCliques} />
                        <Playlists className="form-control" playlists={props.playlists} />

                    </div>
                )}
            </Form>
        </NestedForm>
    )
}


function mapCliquesToOptions(cliques){
    return cliques.map(c => ({ value: c.id, label: c.name }));
}
function Cliques({ cliques }) {
    const options = mapCliquesToOptions(cliques);
    return (
        <div className="form-group">
            <label htmlFor={`cliques`}>Cliques</label>
            <DDSelect placeholder="Select one or more clique to share to" multiple={true}  options={options} field={'clique_ids'} id={`cliques`} />
            <span className={"hint"}>
                <div className="fa fa-info" />
                Share in your cliques
            </span>
        </div>
    )
};

function Playlists(props) {
    const options = props.playlists.map( pl => ({ value: pl.id, label: pl.name }));
    return (
        <div className="form-group">
            <label htmlFor={`playlists`}>Playlists</label>
            <DDSelect placeholder="Select or type to create one or more playlists" creatable={true} optionName="Create a new playlist..." multiple={true} options={options} field={'playlist_ids'} id={`playlists`} />
            <span className={"hint"}>
                <div className="fa fa-info" />
                Add to an existing personal playlist or create one
            </span>
        </div>
    )
};

class LinksForm extends Component {
    constructor(){
        super()
        this.state = {
            loaded: false,
            link: {},
            playlists: [],
            cliques: [],
            tags: [],
            mentions: [],
            played_by: '',
            heard_at: '',
        }
        this.setDefaultValues = this.setDefaultValues.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    static propTypes = {

    }
    componentDidMount() {
        const params = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
        console.log(this.props)
        if(params.url !== undefined){
            request(routes.api.links.formDetails(params.url))
                .then(({ link, playlists, cliques, tags }) => this.setState({
                    loaded: true,
                    link,
                    playlists,
                    cliques,
                    tags,
                    oembeddable: typeof(link.oembed) === "object" && Object.keys(link.oembed).length > 0,
                }, this.setDefaultValues))
        }
    }
    setDefaultValues(){
        return
        const { link } = this.state
        const { url } = link;
        const { description } = link.oembed;
        this.linkFormApi.setAllValues({
            url,
            description: description,
            is_a_set: "1",
            published: true,
            clique_ids: [],
            //clique_ids: mapCliquesToOptions(cliques).filter(c => c.value != 1)
        });
    }
    preSubmit({ link }){
        const { clique_ids, playlist_ids, tag_list, mentions, heard_at, played_by} = link;
        let link_ = link;
        if(clique_ids !== undefined){
            link_.clique_ids = clique_ids.map(v => v.value)
        }
        if (playlist_ids !== undefined) {
            link_.playlist_ids = playlist_ids.map(v => v.value)
        }
        if(tag_list){
            link_.tag_list = tag_list.map(v => v.value)
        }
        if (mentions) {
            link_.mentions = mentions.map(v => v.value)
        }
        if(played_by){
            link_.played_by = played_by.value
        }
        if (heard_at) {
            link_.heard_at = heard_at.value
        }
        return { link: link_ };
    }
    handleSubmit(body) {
        this.setState({
            errors: undefined,
        })
        request(routes.api.links.create, {
            method: 'POST',
            body
        })
        .then(link => {
            this.setState({
                link,
                success: true,
            })
        })
        .catch( (r, e) => {
            this.setState({
                errors: "Seems like something went wrong.. Maybe you had this link already?"
            });
        })
        
    }
    renderLinkHeader(){
        const { loaded, link, oembeddable } = this.state;
        const { oembed } = this.state.link;
        if(!loaded){
            return (<div className={styles.header}>
                <div className="fa fa-cog fa-spin" style={{ padding: "0 1.5rem", fontSize: '1.5rem' }} />
                <div>
                    <h3>Fetching details...</h3>
                </div>
            </div>)
        }
        if(!oembeddable){
            return (<div className={styles.header}>
                <div className="fa fa-user-astronaut" style={{padding:"0 1.5rem", fontSize: '1.5rem'}}/>
                <div>
                    <h3>Oops, we can't seem to find details for this link. ({link.url})</h3>
                    <p> You can still save it, only it will likely not be playable on Diggers' Delights (yet). </p>
                    <div className={styles.url}>
                        Think this is a mistake? You can leave us a note <a href="/contact" target="_blank">here</a> and we will check it out.
                        
                    </div>
                </div>
            </div>)
        }
        return (
            <div className={styles.header}>
                <img alt="thumbnail" className={styles.thumbnail} src={oembed.thumbnail_url || oembed.image} />
                <div>
                    <h3 className={styles.title}>{oembed.title}</h3>
                    <div className={styles.url}>{link.url}</div>
                </div>
            </div>
        )
    }
    render() {
        const { errors, success, link, loaded, playlists, cliques, tags, canSelectCliques } = this.state;
        const { oembed } = link;
        console.log(link)
        return (
            <div className={[styles.container, loaded ? styles.loading : ''].join(' ')}>
                {this.renderLinkHeader()}
                { errors }
                { success ? <LinkDetails link={link}/> : 
                    this.renderForm(canSelectCliques, loaded, playlists, cliques, tags, oembed)
                }
            </div>
        )
    }

    renderForm(canSelectCliques, loaded, playlists, cliques, tags, oembed) {
        retur
        return <Form onSubmit={this.handleSubmit} preSubmit={(values, formApi) => this.preSubmit(values, canSelectCliques)}>
            {formApi => (<form className={[styles.form_container, loaded ? styles.loaded : ''].join(' ')} onSubmit={formApi.submitForm} id="form2">
                <LinkFormDetails getApi={f => this.linkFormApi = f} playlists={playlists} cliques={cliques} tags={tags} link={oembed} canSelectCliques={canSelectCliques} this={this} />
                <button className="button" type="submit">Submit</button>
            </form>)}
        </Form>;
    }
}

const mapStateToProps = (state, ownProps) => ({
    
});

const mapDispatchToProps = (dispatch) =>  ({
    save: (data) => dispatch(submitLink(data))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LinksForm));