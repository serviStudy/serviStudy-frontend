import { Briefcase, Calendar, Zap } from "lucide-react"

export default function Benefits() {
  const benefits = [
    {
      icon: <Briefcase size={28} />,
      title: "Gana Experiencia Real",
      description:
        "Aplica tus conocimientos en proyectos reales y desarrolla las habilidades que las empresas buscan.",
      color: "bg-blue-600",
    },
    {
      icon: <Calendar size={28} />,
      title: "Flexibilidad Total",
      description:
        "Encuentra trabajos que se adaptan a tu horario de clases o a tus niveles. Prioriza tus estudios sin sacrificar tu carrera.",
      color: "bg-green-500",
    },
    {
      icon: <Zap size={28} />,
      title: "Proceso Ágil y Eficiente",
      description:
        "Facilita la contratación y la búsqueda de empleo con un sistema centralizado que optimiza el tiempo de estudiantes y empleadores.",
      color: "bg-blue-500",
    },
  ]

  return (
    <section className="w-full py-16 px-6 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-10 text-center">
        ¿Por qué ServiStudy?
      </h2>

      <div className="grid gap-6 md:grid-cols-3 max-w-6xl w-full">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col gap-4"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full text-white ${benefit.color}`}
            >
              {benefit.icon}
            </div>

            <h3 className="font-semibold text-blue-700">
              {benefit.title}
            </h3>

            <p className="text-sm text-gray-600">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
