import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { request, routes } from '../../request';

import DDMood from '../ui_components/DDMood';
import * as linkActions from '../../actions/linkActions';
import styles from './LinkUI.scss';

let timeout;

class LinkUI extends Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      moodActive: false,
      mood: 0,
      users: []
    }
    this.search = this.search.bind(this)
    this.filterBy = this.filterBy.bind(this)
    this.filterByMood = this.filterByMood.bind(this)
    this.renderUser = this.renderUser.bind(this)
    this.renderClique = this.renderClique.bind(this)
  }
  static propTypes = {
    getLinks: PropTypes.func.isRequired
  }
  componentDidMount() {
    request(routes.api.links.filters).then(data => {
      this.setState({ ...data, ready: true })
    })
  }
  search(){
    clearTimeout(timeout);
    timeout = setTimeout(() => search(this), 800);
    function search(self){
      const activeCliques = self.state.cliques.filter(c => c.active);
      const activeUsers = self.state.cliques.map(c => c.users).reduce((a, b) => a.concat(b)).filter(u => u.active);
      let filters = {
        users: activeUsers.map(u => u.id),
        cliques: activeCliques.map(c => c.id),
      }
      if (self.state.moodActive ){
        filters.mood = self.state.mood;
      }
      self.props.getLinks({ filters })
    };
  }
  filterBy(user, clique){
    let { cliques } = this.state;
    cliques = cliques.map((c, index) => {
      if ( clique.name !== c.name ){
        return c;
      }
      return {
        ...c,
        users: c.users.map( u => {
          if (user.name === u.name) {
            return {
              ...u,
              active:  !u.active,
            };
          }
          return u;
        })
      }
    })
    this.setState({
      cliques, 
    }, this.search.bind(this))

  }
  filterByClique(clique){
    const cliques = this.state.cliques.map(c => {
      if(clique.id == c.id)
      {
        c.active = !c.active;
      }
      return c;
    })
    this.setState({
      cliques
    }, this.search.bind(this));
  }
  filterByMood(evt){
    this.setState({
      mood: evt.target.value,
    }, this.search.bind(this));

  }
  renderUser(user, clique) {
    return <div 
      className={["checkbox only-on", user.active ? "active" : ""].join(' ')}
      onClick={() => this.filterBy(user, clique)}> {user.name} </div>
  }
  renderClique( clique ){
    return (
      <div>
        <h3 
          onClick={() => this.filterByClique(clique)} 
          className={[styles.clique_name, styles.filter_item, clique.active ? styles.active : ""].join(' ')}>
            {clique.name}
          </h3>
        <ul className={styles.users_container}>
          {
            clique.users.map((u, i)=> <li className={styles.filter_item} key={i}>{this.renderUser(u, clique)}</li>)
          }
        </ul>
      </div>
    )
  }
  toggleMood(){
    this.setState({
      moodActive: !this.state.moodActive,
    }, this.search.bind(this));
  }
  renderMood(){
    return (<div>
      <div className={[styles.mood, "flex"].join(' ')}>
        <div className={[styles.clique_name, styles.filter_item, this.state.moodActive ? styles.active : ""].join(' ')} onClick={this.toggleMood.bind(this)}>
          Mood
        </div>
        <div className="flex-grow-1">
          <DDMood 
            className={this.state.moodActive ? null : "disabled"} 
            onChange={this.filterByMood} 
            value={this.state.mood}
          />
        </div> 
      </div>
      { this.state.moodActive ? <div class="hint"> <div className="fa fa-info" />Most tracks currently shared don't have any mood set, so this filter will not affect your view</div> : null }
    </div>);
  }
  render() {
    const { cliques, ready} = this.state;
    if(!ready){
      return null;
    }
    return (
      <div className={[styles.container, styles[this.props.displayType]].join(' ')}>
        {this.renderMood()}
        {cliques.map((c) => <div key={c.name}>{this.renderClique(c)}</div>)}
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(linkActions, dispatch)
  }
}




const mapStateToProps = ({ filters }, ownProps) => ({
    filters
})


export default connect(mapStateToProps, mapDispatchToProps)(LinkUI);