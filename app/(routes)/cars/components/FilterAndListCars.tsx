"use client"
import { useEffect, useState } from "react"
import { Car } from "@prisma/client"
import ListCars from "./ListCars"
import FilterCars from "./FilterCars"

type Props = {
    cars: Car[]
}

export default function FilterAndListCars({ cars }: Props) {

    const [filterCars, setFilterCars] = useState<Car[]>()
    const [filters, setFilters] = useState({
        type: "",
        transmission: "",
        engine: "",
        people: ""
    })

    useEffect(() => {
      let filtered = cars

      if(filters.type){
        filtered = filtered.filter(car => car.type.toLowerCase().includes(filters.type.toLowerCase()))
      }

      if(filters.transmission){
        filtered = filtered.filter(car => car.transmission.toLowerCase().includes(filters.transmission.toLowerCase()))
      }

      if(filters.engine){
        filtered = filtered.filter(car => car.engine.toLowerCase().includes(filters.engine.toLowerCase()))
      }

      if(filters.people){
        filtered = filtered.filter(car => car.people.toLowerCase().includes(filters.people.toLowerCase()))
      }

      setFilterCars(filtered)

    }, [filters, cars])

    const handleFilterChange = ( filterName: string, filterValue: string ) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: filterValue
        }))
    }
    
    const clearFilters = () => {
        setFilters({
            type: "",
            transmission: "",
            engine: "",
            people: ""
        })
    }

  return (
    <div>
        <FilterCars clearFilter={clearFilters} filters={filters} setFilters={handleFilterChange} />
        <ListCars cars={filterCars}/>
    </div>
  )
}
