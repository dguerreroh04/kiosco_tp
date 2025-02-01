const { PrismaClient } = require('@prisma/client')
const express = require('express')
const router = express.Router()
const prisma = new PrismaClient()

//para obtener todos los productos
router.get('/', async (req, res) => {
  const productos = await prisma.producto.findMany()
  res.json(productos)
})

//para obtener un producto segun su id
router.get('/:id', async (req,res)=> {
  const {id} = req.params 
  res.json({mensaje: 'Producto segun ID: ${id}' })
})

//para eliminar un producto (por id)
router.delete('/:id',(req,res)=> {
  const {id} = req.params 
  res.json({mensaje: 'Producto con ID: ${id} ha sido retirado del stock' })
})

router.post('/', async (req, res) => {
  const producto = await prisma.producto.create({
    data: {
      nombre: req.body.nombre,
      precio_unidad: req.body.precio,
      descripcion: req.body.descripcion,
      nacional: req.body.nacional,
      categoria: req.body.categoria
    }
  })
  res.status(201).send(producto)
})

//para modificar precio
router.patch('/:id',(req,res)=> {
  const {id} = req.params
  const {precio} = req.body

  if(!precio) return res.status(400).json({mensaje: 'Se necesita el precio'})

  res.json({mensaje: 'Producto con ID: ${id} ha cambiado su precio a ${precio}' })
})

module.exports = router