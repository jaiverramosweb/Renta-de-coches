import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash } from "lucide-react"


type Props = {
    setFilters: (filterName: string, filerValue: string) => void
    clearFilter: () => void
    filters: {
        type: string,
        transmission: string,
        engine: string,
        people: string
    }
}

export default function FilterCars({ setFilters, clearFilter, filters }: Props) {

    const handleFilter = (filter: string, value: string) => {
        setFilters(filter, value)
    }

  return (
    <div className="mt-5 mb-8 flex flex-col gap-1 md:gap-5 space-y-2 md:flex-row md:space-y-0">
        <Select onValueChange={(value) => handleFilter("type", value)} value={filters.type}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de coche" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Tipo de coche</SelectLabel>
                    <SelectItem value="sedan">Sedán</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="coupe">Coupé</SelectItem>
                    <SelectItem value="family">Familiar</SelectItem>
                    <SelectItem value="luxe">De luxe</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleFilter("transmission", value)}  value={filters.transmission}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Cambio de marchas" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Cambio de marchas</SelectLabel>
                    <SelectItem value="manuel">Manual</SelectItem>
                    <SelectItem value="automatico">Automático</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleFilter("engine", value)}  value={filters.engine}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de motor" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Cantidad de motor</SelectLabel>
                    <SelectItem value="gasoil">Gasolina</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Eléctrico</SelectItem>
                    <SelectItem value="hybrid">Híbrido</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleFilter("people", value)}  value={filters.people}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Personas" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Personas</SelectLabel>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>

        <Button onClick={() => clearFilter()}>
            Limpiar filtros <Trash className="w-4 h-4 ml-2" />
        </Button>
    </div>
  )
}
