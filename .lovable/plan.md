## Mudanças

**1. Logo "Bolsa & Verso" tipográfico (estilo Louis Vuitton)**
- Remover a imagem do logo atual no header.
- Substituir por texto "BOLSA & VERSO" renderizado em fonte serifada condensada (mantendo Cormorant Garamond já carregada, com `letter-spacing` amplo, peso 500, uppercase, tamanho compacto) — mesma pegada minimal-luxo do print da LV.
- Centralizado no header conforme já está o layout.

**2. Toast "Adicionado ao carrinho" no mobile**
- Hoje o toast tem largura fixa/posicionamento que corta nas laterais em telas ≤430px.
- Ajustar para `left-1/2 -translate-x-1/2` com `width: calc(100vw - 32px)` e `max-width: 420px`, bottom com safe-area, padding interno reduzido, e texto em uma linha com truncate.
- Manter animação `slide-in-up` existente.

**3. Versão desktop — fit to screen**
- Hoje o layout está pensado só para mobile (larguras fixas ~390px), ficando espremido/estranho no desktop.
- Aplicar container responsivo: em `md+` o header ocupa 100% com padding maior; grid de produtos passa de 2 colunas (mobile) para 3 (md) e 4 (lg/xl), mantendo cards com mesma estética (imagem quadrada, botões Adicionar/Detalhes).
- Overlays (menu, busca, submenus) em desktop viram painéis centralizados com max-width em vez de fullscreen.
- Modal de detalhes já usa fit-to-screen — ajustar apenas para respeitar breakpoints (largura máx. ~900px em desktop, mantendo blur do fundo).
- Cart drawer permanece à direita com largura fixa (~420px) no desktop.
- Nenhuma remoção de funcionalidade: sort, busca, WhatsApp, Instagram, endereço, entrega — tudo mantido.

**4. Badge de contagem do carrinho vermelho**
- O contador acima do ícone da sacola hoje é preto/neutro.
- Trocar background para vermelho vivo (`#e11d2e`) com texto branco, mantendo tamanho e posição atuais, para chamar atenção.

## Arquivos afetados
- `src/routes/index.tsx` — Header (logo texto + badge vermelho), AddToast (mobile fix), grid responsivo, overlays responsivos, ProductDetail breakpoint.
- `src/styles.css` — pequenos utilitários se necessário (nenhuma mudança de tokens de cor globais).

Sem mudanças em produtos, preços, links, fluxo de WhatsApp, Instagram ou endereço.