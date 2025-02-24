import Form from "next/form";
export default function LoginForm() {
    /*
    This example requires updating your template:
  
    ```
    <html className="h-full bg-white">
    <body className="h-full">
    ```
  -->
  */
    return (
        <div className="flex flex-col justify-center bg-gray-800 w-fit h-fit p-10 mt-10 rounded-[20] w-[400]">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-3xl font-bold tracking-tight text-white">Inicio de sesión</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Form className="space-y-6" action="#" formMethod="POST">
                        <div className="mt-2">
                            <input type="email" name="email" id="email" autoComplete="email" placeholder="Correo Electrónico" required className="block w-full rounded-md bg-gray-700 px-3 py-2.5 text-lg text-white placeholder:bg-gray-700 focus:outline-100 focus:outline -outline-offset-10 outline-none focus:outline-gray-300" />
                        </div>

                    <div>
                        <div className="flex items-center justify-center">
                            <div className="text-lg">
                                <a href="#" className="font-semibold text-blue-500 hover:text-indigo-500">¿Olvido su contraseña?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input type="password" name="password" id="password" autoComplete="current-password" placeholder="Contraseña" required className="block w-full rounded-md bg-gray-700 px-3 py-2.5 text-lg text-white placeholder:bg-gray-700 focus:outline-100 focus:outline -outline-offset-10 outline-none focus:outline-gray-300" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-lg font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Iniciar Sesión</button>
                    </div>
                </Form>

                <p className="mt-10 text-center text-lg text-gray-500">
                    ¿Sin cuenta?&ensp;
                    <a href="/signup" className="font-semibold text-blue-500 hover:text-indigo-500">Registrate</a>
                </p>
            </div>
        </div>
    )
}