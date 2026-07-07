import { useEffect, useState } from "react"
import { SyncLoader } from "react-spinners"
import type Categoria from "../../../models/Categoria"
import { buscar } from "../../../services/Service"
import CardCategoria from "../cardcategoria/CardCategoria"

function ListarCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [erro, setErro] = useState<string>("")

  async function buscarCategorias() {
    try {
      setIsLoading(true)
      setErro("")

      await buscar("/categorias", setCategorias)
    } catch {
      setErro("Não foi possível carregar as categorias.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    buscarCategorias()
  }, [])

  return (
    <div className="mx-auto flex max-w-6xl flex-col px-8 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-cyan-700">
        Categorias
      </h1>

      {isLoading && (
        <div className="flex justify-center">
          <SyncLoader color="#0e7490" size={16} />
        </div>
      )}

      {erro && (
        <p className="text-center text-red-600">
          {erro}
        </p>
      )}

      {!isLoading && !erro && categorias.length === 0 && (
        <p className="text-center text-xl">
          Nenhuma categoria foi encontrada.
        </p>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categorias.map((categoria) => (
          <CardCategoria
            key={categoria.id}
            categoria={categoria}
          />
        ))}
      </div>
    </div>
  )
}

export default ListarCategorias