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

Logo criado do zero: duas curvas espelhadas dentro de um círculo — uma rosa, uma
preta — que se encontram no centro, representando o "duplo" do nome (*Belle et
Belle*). Funciona sozinho, vira favicon e selo de redes. O pacote completo
(horizontal, vertical, símbolo, mono, favicon, versões claro/escuro e animada) está
em [`assets/img/logo/`](assets/img/logo/) — veja o `LEIA-ME.txt` lá dentro.

---

## 💻 O site

### Stack
- HTML5 semântico
- CSS puro (custom properties / design tokens)
- JavaScript vanilla (sem dependências, sem build)
- Fontes: [Marcellus](https://fonts.google.com/specimen/Marcellus) (display) + [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk) (corpo)

### Funcionalidades
- **Logo oficial** em SVG inline no nav e rodapé (mantém a fonte da marca, nítido em qualquer tela)
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
│   └── img/
│       ├── logo/                   # pacote completo do logo (svg + png + variações)
│       ├── Patricia_almeida.jpeg   # retrato (seção Sobre)
│       ├── og-image.png            # preview social 1200×630
│       └── resultados/             # antes/depois (slider) + galeria por categoria
│           ├── caso-0X-antes/depois.jpeg
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
- 🕐 Horário: **Ter–Sex 14h–20h · Sáb 7h–20h** (Seg/Dom fechado)
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

- [ ] **Trocar `https://belleetbelle.com.br` pelo domínio real** (em `index.html`:
      `canonical`, `og:url`, `og:image`, JSON-LD) ao registrar no Registro.br
- [ ] Domínio próprio (.com.br via Registro.br → apontar para a Vercel)
- [ ] Google Analytics (precisa do ID de medição `G-XXXXXXXXXX`)
- [ ] Regerar `og-image.png` com o logo oficial
- [ ] Confirmar legendas/procedimentos dos resultados com a Patrícia

## 🗺️ Roadmap

Próxima fase: portar para **Next.js** para plugar um sistema de agendamento próprio.

---

© Belle et Belle · Estética Facial &amp; Corporal · Patrícia Almeida
Site, identidade visual e estratégia por **Willians Martins**.
