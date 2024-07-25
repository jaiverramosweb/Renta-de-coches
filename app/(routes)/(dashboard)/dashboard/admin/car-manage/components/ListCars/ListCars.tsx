import { CardCar } from "./CardCar";
import { listCarProps } from "./ListCars.type";

export function ListCars({ cars }: listCarProps) {
  return (
    <div className="grid grid-cols-2 gap-6 my-4 lg:grid-cols-4">
        { cars.map((car) => (
            <CardCar key={car.id} car={car}/>
        )) }
    </div>
  )
}
