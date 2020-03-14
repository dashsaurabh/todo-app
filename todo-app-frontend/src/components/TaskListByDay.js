import React from 'react';
import Typography from '@material-ui/core/Typography';
import TaskItem from './TaskItem';

export default function(props) {

    return(
        <div style={{ marginTop: 20 }}>
            <Typography variant="subtitle1">
                    {props.day}
            </Typography>
            <hr />
            {props.tasks.taskByDay.map((task) => {
                return <TaskItem key={task._id} task={task} />
            })}
        </div>
    )
}