import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import TablesReserves from "./components/TablesReserves";

export default async function ReservePage() {

    const { userId } = auth()

    if(!userId) return redirect("/")

        const orders = await db.order.findMany({
            where: {
                userId: userId
            }, 
            orderBy: {
                createdAt: "desc"
            }
        })

  return (
    <div>
        <h1 className="mb-4 text-3xl">Reservas</h1>
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
                    <TablesReserves orders={orders} />
                </div>
            )
        }
    </div>
  )
}
