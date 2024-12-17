import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
// import {SaveForm} from "../../../../wailsjs/go/main/app.js"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useItemsContext } from "@/app/items/ItemsContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddItemFormProps {
  setIsOpen: (state:boolean)=> void
}

const formSchema = z.object({
  name: z.string()
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .refine(value => value.trim() !== "", { message: "O campo nome é obrigatório." }),
  description: z.string()
    .optional(),
  quantity: z.number({
      invalid_type_error: "O estoque deve ser um número."
    })
    .min(0, { message: "O estoque deve ser zero ou um número positivo." }), // Permite 0 ou números positivos
  type: z.enum(["materia-prima", "produto"], { 
    invalid_type_error: "O tipo deve ser 'Materia-prima' ou 'produto'."
  })
});

export type formType = z.infer<typeof formSchema>

export function AddItemForm({setIsOpen}:AddItemFormProps) {

  const { items, setNewItems } = useItemsContext();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: '',
      quantity: 0,
      type: 'materia-prima'
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
   setNewItems(values)
   const newItems = [...items, {id:1, ...values}]
   try {
    // const response = SaveForm(newItems);
    console.log(newItems); // Mostra a resposta do back-end
  } catch (err) {
    console.error('Erro ao enviar o formulário:', err);
  }
    setIsOpen(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Nome */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite a descrição do item"
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
                  placeholder="Digite o estoque disponível"
                  {...field}
                  // Aqui garantimos que o valor será um número
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <FormControl>
                <Select {...field}  onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione entre matéria-prima e produto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="materia-prima">Matéria-prima</SelectItem>
                    <SelectItem value="produto">Produto</SelectItem>
                  </SelectContent>
                </Select>
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

