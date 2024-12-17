'use client'
import { Items } from './items/items';
import { columns } from './items/column';

import { OrderContextProvider } from '@/context/OrdersContext'
import { ItemsContextProvider } from '@/app/items/ItemsContext'
import { useState } from 'react';
import ProductsDefinition from './products/products';
import ProductsPage from './products/ProductsPage';

export default function HomePage() {
  const [page, setPage] = useState<'Order' | 'Products' | 'Items'>('Items')
  return(
    <OrderContextProvider>
      <ItemsContextProvider>
        <div className="min-h-full w-full bg-white flex mx-auto">
          {/* Menu Lateral */}
          <div className="w-1/5 h-[100vh] border-r-2 border-gray-300 flex flex-col items-center justify-center gap-5">
          <button
              onClick={() => setPage("Items")}
              className={`font-semibold text-xl ${
                page === "Items" ? "text-cyan-500" : "text-gray-500"
              }`}
            >
              Itens
            </button>
            <button
              onClick={() => setPage("Products")}
              className={`font-semibold text-xl ${
                page === "Products" ? "text-cyan-500" : "text-gray-500"
              }`}
            >
              Produtos
            </button>
            <button
              onClick={() => setPage("Order")}
              className={`font-semibold text-xl ${
                page === "Order" ? "text-cyan-500 text-" : "text-gray-500"
              }`}
            >
              {/* Pedido */}
            </button>
          </div>
          {/* Conteúdo da Página */}
          <div className="w-4/5 h-[100vh] flex flex-col items-center">
            {page === "Order" ? (
              <div className="my-auto">Componente para Entregas</div>
            ) : page === "Products" ? (
              <ProductsPage />
            ) : (
              <Items columns={columns} />
            )}
            {/* <Products columns={columns} /> */}
          </div>
        </div>
      </ItemsContextProvider>
    </OrderContextProvider>
  )
  return;
}