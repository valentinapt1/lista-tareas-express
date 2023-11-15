const express = require("express");
const listViewRouter = express.Router();
 //middlewares
const validateParams = (req, res, next) => {
    const param = req.params.id;

    if(!param || isNaN(param)) {
        res.status(400).json({error: 'No valido'});
        return;
    }

    next();
};

//lista tareas

const tareas = [
    {id: 1, description: 'Aprender a programar', completed: false},
    {id: 2, description: 'Hacer el almuerzo', completed: false},
    {id: 3, description: 'Lavar la loza', completed: true},
];


//listar tareas completas

listViewRouter.get("/completas", (req, res) => {
    const tareasCompletas = tareas.filter((tarea) => tarea.completado);
    res.json(tareasCompletas);
});

//listar tareas incompletas

listViewRouter.get("/incompletas", (req, res) => {
    const tareasIncompletas = tareas.filter((tarea) => !tarea.completado);
    res.json(tareasIncompletas);
});
module.exports = listViewRouter;


