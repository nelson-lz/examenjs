const express = require('express');

const app = express();
//settings
app.set('port', 4000);

//MIDDLEWARES
app.use(express.json());

//RECURSOS
app.get('/', (req, res) => {
    res.json({
        message: "Aqui se consulto algo"
    })
});
app.get('/:id', (req, res) => {
    res.json({
        message:"leyendo un recurso jeje"
    })
});
app.post('/', (req, res) => {
    res.json(req.body);
});
app.delete('/:id',(req, res) => {
    res.json({
        message:'Eliminando recurso',
        id_recurso:req.params.id
    })
});







app.listen(app.get('port'), ()=> {
    console.log("server on port ", app.get('port'));
});