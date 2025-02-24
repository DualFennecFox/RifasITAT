import FileDropzone from "./FileDropzone";
import SvgClose from "./SvgClose";
import Form from "next/form";

export default function BuyModal({ toggleModal }: {
    toggleModal: () => void
}) {
    /*$('#form2 input[type=text]').on('change invalid', function() {
    var textfield = $(this).get(0);
    
    // 'setCustomValidity not only sets the message, but also marks
    // the field as invalid. In order to see whether the field really is
    // invalid, we have to remove the message first
    textfield.setCustomValidity('');
    
    if (!textfield.validity.valid) {
      textfield.setCustomValidity('Lütfen işaretli yerleri doldurunuz');  
    }
}); */

    return (
        <div className="size-full fixed top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center overflow-scroll">
            <div className="bg-gray-700 rounded-2xl">
                <button className="relative w-full" onClick={toggleModal}>
                    <div className="w-[40] h-[40] absolute top-0 right-5 flex items-center justify-center bg-gray-800 hover:bg-gray-600 rounded-lg">
                        <div className="relative h-full w-full">
                            <SvgClose className="w-full h-full fill-white hover:fill-blue-400 p-1" />
                        </div>
                    </div>
                </button>
                <div className="p-10">
                    <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="text-center text-2xl/9 font-bold text-white">Compra tus números</h2>
                        </div>
                        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                            <Form className="space-y-4" action="#" formMethod="POST">
                                <div className="mt-2">
                                    <input type="email" placeholder="Cédula de identidad" name="Cedula" id="cid" required className="block w-full rounded-md bg-black px-3 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-100 focus:outline -outline-offset-5 outline-none  focus:outline-gray-300" />
                                </div>

                                <div className="mt-2">
                                    <input type="text" placeholder="Nombre y Apellido" name="Nombre y apellido" id="name" required className="block w-full rounded-md bg-black px-3 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-100 focus:outline -outline-offset-10 outline-none  focus:outline-gray-300 " />
                                </div>
                                <div className="mt-2">
                                    <input type="text" placeholder="Telefono" name="Telefono" id="name" required className="block w-full rounded-md bg-black px-3 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-100 focus:outline -outline-offset-10 outline-none  focus:outline-gray-300" />
                                </div>
                                <div className="mt-2">
                                    <input type="email" placeholder="Correo electrónico" name="email" id="email" required className="block w-full rounded-md bg-black px-3 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-100 focus:outline -outline-offset-10 outline-none  focus:outline-gray-300" />
                                </div>
                                <div className="mt-2">
                                    <input type="text" placeholder="Código de referencia" name="ref" id="ref" required className="block w-full rounded-md bg-black px-3 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-100 focus:outline -outline-offset-10 outline-none  focus:outline-gray-300" />
                                </div>
                                <div className="mt-2">
                                    <FileDropzone />
                                </div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2.5 text-sm/6 text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-5 focus-visible:outline-offset-2 focus-visible:outline-gray-300">Enviar</button>
                            </Form>

                            <p className="mt-5 text-center text-mg/6 text-gray-400">
                                Recuerda utilizar tu cuenta para<br />recibir y comprar números
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}