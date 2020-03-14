import React from 'react';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import * as actions from '../actions';

class TaskItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            taskCompleted: this.props.task.completed
        }
        console.log(this.props.task)
        this.handleTaskCompleted = this.handleTaskCompleted.bind(this);
    }

    handleTaskCompleted(event) {
        this.setState({ taskCompleted: event.target.checked }, () => {
            let task = this.props.task;
            task.completed = this.state.taskCompleted
            this.props.updateToDo(task)
        })
    }

    render() {
        return (
            <div>
                <Checkbox
                    checked={this.state.taskCompleted}
                    color="primary"
                    onChange={this.handleTaskCompleted}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    style={{ paddingTop: '5px' }}
                />
                <Typography variant="subtitle2" style={{ display: 'inline' }}>
                    {this.props.task.todoDesc}
                </Typography>
            </div>
        )
    }
}

export default connect(null, actions)(TaskItem);