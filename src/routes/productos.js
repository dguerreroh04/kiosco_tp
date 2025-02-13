const { PrismaClient } = require('@prisma/client')
const express = require('express')
const router = express.Router()
const prisma = new PrismaClient()

//para obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await prisma.producto.findMany()
    res.status(200).json(productos)
  } catch (error) {
    res.status(500).json({mensaje: 'Error al obtener los productos',error})
  }
})

//para obtener un producto segun su id
router.get('/:id', async (req,res)=> {
  try {
    const producto = await prisma.producto.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })
    if (!producto){
      return res.status(404).json({mensaje: 'Producto no encontrado' })
    }
    res.status(200).json(producto)
  } catch (error) {
    console.log(error)
    res.status(500).json({mensaje: 'Error al obtener el producto',error})
  }
})

//para eliminar un producto (por id)
router.delete('/:id',async (req,res)=> {
  try {
    const producto_eliminado = await prisma.producto.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })
    if (producto_eliminado === null) {
      return res.sendStatus(404).json({mensaje: 'Producto no encontrado'})
    }
    await prisma.producto.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })
    res.status(200).json({mensaje: 'Producto borrado'}, producto_eliminado)
  } catch (error) {
    console.log(error)
    res.status(500).json({mensaje: 'Error al eliminar el producto',error})
  }
})

function comprobar_tipos_datos(nombre, descripcion, nacional, categoria, imagen) {
  let tipos_correctos = 0
  if (typeof nombre === "string" || nombre == null) {
    tipos_correctos++
  }
  if (typeof descripcion === "string" || descripcion == null) {
    tipos_correctos++
  }
  if (typeof categoria === "string" || categoria == null) {
    tipos_correctos++
  }
  if (typeof imagen === "string" || imagen == null) {
    tipos_correctos++
  }
  if (typeof Boolean(nacional) === "boolean" || nacional == null) {
    tipos_correctos++
  }
  if (tipos_correctos !== 5) {
    return false
  }
  return true
}

function validar_url_imagen(url_imagen) {
  const formato_esperado = /^(https|http):\/\/.+(jpg|png)/
  if (formato_esperado.test(url_imagen) === false) {
    return false
  }
  return true
}

router.post('/', async (req, res) => {
  const nombre = req.body.nombre
  const precio_unidad = Number(req.body.precio)
  const descripcion = req.body.descripcion
  const nacional = Boolean(req.body.nacional)
  const categoria = req.body.categoria
  const imagen = req.body.imagen
  if (!nombre || !precio_unidad || !descripcion || nacional === undefined || !categoria || !imagen) {
    return res.status(400).json({mensaje: 'Todos los campos son obligatorios y deben ser correctos'})
  }
  if (comprobar_tipos_datos(nombre, descripcion, nacional, categoria, imagen) === false) {
    return res.status(400).json({mensaje: 'Los tipos de datos son erroneos'})
  }
  const nombre_buscado = await prisma.producto.findUnique({
    where: {
      nombre: nombre
    }
  })
  if (nombre_buscado) {
    return res.status(400).json({mensaje: 'Ya existe un producto con ese nombre'})
  }
  if (validar_url_imagen(imagen) === false) {
    return res.status(400).json({mensaje: 'La url ingresada no es valida, pruebe con otra'})
  }
  const producto = await prisma.producto.create({
    data: {
      nombre: nombre,
      precio_unidad: precio_unidad,
      descripcion: descripcion,
      nacional: nacional,
      categoria: categoria,
      imagen: imagen
    }
  })
  res.status(201).json({mensaje: 'Producto creado'})
})

router.put('/:id', async (req,res)=> {
  let producto = await prisma.producto.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  if (!producto) {
    return res.status(404).json({mensaje: 'Producto no encontrado' })
  }
  const datos_actualizados = {}
  const nombre = req.body.nombre
  const precio_unidad = Number(req.body.precio)
  const descripcion = req.body.descripcion
  const nacional = req.body.nacional
  const categoria = req.body.categoria
  const imagen = req.body.imagen
  const formato_no_deseado = /\s+/
  if (comprobar_tipos_datos(nombre, descripcion, nacional, categoria, imagen) === false) {
    return res.status(400).json({mensaje: 'Los tipos de datos son erroneos'})
  }
  if (nombre) {
    if (nombre.length < 3) {return res.status(400).json({ mensaje: 'Nombre demasiado corto' })}
    if (formato_no_deseado.test(nombre) === true) {
      return res.status(400).json({ mensaje: 'No puede haber 2 o mas espacios seguidos' })
    }
    if (nombre !== producto.nombre) {
      const nombre_usado = await prisma.producto.findUnique({ where: { nombre } })
      if (nombre_usado) {
        return res.status(400).json({ mensaje: 'Nombre no disponible, por favor elija otro' })
      }
    }
    datos_actualizados.nombre = nombre;
  }
  if (precio_unidad) {
    datos_actualizados.precio_unidad = precio_unidad
  }
  if (descripcion) {
    if (formato_no_deseado.test(descripcion) === true) {
      return res.status(400).json({ mensaje: 'No puede haber 2 o mas espacios seguidos' })
    }
    datos_actualizados.descripcion = descripcion
  }
  if (nacional) {
    datos_actualizados.nacional = Boolean(nacional)
  }
  if (categoria) {
    datos_actualizados.categoria = categoria
  }
  if (imagen) {
    if (validar_url_imagen(imagen) === false) {
      return res.status(400).json({mensaje: 'La url ingresada no es valida, pruebe con otra'})
    }
    datos_actualizados.imagen = imagen
  }
  producto = await prisma.producto.update({
    where: {
      id: producto.id
    },
    data: datos_actualizados
  })
  res.status(201).json({mensaje: 'Producto modificado'})
})

module.exports = router