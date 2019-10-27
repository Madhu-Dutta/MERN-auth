import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';

export default class ViewDefect extends Component {
    constructor(props){
        super(props);

        this.state = {
            redirect : false
        }
    }
    handlelogout = (e) =>{
        e.preventDefault();
        this.setState({redirect: true})
        console.log('logging out');
    }
    render() {
        if(this.state.redirect){
            return(<Redirect to={'/'} />)
        }
        return (
            <div>
                ViewDefect
                <button onClick={this.handlelogout}>Logout</button>
            </div>
        )
    }
}
