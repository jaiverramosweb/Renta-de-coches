import { Button } from "@/components/ui/button";
import { ModalAddReservationProps } from "./ModalAddReservation.type";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Car } from "@prisma/client";
import { CalendarSelector } from "./CalendarSelector";
import { useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

export function ModalAddReservation({ car }: ModalAddReservationProps) {

    const [dateSelected, setDateSelected] = useState<{
        from: Date | undefined,
        to: Date | undefined
    }>({
        from: new Date(),
        to: addDays(new Date(), 5)
    })

    const onReserveCar = async( dateSelected: DateRange) => {
        const res = await axios.post("/api/checkout", {
            carId: car.id,
            priceDay: car.priceDay,
            startDay: dateSelected.from,
            endDay: dateSelected.to,
            carName: car.name
        })
        
        window.location = res.data.url
        toast({
            title: "Carro reservado"
        })
    }

  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant={"outline"} className="w-full mt-3">Reservar coche</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Selecciona las fechas en las que quieres alquilar el coche</AlertDialogTitle>
                <AlertDialogDescription>
                    <CalendarSelector setDataSelected={setDateSelected} carPriceDay={car.priceDay} />
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => onReserveCar(dateSelected)}>Reservar ahora</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}
