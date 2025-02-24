"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PathLinks() {
    const pathname = usePathname()

    return (
        <div className="flex flex-row gap-20 relative items-center">
            <Link href="/" style={{ color: pathname == "/" ? "cyan" : "white" }}>Inicio</Link>
            <Link href="/sorteo" style={{ color: pathname == "/sorteo" ? "cyan" : "white" }}>Gran sorteo</Link>
            <Link href="/about" style={{ color: pathname == "/about" ? "cyan" : "white" }}>Acerca de</Link>
        </div>
    );
}
