import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputSelect } from './inputPreseted'; // Componente InputSelect
import { useItemsContext } from '@/app/items/ItemsContext';
import { AddProdutoMateriaPrimaByName } from '@/wailsjs/wailsjs/go/main/App';

interface FormProps {
  setIsOpen: (state: boolean) => void;
}

// Esquema de validação com Zod
const formSchema = z.object({
  Product: z.string().nonempty('O campo Produto é obrigatório'), // Campo obrigatório
  items: z.string().nonempty('O campo Item é obrigatório'),     // Campo obrigatório
  quantity: z
    .number({ invalid_type_error: 'A quantidade deve ser um número' })
    .min(0, 'A quantidade deve ser maior ou igual a 0'),          // Valor mínimo
});

// Tipos derivados do esquema Zod
type FormValues = z.infer<typeof formSchema>;

export const Form = ({ setIsOpen }: FormProps) => {
  const { items } = useItemsContext();

  const itensNames: string[] = [];
  const productsNames: string[] = [];

  // Filtra os itens do tipo "produto"
  const filteredList = items.filter((item) => item.type === 'produto');
  filteredList.forEach((item) => {
    productsNames.push(item.name);
  });

  // Adiciona todos os itens
  items.forEach((item) => {
    itensNames.push(item.name);
  });

  // React Hook Form com Zod Resolver
  const { handleSubmit, control, register, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  // Lógica de envio
  const onSubmit = (data: FormValues) => {
    console.log('Valores enviados:', data);
    setIsOpen(false);
    AddProdutoMateriaPrimaByName(data.Product, data.items, data.quantity)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 m-auto">
      <div>
        {/* Campo 1: Seleção de Produtos */}
        <div className='my-5'>
          <label htmlFor="Product" className="block mb-1 text-sm font-medium">
            Produto
          </label>
          <Controller
            name="Product"
            control={control}
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
              <InputSelect
                options={productsNames}
                placeholder="Digite o nome do produto ..."
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.Product && <p className="text-red-500 text-sm">{errors.Product.message}</p>}
        </div>

        {/* Campo 2: Seleção de Itens */}
        <div className='mb-5'>
          <label htmlFor="items" className="block mb-1 text-sm font-medium">
            Item
          </label>
          <Controller
            name="items"
            control={control}
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
              <InputSelect
                options={itensNames}
                placeholder="Digite o nome do item ..."
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.items && <p className="text-red-500 text-sm">{errors.items.message}</p>}
        </div>

        {/* Campo 3: Quantidade (Input Numérico) */}
        <div className='mb-5'>
          <label htmlFor="quantity" className="block mb-1 text-sm font-medium">
            Quantidade
          </label>
          <input
            type="number"
            id="quantity"
            {...register('quantity', { valueAsNumber: true })} // Usando React Hook Form para controle
            min={1}
            className="w-10/12 p-2 border rounded"
            placeholder="Digite a quantidade"
          />
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
        </div>
      </div>

      {/* Botão de envio */}
      <div className="w-full flex justify-center mr-8 mt-7">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-gray-900 rounded hover:bg-gray-700"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};
