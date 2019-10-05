import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Form from './Form';
import logo from '../img/logo.png';
import CaseCard from './CaseCard';
import Footer from './Footer'

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText : null,
            searching: false,
            cases : []
        }
    }
    onInputChange = (e) => {
        this.setState({searchText : e.target.value})
      }
    onSearch = (e) => {
    e.preventDefault();
    document.querySelector('input').blur();
    this.setState({searching : true});
    fetch(`https://omdbapi.com/?apikey=61fddd85&s=${this.state.input}`)
           
    }

    loadLatestCases = () => {
        fetch('http://localhost:8080/fundings')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({cases : data.fundings})
        })
    }

    componentDidMount() {
        this.loadLatestCases();
        const nav = document.querySelector('.nav');
        window.addEventListener('scroll', () => {
            if(window.pageYOffset >= 60) {
                nav.classList.add('nav-after');
                return;
            }
            nav.classList.remove('nav-after');
        })
        const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/theogundipefoundation/image/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'sp3cqmgi';
    const image = document.querySelector('#image');
    image.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then((data) => {
        if (data.secure_url !== '') {
            const uploadedFileUrl = data.secure_url;
            console.log(uploadedFileUrl)
            localStorage.setItem('passportUrl', uploadedFileUrl);
        }
        })
        .catch(err => console.error(err));
    });
    }

    render() {
        return (
            <div id="image">
                <div className="nav">
                    <div>
                        <Link to='/'><img src={logo} className="logo" alt="logo"/></Link>
                    </div>
                    <div>
                        <Form onInputChange ={this.onInputChange} onSearch = {this.onSearch} />
                    </div>
                    <div>
                        <Link to='/login'>
                            <button className="btn-login">LOG IN</button>
                        </Link>
                    </div>
                </div>
                <div className="header">
                    <div className="cover">
                        <div className="desc">
                            <h1 className="desc-title">Aid4Life</h1>
                            <p className="desc-short">helping save a generation</p>
                            <button className="desc-button">Post your Case</button>
                        </div>
                    </div>
                </div>
                <div className="what">
                    <h1>WHAT WE DO</h1>
                    <div className="separator"></div>
                    <p>
                        Aid4Life provides a platform for those seeking medical care and are unable to pay for this in health institutions. You come on this platform, post your case - problem (heart surgery, kidney transplant etc ), amount required to carry out this operation. <br/> <br/>
                        Your case must be properly backed with supporting documents - letter from the health institution and also a picture. <br/> <br/>
                        The Aid4Life Team verifies you and people can start donating to you through your link
                    </p>
                </div>
                <div className="latest">
                    <h1>LATEST CASES TO FUND</h1>
                    <div className="separator"></div>
                    <div className="card-container">
                        {
                          this.state.cases.map(problem => <CaseCard problem={problem} key={problem._id} />)  
                        
                        }
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;