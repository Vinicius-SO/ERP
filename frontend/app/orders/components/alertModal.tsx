import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { insufficientType } from "./AddOrder";

export interface ModalProps {
  setIsOpen: (state:boolean)=> void
  isAlertOpenProp: boolean
  insuficients: insufficientType[]
}

export const AlertModal = ({ isAlertOpenProp, insuficients, setIsOpen}: ModalProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false); // Controle do diálogo

  useEffect(()=>{
    setIsAlertOpen(isAlertOpenProp)
  },[isAlertOpenProp])



  function handleClose() {
    setIsAlertOpen(false)
    setIsOpen(false)
  }

  return (
    <Dialog open={isAlertOpen} onOpenChange={()=>{}}>
      <DialogContent className="[&>button]:hidden">
        <DialogHeader>
          <DialogTitle>Itens faltantes ao pedido</DialogTitle>
          <DialogDescription>Abaixo estão os itens que faltam para a quantidade do pedido </DialogDescription>
          <main className="mx-8 pt-3">
            <div className="w-full">
              <ul className="list-disc">
                {
                  insuficients.map((item)=>{
                    return(
                      <div key={item.name} className="text-red-500 flex justify-between"><li>{item.name}</li> <div>{item.missing}</div></div>
                    )
                  })
                }
              </ul>
            </div>
          </main>
        </DialogHeader>
        <footer className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded-md"
            onClick={handleClose}
          >
            Fechar
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
};
