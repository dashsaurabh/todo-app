import React from 'react';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TaskListByDay from './TaskListByDay';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import GeneralTasks from './GeneralTasks';
import Snackbar from '@material-ui/core/Snackbar';
import Skeleton from '@material-ui/lab/Skeleton';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCompleted: false,
            showOverdueTasks: false,
            showTaskListByDay: false,
            showPriorityTasks: false,
            dataFetching: false,
            alertOpen: false,
            alertMessage: ''
        }
        this.handleShowCompleted = this.handleShowCompleted.bind(this);
        this.handleAlertClose = this.handleAlertClose.bind(this);
    }

    componentDidMount() {
        if (['critical', 'high', 'medium', 'low'].includes(this.props.condition)) {
            this.setState({ showOverdueTasks: false, showTaskListByDay: false, showPriorityTasks: true }, () => {
                this.props.listToDoByPriority(this.props.condition)
            })
        } else {
            this.setState({ showOverdueTasks: true, showTaskListByDay: true, showPriorityTasks: false }, () => {
                if (this.props.condition === 'weekly') {
                    this.props.listToDoNext7Days();
                } else if (this.props.condition === 'today') {
                    this.props.listToDoForToday();
                }
                this.props.listOverdueTasks();
            })

        }

    }

    componentDidUpdate(prevProps) {
        if ((this.props.apiCall !== prevProps.apiCall)) {
            if (this.props.apiCall.isFetching) {
                this.setState({ dataFetching: true })
            } else {
                this.setState({ dataFetching: false })
            }
        }

        if (this.props.condition !== prevProps.condition) {
            this.setState({ showOverdueTasks: false, showTaskListByDay: false, showPriorityTasks: false }, () => {
                this.setState({ dataFetching: true })
                if (['critical', 'high', 'medium', 'low'].includes(this.props.condition)) {
                    this.setState({ showOverdueTasks: false, showTaskListByDay: false, showPriorityTasks: true })
                    this.props.listToDoByPriority(this.props.condition)
                } else {
                    this.setState({ showOverdueTasks: true, showTaskListByDay: true, showPriorityTasks: false })
                    if (this.props.condition === 'weekly') {
                        this.props.listToDoNext7Days();
                    } else if (this.props.condition === 'today') {
                        this.props.listToDoForToday();
                    }
                    this.props.listOverdueTasks();
                }
            })

        }

        if (this.props.createToDoStatus !== prevProps.createToDoStatus) {
            if (['critical', 'high', 'medium', 'low'].includes(this.props.condition)) {
                this.setState({ showOverdueTasks: false, showTaskListByDay: false, showPriorityTasks: true })
                this.props.listToDoByPriority(this.props.condition)
            } else {
                this.setState({ showOverdueTasks: true, showTaskListByDay: true, showPriorityTasks: false })
                if (this.props.condition === 'weekly') {
                    this.props.listToDoNext7Days();
                } else if (this.props.condition === 'today') {
                    this.props.listToDoForToday();
                }
                this.props.listOverdueTasks();
            }
            this.setState({ alertOpen: true, alertMessage: 'New Task Added!' })
        }

        if (this.props.updateToDoStatus !== prevProps.updateToDoStatus) {
            this.setState({ alertOpen: true, alertMessage: 'Task Updated!' })
            // if (['critical', 'high', 'medium', 'low'].includes(this.props.condition)) {
            //     this.setState({ showOverdueTasks: false, showTaskListByDay: false, showPriorityTasks: true })
            //     this.props.listToDoByPriority(this.props.condition)
            //     this.setState({ alertOpen: true, alertMessage: 'List Refreshed!' })
            // }
            if (['critical', 'high', 'medium', 'low'].includes(this.props.condition)) {
                this.setState({ showOverdueTasks: false, showTaskListByDay: false, showPriorityTasks: true })
                this.props.listToDoByPriority(this.props.condition)
            } else {
                this.setState({ showOverdueTasks: true, showTaskListByDay: true, showPriorityTasks: false })
                if (this.props.condition === 'weekly') {
                    this.props.listToDoNext7Days();
                } else if (this.props.condition === 'today') {
                    this.props.listToDoForToday();
                }
                this.props.listOverdueTasks();
            }
            this.setState({ alertOpen: true, alertMessage: 'List Refreshed!' })
        }

        if (this.props.deleteToDoStatus !== prevProps.deleteToDoStatus) {
            if (['critical', 'high', 'medium', 'low'].includes(this.props.condition)) {
                this.setState({ showOverdueTasks: false, showTaskListByDay: false, showPriorityTasks: true })
                this.props.listToDoByPriority(this.props.condition)
            } else {
                this.setState({ showOverdueTasks: true, showTaskListByDay: true, showPriorityTasks: false })
                if (this.props.condition === 'weekly') {
                    this.props.listToDoNext7Days();
                } else if (this.props.condition === 'today') {
                    this.props.listToDoForToday();
                }
                this.props.listOverdueTasks();
            }
            this.setState({ alertOpen: true, alertMessage: 'Task Deleted!' })
        }

    }

    handleShowCompleted(event) {
        this.setState({ showCompleted: event.target.checked }, () => {
            if (this.props.condition === 'weekly') {
                this.props.listToDoNext7Days();
            } else if (this.props.condition === 'today') {
                this.props.listToDoForToday();
            } else if (['critical', 'high', 'medium', 'low'].includes(this.props.condition)) {
                this.props.listToDoByPriority(this.props.condition)
            }
        })
    }

    handleAlertClose() {
        this.setState({ alertOpen: false });
    }

    renderTaskList() {
        if (this.props.taskList && this.state.showTaskListByDay && !this.state.dataFetching) {
            let markUp = Object.keys(this.props.taskList).map((key) => {
                if (this.state.showCompleted === false) {
                    this.props.taskList[key].taskByDay = this.props.taskList[key].taskByDay.filter((task) => task.completed === false)
                }
                return <TaskListByDay key={key} day={key} tasks={this.props.taskList[key]} />
            })
            return markUp;
        }
    }

    renderGeneralTasks() {
        if (this.props.overdueTasks && this.state.showOverdueTasks && !this.state.dataFetching) {
            let overdueTasks = this.props.overdueTasks
            if(this.state.showCompleted === false) {
                overdueTasks = overdueTasks.filter((task) => task.completed === false)
            }
            return <GeneralTasks tasks={overdueTasks} title="Overdue Tasks" />
        }

        if (this.props.priorityTaskList && this.state.showPriorityTasks && !this.state.dataFetching) {
            let priorityTasks = this.props.priorityTaskList
            if(this.state.showCompleted === false) {
                priorityTasks = priorityTasks.filter((task) => task.completed === false)
            }
            return <GeneralTasks tasks={priorityTasks} title={this.props.condition} />
        }
    }

    renderTitle() {
        if (this.props.condition === "weekly") {
            return "Your Week at a glance";
        } else if (this.props.condition === "today") {
            return "Your Day at a glance";
        } else if (['critical', 'high', 'medium', 'low'].includes(this.props.condition)) {
            return "Priority";
        }
    }

    renderTasks() {
        if (!this.state.dataFetching) {
            return (
                <div>
                    {this.renderGeneralTasks()}
                    <div style={{ marginTop: 10 }}>
                        {
                            this.renderTaskList()
                        }
                    </div>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        autoHideDuration={3000}
                        open={this.state.alertOpen}
                        onClose={this.handleAlertClose}
                        message={this.state.alertMessage}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <Skeleton variant="rect" width="100%" height={50} style={{ marginTop: 20 }} />
                    <Skeleton variant="rect" width="100%" height={50} style={{ marginTop: 20 }} />
                    <Skeleton variant="rect" width="100%" height={50} style={{ marginTop: 20 }} />
                    <Skeleton variant="rect" width="100%" height={50} style={{ marginTop: 20 }} />
                    <Skeleton variant="rect" width="100%" height={50} style={{ marginTop: 20 }} />
                    <Skeleton variant="rect" width="100%" height={50} style={{ marginTop: 20 }} />
                    <Skeleton variant="rect" width="100%" height={50} style={{ marginTop: 20 }} />
                </div>
            )
        }
    }

    renderTitleBar() {
        return (
            <div>
                <Typography variant="h6" style={{ display: 'inline' }}>
                    {this.renderTitle()}
                </Typography>
                <FormControlLabel style={{ float: 'right' }}
                    control={
                        <Switch
                            color="primary"
                            checked={this.state.showCompleted}
                            onChange={this.handleShowCompleted}
                        />
                    }
                    label="Show Completed"
                />
            </div>
        )
    }

    render() {
        return (
            <div style={{ marginTop: 15 }}>
                {this.renderTitleBar()}
                {this.renderTasks()}
            </div>

        )
    }
}

function mapStateToProps({ taskList, createToDoStatus, updateToDoStatus, overdueTasks, deleteToDoStatus, priorityTaskList, apiCall }) {
    return { taskList, createToDoStatus, updateToDoStatus, overdueTasks, deleteToDoStatus, priorityTaskList, apiCall };
}

export default connect(mapStateToProps, actions)(TaskList);