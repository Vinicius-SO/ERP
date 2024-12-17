'use client'
import { ItemsTable } from "../items/components/table"
import { ColumnDef } from "@tanstack/react-table";
import { ItemsType } from "@/types/items";
import { useItemsContext } from "./ItemsContext";

interface ProductTableProps{
  columns: ColumnDef<ItemsType>[]
}

// const items:ItemsType[] = [
//   {
//     name:'sla',
//     quantity: 3,
//     type: 'materia-prima',
//     description: ''
//   }
// ]

export const Items = ({columns}:ProductTableProps) => {
  const {items} = useItemsContext()

  return(
    <div className="flex flex-col w-full items-center ">
      <h2 className="w-6/12 my-10 text-3xl text-zinc-800 font-semibold"> Itens</h2>
      <ItemsTable columns={columns} data={items}/>
    </div>
  )
}