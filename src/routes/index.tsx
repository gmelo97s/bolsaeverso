import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu, Search, X, ChevronRight, ChevronLeft, MapPin,
  Phone, Globe, Instagram, ShoppingBag, Plus, Minus, Trash2,
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "F&C · Bolsas Femininas" },
      { name: "description", content: "Coleção exclusiva de bolsas femininas F&C." },
    ],
  }),
  component: Home,
});

type Product = { id: string; name: string; price: number; priceLabel: string; img: string };

const products: Product[] = [
  { id: "zadig", name: "Bolsa Zadig Voltare Sunny", price: 69.9, priceLabel: "R$ 69,90", img: zadig },
  { id: "saint-laurent", name: "Bolsa Saint Laurent Icare Tote Bag — Trançada", price: 89.9, priceLabel: "R$ 89,90", img: saintLaurent },
  { id: "laura-loren", name: "Bolsa Off White Laura Loren", price: 89.9, priceLabel: "R$ 89,90", img: lauraLoren },
  { id: "bella-paula", name: "Bolsa Bella Paula", price: 69.9, priceLabel: "R$ 69,90", img: bellaPaula },
  { id: "lace-lenco", name: "Lace Lore — Com Lenço", price: 89.9, priceLabel: "R$ 89,90", img: laceLenco },
  { id: "lace-ombro", name: "Lace Lore — Alça no Ombro", price: 89.9, priceLabel: "R$ 89,90", img: laceOmbro },
  { id: "trio-49", name: "Bolsa Chain Flap (marrom, off-white ou terracota)", price: 49.9, priceLabel: "R$ 49,90 cada", img: trio49 },
  { id: "conjunto-39", name: "Bolsa Matelassê Taupe (P, M ou G)", price: 39.9, priceLabel: "R$ 39,90 cada · R$ 105,00 o conjunto", img: conjunto39 },
  { id: "tote-129", name: "Bolsa Tote Caramelo com Tassel", price: 129.9, priceLabel: "R$ 129,90", img: tote129 },
  { id: "hobo-129", name: "Bolsa Hobo Chocolate", price: 129.9, priceLabel: "R$ 129,90", img: hobo129 },
];

const WHATSAPP = "5511988597788";
const INSTAGRAM = "https://www.instagram.com/fesoncini?igsh=ZXBnNDgyazV2YmY5";
const ADDRESS = "Rua Álvaro Guimarães, 630 - sala 21 - São Bernardo do Campo";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

type View = "products" | "menu" | "search";
type CartItem = { product: Product; qty: number };

function Home() {
  const [view, setView] = useState<View>("products");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [detail, setDetail] = useState<Product | null>(null);

  const addToCart = (p: Product) => {
    setCart((c) => {
      const existing = c.find((i) => i.product.id === p.id);
      if (existing) return c.map((i) => i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { product: p, qty: 1 }];
    });
    setCartOpen(true);
  };

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);

  return (
    <div className="min-h-screen bg-background text-foreground max-w-md mx-auto relative">
      <Header
        view={view} setView={setView}
        cartCount={cartCount} onCartOpen={() => setCartOpen(true)}
      />
      {view === "products" && (
        <ProductsView onDetails={setDetail} onAdd={addToCart} />
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
    </div>
  );
}

function Header({ view, setView, cartCount, onCartOpen }: {
  view: View; setView: (v: View) => void; cartCount: number; onCartOpen: () => void;
}) {
  const isOverlay = view !== "products";
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-5">
          <button aria-label="Menu" onClick={() => setView(isOverlay ? "products" : "menu")}>
            {isOverlay ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
          <button aria-label="Buscar" onClick={() => setView("search")}>
            <Search size={20} strokeWidth={1.5} />
          </button>
        </div>
        {!isOverlay && (
          <h1 className="font-serif text-2xl tracking-[0.25em] font-normal">F&amp;C</h1>
        )}
        <div className="flex items-center gap-5">
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"
             className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center">
            <WhatsAppIcon size={14} />
          </a>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram size={20} strokeWidth={1.5} />
          </a>
          <button aria-label="Sacola" onClick={onCartOpen} className="relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-foreground text-background text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size}
         fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.08.55 4.11 1.6 5.9L0 24l6.42-1.68a11.83 11.83 0 0 0 5.62 1.43h.01c6.53 0 11.83-5.3 11.83-11.83 0-3.16-1.23-6.13-3.36-8.44ZM12.05 21.5h-.01a9.66 9.66 0 0 1-4.92-1.35l-.35-.21-3.81 1 1.02-3.71-.23-.38a9.6 9.6 0 0 1-1.48-5.02c0-5.31 4.32-9.63 9.79-9.63 2.62 0 5.07 1.02 6.92 2.87a9.7 9.7 0 0 1 2.86 6.85c0 5.31-4.32 9.63-9.79 9.63Zm5.36-7.22c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.29-.76.96-.93 1.16-.17.2-.34.22-.63.07-.29-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.44.13-.58.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.36-.02-.51-.07-.15-.66-1.6-.9-2.18-.24-.57-.48-.5-.66-.51h-.56c-.2 0-.51.07-.78.36-.27.29-1.03 1.01-1.03 2.46 0 1.45 1.06 2.86 1.2 3.06.15.2 2.08 3.18 5.03 4.46.7.3 1.25.48 1.68.61.71.23 1.36.2 1.87.12.57-.08 1.74-.71 1.99-1.4.24-.68.24-1.27.17-1.4-.07-.13-.27-.2-.56-.36Z"/>
    </svg>
  );
}

function ProductsView({ onDetails, onAdd }: { onDetails: (p: Product) => void; onAdd: (p: Product) => void }) {
  return (
    <main>
      <div className="flex items-center justify-between px-4 py-4 text-xs tracking-wider">
        <span>{products.length} PRODUTOS</span>
        <a href={MAPS_URL} target="_blank" rel="noreferrer"
           className="flex items-center gap-1 hover:underline">
          <MapPin size={12} strokeWidth={1.5} /> SÃO BERNARDO DO CAMPO
        </a>
      </div>
      <div className="grid grid-cols-2 gap-px bg-border">
        {products.map((p) => <ProductCard key={p.id} p={p} onDetails={onDetails} onAdd={onAdd} />)}
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
              Peça exclusiva da coleção F&amp;C. Feita para acompanhar você em cada ocasião com elegância atemporal.
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
    <div className="fixed inset-0 top-14 bg-background z-30 max-w-md mx-auto overflow-y-auto">
      <nav className="px-6 pt-6">
        {["Novidades", "Bolsas", "Coleção F&C"].map((label) => (
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
          <WhatsAppIcon size={16} /><span>WhatsApp (11) 98859-7788</span>
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
  const filtered = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
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
      <div className="grid grid-cols-2 gap-px bg-border">
        {filtered.map((p) => <ProductCard key={p.id} p={p} onDetails={onDetails} onAdd={onAdd} />)}
      </div>
    </div>
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
      <div className="flex items-center justify-center gap-4 pt-3">
        <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram">
          <Instagram size={18} strokeWidth={1.5} />
        </a>
        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer"
           aria-label="WhatsApp"
           className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center">
          <WhatsAppIcon size={14} />
        </a>
      </div>
      <p className="pt-4 text-[10px] tracking-widest text-muted-foreground">
        © 2026 F&amp;C · TODOS OS DIREITOS RESERVADOS
      </p>
    </footer>
  );
}
