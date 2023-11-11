const express = require("express");
const app = express();


const PORT = 3000;

const tareas = [
    {id: 1, description: 'Aprender a programar', completed: false},
    {id: 2, description: 'Hacer el almuerzo', completed: false},
    {id: 3, description: 'Lavar la loza', completed: true},
];

app.get ("/tareas", (req, res) =>{
    res.json(tareas);
});

app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`);
});

app.use(express.json());

const listViewRouter = require("./Llist-view-router");

app.use("/list", listViewRouter);

const listEditRouter = require("./list-edit-router");

app.use("/edit", listEditRouter);