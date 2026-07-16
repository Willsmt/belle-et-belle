# Belle et Belle by Patrícia Almeida

> Projeto **freelance** completo para o estúdio de estética **Belle et Belle**
> (Jardim Sapopemba, São Paulo/SP). Não foi só um site: foi **estratégia digital +
> identidade visual + landing page**, reunindo num só lugar a presença que antes
> estava espalhada.

---

## 🎯 O contexto

A Patrícia já tinha um **Instagram ativo** e um **Google Meu Negócio nota 5,0★**
(33 avaliações) — reputação e clientela reais, mas **descentralizadas**. Faltava um
ponto central, com a cara da marca, que apresentasse o trabalho dela de forma
profissional e convertesse visitante em agendamento.

A entrega resolveu isso em três frentes:

| Entregável | O que é |
|------------|---------|
| 📘 **Estratégia digital** | Apostila com o plano de presença online (posicionamento, conteúdo, Google Meu Negócio, funil até o agendamento). → [`docs/Belle-et-Belle-Estrategia-Digital.pdf`](docs/Belle-et-Belle-Estrategia-Digital.pdf) |
| 🎨 **Identidade visual** | Criação do logo "Belle et Belle" (símbolo, variações, favicon e versões para fundo claro/escuro). → [`assets/img/logo/`](assets/img/logo/) |
| 💻 **Landing page** | Este site — estático, rápido e responsivo, centralizando tudo e levando ao agendamento. |

---

## 📘 A estratégia digital (apostila)

O coração do projeto. Antes do site, foi montada uma apostila de estratégia para
orientar a presença online da Patrícia de forma consistente.

**➡️ [Abrir a apostila (PDF)](docs/Belle-et-Belle-Estrategia-Digital.pdf)**

## 🎨 A marca

Logo oficial: rosto em line-art (perfil da mulher, um traço só) com um toque pink
na bochecha, ao lado do wordmark "Belle *et* Belle by Patrícia Almeida". O pacote
completo (horizontal, horizontal escuro, vertical, símbolo, símbolo escuro,
símbolo preto, favicon) está em [`assets/img/logo/`](assets/img/logo/) — veja o
`LEIA-ME.txt` lá dentro.

No site, o selo (rosto + wordmark) fica inline no `index.html` — um `<symbol>`
único reaproveitado no nav e no rodapé via `<use>`, sem depender de carregar
arquivo externo nem duplicar o path do desenho.

---

## 💻 O site

