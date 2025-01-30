const express = require('express')
const router = express.Router()

//para obtener todos los usuarios
router.get('/', (req, res) => {
    res.json({ mensaje: 'Lista de Usuarios' });
  })

//para obtener un usuario segun su id
router.get('/:id', (req,res)=> {
    const { id } = req.params 
    res.json({mensaje: 'Usuario según ID: ${id}' })
  })

//para obtener un usuario segun su nombre
router.get('/nombre/:nombre', (req,res)=> {
    const { nombre } = req.params 
    res.json({mensaje: 'Usuario según Nombre: ${nombre}' })
  })

//para eliminar un usuario (por id)
router.delete('/:id',(req,res)=> {
    const {id} = req.params 
    res.json({mensaje: 'Usuario con ID: ${id} ha sido eliminado' })
  })


//creacion de usuario:
router.post('/',(req,res) =>{
  const { nombre, edad, mail, nro_telefono, dni } = req.body
  const direc_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const numero_telefono = /^\d{10,14}$/; // Numero valido entre 10 a 14 digitos

  
  if(!nombre||!edad||!mail||!nro_telefono||!dni){
    return res.status(400).json({mensaje: 'Todos los campos son obligatorios'})
  }

  if(edad <= 17){
    return res.status(400).json({mensaje: 'Se debe tener al menos 18 años'})
  }

  if(!direc_email.test(mail)){
    return res.status(400).json({mensaje: 'Ingrese una dirección de correo electronico valida'})
  }

  if(!numero_telefono(nro_telefono)){
    return res.status(400).json({mensaje: 'Ingrese un número de telefono válido entre 10-14 digitos'})
  }
  
  if(dni < 1000000 || dni > 99999999){
   return res.status(400).json({mensaje: 'Ingrese un DNI valido'})
  }

  res.status(201).json({mensaje: 'Usuario creado exitosamente, porfavor verifique sus datos',datos:{nombre, edad, mail, nro_telefono, dni}})

})

  module.exports = router
