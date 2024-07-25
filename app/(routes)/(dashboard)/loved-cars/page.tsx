import { auth } from "@clerk/nextjs/server";
import ListLovedCars from "./components/ListLovedCars";
import { redirect } from "next/navigation";

export default function loveCarsPage() {
    const { userId } = auth()

    if(!userId) return redirect("/")

  return (
    <div>
        <h1 className="text-2xl">coches que te gustan</h1>
        <ListLovedCars />
    </div>
  )
}
