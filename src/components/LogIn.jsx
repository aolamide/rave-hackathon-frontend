import React, { Component } from 'react';
import logo from '../img/logo.png';
import '../css/login.css'
import {Link, Redirect} from 'react-router-dom';
import { authenticate } from '../auth';



 class LogIn extends Component {
     constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : '',
            error : null,
            token : '',
            redirect : false,
            userId : ''
        }
     }

     onInputChange = name => e => {
        if(name === 'email') {
            this.setState({email : e.target.value})
        }
        else if(name === 'password') {
            this.setState({password : e.target.value})
        }
     }

     onSubmitLogin = e => {
         e.preventDefault();
         fetch('http://localhost:8080/signin', {
             method : 'POST',
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
             body : JSON.stringify({
                email : this.state.email,
                password : this.state.password
             })
         })
         .then(res => res.json())
         .then(data => {
             if(data.error) {
                this.setState({error : data.error})
             }
             else if(data.token) {
                authenticate(data, () => this.setState({redirect : true, userId : data.user._id}))
             }
         })
     }

     render() {
         if(this.state.redirect) {
             return <Redirect to={`/${this.state.userId}`} />
         }
        return(
            <div className="container auth">
                <div className="form">
                    <Link to='/'>
                        <img className="logo" src={logo} alt="logo" />
                    </Link>
                    <h1 className="center"><span className="orange">Welcome, </span><span className="ash">Get Started</span></h1>
                    { this.state.error? <div>{this.state.error}</div> : null}
                    <form action="#" onSubmit={this.onSubmitLogin}>
                        <div className="form-group">
                            <label for="email">Email</label>
                            <input onChange= {this.onInputChange('email')} id="email" type="email"/>
                        </div>
                        <div className="form-group">
                            <label for="password">Password</label>
                            <input onChange= {this.onInputChange('password')} id="password" type="password"/>
                        </div>
                        <div className="form-group">
                            <button>Login</button>
                        </div>
                        <h2 className="center"><span className="ash">Don't have an account? </span> <Link className="orange" to="/register">Register</Link></h2>
                    </form>
                </div>
                <div className="image-box box1"></div>
            </div> 
        )
     }
 }

 export default LogIn;