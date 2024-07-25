"use client"

import { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    setDataSelected: React.Dispatch<React.SetStateAction<{from: Date | undefined; to: Date | undefined}>>
    carPriceDay: string
}

export function CalendarSelector({ setDataSelected, className, carPriceDay }: Props) {

    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 5)
    })

    useEffect(() => {
        setDataSelected({
            from: date?.from,
            to: date?.to
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])

    const calculateDaysBetoween = ( from: Date, to: Date ): number => {
        const oneDay = 24 * 60 * 60 * 1000
        const diffInTime = to.getTime() - from.getTime()
        return Math.round(diffInTime / oneDay)
    }

    const dayBetoween = date?.from && date?.to ? calculateDaysBetoween(date?.from, date?.to) : 0
    

  return (
    <>
        <div className={cn("grid gap-2", className)}>
            { date?.from && date?.to && (
                <>
                    <p className="mt-4 text-lg text-black">Días totales { dayBetoween }</p>
                    <p className="mb-4 text-md"> Precio total {dayBetoween * Number(carPriceDay)}$ (Imp. incluidos) </p>
                </>
            ) }
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(`text-left justify-start font-normal`, !date && "bg-muted-foreground")}
                    >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        { date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL, dd, y")} - {""}
                                    {format(date.to, "LLL, dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL, dd, y")
                            )
                        ) : (
                            <span>Elige una fecha</span>
                        )
                        }
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar 
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    </>
  )
}
