"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonEditCarProps } from "./ButtonEditCar.type";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { FormEditCar } from "./FormEditCar";


export function ButtonEditCar({ carData }: ButtonEditCarProps) {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <Dialog open={openDialog}>
      <DialogTrigger asChild>
            <Button variant={"outline"} onClick={() => setOpenDialog(true)}>
                Editar
                <Pencil className="ml-2 w-4 h-4" />
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogDescription>
                    <FormEditCar setOpenDialog={setOpenDialog} carData={carData} />
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}
