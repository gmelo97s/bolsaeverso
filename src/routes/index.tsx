import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Menu, Search, X, ChevronRight, MapPin,
  Globe, Instagram, ShoppingBag, Plus, Minus, Trash2, Check, ArrowUpDown,
} from "lucide-react";



import zadig from "@/assets/bolsas/Bolsa_Zadig_Voltare_Sunny_69_90.jpeg";
import saintLaurent from "@/assets/bolsas/Bolsa_Saint_Laurent_Icare_Tote_Bag_Versão_Trançada_89_90.jpeg";
import lauraLoren from "@/assets/bolsas/Bolsa_Off_White_Laura_Loren_89_90.jpeg";
import bellaPaula from "@/assets/bolsas/Bolsa_Bella_Paula_69_90.jpeg";
import laceLenco from "@/assets/bolsas/Lace_Lore_-_Com_LENÇO_89_90.jpeg";
import laceOmbro from "@/assets/bolsas/Lace_Lore_-_Com_alça_no_ombro_89_90.jpeg";
import trio49 from "@/assets/bolsas/49_90_cada.jpeg";
import conjunto39 from "@/assets/bolsas/39_90_cada_ou_105_00_o_conjunto.jpeg";
import tote129 from "@/assets/bolsas/129_90_2.jpeg";
import hobo129 from "@/assets/bolsas/129_90.jpeg";
import black6990 from "@/assets/bolsas/69_90_3.jpeg";
import toteBege from "@/assets/bolsas/89_90_tote.jpeg";
import besslina from "@/assets/bolsas/69_90_besslina.jpeg";
import pretaNo from "@/assets/bolsas/69_90_preta.jpeg";
import mochila2em1 from "@/assets/bolsas/mochila_2em1_129_90.jpeg";
import laceHobo from "@/assets/bolsas/lace_lore_hobo_89_90.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bolsa & Verso · Bolsas Femininas" },
      { name: "description", content: "Coleção exclusiva de bolsas femininas Bolsa & Verso." },
    ],
  }),
  component: Home,
});

type Product = { id: string; name: string; price: number; priceLabel: string; img: string; isNew?: boolean };

// Ordem: lançamentos primeiro (isNew)
const products: Product[] = [
  { id: "black-6990", name: "Bolsa Executiva Preta com Fecho Dourado", price: 69.9, priceLabel: "R$ 69,90", img: black6990, isNew: true },
  { id: "tote-bege", name: "Bolsa Tote Bege com Carteira", price: 89.9, priceLabel: "R$ 89,90", img: toteBege, isNew: true },
  { id: "besslina", name: "Bolsa Besslina Hobo Redonda", price: 69.9, priceLabel: "R$ 69,90", img: besslina, isNew: true },
  { id: "preta-no", name: "Bolsa Preta com Nó Trançado", price: 69.9, priceLabel: "R$ 69,90", img: pretaNo, isNew: true },
  { id: "mochila-2em1", name: "Bolsa Mochila 2 em 1 Caramelo", price: 129.9, priceLabel: "R$ 129,90", img: mochila2em1, isNew: true },
  { id: "lace-hobo", name: "Bolsa Lace Lore Hobo Monograma", price: 89.9, priceLabel: "R$ 89,90", img: laceHobo, isNew: true },
  { id: "zadig", name: "Bolsa Zadig Voltare Sunny", price: 69.9, priceLabel: "R$ 69,90", img: zadig },
  { id: "saint-laurent", name: "Bolsa Saint Laurent Icare Tote — Trançada", price: 89.9, priceLabel: "R$ 89,90", img: saintLaurent },
  { id: "laura-loren", name: "Bolsa Off White Laura Loren", price: 89.9, priceLabel: "R$ 89,90", img: lauraLoren },
  { id: "bella-paula", name: "Bolsa Bella Paula", price: 69.9, priceLabel: "R$ 69,90", img: bellaPaula },
  { id: "lace-lenco", name: "Lace Lore — Com Lenço", price: 89.9, priceLabel: "R$ 89,90", img: laceLenco },
  { id: "lace-ombro", name: "Lace Lore — Alça no Ombro", price: 89.9, priceLabel: "R$ 89,90", img: laceOmbro },
  { id: "trio-49", name: "Bolsa Chain Flap (marrom, off-white ou terracota)", price: 49.9, priceLabel: "R$ 49,90 cada", img: trio49 },
  { id: "conjunto-39", name: "Bolsa Matelassê Taupe (P, M ou G)", price: 39.9, priceLabel: "R$ 39,90 · R$ 105,00 conjunto", img: conjunto39 },
  { id: "tote-129", name: "Bolsa Tote Caramelo com Tassel", price: 129.9, priceLabel: "R$ 129,90", img: tote129 },
  { id: "hobo-129", name: "Bolsa Hobo Chocolate", price: 129.9, priceLabel: "R$ 129,90", img: hobo129 },
];

