'use client'
import React, { createContext, useState, ReactNode, useContext } from "react";
import { Order } from "@/types/order.js";
import { orderFormType } from "@/app/orders/components/AddOrder.js";

// Define o tipo do contexto
type OrdersContextType = {
  orders: Order[];
  setNewOrders: (form:orderFormType)=>void;
};


const data:Array<Order> = [
 
] 

// Crie o contexto com um valor padrão
const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

// Define o componente Provider
type ProductContextProps = {
  children: ReactNode;
};



export const OrderContextProvider: React.FC<ProductContextProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([...data]);


  function setNewOrders (value:orderFormType){
    setOrders((prevItems: Order[]) => [...prevItems, value]);
  }
  return (
    <OrdersContext.Provider value={{ orders, setNewOrders}}>
      {children}
    </OrdersContext.Provider>
  );
};


export const useOrderContext = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useProductContext deve ser usado dentro de um MyProvider");
  }
  return context;
};


