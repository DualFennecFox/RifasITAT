import dynamic from "next/dynamic";
import { Dispatch, JSX, SetStateAction, useCallback, useEffect, useState } from "react";
import { WheelData } from "react-custom-roulette/dist/components/Wheel/types";
import SparkWrapper from "./SparkWrapper"

const Wheel = dynamic(
    () => import('react-custom-roulette').then(mod => mod.Wheel),
    { ssr: false }
)

export default function RoulettePage({ winningNumbers, rouletteCallback }: {
    winningNumbers: number[],
    setWinningNumbers: Dispatch<SetStateAction<number[]>>,
    rouletteCallback: () => void
}) {
    const [mustSpin, setMustSpin] = useState(false)
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [showText, setShowText] = useState(false)
    const [data] = useState<WheelData[]>([])
    const [toShow] = useState<JSX.Element[]>([])

    const generateRandomColor = () => {
        const randomValue = () => Math.floor(Math.random() * 128) + 128; // Generate a number between 128 and 255
        const r = randomValue();
        const g = randomValue();
        const b = randomValue();
        return `rgb(${r}, ${g}, ${b})`;
    }

    useEffect(() => {
        winningNumbers.forEach(number => {
            data.push({ option: number?.toString(), style: { backgroundColor: generateRandomColor(), textColor: "black" } })
        });
        for (let i = 0; i < 10 - winningNumbers.length; i++) {

            data.push({ option: (Math.floor(Math.random() * 1000) + 100).toString(), style: { backgroundColor: generateRandomColor(), textColor: "black" } })
        }
    }, [data, winningNumbers])


    const handleSpinClick = useCallback(() => {
        if (!mustSpin && winningNumbers[prizeNumber] != null) {
            setMustSpin(true);
        }
    }, [mustSpin, prizeNumber, winningNumbers])

    const onStopSpinning = useCallback(() => {
        setShowText(true)
        setTimeout(() => {
            if (winningNumbers.length - 1 == prizeNumber) {
                setShowText(false)
                toShow.push(<div key={prizeNumber} className="bg-black border-2 border-white rounded-2xl p-2 mt-2">
                    <p className="text-2xl">{winningNumbers[prizeNumber]}</p>
                </div>)
                setPrizeNumber(prev => prev + 1);
                setTimeout(() => {
                    rouletteCallback()
                }, winningNumbers.length > 0 ? 3000 : 0);

            } else {
                toShow.push(<div key={prizeNumber} className="bg-black border-2 border-white rounded-2xl p-2 mt-2">
                    <p className="text-2xl">{winningNumbers[prizeNumber]}</p>
                </div>)
                setPrizeNumber(prev => prev + 1);
                setShowText(false)
                setMustSpin(false)
            }
        }, winningNumbers.length > 1 ? 2000 : 3000);
    }, [rouletteCallback, winningNumbers, prizeNumber, toShow])

    return data[0] != null ? (
        <div className="relative select-none h-full flex items-center justify-center overflow-hidden">
            <div className="z-0">
                <button onClick={handleSpinClick}>
                    <Wheel
                        onStopSpinning={onStopSpinning}
                        mustStartSpinning={mustSpin}
                        data={data}
                        innerBorderWidth={1}
                        prizeNumber={prizeNumber}
                        spinDuration={winningNumbers.length > 1 ? 0.2 : 0.5}
                        pointerProps={{
                            src: "./RoulettePointer.svg",
                            style: { rotate: "90deg", scale: 2, translate: "20% -30%" }
                        }}
                    />
                </button>
                <div className="absolute w-full text-center flex flex-col items-center justify-center left-0">
                    {winningNumbers.length - prizeNumber > 0 ? <h1 className="text-2xl">Te {(winningNumbers.length) - prizeNumber > 1 ? "quedan" : "queda"} {(winningNumbers.length) - prizeNumber} {(winningNumbers.length) - prizeNumber > 1 ? "giros" : "giro"}</h1> : <></>}
                    <h1 className="text-2xl text-gray-400">Podrás ver estos números en tu correo</h1>
                    <div className="flex flex-row items-center justify-center gap-2">
                        {toShow}
                    </div>
                </div>
            </div>
            {showText || winningNumbers.length - prizeNumber == 0 ? <div className="absolute size-auto first-line:flex items-center justify-center bg-black opacity-50 rounded-full" /> : <></>}
            {showText ? <div className="absolute size-full flex items-center justify-center">
                <div className="absolute bg-black p-[100] rounded-full" />
                <SparkWrapper className="sparkly-text text-8xl bg-black p-5 font-bold text-center z-10">{data[prizeNumber].option}</SparkWrapper>
            </div> : <></>}
        </div>
    ) : <></>
}