const WHATSAPP = "5511988597788";
const INSTAGRAM = "https://www.instagram.com/fesoncini?igsh=ZXBnNDgyazV2YmY5";
const ADDRESS = "Rua Álvaro Guimarães, 630 - sala 21 - São Bernardo do Campo";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

type View = "products" | "menu" | "search";
type CartItem = { product: Product; qty: number };
type SortKey = "novidades" | "maior" | "menor";

const SORT_LABEL: Record<SortKey, string> = {
  novidades: "Lançamentos",
  maior: "Maior preço",
  menor: "Menor preço",
};

function sortProducts(list: Product[], key: SortKey) {
  const copy = [...list];
  if (key === "maior") copy.sort((a, b) => b.price - a.price);
  else if (key === "menor") copy.sort((a, b) => a.price - b.price);
  else copy.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
  return copy;
}

function Home() {
  const [view, setView] = useState<View>("products");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [detail, setDetail] = useState<Product | null>(null);
  const [toast, setToast] = useState<Product | null>(null);
  const [sort, setSort] = useState<SortKey>("novidades");

  const addToCart = (p: Product) => {
    setCart((c) => {
      const existing = c.find((i) => i.product.id === p.id);
      if (existing) return c.map((i) => i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { product: p, qty: 1 }];
    });
    setToast(p);
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  const sorted = useMemo(() => sortProducts(products, sort), [sort]);

  return (
    <div className="min-h-screen bg-background text-foreground mx-auto relative w-full">
      <Header
        view={view} setView={setView}
        cartCount={cartCount} onCartOpen={() => setCartOpen(true)}
      />
      {view === "products" && (
        <ProductsView list={sorted} sort={sort} setSort={setSort} onDetails={setDetail} onAdd={addToCart} />
      )}
      {view === "menu" && <MenuView setView={setView} onCartOpen={() => setCartOpen(true)} />}
      {view === "search" && <SearchView setView={setView} onDetails={setDetail} onAdd={addToCart} />}

      {detail && (
        <ProductDetail product={detail} onClose={() => setDetail(null)} onAdd={addToCart} />
      )}
      <CartDrawer
        open={cartOpen} onClose={() => setCartOpen(false)}
        cart={cart} setCart={setCart}
      />
      <AddToast item={toast} onOpenCart={() => { setToast(null); setCartOpen(true); }} onClose={() => setToast(null)} />
    </div>
  );
}

function Header({ view, setView, cartCount, onCartOpen }: {
  view: View; setView: (v: View) => void; cartCount: number; onCartOpen: () => void;
}) {
  const isOverlay = view !== "products";
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="flex items-center justify-between px-4 md:px-8 h-16 md:h-20 max-w-7xl mx-auto">
        <div className="flex items-center gap-5 flex-1 min-w-0">
          <button aria-label="Menu" onClick={() => setView(isOverlay ? "products" : "menu")}>
            {isOverlay ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
          <button aria-label="Buscar" onClick={() => setView("search")}>
            <Search size={20} strokeWidth={1.5} />
          </button>
        </div>
        {!isOverlay && (
          <div className="font-serif tracking-[0.28em] text-[15px] md:text-xl uppercase whitespace-nowrap px-2">
            Bolsa <span className="mx-0.5">&amp;</span> Verso
          </div>
        )}
        <div className="flex items-center gap-4 md:gap-5 flex-1 justify-end">
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"
             className="flex items-center justify-center">
            <WhatsAppIcon size={20} />
          </a>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram"
             className="flex items-center justify-center">
            <Instagram size={20} strokeWidth={1.5} />
          </a>
          <button aria-label="Sacola" onClick={onCartOpen} className="relative flex items-center justify-center">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#e11d2e] text-white text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  // Outline style — matches lucide stroke visual weight of neighboring icons
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size}
         fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
         aria-hidden="true">
      <path d="M3 21l1.65-4.5A9 9 0 1 1 8.5 20.35L3 21z" />
      <path d="M9 10c.5 2 2 3.5 4 4l1.5-1.2a1 1 0 0 1 1-.2l2.4.9a1 1 0 0 1 .6 1.1c-.3 1.6-1.8 2.4-3.5 2.4-3.9 0-8-4.1-8-8 0-1.7.8-3.2 2.4-3.5a1 1 0 0 1 1.1.6l.9 2.4a1 1 0 0 1-.2 1L9 10z" />
    </svg>
  );
}

