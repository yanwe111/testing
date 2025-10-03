export function GallerySection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary text-center mb-12">
          Memories Under the Moon
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <img
              src="/romantic-couple-watching-full-moon-together-at-nig.jpg"
              alt="Couple under the moon"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <img
              src="/beautiful-traditional-mooncakes-with-tea-ceremony-.jpg"
              alt="Mooncakes and tea"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <img
              src="/glowing-red-lanterns-hanging-at-night-mid-autumn-f.jpg"
              alt="Festival lanterns"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl text-muted-foreground italic text-pretty">
            "The moon is bright, the night is clear, a perfect time to hold you near"
          </p>
        </div>
      </div>
    </section>
  )
}
