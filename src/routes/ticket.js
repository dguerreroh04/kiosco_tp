const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({ mensaje: 'Lista de Tickets' });
  })

router.get('/:id', (req,res)=> {
    const { id } = req.params 
    res.json({mensaje: 'Ticket según ID: ${id}' })
  })

router.get('/fecha_venta/:fecha_venta',(req,res)=>{
    const { fecha_venta } = req.params
    res.json({mensaje: 'Ticket según Fecha de venta: ${fecha_venta}'})
})

//crear ticket:
router.post('/',(req,res)=>{
    const { comprador, lista_prod, forma_pago } = req.body

    if(!comprador || !lista_prod || !forma_pago){
        return res.status(400).json({mensaje: 'Faltan datos para completar el ticket'})
    }

    const fecha_venta = new Date().toISOString().split('T')[0]; 

    const formas_de_pago = ['Crédito', 'Débito', 'Transferencia']
    if(!formas_de_pago.includes(forma_pago)){
        return res.status(400).json({mensaje: 'Medio de pago no valido'})
    }

    const total = null 
    res.status(201).json({mensaje: 'Ticket creado exitosamente,verifique los datos de la compra',ticket:{comprador, fecha_venta, lista_prod , forma_pago, total}})
})

module.exports = router