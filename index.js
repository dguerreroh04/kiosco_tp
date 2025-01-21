const express = require('express')
const productosRouter = require('./productos')
const app = express()
const port = 3000


app.use(express.json())
app.use('/productos',productosRouter)

app.get('/', (req, res) => {
  res.send('Kiosco Backend')
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
//todavia nose si funciona          