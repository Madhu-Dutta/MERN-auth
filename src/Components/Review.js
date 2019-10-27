import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

export default class Review extends Component {
    constructor(props) {
        super(props);
        //Check if the token is there
        const token = localStorage.getItem('token');
        let loggedIn = true;
        if(token == null ){
            loggedIn = false;
        }

        this.state = {
            loggedIn,
            redirect: false
        }
    }

    logout = () => {
        console.log('logout');
        this.setState({
            redirect: true
        })

    }
    render() {
        if ( this.state.loggedIn === false || this.state.redirect) {
            return (<Redirect to={"/"} />);
        }
        return (
            <div>
                <h1>Review</h1>
                <button onClick={this.logout}>LOG OUT</button>
            </div>
        )
    }
}
