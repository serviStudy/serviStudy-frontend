import { Briefcase, Calendar, Zap } from "lucide-react"

export default function Benefits() {
  const benefits = [
    {
      icon: <Briefcase size={24} />,
      title: "Gana Experiencia Real",
      description:
        "Aplica tus conocimientos en proyectos reales y desarrolla las habilidades que las empresas buscan.",
      color: "blue",
    },
    {
      icon: <Calendar size={24} />,
      title: "Flexibilidad Total",
      description:
        "Encuentra trabajos que se adaptan a tu horario de clases. Prioriza tus estudios sin sacrificar tu carrera.",
      color: "green",
    },
    {
      icon: <Zap size={24} />,
      title: "Proceso Ágil y Eficiente",
      description:
        "Facilita la contratación con un sistema centralizado que optimiza el tiempo de todos.",
      color: "blue",
    },
  ]

  return (
    <section className="w-full py-24 px-6 flex flex-col items-center gap-12 bg-white/30 relative overflow-hidden">
      {/* BACKGROUND DECORATIVE GLOWS */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="text-center space-y-4 relative z-10">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-blue-950">
          ¿Por qué <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-700 to-green-600">ServiStudy</span>?
        </h2>
        <p className="text-gray-500 font-bold text-lg max-w-2xl mx-auto opacity-80">
          Diseñamos el camino perfecto para que tu talento encuentre su lugar ideal.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-6xl w-full relative z-10">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-lg border border-white/80 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200/40 hover:-translate-y-3 flex flex-col gap-6 cursor-default"
          >
            {/* INTERNAL CARD GLOW */}
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-40 -mr-8 -mt-8 ${
              benefit.color === 'blue' ? 'bg-blue-400' : 'bg-green-400'
            }`} />

            <div className="relative">
              {/* ICON CONTAINER - LAYERED GLASS */}
              <div className={`absolute -inset-2 rounded-2xl blur-xl opacity-20 transition-opacity group-hover:opacity-40 ${
                benefit.color === 'blue' ? 'bg-blue-600' : 'bg-green-600'
              }`} />
              <div className={`relative w-14 h-14 flex items-center justify-center rounded-2xl border border-white shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                benefit.color === 'blue' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-green-500 text-white'
              }`}>
                {benefit.icon}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className={`text-xl font-black transition-colors duration-500 ${
                benefit.color === 'blue' ? 'text-blue-900 group-hover:text-blue-700' : 'text-green-900 group-hover:text-green-700'
              }`}>
                {benefit.title}
              </h3>
              <p className="text-gray-500 font-bold text-sm leading-relaxed opacity-90 transition-colors group-hover:text-gray-800">
                {benefit.description}
              </p>
            </div>

            {/* DECORATIVE LINE */}
            <div className={`w-12 h-1 rounded-full transition-all duration-500 group-hover:w-full ${
              benefit.color === 'blue' ? 'bg-blue-600/20 group-hover:bg-blue-600/40' : 'bg-green-600/20 group-hover:bg-green-600/40'
            }`} />
          </div>
        ))}
      </div>
    </section>
  )
}
