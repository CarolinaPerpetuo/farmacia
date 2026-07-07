import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import type Categoria from "../../../models/Categoria"
import { buscar, deletar } from "../../../services/Service"

function DeletarCategoria() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria)
    } catch {
      alert("Erro ao buscar a categoria.")
      retornar()
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function retornar() {
    navigate("/categorias")
  }

  async function deletarCategoria() {
    try {
      setIsLoading(true)
      await deletar(`/categorias/${id}`)
      alert("Categoria deletada com sucesso!")
      retornar()
    } catch {
      alert("Erro ao deletar a categoria.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md px-6">
      <h1 className="my-8 text-center text-4xl font-bold text-cyan-700">Deletar categoria</h1>

      <p className="mb-4 text-center font-semibold">
        Você tem certeza de que deseja apagar esta categoria?
      </p>

      <div className="flex flex-col overflow-hidden rounded-2xl border">
        <header className="bg-cyan-700 px-6 py-2 text-xl font-bold text-white">
          {categoria.nome}
        </header>

        <p className="bg-slate-100 p-6 text-lg">{categoria.descricao}</p>

        <div className="flex">
          <button onClick={retornar} className="w-full bg-slate-500 py-2 text-white hover:bg-slate-700">
            Não
          </button>

          <button onClick={deletarCategoria} disabled={isLoading} className="flex w-full justify-center bg-red-500 py-2 text-white hover:bg-red-700 disabled:opacity-60">
            {isLoading ? <ClipLoader color="#ffffff" size={24} /> : "Sim"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarCategoria