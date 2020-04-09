import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { request, routes } from '../../request';
import LinksFormHeader from './LinksForm/LinkFormHeader';

import styles from './LinksForm.scss'
import DDMentionUsers from '../ui_components/DDMentionUsers';
import DDMentions from '../ui_components/DDMentions';

const qs = require('qs');

const LinksForm = ({ location }) => {
  const [loaded, setLoaded] = useState(false)
  const [link, setLink] = useState({})
  const [selectOptions, setSelectOptions] = useState({})
  const [url, setURL] = useState('')
  const [mentions, setMentions] = useState([])
  const [tags, setTags] = useState([])
  const [description, setDescription] = useState('')

  const addMentions = (user) => setMentions([...mentions, user])
  useEffect(() => {
    const { url: url_ } = qs.parse(location.search, { ignoreQueryPrefix: true });
    const fetchDetails = async () => {
      try{
        const { link, ...selectOptions_ } = await request(routes.api.links.formDetails(url_))
        setSelectOptions(selectOptions_)
        setLink(link)
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
  
  const renderHeader = () => <LinksFormHeader {...{url, oembed: link.oembed, styles, loaded}}/>

  const submit = console.log
  const renderForm = () => <form className={[styles.form_container, loaded ? styles.loaded : ''].join(' ')} onSubmit={submit} id="form2">
    <div className="form-group">
      <label htmlFor="description">Description</label>
      <DDMentions 
        value={description} 
        setValue={setDescription} 
        tags={selectOptions.tags} 
        cliques={selectOptions.cliques} 
        setTags={setTags} 
        addMentions={addMentions}
        mentions={mentions}
      />
      <DDMentionUsers tags={tags} mentions={mentions} />
    </div>
    <button className="button" type="submit">Submit</button>
  </form>
  if(!loaded){ return renderHeader() }
  return <div>
    {renderHeader()}
    {renderForm()}
  </div>
}

export default withRouter(LinksForm)