### Stack
- HTML5 semântico
- CSS puro (custom properties / design tokens)
- JavaScript vanilla (sem dependências, sem build)
- Fontes: [Marcellus](https://fonts.google.com/specimen/Marcellus) (display) + [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk) (corpo)

### Funcionalidades
- **Logo oficial** inline (nav e rodapé), reaproveitada via `<symbol>`/`<use>` — nítida em qualquer tela, sem depender de arquivo externo
- **Baralho de fotos do studio** no hero — passa a foto da frente pra trás, como na mão (arrasta/toca/botão + dots), com animação de entrada só no desktop (no celular ela era mal aproveitada e foi desligada)
- **Slider antes/depois** arrastável (mouse + touch + teclado, acessível)
- **Galeria de resultados por sessão** — a cliente escolhe o procedimento e vê as fotos; abre em tela cheia (lightbox)
- **Carrossel de depoimentos** que roda sozinho, com clique levando às avaliações no Google
- **Menu de procedimentos por categoria** (Cílios, Sobrancelha, Pele & Rosto, Corporal, Parceiros) — mostra tudo sem poluir a tela
- Menu hambúrguer mobile · FAQ em acordeão · reveal on scroll
- `prefers-reduced-motion` respeitado · responsivo (1024px e 840px)

### Estrutura

```
.
├── index.html                      # marcação da página
├── docs/
│   └── Belle-et-Belle-Estrategia-Digital.pdf   # apostila de estratégia
├── assets/
│   ├── css/styles.css              # estilos (tokens + componentes)
│   ├── js/main.js                  # nav, FAQ, reveal, slider, galeria, carrossel, procedimentos
│   ├── video/intro.mp4             # animação de entrada (só desktop)
│   └── img/
│       ├── logo/                   # pacote completo do logo (svg + png + variações)
│       ├── espaco/                 # fotos do studio (baralho do hero)
│       ├── intro/                  # frame de fallback da animação de entrada
│       ├── Patricia_almeida.webp   # retrato (seção Sobre)
│       ├── og-image.png            # preview social 1200×630
│       └── resultados/             # antes/depois (slider) + galeria por categoria
│           ├── caso-0X-antes/depois.webp
│           ├── corporal/  gluteo/  cilios/
│           └── limpeza-de-pele/  sobrancelha/  papada/  micropigmentacao-labial/
└── README.md
```

### Design

Direção "elegante moderno": base off-white, **pink usado só em acentos** (nunca em
blocos chapados), toques de preto — transmite spa premium e confiança.

| Token | Valor | Uso |
|-------|-------|-----|
| `--paper` | `#FAF6F3` | base off-white |
| `--ink` | `#1A1518` | texto / seções escuras |
| `--ink-soft` | `#4A4147` | texto secundário |
| `--pink` | `#D81E78` | acento principal |
| `--pink-deep` | `#B01561` | hover |
| `--pink-soft` / `--pink-tint` | `#F7DCE8` / `#FCEEF4` | fundos suaves |
| `--mauve` | `#98707F` | eyebrows / secundário |

Elemento-assinatura: a **"thread"** (linha fina ondulada em pink que se desenha no
scroll) separa as seções.

---

## 📊 Dados reais integrados

- ⭐ Google: **5,0 com 33 avaliações**
- 📞 WhatsApp / tel: **(11) 97615-6064**
- 🕐 Horário: **Ter/Qui 12h–18h · Qua/Sex 9h–18h · Sáb 8h–18h** (Seg/Dom fechado)
- 📍 R. Manuel França dos Santos, 231 — Jd. Sapopemba, São Paulo/SP
- 📷 Instagram: **@belleetbellestudio**
- 📅 Agendamento: **SimplesAgenda** (plugado nos botões; valores ficam lá)
- 🔍 SEO: meta tags + Open Graph + JSON-LD `BeautySalon`

## 🚀 Rodar localmente

Site estático, sem build — basta abrir o `index.html`. Para servir com URLs limpas
(recomendado para testar OG/favicon):

```bash
npx serve .
# ou
python -m http.server 8000
```

## ☁️ Deploy

Projeto estático, **sem build**. `index.html` na raiz — a Vercel serve direto:
conectar o repositório e fazer deploy, sem configuração extra.

## ✅ Pendências

- [ ] Apontar DNS do domínio (Registro.br) para a Vercel
- [ ] Deploy definitivo na Vercel (conectar repositório, adicionar domínio custom)
- [ ] **Google Search Console**: verificar o site e enviar o `sitemap.xml`
- [ ] **Google Meu Negócio**: manter categorias, fotos e avaliações (maior fator
      de ranqueamento local — trabalha junto com o site)
- [ ] Google Analytics (precisa do ID de medição `G-XXXXXXXXXX` — ainda não plugado)
- [ ] **LGPD**: `assets/img/espaco/espaco-03.webp` mostra uma cliente com rosto
      parcialmente visível durante um procedimento — confirmar consentimento com
      a Patrícia ou trocar a foto
- [ ] Confirmar com a Patrícia se a lista de serviços/legendas dos resultados
      está 100% atualizada

Já resolvido: domínio `belleetbelle.com.br` registrado, foto real no hero (baralho
do studio), foto + texto reais na seção "Sobre", fotos reais de antes/depois,
depoimentos reais do Google.

## 🗺️ Roadmap

Próxima fase: portar para **Next.js** para plugar um sistema de agendamento próprio.

---

© Belle et Belle · Estética Facial &amp; Corporal · Patrícia Almeida
Site, identidade visual e estratégia por **Willians Martins**.
