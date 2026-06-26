# Belle et Belle by Patrícia Almeida — Landing Page

Landing page do estúdio de estética **Belle et Belle** (Jardim Sapopemba, São Paulo/SP).
Site estático (HTML/CSS/JS), sem build, pronto para deploy na Vercel.

> **Marca:** "Belle et Belle" é a marca; "by Patrícia Almeida" é a assinatura.

## 🩷 Stack

- HTML5 semântico
- CSS puro (custom properties / design tokens v3)
- JavaScript vanilla (sem dependências, sem build)
- Fontes: [Marcellus](https://fonts.google.com/specimen/Marcellus) (display) + [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk) (corpo)

## 📁 Estrutura

```
.
├── index.html              # marcação da página
├── assets/
│   ├── css/
│   │   └── styles.css      # estilos (tokens v3 + componentes)
│   ├── js/
│   │   └── main.js         # menu, FAQ, reveal on scroll, slider antes/depois
│   └── img/
│       ├── favicon.svg             # favicon vetorial
│       ├── favicon.png             # fallback 48×48
│       ├── apple-touch-icon.png    # 180×180
│       └── og-image.png            # preview social 1200×630 (placeholder v3)
└── README.md
```

## 🎨 Design (v3 — aprovado)

Direção "elegante moderno": base off-white, **pink usado só em acentos** (nunca em
blocos chapados), toques de preto. Transmite spa premium e confiança.

### Tokens

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

## ⚙️ Funcionalidades

- Menu hambúrguer mobile
- FAQ em acordeão
- Reveal on scroll (`IntersectionObserver`)
- Slider antes/depois arrastável (mouse + touch + teclado, acessível)
- `prefers-reduced-motion` respeitado
- Responsivo (breakpoints 1024px e 840px)

## 🚀 Rodar localmente

Por ser estático, basta abrir o `index.html` no navegador. Para servir com URLs
limpas (recomendado para testar OG/favicon):

```bash
npx serve .
# ou
python -m http.server 8000
```

## ☁️ Deploy (Vercel)

Projeto estático, **sem build**. `index.html` na raiz — a Vercel serve direto.
Conectar o repositório e fazer deploy; nenhuma configuração extra necessária.

## 📊 Dados reais integrados

- ⭐ Google: **5,0 com 33 avaliações**
- 📞 WhatsApp / tel: **(11) 97615-6064**
- 🕐 Horário: **Ter–Sex 14h–20h · Sáb 7h–20h** (Seg/Dom fechado)
- 📍 R. Manuel França dos Santos, 231 — Jd. Sapopemba, São Paulo/SP
- 📷 Instagram: **@belleetbellestudio**
- 📅 Agendamento: **SimplesAgenda** (já plugado nos botões)

## ✅ Pendências

### Aguardando a cliente
- [ ] Lista real e completa de serviços (os atuais são estimativa)
- [ ] Fotos profissionais do espaço (em obra) e da Patrícia
- [ ] Fotos de antes/depois reais (com autorização — LGPD)
- [ ] Texto definitivo da seção "Sobre"
- [ ] Confirmar endereço / horário / telefone / @

### Técnico
- [x] Meta tags SEO + Open Graph + Twitter Card
- [x] JSON-LD `BeautySalon` (dados estruturados para o Google)
- [x] Favicon + og:image (placeholders no estilo v3)
- [ ] **Trocar `https://belleetbelle.com.br` pelo domínio real** (em `index.html`:
      `canonical`, `og:url`, `og:image`, JSON-LD) ao registrar no Registro.br
- [ ] Google Analytics (precisa do ID de medição `G-XXXXXXXXXX`)
- [ ] Logo definitivo em vetor → regerar favicon/og:image a partir dele
- [ ] Domínio próprio (.com.br via Registro.br → apontar para a Vercel)

## 🗺️ Roadmap

Próxima fase: portar para **Next.js** para plugar um sistema de agendamento próprio.

---

© Belle et Belle · Estética Facial & Corporal · Patrícia Almeida
