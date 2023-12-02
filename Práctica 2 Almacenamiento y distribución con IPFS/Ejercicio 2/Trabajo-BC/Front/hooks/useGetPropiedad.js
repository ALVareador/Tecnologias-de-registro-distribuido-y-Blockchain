import { useEffect, useState } from "react"
import useGetPropiedades from "./useGetPropiedades"

export default function useGetPropiedad(nombre) {
    const propiedades = useGetPropiedades()
    const [propiedad, setPropiedad] = useState(null)

    useEffect(() => {
        const foundPropiedad = propiedades.find((prop) => prop.nombre === nombre)
        setPropiedad(foundPropiedad || null)
    }, [propiedades, nombre])

    return propiedad
}
