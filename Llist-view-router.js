const express = require("express");
const listViewRouter = express.Router();


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


