import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class Header extends React.Component {

    renderAuthContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                        <Button color="inherit">Login</Button>
                    </Link>
                )
            default:
                return <a href="/api/logout" style={{ textDecoration: 'none', color: 'white' }}><Button color="inherit">Logout</Button></a>
        }
    }

    render() {
        return (
            <div style={{ flexGrow: 1, padding: 0, margin: 0 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            ToDo App
                        </Typography>
                        {this.renderAuthContent()}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

function mapStateToProps({ auth }){
    return { auth };
}

export default connect(mapStateToProps)(Header);