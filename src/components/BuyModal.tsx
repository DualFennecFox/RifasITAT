import { useCallback, useRef, useState } from "react";
import FileDropzone from "./FileDropzone";
import SvgClose from "./SvgClose";
import Form from "next/form";
import RoulettePage from "./RoulettePage";

export default function BuyModal({ toggleModal, dollar, available }: {
    toggleModal: () => void,
    dollar: number | undefined,
    available: number | undefined
}) {
    const [file, setFile] = useState<File | null>(null);
    const [showRoulette, setShowRoulette] = useState(false)
    const [winningNumbers, setWinningNumbers] = useState<number[]>([])
    const [totalNumbers, setTotalNumbers] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    const min = 1; const max = 10;

    const rouletteCallback = useCallback(() => {
        setShowRoulette(false)
        toggleModal()
    }, [toggleModal])

    function formDataToString(formData: FormData) {
        const entries = formData.entries();
        let str = '';

        for (const entry of entries) {
            str += `${entry[0]}: ${entry[1]}\n`;
        }

        return str;
    }
    const formSend = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement);
        formData.append("number", "0");
        formData.append("accountid", "1")
        formData.append("raffleid", "1")
        if (file == null) return
        formData.append("file", file)
        
        setIsSubmitting(true)
        setTimeout(async () => {
            setIsSubmitting(false)
        }, 10000);
        console.log(formDataToString(formData))
        const res = await fetch(`/api/number?numamount=${totalNumbers}`, {
            method: "POST",
            body: formData
        })
        formRef.current?.reset()
        const data = await res.json()

        console.log(data)
        const numbers: number[] = []
        data.forEach((data: { number: number }) => {
            numbers.push(data.number)
        });
        setWinningNumbers(numbers)
        setShowRoulette(!showRoulette)

    }, [file, showRoulette, totalNumbers])

    const onSelectChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(available)
        let num = parseInt(event.target.value)
        num = num <= 0 ? num * -1 : num
        num = num >= max ? max : num
        num = num <= min ? min : num
        if (available != null) num = num > available ? available : num
        setTotalNumbers(isNaN(num) ? 0 : num)

    }, [available])

    const increment = useCallback(() => {
        let num = totalNumbers + 1 <= max ? totalNumbers + 1 >= min ? totalNumbers + 1 : min : max
        if (available != null) num = num > available ? available : num
        setTotalNumbers(num)
    }, [totalNumbers, available])

    const decrease = useCallback(() => {
        let num = totalNumbers - 1 >= min ? totalNumbers - 1 : min
        if (available != null) num = num > available ? available : num
        setTotalNumbers(num)
    }, [totalNumbers, available])

    return (
        <div className="size-full fixed inset-0 bg-black bg-opacity-50 flex flex-row items-center justify-center">

            {showRoulette ? <RoulettePage winningNumbers={winningNumbers} setWinningNumbers={setWinningNumbers} rouletteCallback={rouletteCallback} /> : <div className="bg-gray-700 rounded-2xl">

                <button className="relative w-full" onClick={toggleModal}>
                    <div className="w-[40] h-[40] absolute top-0 right-5 flex items-center justify-center bg-gray-800 hover:bg-gray-600 rounded-lg">
                        <div className="relative h-full w-full">
                            <SvgClose className="w-full h-full fill-white hover:fill-blue-400 p-1" />
                        </div>
                    </div>
                </button>
                <div>
                    <div className="w-full flex imtes-center justify-center">
                        <h2 className="text-center text-2xl/9 font-bold text-white">Compra tus números</h2>
                    </div>
                    <div className="flex min-h-full w-full flex-row justify-center">
                        <div className="w-1/2 pl-10 flex flex-col items-center justify-center gap-2">
                            <div className="p-0.5 text-lg flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#D68A4E] from-40% to-[#FAE6A9]">
                                <div className="flex flex-col text-nowrap gap-1 rounded-2xl bg-black p-5">
                                    <h1
                                        className="text-center text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#D68A4E] from-40% to-[#FAE6A9]">
                                        Pago Móvil
                                    </h1>
                                    <p>Teléfono: 0424-1184252</p>
                                    <p>Cédula: 1030898</p>
                                    <p>Banco de Venezuela</p>
                                    <p>Total a pagar: <span className="font-bold bg-red-800 p-1 rounded-lg">
                                        {(((dollar ?? 0) * 2) * totalNumbers).toFixed(2)}Bs = {totalNumbers * 2}$
                                    </span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-1">
                                <button onClick={decrease} className="bg-red-600 px-5 rounded-xl flex items-center justify-center text-nowrap">
                                    <h1 className="text-2xl">-</h1>
                                </button>
                                <input onChange={onSelectChange} min={min} max={max} type="number" placeholder="Números a comprar" value={totalNumbers} name="email" className="appearance-none block text-center w-10 rounded-md bg-black text-2xl text-white placeholder:text-gray-500 focus:outline-100 focus:outline -outline-offset-10 outline-none focus:outline-gray-300" />
                                <button onClick={increment} className="bg-green-600 px-3.5 rounded-xl flex items-center justify-center text-nowrap">
                                    <h1 className="text-2xl">+</h1>
                                </button>
                            </div>
                            <p className="my-3 text-center text-mg/6 text-gray-400">
                                Precios a tasa actual en dólar paralelo<br /> 1$ = {dollar}Bs
                            </p>
                        </div>
                        <div className="w-full px-10 pt-0  mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                            <Form ref={formRef} className="space-y-4" action="#" formMethod="POST" onSubmit={formSend}>
                                <div className="mt-2">
                                    <input type="text" placeholder="Cédula de identidad" name="cid" required className="block w-full rounded-md bg-black px-3 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-100 focus:outline -outline-offset-5 outline-none  focus:outline-gray-300" />
                                </div>

                                <div className="mt-2">
                                    <input type="text" placeholder="Nombre y Apellido" name="fullname" required className="block w-full rounded-md bg-black px-3 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-100 focus:outline -outline-offset-10 outline-none  focus:outline-gray-300 " />
                                </div>
                                <div className="mt-2">
                                    <input type="text" placeholder="Telefono" name="tlf" required className="block w-full rounded-md bg-black px-3 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-100 focus:outline -outline-offset-10 outline-none  focus:outline-gray-300" />
                                </div>
                                <div className="mt-2">
                                    <input type="email" placeholder="Correo electrónico" name="email" required className="block w-full rounded-md bg-black px-3 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-100 focus:outline -outline-offset-10 outline-none  focus:outline-gray-300" />
                                </div>
                                <div className="mt-2">
                                    <input type="text" placeholder="Código de referencia" name="refcode" required className="block w-full rounded-md bg-black px-3 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-100 focus:outline -outline-offset-10 outline-none  focus:outline-gray-300" />
                                </div>
                                <div className="mt-2">
                                    <FileDropzone setFile={setFile} />
                                </div>
                                <button type="submit" disabled={isSubmitting} className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2.5 text-sm/6 text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-5 focus-visible:outline-offset-2 focus-visible:outline-gray-300">Comprar&ensp;<span className="font-bold">{totalNumbers}</span>&ensp;{totalNumbers > 1 ? "números" : "número"}</button>
                            </Form>
                        </div>
                    </div>
                    <p className="my-3 text-center text-mg/6 text-gray-400">
                        Recuerda utilizar tu correo para<br />recibir y comprar números
                    </p>
                </div>
            </div>
            }
        </div>
    )
}