import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";

export default function FileDropzone({ setFile }: { setFile: Dispatch<SetStateAction<File | null>> }) {
    const [fileName, setFileName] = useState('');
    const [isDragging, setIsDragging] = useState(false)

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            setFileName(file.name);
            setFile(file)
        } else {
            setFileName('');
            setFile(null)
        }
    }
    const onDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setFile(file)
        setFileName(file.name);
        setIsDragging(false)
    }, [setFile]);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
    }, []);

    const onDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (!isDragging) setIsDragging(true)
    }, [isDragging])
    const ondragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (isDragging) setIsDragging(false)
    }, [isDragging])

    return (
        <div onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragEnter} className="flex items-center justify-center w-full select-none relative">
            <label htmlFor="dropzone-file" className={`flex flex-col pl-5 pr-5 items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-800 bg-gray-700 border-gray-600 hover:border-gray-500 ${isDragging ? "bg-gray-700 border-gray-600" : ""}`}>
                <div className="flex flex-col items-center justify-center pt-3 pb-3">
                    <svg style={{ opacity: isDragging ? 0 : 1 }} className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className=" text-sm text-gray-500 dark:text-gray-400" style={{ color: fileName.length == 0 ? "oklch(0.707 0.022 261.325)" : "white", opacity: isDragging ? 0 : 1 }}>{fileName.length == 0 ? "Seleccione su captura o foto del banco" : fileName}</p>
                    <p style={{ opacity: isDragging ? 0 : 1 }} className="text-xs text-gray-500 dark:text-gray-400"><span className="font-semibold">Click para subir</span> o arrastra y suelta</p>
                    {isDragging ? <div onDragLeave={ondragLeave} className="w-full h-full absolute top-0 left-0 bg-opacity-0 flex items-center justify-center">
                        <p className="pointer-events-none font-bold">Suelta para enviar</p>
                    </div> : null}
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
            </label>
        </div>
    )
}