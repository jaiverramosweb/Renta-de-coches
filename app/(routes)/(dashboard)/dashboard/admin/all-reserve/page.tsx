import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import TableReservesAll from "./components/TableReservesAll";


export default async function ReserverAllPage() {
  const { userId } = auth()
  const user = currentUser()

    if(!userId || !user) return redirect("/")

  const orders = await db.order.findMany({
    orderBy: {
        createdAt: "desc"
    }
})
  return (
    <div>
      <h1 className="mb-4 text-3xl">Todas las reservas</h1>
        { orders.length === 0 
            ? (
                <div className="flex flex-col justify-center gap-4 items-center">
                    <h2 className="text-2xl">No tienes ninguna reserva</h2>
                    <p>Haz tus reservas a través de la página de coches</p>
                    <Link href={"/cars"}>
                        <Button>
                            Lista de coches
                        </Button>
                    </Link>
                </div>
            )
            : (
                <div>
                    <TableReservesAll orders={orders} />
                </div>
            )
        }
    </div>
  )
}
