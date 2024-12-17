import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
// import {} from "../../../../wailsjs/go/main/app.js"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { verifyStock } from "@/hooks/useStock.js";
// import { useItemsContext } from "@/context/ItemsContext.js";
import { useState } from "react";
import { AlertModal } from "./alertModal";
// import { useOrderContext } from "@/context/OrdersContext.tsx";

export interface insufficientType {
  name: string;
  missing: number;
}

interface AddItemFormProps {
  setIsOpen: (state:boolean)=> void
}

const formSchema = z.object({
  item: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  numeroPedido: z
    .string({ invalid_type_error: "O fator de uso deve ser um número." }),
  quantity: z
    .string({ invalid_type_error: "O estoque deve ser um número." }),
  deliveryDate: z
  .string({ invalid_type_error: "O estoque deve ser um número." })
  .min(2,{
    message: "O nome deve ter pelo menos 8 caracteres.",
  })
});


export type orderFormType = z.infer<typeof formSchema>




export function AddOrder({setIsOpen}:AddItemFormProps) {
  // const {items} = useItemsContext()
  // const {setNewOrders} = useOrderContext()
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  // const [status, setStatus] = useState(false);
  const [insuficientes, setInsuficientes] = useState<insufficientType[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item: "",
      numeroPedido: '0',
      quantity: '0',
      deliveryDate:''
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    console.log(values)

    // if(values.item.toLowerCase() == 'pb180'){
    //   const results = verifyStock(items, values.quantity)
    //   setStatus(results.status)
    //   setIsAlertOpen(!results.status)
    //   setInsuficientes(results.insuficientes)
    //   console.log(results.status,results.insuficientes)
    //   setIsOpen(!results.status) 
    // }
    // console.log(status, insuficientes)
    // setNewOrders(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <AlertModal setIsOpen={setIsOpen} isAlertOpenProp={isAlertOpen} insuficients={insuficientes?insuficientes:[]}/>
        {/* Nome */}
        <FormField
          control={form.control}
          name="item"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome do item" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Fator de Uso */}
        <FormField
          control={form.control}
          name="numeroPedido"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero do Pedido</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Digite o numero do pedido"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Estoque */}
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Digite a quantidade solicitada"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Status */}
        <FormField
          control={form.control}
          name="deliveryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Entrega</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Digite a quantidade solicitada"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}

