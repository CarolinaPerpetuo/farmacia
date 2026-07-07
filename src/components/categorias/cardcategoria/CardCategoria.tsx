import { Link } from "react-router-dom"
import type Categoria from "../../../models/Categoria"

interface CardCategoriaProps {
  categoria: Categoria
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border">
      <header className="bg-cyan-700 px-6 py-2 text-xl font-bold text-white">
        {categoria.nome}
      </header>

      <p className="h-full bg-slate-100 p-6 text-lg">
        {categoria.descricao}
      </p>

      <div className="flex">
        <Link to={`/editarcategoria/${categoria.id}`} className="flex w-full justify-center bg-cyan-600 py-2 text-white hover:bg-cyan-800">
          Editar
        </Link>

        <Link to={`/deletarcategoria/${categoria.id}`} className="flex w-full justify-center bg-red-500 py-2 text-white hover:bg-red-700">
          Deletar
        </Link>
      </div>
    </div>
  )
}

export default CardCategoria