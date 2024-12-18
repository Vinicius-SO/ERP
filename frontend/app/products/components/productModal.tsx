import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { useState } from "react";

export interface ModalProps {
  children: (props: { setIsOpen: (isOpen: boolean) => void }) => React.ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false); // Controle do diálogo

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="text-gray-600"
      >
        Adicionar ao produto
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar materia prima ao produto</DialogTitle>
          <DialogDescription>
            Adicione um novo item a um produto
          </DialogDescription>
          <main>
            {/* Passando o setIsOpen para os filhos */}
            {children({ setIsOpen })}
          </main>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
