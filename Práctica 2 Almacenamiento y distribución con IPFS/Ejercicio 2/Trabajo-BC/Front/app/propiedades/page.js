'use client'
import useGetPropiedad from "@/hooks/useGetPropiedad"
import { useSearchParams } from "next/navigation"

export default function PropiedadPage() {

  const searchParams = useSearchParams()
  const nombre = searchParams.get("nombre")
  const propiedad = useGetPropiedad(nombre)

  return (
    <>
      {propiedad && <div className="card w-3/4 bg-white shadow-2xl m-auto p-5 my-10">
        <figure>
          <img className="max-w-2xl" src={`https://ipfs.villamarin.me/ipfs/${propiedad.imagenCID}`} alt="Foto" />
        </figure>
        <div className="card-body m-auto">
          <h2 className="card-title">{propiedad.nombre}</h2>
          <p>Dirección: {propiedad.direccion}</p>
          <p>Estado: {propiedad.estado}</p>
          <p>Precio día: {propiedad.precioDia.toString()} €</p>
        </div>
      </div>
      }
    </>
  )
}