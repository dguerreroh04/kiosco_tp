const { PrismaClient } = require('@prisma/client')
const express = require('express')
var cors = require('cors')
const usuarios = require('./routes/usuarios')
const productos_seleccionados = require('./routes/productos_seleccionados')
const ticket = require('./routes/ticket')
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient()

app.get('/',(req, res) =>{
    res.send('Kiosco')
})

app.use('/api/v1/usuarios',usuarios) 
app.use('/api/v1/productos_seleccionados',productos_seleccionados)
app.use('/api/v1/ticket',ticket) 

app.listen(port, () => {
    console.log(`Kiosco app listening on port ${port}`);
});
