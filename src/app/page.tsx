"use client"
import BuyModal from "@/components/BuyModal";
import Image from "next/image";
import { useEffect, useState } from "react";
import PercentageBar from "@/components/PercentageBar";

interface DollarJSON {
  fuente: string,
  nombre: string,
  compra: number,
  venta: number,
  promedio: number,
  fechaActualizacion: string
}

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dollar, setDollar] = useState<DollarJSON | null>(null)
  const [available, setAvailable] = useState<{ max: number, available: number } | null>(null)

  function toggleModal() {
    setIsModalOpen(!isModalOpen)
  }
  useEffect(() => {
    async function fetchDollar() {
      const res = await fetch("https://ve.dolarapi.com/v1/dolares/paralelo")
      const data = await res.json();
      setDollar(data)
    }
    fetchDollar();
  }, [])

  useEffect(() => {
    async function fetchAvailable() {
      const res = await fetch('http://143.198.244.32:8081/api/raffle/available?id=1')
      const data = await res.json();
      setAvailable(data)
    }
    fetchAvailable();
  }, [])

  return (
    <div className="self-center w-[1280] p-5 pb-0">
      <div className="flex flex-row items-center h-[600] w-full h-fill">
        <div className="w-1/2 flex justify-center items-center relative">
          <Image className="select-none" src="/sorteo.jpg" height={430} width={430} style={{
            objectFit: 'contain',
            padding: 10,
          }} alt="Sorteo ITAT" />
        </div>
        <div className="w-1/2 flex flex-col items-center h-full p-10">
          <div className="pb-10">
            <h1 className="text-5xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D68A4E] from-40% to-[#FAE6A9] ">Gran Rifa</h1>
            <h2 className="text-3xl text-center text-blue-400">Promo 26</h2>
          </div>
          <div className="pb-5 text-justify">
            <p className="text-xl">Ten la oportunidad de ganar una <span className="text-cyan-400">Playstation 5</span> por el precio de
              <span className="text-cyan-400"> 2$</span> al participar en esta rifa, al utilizar el
              botón de abajo podrá comprar sus números que serán asignados de manera
              aleatoria.</p>
          </div>
          <button onClick={toggleModal}>
            <div className="flex justify-center rounded-md bg-indigo-600 px-5 py-1.5 text-xl/10 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none">
              Ir a la compra
            </div>
          </button>
          <PercentageBar data={available}/>
        </div>
        {isModalOpen ? <BuyModal toggleModal={toggleModal} dollar={dollar?.promedio} available={available?.available} /> : null}
      </div>
    </div>
  );
}
