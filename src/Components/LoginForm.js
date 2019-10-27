import React, { Component } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
// import { PostData } from "../services/PostData";

export default class Login extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem('token');
    let loggedIn = true;
    if(token == null ){
        loggedIn = false;
    }

    this.state = {
        loggedIn,
        redirect: false
    }
    //Initial state
    this.state = {
      email: "",
      password: "",
      loggedIn: false,
      redirect: false,
      error: ""
    };
  }

  //Handle the inputbox changes
  handleInputChange = e => {
    e.preventDefault();

    //Grab the input fields here
    let inputName = e.target.name;
    let inputValue = e.target.value;

    // //Handle change events on input fields
    this.setState({
      [inputName]: inputValue
    });
    // console.log(this.state);
  };

  //OnClick event on the login button
  login = e => {
    e.preventDefault();
    // console.log("Clicked", this.state);
    // debugger

    fetch('http://localhost:5000/api/user/login', {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        })
      })
        .then(response => {
          console.log("Login response", response);    
          this.setState({redirect: true})      
        })
        .catch(error => {
          console.log("Error Message", error);
        })  
    }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={"/Review"} />);
    }
    return (
      <Container>
        <div className="login-wrapper">
          <div className="header">
            <h2 className="text-center">Log In</h2>
            <div className="text-center">to continue to site</div>
            <hr />
          </div>
          <div className="msg-block"></div>

          <Form name="form" onSubmit={this.login}>
            <FormGroup>
            <Label htmlFor="email">Email: </Label>
              <Input
                type="text"
                className="form-control"
                onChange={this.handleInputChange}
                name="email"
                value={this.state.email}
                required
              />
            </FormGroup>
            <FormGroup>
            <Label htmlFor="password">Password: </Label>
              <Input
                type="password"
                className="form-control"
                onChange={this.handleInputChange}
                name="password"
                value={this.state.password}
                required
              />
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs={6}>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" /> Remember me
                    </Label>
                  </FormGroup>
                </Col>
                <Col xs={6}>
                  <Link to="/Register" style={{ color: "black" }}>
                    Forgot Password?
                  </Link>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Input
                type="submit"
                onClick={this.login}
                value="Log In"
                id="button"
              />
            </FormGroup>
            <FormGroup className="text-center">
              <div style={{ marginBottom: "10px" }}>Or Log In with</div>
              <Button id="btnFb">
                <a
                  href="https://www.facebook.com/"
                  style={{ color: "white" }}
                  aria-label="re-direct to facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="facebook"
                >
                  <i className="fab fa-facebook-f fa-2x" />
                  acebook
                </a>
              </Button>
            </FormGroup>
            <hr />
            <FormGroup className="text-center">
              <div className="acctInfo">Don't have an account?</div>
              <Link
                to="/RegisterForm"
                className="btn btn-link"
                aria-label="re-direct to sign-up page"
                style={{ color: "black" }}
              >
                Sign Up Here
              </Link>
            </FormGroup>
          </Form>
        </div>
      </Container>
    );
  }
}