function SortMenu({ sort, setSort }: { sort: SortKey; setSort: (s: SortKey) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-1.5 hover:opacity-70 transition-opacity">
        <ArrowUpDown size={12} strokeWidth={1.5} />
        <span>ORDENAR: {SORT_LABEL[sort].toUpperCase()}</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-40 w-48 bg-background border border-border shadow-lg animate-scale-in origin-top-right">
            {(Object.keys(SORT_LABEL) as SortKey[]).map((k) => (
              <button key={k}
                      onClick={() => { setSort(k); setOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-[12px] tracking-wider hover:bg-muted transition-colors ${
                        sort === k ? "bg-muted" : ""
                      }`}>
                <span>{SORT_LABEL[k]}</span>
                {sort === k && <Check size={14} strokeWidth={1.5} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProductsView({ list, sort, setSort, onDetails, onAdd }: {
  list: Product[]; sort: SortKey; setSort: (s: SortKey) => void;
  onDetails: (p: Product) => void; onAdd: (p: Product) => void;
}) {
  return (
    <main>
      <div className="flex items-center justify-between px-4 py-4 text-xs tracking-wider">
        <span>{list.length} PRODUTOS</span>
        <SortMenu sort={sort} setSort={setSort} />
      </div>
      <div className="grid grid-cols-2 gap-px bg-border">
        {list.map((p) => <ProductCard key={p.id} p={p} onDetails={onDetails} onAdd={onAdd} />)}
      </div>
      <AddressFooter />
    </main>
  );
}

function ProductCard({ p, onDetails, onAdd }: {
  p: Product; onDetails: (p: Product) => void; onAdd: (p: Product) => void;
}) {
  return (
    <article className="bg-surface p-3 pb-4 flex flex-col">
      <button onClick={() => onDetails(p)}
              className="relative aspect-square bg-surface overflow-hidden group">
        <img src={p.img} alt={p.name} loading="lazy"
             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {p.isNew && (
          <span className="absolute top-2 left-2 bg-foreground text-background text-[9px] tracking-[0.15em] px-1.5 py-0.5">
            NOVO
          </span>
        )}
      </button>
      <h3 className="mt-3 text-[13px] leading-tight min-h-[2.6em]">{p.name}</h3>
      <p className="mt-1 text-[13px] font-medium">{p.priceLabel}</p>
      <div className="mt-3 flex gap-1.5">
        <button onClick={() => onAdd(p)}
                className="flex-1 py-2 text-[11px] tracking-widest bg-foreground text-background hover:opacity-90 transition-opacity">
          ADICIONAR
        </button>
        <button onClick={() => onDetails(p)}
                className="flex-1 py-2 text-[11px] tracking-widest border border-foreground hover:bg-foreground hover:text-background transition-colors">
          DETALHES
        </button>
      </div>
    </article>
  );
}

function AddToast({ item, onOpenCart, onClose }: {
  item: Product | null; onOpenCart: () => void; onClose: () => void;
}) {
  if (!item) return null;
  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-6 z-[60] w-[92%] max-w-sm animate-slide-in-up">
      <div className="bg-background border border-border shadow-2xl flex items-center gap-3 p-3">
        <div className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center shrink-0 animate-scale-in">
          <Check size={16} strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] tracking-[0.15em] text-muted-foreground">ADICIONADO</p>
          <p className="text-[13px] leading-tight truncate">{item.name}</p>
        </div>
        <button onClick={onOpenCart}
                className="text-[11px] tracking-widest border border-foreground px-3 py-2 hover:bg-foreground hover:text-background transition-colors">
          VER
        </button>
        <button onClick={onClose} aria-label="Fechar" className="text-muted-foreground hover:text-foreground">
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

function ProductDetail({ product, onClose, onAdd }: {
  product: Product; onClose: () => void; onAdd: (p: Product) => void;
}) {
  const [zoom, setZoom] = useState(false);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
         style={{ background: "color-mix(in oklab, black 40%, transparent)", backdropFilter: "blur(14px)" }}>
      <div className="relative w-full max-w-md bg-background rounded-lg overflow-hidden shadow-2xl animate-scale-in"
           style={{ maxHeight: "92vh" }}>
        <button onClick={onClose} aria-label="Fechar"
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/90 border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors">
          <X size={18} strokeWidth={1.5} />
        </button>
        <div className="overflow-y-auto max-h-[92vh]">
          <div className="relative aspect-square bg-surface overflow-hidden cursor-zoom-in"
               onClick={() => setZoom((z) => !z)}>
            <img src={product.img} alt={product.name}
                 className={`w-full h-full object-cover transition-transform duration-500 ${zoom ? "scale-[1.8]" : "scale-100"}`} />
          </div>
          <div className="px-5 py-6">
            <h2 className="font-serif text-2xl leading-tight">{product.name}</h2>
            <p className="mt-2 text-lg">{product.priceLabel}</p>
            <p className="mt-4 text-[13px] text-muted-foreground leading-relaxed">
              Peça exclusiva da coleção Bolsa &amp; Verso. Feita para acompanhar você em cada ocasião com elegância atemporal.
            </p>
            <button onClick={() => { onAdd(product); onClose(); }}
                    className="mt-6 w-full py-3.5 text-[12px] tracking-[0.2em] bg-foreground text-background hover:opacity-90 transition-opacity">
              ADICIONAR À SACOLA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ open, onClose, cart, setCart }: {
  open: boolean; onClose: () => void;
  cart: CartItem[]; setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}) {
  const [delivery, setDelivery] = useState<"retirar" | "receber" | "">("");
  const [address, setAddress] = useState("");

  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  const updateQty = (id: string, delta: number) => {
    setCart((c) => c.flatMap((i) => {
      if (i.product.id !== id) return [i];
      const q = i.qty + delta;
      return q <= 0 ? [] : [{ ...i, qty: q }];
    }));
  };
  const remove = (id: string) => setCart((c) => c.filter((i) => i.product.id !== id));

  const canOrder = cart.length > 0 && delivery && (delivery === "retirar" || address.trim().length > 3);

  const handleOrder = () => {
    if (!canOrder) return;
    const lines = cart.map((i) => `• ${i.product.name} — ${i.qty}x (${i.product.priceLabel})`).join("\n");
    const deliveryLine = delivery === "retirar"
      ? "Formato de entrega: Retirar na loja"
      : `Formato de entrega: Receber em casa\nEndereço: ${address}`;
    const msg = `Olá, gostaria de fazer o pedido do item(s) abaixo:\n\n${lines}\n\nTotal: R$ ${total.toFixed(2).replace(".", ",")}\n\n${deliveryLine}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in"
         style={{ background: "color-mix(in oklab, black 35%, transparent)", backdropFilter: "blur(8px)" }}
         onClick={onClose}>
      <div className="w-full max-w-md h-full bg-background flex flex-col animate-slide-in-right"
           onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 h-14 border-b border-border">
          <h2 className="font-serif text-xl tracking-widest">SACOLA</h2>
          <button onClick={onClose} aria-label="Fechar"><X size={22} strokeWidth={1.5} /></button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">
              Sua sacola está vazia.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {cart.map((i) => (
                <li key={i.product.id} className="flex gap-3 p-4">
                  <img src={i.product.img} alt={i.product.name}
                       className="w-20 h-20 object-cover bg-surface" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] leading-tight">{i.product.name}</p>
                    <p className="text-[13px] mt-1 font-medium">{i.product.priceLabel}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center border border-border">
                        <button onClick={() => updateQty(i.product.id, -1)} className="w-7 h-7 flex items-center justify-center"><Minus size={12} /></button>
                        <span className="w-6 text-center text-[12px]">{i.qty}</span>
                        <button onClick={() => updateQty(i.product.id, +1)} className="w-7 h-7 flex items-center justify-center"><Plus size={12} /></button>
                      </div>
                      <button onClick={() => remove(i.product.id)} className="text-muted-foreground hover:text-foreground">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {cart.length > 0 && (
            <div className="p-4 border-t border-border">
              <p className="text-[11px] tracking-[0.2em] mb-3">FORMATO DE ENTREGA *</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { v: "retirar", l: "Retirar na loja" },
                  { v: "receber", l: "Receber em casa" },
                ].map((o) => (
                  <button key={o.v}
                          onClick={() => setDelivery(o.v as "retirar" | "receber")}
                          className={`py-3 text-[12px] border transition-colors ${
                            delivery === o.v
                              ? "bg-foreground text-background border-foreground"
                              : "border-border hover:border-foreground"
                          }`}>
                    {o.l}
                  </button>
                ))}
              </div>
              {delivery === "receber" && (
                <input value={address} onChange={(e) => setAddress(e.target.value)}
                       placeholder="Endereço completo para entrega"
                       className="mt-3 w-full bg-muted px-3 py-2.5 text-[13px] outline-none border border-transparent focus:border-foreground" />
              )}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-border p-4 space-y-3">
            <div className="flex justify-between text-[13px]">
              <span>Total</span>
              <span className="font-medium">R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
            <button onClick={handleOrder} disabled={!canOrder}
                    className="w-full py-3.5 text-[12px] tracking-[0.2em] bg-foreground text-background flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity">
              <WhatsAppIcon size={14} /> FAZER PEDIDO
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MenuView({ setView, onCartOpen }: { setView: (v: View) => void; onCartOpen: () => void }) {
  return (
    <div className="fixed inset-0 top-16 bg-background z-30 max-w-md mx-auto overflow-y-auto">
      <nav className="px-6 pt-6">
        {["Novidades", "Bolsas", "Coleção Bolsa & Verso"].map((label) => (
          <button key={label} onClick={() => setView("products")}
                  className="w-full flex items-center justify-between py-4 border-b border-border text-left text-[15px]">
            <span className="font-medium">{label}</span>
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        ))}
      </nav>
      <div className="px-6 mt-10 space-y-5 text-[13px] pb-16">
        <button onClick={onCartOpen} className="flex items-center gap-4 py-1">
          <ShoppingBag size={18} strokeWidth={1.5} /><span>Sacola</span>
        </button>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-4 py-1">
          <Instagram size={18} strokeWidth={1.5} /><span>@fesoncini</span>
        </a>
        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 py-1">
          <WhatsAppIcon size={18} /><span>WhatsApp (11) 98859-7788</span>
        </a>
        <a href={MAPS_URL} target="_blank" rel="noreferrer" className="flex items-start gap-4 py-1">
          <MapPin size={18} strokeWidth={1.5} className="mt-0.5" />
          <span>{ADDRESS}</span>
        </a>
        <div className="flex items-center gap-4 py-1 text-muted-foreground">
          <Globe size={18} strokeWidth={1.5} /><span>Brasil / Português</span>
        </div>
      </div>
    </div>
  );
}

function SearchView({ setView, onDetails, onAdd }: {
  setView: (v: View) => void;
  onDetails: (p: Product) => void;
  onAdd: (p: Product) => void;
}) {
  const [q, setQ] = useState("");
  const filtered = q.trim() === "" ? products : products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  const single = filtered.length === 1;

  return (
    <div className="fixed inset-0 top-0 bg-background z-50 max-w-md mx-auto overflow-y-auto">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)}
               placeholder="Pesquisar bolsas"
               className="flex-1 bg-muted px-3 py-2.5 text-[13px] outline-none" />
        <button onClick={() => setView("products")} className="text-[12px] font-semibold underline tracking-wider">
          FECHAR
        </button>
      </div>
      {filtered.length === 0 ? (
        <div className="p-10 text-center text-sm text-muted-foreground">
          Nenhum resultado para "{q}".
        </div>
      ) : single ? (
        <SearchSingle p={filtered[0]} onDetails={onDetails} onAdd={onAdd} />
      ) : (
        <div className="grid grid-cols-2 gap-px bg-border">
          {filtered.map((p) => <ProductCard key={p.id} p={p} onDetails={onDetails} onAdd={onAdd} />)}
        </div>
      )}
    </div>
  );
}

function SearchSingle({ p, onDetails, onAdd }: {
  p: Product; onDetails: (p: Product) => void; onAdd: (p: Product) => void;
}) {
  return (
    <article className="flex flex-col animate-fade-in">
      <button onClick={() => onDetails(p)}
              className="relative w-full aspect-square bg-surface overflow-hidden">
        <img src={p.img} alt={p.name}
             className="w-full h-full object-cover" />
        {p.isNew && (
          <span className="absolute top-3 left-3 bg-foreground text-background text-[10px] tracking-[0.15em] px-2 py-1">
            NOVO
          </span>
        )}
      </button>
      <div className="px-5 py-5">
        <h2 className="font-serif text-2xl leading-tight">{p.name}</h2>
        <p className="mt-2 text-[15px]">{p.priceLabel}</p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button onClick={() => onAdd(p)}
                  className="py-3 text-[11px] tracking-widest bg-foreground text-background hover:opacity-90 transition-opacity">
            ADICIONAR
          </button>
          <button onClick={() => onDetails(p)}
                  className="py-3 text-[11px] tracking-widest border border-foreground hover:bg-foreground hover:text-background transition-colors">
            DETALHES
          </button>
        </div>
      </div>
    </article>
  );
}

function AddressFooter() {
  return (
    <footer className="px-6 py-10 border-t border-border text-center space-y-3">
      <p className="text-[11px] tracking-[0.25em] text-muted-foreground">VISITE NOSSA LOJA</p>
      <a href={MAPS_URL} target="_blank" rel="noreferrer"
         className="inline-flex items-center gap-2 text-[13px] hover:underline">
        <MapPin size={14} strokeWidth={1.5} /> {ADDRESS}
      </a>
      <div className="flex items-center justify-center gap-5 pt-3">
        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
          <WhatsAppIcon size={20} />
        </a>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram">
          <Instagram size={20} strokeWidth={1.5} />
        </a>
      </div>
      <p className="pt-4 text-[10px] tracking-widest text-muted-foreground">
        © 2026 BOLSA &amp; VERSO · TODOS OS DIREITOS RESERVADOS
      </p>
    </footer>
  );
}
