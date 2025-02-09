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

router.get('/fecha_venta/:fecha_venta', async(req,res)=>{
    const { fecha_venta } = req.params
    try{
        const tickets = await prisma.ticket.findMany({
            where:{fecha_venta: new Date(fecha_venta)}
        })

        if(!tickets.length){
            return res.status(404).json({mensaje: 'No hay tickets de esa fecha'})
        }

        res.json({mensaje: `Ticket según Fecha de venta: ${fecha_venta}`,tickets})
    }catch(error){
        res.status(500).json({mensaje: 'Error al obtener los tickets',error})
    }
})

//crear ticket:
router.post('/', async (req,res)=>{
    const id_comprador = req.body.id_comprador
    const nombre_kiosco = req.body.nombre_kiosco
    const domicilio = req.body.domicilio
    const forma_pago = req.body.forma_pago
    const total = req.body.total
    if(!id_comprador || !forma_pago || !nombre_kiosco || !domicilio || !total){
        return res.status(400).json({mensaje: 'Faltan datos para completar el ticket'})
    }

    const formas_de_pago = ['Tarjeta de Crédito', 'Tarjeta de Débito', 'Transferencia']
    if(!formas_de_pago.includes(forma_pago)){
        return res.status(400).json({mensaje: 'Medio de pago no valido'})
    }

    try{
        const comprador = await prisma.usuario.findUnique({
            where:{id:id_comprador}
        })
        if(!comprador){return res.status(404).json({mensaje:'No se encontro el comprador'})}
        const ticket= await prisma.ticket.create({
            data:{                
                nombre_kiosco: nombre_kiosco,
                Domicilio: domicilio, 
                id_comprador: id_comprador,
                fecha_venta: new Date(),
                forma_pago: forma_pago,
                total: total
            }
        })
        res.status(201).json({mensaje:'Ticket creado exitosamente, verifique los datos de compra',ticket})
    }catch(error){
        res.status(500).json({mensaje:'Error al generar el ticket',error})
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

router.delete('/:id',async (req,res)=> {
    try {
      const ticket_eliminado = await prisma.ticket.findUnique({
        where: {
          id: parseInt(req.params.id)
        }
      })
      if (ticket_eliminado === null) {
        return res.sendStatus(404).json({mensaje: 'Ticket no encontrado'})
      }
      await prisma.ticket.delete({
        where: {
          id: parseInt(req.params.id)
        }
      })
      res.send(ticket_eliminado)
    } catch (error) {
      res.status(500).json({mensaje: 'Error al eliminar el ticket',error})
    }
  })

module.exports = router