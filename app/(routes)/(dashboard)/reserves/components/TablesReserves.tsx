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

export default function TablesReserves({ orders }: Props) {

    const totalAmount = orders.reduce((acc, booking) => {
        return acc + parseFloat(booking.totalAmount)
    }, 0)

  return (
    <Table>
        <TableCaption>Una lista de sus reservas recientes.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>Coche</TableHead>
            <TableHead>Fecha inicio</TableHead>
            <TableHead>Fecha fin</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Precio</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            { orders.map(order => (
                <TableRow key={order.id}>
                    <TableCell className="font-medium">{ order.carName }</TableCell>
                    <TableCell>{ order.orderDate.toLocaleDateString() }</TableCell>
                    <TableCell>{ order.orderEndDate.toLocaleDateString() }</TableCell>
                    <TableCell>
                        <div className="p-2 text-white bg-green-600 rounded-lg w-fit">
                            { order.status == "confirmed" && "Confirmado" }
                        </div>
                    </TableCell>
                    <TableCell className="text-right">{ formatPrice(Number(order.totalAmount)) }</TableCell>
                </TableRow>
            )) }
        </TableBody>
        <TableFooter>
            <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-right">{ formatPrice(totalAmount) }</TableCell>
            </TableRow>
        </TableFooter>
    </Table>
  )
}
