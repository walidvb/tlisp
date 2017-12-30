import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class LinksForm extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                THE FORM
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    
});

const mapDispatchToProps = (dispatch) =>  ({
    
});


export default connect(mapStateToProps, mapDispatchToProps)(LinksForm)