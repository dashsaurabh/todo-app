import React from 'react';
import Typography from '@material-ui/core/Typography';
import TaskItem from './TaskItem';
import Divider from '@material-ui/core/Divider';

export default function(props) {
    return(
        <div style={{ marginTop: 20 }}>
            <Typography variant="subtitle2">
                    {props.title.toUpperCase()}
            </Typography>
            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
            {props.tasks.map((task) => {
                return <TaskItem key={task._id} task={task} />
            })}
        </div>
    )
}