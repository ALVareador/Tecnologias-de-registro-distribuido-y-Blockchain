import Link from "next/link";

export default function HouseCard({ propiedad }) {
    return (
        <div className="card w-72 bg-white shadow-2xl">
            <figure>
                <img src={`https://ipfs.villamarin.me/ipfs/${propiedad.imagenCID}`} alt="Foto" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{propiedad.nombre}</h2>
                <p>Dirección: {propiedad.direccion}</p>
                <p>Estado: {propiedad.estado}</p>
                <p>Precio día: {propiedad.precioDia.toString()} €</p>
                <div className="card-actions justify-end">
                    <Link href={`/propiedades?nombre=${propiedad.nombre}`} className="btn btn-primary">Ver</Link>
                </div>
            </div>
        </div>
    )
}