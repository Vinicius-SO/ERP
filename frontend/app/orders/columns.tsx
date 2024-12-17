import { Order } from "@/types/order"
import { ColumnDef } from "@tanstack/react-table"


export const ordersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "item",
    header: "Item",
  },
  {
    accessorKey: "numeroPedido",
    header: "Numero do Pedido",
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
  },
  {
    accessorKey: "deliveryDate",
    header: "Data De entrega",
  },
]
