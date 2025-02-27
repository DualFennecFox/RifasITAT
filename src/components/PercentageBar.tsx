export default function PercentageBar({ data }: {
    data: { max: number, available: number } | null
}
) {

    let percentage = data ? ((data.max - data.available) / data.max) * 100 : 100
    percentage = percentage > 100 ? 100 : percentage
    percentage = parseFloat(percentage.toFixed(1))
    return (
        <div className="w-[100%] flex flex-row gap-2 overflow-hidden mt-10">
            <div className="size-full rounded-full border-white border-2 overflow-hidden">
                <div style={{ width: percentage.toString() + "%" }} className="h-full bg-blue-600 rounded-full flex items-center justify-center">
                    <h1 className="text-center font-bold">{data && percentage >= 10 ? percentage.toString() + "%" : ''}
                    </h1>
                </div>
            </div>
            <h1>Comprados</h1>
        </div>
    )
}