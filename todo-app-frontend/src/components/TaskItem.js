import React from 'react';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import * as actions from '../actions';
import differenceInCalendarDays from 'date-fns/differenceincalendardays';
import './TaskItem.css';
import Grid from '@material-ui/core/Grid';
import UpdateToDo from './UpdateToDo';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FlagIcon from '@material-ui/icons/Flag';
import Chip from '@material-ui/core/Chip';

class TaskItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTaskEdit: false,
            todoDesc: this.props.task.todoDesc,
            todoDate: this.props.task.todoDate,
            taskCompleted: this.props.task.completed,
            priority: this.props.task.priority,
            anchorEl: null
        }
        this.handleTaskCompleted = this.handleTaskCompleted.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.hideTaskEditForm = this.hideTaskEditForm.bind(this);
        this.handleMenuOption = this.handleMenuOption.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleTaskCompleted(event) {
        this.setState({ taskCompleted: event.target.checked }, () => {
            let task = this.props.task;
            task.completed = this.state.taskCompleted
            this.props.updateToDo(task)
        })
    }

    handleEditItem(event) {
        this.setState({ showTaskEdit: true, anchorEl: null })
    }

    hideTaskEditForm(task) {
        this.setState({ todoDesc: task.todoDesc, todoDate: task.todoDate, taskCompleted: task.taskCompleted, showTaskEdit: false })
    }

    handleMenuOption(event) {
        this.setState({ anchorEl: event.target })
    }

    handleClose() {
        this.setState({ anchorEl: null })
    }

    handleDelete() {
        this.setState({ anchorEl: null })
        this.props.deleteTask(this.props.task._id)
    }

    handlePriorityUpdate(parameter, event) {
      this.setState({ priority: parameter }, () => {
          let task = this.props.task;
          task.priority = this.state.priority;
          this.props.updateToDo(task)
      })
      this.setState({ anchorEl: null })
    }

    renderTaskDate() {
        let taskDate = new Date(this.state.todoDate);
        let currentDate = new Date()
        let daysDifference = differenceInCalendarDays(currentDate, taskDate)
        if (daysDifference > 0) {
            return <div><Typography variant="caption">
                {new Date(new Date(this.state.todoDate).getTime() - (new Date(this.state.todoDate).getTimezoneOffset() * 60000)).toDateString()}
            </Typography></div>
        }
    }

    renderTask() {
        let priorityChipColor;
        switch(this.state.priority) {
            case 'LOW':
                priorityChipColor = 'grey';
                break;
            case 'MEDIUM':
                priorityChipColor = 'green';
                break;
            case 'HIGH':
                priorityChipColor = 'orange';
                break;
            case 'CRITICAL':
                priorityChipColor = 'red'
                break;
            default:
                priorityChipColor = 'low'
                break;
        }
        if (this.state.showTaskEdit === true) {
            return <UpdateToDo task={this.props.task} hideTaskEditForm={this.hideTaskEditForm} />
        } else {
            return <Grid container>
                <Grid item xs={1}>
                    <Checkbox
                        checked={this.state.taskCompleted}
                        color="primary"
                        onChange={this.handleTaskCompleted}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Grid>
                <Grid item xs={8} style={{ padding: '5px' }} className="task-item" onClick={this.handleEditItem}>
                    <Typography variant="subtitle2" style={{ marginTop: 5 }} >
                        {this.state.todoDesc}
                    </Typography>
                    {this.renderTaskDate()}
                </Grid>
                <Grid item xs={2} style={{ textAlign: 'center' }} >
                    <Chip label={this.state.priority} style={{ marginTop: 9, backgroundColor: priorityChipColor, color: 'white' }} />
                </Grid>
                <Grid item xs={1}>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={this.handleMenuOption}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        keepMounted
                    >
                        <MenuItem onClick={this.handleEditItem}>Edit</MenuItem>
                        <MenuItem style={{ display: 'block' }}>
                            <p>Set Priority</p>
                            <div>
                                <IconButton
                                    aria-label="low"
                                    aria-controls="priority"
                                    aria-haspopup="true"
                                    onClick={this.handlePriorityUpdate.bind(this, "LOW")}                                   
                                >
                                    <FlagIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="medium"
                                    aria-controls="priority"
                                    aria-haspopup="true"
                                    onClick={this.handlePriorityUpdate.bind(this, "MEDIUM")}
                                >
                                    <FlagIcon style={{ color: 'green' }} />
                                </IconButton>
                                <IconButton
                                    aria-label="high"
                                    aria-controls="priority"
                                    aria-haspopup="true"
                                    onClick={this.handlePriorityUpdate.bind(this, "HIGH")}
                                >
                                    <FlagIcon style={{ color: 'orange' }} />
                                </IconButton>
                                <IconButton
                                    aria-label="critical"
                                    aria-controls="priority"
                                    aria-haspopup="true"
                                    onClick={this.handlePriorityUpdate.bind(this, "CRITICAL")}
                                >
                                    <FlagIcon style={{ color: 'red' }} />
                                </IconButton>
                            </div>
                        </MenuItem>
                        <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
                        <MenuItem onClick={this.handleClose}>Close</MenuItem>
                    </Menu>
                </Grid>
            </Grid>
        }
    }

    render() {
        return (
            <div>
                {this.renderTask()}
            </div>
        )
    }
}

export default connect(null, actions)(TaskItem);