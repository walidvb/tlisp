import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom'

import routes from '../../routes.js';
import request from '../../request.js';


import LinkUI from './LinkUI';
import * as linkActions from '../../actions/linkActions';
import { setTracklist } from '../../actions/playerActions';
import LinkList from './LinkList';
 
import styles from './LinksContainer.scss';

class LinksContainer extends Component {

  state = {
      links: [],
      loading: false,
    }
  // TODO Move this to state initialiser or a higher up level.
  componentDidMount() {
    this.props.getLinks({pathname: this.props.location.pathname});
  }
  
  // TODO: move this to some playlistController
  componentWillReceiveProps({ links, location: { pathname } }){
    if(pathname !== this.props.location.pathname){
      this.props.getLinks({ pathname });
    }
    this.handleTracklist(links)
  }
  handleTracklist(links){
    const oldProps = this.props;
    let isSame = true;
    if(links.length === oldProps.links.length){
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        if(link.id != oldProps.links[i].id){
          isSame = false;
          break;
          return;
        }
      }
    }
    else{
      isSame = false;
    }

    if(!isSame){
      oldProps.setTracklist(links)
    }
  }
  render() {
    const { links } = this.props;

    return (
      <LinkList links={links} />
    );
  }
}

LinksContainer.propTypes = {
  links: PropTypes.array.isRequired,
  getLinks: PropTypes.func.isRequired
};

function mapStateToProps(state, { location }) {
  const { links } = state;
  return {
    links: links.list,
    loading: links.loading,
    location,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(linkActions, dispatch),
    setTracklist: (tracks) => dispatch(setTracklist(tracks))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LinksContainer));
