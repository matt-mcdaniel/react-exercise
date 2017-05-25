import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

const dogStyle = {
    color: 'brown'
};

const catStyle = {
    color: 'blue'
};

const UserInfo = props => {
    const user = props.user;

    return (
        <div>
            <img src={user.picture.large} />
            <div>
                {user.name.first + ' ' + user.name.last}
            </div>
        </div>
    );
};

class App extends Component {
    state = {
        user: null,
        dogPeople: [],
        catPeople: []
    };

    getUserData = () => {
        fetch('https://randomuser.me/api/')
            .then(data => data.json())
            .then(data => {
                this.setState({
                    user: data.results[0]
                });
            })
            .catch(e => {
                this.setState({error: e});
            });
    };

    handlePetSelect = pet => {
        /**
         * Create two lists of dog people, cat people,
         * show lists anywhere,
         * reuse UserInfo component,
         * allow deleting individual user from dogPeople/catPeople list
         */
        console.log(pet);

        this.getUserData();
    };

    componentDidMount() {
        this.getUserData();
    }

    render() {
        const {user} = this.state;

        if (!user) {
            return <div>No User Found</div>;
        }

        return (
            <div>
                <h3 onClick={() => this.handlePetSelect('dog')} style={dogStyle}>
                    Dog Person
                </h3>
                <h3 onClick={() => this.handlePetSelect('cat')} style={catStyle}>
                    Cat Person
                </h3>
                <UserInfo user={user} />
            </div>
        );
    }
}

export default App;
