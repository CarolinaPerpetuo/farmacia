function Footer() {

  const data = new Date().getFullYear()

  return (
    <div className="w-full bg-cyan-700 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">

        <p className="font-bold">
          Farmácia Generation
        </p>

        <p>
          Copyright © {data}
        </p>

      </div>
    </div>
  )
}

export default Footer