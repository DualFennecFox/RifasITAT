import Link from "next/link";
import Image from "next/image";
import PathLinks from "./PathLinks";
export default function Header() {

    return (
        <div className="bg-blue-500 flex flex-row max-h-20 text-white justify-between text-lg select-none">
            <div className="flex flex-row justify-start p-5 px-10 gap-20 relative items-center text-nowrap">
                <Link href="/">
                    <div className="flex flex-row gap-1">
                        <Image src="/vercel.svg" height={300} width={20} alt="Logo" />
                        <h1 className="font-bold text-xl">Rifas ITAT</h1>
                    </div>
                </Link>
                <PathLinks />

            </div>
            <div className="flex flex-row justify-start p-5 px-10 gap-20 relative items-center text-nowrap">
                <p className="select-text">Diseñado por Gustavo Pérez</p>
            </div>

            {/*<div className="flex flex-row justify-end p-5 px-10 gap-20 relative items-center  text-nowrap">
                <div className="flex flex-row gap-5">
                    <Link href="/signup" >
                        <div className="flex justify-center rounded-md bg-white px-5 py-1.5 text-xl/10 font-semibold text-blue-500 shadow-xs hover:bg-blue-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none">
                            Registrarse
                        </div>
                    </Link>
                    <Link href="/signin">
                        <div className="flex justify-center rounded-md px-5 py-1.5 text-xl/10 font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none">
                            Iniciar sesión
                        </div>
                    </Link>
                </div> 
                /*<Link href="/account">   
                    <div className="flex flex-row gap-3">
                        Cuenta
                        <Image src="/account.svg" height={300} width={25} alt="Usuario" />
                    </div>
                </Link>

            </div>*/}
        </div>
    )
}