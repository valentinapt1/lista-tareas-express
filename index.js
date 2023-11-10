const express = require("express");
const app = express();

const PORT = 3000;


const tareas = [
    { id:123456, isCompleted: false, description: "Walk the dog",}
];

app.get("/",(resq, res) => {
    res.send({nombre: "lista"})
})

app.get("/tareas", (req, res) => {
    res.json(tareas);
});

app.listen(PORT, ()=> {
    console.log(`servidor escuchando en http://localhost:${PORT}`)
})