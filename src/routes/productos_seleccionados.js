const { PrismaClient } = require('@prisma/client')
const express = require('express')
const router = express.Router()
const prisma = new PrismaClient()

//para obtener todos los productos selecionados
router.get('/', async (req, res) => {
    try{
        const productos_seleccionados = await prisma.productoSeleccionado.findmany()
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
        const productoSeleccionado = await prisma.productoSeleccionado.findUnique({
            where:{id_comprador_id_producto:{id_comprador: Number(id_comprador), id_producto: Number(id_producto)}}
        })

        if(!productoSeleccionado){
            return res.status(404).json({mensaje:'No se encontro el producto'})
        }

        const producto_actualizado = await prisma.productoSeleccionado.update({
            where: {id_comprador_id_producto:{id_comprador: Number(id_comprador), id_producto: Number(id_producto)}},
            data:{cantidad}
        })
        res.json({mensaje:'Se actualizo el producto',producto: producto_actualizado})
    }catch(error){
        res.status(500).json({mensaje:'Error al obtener la informacion',error})
    }
})

module.exports = router