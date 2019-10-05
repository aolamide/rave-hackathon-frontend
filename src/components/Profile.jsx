import React, {Component} from 'react';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectToLogin : false,
            id : null,
            name : '',
            email : '',
            created : ''
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
              created: data.created
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

    componentDidMount() {
        this.init(this.props.match.params.userId);
    }
    render() {
        const { id, name, email, created } = this.state;

        if(this.state.redirectToLogin) {
            return <Redirect to='/login' /> 
        }
        else if(!id) {
            return <div></div>
        }
        return (
            <div>
                {name}
            </div>
        )
    }
}

export default Profile;