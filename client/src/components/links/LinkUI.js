import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debounce from 'lodash/debounce';

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
    }
    this.renderUser = this.renderUser.bind(this)
    this.renderClique = this.renderClique.bind(this)
  }
  static propTypes = {
    filterBy: PropTypes.func.isRequired,
  }
  componentDidMount() {
    request(routes.api.links.filters).then(data => {
      this.setState({ ...data, ready: true })
    })
  }
  renderUser(user, clique, isActivable) {
    const { users, cliques } = this.props.filters;
    const isActive = (!cliques || isActivable)
      && users && users.includes(user.id)
    return <div 
      className={["checkbox only-on", isActive ? "active" : ""].join(' ')}
      onClick={() => this.props.filterBy({ type: 'users', value: user.id})}> {user.name} </div>
  }
  renderClique( clique ){
    const { cliques } = this.props.filters;
    const isActive = cliques && cliques.includes(clique.id)
    return (
      <div>
        <h3 
          onClick={() => this.props.filterBy({type: 'cliques', value: clique.id})} 
          className={[styles.clique_name, styles.filter_item, isActive ? styles.active : ""].join(' ')}>
            {clique.name}
          </h3>
        <ul className={styles.users_container}>
          {
            clique.users.map((u, i) => <li className={styles.filter_item} key={u.id}>{this.renderUser(u, clique, isActive)}</li>)
          }
        </ul>
      </div>
    )
  }
  toggleMood(){
    this.props.filterBy({
      type: 'mood',
      value: this.props.filters.mood ? undefined : 50,
    })
  }
  renderMood(){
    const isActive = this.props.filters.mood != undefined;
    return (<div>
      <div className={[styles.mood, "flex"].join(' ')}>
        <div className={[styles.clique_name, styles.filter_item, isActive ? styles.active : ""].join(' ')} 
          onClick={this.toggleMood.bind(this)}>
          Mood
        </div>
        <div className="flex-grow-1">
          <DDMood 
            className={isActive ? null : "disabled"} 
            onChange={(evt) => this.props.filterBy({type: 'mood', value: evt.target.value })} 
            value={this.props.filters.mood}
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
        {cliques.map((c) => <div key={c.id}>{this.renderClique(c)}</div>)}
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(linkActions, dispatch)
  }
}




const mapStateToProps = ({ links: { filters } }, ownProps) => ({
    filters
})


export default connect(mapStateToProps, mapDispatchToProps)(LinkUI);