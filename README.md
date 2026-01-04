# 🌐 Azure Translator App

Aplicação web de **tradução de textos** construída com **Next.js** e integrada ao **Azure AI Translator**, permitindo traduzir conteúdos de forma rápida, escalável e segura utilizando serviços cognitivos da Microsoft Azure.

O projeto utiliza uma stack moderna de front-end, com foco em **experiência do usuário**, **componentização**, **boas práticas** e **facilidade de manutenção**.

---

## 📌 Funcionalidades

* Tradução de textos em tempo real usando **Azure Translator**
* Suporte a múltiplos idiomas
* Interface moderna e responsiva
* Validação de formulários
* Feedback visual para estados de carregamento e erro
* Estrutura pronta para expansão (ex: histórico, detecção automática de idioma)

---

## 🧠 Tecnologias Utilizadas

### Front-end

* **Next.js 16**
* **React 19**
* **TypeScript**
* **Tailwind CSS**
* **Radix UI** (componentes acessíveis)
* **React Hook Form + Zod** (formulários e validação)

### Azure

* **Azure AI Translator**
* **Azure Cognitive Services**
* Comunicação via **REST API**

### Outras bibliotecas relevantes

* `lucide-react` – ícones
* `clsx` e `tailwind-merge` – composição de classes
* `sonner` – notificações
* `@vercel/analytics` – métricas

---

## 🏗️ Arquitetura do Projeto

```bash
src/
├── app/                # Rotas e páginas (App Router)
├── components/         # Componentes reutilizáveis
├── services/           # Integração com Azure Translator
├── schemas/            # Validações com Zod
├── hooks/              # Hooks customizados
├── styles/             # Estilos globais
└── utils/              # Funções utilitárias
```

---

## 🔑 Configuração do Azure Translator

1. No **Portal do Azure**, crie um recurso:

   * **Azure AI Translator**
2. Anote:

   * **Endpoint**
   * **Chave da API**
   * **Região**

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
AZURE_TRANSLATOR_ENDPOINT=https://<seu-endpoint>.cognitiveservices.azure.com/
AZURE_TRANSLATOR_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
AZURE_TRANSLATOR_REGION=brazilsouth
```

> ⚠️ Nunca versione suas chaves de API.

---

## ▶️ Executando o Projeto

### Instalação das dependências

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

Acesse:
👉 `http://localhost:3000`

### Build de produção

```bash
npm run build
npm run start
```

---

## 🔁 Exemplo de Fluxo de Tradução

1. Usuário insere o texto
2. Seleciona idioma de origem e destino
3. Front-end envia requisição para o serviço interno
4. Serviço consome a API do **Azure Translator**
5. Texto traduzido é exibido na interface

---

## 📄 Exemplo de Requisição (Azure Translator)

```http
POST /translate?api-version=3.0&to=pt
Ocp-Apim-Subscription-Key: {KEY}
Ocp-Apim-Subscription-Region: {REGION}
Content-Type: application/json

[
  { "Text": "Hello world" }
]
```

---

## 🚀 Possíveis Evoluções

* Detecção automática de idioma
* Histórico de traduções
* Suporte a documentos (PDF, DOCX)
* Autenticação de usuários
* Cache de traduções
* Internacionalização da interface (i18n)

---

## 📜 Licença

Este projeto é de uso educacional e demonstrativo.
Sinta-se livre para adaptar e evoluir conforme sua necessidade.

---

## 👤 Autor

**Leandro Luiz Ribeiro Gomes**
Desenvolvedor Front-End

* GitHub: [https://github.com/leanlzz](https://github.com/leanlzz)
* LinkedIn: [https://www.linkedin.com/in/leandroluizz](https://www.linkedin.com/in/leandroluizz)

---
