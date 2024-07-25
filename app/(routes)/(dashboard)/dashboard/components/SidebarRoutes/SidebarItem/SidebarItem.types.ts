import { LucideIcon } from "lucide-react"

export type SIdebarItemProps = {
    item: {
        label: string,
        icon: LucideIcon,
        href: string
    }
    key: string
}