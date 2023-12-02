import Link from "next/link";

export default function Header() {
  return (
    <header className="navbar shadow-xl rounded-xl m-5 w-auto bg-secondary text-white">
      <div className="flex-1">
        <span className="text-xl font-bold mx-5 select-none">EtherLease</span>
        <div className="flex-none">
          <ul className="px-1 flex gap-1">
            <li><Link href={"/"} className="btn btn-ghost font-normal">Home</Link></li>
            <li><Link href={"/propiedades/nueva"} className="btn btn-ghost font-normal">Añadir Propiedad</Link></li>
          </ul>
        </div>
      </div>
    </header>
  )
}
