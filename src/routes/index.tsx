import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Menu, Search, Heart, User, ShoppingBag, X, ChevronRight, ChevronLeft,
  Phone, Globe, MessageCircle,
} from "lucide-react";
import bagBrown from "@/assets/bag-brown.jpg";
import bagBlack from "@/assets/bag-black.jpg";
import bagWhite from "@/assets/bag-white.jpg";
import bagBrown2 from "@/assets/bag-brown2.jpg";
import giftHer from "@/assets/gift-her.jpg";
import giftHim from "@/assets/gift-him.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bolsas Femininas | Loja Online" },
      { name: "description", content: "Descubra nossa coleção de bolsas de couro artesanais. Elegância italiana em cada peça." },
    ],
  }),
  component: Home,
});

type View = "products" | "menu" | "gifts" | "masculino" | "search";

const products = [
  { name: "Bolsa tote grande Route em couro", price: "R$ 32.500", img: bagBrown, colors: ["#3b1f14", "#1a1a1a"] },
  { name: "Bolsa tote Route média em couro", price: "R$ 29.500", img: bagBlack, colors: ["#1a1a1a", "#5a4030"] },
  { name: "Bolsa tote Route média em couro", price: "R$ 29.500", img: bagBrown2, colors: ["#3b1f14", "#e8e2d5"] },
  { name: "Bolsa tote Route média em couro", price: "R$ 29.500", img: bagWhite, colors: ["#e8e2d5", "#1a1a1a"] },
];

function Home() {
  const [view, setView] = useState<View>("products");

  return (
    <div className="min-h-screen bg-background text-foreground max-w-md mx-auto relative">
      <Header view={view} setView={setView} />
      {view === "products" && <ProductsView />}
      {view === "menu" && <MenuView setView={setView} />}
      {view === "gifts" && <GiftsView setView={setView} />}
      {view === "masculino" && <MasculinoView setView={setView} />}
      {view === "search" && <SearchView setView={setView} />}
      {view === "products" && <ChatBubble />}
    </div>
  );
}

function Header({ view, setView }: { view: View; setView: (v: View) => void }) {
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
          <h1 className="font-serif text-2xl tracking-[0.25em] font-normal">MODA</h1>
        )}
        <div className="flex items-center gap-5">
          <button aria-label="Favoritos"><Heart size={20} strokeWidth={1.5} /></button>
          <button aria-label="Conta"><User size={20} strokeWidth={1.5} /></button>
          <button aria-label="Sacola"><ShoppingBag size={20} strokeWidth={1.5} /></button>
        </div>
      </div>
    </header>
  );
}

function ProductsView() {
  return (
    <main>
      <div className="flex items-center justify-between px-4 py-4 text-xs tracking-wider">
        <span className="text-foreground">4 PRODUTOS</span>
        <div className="flex items-center gap-3 text-foreground">
          <button className="hover:underline">FILTRAR POR</button>
          <span className="text-muted-foreground">·</span>
          <button className="hover:underline">ORDENAR POR</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px bg-border">
        {products.map((p, i) => <ProductCard key={i} p={p} featured={i === 0} />)}
      </div>
      <footer className="px-4 py-16 text-center text-[10px] tracking-widest text-muted-foreground">
        © 2026 · TODOS OS DIREITOS RESERVADOS
      </footer>
    </main>
  );
}

function ProductCard({ p, featured }: { p: typeof products[number]; featured?: boolean }) {
  return (
    <article className="bg-surface p-3 pb-5 relative">
      <div className="relative aspect-square bg-surface overflow-hidden">
        {featured && (
          <span className="absolute left-2 top-2 text-[9px] tracking-[0.2em] text-muted-foreground [writing-mode:vertical-rl] rotate-180">
            FROM THE RUNWAY
          </span>
        )}
        <img src={p.img} alt={p.name} loading="lazy" width={512} height={512}
             className="w-full h-full object-contain" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
          <span className="w-1.5 h-1.5 rounded-full bg-border" />
        </div>
      </div>
      <h3 className="mt-3 text-[13px] leading-tight">{p.name}</h3>
      <p className="mt-1 text-[13px]">{p.price}</p>
      <div className="mt-2 flex gap-1.5">
        {p.colors.map((c, i) => (
          <span key={i} className="w-3 h-3 rounded-full border border-border" style={{ background: c }} />
        ))}
      </div>
    </article>
  );
}

