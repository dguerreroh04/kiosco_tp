const { PrismaClient } = require('@prisma/client')
const express = require('express')
const usuarios = require('./routes/usuarios')
const app = express()
const port = 3000

app.use(express.json())

const prisma = new PrismaClient()

app.get('/',(req, res) =>{
    res.send('Kiosco')
})

app.use('/api/v1/usuarios',usuarios) 


app.listen(port, () => {
    console.log(`Kiosco app listening on port ${port}`);
});
