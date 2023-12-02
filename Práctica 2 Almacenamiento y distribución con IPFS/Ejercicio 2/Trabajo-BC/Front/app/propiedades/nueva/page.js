'use client'
import { ethers } from 'ethers'
import { contractAddress } from "@/contracts/config"
import abi from "@/contracts/abi.json"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NuevaPage() {

    const [errores, setErrores] = useState({})
    const router = useRouter()


    async function handleSubmit(event) {
        event.preventDefault()

        if (!validarDatos(event.target.elements)) return

        const nombre = event.target.elements.nombre.value
        const direccion = event.target.elements.direccion.value
        const estado = event.target.elements.estado.value
        const precioDia = event.target.elements.precioDia.value
        const foto = event.target.elements.foto.files[0]

        const kuboClient = await window.KuboRpcClient.create(new URL('https://api.ipfs.villamarin.me'))
        const ipfsResult = await kuboClient.add(foto)

        const defaultProvider = new ethers.BrowserProvider(window.ethereum)
        const signer = await defaultProvider.getSigner()
        const contrato = new ethers.Contract(contractAddress, abi, signer)

        await contrato.anhadirPropiedad(nombre, direccion, estado, precioDia, ipfsResult.path)

        await kuboClient.files.cp(`/ipfs/${ipfsResult.cid}`, `/${ipfsResult.cid}`)

        router.push("/?insertado=true")

    }


    function validarDatos(formElements) {
        const nombre = formElements.nombre.value
        const direccion = formElements.direccion.value
        const estado = formElements.estado.value
        const precioDia = formElements.precioDia.value
        const foto = formElements.foto.files[0]

        setErrores({})

        if (!nombre) {
            setErrores((prevErrores) => ({ ...prevErrores, nombre: 'Por favor, ingrese un nombre válido.' }))
            return false
        }

        if (!direccion) {
            setErrores((prevErrores) => ({ ...prevErrores, direccion: 'Por favor, ingrese una dirección válida.' }))
            return false
        }

        if (!estado) {
            setErrores((prevErrores) => ({ ...prevErrores, estado: 'Por favor, ingrese un estado válido.' }))
            return false
        }

        if (isNaN(precioDia) || precioDia <= 0) {
            setErrores((prevErrores) => ({ ...prevErrores, precioDia: 'Por favor, ingrese un precio válido.' }))
            return false
        }

        if (!foto) {
            setErrores((prevErrores) => ({ ...prevErrores, foto: 'Por favor, seleccione una foto.' }))
            return false
        }

        return true
    }

    return (
        <main className="my-5 mx-10">
            <div className="bg-white w-max m-auto h-full rounded-xl shadow-2xl p-5">
                <h1 className="text-lg font-bold text-center">Añadir nueva propiedad</h1>
                <form className="m-5 flex gap-5 flex-col" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nombre">Nombre</label>
                        <input id="nombre" type="text" className={`input w-72 ${errores.nombre ? "input-error" : ""}`} />
                        {errores.nombre && (
                            <label className="label">
                                <span className="label-text-alt text-error">{errores.nombre}</span>
                            </label>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="direccion">Direccion</label>
                        <input id="direccion" type="text" className={`input w-[30rem] ${errores.direccion ? "input-error" : ""}`} />
                        {errores.direccion && (
                            <label className="label">
                                <span className="label-text-alt text-error">{errores.direccion}</span>
                            </label>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="estado">Estado</label>
                        <input id="estado" type="text" className={`input w-72 ${errores.estado ? "input-error" : ""}`} />
                        {errores.estado && (
                            <label className="label">
                                <span className="label-text-alt text-error">{errores.estado}</span>
                            </label>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="precioDia">Precio por día</label>
                        <input id="precioDia" type="number" className={`input w-52 ${errores.precioDia ? "input-error" : ""}`} />
                        {errores.precioDia && (
                            <label className="label">
                                <span className="label-text-alt text-error">{errores.precioDia}</span>
                            </label>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="foto">Foto</label>
                        <input id="foto" type="file" className={`file-input file-input-sm w-96 ${errores.foto ? "input-error" : ""}`} />
                        {errores.foto && (
                            <label className="label">
                                <span className="label-text-alt text-error">{errores.foto}</span>
                            </label>
                        )}
                    </div>
                    <button className="btn btn-primary mt-10">Enviar</button>
                </form>
            </div>
        </main>

    )
}
