import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginOptions from './LoginOptions';
import ToDoDashboard from './ToDoDashboard';

class App extends React.Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return(
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/login" component={LoginOptions} />
                        <Route path="/dashboard/:condition" component={ToDoDashboard} />
                    </div>
                </BrowserRouter>    
            </div>
        );
    }
}

export default connect(null, actions)(App);