const express = require("express");
const app = express();
const middlewares = require('./middlewares');
const jsonwebtoken = require('jsonwebtoken');

require('dotenv'),config();


const PORT = 3000;

const tareas = [
    {id: 1, description: 'Aprender a programar', completed: false},
    {id: 2, description: 'Hacer el almuerzo', completed: false},
    {id: 3, description: 'Lavar la loza', completed: true},
];

const secretKey = process.env.JWT_SECRET;
//ruta de autenticacion y generacion del token
app.post('/login', (req, res) => {
    const {description, completed} = req.body;
    const user = tareas.find(u => u.description === description && u.completed === completed);

    if (!user) {
        return res.status(401).json({error: 'no validas'});
    }

    const token = jsonwebtoken.sign({ id: user.id}, secretKey);
    res.json({token});
});

//middleware verificar el token jwt
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(403).json({error: 'Token no proporcionado'});
    }
   jsonwebtoken.verify(token, secretKey, (err, decoded) => {
    if (err){
        return res.status(401).json({error: 'token invalido'});
    }
    req.useId = decoded.id;
    next();
   }); 
};

//ruta protegida
app.get('/protected', verifyToken, (req, res) => {
    res.json({message: 'ruta protegida accede correctamente'});
});

//formatio json
app.get ("/tareas", (req, res) =>{
    res.json(tareas);
});

app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`);
});

app.use(express.json());

//middlewares para validar HTTP
app.use(middlewares.validateMethodsHTTP);

app.get("/metodos-HTTP", (req, res) => {
    res.status(404).send("no se encontro")
});

const listViewRouter = require("./Llist-view-router");

app.use("/list", listViewRouter);

const listEditRouter = require("./list-edit-router");
const { config } = require("dotenv");

app.use("/edit", listEditRouter);