function MenuView({ setView }: { setView: (v: View) => void }) {
  const items = [
    { label: "Presentes", action: () => setView("gifts") },
    { label: "Novidades" },
    { label: "Feminino" },
    { label: "Masculino", action: () => setView("masculino") },
    { label: "Bolsas" },
    { label: "Casa e estilo de vida" },
    { label: "Modasphere" },
  ];
  return (
    <div className="fixed inset-0 top-14 bg-background z-30 max-w-md mx-auto overflow-y-auto">
      <nav className="px-6 pt-6">
        {items.map((it) => (
          <button key={it.label} onClick={it.action}
                  className="w-full flex items-center justify-between py-4 border-b border-border text-left text-[15px]">
            <span className="font-medium">{it.label}</span>
            {it.action && <ChevronRight size={18} strokeWidth={1.5} />}
          </button>
        ))}
      </nav>
      <div className="px-6 mt-12 space-y-6 text-[13px] pb-16">
        <MenuLink icon={<User size={18} strokeWidth={1.5} />} label="Entrar ou Registrar-se" />
        <MenuLink icon={<ShoppingBag size={18} strokeWidth={1.5} />} label="Sacola" />
        <MenuLink icon={<Heart size={18} strokeWidth={1.5} />} label="Lista de desejos" />
        <MenuLink icon={<Phone size={18} strokeWidth={1.5} />} label="Fale conosco" />
        <MenuLink icon={<Globe size={18} strokeWidth={1.5} />} label="Brasil / Português" />
      </div>
    </div>
  );
}

function MenuLink({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-4 py-1">
      {icon}<span>{label}</span>
    </button>
  );
}

function SubHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center px-4 py-3 border-b border-border relative">
      <button onClick={onBack} aria-label="Voltar"><ChevronLeft size={20} strokeWidth={1.5} /></button>
      <h2 className="absolute left-1/2 -translate-x-1/2 text-[14px] font-medium">{title}</h2>
    </div>
  );
}

function GiftsView({ setView }: { setView: (v: View) => void }) {
  return (
    <div className="fixed inset-0 top-14 bg-background z-30 max-w-md mx-auto overflow-y-auto">
      <SubHeader title="Presentes" onBack={() => setView("menu")} />
      <div className="grid grid-cols-2 gap-3 p-3">
        <GiftCard img={giftHer} label="Presentes para Ela" />
        <GiftCard img={giftHim} label="Presentes para Ele" />
      </div>
    </div>
  );
}

function GiftCard({ img, label }: { img: string; label: string }) {
  return (
    <button className="text-left">
      <div className="aspect-square overflow-hidden">
        <img src={img} alt={label} loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
      </div>
      <p className="mt-2 text-[13px] text-center">{label}</p>
    </button>
  );
}

function MasculinoView({ setView }: { setView: (v: View) => void }) {
  const cats = ["Bolsas", "Ready to wear", "Calçados", "Artigos de couro pequenos", "Viagem", "Acessórios"];
  const cols = ["Court Collection", "Days of Summer Masculino", "Coleção Re-Nylon for SEA BEYOND"];
  return (
    <div className="fixed inset-0 top-14 bg-background z-30 max-w-md mx-auto overflow-y-auto">
      <SubHeader title="Masculino" onBack={() => setView("menu")} />
      <nav className="px-6 pt-4">
        {cats.map((c) => (
          <button key={c} className="w-full flex items-center justify-between py-4 border-b border-border text-left text-[15px]">
            <span>{c}</span><ChevronRight size={18} strokeWidth={1.5} />
          </button>
        ))}
      </nav>
      <div className="px-6 pt-8 pb-16">
        <p className="text-[11px] tracking-[0.2em] text-muted-foreground mb-4">COLEÇÕES</p>
        <div className="space-y-4">
          {cols.map((c) => <button key={c} className="block text-[15px]">{c}</button>)}
        </div>
      </div>
    </div>
  );
}

function SearchView({ setView }: { setView: (v: View) => void }) {
  return (
    <div className="fixed inset-0 top-0 bg-background z-50 max-w-md mx-auto overflow-y-auto">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <input autoFocus placeholder="Pesquisar na loja"
               className="flex-1 bg-muted px-3 py-2.5 text-[13px] outline-none" />
        <button onClick={() => setView("products")} className="text-[12px] font-semibold underline tracking-wider">
          FECHAR
        </button>
      </div>
      <div className="px-4 pt-8 space-y-8">
        <section>
          <h3 className="text-[11px] tracking-[0.2em] font-semibold mb-4">COLEÇÕES</h3>
          <ul className="space-y-3 text-[14px] text-[#0a3d2e]">
            <li><a href="#">Presentes</a></li>
            <li><a href="#">Linea Rossa</a></li>
          </ul>
        </section>
        <section>
          <h3 className="text-[11px] tracking-[0.2em] font-semibold mb-4">DESTAQUES</h3>
          <ul className="space-y-3 text-[14px] text-[#0a3d2e]">
            <li><a href="#">Novidades Para Ele</a></li>
            <li><a href="#">Novidades Para Ela</a></li>
            <li><a href="#">Court Tênis Masculino</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}

function ChatBubble() {
  return (
    <button aria-label="Chat"
            className="fixed bottom-6 right-4 z-30 w-12 h-12 rounded-full bg-background border border-border shadow-lg flex items-center justify-center">
      <MessageCircle size={22} strokeWidth={1.5} />
    </button>
  );
}
