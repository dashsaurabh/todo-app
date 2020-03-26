import React from 'react';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../actions';

class UpdateToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoDesc: this.props.task.todoDesc,
            todoDate: this.props.task.todoDate
        }

        this.updateTask = this.updateTask.bind(this);
        this.hideTaskForm = this.hideTaskForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleChange.bind(this);
    }

    updateTask() {
        let task = this.props.task;
        task.todoDesc = this.state.todoDesc;
        task.todoDate = this.state.todoDate;
        task.completed = this.props.task.completed;
        this.props.updateToDo(task);
        this.props.hideTaskEditForm(task);
    }

    hideTaskForm() {
        let task = this.props.task;
        task.todoDesc = this.state.todoDesc;
        task.todoDate = this.state.todoDate;
        task.completed = this.props.task.completed;
        this.props.hideTaskEditForm(task)
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    handleDateChange(event) {
        this.setState({ todoDate: event })
    }

    render() {
            return (
                <div style={{ marginTop: 20, marginBottom: 20 }}>
                    <form>
                        <TextField id="task-desc"
                            size="small"
                            name="todoDesc"
                            variant="outlined"
                            value={this.state.todoDesc}
                            onChange={this.handleChange}
                            style={{ margin: 3, width: "65%" }}
                            placeholder="e.g. Water the garden"
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                size="small"
                                name="todoDate"
                                variant="inline"
                                inputVariant="outlined"
                                format="yyyy-MM-dd"
                                margin="normal"
                                id="date-picker-dialog"
                                label="Select Date"
                                value={this.state.todoDate}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                style={{ margin: 3, width: "30%" }}
                            />
                        </MuiPickersUtilsProvider>
                    </form>
                    <Button size="small" onClick={this.updateTask} variant="contained" 
                        style={{ marginTop: 10, marginLeft: 3, backgroundColor: "#db4c3f", color: "white" }}>
                        Update
                    </Button>
                    <Button size="small" onClick={this.hideTaskForm} variant="contained" 
                        style={{ marginTop: 10, marginLeft: 3 }}>
                        Cancel
                    </Button>
                </div>
            )
    }
}

export default connect(null, actions)(UpdateToDo);