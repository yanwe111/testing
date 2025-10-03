export function Footer() {
  return (
    <footer className="py-12 px-4 bg-gradient-to-t from-amber-50 to-background border-t border-primary/10">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="text-6xl mb-4">🌕</div>
        <p className="text-lg text-muted-foreground text-pretty">May our love shine as bright as the harvest moon</p>
        <p className="text-sm text-muted-foreground">Mid-Autumn Festival {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
