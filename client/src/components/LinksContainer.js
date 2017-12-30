import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as linkActions from '../actions/linkActions';
import LinkList from './LinkList';

class LinksContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: []
    };
  }

  render() {
    const {links} = this.props;

    return (
      <div>
        <h1> Links {links.length}</h1>
        <LinkList links={links} />
      </div>
    );
  }
}

LinksContainer.propTypes = {
  people: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  return {
    links: state.links
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(linkActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinksContainer);
