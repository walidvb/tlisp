import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import request from '../request';
import routes from '../routes';

import * as linkActions from '../actions/linkActions';
import styles from './LinkUI.scss';

class LinkUI extends Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      users: []
    }
  }
  static propTypes = {
    getLinks: PropTypes.func.isRequired
  }
  componentDidMount() {
    request(routes.links.filters).then(res => res.json()).then(data => {
      this.setState({ ...data, ready: true })
    })
  }
  search(){
    const activeUsers = this.state.cliques.reduce((a, b) => a.users.filter(u => u.active).concat(b.users.filter(u => u.active)));
    this.props.getLinks({
      users: activeUsers.map(u => u.id ),
    })
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
    }, this.search)

  }
  renderUser(user, clique) {
    console.log(styles)
    return <div 
      className={[styles.filter_item, user.active ? styles.active : {}].join(' ')}
      onClick={() => this.filterBy(user, clique)}> {user.initials} {user.active ? "1" : "0"}</div>
  }

  renderClique( clique ){
    return (
      <div>
        <ul className={styles.clique_name}>
          {clique.name} ({clique.users.length})
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