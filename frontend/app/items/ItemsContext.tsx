'use client';
import { formType } from "@/app/items/components/AddItemForm.js";
import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { ItemsType } from "@/types/items";
import { AddItem, GetItems } from "@/wailsjs/wailsjs/go/main/App";

// Define o tipo do contexto
type ItemsContextType = {
  items: ItemsType[];
  setNewItems: (form: formType) => void;
};

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

// Define o componente Provider
type ItemsContextProps = {
  children: ReactNode;
};

export const ItemsContextProvider: React.FC<ItemsContextProps> = ({ children }) => {
  const [items, setItems] = useState<ItemsType[]>([]);

  // Use o efeito para buscar os itens ao carregar o componente
  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Chame o método GetItems diretamente, como gerado pelo Wails
        const data: { [key: string]: any }[] = await GetItems();

        // Transforme os dados no formato de `ItemsType`
        const formattedData: ItemsType[] = data.map(item => ({
          name: item.name,
          description: item.description,
          quantity: item.quantity,
          type: item.type,
        }));

        setItems(formattedData);
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      }
    };

    fetchItems(); // Chame a função assíncrona
  }, []);

  // Função para adicionar novos itens ao estado
  const setNewItems = async  (value: formType) => {
   
    try {
      // Chama o backend para salvar o item
      const description = value.description || ""; // Garante que não será undefined
      const response = await AddItem(value.name, description, value.quantity, value.type);
  
      // Atualiza o estado apenas se o backend retornar sucesso
      setItems(prevItems => [...prevItems, { ...value}]); // ID pode vir do backend
      console.log(response)
    } catch (error) {
      console.error("Erro ao salvar item:", error);
    }
  };

  return (
    <ItemsContext.Provider value={{ items, setNewItems }}>
      {children}
    </ItemsContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useItemsContext = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItemsContext deve ser usado dentro de um ItemsContextProvider");
  }
  return context;
};
