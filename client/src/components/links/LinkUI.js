import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debounce from 'lodash/debounce';

import { request, routes } from '../../request';

import CliquesList from '../cliques/CliquesList';
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
    this.renderSearch = this.renderSearch.bind(this)
  }
  static propTypes = {
    filterBy: PropTypes.func.isRequired,
  }
  componentDidMount() {
    request(routes.api.links.filters).then(data => {
      this.setState({ ...data, ready: true })
    })
  }
  toggleMood(){
    this.props.filterBy({
      key: 'mood',
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
            onChange={(evt) => this.props.filterBy({key: 'mood', value: evt.target.value })} 
            value={this.props.filters.mood}
          />
        </div> 
      </div>
      { this.state.moodActive ? <div class="hint"> <div className="fa fa-info" />Most tracks currently shared don't have any mood set, so this filter will not affect your view</div> : null }
    </div>);
  }
  handleSearch({ target: { value }}){
    this.props.filterBy({
      key: 'search',
      value
    })
  }
  randomize() {
    this.props.resetFilters();
    const users = flatten(this.state.cliques.map(c => c.users));
    const rdm = Math.floor(Math.random()*users.length)
    const value = [users[rdm]];
    this.props.filterBy({
      key: 'users',
      value
    })
    this.setState({
      randomizing: true,
    }, () => {
      setTimeout(() => this.setState({randomizing: false}), 800);
    })
  }
  renderSearch(){
    return (
      <input value={this.props.filters.search} onChange={this.handleSearch.bind(this)} placeholder={"Search tracks..."} />
    )
  }
  render() {
    const { cliques, otherCliques, ready } = this.state;
    if(!ready){
      return null;
    }
    return (
      <div className={[styles.container, styles[this.props.displayType]].join(' ')}>
        {this.renderSearch()}
        {this.renderMood()}
        <div onClick={this.randomize.bind(this)} className="pointer"> <span className={`fa fa-icon fa-refresh ${this.state.randomizing ? 'fa-spin' : ''}`} /> Randomize </div>
        <CliquesList 
          cliques={cliques} 
          filters={this.props.filters}
          clickName={(clique) => this.props.filterBy({ key: 'cliques', value: clique, isArray: true })} 
          clickUser={(user) => this.props.filterBy({ key: 'users', value: user, isArray: true })} 
        />
        <div className="separator"/>
        {/* <span className={"hint"}>
          <div className="fa fa-info" />
          These are cliques you're not a part of, temporarily shown to you.
        </span>
        {otherCliques.map((c) => <div key={c.id}>{this.renderClique(c)}</div>)} */}
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

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}