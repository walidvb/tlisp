/** 
 * Not too happy about the race condition management here, but it's working..
 * 
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import Bookmarklet from '../Bookmarklet';
import { getLinks, resetFilters } from '../../actions/linkActions';
import { setTracklist } from '../../actions/playerActions';
import Link from './Link';

import styles from './LinksContainer.scss';

const THRESHOLD = () => window.innerHeight / 2;
class LinksContainer extends Component {
  requestId = 0
  state = {
    links: [],
    loading: false,
  }
  getLinks(page = 1) {
    if(this.props.loading){
      return;
    }
    this.props.getLinks({
      filters: this.props.filters,
      page,
    })
  }
  resetFilters(props = this.props){
    this.props.resetFilters({
      users: props.displayMine ? [{id:props.user.id}] : [],
      mineOnly: props.displayMine,
    });
  }
  componentDidMount() {
    this.props.displayMine ? this.resetFilters() : this.getLinks();
    const handleScroll = () => {
      if(this.props.loading){
        return;
      }
      const isLastPage = this.props.pagination.current_page >= this.props.pagination.total;
      const isBottom = window.scrollY + window.innerHeight >= document.body.offsetHeight - THRESHOLD();
      if (isBottom && !isLastPage) {
        this.getLinks(this.props.pagination.current_page + 1);
      }
    }
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('scroll', handleScroll);
  }
  componentWillUnmount(){
    window.removeEventListener('scroll');
    window.removeEventListener('scroll');
  }
  renderEmptyStateForMe(){
    return <Bookmarklet  />
  }
  componentWillReceiveProps(props){
    const { links, filters, displayMine, pagination } = props;
    // if location had changed from `explore` to `me`
    if (displayMine !== this.props.displayMine){
      this.resetFilters(props)
    }
    if(filters !== this.props.filters){
      this.props.getLinks({filters, page: 1});
    }
    // TODO: move this to some playlistController
    this.handleTracklist(links);
    this.setState({
      pagination
    })
  }
  handleTracklist(links) {
    const oldProps = this.props;
    let isSame = true;
    if (links.length === oldProps.links.length) {
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        if (link.id !== oldProps.links[i].id) {
          isSame = false;
          break;
        }
      }
    }
    else {
      isSame = false;
    }

    if (!isSame) {
      oldProps.setTracklist(links)
    }
  }
  renderTitle(){
    const { cliques } = this.props.filters;
    const name = this.props.error || (
      cliques.length ? `All ${cliques.map(c => c.name).join(', ')} digs` : 
        (this.props.displayMine ? "My digs" : "Friend's digs")
    );
    return <h1 className={styles.pageTitle} key="title">{name}</h1>
  }
  renderIsWalid(){
    const total = this.props.pagination.total * this.props.pagination.page_size
    return this.props.isWalid ? <div key="isWalid" style={{flexBasis: '100%', paddingLeft: '15px'}}>
      Oops! No one digged tracks to this clique yet. When this happens, we show you all {total} founder's digs.
      <br />
      To dig your own music, <a href="https://chrome.google.com/webstore/detail/diggersdelights/mfpedieakkfpjgaahkjiicmgnmhpbpop" target="_blank">download the extension</a>, or <a href="mailto:hello@walidvb.com">contact me</a>, Walid! 
    </div>: null
  }
  render() {
    const { displayMine, links, loading } = this.props;

    if(!loading && displayMine && links.length === 0){
      return this.renderEmptyStateForMe();
    }

    let items = []
    links.map((link, i) =>
      items.push(<div key={`link-thumb-${link.id}`} className={styles.item__grid} style={{ animationDelay: `${i * 80 % 2000}ms` }}>
        <Link link={link}/>
      </div>)
    );
    const loaders = <div className={`${styles.item__grid} ${styles.loading_item}`}>
      Loading more...
    </div>;
    return [
      this.renderTitle(),
      <div key="border" className={styles.borderTop}/>,
      this.renderIsWalid(),
      <div key="listt" ref={(container) => this.container = container } className={[styles.container__grid, loading ? 'loadiang' : null].join(' ')}>
        {items}
        {loading ? loaders : null}
      </div>
    ];
  }
}

LinksContainer.propTypes = {
  links: PropTypes.array.isRequired,
  getLinks: PropTypes.func.isRequired
};

function mapStateToProps({ links: { error, list: links, filters, pagination, loading, isWalid }, user }, { match: { params: mainPath }}) {
  return {
    error,
    links,
    filters,
    pagination,
    isWalid,
    loading,
    displayMine: mainPath.mainPath === 'me',
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTracklist: (tracks) => dispatch(setTracklist(tracks)),
    getLinks: (options) => dispatch(getLinks(options)),
    resetFilters: (filters) => dispatch(resetFilters(filters))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LinksContainer));
