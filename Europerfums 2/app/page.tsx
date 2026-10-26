"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";

type ProductCategory = "Caballero" | "Dama" | "Alternativas" | "Decants";
type SortOption = "featured" | "price-asc" | "price-desc" | "name";

type Product = {
  id: number;
  brand: string;
  name: string;
  size: string;
  price: number;
  stock: number;
  category: ProductCategory;
  color: string;
  bottle: "square" | "round" | "tall";
  image?: string;
  badge?: string;
};

type CartItem = { product: Product; quantity: number };

const products: Product[] = [
  { id: 1, brand: "Giorgio Armani", name: "Acqua di Giò Profondo", size: "100 ml", price: 800, stock: 1, category: "Caballero", color: "#275c62", bottle: "square", badge: "Última pieza" },
  { id: 2, brand: "Carolina Herrera", name: "212 Men", size: "Presentación disponible", price: 800, stock: 4, category: "Caballero", color: "#b8a26b", bottle: "round", image: "/products/212-men.jpeg" },
  { id: 3, brand: "Carolina Herrera", name: "212 Parfum Dorado", size: "Presentación disponible", price: 700, stock: 5, category: "Caballero", color: "#b78c3d", bottle: "square", badge: "Favorito" },
  { id: 4, brand: "Carolina Herrera", name: "212 VIP Black", size: "200 ml", price: 900, stock: 5, category: "Caballero", color: "#292d35", bottle: "round", image: "/products/212-vip-black.jpeg" },
  { id: 5, brand: "Afnan", name: "9 PM", size: "Presentación disponible", price: 900, stock: 2, category: "Caballero", color: "#704d31", bottle: "square", badge: "Más vendido" },
  { id: 6, brand: "Chanel", name: "Bleu L’Exclusif", size: "1.1", price: 1200, stock: 7, category: "Caballero", color: "#253959", bottle: "square", image: "/products/bleu-lexclusif.jpeg" },
  { id: 7, brand: "Versace", name: "Eros", size: "200 ml", price: 900, stock: 12, category: "Caballero", color: "#4c815f", bottle: "round", badge: "Más vendido" },
  { id: 8, brand: "Dior", name: "Sauvage Parfum", size: "100 ml · 1.1", price: 900, stock: 4, category: "Caballero", color: "#52637a", bottle: "tall", image: "/products/dior-sauvage-parfum.jpeg" },
  { id: 9, brand: "Louis Vuitton", name: "Imagination", size: "Presentación disponible", price: 900, stock: 12, category: "Caballero", color: "#bc8c3f", bottle: "square", badge: "Favorito" },
  { id: 10, brand: "Louis Vuitton", name: "Imagination", size: "200 ml", price: 1000, stock: 11, category: "Caballero", color: "#c59a4a", bottle: "square" },
  { id: 11, brand: "Valentino", name: "Uomo Born in Roma", size: "100 ml", price: 800, stock: 1, category: "Caballero", color: "#54474a", bottle: "tall", image: "/products/valentino-born-in-roma.jpeg", badge: "Última pieza" },
  { id: 12, brand: "Valentino", name: "Born in Roma Morado", size: "Presentación disponible", price: 800, stock: 2, category: "Caballero", color: "#665172", bottle: "tall" },
  { id: 13, brand: "Valentino", name: "Born in Roma Verde", size: "Presentación disponible", price: 800, stock: 6, category: "Caballero", color: "#63755c", bottle: "tall" },
  { id: 14, brand: "Tommy Hilfiger", name: "Tommy tradicional", size: "Presentación disponible", price: 600, stock: 1, category: "Caballero", color: "#b34b3a", bottle: "round", badge: "Última pieza" },
  { id: 15, brand: "Paco Rabanne", name: "Phantom Legion", size: "Presentación disponible", price: 800, stock: 1, category: "Caballero", color: "#70757d", bottle: "round" },
  { id: 16, brand: "Prada", name: "Paradigme Verde", size: "Presentación disponible", price: 800, stock: 6, category: "Caballero", color: "#596c5a", bottle: "square", image: "/products/prada-paradigme-verde.jpeg" },
  { id: 17, brand: "Parfums de Marly", name: "Layton Exclusif Azul", size: "100 ml · 1.1", price: 900, stock: 6, category: "Caballero", color: "#526c88", bottle: "round", image: "/products/layton-exclusif.jpeg" },
  { id: 18, brand: "Armaf", name: "Odyssey Artisto", size: "100 ml", price: 800, stock: 1, category: "Caballero", color: "#a15b40", bottle: "square" },
  { id: 19, brand: "Louis Vuitton", name: "Ombre Nomade", size: "100 ml", price: 900, stock: 12, category: "Caballero", color: "#433c40", bottle: "square" },
  { id: 20, brand: "Jean Paul Gaultier", name: "Le Beau Le Parfum", size: "Presentación disponible", price: 700, stock: 2, category: "Caballero", color: "#59806a", bottle: "round" },
  { id: 21, brand: "Le Labo", name: "Santal 33", size: "1.1", price: 1500, stock: 4, category: "Caballero", color: "#9d8865", bottle: "tall", badge: "Edición especial" },
  { id: 22, brand: "Yves Saint Laurent", name: "MYSLF", size: "Presentación disponible", price: 700, stock: 5, category: "Caballero", color: "#26282a", bottle: "square" },
  { id: 23, brand: "Versace", name: "Eros Flame", size: "200 ml", price: 1000, stock: 2, category: "Caballero", color: "#984633", bottle: "round", badge: "Últimas piezas" },
  { id: 24, brand: "Louis Vuitton", name: "Imagination", size: "1.1", price: 1800, stock: 3, category: "Caballero", color: "#bc8c3f", bottle: "square", badge: "Edición especial" },
  { id: 25, brand: "Jean Paul Gaultier", name: "Scandal Absolu", size: "100 ml", price: 700, stock: 6, category: "Caballero", color: "#92633c", bottle: "round" },
  { id: 26, brand: "Jean Paul Gaultier", name: "Scandal Le Parfum", size: "100 ml", price: 700, stock: 3, category: "Caballero", color: "#5f493f", bottle: "round" },
  { id: 27, brand: "Dior", name: "Sauvage Parfum", size: "200 ml", price: 900, stock: 12, category: "Caballero", color: "#52637a", bottle: "tall" },
  { id: 28, brand: "Paco Rabanne", name: "Invictus Victory Elixir", size: "Presentación disponible", price: 700, stock: 6, category: "Caballero", color: "#5a4b39", bottle: "square" },
  { id: 29, brand: "Valentino", name: "Rockstud Noir", size: "200 ml", price: 900, stock: 5, category: "Caballero", color: "#28292a", bottle: "square" },
  { id: 30, brand: "Valentino", name: "Uomo Coral Fantasy", size: "Presentación disponible", price: 800, stock: 2, category: "Caballero", color: "#a85c43", bottle: "square" },
  { id: 31, brand: "Yves Saint Laurent", name: "Y Eau de Toilette", size: "Presentación disponible", price: 900, stock: 1, category: "Caballero", color: "#507186", bottle: "square", badge: "Última pieza" },
  { id: 32, brand: "Yves Saint Laurent", name: "MYSLF L’Absolu", size: "Presentación disponible", price: 700, stock: 2, category: "Caballero", color: "#3e4141", bottle: "square", image: "/products/myslf-labsolu.jpeg" },
  { id: 33, brand: "Burberry", name: "Her Eau de Parfum", size: "100 ml", price: 700, stock: 6, category: "Dama", color: "#b78c80", bottle: "round" },
  { id: 34, brand: "Ariana Grande", name: "Nube Azul", size: "100 ml", price: 700, stock: 10, category: "Dama", color: "#7c98b2", bottle: "round", badge: "Más vendido" },
  { id: 35, brand: "Perry Ellis", name: "360 Reserve", size: "Presentación disponible", price: 500, stock: 1, category: "Dama", color: "#b88683", bottle: "tall", badge: "Última pieza" },
  { id: 36, brand: "Burberry", name: "Her Elixir de Parfum", size: "Presentación disponible", price: 700, stock: 4, category: "Dama", color: "#d8a3a0", bottle: "round" },
  { id: 37, brand: "Carolina Herrera", name: "Bomba", size: "1.1", price: 1200, stock: 4, category: "Dama", color: "#c79b63", bottle: "round" },
  { id: 38, brand: "Carolina Herrera", name: "Bomba Intense", size: "1.1", price: 1200, stock: 2, category: "Dama", color: "#8d4f49", bottle: "round", badge: "Últimas piezas" },
  { id: 39, brand: "Chanel", name: "Chance Eau Fraîche", size: "100 ml · 1.1", price: 1200, stock: 3, category: "Dama", color: "#89a183", bottle: "round" },
  { id: 40, brand: "Chanel", name: "Chance Tendre", size: "1.1", price: 1200, stock: 3, category: "Dama", color: "#d09b9c", bottle: "round" },
  { id: 41, brand: "Chanel", name: "Coco Mademoiselle", size: "Presentación disponible", price: 1200, stock: 6, category: "Dama", color: "#bd8b6c", bottle: "square" },
  { id: 42, brand: "Chanel", name: "Coco Mademoiselle", size: "1.1", price: 1200, stock: 4, category: "Dama", color: "#bd8b6c", bottle: "square" },
  { id: 43, brand: "Carolina Herrera", name: "Good Girl Blush", size: "80 ml", price: 700, stock: 3, category: "Dama", color: "#e1b2a8", bottle: "tall" },
  { id: 44, brand: "Yves Saint Laurent", name: "Libre Berry Crush", size: "1.1", price: 970, stock: 3, category: "Dama", color: "#8c5362", bottle: "square" },
  { id: 45, brand: "Guerlain", name: "Mon Guerlain", size: "Presentación disponible", price: 700, stock: 5, category: "Dama", color: "#ae7891", bottle: "round" },
  { id: 46, brand: "Dior", name: "Miss Dior Blooming Bouquet", size: "100 ml", price: 800, stock: 2, category: "Dama", color: "#d0929f", bottle: "round", badge: "Últimas piezas" },
  { id: 47, brand: "Valentino", name: "Born in Roma Intense", size: "Presentación disponible", price: 800, stock: 7, category: "Dama", color: "#7b4267", bottle: "tall" },
  { id: 48, brand: "Valentino", name: "Born in Roma Pink PP", size: "200 ml", price: 900, stock: 6, category: "Dama", color: "#cf728f", bottle: "tall" },
  { id: 49, brand: "Valentino", name: "Extradose", size: "200 ml", price: 900, stock: 6, category: "Dama", color: "#9f3b68", bottle: "tall" },
  { id: 50, brand: "Valentino", name: "Born in Roma Morado", size: "Presentación disponible", price: 800, stock: 2, category: "Dama", color: "#9a6b9a", bottle: "tall", badge: "Últimas piezas" },
  { id: 51, brand: "Versace", name: "Crystal Pour Femme", size: "Presentación disponible", price: 850, stock: 5, category: "Dama", color: "#d194a5", bottle: "round" },
  { id: 52, brand: "Carolina Herrera", name: "Very Good Girl", size: "Presentación disponible", price: 800, stock: 1, category: "Dama", color: "#bb4c53", bottle: "tall", badge: "Última pieza" },
  { id: 53, brand: "Versace", name: "Yellow Diamond", size: "Presentación disponible", price: 700, stock: 1, category: "Dama", color: "#d2b94f", bottle: "round", badge: "Última pieza" },
  { id: 54, brand: "Ariana Grande", name: "Thank U, Next Rosa", size: "Presentación disponible", price: 800, stock: 1, category: "Dama", color: "#d47fa4", bottle: "round", badge: "Última pieza" },
  { id: 55, brand: "Carolina Herrera", name: "Tacon Negro", size: "Presentación disponible", price: 700, stock: 4, category: "Dama", color: "#242324", bottle: "tall" },
  { id: 56, brand: "Europerfumes Guadalajara", name: "Decant Elixir", size: "50 ml", price: 300, stock: 24, category: "Decants", color: "#9b8057", bottle: "tall", badge: "Para descubrir" },
  { id: 57, brand: "Europerfumes Guadalajara", name: "Decant", size: "10 ml", price: 100, stock: 94, category: "Decants", color: "#707964", bottle: "tall" },
  { id: 58, brand: "Europerfumes Guadalajara", name: "Decants", size: "Presentación mini", price: 200, stock: 16, category: "Decants", color: "#867b68", bottle: "round" },
  { id: 59, brand: "Europerfumes", name: "717 Women", size: "Presentación disponible", price: 300, stock: 1, category: "Alternativas", color: "#aa8c9c", bottle: "round", badge: "Última pieza" },
  { id: 60, brand: "Europerfumes", name: "Blue For Men", size: "Presentación disponible", price: 300, stock: 2, category: "Alternativas", color: "#55758a", bottle: "square" },
  { id: 61, brand: "Europerfumes", name: "Blue Sky", size: "Presentación disponible", price: 300, stock: 1, category: "Alternativas", color: "#6f98aa", bottle: "square", badge: "Última pieza" },
  { id: 62, brand: "Europerfumes", name: "Coast", size: "Presentación disponible", price: 400, stock: 1, category: "Alternativas", color: "#78978c", bottle: "square", badge: "Última pieza" },
  { id: 63, brand: "Europerfumes", name: "Gold No.1", size: "Presentación disponible", price: 400, stock: 1, category: "Alternativas", color: "#b39761", bottle: "square", badge: "Última pieza" },
  { id: 64, brand: "Europerfumes", name: "Must Be Black Bear", size: "Presentación disponible", price: 300, stock: 1, category: "Alternativas", color: "#3b4144", bottle: "square", badge: "Última pieza" },
  { id: 65, brand: "Europerfumes", name: "Navy Blue Voyages", size: "Presentación disponible", price: 300, stock: 1, category: "Alternativas", color: "#3d5872", bottle: "square", badge: "Última pieza" },
  { id: 66, brand: "Europerfumes", name: "Robot", size: "Presentación disponible", price: 300, stock: 2, category: "Alternativas", color: "#56585b", bottle: "square" },
  { id: 67, brand: "Europerfumes", name: "Side No.33", size: "Presentación disponible", price: 400, stock: 1, category: "Alternativas", color: "#a49068", bottle: "square", badge: "Última pieza" },
];

