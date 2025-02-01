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
router.get('/:id', (req,res)=> {
  const {id} = req.params 
  res.json({mensaje: 'Producto segun ID: ${id}' })
})

//para eliminar un producto (por id)
router.delete('/:id',(req,res)=> {
  const {id} = req.params 
  res.json({mensaje: 'Producto con ID: ${id} ha sido retirado del stock' })
})

//para modificar precio
router.patch('/:id',(req,res)=> {
  const {id} = req.params
  const {precio} = req.body

  if(!precio) return res.status(400).json({mensaje: 'Se necesita el precio'})

  res.json({mensaje: 'Producto con ID: ${id} ha cambiado su precio a ${precio}' })
})

module.exports = router