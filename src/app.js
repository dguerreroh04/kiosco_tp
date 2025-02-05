const { PrismaClient } = require('@prisma/client')
const express = require('express')
const productos_seleccionados = require('./routes/productos_seleccionados')
const app = express()
const port = 3000

app.use(express.json())

const prisma = new PrismaClient()

app.get('/',(req, res) =>{
    res.send('Kiosco')
})

app.use('/api/v1/productos_seleccionados',productos_seleccionados) 

app.listen(port, () => {
    console.log(`Kiosco app listening on port ${port}`);
});
