import { Reveal } from "@/components/Shared/Reveal"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function DriveToday() {
  return (
    <div className="p-6 max-w-7xl lg:my-32 mx-auto">
        <div className="bg-[url('/images/background-2.jpg')] bg-center bg-no-repeat bg-cover rounded-xl p-6 lg:p-32 relative">
            <div className="lg:flex gap-x-6">
                <div>
                    <h3 className="text-white text-3xl">Conduce el coche de tus sueños hoy</h3>
                    <p className="text-white text-xl my-5">Regístrate y explora el mundo de los coches premium</p>
                    <Link href={"/sign-in"}>
                        <Button variant={"outline"} size={"lg"}>Regístrate ahora</Button>
                    </Link>
                </div>

                <Reveal className="lg:absolute lg:-right-32 top-5" position="bottom">
                    <Image 
                        src={"/images/audi-footer.png"} 
                        alt="Car Drive"
                        width={550}
                        height={250}
                    />
                </Reveal>
            </div>
        </div>
    </div>
  )
}
