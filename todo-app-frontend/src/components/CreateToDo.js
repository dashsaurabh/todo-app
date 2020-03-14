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

class CreateToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            todoDesc: '',
            todoDate: new Date()
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.createTask = this.createTask.bind(this);
        this.showTaskForm = this.showTaskForm.bind(this);
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

    createTask() {
        this.props.createToDo(this.state.todoDesc, this.state.todoDate);
    }

    showTaskForm(){
        this.setState({showForm: !this.state.showForm})
    }

    renderForm() {
        const isFetching = this.props.apiCall === null ? false : this.props.apiCall.isFetching;
        if (this.state.showForm === true) {
            return (
                <div>
                    <form>
                        <TextField id="task-desc"
                            name="todoDesc"
                            variant="outlined"
                            value={this.state.todoDesc}
                            onChange={this.handleChange}
                            style={{ margin: 3, width: "65%" }}
                            placeholder="e.g. Water the garden"
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
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
                    <Button disabled={isFetching} onClick={this.createTask} variant="contained" color="primary" style={{ marginTop: 10, marginLeft: 3 }}>
                        Save Task
                    </Button>
                    <Button disabled={isFetching} onClick={this.showTaskForm}variant="contained" color="secondary" style={{ marginTop: 10, marginLeft: 3 }}>
                        Cancel
                    </Button>
                </div>
            )
        }else{
            return(
                <Button onClick={this.showTaskForm} variant="contained" color="primary" style={{ marginTop: 10, marginLeft: 3 }}>
                        New Task
                </Button>
            )
        }
    }

    render() {
        
        return (
            <div>
                {this.renderForm()}
            </div>

        )

    }
}

function mapStateToProps({ apiCall }) {
    return { apiCall };
}

export default connect(mapStateToProps, actions)(CreateToDo);