import React from 'react';
import Container from '@material-ui/core/Container';
import CreateToDo from './CreateToDo';
import TaskList from './TaskList';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

class ToDoDashboard extends React.Component {
    
    componentDidUpdate(){
        console.log(this.props.match.params)
    }

    render() {
        return (
            <Container maxWidth="md" style={{ padding: 20 }}>
                <Grid container spacing={3}>
                    <Grid item md={3}>
                        <List>
                            <Link to="/dashboard/today" style={{ textDecoration: "none", color: "black" }}>
                                <ListItem button>
                                    <ListItemText>Today</ListItemText>
                                </ListItem>                                   
                            </Link>
                            <Link to="/dashboard/weekly" style={{ textDecoration: "none", color: "black" }}>
                                <ListItem button>
                                    <ListItemText>Next 7 Days</ListItemText>
                                </ListItem>                                   
                            </Link>
                        </List>
                    </Grid>
                    <Grid item md={9}>
                        <CreateToDo />
                        <TaskList condition={this.props.match.params.condition} />
                    </Grid>
                </Grid>

            </Container>
        )
    }
}

export default ToDoDashboard;