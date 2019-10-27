import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';

export default class RegisterForm extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            name: "",
            password: "",
            redirect: false
        }
    }
    onchange = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value =  e.target.value;
        this.setState({
            [name] : value
        })
        // console.log("grab input value", this.state);        
    }
    handleSubmit = (e) => {
        e.preventDefault();       
        //console.log("registered value", this.state);

        fetch('http://localhost:5000/api/user/register', {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: this.state.name,
              email: this.state.email,
              password: this.state.password,
            })
          })
            .then(response => {
              console.log("Registration response", response);
              //Clear form
              //this.setState(initialState);
              //Navigate to review page
              this.props.history.push("/");
            })
            .catch(error => {
              console.log("Registration error", error);
            })
    }
    render() {
        if(this.state.redirect){
            return(<Redirect to={'/'} />)
        }
        return (
            <div id="container">
                <div className="header">
                    <h2 className="text-center">Register</h2>
                    <hr />
                </div>
                <div className="msg-block"></div>

                <Form name="form" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="name">Username: </Label>
                        <Input type="text"
                        className="form-control"
                        name="name" 
                        value={this.state.name}
                        onChange={this.onchange}
                        required />

                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="email">Email: </Label>
                        <Input type="email" 
                        className="form-control" 
                        name="email" 
                        value={this.state.email}
                        onChange={this.onchange}
                        required />

                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password: </Label>
                        <Input 
                        type="password" 
                        className="form-control" 
                        name="password" 
                        onChange={this.onchange}
                        required />

                    </FormGroup>
                    <FormGroup>
                        <Input 
                        type="submit" 
                        value="Register" 
                        onClick={this.handleSubmit}
                        id="button" />
                    </FormGroup>
                    <hr />
                    <FormGroup className="text-center">
                        <div>Already have an account?</div>
                        <Link to="/" aria-label="re-direct to log-in page" className="btn btn-link" style={{ color: "black" }}>Log In</Link>
                    </ FormGroup>
                </Form>
            </div >

        )
    }
}
