import { useEffect, useState } from "react"
import { ethers } from 'ethers'
import { contractAddress } from "@/contracts/config";
import abi from "@/contracts/abi.json"

export default function useGetPropiedades() {

    const [propiedades, setPropiedades] = useState([]);

    useEffect(() => {

        async function listarPropiedades() {
            const defaultProvider = new ethers.BrowserProvider(window.ethereum)
            const contrato = new ethers.Contract(contractAddress, abi, defaultProvider)

            const propiedades = await contrato.obtenerTodasLasPropiedades()

            setPropiedades(propiedades)
        }

        listarPropiedades()

    }, [])

    return propiedades
}
