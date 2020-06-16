import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { request, routes } from '../../request';
import LinksFormHeader from './LinksForm/LinkFormHeader';

import styles from './LinksForm.scss'
import DDMentionUsers from '../ui_components/DDMentionUsers';
import DDMentions from '../ui_components/DDMentions';
import DDSelect from '../ui_components/DDSelect';
import ReactFormDDMood from '../ui_components/ReactFormDDMood';
import CliqueSelect from './LinksForm/CliqueSelect';
import PlaylistSelect from './LinksForm/PlaylistSelect';
import LinkDetails from './LinkDetails';

const qs = require('qs');

const LinksForm = ({ location }) => {
  const [loaded, setLoaded] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [link, setlink] = useState({})
  const [selectOptions, setSelectOptions] = useState({})
  const [url, setURL] = useState('')
  
  const [description, setDescription] = useState('')
  const [mentions, setMentions] = useState([])
  const [tags, setTags] = useState([])
  const [playedBy, setPlayedBy] = useState()
  const [heardAt, setHeardAt] = useState()
  const [mood, setMood] = useState()
  const [published, setPublished] = useState(true)
  const [isSet, setIsSet] = useState('1')

  const [cliques, setCliques] = useState([])
  const [playlists, setPlaylists] = useState([])

  const addMentions = (user) => setMentions([...mentions, ...user])

  useEffect(() => {
    const { url: url_ } = qs.parse(location.search, { ignoreQueryPrefix: true });
    const fetchDetails = async () => {
      try{
        const { link, ...selectOptions_ } = await request(routes.api.links.formDetails(url_))
        setSelectOptions(selectOptions_)
        setlink(link)
      } catch(err){
        console.error(err)
      }
      setLoaded(true)
    }
    if (url_ !== undefined){
      setURL(url_)
      fetchDetails()
    }
  }, [])
  
  const renderHeader = () => <LinksFormHeader {...{url, styles, loaded}} oembed={link.oembed}/>

  const submit = async (evt) => {
    evt.preventDefault()
    const link = {
      url,
      description,
      tag_list: tags.map(p=>p.value),
      clique_ids: cliques.map(p=>p.value),
      playlist_ids: playlists.map(p=>p.value),
      mentions: mentions.map(p=>p.value),
      played_by: playedBy,
      heard_at: heardAt,
      mood: mood
    }
    try{
      const res = await request(routes.api.links.create, { method: 'POST', body: { link } })
      setSubmitted(true)
      setlink(res)
    }catch(err){
      console.error(err)
      alert("Oops, an error happened. I'm already looking into it!")
    }
  }
  
  const renderDescription = () => <div className="form-group">
    <label htmlFor="description">Description</label>
    <DDMentions value={description} setValue={setDescription} tags={selectOptions.tags} cliques={selectOptions.cliques} setTags={setTags} addMentions={addMentions} mentions={mentions} />
    <DDMentionUsers tags={tags} mentions={mentions} setMentions={setMentions} />
  </div>;

  const renderPlayedAt = () => <div className="form-group flex">
    <div style={{flexGrow: 1}} >
      <label htmlFor="played_by">Played by</label>
      <div>
        <DDSelect 
          placeholder="Select who played this gem" 
          creatable={true} 
          optionName="Enter new" 
          onChange={({ value }) => setPlayedBy(value)}
          id={`played_by`}
          value={playedBy && [{ label: playedBy }]}
          />
      </div>
    </div>
    <div style={{ flexGrow: 1, marginLeft: ".5rem" }}>
      <label htmlFor="heard_at">Heard at</label>
      <div>
        <DDSelect 
          placeholder="Where did you hear this" 
          creatable={true} 
          optionName="Enter new" 
          options={[]} 
          onChange={({ value }) => setHeardAt(value)}
          id={`heard_at`}
          value={heardAt && [{ label: heardAt }]}
        />
      </div>
    </div>
  </div>

  const renderMeta = () => <div className="flex form-group">
    <div className="" style={{ flex: "0 0 300px", marginRight: '2rem' }}>
      <label htmlFor={`mood`}>Energy Level</label>
      <ReactFormDDMood onChange={setMood} value={mood} id='mood' />
    </div>
    <div>
      <div className="form-check">
        <label htmlFor="published" className="form-check-label">
          <input 
            type={'checkbox'} 
            checked={published} 
            id="published" 
            className="form-check-input" 
            onChange={({target: { checked }}) => setPublished(checked)}
          />
          Public
        </label>
        <span className={"hint"}>
          <div className="fa fa-info" />
          {published ? "This link will be available to your friends" : "This link will only be visible to you"}
        </span>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label htmlFor="mix" className="">Mix</label>
        <input type={"radio"} onChange={({ target: { value }}) => setIsSet(value)} checked={isSet === "0"} value="0" name="is_a_set" className="" style={{ marginLeft: '.5rem', marginRight: '1rem' }} />
        <input type={"radio"} onChange={({ target: { value }}) => setIsSet(value)} checked={isSet === "1"} value="1" name="is_a_set" className="" />
        <label htmlFor="track" className="">Track</label>
      </div>
    </div>
  </div>

  const renderForm = () => <form 
    onSubmit={submit} 
    id="form2"
    className={styles.form_container}
  >
    {renderDescription()}
    {renderPlayedAt()}
    {renderMeta()}
    <CliqueSelect 
      className="form-control" 
      cliques={selectOptions.cliques} 
      canSelectCliques={selectOptions.canSelectCliques} 
      value={cliques}
      onChange={setCliques}
    />
    <PlaylistSelect
      className="form-control" 
      playlists={selectOptions.playlists}
      onChange={setPlaylists}
      value={playlists}
    />
    <button className="button" type="submit" >Submit</button>
  </form>
  return <div className={[styles.container, loaded ? styles.loading : ''].join(' ')}>
    {renderHeader()}
    {!loaded ? null :  (submitted ? <LinkDetails link={link} /> : renderForm())}
  </div>
}

export default withRouter(LinksForm)