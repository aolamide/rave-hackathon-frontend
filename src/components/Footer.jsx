import React from 'react';
import logo from '../img/logo.png';

const Footer = () => {
    return (
        <footer>
            <div className="logo-footer">
                <img src={logo} alt="logo"/>
            </div>
            <div className="links">
                <h3>AID4LIFE</h3>
                <a href="#">Donate to Aid4Life</a>
                <a href="#">About Us</a>
                <a href="#">Contact Us</a>
            </div>
            <div className="socials">
                <h4>Follow us on social media</h4>
                <a href=""><i className="fa fa-facebook"></i></a>
                <a href=""><i className="fa fa-twitter"></i></a>
                <a href=""><i className="fa fa-instagram"></i></a>
            </div>
        </footer>
    )
}
 export default Footer;