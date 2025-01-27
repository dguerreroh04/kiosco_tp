const express = require('express')
const router = express.Router()

//para obtener todos los usuarios
router.get('/', (req, res) => {
    res.json({ mensaje: 'Lista de Usuarios' });
  })

//para obtener un usuario segun su id
router.get('/:id', (req,res)=> {
    const { id } = req.params 
    res.json({mensaje: 'Usuario segun ID: ${id}' })
  })

//para obtener un usuario segun su nombre
router.get('/nombre/:nombre', (req,res)=> {
    const { nombre } = req.params 
    res.json({mensaje: 'Usuario segun Nombre: ${nombre}' })
  })

//para eliminar un usuario (por id)
router.delete('/:id',(req,res)=> {
    const {id} = req.params 
    res.json({mensaje: 'Usuario con ID: ${id} ha sido eliminado' })
  })

  module.exports = router