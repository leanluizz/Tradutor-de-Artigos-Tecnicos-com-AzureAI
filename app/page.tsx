import TranslatorInterface from "@/components/translator-interface"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-balance mb-2">Tradutor de Artigos Técnicos</h1>
          <p className="text-muted-foreground text-lg">Powered by Azure AI Translation</p>
        </div>
        <TranslatorInterface />
      </div>
    </main>
  )
}
