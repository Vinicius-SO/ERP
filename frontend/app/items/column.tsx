import { ItemsType } from "@/types/items"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<ItemsType>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
]
