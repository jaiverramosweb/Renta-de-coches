import { Order } from "@prisma/client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { formatPrice } from "@/lib/formatPrice"

type Props = {
    orders: Order[]
}

export default function TableReservesAll({ orders }: Props) {

    const totalAmount = orders.reduce((acc, booking) => {
        return acc + parseFloat(booking.totalAmount)
    }, 0)

  return (
    <Table>
        <TableCaption>Una lista de sus reservas recientes.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>Fecha de orden</TableHead>
            <TableHead>Identificación del cliente</TableHead>
            <TableHead>Coche</TableHead>
            <TableHead>Fecha Inicio</TableHead>
            <TableHead>Fecha Fin</TableHead>
            <TableHead className="text-right">Precio</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            { orders.map(order => (
                <TableRow key={order.id}>
                    <TableCell className="font-medium">{ new Date(order.createdAt).toLocaleString('es-CO', {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    }) }</TableCell>
                    <TableCell className="font-medium max-w-[100px] truncate">{ order.userId }</TableCell>
                    <TableCell className="font-medium">{ order.carName }</TableCell>
                    <TableCell>{ order.orderDate.toLocaleString('es-CO', {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    }) }</TableCell>
                    <TableCell>{ order.orderEndDate.toLocaleString('es-CO', {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    }) }</TableCell>
                    <TableCell className="text-right">{ formatPrice(Number(order.totalAmount)) }</TableCell>
                </TableRow>
            )) }
        </TableBody>
        <TableFooter>
            <TableRow>
                <TableCell colSpan={5}>Total</TableCell>
                <TableCell className="text-right">{ formatPrice(totalAmount) }</TableCell>
            </TableRow>
        </TableFooter>
    </Table>
  )
}
