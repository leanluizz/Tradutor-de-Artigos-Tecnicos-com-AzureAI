import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text, from, to } = await request.json()

    if (!text || !from || !to) {
      return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 })
    }

    const apiKey = process.env.AZURE_TRANSLATOR_KEY
    const endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT
    const region = process.env.AZURE_TRANSLATOR_REGION || "eastus"

    if (!apiKey || !endpoint) {
      return NextResponse.json(
        {
          error:
            "Configuração do Azure não encontrada. Configure AZURE_TRANSLATOR_KEY e AZURE_TRANSLATOR_ENDPOINT nas variáveis de ambiente.",
        },
        { status: 500 },
      )
    }

    const url = `${endpoint}/translate?api-version=3.0&from=${from}&to=${to}`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey,
        "Ocp-Apim-Subscription-Region": region,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ text }]),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] Azure API error:", errorData)
      throw new Error("Erro na API do Azure")
    }

    const data = await response.json()
    const translatedText = data[0]?.translations[0]?.text

    if (!translatedText) {
      throw new Error("Resposta inválida da API")
    }

    return NextResponse.json({ translatedText })
  } catch (error) {
    console.error("[v0] Translation error:", error)
    return NextResponse.json({ error: "Erro ao processar tradução" }, { status: 500 })
  }
}
