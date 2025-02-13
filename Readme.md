# Kiosco Backend

## Requirements

- Docker
- node

## Setup

```sh
npm install
npx prisma migrate dev
npm install cors
```

## Start

### Local

```sh
npm run dev
```

### Production

```sh
npm run start
```

## Descripcion

Este proyecto fue desarrollado en grupo como parte de la materia "Introducción al Desarrollo de Software". Consiste en una página de un kiosco que implementa todo lo aprendido en la materia, incluyendo frontend, backend y base de datos.

La idea principal fue crear un sitio web en donde puedas comprar distintos productos según categorias, en donde puedes revisar tu cuenta para ver tus compras hechas, ya que luego de cada compra, se genera un ticket con los datos de esta.

### Tecnologías Utilizadas

- **Frontend**: HTML, CSS y JavaScript.
- **Backend**: JavaScript, Express y Prisma
- **Base de Datos**: PostgreSQL, Prisma y DBeaver (este ultimo utilizado para las pruebas)

***

#### Repositorio a Git-Hub

- **[Repositorio](https://github.com/dguerreroh04/kiosco_tp.git)**

---

## Explicacion de cada parte de la pagina

### Pre-Inicio
Al entrar a la pagina, se permite crear una cuenta o iniciar sesión si ya tenes una.
Para la creación de la cuenta se necesitan los siguientes datos:
- **Nombre**
- **Edad**
- **Direccion de correo electrónico**
- **Número de telefono**
- **Documento**
- **Contraseña**

Una vez que se accede a la cuenta, se redirige al Inicio...

## Inicio
Aqui se permite visualizar las distintas categorias con sus respectivos productos.
Se puede agregar un producto al carrito, editarlo o añadir un nuevo producto al stock.
Al agregar un producto al carrito, este se mostrara en la pestaña del mismo, en donde podemos ir viendo que se fue seleccionando para posteriormente avanzar a la compra.

## Compra
Una vez que se terminaron de seleccionar los productos, se debe elegir el metodo de pago (Débito, Crédito o Transferencia).
Si la operacion fue exitosa, se mostrara en el resumen de la cuenta del usuario, el ticket correspondiente, figurando la Fecha, el monto total y los productos comprados.

## Resumen de cuenta
En esta sección se pueden ver los datos del usuario junto a los tickets de sus compras.
Ademas se da la opción de modificar los datos de la cuenta si se quiere e incluso eliminar la cuenta.