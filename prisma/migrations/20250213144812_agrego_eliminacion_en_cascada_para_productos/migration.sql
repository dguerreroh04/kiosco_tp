-- DropForeignKey
ALTER TABLE "Productos_seleccionados" DROP CONSTRAINT "Productos_seleccionados_id_producto_fkey";

-- AddForeignKey
ALTER TABLE "Productos_seleccionados" ADD CONSTRAINT "Productos_seleccionados_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
