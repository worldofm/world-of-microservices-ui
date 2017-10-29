import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import cookie from 'react-cookie';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        // this.props.protectedTest();
    }

    handleLogout() {
        this.props.logoutUser();
    }


    render() {
        return (
            <div>
                <button onClick={() => {this.handleLogout()}}>Logout</button>
                {console.log('Token ' + cookie.load('token'))}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { content: state.auth.content };
}

export default connect(mapStateToProps, actions)(Dashboard);