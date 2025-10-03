import { Card } from "@/components/ui/card"

export function MessageSection() {
  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      <Card className="p-8 md:p-12 bg-card/80 backdrop-blur border-2 border-primary/20 shadow-xl">
        <div className="space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary text-center mb-8">To My Dearest</h2>

          <div className="prose prose-lg max-w-none text-foreground">
            <p className="text-lg md:text-xl leading-relaxed text-pretty">
              As the full moon rises tonight, I'm reminded of how lucky I am to have you in my life. Just like the moon
              that shines brightest in the autumn sky, you light up my world with your warmth and love.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-pretty">
              The Mid-Autumn Festival celebrates reunion and togetherness. Even when we're apart, we share the same
              moon, the same sky, and the same love that connects our hearts across any distance.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-pretty">
              May this festival bring you joy, happiness, and all the sweetness of the finest mooncakes. You are my
              moon, my light, and my everything.
            </p>
          </div>

          <div className="text-center pt-6">
            <p className="text-2xl font-serif text-accent">Forever yours ❤️</p>
          </div>
        </div>
      </Card>
    </section>
  )
}
