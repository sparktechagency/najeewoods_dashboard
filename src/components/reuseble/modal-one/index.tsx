import {
  Dialog1,
  DialogContent1,
  DialogDescription1,
  DialogHeader1,
  DialogTitle1,
  DialogTrigger1,
} from "@/components/ui/dialog1";
import React from "react";

interface ModalProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  profile?: any;
}

export default function ModalOne({
  profile,
  open,
  setIsOpen,
  children,
}: ModalProps) {
  return (
    <Dialog1 open={open} onOpenChange={setIsOpen}>
      <DialogTrigger1 asChild />
      <DialogContent1
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="sm:max-w-md p-0 gap-0 bg-blacks rounded-2xl overflow-hidden border-none"
      >
        <DialogHeader1 className=" text-white p-4">
          <div className="flex items-center space-x-2">{profile}</div>
          <DialogTitle1
            className={"text-white hidden font-medium"}
          ></DialogTitle1>
        </DialogHeader1>
        <div className="p-4">{children}</div>
      </DialogContent1>
    </Dialog1>
  );
}
