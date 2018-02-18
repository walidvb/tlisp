import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller';

import routes from '../../routes.js';
import request from '../../request.js';


import LinkUI from './LinkUI';
import { getLinks, filterBy } from '../../actions/linkActions';
import { setTracklist } from '../../actions/playerActions';
import Link from './Link';

import styles from './LinksContainer.scss';

const THRESHOLD = 100
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
  // TODO Move this to state initialiser or a higher up level.
  componentDidMount() {
    this.props.filterBy({
      type: 'users',
      value: this.props.user.id,
    })
    window.addEventListener('scroll', (evt) => {
      const isLastPage = this.props.pagination.current_page >= this.props.pagination.total;
      const isBottom = window.scrollY + window.innerHeight >= document.body.offsetHeight - THRESHOLD;
      if(isBottom && !isLastPage && !this.props.loading){
        this.getLinks(this.props.pagination.current_page + 1);
      }
    })
  }

  // TODO: move this to some playlistController
  componentWillReceiveProps({ links, filters }){
    console.log(filters, this.props.filters)
    if(filters != this.props.filters){
      this.props.getLinks({filters, page: 1});
    }
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
      items.push(<div key={`link-thumb-${link.id}`} className={styles.item__grid}>
        <Link link={link} />
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

function mapStateToProps({ links, user }, { match: { params: filter }}) {
  return {
    links: links.list,
    filters: links.filters,
    pagination: links.pagination,
    loading: links.loading,
    displayOtherUsers: filter != 'me',
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTracklist: (tracks) => dispatch(setTracklist(tracks)),
    getLinks: (options) => dispatch(getLinks(options)),
    filterBy: (filter) => dispatch(filterBy(filter))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LinksContainer));
