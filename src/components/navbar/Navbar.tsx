import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="w-full bg-cyan-700 text-white py-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6">

        <h1 className="text-2xl font-bold">
          Farmácia
        </h1>

        <nav className="flex items-center gap-8 text-lg font-semibold">
          <Link to="/" className="no-underline text-white hover:underline">
            Home
          </Link>

          <Link to="/categorias" className="no-underline text-white hover:underline">
            Categorias
          </Link>

          <Link to="/cadastrarcategoria" className="text-white no-underline hover:underline">
            Cadastrar categoria
          </Link>
        </nav>

      </div>
    </div>
  )
}

export default Navbar