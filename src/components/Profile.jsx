import React, {Component} from 'react';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';
import logo from '../img/logo.png';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectToLogin : false,
            id : null,
            name : '',
            email : '',
            created : '',
            signOut : false,
            error : '',
            title : '',
            description : '',
            amount : '', 
            message : null,
            token : null
        }
    }

    init = userId => {
        const token = isAuthenticated().token;
        this.readData(userId, token).then(data => {
          if (data.error) {
            this.setState({ redirectToLogin: true });
          } else {
            this.setState({
              id: data._id,
              name: data.name,
              email: data.email,
              error: "",
              created: data.created,
              token : token
            });
          }
        });
      };

    readData = (userId, token) => {
        return fetch(`http://localhost:8080/user/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
    }
    signOut = () => {
        if (typeof window !== 'undefined') localStorage.removeItem('jwt');
        fetch('http://localhost:8080/signout')
        .then(res => res.json())
        .then(data => {
            if(data.message) this.setState({signOut : true})
        })
        .catch(err => console.log(err)) 
    }

    onInputChange = name => e => {
        if(name === 'title') {
            this.setState({title : e.target.value})
        }
        else if(name === 'description') {
            this.setState({description : e.target.value})
        }
        else if(name === 'amount') {
            this.setState({amount : e.target.value})
        }
    }
    uploadImages = async(image) => {
        try{
            const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/theogundipefoundation/image/upload';
            const CLOUDINARY_UPLOAD_PRESET = 'sp3cqmgi';
            const file = image.files[0];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            const res = await fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if(data.secure_url !== '') {
                this.setState({Message : 'Success'});
                return data.secure_url;
            }
        }
        catch(err) {
            console.log(err)
        }
    }
    onFormSubmit = e => {
        e.preventDefault();
        const image1 = document.getElementById('head-image');
        const image2 = document.getElementById('hospital-doc'); 
        this.setState({
            hospitalDoc : this.uploadImages(image2),
            image : this.uploadImages(image1)
        })
        fetch(`http://localhost:8080/funding/new/${this.state.id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.state.token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
    }

    
    componentDidMount() {
        this.init(this.props.match.params.userId);
    }
    render() {
        const { id, name, email, created, signOut, redirectToLogin } = this.state;
        if(signOut) {
            return <Redirect to='/' /> 
        }
        else if(redirectToLogin) {
            return <Redirect to='/login' /> 
        }
        else if(!id) {
            return <div></div>
        }
        return (
            <div>
                <div>
                    <div className="top">
                        <img src={logo} alt="logo"/>
                    </div>
                    <button onClick={this.signOut} className="log-out">
                        LOGOUT
                    </button>
                    <div className="main-body">
                        <div className="side1">
                            <div className="img-circle">

                            </div>
                            <h3>{name}</h3>
                            <h4>{email}</h4>
                            <p>Created : {created}</p>
                        </div>
                        <div className="side2">
                            <form onSubmit={this.onFormSubmit} className="problem-form">
                                <div>
                                    {this.state.message ? this.state.message : null}
                                    <label htmlFor="Title">Title of Problem</label>
                                    <input onChange= {this.onInputChange('title')} type="text" id="title" placeholder="Title of Problem e.g Cancer"/>
                                </div>
                                <div>
                                    <label htmlFor="desc">Description</label>
                                    <textarea onChange= {this.onInputChange('description')} name="" id="desc" cols="30" rows="10" placeholder="Short description of what type of medical care you need the funds for"></textarea>
                                </div>
                                <div>
                                    <label htmlFor="head-image">Add a picture of patient</label>
                                    <input type="file" name="head-image" id="head-image"/>
                                </div>
                                <div>
                                    <label htmlFor="amount">Amount needed in Naira</label>
                                    <input onChange= {this.onInputChange('amount')} type="number" placeholder="Enter amount"/>
                                    <p>NOTE : Amount must match what is written in the hospital doc</p>
                                </div>
                                <div>
                                    <label htmlFor="hospital-doc">Add necessary documentation(image) from certified hospital</label>
                                    <input type="file" name="hospital-doc" id="hospital-doc"/>
                                </div>
                                <button type="submit">POST PROBLEM</button>
                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Profile;