const categoryFilters = ["Todos", "Caballero", "Dama", "Alternativas", "Decants"] as const;

function Icon({
  name,
  size = 20,
}: {
  name: "search" | "bag" | "heart" | "user" | "filter" | "arrow" | "close" | "check";
  size?: number;
}) {
  const shared = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "search":
      return <svg {...shared}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.2 4.2" /></svg>;
    case "bag":
      return <svg {...shared}><path d="M5 8h14l1 12H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>;
    case "heart":
      return <svg {...shared}><path d="M20.4 8.6c0 4.2-8.4 10-8.4 10s-8.4-5.8-8.4-10a4.4 4.4 0 0 1 8.4-1.8 4.4 4.4 0 0 1 8.4 1.8Z" /></svg>;
    case "user":
      return <svg {...shared}><circle cx="12" cy="8" r="3.2" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>;
    case "filter":
      return <svg {...shared}><path d="M4 6h16M7 12h10m-7 6h4" /></svg>;
    case "arrow":
      return <svg {...shared}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
    case "close":
      return <svg {...shared}><path d="m6 6 12 12M18 6 6 18" /></svg>;
    case "check":
      return <svg {...shared}><path d="m5 12 4 4L19 6" /></svg>;
  }
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categoryFilters)[number]>("Todos");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [underThousand, setUnderThousand] = useState(false);
  const [sort, setSort] = useState<SortOption>("featured");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const brands = useMemo(
    () => Array.from(new Set(products.map((product) => product.brand))).sort(),
    [],
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es-MX");
    const results = products.filter((product) => {
      const matchesQuery = `${product.brand} ${product.name} ${product.size}`
        .toLocaleLowerCase("es-MX")
        .includes(normalizedQuery);
      const matchesCategory = category === "Todos" || product.category === category;
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesPrice = !underThousand || product.price < 1000;
      return matchesQuery && matchesCategory && matchesBrand && matchesPrice;
    });

    if (sort === "price-asc") results.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") results.sort((a, b) => b.price - a.price);
    if (sort === "name") results.sort((a, b) => a.name.localeCompare(b.name, "es"));
    return results;
  }, [category, query, selectedBrands, sort, underThousand]);

  function toggleBrand(brand: string) {
    setSelectedBrands((current) =>
      current.includes(brand) ? current.filter((item) => item !== brand) : [...current, brand],
    );
  }

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  function addToCart(product: Product) {
    const existing = cartItems.find((item) => item.product.id === product.id);
    if (existing && existing.quantity >= product.stock) {
      showToast(`Solo hay ${product.stock} pieza${product.stock === 1 ? "" : "s"} disponible${product.stock === 1 ? "" : "s"}`);
      return;
    }

    setCartItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      return existing
        ? current.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...current, { product, quantity: 1 }];
    });
    showToast(`${product.name} se agregó a tu bolsa`);
  }

  function changeQuantity(productId: number, change: number) {
    setCartItems((current) =>
      current
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.min(item.product.stock, item.quantity + change) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function toggleFavorite(product: Product) {
    const isFavorite = favorites.includes(product.id);
    setFavorites((current) =>
      isFavorite ? current.filter((id) => id !== product.id) : [...current, product.id],
    );
    showToast(isFavorite ? "Se quitó de tus favoritos" : "Se guardó en tus favoritos");
  }

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newsletterEmail.trim()) return;
    showToast("¡Gracias! Te avisaremos de las novedades.");
    setNewsletterEmail("");
  }

  const activeFilters = selectedBrands.length + (underThousand ? 1 : 0);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const categoryHeading = {
    Todos: "cada momento",
    Caballero: "él",
    Dama: "ella",
    Alternativas: "descubrir",
    Decants: "llevar contigo",
  }[category];

  return (
    <>
      <div className="announcement">
        <span>Europerfumes Guadalajara</span>
        <span className="announcement-divider" />
        <span>Fragancias para cada momento</span>
        <span className="announcement-divider" />
        <span>Hecho en Guadalajara</span>
      </div>

      <header className="site-header">
        <a className="brand-mark" href="#" aria-label="Europerfumes Guadalajara, inicio">
          <Image
            src="/europerfums-logo.png"
            alt="Europerfumes Guadalajara"
            width={850}
            height={768}
            priority
            className="brand-logo"
          />
        </a>
        <nav className="main-nav" aria-label="Navegación principal">
          <a className={`nav-link ${category === "Todos" ? "active" : ""}`} href="#catalogo" onClick={() => setCategory("Todos")}>Fragancias</a>
          <a className={`nav-link ${category === "Caballero" ? "active" : ""}`} href="#catalogo" onClick={() => setCategory("Caballero")}>Para él</a>
          <a className={`nav-link ${category === "Dama" ? "active" : ""}`} href="#catalogo" onClick={() => setCategory("Dama")}>Para ella</a>
          <a className={`nav-link ${category === "Decants" ? "active" : ""}`} href="#catalogo" onClick={() => setCategory("Decants")}>Decants</a>
          <a className="nav-link" href="#historia">Nuestra esencia</a>
        </nav>
        <div className="header-actions">
          <a className="icon-link account-link" href="#contacto" aria-label="Mi cuenta">
            <Icon name="user" />
          </a>
          <a className="icon-link favorite-link" href="#catalogo" aria-label={`${favorites.length} favoritos`}>
            <Icon name="heart" />
            {favorites.length > 0 && <span className="header-count">{favorites.length}</span>}
          </a>
          <button className="icon-link cart-button" type="button" aria-label={`${cartCount} artículos en la bolsa`} onClick={() => setCartOpen(true)}>
            <Icon name="bag" />
            <span className="header-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> PERFUMERÍA SELECTA · GUADALAJARA</div>
            <h1>Deja una<br /><em>gran impresión.</em></h1>
            <p>Fragancias que hablan de ti, incluso antes de que digas una palabra.</p>
            <a className="hero-cta" href="#catalogo">Descubre tu fragancia <Icon name="arrow" size={17} /></a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-photo-frame">
              <Image
                src="/products/layton-exclusif.jpeg"
                alt=""
                fill
                priority
                sizes="(max-width: 760px) 50vw, 24vw"
                className="hero-photo"
              />
            </div>
            <div className="hero-art-caption"><span>SELECCIÓN CURADA</span><span>LAYTON EXCLUSIF</span></div>
          </div>
          <div className="hero-side-note">ENCUENTRA<br />TU ESENCIA</div>
        </section>

        <section className="assurance-strip" aria-label="Ventajas de Europerfumes Guadalajara">
          <div><span className="assurance-icon">✳</span><span>Selección curada</span></div>
          <span className="assurance-separator" />
          <div><span className="assurance-icon">◇</span><span>Compra con confianza</span></div>
          <span className="assurance-separator" />
          <div><span className="assurance-icon">⌁</span><span>Atención personal</span></div>
        </section>

        <section className="catalog-section" id="catalogo">
          <div className="catalog-heading">
            <div className="breadcrumb"><a href="#">Inicio</a><span>/</span><span>Perfumes para {category === "Todos" ? "cada momento" : category.toLocaleLowerCase("es-MX")}</span></div>
            <div className="catalog-title-row">
              <div>
                <div className="eyebrow section-eyebrow">LA COLECCIÓN</div>
                <h2>Perfumes para <em>{categoryHeading}</em></h2>
                <p>Encuentra esa fragancia que se siente como tú.</p>
              </div>
              <div className="collection-count"><strong>{filteredProducts.length}</strong><span>fragancias<br />disponibles</span></div>
            </div>
          </div>

          <div className="catalog-toolbar">
            <div className="search-wrap">
              <Icon name="search" size={19} />
              <input
                aria-label="Buscar fragancias"
                type="search"
                placeholder="Busca por nombre o marca"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              {query && <button className="clear-search" type="button" onClick={() => setQuery("")} aria-label="Limpiar búsqueda"><Icon name="close" size={16} /></button>}
            </div>
            <button className="mobile-filter-button" type="button" onClick={() => setMobileFiltersOpen((open) => !open)}>
              <Icon name="filter" size={18} /> Filtros {activeFilters > 0 && <span className="filter-count">{activeFilters}</span>}
            </button>
            <label className="sort-control">
              <span>Ordenar por</span>
              <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)} aria-label="Ordenar productos">
                <option value="featured">Recomendados</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="name">Nombre: A a Z</option>
              </select>
            </label>
          </div>

          <div className="catalog-layout">
            <aside className={`filters-panel ${mobileFiltersOpen ? "filters-open" : ""}`}>
              <div className="filters-heading"><span>Filtrar por</span><button type="button" onClick={() => { setSelectedBrands([]); setUnderThousand(false); setCategory("Todos"); }}>Limpiar</button></div>
              <div className="filter-group">
                <h3>Categoría</h3>
                {categoryFilters.map((item) => (
                  <button className={`family-option ${category === item ? "selected" : ""}`} type="button" key={item} onClick={() => setCategory(item)}>
                    <span className="radio-mark" />{item}<span className="family-total">{item === "Todos" ? products.length : products.filter((product) => product.category === item).length}</span>
                  </button>
                ))}
              </div>
              <div className="filter-group">
                <h3>Precio</h3>
                <label className="checkbox-option">
                  <input type="checkbox" checked={underThousand} onChange={(event) => setUnderThousand(event.target.checked)} />
                  <span className="custom-checkbox"><Icon name="check" size={12} /></span>
                  <span>Menos de $1,000</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" checked={!underThousand} onChange={() => setUnderThousand(false)} />
                  <span className="custom-checkbox"><Icon name="check" size={12} /></span>
                  <span>Todos los precios</span>
                </label>
              </div>
              <details className="filter-group brand-filter">
                <summary>Marca <span className="plus-mark">−</span></summary>
                <div className="brand-options">
                  {brands.map((brand) => (
                    <label className="checkbox-option" key={brand}>
                      <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} />
                      <span className="custom-checkbox"><Icon name="check" size={12} /></span>
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </details>
              <div className="filter-note"><span className="note-star">✳</span><p>¿Buscas algo especial?<br /><a href="#contacto">Escríbenos, te ayudamos.</a></p></div>
            </aside>

            <div className="product-area">
              <div className="active-category-tabs">
                {categoryFilters.map((item) => (
                  <button className={category === item ? "active" : ""} key={item} type="button" onClick={() => setCategory(item)}>{item}</button>
                ))}
              </div>
              {filteredProducts.length > 0 ? (
                <div className="product-grid">
                  {filteredProducts.map((product, index) => (
                    <article className="product-card" key={product.id}>
                      <div className={`product-visual bottle-${product.bottle}${product.image ? " has-photo" : ""}`} style={{ "--product-color": product.color } as CSSProperties}>
                        <div className="product-topline"><span>{product.badge ?? "EUROPERFUMES GDL"}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
                        <button className={`favorite-button ${favorites.includes(product.id) ? "is-favorite" : ""}`} type="button" onClick={() => toggleFavorite(product)} aria-label={favorites.includes(product.id) ? "Quitar de favoritos" : "Agregar a favoritos"}><Icon name="heart" size={18} /></button>
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={`${product.brand} ${product.name}`}
                            fill
                            sizes="(max-width: 760px) 45vw, (max-width: 1080px) 30vw, 22vw"
                            className="product-photo"
                          />
                        ) : (
                          <>
                            <div className="product-bottle" aria-hidden="true">
                              <span className="product-cap" />
                              <span className="product-neck" />
                              <span className="product-glass">
                                <span className="product-bottle-brand">{product.brand}</span>
                                <span className="product-bottle-name">{product.name.split(" ").slice(0, 2).join(" ")}</span>
                              </span>
                            </div>
                            <span className="visual-caption">FRAGANCIAS · GDL</span>
                          </>
                        )}
                      </div>
                      <div className="product-info">
                        <p className="product-brand">{product.brand}</p>
                        <h3>{product.name}</h3>
                        <p className="product-size">{product.category} <span>·</span> {product.size}</p>
                        <div className="product-buy-row">
                          <span className="product-price">${product.price.toLocaleString("es-MX")} <small>MXN</small></span>
                          <button className="add-button" type="button" onClick={() => addToCart(product)} aria-label={`Agregar ${product.name} al carrito`}><Icon name="bag" size={17} /></button>
                        </div>
                        {product.stock < 3 && <p className="stock-note">Quedan pocas piezas</p>}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <span className="empty-icon">⌕</span>
                  <h3>No encontramos esa fragancia</h3>
                  <p>Prueba con otro nombre o limpia tus filtros.</p>
                  <button type="button" onClick={() => { setQuery(""); setSelectedBrands([]); setUnderThousand(false); setCategory("Todos"); }}>Ver toda la colección</button>
                </div>
              )}
              {filteredProducts.length > 0 && <div className="catalog-endnote"><span>✳</span> Mostrando {filteredProducts.length} fragancias seleccionadas</div>}
            </div>
          </div>
        </section>

        <section className="story-section" id="historia">
          <div className="story-art" aria-hidden="true">
            <div className="story-arch"><div className="story-vial"><span>EP</span></div></div>
            <div className="story-caption">GUADALAJARA, JALISCO · DESDE SIEMPRE</div>
          </div>
          <div className="story-copy">
            <div className="eyebrow section-eyebrow">HECHO CON INTENCIÓN</div>
            <h2>El aroma correcto<br />lo cambia <em>todo.</em></h2>
            <p>En Europerfumes Guadalajara creemos que una fragancia es mucho más que un aroma: es memoria, carácter y una forma muy personal de estar en el mundo.</p>
            <a href="#contacto" className="text-link">Conoce nuestra esencia <Icon name="arrow" size={17} /></a>
          </div>
        </section>

        <section className="newsletter-section" id="contacto">
          <div className="newsletter-copy">
            <div className="eyebrow">UNA NOTA PARA TI</div>
            <h2>Un poco más de <em>esencia.</em></h2>
            <p>Novedades, favoritos y pequeños detalles directo a tu correo.</p>
          </div>
          <form className="newsletter-form" onSubmit={subscribe}>
            <label className="sr-only" htmlFor="newsletter-email">Tu correo electrónico</label>
            <input id="newsletter-email" type="email" placeholder="Tu correo electrónico" value={newsletterEmail} onChange={(event) => setNewsletterEmail(event.target.value)} required />
            <button type="submit" aria-label="Suscribirme"><Icon name="arrow" size={19} /></button>
            <p>Al suscribirte, aceptas recibir noticias de Europerfumes Guadalajara.</p>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <Image src="/europerfums-logo.png" alt="Europerfumes Guadalajara" width={850} height={768} className="footer-logo" />
            <p>Fragancias para hacer<br />de cada día algo memorable.</p>
          </div>
          <div className="footer-column"><h3>EXPLORA</h3><a href="#catalogo" onClick={() => setCategory("Caballero")}>Perfumes para él</a><a href="#catalogo" onClick={() => setCategory("Dama")}>Perfumes para ella</a><a href="#catalogo" onClick={() => setCategory("Decants")}>Decants</a><a href="#catalogo" onClick={() => setCategory("Alternativas")}>Alternativas</a></div>
          <div className="footer-column"><h3>TE AYUDAMOS</h3><a href="#contacto">Contáctanos</a><a href="#contacto">Envíos y entregas</a><a href="#contacto">Preguntas frecuentes</a><a href="#contacto">Políticas de compra</a></div>
          <div className="footer-column"><h3>ENCUÉNTRANOS</h3><p>Guadalajara, Jalisco<br />México</p><a href="#contacto">Atención personalizada ↗</a><a href="#contacto">Novedades y lanzamientos</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Europerfumes Guadalajara</span><span>Hecho con cariño y una buena fragancia. <span className="footer-heart">♥</span></span><a href="#catalogo">Volver arriba ↑</a></div>
      </footer>

      {toast && <div className="toast-message" role="status"><span className="toast-check"><Icon name="check" size={15} /></span>{toast}</div>}
      {cartOpen && (
        <div className="cart-layer">
          <button className="cart-backdrop" type="button" aria-label="Cerrar bolsa" onClick={() => setCartOpen(false)} />
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
            <div className="cart-drawer-heading">
              <div><span className="eyebrow section-eyebrow">TU SELECCIÓN</span><h2 id="cart-title">Tu bolsa <span>({cartCount})</span></h2></div>
              <button className="drawer-close" type="button" aria-label="Cerrar bolsa" onClick={() => setCartOpen(false)}><Icon name="close" /></button>
            </div>
            {cartItems.length === 0 ? (
              <div className="cart-empty"><span className="cart-empty-icon">◇</span><h3>Tu bolsa está esperando</h3><p>Encuentra una fragancia que vaya contigo.</p><button type="button" onClick={() => setCartOpen(false)}>Explorar colección</button></div>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map(({ product, quantity }) => (
                    <div className="cart-item" key={product.id}>
                      <div className="cart-item-art" style={{ "--product-color": product.color } as CSSProperties}><span /></div>
                      <div className="cart-item-copy">
                        <p>{product.brand}</p><h3>{product.name}</h3><span>{product.size}</span>
                        <div className="quantity-control">
                          <button type="button" onClick={() => changeQuantity(product.id, -1)} aria-label={`Quitar una unidad de ${product.name}`}>−</button>
                          <span>{quantity}</span>
                          <button type="button" disabled={quantity >= product.stock} onClick={() => changeQuantity(product.id, 1)} aria-label={`Agregar una unidad de ${product.name}`}>+</button>
                        </div>
                      </div>
                      <strong>${(product.price * quantity).toLocaleString("es-MX")}</strong>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div><span>Subtotal</span><strong>${cartSubtotal.toLocaleString("es-MX")} MXN</strong></div>
                  <p>Los detalles para completar tu pedido se confirman directamente con Europerfumes Guadalajara.</p>
                  <button type="button" onClick={() => setCartOpen(false)}>Seguir explorando</button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
