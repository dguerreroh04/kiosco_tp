const { PrismaClient } = require('@prisma/client')
const express = require('express')
const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    try{
        const tickets = await prisma.ticket.findMany()
        res.json(tickets)
    }catch(error){
        res.status(500).json({mensaje: 'Error al obtener todos los tickets',error})
    }
})

router.get('/:id',async (req,res)=> {
    const { id } = req.params 
    try{
        const ticket = await prisma.ticket.findUnique({
            where: {id:Number(id)}
        })
        if(!ticket){
            return res.status(404).json({mensaje: 'No se encontro el ticket'})
        }
        res.json(ticket)
    }catch(error){
        res.status(500).json({mensaje: 'Error al obtener el ticket',error})
    }
  })

res.json({mensaje: `Ticket según Fecha de venta: ${fecha_venta}`})
router.get('/fecha_venta/:fecha_venta', async(req,res)=>{
    const { fecha_venta } = req.params
    try{
        const tickets = await prisma.ticket.findMany({
            where:{fecha_venta: new Date(fecha_venta)}
        })
        if(tickets.length){return res.status(404).json({mensaje: 'No hay tickets de esa fecha'})}
        res.json(tickets)
    }catch(error){
        res.status(505).json({mensaje: 'Error al obtener los tickets',error})
    }
})

//crear ticket:
router.post('/', async (req,res)=>{
    const { id_comprador, lista_prod, forma_pago } = req.body

    if(!id_comprador || !lista_prod || !forma_pago){
        return res.status(400).json({mensaje: 'Faltan datos para completar el ticket'})
    }

    const formas_de_pago = ['Crédito', 'Débito', 'Transferencia']
    if(!formas_de_pago.includes(forma_pago)){
        return res.status(400).json({mensaje: 'Medio de pago no valido'})
    }

    try{
        const comprador = await prisma.usuario.findUnique({
            where:{id:id_comprador}
        })
        if(!comprador){return res.status(404).json({mensaje:'No se encontro el comprador'})}

        let total = 0
        for(const{id_producto,cantidad} of lista_prod){
            const producto = await prisma.producto.findUnique({
                where: {id:id_producto}
            })
            if(!producto){return res.status(404).json({mensaje:'No se encontro el producto'})}
            total += Number(producto.precio_unidad) * cantidad
        }
        const ticket= await prisma.ticket.create({
            data:{                
                nombre_kiosco: 'Kiosco Informatico',
                Domicilio: 'Paseo Colon 850', 
                id_comprador,
                fecha_venta: new Date(),
                forma_pago,
                total
            }
        })
        res.status(201).json({mensaje:'Ticket creado exitosamente, verifique los datos de compra',ticket})
    }catch(error){
        res.staus(505).json({mensaje:'Error al generar el ticket',error})
    }
})

//modificar ticket
router.put('/:id',async(res,req)=>{
    const {id} = req.params
    const {forma_pago} = req.body

    if(!forma_pago){
        return res.status(400).json({mensaje:'Ingrese un metodo de pago'})
    }
    const formas_de_pago = ['Crédito', 'Débito', 'Transferencia']
    if(!formas_de_pago.includes(forma_pago)){
        return res.status(400).json({mensaje:'Ingrese un metodo de pago valido'})
    }

    try{
        const ticket = await prisma.ticket.findUnique({where: {id:Number(id)}})
        if(!ticket){
            return res.status(404).json({mensaje:'No se encontro el ticket'})
        }
        const ticket_modificado = await prisma.ticket.update({where: {id: Number(id)}, data: {forma_pago}})
        res.json({mensaje: 'El ticket se ha modifiado',ticket: ticket_modificado})
    }catch(error){
        res.status(500).json({ mensaje: 'Error al modificar el ticket', error });
    }
})

module.exports = router