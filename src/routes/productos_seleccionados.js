const { PrismaClient } = require('@prisma/client')
const express = require('express')
const router = express.Router()
const prisma = new PrismaClient()

//para obtener todos los productos selecionados
router.get('/', async (req, res) => {
    try{
        const productos_seleccionados = await prisma.productos_seleccionados.findMany({
            include: {
                producto: true,
                comprador: true
            }
        });
        res.json(productos_seleccionados)
    }catch(error){
        res.status(500).json({mensaje:'Error al obtener los productos seleccionados',error})
    }
})


//actualizar con id_comprador e id_producto
router.put('/:id_comprador/:id_producto', async (req,res)=> {
    const {id_comprador,id_producto} = req.params
    const {cantidad} = req.body

    if(!cantidad || cantidad <= 0){
        return res.status(400).json({mensaje:'Ingrese una cantidad mayor a cero'})
    }

    try{
        const productoSeleccionado = await prisma.productos_seleccionados.findUnique({
            where:{id_comprador_id_producto:{id_comprador: Number(id_comprador), id_producto: Number(id_producto)}}
        })

        if(!productoSeleccionado){
            return res.status(404).json({mensaje:'No se encontro el producto'})
        }
        const producto_actualizado = await prisma.productos_seleccionados.update({
            where: {id_comprador_id_producto:{id_comprador: Number(id_comprador), id_producto: Number(id_producto)}},
            data:{cantidad}
        })
        res.json({mensaje:'Se actualizo el producto',producto: producto_actualizado})
    }catch(error){
        res.status(500).json({mensaje:'Error al obtener la informacion',error})
    }
})

router.post('/', async (req, res) => {
    try{
        const id_usuario = Number(req.body.id_usuario)
        const id_producto = Number(req.body.id_producto)
        const cantidad = Number(req.body.cantidad)
        if (!id_producto || !id_usuario || !cantidad) {
            return res.status(400).json({mensaje:'Todos los campos son obligatorios'})
        }
        if(cantidad <= 0){
            return res.status(400).json({mensaje:'Ingrese una cantidad mayor a cero'})
        }
        const comprador = await prisma.usuario.findUnique({
            where: {
                id: id_usuario
            }
        })
        if (!comprador) {
            return res.status(404).json({mensaje:'No se encontro el usuario, pruebe con otro id'})
        }
        const producto = await prisma.producto.findUnique({
            where: {
                id: id_producto
            }
        })
        if (!producto) {
            return res.status(404).json({mensaje:'No se encontro el producto, pruebe con otro id'})
        }
        const producto_repetido = await prisma.productos_seleccionados.findFirst({
            where: {
                id_comprador: id_usuario,
                id_producto: id_producto
            }
        })
        if (producto_repetido) {
            return res.status(400).json({mensaje:'El usuario ya tiene ese producto'})
        }
        const producto_seleccionado = await prisma.productos_seleccionados.create({
            data: {
                id_comprador: id_usuario,
                id_producto: id_producto,
                cantidad: cantidad
            }
        })
        res.json(producto_seleccionado)
    }catch(error){
        res.status(500).json({mensaje:'Error al obtener los productos seleccionados',error})
    }
})

router.delete('/:id_comprador/:id_producto',async (req,res)=> {
    try {
        const producto_eliminado = await prisma.productos_seleccionados.findUnique({
            where: {
                id_comprador: parseInt(req.params.id_comprador),
                id_producto: parseInt(req.params.id_producto)
            }
        })
        if (!producto_eliminado) {
            return res.sendStatus(404).json({mensaje: 'Producto no encontrado'})
        }
        await prisma.productos_seleccionados.delete({
            where: {
                id_comprador: parseInt(req.params.id_comprador),
                id_producto: parseInt(req.params.id_producto)
            }
        })
        res.send(producto_eliminado)
    } catch (error) {
        res.status(500).json({mensaje: 'Error al eliminar el producto',error})
    }
})

router.delete('/:id_comprador',async (req,res)=> {
    try {
        const productos_eliminados = await prisma.productos_seleccionados.findMany({
            where: {
                id_comprador: parseInt(req.params.id_comprador)
            }
        })
        if (!productos_eliminados) {
            return res.sendStatus(404).json({mensaje: 'No hay productos seleccionados'})
        }
        await prisma.productos_seleccionados.delete({
            where: {
                id_comprador: parseInt(req.params.id_comprador)
            }
        })
        res.send(productos_eliminados)
    } catch (error) {
        res.status(500).json({mensaje: 'Error al eliminar los productos',error})
    }
})
module.exports = router