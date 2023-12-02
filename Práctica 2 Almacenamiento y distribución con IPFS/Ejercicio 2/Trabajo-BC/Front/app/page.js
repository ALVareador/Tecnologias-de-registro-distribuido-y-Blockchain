'use client'
import CheckSVG from "@/components/CheckSVG";
import HouseCard from "@/components/HouseCard";
import useGetPropiedades from "@/hooks/useGetPropiedades";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function HomePage() {

  const propiedades = useGetPropiedades()
  const searchParams = useSearchParams()
  const dialogRef = useRef()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get("insertado")) {
      dialogRef.current.showModal()
      router.replace("/")
    }
  }, [])


  return (
    <>
      <main className="h-max my-5 mx-10 flex flex-wrap gap-14 justify-center">
        {propiedades.map((propiedad, index) => (
          <HouseCard key={index} propiedad={propiedad} />
        ))}
      </main>

      {/* Codigo para la modal */}
      <dialog id="modal_insertado" className="modal" ref={dialogRef}>
        <div className="modal-box">
          <div className="flex gap-2 items-center">
            <CheckSVG />
            <h3 className="font-bold text-lg">Operación realizada con éxito</h3>
          </div>
          <p className="py-4 text-center">Espere mientras la transacción se añade a la BlockChain y recargue la página</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cerrar</button>
            </form>
          </div>
        </div>
      </dialog>

    </>
  )
}
