import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { toast } from "@/components/ui/use-toast"
import { Car } from "@prisma/client"

interface useLovedCarType {
    lovedItems: Car[],
    addLoveItem: ( data: Car ) => void,
    removeLoveItem: (id: string) => void
}

export const useLovedCar = create(
    persist<useLovedCarType>(
        
        (set, get) => ({
            lovedItems: [],

            addLoveItem: (data: Car) => {
                const currentLovedItems = get().lovedItems
                const existingItem = currentLovedItems.find(item => item.id === data.id)

                if(existingItem){
                    return toast({
                        title: "El coche ya existe en la lista"
                    })
                }

                set({
                    lovedItems: [...get().lovedItems, data]
                })

                toast({
                    title: "Coche añadido a la lista"
                })
            },

            removeLoveItem: (id: string) => {
                set({
                    lovedItems: [...get().lovedItems.filter(item => item.id !== id)]
                })

                toast({
                    title: "El coche se a eliminado de la lista"
                })
            }
        }),

        {
            name: "loved-products-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
)