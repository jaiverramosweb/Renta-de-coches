"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"

import { FormEditCarProps } from "./ButtonEditCar.type";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { formSchema } from "../../FormAddCar/FormAddCar.form"; 
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { CardCar } from "./CardCar";

export function FormEditCar({ setOpenDialog, carData }: FormEditCarProps) {

    const [photoUploaded, setPhotoUploaded] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: carData.name,
          cv: carData.cv,
          transmission: carData.transmission,
          people: carData.people,
          engine: carData.engine,
          photo: carData.photo,
          priceDay: carData.priceDay,
          type:  carData.type,
          isPublish: carData.isPublish ? carData.isPublish : false
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)

        try {
            await axios.patch(`/api/car/${carData.id}/form`, values).then(({data}) => {
                console.log(data)
                toast({
                    title: "Coche editado con exito"
                })
                router.refresh();
            })
            
        } catch (error) {
            toast({
                title: "A ocurrido un error",
                variant: "destructive"
            })
        }

        setOpenDialog(false)
    }

    const { isValid } = form.formState
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 lg: grid-cols-2">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                        <Input placeholder="Tesla Modelo S Plaid" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="cv"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Poder</FormLabel>
                    <FormControl>
                        <Input placeholder="150 caballos de fuerza" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="transmission"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Transmisión</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione el tipo de coche" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="manuel">Manual</SelectItem>
                            <SelectItem value="automatico">Automático</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="people"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Personas</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione de cuantas personas" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="7">7</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="engine"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Motor</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione el tipo de motor" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="gasoil">Gasolina</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                            <SelectItem value="electric">Eléctrico</SelectItem>
                            <SelectItem value="hybrid">Híbrido</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione el tipo de coche" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="sedan">Sedán</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                            <SelectItem value="coupe">Coupé</SelectItem>
                            <SelectItem value="family">Familiar</SelectItem>
                            <SelectItem value="luxe">De luxe</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Imagen de coche</FormLabel>
                    <FormControl>
                        { photoUploaded ? <p className="text-sm">Foto Subida</p> : (
                            <UploadButton 
                                className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-2" 
                                {...field} 
                                endpoint="photo"
                                onClientUploadComplete={(res)=>{
                                    form.setValue("photo", res?.[0].url)
                                    setPhotoUploaded(true)
                                }}
                                onUploadError={(error: Error) => {console.log(error)}}
                            />
                        ) }

                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="priceDay"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Precio por día</FormLabel>
                    <FormControl>
                        <Input placeholder="20$" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

        </div>
        <Button className="w-full mt-5" type="submit" disabled={!isValid}>Editar coche</Button>
      </form>
    </Form>
  )
}
