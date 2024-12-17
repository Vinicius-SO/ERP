import { ordersColumns } from "./columns";
import { OrdersTable } from "./OrderTable";
import { useOrderContext } from "@/context/OrdersContext";


export function Orders(){
  const {orders} = useOrderContext()
  return(
      <div className="flex flex-col w-4/5 items-center ">
      <h2 className="w-6/12 my-10 text-3xl text-zinc-800 font-semibold">Pedidos</h2>
      <OrdersTable columns={ordersColumns} data={orders}/>
  </div>
   )
}