import { Car } from "@prisma/client"

export type listCarProps = {
    cars: Car[]
}

export type CarProps = {
    car: Car
}