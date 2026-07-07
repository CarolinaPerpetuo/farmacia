import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent
} from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import type Categoria from "../../../models/Categoria"
import {
  atualizar,
  buscar,
  cadastrar
} from "../../../services/Service"

function FormCategoria() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: "",
    descricao: ""
  })

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

  function atualizarEstado(
    evento: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setCategoria({
      ...categoria,
      [evento.target.name]: evento.target.value
    })
  }

  function retornar() {
    navigate("/categorias")
  }

  async function salvarCategoria(
    evento: FormEvent<HTMLFormElement>
  ) {
    evento.preventDefault()
    setIsLoading(true)

    try {
      if (id !== undefined) {
        await atualizar(
          "/categorias",
          categoria,
          setCategoria
        )

        alert("Categoria atualizada com sucesso!")
      } else {
        await cadastrar(
          "/categorias",
          categoria,
          setCategoria
        )

        alert("Categoria cadastrada com sucesso!")
      }

      retornar()
    } catch {
      alert("Erro ao salvar a categoria.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-8">
      <h1 className="my-8 text-center text-4xl font-bold text-cyan-700">
        {id === undefined
          ? "Cadastrar categoria"
          : "Editar categoria"}
      </h1>

      <form
        className="flex w-full flex-col gap-4"
        onSubmit={salvarCategoria}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome</label>

          <input
            type="text"
            id="nome"
            name="nome"
            required
            placeholder="Ex.: Carolina - Cuidados Pessoais"
            className="rounded border-2 border-slate-400 p-2"
            value={categoria.nome}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição</label>

          <textarea
            id="descricao"
            name="descricao"
            required
            rows={4}
            placeholder="Descreva a categoria"
            className="resize-none rounded border-2 border-slate-400 p-2"
            value={categoria.descricao}
            onChange={atualizarEstado}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mx-auto flex w-1/2 justify-center rounded bg-cyan-700 py-2 text-white hover:bg-cyan-800 disabled:opacity-60"
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" size={24} />
          ) : (
            <span>
              {id === undefined ? "Cadastrar" : "Atualizar"}
            </span>
          )}
        </button>
      </form>
    </div>
  )
}

export default FormCategoria