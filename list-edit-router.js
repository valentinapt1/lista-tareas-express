const express = require("express");
const listViewRouter = express.Router();

let tareas = [
    {id: 1, description: 'Aprender a programar', completed: false},
    {id: 2, description: 'Hacer el almuerzo', completed: false},
    {id: 3, description: 'Lavar la loza', completed: true},
];

//middlewares
const validateTask = (req, res, next) => {
    const newTask = req.body;

   if(!newTask || Object.keys(newTask).length === 0){
    res.status(400).json({error: 'Cuerpo de solicitud vacío'});
    return;
   } 
   if(!newTask.description || typeof newTask.description !== 'string') {
    res.status(400).json({error:'debe ser una cadena de caracteres'});
    return;
   }

   if(typeof newTask.completed !== 'boolean') {
    res.status(400).json({error: 'debe ser booleano'});
    return;
   }
   next();
};

//para crear una tarea POST
listEditRouter.post ('/created', validateTask, (req, res) => {
    const newTask = req.body
    
    newTask.push(newTask);
    res.json({mesage: 'creada con exito', task: newTask});
});

//actualizar una tarea (PUT)
listEditRouter.put('/update/:id', validateTask, (req, res) => {
    const taskId = req.params.id;
    const taskUpdate = req.body;

    task = task.map((task) => {
        if (task.id === parseInt(taskId)) {
            return taskUpdate;
        }
        return task;
    });
    res.json({message: 'actualizada con exito', tarea: taskUpdate});
});

//eliminar tarea (DELETE)
listEditRouter.delete('/delete/:id', (req, res) => {
    const taskId = req.params.id;
    task = task.filter((task) => task.id !== parseInt(taskId));
    res.json({message: 'eliminada con exito'});
});

module.exports = listEditRouter;