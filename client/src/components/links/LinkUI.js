import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import request from '../../request';
import routes from '../../routes';

import * as linkActions from '../../actions/linkActions';
import styles from './LinkUI.scss';

class LinkUI extends Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      users: []
    }
    this.search = this.search.bind(this)
    this.filterBy = this.filterBy.bind(this)
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
    const activeCliques = this.state.cliques.filter(c => c.active);
    const activeUsers = this.state.cliques.map(c => c.users).reduce((a, b) => a.concat(b)).filter(u => u.active);
    const filters = {
      users: activeUsers.map(u => u.id),
      cliques: activeCliques.map(c => c.id),
    }
    this.props.getLinks({ filters })
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
  renderUser(user, clique) {
    return <div 
      className={[styles.filter_item, user.active ? styles.active : ""].join(' ')}
      onClick={() => this.filterBy(user, clique)}> {user.initials} </div>
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
            clique.users.map(u => <li className={styles.filter_item} key={u.name}>{this.renderUser(u, clique)}</li>)
          }
        </ul>
        <div></div>
      </div>
    )
  }
  render() {
    const { cliques, ready} = this.state;
    if(!ready){
      return null;
    }
    console.log(cliques)
    return (
      <div className={styles.container}>
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