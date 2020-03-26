const mongoose = require('mongoose');
const Todo = mongoose.model('ToDo');

module.exports = (app) => {
    
    app.get('/api/todos', async (req, res) => {
        let { startDate, endDate, priority } = req.query;
        let todos = await Todo.find({
        user: req.user._id,
        priority: {$in: priority !== undefined ? [priority] : ['CRITICAL','HIGH','MEDIUM','LOW'] },
        todoDate: {
            $gte: new Date(new Date(startDate).setHours(00,00,00)),
            $lt: new Date(new Date(endDate).setHours(23, 59, 59))
        }});     

        if(todos){
            res.json(todos);
        }else{
            res.sendStatus(404);
        }   
        
    });

    app.post('/api/todos', async (req, res) => {
        const newToDo = await new Todo({ todoDesc: req.body.todoDesc, 
                                         todoDate: new Date(req.body.todoDate),
                                         completed: false,
                                         priority: 'LOW',
                                         user: req.user._id }).save();
        if(newToDo) {
            res.status(201).json(newToDo)
        }
    });

    app.put('/api/todos/:taskId', async (req, res) => {

        let updatedToDo = await Todo.findByIdAndUpdate(req.params.taskId, {
            todoDesc: req.body.todoDesc,
            todoDate: req.body.todoDate,
            completed: req.body.completed,
            priority: req.body.priority,
            user: req.user._id
        }, {new: true});

        res.status(202).json(updatedToDo);
    })

    app.delete('/api/todos/:taskId', async (req, res) => {
        let result = await Todo.deleteOne({ _id: req.params.taskId })
        console.log(result)
        res.sendStatus(200);
    })

}