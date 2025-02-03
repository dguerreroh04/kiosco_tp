-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio_unidad" DECIMAL(65,30) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "nacional" BOOLEAN NOT NULL,
    "categoria" TEXT NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Productos_seleccionados" (
    "id" SERIAL NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "id_comprador" INTEGER NOT NULL,

    CONSTRAINT "Productos_seleccionados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "contrasenia" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "mail" TEXT NOT NULL,
    "nro_tel" INTEGER NOT NULL,
    "dni" INTEGER NOT NULL,
    "es_empleado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "nombre_kiosco" TEXT NOT NULL,
    "Domicilio" TEXT NOT NULL,
    "id_comprador" INTEGER NOT NULL,
    "fecha_venta" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "forma_pago" TEXT NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Producto_nombre_key" ON "Producto"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nombre_key" ON "Usuario"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_contrasenia_key" ON "Usuario"("contrasenia");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_mail_key" ON "Usuario"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nro_tel_key" ON "Usuario"("nro_tel");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_dni_key" ON "Usuario"("dni");

-- AddForeignKey
ALTER TABLE "Productos_seleccionados" ADD CONSTRAINT "Productos_seleccionados_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productos_seleccionados" ADD CONSTRAINT "Productos_seleccionados_id_comprador_fkey" FOREIGN KEY ("id_comprador") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_id_comprador_fkey" FOREIGN KEY ("id_comprador") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
