import { Calendar, Car, Heart, NotepadTextDashed } from "lucide-react";

export const dataGeneralSidebar =[
    {
        icon: Car,
        label: "Coches",
        href: "/dashboard"
    },
    {
        icon: Calendar,
        label: "Coches reservados",
        href: "/reserves"
    },
    {
        icon: Heart,
        label: "Coches que me gustan",
        href: "/loved-cars"
    },
]

export const dataGeneralSidebarAdmin =[
    {
        icon: NotepadTextDashed,
        label: "Agregar coche",
        href: "/dashboard/admin/car-manage"
    },
    {
        icon: Calendar,
        label: "Todas las reservas",
        href: "/dashboard/admin/all-reserve"
    },
]