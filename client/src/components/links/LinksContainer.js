import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

import routes from '../../routes.js';
import request from '../../request.js';


import LinkUI from './LinkUI';
import { getLinks, resetFilters } from '../../actions/linkActions';
import { setTracklist } from '../../actions/playerActions';
import Link from './Link';

import styles from './LinksContainer.scss';

const THRESHOLD = 200
class LinksContainer extends Component {

  state = {
    links: [],
    loading: false,
  }
  getLinks(page) {
    this.props.getLinks({
      filters: this.props.filters,
      page,
    })
  }
  resetFilters(props = this.props){
    this.props.resetFilters({
      users: props.displayMine ? [props.user.id] : [],
    });
  }
  componentDidMount() {
    this.resetFilters();
    const handleScroll = () => {
      if(this.props.loading){
        return;
      }
      const isLastPage = this.props.pagination.current_page >= this.props.pagination.total;
      const isBottom = window.scrollY + window.innerHeight >= document.body.offsetHeight - THRESHOLD;
      if (isBottom && !isLastPage) {
        this.getLinks(this.props.pagination.current_page + 1);
      }
    }
    window.addEventListener('scroll', handleScroll);
    //handleScroll();
  }

  componentWillReceiveProps(props){
    const { links, filters, displayMine, user } = props;
    // if location had changed from `explore` to `me`
    if (displayMine != this.props.displayMine){
      this.resetFilters(props)
    }
    if(filters != this.props.filters){
      this.props.getLinks({filters, page: 1});
    }
    // TODO: move this to some playlistController
    this.handleTracklist(links)
  }
  handleTracklist(links) {
    const oldProps = this.props;
    let isSame = true;
    if (links.length === oldProps.links.length) {
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        if (link.id != oldProps.links[i].id) {
          isSame = false;
          break;
          return;
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
  render() {
    const { pagination, links, loading } = this.props;
    let items = []
    links.map((link, i) =>
      items.push(<div key={`link-thumb-${link.id}`} className={styles.item__grid} style={{ animationDelay: `${i * 80 % 2000}ms` }}>
        <Link link={link}/>
      </div>)
    );
    return (
      <div ref={(container) => this.container = container } className={[styles.container__grid, loading ? 'loading' : null].join(' ')}>
        {items}
      </div>
    );
  }
}

LinksContainer.propTypes = {
  links: PropTypes.array.isRequired,
  getLinks: PropTypes.func.isRequired
};

function mapStateToProps({ links, user }, { match: { params: mainPath }}) {
  return {
    links: links.list,
    filters: links.filters,
    pagination: links.pagination,
    loading: links.loading,
    displayMine: mainPath.mainPath == 'me',
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
