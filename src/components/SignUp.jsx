import React, { Component } from 'react';
import logo from '../img/logo.png';
import '../css/login.css';
import {Link} from 'react-router-dom';



 class SignUp extends Component {
     constructor(props) {
        super(props);
        this.state = {
            name : '',
            email : '',
            password : '',
            error : '',
            success : false
        }
     }

    onInputChange = name => e => {
        if(name === 'email') {
            this.setState({email : e.target.value})
        }
        else if(name === 'password') {
            this.setState({password : e.target.value})
        }
        else if(name === 'name') {
            this.setState({name : e.target.value})
        }
    }

    onSubmitSignUp = e => {
        e.preventDefault();
        fetch('http://localhost:8080/signup', {
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                name : this.state.name,
               email : this.state.email,
               password : this.state.password,
            }),
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
               this.setState({error : res.error})
            }
            else if(res.message){
                this.setState({success : true})
            }
        })
    }

     render() {
        return(
            <div className="container auth">
                <div className="form">
                    <Link to = '/'>
                        <img className="logo" src={logo} alt="logo" />
                    </Link>
                    <h1 className="center"><span className="orange">Welcome, </span><span className="ash">Get Started</span></h1>
                    { this.state.error? <div>{this.state.error}</div> : null}
                    <form action="#" onSubmit={this.onSubmitSignUp}>
                        <div class="form-group">
                            <label for="first">Full Name</label>
                            <input onChange= {this.onInputChange('name')} id="name" type="text"/>
                        </div>
                        <div className="form-group">
                            <label for="email">Email</label>
                            <input onChange= {this.onInputChange('email')} id="email" type="email"/>
                        </div>
                        <div className="form-group">
                            <label for="password">Password</label>
                            <input onChange= {this.onInputChange('password')}id="password" type="password"/>
                        </div>
                        <div className="form-group">
                            <label for="password">Rave Merchant ID</label>
                            <input onChange= {this.onInputChange('merchant')}id="merchant" type="text"/>
                            <Link to='https://rave.flutterwave.com'>Don't have a Rave Merchant ID?</Link>
                        </div>
                        <div className="form-group">
                            <button>Register</button>
                        </div>
                        { this.state.success? <div>Sign Up successful, proceed to Login</div> : null}
                        <h2 className="center"><span className="ash">Already have an account? </span> <Link className="orange" to='/login'>LogIn</Link></h2>
                    </form>
                </div>
                <div className="image-box box1"></div>
            </div> 
        )
     }
 }

 export default SignUp;