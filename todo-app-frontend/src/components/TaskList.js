import React from 'react';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TaskListByDay from './TaskListByDay';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCompleted: false
        }
        this.handleShowCompleted = this.handleShowCompleted.bind(this);
    }

    componentDidMount() {
        if(this.props.condition === 'weekly'){
            this.props.listToDoNext7Days();
        }else if(this.props.condition === 'today'){
            this.props.listToDoForToday();
        }   
    }

    componentDidUpdate(prevProps) {
        if(this.props.condition !== prevProps.condition) {
            if(this.props.condition === 'weekly'){
                this.props.listToDoNext7Days();
            }else if(this.props.condition === 'today'){
                this.props.listToDoForToday();
            }     
        } 
    }

    handleShowCompleted(event) {
        this.setState({ showCompleted: event.target.checked }, () => {
            if(this.props.condition === 'weekly'){
                this.props.listToDoNext7Days();
            }else if(this.props.condition === 'today'){
                this.props.listToDoForToday();
            }     
            
        })
    }

    renderTaskList() {
        if (this.props.taskList) {
            let markUp = Object.keys(this.props.taskList).map((key) =>{
                if(this.state.showCompleted === false){
                    console.log(this.props.taskList[key])
                    this.props.taskList[key].taskByDay = this.props.taskList[key].taskByDay.filter((task) => task.completed === false )
                }              
                return <TaskListByDay key={key} day={key} tasks={this.props.taskList[key]} />
            })
            return markUp;
        }
    }

    renderTitle(){
        if (this.props.condition==="weekly"){
            return "Your Week at a glance";
        }else{
            return "Your Day at a glance";
        }
    }

    render() {
        return (
            <div style={{ marginTop: 15 }}>
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

                <div style={{ marginTop: 10 }}>
                    {
                        this.renderTaskList()
                    }
                </div>

            </div>

        )
    }
}

function mapStateToProps({ taskList }) {
    return { taskList };
}

export default connect(mapStateToProps, actions)(TaskList);