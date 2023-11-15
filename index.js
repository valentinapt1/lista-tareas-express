const express = require("express");
const app = express();
const middlewares = require('./middlewares');


const PORT = 3000;

const tareas = [
    {id: 1, description: 'Aprender a programar', completed: false},
    {id: 2, description: 'Hacer el almuerzo', completed: false},
    {id: 3, description: 'Lavar la loza', completed: true},
];

//Listar todas las tareas
app.get('/tareas', (req, res) => {
    res.json(tareas);
  });
  
  // Ruta para listar tareas completas
  app.get('/tareas/completas', (req, res) => {
    const tareasCompletas = tareas.filter((tarea) => tarea.completado);
    res.json(tareasCompletas);
  });
  
  // Ruta para listar tareas incompletas
  app.get('/tareas/incompletas', (req, res) => {
    const tareasIncompletas = tareas.filter((tarea) => !tarea.completado);
    res.json(tareasIncompletas);
  });

  
// Ruta para obtener una sola tarea por su ID
app.get('/tareas/:id', (req, res) => {
    const tareaId = parseInt(req.params.id);
    const tarea = tareas.find((t) => t.id === tareaId);
  
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
  
    res.json(tarea);
  });

  //  crear una nueva tarea
app.post('/tareas', (req, res) => {
    const nuevaTarea = req.body;
    nuevaTarea.id = Date.now(); 
    res.status(201).json(nuevaTarea);
  });
  
  // actualizar una tarea por su ID
  app.put('/tareas/:id', (req, res) => {
    const tareaId = parseInt(req.params.id);
    const tareaActualizada = req.body;
  
    const tareaIndex = tareas.findIndex((t) => t.id === tareaId);
  
    if (tareaIndex === -1) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
  
    tareas[tareaIndex] = { ...tareas[tareaIndex], ...tareaActualizada };
    res.json(tareas[tareaIndex]);
  });
  
  // eliminar una tarea por su ID
  app.delete('/tareas/:id', (req, res) => {
    const tareaId = parseInt(req.params.id);
  
    const tareaIndex = tareas.findIndex((t) => t.id === tareaId);
  
    if (tareaIndex === -1) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
  
    tareas.splice(tareaIndex, 1);
    res.status(204).send();
  });
  


app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`);
});

app.use(express.json());

app.use(middlewares.validateMethodsHTTP);

const listViewRouter = require("./Llist-view-router");

app.use("/list", listViewRouter);

const listEditRouter = require("./list-edit-router");

app.use("/edit", listEditRouter);