"use client"
import BuyModal from "@/components/BuyModal";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className="self-center w-[1280] p-5">
    <div className="flex flex-row items-center h-[600] w-full h-fill">
      <div className="w-1/2 flex justify-center items-center justify-center h-full relative">
        <Image className="select-none" src="/sorteo.jpg" fill style={{
          objectFit: 'contain',
          padding: 10
        }} alt="Sorteo ITAT" />
      </div>
      <div className="w-1/2 flex flex-col items-center h-full p-10">
        <div className="pb-10">
          <h1 className="text-5xl text-center font-bold text-blue-400">Gran Rifa</h1>
          <h2 className="text-3xl text-center">Promo 26</h2>
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
      </div>
      {isModalOpen ? <BuyModal toggleModal={toggleModal} /> : null}
    </div>
    </div>
  );
}
