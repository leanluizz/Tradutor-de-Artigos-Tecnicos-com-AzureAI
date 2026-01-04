"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Loader2, Languages, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const languages = [
  { code: "pt", name: "Português" },
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "zh-Hans", name: "简体中文" },
]

export default function TranslatorInterface() {
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [sourceLanguage, setSourceLanguage] = useState("en")
  const [targetLanguage, setTargetLanguage] = useState("pt")
  const [isTranslating, setIsTranslating] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira um texto para traduzir.",
        variant: "destructive",
      })
      return
    }

    if (sourceLanguage === targetLanguage) {
      toast({
        title: "Erro",
        description: "Os idiomas de origem e destino devem ser diferentes.",
        variant: "destructive",
      })
      return
    }

    setIsTranslating(true)

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: sourceText,
          from: sourceLanguage,
          to: targetLanguage,
        }),
      })

      if (!response.ok) {
        throw new Error("Erro na tradução")
      }

      const data = await response.json()
      setTranslatedText(data.translatedText)

      toast({
        title: "Sucesso!",
        description: "Texto traduzido com sucesso.",
      })
    } catch (error) {
      console.error("[v0] Translation error:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao traduzir o texto. Verifique sua API key do Azure.",
        variant: "destructive",
      })
    } finally {
      setIsTranslating(false)
    }
  }

  const handleCopy = async () => {
    if (!translatedText) return

    try {
      await navigator.clipboard.writeText(translatedText)
      setCopied(true)
      toast({
        title: "Copiado!",
        description: "Tradução copiada para a área de transferência.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("[v0] Copy error:", error)
      toast({
        title: "Erro",
        description: "Não foi possível copiar o texto.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Entrada */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            Texto Original
          </CardTitle>
          <CardDescription>Insira o artigo técnico que deseja traduzir</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="source-language">Idioma de Origem</Label>
            <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
              <SelectTrigger id="source-language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="source-text">Texto</Label>
            <Textarea
              id="source-text"
              placeholder="Cole seu artigo técnico aqui..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
            />
          </div>

          <Button onClick={handleTranslate} disabled={isTranslating} className="w-full" size="lg">
            {isTranslating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Traduzindo...
              </>
            ) : (
              <>
                <Languages className="mr-2 h-4 w-4" />
                Traduzir
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Saída */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            Tradução
          </CardTitle>
          <CardDescription>Resultado da tradução com Azure AI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="target-language">Idioma de Destino</Label>
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger id="target-language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="translated-text">Texto Traduzido</Label>
            <Textarea
              id="translated-text"
              placeholder="A tradução aparecerá aqui..."
              value={translatedText}
              readOnly
              className="min-h-[400px] font-mono text-sm bg-muted/50"
            />
          </div>

          <Button
            onClick={handleCopy}
            disabled={!translatedText}
            variant="outline"
            className="w-full bg-transparent"
            size="lg"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copiar Tradução
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
