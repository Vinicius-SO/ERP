import { useForm, Controller } from 'react-hook-form';
import { InputSelect } from './inputPreseted'; // Componente InputSelect
import { useItemsContext } from '@/app/items/ItemsContext';

interface FormProps {
  setIsOpen: (state:boolean)=> void
}


export const Form = ({setIsOpen}:FormProps) => {
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

  // React Hook Form
  const { handleSubmit, control, register } = useForm();

  // Lógica de envio
  const onSubmit = (data: any) => {
    console.log('Valores enviados:', data);
    setIsOpen(false)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 m-auto">
      <div>
        {/* Campo 1: Seleção de Produtos */}
        <div>
          <label htmlFor="campo1" className="block mb-1 text-sm font-medium">
            Produto
          </label>
          <Controller
            name="campo1"
            control={control}
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
              <InputSelect
                options={productsNames}
                placeholder='Digite o nome do produto ...'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </div>
        {/* Campo 2: Seleção de Itens */}
        <div>
          <label htmlFor="campo2" className="block mb-1 text-sm font-medium">
            Item
          </label>
          <Controller
            name="campo2"
            control={control}
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
              <InputSelect
                options={itensNames}
                placeholder='Digite o nome do item ...'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </div>
        {/* Campo 3: Quantidade (Input Numérico) */}
        <div>
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
        </div>
      </div>

      {/* Botão de envio */}
      <div className='w-full flex justify-end mr-8 mt-7'>
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
