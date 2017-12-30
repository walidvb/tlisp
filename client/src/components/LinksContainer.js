import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import routes from '../routes.js';
import request from '../request.js';

import LinkUI from './LinkUI';
import * as linkActions from '../actions/linkActions';
import LinkList from './LinkList';
 
import styles from './LinksContainer.scss';
import stylesUI from './LinkUI.scss';

class LinksContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: [],
      loading: false,
    };
  }
  
  componentDidMount() {
    this.props.getLinks();
  }
  
  render() {
    const {links} = this.props;

    return (
      <div>
        <LinkUI />
        <LinkList links={links} />
      </div>
    );
  }
}

LinksContainer.propTypes = {
  links: PropTypes.array.isRequired,
  getLinks: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  const { links } = state;
  return {
    links: links.list,
    loading: links.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(linkActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinksContainer);
