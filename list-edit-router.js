const express = require("express");
const listEditRouter = express.Router();

let tareas = [
    {id: 1, description: 'Aprender a programar', completado: false },
    {id: 2, description: 'Hacer el almuerzo', completed: false},
    {id: 3, description: 'Lavar la loza', completed: true},
];


listEditRouter.post("/created", (req, res) => {
    const nuevaTarea = req.body;
    tareas.push(nuevaTarea);
    res.json({message: 'Tarea creada', tarea: nuevaTarea});
});

listEditRouter.delete('/eliminar/:id', (req, res) => {
    const taskId =req.params.id;
    tareas = tareas.filter((tarea) => tarea.id !== parseInt(taskId));
    res.json({message: 'Tarea eliminada'});
});

listEditRouter.put('/update/:id', (req, res) => {
    const taskId = req.params.id;
    const tareaUpdate = req.body;
    tareas = tareas.map((tarea) => {
        if (tarea.id === parseInt(taskId)) {
            return tareaUpdate;
        }
        return tarea;
    });
    res.json({message: 'Tarea actualizada', tarea: tareaUpdate});
});

module.exports = listEditRouter;

