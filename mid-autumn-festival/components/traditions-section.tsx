import { Card } from "@/components/ui/card"

export function TraditionsSection() {
  const traditions = [
    {
      icon: "🥮",
      title: "Mooncakes",
      description: "Sweet pastries filled with lotus seed paste, symbolizing reunion and completeness",
    },
    {
      icon: "🏮",
      title: "Lanterns",
      description: "Colorful lanterns light up the night, representing hope and prosperity",
    },
    {
      icon: "🌕",
      title: "Moon Gazing",
      description: "Admiring the full harvest moon together, a moment of peace and reflection",
    },
    {
      icon: "🐰",
      title: "Jade Rabbit",
      description: "The legendary rabbit on the moon, companion to the Moon Goddess Chang'e",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-amber-50/30 to-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary text-center mb-4">Festival Traditions</h2>
        <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto text-pretty">
          Celebrating centuries of culture, love, and togetherness
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {traditions.map((tradition, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/80 backdrop-blur border-primary/10"
            >
              <div className="text-5xl mb-4">{tradition.icon}</div>
              <h3 className="text-2xl font-bold text-primary mb-3">{tradition.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-pretty">{tradition.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
