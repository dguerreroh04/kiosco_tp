const { PrismaClient } = require('@prisma/client')
const express = require('express')
const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try{
    const usuarios = await prisma.usuario.findMany()
    res.json(usuarios)
  }catch (error){
    res.status(500).json({mensaje: 'Error al obtener los usuarios',error})
    }
})

router.get('/:id', async (req,res)=> {
  const id_usuario = Number(req.params.id)
  try{
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: id_usuario
      }
    })
    if(!usuario){
      return res.status(404).json({mensaje: 'Usuario no encontrado' })
    }
    res.json(usuario)
  }catch (error){
    console.log(error)
    res.status(500).json({mensaje: 'Error al obtener el usuario',error})
  }
})

router.get('/nombre/:nombre', async (req,res)=> {
    const { nombre } = req.params 
    try{
        const usuario = await prisma.usuario.findUnique({
        where: {nombre}
      })
      if(!usuario){
        return res.status(404).json({mensaje: 'Usuario no encontrado' })
        }
      res.json(usuario)
    }catch (error){
      res.status(500).json({mensaje: 'Error al obtener el usuario',error})
    }
  })

router.delete('/:id', async (req,res)=> {
    const {id} = req.params 
    try{
        await prisma.usuario.delete({
        where: {id:Number(id)}
      })
      res.json({mensaje:`Usuario con ID: ${id} ha sido eliminado`})
    }catch (error){
      res.status(500).json({mensaje: 'Error al eleminar usuario',error})
    }
  })


//creacion de usuario:
router.post('/', async (req,res) =>{
  const nombre = req.body.nombre
  const edad = parseInt(req.body.edad)
  const mail = req.body.mail
  const nro_tel = parseInt(req.body.nro_tel)
  const dni = parseInt(req.body.dni)
  const contrasenia = req.body.contrasenia
  const direc_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const numero_telefono = /^\d{8}$/ // Numero valido de 8 digitos
  try {
    if(!nombre||!edad||!mail||!nro_tel||!dni||!contrasenia){
      return res.status(400).json({mensaje: 'Todos los campos son obligatorios'})
    }
    if(nombre.length < 3){
      return res.status(400).json({mensaje: 'Nombre demasiado corto'})
    }
    if(edad <= 17){
      return res.status(400).json({mensaje: 'Se debe tener al menos 18 años'})
    }
    if(!direc_email.test(mail)){
      return res.status(400).json({mensaje: 'Ingrese una dirección de correo electronico valida'})
    }
    if(!numero_telefono.test(nro_tel)){
      return res.status(400).json({mensaje: 'Ingrese un número de telefono válido de 8 digitos'})
    }
    if(dni < 1000000 || dni > 99999999){
     return res.status(400).json({mensaje: 'Ingrese un DNI valido'})
    }
    const nombre_usado = await prisma.usuario.findUnique({
      where: {nombre}
    })
    if(nombre_usado){return res.status(400).json({mensaje: 'Nombre no disponible, por favor elija otro'})}
  
    const usuario = await prisma.usuario.create({
      data: {
        nombre: nombre,
        edad: edad,
        mail: mail,
        nro_tel: nro_tel,
        dni: dni, 
        contrasenia: contrasenia
      }
    })
    res.status(201).json({mensaje: 'Usuario creado exitosamente, por favor verifique sus datos', id: usuario.id})
  } catch (error) {
    
  }
  
  
})


//modificar datos de usuario:
router.put('/:id',async (req,res) =>{
  const id = req.params.id
  const nombre = req.body.nombre
  const edad = parseInt(req.body.edad)
  const mail = req.body.mail
  const nro_tel = parseInt(req.body.nro_tel)
  const dni = parseInt(req.body.dni)
  const contrasenia = req.body.contrasenia
  try{
    const usuario = await prisma.usuario.findUnique({ where: {id: Number(id)} })

    if(!usuario){return res.status(404).json({mensaje: 'Usuario no encontrado' })}

    const datos_actualizados = {}

    if (nombre) {
      if (nombre.length < 3) {return res.status(400).json({ mensaje: 'Nombre demasiado corto' })}

      if (nombre !== usuario.nombre) {
        const nombre_usado = await prisma.usuario.findUnique({ where: { nombre } })
        if (nombre_usado) {
          return res.status(400).json({ mensaje: 'Nombre no disponible, por favor elija otro' })
        }
      }
      datos_actualizados.nombre = nombre;
    }

    if(edad){
      if(edad <= 17){
        return res.status(400).json({mensaje: 'Se debe tener al menos 18 años'})
      }
      datos_actualizados.edad = edad
    }

    if(mail){
      const direc_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if(!direc_email.test(mail)){
        return res.status(400).json({mensaje: 'Ingrese un correo electronico válido'})
      }
      datos_actualizados.mail = mail
    }

    if(nro_tel){
      const numero_telefono = /^\d{10,14}$/
      if(!numero_telefono.test(nro_tel)){
        return res.status(400).json({mensaje: 'Ingrese un número de telefono válido entre 10-14 digitos'})
      }
      datos_actualizados.nro_tel = nro_tel
    }

    if(dni){
      if(dni < 1000000 || dni > 99999999){
        return res.status(400).json({mensaje: 'Ingrese un dni válido'})
      }
      datos_actualizados.dni = dni
    }

    const usuario_modificado = await prisma.usuario.update({where: {id: Number(id)}, data: datos_actualizados})

    res.json({mensaje:'Los datos se han modificado'})
  }catch(error){
    res.status(500).json({mensaje: 'Error al modificar el usuario',error})
  }
});

router.post('/login', async (req, res) => {
    const { password1 : password, username1 : username } = req.body;

    if (!password || !username) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    try {
        const usuario = await prisma.usuario.findUnique({
          where: { mail : username }
        });

        if (!usuario) {
          return res.status(404).json({ mensaje: 'Correo electrónico no encontrado' });
        }

        if (usuario.contrasenia !== password) {
          return res.status(404).json({ mensaje: 'Contraseña incorrecta' });
        }

        res.json({ mensaje: 'Inicio de sesión exitoso', id: usuario.id });
    } catch (error) { 
        console.log(error)
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
    }
});

module.exports = router;