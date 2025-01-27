const express = require('express')
const productos = require('./routes/productos')
const usuarios = require('./routes/usuarios')
const app = express()
const port = 3000

app.use(express.json())

app.get('/',(req, res) =>{
    res.send('Kiosco')
})

app.use('/api/v1/productos',productos)

app.use('/api/v1/usuarios',usuarios) 

app.listen(port, () => {
    console.log(`Kiosco app listening on port ${port}`);
});
