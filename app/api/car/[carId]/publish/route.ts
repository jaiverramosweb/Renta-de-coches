import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: {params: {carId: string}}) {
    
    try {
        const { userId } = auth()
        const { carId } = params
        const { isPublish } = await req.json()

        if(!userId) new NextResponse("Unauthorized", { status: 401 })

            const car = await db.car.update({
                where: {
                    id: carId,
                },
                data: {
                    isPublish: isPublish
                }
            })
    
            return NextResponse.json(car)
        
    } catch (error) {
        console.log("[CAR PUBLISH ID]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}