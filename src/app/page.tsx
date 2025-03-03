"use client"
import BuyModal from "@/components/BuyModal";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import PercentageBar from "@/components/PercentageBar";


export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dollar, setDollar] = useState<number>(0)
  const [available, setAvailable] = useState<{ max: number, available: number } | null>(null)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen)
  }, [isModalOpen])
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 640px)'); // Tailwind's sm breakpoint

    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsSmallScreen(e.matches);
    };

    // Initial check
    handleMediaChange(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener("change", handleMediaChange);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    async function fetchDollar() {
      /*
      const res = await fetch('https://ve.dolarapi.com/v1/dolares', {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Accept': 'application/json'
        }
      })
        */
      const res = await fetch('https://pydolarve.org/api/v1/dollar?format_date=default&rounded_price=true', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
      
      const data = await res.json()
      console.log(data)
      setDollar((data.monitors.bcv.price + data.monitors.enparalelovzla.price) / 2)
    }
    fetchDollar();
  }, [])

  useEffect(() => {
    async function fetchAvailable() {
      const res = await fetch('https://rifasitat.duckdns.org/api/raffle/available?id=1')
      const data = await res.json();
      setAvailable(data)
    }
    fetchAvailable();
  }, [])

  return (
    <div className="self-center max-w-[1280] sm:p-5 sm:pt-0 pb-0 ">
      <div className="flex flex-col sm:flex-row items-center py-5 sm:py-0 h-fill w-full ">
        {isSmallScreen ? <div className={`w-auto sm:w-1/2 justify-center items-center relative ${isModalOpen ? "hidden sm:flex" : "flex"}`}>
          <Image className="select-none" src="/sorteo.png" height={430} width={430} style={{
            objectFit: 'contain',
            padding: 10,
          }} alt="Sorteo ITAT" />
        </div> : <></>}
        <div className={`w-auto sm:w-1/2 flex-col items-center p-5  ${isModalOpen ? "hidden sm:flex" : "flex"}`}>
          <div className="pb-10">
            <h1 className="text-5xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D68A4E] from-40% to-[#FAE6A9] ">Gran Rifa</h1>
            <h2 className="text-3xl text-center text-blue-400">Promo 26</h2>
            {!isSmallScreen ? <div className={`w-auto sm:w-1/2 justify-center items-center relative ${isModalOpen ? "hidden modal-hid" : "flex"}`}>
              <Image className="select-none" src="/sorteo.png" height={430} width={430} style={{
                objectFit: 'contain',
                padding: 10,
              }} alt="Sorteo ITAT" />
            </div> : <></>}
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
          <PercentageBar data={available} />
        </div>
        {isModalOpen ? <BuyModal toggleModal={toggleModal} dollar={dollar} available={available?.available} /> : null}
      </div>
    </div>
  );
}
