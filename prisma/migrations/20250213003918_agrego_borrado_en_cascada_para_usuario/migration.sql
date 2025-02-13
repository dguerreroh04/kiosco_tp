-- DropForeignKey
ALTER TABLE "Productos_seleccionados" DROP CONSTRAINT "Productos_seleccionados_id_comprador_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_id_comprador_fkey";

-- AddForeignKey
ALTER TABLE "Productos_seleccionados" ADD CONSTRAINT "Productos_seleccionados_id_comprador_fkey" FOREIGN KEY ("id_comprador") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_id_comprador_fkey" FOREIGN KEY ("id_comprador") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
